import React from 'react';
import humidityIcon from './images/humidity.svg';
import windIcon from './images/wind.svg';

const ErrCard = () => {
  return (
    <div className="error-card">
      <h2>Sorry, no city was found</h2>
    </div>
  );
};

const WeatherCard = (props) => {
  return (
    <div className={'card-container' + ' ' + props.cityWeather}>
      <div className="top-container">
        <div className="location">
          <h2>
            {props.cityName}, {props.cityCountry}
          </h2>
        </div>
        <p id="weather">{props.cityWeather}</p>
      </div>
      <div className="middle-container">
        <p id="temp-actual">{props.tempActual}</p>
        <div id="minmax">
          <p>
            min <span className="temp-minmax">{props.tempMin}º</span>{' '}
            <span id="vertical-line"></span>{' '}
            <span className="temp-minmax">{props.tempMax}º</span> max
          </p>
        </div>
      </div>
      <div className={'bottom-container' + ' ' + props.cityWeather}>
        <div id="scale">
          <p>scale</p>
          <div className="infos">
            <button
              onClick={props.changeToCelsius}
              className={
                props.celsius ? 'selected' + ' ' + props.cityWeather : null
              }
            >
              <span>ºC</span>
            </button>
            <button
              onClick={props.changeToFahrenheit}
              className={
                props.celsius ? null : 'selected' + ' ' + props.cityWeather
              }
            >
              <span>ºF</span>
            </button>
          </div>
        </div>
        <div id="humidity">
          <p>humidity</p>
          <div className="infos">
            <img id="humidity-icon" src={humidityIcon} alt="humidity" />
            <span>{props.humidity}%</span>
          </div>
        </div>
        <div id="wind">
          <p>wind</p>
          <div className="infos">
            <img id="wind-icon" src={windIcon} alt="wind" />
            <span>{props.wind}m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ErrCard, WeatherCard };
