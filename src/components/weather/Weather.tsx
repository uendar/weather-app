import { useEffect, useState, useRef } from "react";
import axios from "axios";
import _ from "lodash";
import WeatherWidget from "./WeatherWidget";
import "./styles.css";
import { useCity } from "../../context/CityContext";
import { useWeather } from "../../hooks/useWeather";

const API_KEY: string | undefined = process.env.REACT_APP_IPGEO_API_KEY;

export const Weather: React.FC = () => {
  const { city, setCity, triggerWeatherFetch, setTriggerWeatherFetch } = useCity(); 
  const [inputCity, setInputCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const prevCityRef = useRef<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false); 

  const { refetch } = useWeather(city);

  //gets city based on user's IP on mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`
        );
        const detectedCity = response.data.country_capital || "";
        setCity(detectedCity);
        setInputCity(detectedCity);
        prevCityRef.current = detectedCity;
      } catch (error) {
        console.error("Error fetching location:", error);
        setCity("");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [setCity]);

  // weather when triggerWeatherFetch | triggerFetch is true
  useEffect(() => {
    if (triggerFetch || triggerWeatherFetch) {
      refetch().then(() => {
        setTriggerFetch(false);
        setTriggerWeatherFetch(false); 
      });
    }
  }, [city, triggerFetch, refetch, triggerWeatherFetch, setTriggerWeatherFetch]);

  //update city & trigger fetch
  const handleFetchWeather = () => {
    if (inputCity !== prevCityRef.current) {
      setCity(inputCity);
      prevCityRef.current = inputCity;
    }
    setTriggerFetch(true);
    setTriggerWeatherFetch(true);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      {loading ? (
        <p>Detecting location...</p>
      ) : (
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city..."
            value={inputCity}
            onChange={(e) => setInputCity(_.capitalize(e.target.value))}
          />
          <button onClick={handleFetchWeather}>Get Weather</button>
        </div>
      )}

      {city && <WeatherWidget city={city} />}
    </div>
  );
};
