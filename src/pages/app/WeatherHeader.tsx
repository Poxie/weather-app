import { count } from 'console';
import React from 'react';
import { WeatherIcon } from './WeatherIcon';
import { getCountryByCode } from './WeatherLogic';

interface Props {
    location: string;
    country: string;
    temp: number;
    feels_like: number;
    weather: string;
    weatherIcon: string;
}
export const WeatherHeader: React.FC<Props> = ({location, country, temp, feels_like, weather, weatherIcon}) => {
    const countryString = country !== location ? `${location}, ${country}` : location;
    const background = require('../../backgrounds/mist.mp4');

    return(
        <div className={`weather-header`}>
            <video muted autoPlay src={background.default}></video>
            <div className="container flex">
                <WeatherIcon 
                    iconURL={weatherIcon}
                />
                <div className="weather-text">
                    <div className="condition">
                        <span>
                            Currently: {weather}
                        </span>
                    </div>
                    <h1 className="temp">
                        {Math.floor(temp)}°C
                    </h1>
                    <h4 className="location">
                        {countryString}
                    </h4>
                </div>
            </div>
        </div>
    )
}