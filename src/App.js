import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="app-container">
      <div className="app-search">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.main && (
        <div className="app-widget">
          <h1 className="weather-city">
            {weather.name} <sup>{weather.sys.country}</sup>
          </h1>
          <div className="weather-temp">
            {<span>{weather.main.temp}</span>} <sup>°C</sup>
          </div>
          <div className="weather-info">
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description.toUpperCase()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
