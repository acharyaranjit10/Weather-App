import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { convertTemp, getDayName } from '../utils/helpers';

const DailyForecast = ({ data, unit, theme }) => {
  // Group forecast by day
  const dailyData = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get next 5 days (excluding today)
  const nextDays = Object.keys(dailyData).slice(1, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 bg-opacity-70' : 'bg-white'}`}
    >
      <h3 className="text-xl font-bold mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {nextDays.map((day, index) => {
          const dayData = dailyData[day];
          const dayTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
          const nightTemp = dayData[0].main.temp; // Taking the first reading as night temp
          const condition = dayData[Math.floor(dayData.length / 2)].weather[0].main; // Middle of the day condition

          return (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <h4 className="font-semibold mb-2">{getDayName(new Date(day).getDay())}</h4>
              <WeatherIcon condition={condition} size={40} className="mx-auto my-2" />
              <div className="flex justify-around mt-3">
                <div>
                  <p className="text-sm">Day</p>
                  <p className="font-bold">{convertTemp(dayTemp, unit)}°{unit === 'metric' ? 'C' : 'F'}</p>
                </div>
                <div>
                  <p className="text-sm">Night</p>
                  <p className="font-bold text-gray-400">{convertTemp(nightTemp, unit)}°{unit === 'metric' ? 'C' : 'F'}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DailyForecast;