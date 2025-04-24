import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiDayCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';

const WeatherIcon = ({ condition, size = 24, className = '' }) => {
  const iconProps = { size, className };
  
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny {...iconProps} />;
    case 'rain':
    case 'drizzle':
      return <WiRain {...iconProps} />;
    case 'snow':
      return <WiSnow {...iconProps} />;
    case 'clouds':
      return <WiCloudy {...iconProps} />;
    case 'thunderstorm':
      return <WiThunderstorm {...iconProps} />;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return <WiFog {...iconProps} />;
    default:
      return <WiDayCloudy {...iconProps} />;
  }
};

export default WeatherIcon;