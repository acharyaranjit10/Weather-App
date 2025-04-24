export const convertTemp = (temp, unit) => {
  if (unit === 'imperial') {
    // Convert Celsius to Fahrenheit
    return Math.round((temp * 9/5) + 32); // Fahrenheit
  } else if (unit === 'metric') {
    // No conversion needed, Celsius is the default
    return Math.round(temp); // Celsius
  }
  return temp; // For any other unit, return the value as is (e.g., Kelvin)
};


export const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

export const getDayName = (dayIndex) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
};

export const getBackgroundClass = (weatherCondition) => {
  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      return 'bg-gradient-to-br from-blue-800 to-indigo-900';
    case 'rain':
    case 'drizzle':
      return 'bg-gradient-to-br from-gray-700 to-blue-900';
    case 'snow':
      return 'bg-gradient-to-br from-gray-300 to-blue-200';
    case 'clouds':
      return 'bg-gradient-to-br from-gray-600 to-gray-800';
    case 'thunderstorm':
      return 'bg-gradient-to-br from-gray-900 to-purple-900';
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
      return 'bg-gradient-to-br from-gray-500 to-gray-700';
    default:
      return 'bg-gradient-to-br from-gray-800 to-gray-900';
  }
};