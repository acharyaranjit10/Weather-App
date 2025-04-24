import { useState } from 'react';
import axios from 'axios';

const useWeather = (apiKey, unit) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeather = async (lat, lon, city) => {
    if (city && city.trim().length < 2) {
      setError('City name must be at least 2 characters long.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url;
      if (city) {
        url = `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${apiKey}`;
      } else {
        url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
      }

      const weatherResponse = await axios.get(url);
      setWeatherData(weatherResponse.data);
      setLocation(weatherResponse.data.name);

      const forecastUrl = `${BASE_URL}/forecast?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&units=${unit}&appid=${apiKey}`;
      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (city && city.trim().length >= 2) {
      fetchWeather(null, null, city.trim());
    }
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    location,
    fetchWeather,
    handleSearch
  };
};

export default useWeather;
