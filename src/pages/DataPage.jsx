import { useQuery } from "react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faTint,
  faUmbrella,
  faWind,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const getWeatherIcon = (description) => {
  const iconMap = {
    clouds: faCloud,
    // Add more mappings as needed
  };

  return iconMap[description.toLowerCase()] || faSun; // Default to faSun for unknown conditions
};

const kelvinToCelsius = (tempKelvin) => tempKelvin - 273.15;

const DataPage = () => {
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const { city } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: () =>
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
      ).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching weather data:", error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching weather data: {error.message}</div>;
  }

  return (
    <div className="flex h-screen justify-start pt-96 items-center flex-col bg-[#071952] text-white">
      <h1 className="text-2xl font-thin">
        Right now in {city} , it's {data.weather[0].description}
      </h1>

      <div className="flex justify-between items-center space-x-60 mt-24">
        <div>
          <FontAwesomeIcon
            icon={getWeatherIcon(data.weather[0].description)}
            className="text-[80px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-4xl">
            {Math.round(kelvinToCelsius(data.main.temp))}°C
          </p>
          <p>
            {Math.round(kelvinToCelsius(data.main.temp_min))}/
            {Math.round(kelvinToCelsius(data.main.temp_max))}°C
          </p>
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center">
          <div className="flex space-x-5">
            <FontAwesomeIcon icon={faWind} className="text-[20px]" />
            <p>{data.wind.speed}</p>
          </div>
          <div className="flex space-x-5">
            <FontAwesomeIcon icon={faUmbrella} className="text-[20px]" />
            <p>{data.main.humidity}</p>
          </div>
          <div className="flex space-x-5">
            <FontAwesomeIcon icon={faTint} className="text-[20px]" />
            <p>{data.main.pressure}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
