import { useWeather } from "../../hooks/useWeather";
import "./styles.css"; 

interface WeatherWidgetProps {
  city: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const { data, isLoading } = useWeather(city,);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="weather-container">
      {/*current weather */}
      <div className="weather-section">
        <h2>Today Weather in {city}</h2>
        {data?.current_weather?(
          <>
        <p>🌡️ Temperature: <strong>{data?.current_weather?.temperature?.info.measurement}°C</strong></p>
        <p>💧 Humidity: <strong>{data?.current_weather?.humidity?.info.measurement}%</strong></p>
        <p>🍃 Wind: <strong>{data?.current_weather?.wind?.info.measurement}m/s</strong></p>
        </> ) : (
        <p>No forecast data available.</p>
      )}
      </div> 

      {/*predicted weeather */}
      <div className="weather-section">
        <h2>Tomorrow Weather in {city}</h2>
        {data?.user_forecast ? (
          <>
            <p>🌡️ Temperature:<strong>{data?.user_forecast.temperature}°C</strong></p>
            <p>💧 Humidity:<strong> {data?.user_forecast.humidity}%</strong></p>
            <p>🍃 Wind:<strong>{data?.user_forecast.wind}m/s</strong></p>
          </>
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
