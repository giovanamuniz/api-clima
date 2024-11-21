// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Clima.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import { getWeather } from "../services/weatherService";

const Clima = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await getWeather(location); 
      setWeather(data); 
      setError("");
    } catch (err) {
      console.error("Erro ao buscar dados do clima:", err); 
      setError(err.response?.data?.error?.info || "Não foi possível buscar os dados do clima.");
    }
    
  };

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear":
        return clear_icon;
      case "cloud":
        return cloud_icon;
      case "drizzle":
        return drizzle_icon;
      case "rain":
        return rain_icon;
      case "snow":
        return snow_icon;
      default:
        return clear_icon; 
    }
  };

  return (
    <div className="clima">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <img src={search_icon} alt="Pesquisar" onClick={handleSearch} />
      </div>

      {weather ? (
        <>
          <img
            src={getWeatherIcon(weather.current.weather_descriptions[0])}
            alt="Ícone do clima"
            className="icone-clima"
          />
          <p className="temparatura">{weather.current.temperature}ºC</p>
          <p className="localizacao">{weather.location.name}</p>
          <div className="clima-dado">
            <div className="col">
              <img src={humidity_icon} alt="Ícone de umidade" />
              <div>
                <p>{weather.current.humidity} %</p>
                <span>Humidade</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Ícone de vento" />
              <div>
                <p>{weather.current.wind_speed} Km/h</p>
                <span>Velocidade do Vento</span>
              </div>
            </div>
          </div>
        </>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Pesquise uma cidade para ver o clima.</p>
      )}
    </div>
  );
};

export default Clima;
