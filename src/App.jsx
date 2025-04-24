import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';
import ThemeToggle from './components/ThemeToggle';
import UnitToggle from './components/UnitToggle';
import { getBackgroundClass } from './utils/helpers';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [unit, setUnit] = useLocalStorage('unit', 'metric');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null); // Store current location
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  const [initialFetch, setInitialFetch] = useState(false); // Track initial fetch state

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const fetchWeather = async (lat, lon, city) => {
    if (city && city.trim().length < 2) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url;
      if (city) {
        url = `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
      } else {
        url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
      }

      const weatherResponse = await axios.get(url);
      setWeatherData(weatherResponse.data);
      setLocation(weatherResponse.data.name);

      const forecastUrl = `${BASE_URL}/forecast?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&units=${unit}&appid=${API_KEY}`;
      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data);

      // Add to recent searches if it's a city search
      if (city) {
        const newSearch = {
          city: weatherResponse.data.name,
          country: weatherResponse.data.sys.country,
          timestamp: Date.now(),
        };
        setRecentSearches((prev) => [
          newSearch,
          ...prev.filter((search) => search.city !== weatherResponse.data.name).slice(0, 4),
        ]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (!city || city.trim() === '') return;
    fetchWeather(null, null, city);
  };

  const getCurrentLocationWeather = () => {
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeather(null, null, 'London'); // Default to London if geolocation is denied
        }
      );
    } else {
      fetchWeather(null, null, 'London');
    }
  };

  useEffect(() => {
    // Only fetch weather on initial load or when unit changes
    if (!initialFetch) {
      getCurrentLocationWeather();
      setInitialFetch(true);
    }
  }, [unit, initialFetch]);

  const backgroundClass = weatherData
    ? getBackgroundClass(weatherData.weather[0].main)
    : 'bg-gradient-to-br from-gray-800 to-gray-900';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} ${theme === 'dark' ? backgroundClass : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex justify-between items-center mb-8">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <UnitToggle unit={unit} toggleUnit={toggleUnit} />
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          theme={theme} 
          recentSearches={recentSearches}
          onRecentSearch={(city) => fetchWeather(null, null, city)}
        />

        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-pulse flex flex-col items-center">
                <div className={`h-12 w-12 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded-full mb-4`}></div>
                <div className={`h-4 w-32 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded mb-2`}></div>
                <div className={`h-4 w-24 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded`}></div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 mb-6 rounded-lg ${theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-900'}`}
            >
              <p>{error}</p>
              <button 
                onClick={getCurrentLocationWeather}
                className={`mt-2 text-sm underline ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}
              >
                Use my current location instead
              </button>
            </motion.div>
          ) : weatherData && forecastData ? (
            <>
              <CurrentWeather 
                data={weatherData} 
                unit={unit} 
                location={location} 
                theme={theme} 
              />
              <DailyForecast 
                data={forecastData} 
                unit={unit} 
                theme={theme} 
              />
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
