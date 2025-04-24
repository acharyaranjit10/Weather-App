// src/utils/constants.js
export const WEATHER_CONDITIONS = {
  THUNDERSTORM: {
    name: 'Thunderstorm',
    icon: 'WiThunderstorm',
    colors: {
      light: 'from-purple-100 to-purple-300',
      dark: 'from-gray-900 to-purple-900'
    }
  },
  DRIZZLE: {
    name: 'Drizzle',
    icon: 'WiRain',
    colors: {
      light: 'from-blue-100 to-blue-300',
      dark: 'from-gray-600 to-blue-800'
    }
  },
  RAIN: {
    name: 'Rain',
    icon: 'WiRain',
    colors: {
      light: 'from-blue-200 to-gray-400',
      dark: 'from-gray-700 to-blue-900'
    }
  },
  SNOW: {
    name: 'Snow',
    icon: 'WiSnow',
    colors: {
      light: 'from-gray-200 to-blue-100',
      dark: 'from-gray-300 to-blue-200'
    }
  },
  CLEAR: {
    name: 'Clear',
    icon: 'WiDaySunny',
    colors: {
      light: 'from-yellow-100 to-blue-300',
      dark: 'from-blue-800 to-indigo-900'
    }
  },
  CLOUDS: {
    name: 'Clouds',
    icon: 'WiCloudy',
    colors: {
      light: 'from-gray-200 to-gray-400',
      dark: 'from-gray-600 to-gray-800'
    }
  },
  MIST: {
    name: 'Mist',
    icon: 'WiFog',
    colors: {
      light: 'from-gray-100 to-gray-300',
      dark: 'from-gray-500 to-gray-700'
    }
  },
  DEFAULT: {
    name: 'Weather',
    icon: 'WiDayCloudy',
    colors: {
      light: 'from-gray-100 to-gray-300',
      dark: 'from-gray-800 to-gray-900'
    }
  }
};

export const DEFAULT_LOCATION = 'London';
export const DEFAULT_UNIT = 'metric';
export const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const DEBOUNCE_DELAY = 500; // ms