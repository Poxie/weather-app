import { count } from 'console';
import React from 'react';
import { Link } from 'react-router-dom';
import { WeatherIcon } from '../app/WeatherIcon';

interface Props {
    condition: {
        text: string;
        icon: string;
    };
    current_temp: number;
    country: string;
    location: string;
}
export const Favorite: React.FC<Props> = ({condition, country, location, current_temp}) => {
    return(
        <Link to={`/weather/today/${location}`} className="favorite flex align-center">
            <WeatherIcon 
                iconURL={condition.icon}
                text={condition.text}
            />
            <div className="favorite-text">
                <div className="temperature">
                    <span>
                        {current_temp}°C
                    </span>
                </div>
                <div className="location">
                    <span className="silent">
                        {location}, {country}
                    </span>
                </div>
            </div>
        </Link>
    )
}