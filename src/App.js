import React, { useState, useEffect } from 'react';
import { WeatherCard, ErrCard } from './WeatherCard';
import './style.css';

const App = () => {
  const [city, setCity] = useState('');
  const [celsius, setCelsius] = useState(true);
  const [data, setData] = useState({
    country: '',
    weather: '',
    tempActualC: '',
    tempMinC: '',
    tempMaxC: '',
    tempMinF: '',
    tempMaxF: '',
    humidity: '',
    wind: '',
  });
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const inputData = city.split(' ').join('+');
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=16eb512cb5510f2d827e4166a006aaa4`
      )
        .then((res) => res.json())
        .then((res) => {
          setData({
            city: city,
            country: res.sys.country,
            weather: res.weather[0].main,
            humidity: res.main.humidity,
            wind: Math.round(res.wind.speed * 10) / 10,
            tempActualC: Math.round((res.main.temp - 273.15) * 10) / 10,
            tempMinC: Math.round((res.main.temp_min - 273.15) * 10) / 10,
            tempMaxC: Math.round((res.main.temp_max - 273.15) * 10) / 10,
            tempActualF:
              Math.round((((res.main.temp - 273.15) * 9) / 5 + 32) * 10) / 10,
            tempMaxF:
              Math.round((((res.main.temp_max - 273.15) * 9) / 5 + 32) * 10) /
              10,
            tempMinF:
              Math.round((((res.main.temp_min - 273.15) * 9) / 5 + 32) * 10) /
              10,
          });
          setError(false);
        })
        .catch((err) => err && setError(true));
    };
    fetchData();
  }, [city]);

  const handleChange = (event) => {
    const input = event.target.value;
    setCity(input);
  };

  const changeToCelsius = () => {
    setCelsius(true);
  };

  const changeToFahrenheit = () => {
    setCelsius(false);
  };

  return (
    <div>
      <div id="container">
        <h2 id="title">Weather API</h2>
        <input
          className="input"
          type="text"
          value={city}
          placeholder="Search for a city"
          onChange={handleChange}
        />
        {error === false ? (
          <WeatherCard
            cityName={data.city}
            cityWeather={data.weather}
            cityCountry={data.country}
            tempActual={
              celsius ? data.tempActualC + 'ºC' : data.tempActualF + 'ºF'
            }
            tempMax={celsius ? data.tempMaxC : data.tempMaxF}
            tempMin={celsius ? data.tempMinC : data.tempMinF}
            wind={data.wind}
            humidity={data.humidity}
            changeToCelsius={changeToCelsius}
            changeToFahrenheit={changeToFahrenheit}
            celsius={celsius}
          />
        ) : (
          <ErrCard />
        )}
      </div>
    </div>
  );
};

export default App;
