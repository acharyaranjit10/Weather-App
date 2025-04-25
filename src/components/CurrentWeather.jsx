import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { convertTemp, getFormattedDate, getWindDirection } from '../utils/helpers';

const CurrentWeather = ({ data, unit, location, theme, timezone }) => {
  const { temp, feels_like, humidity } = data.main;
  const { speed, deg } = data.wind;
  const { description, main } = data.weather[0];
  const { sunrise, sunset } = data.sys;

   // Add effect to update local time
   const [localTime, setLocalTime] = useState('');
   useEffect(() => {
    if (timezone) {
      const updateTime = () => {
        const now = new Date();
        // Convert UTC time to local time using the timezone offset (in seconds)
        const localTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + timezone * 1000);
        setLocalTime(localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      };
      
      updateTime();
      const interval = setInterval(updateTime, 1000);
      
      return () => clearInterval(interval);
    }
  }, [timezone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={`mb-10 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 bg-opacity-70' : 'bg-white'}`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">{location}</h2>
          <p className="text-lg mb-4">{getFormattedDate(data.dt)}</p> 
          <div className="flex items-center justify-center md:justify-start">
            <WeatherIcon condition={main} size={80} />
            <span className="text-5xl font-bold ml-4">
            {Math.round(temp)}°{unit === 'metric' ? 'C' : 'F'}

            </span>
          </div>
          <p className="text-xl capitalize mt-2">{localTime}, {description}</p>
        </div>

        <div className={`grid grid-cols-2 gap-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <div className="p-4 rounded-lg bg-opacity-30 bg-gray-500">
            <p>Feels Like</p>
            <p className="text-xl font-semibold">
            {Math.round(feels_like)}°{unit === 'metric' ? 'C' : 'F'}


            </p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-30 bg-gray-500">
            <p>Humidity</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-30 bg-gray-500">
            <p>Wind</p>
            <p className="text-xl font-semibold">
              {unit === 'metric' ? (speed * 3.6).toFixed(1) : speed.toFixed(1)} {unit === 'metric' ? 'km/h' : 'mph'} {getWindDirection(deg)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-30 bg-gray-500">
            <p>Sunrise/Sunset</p>
            <p className="text-sm">
              {new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} /{' '}
              {new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;