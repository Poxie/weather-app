import { count } from 'console';
import React from 'react';
import { Link } from 'react-router-dom';
import { WeatherIcon } from '../app/WeatherIcon';
import { toggleFavorite } from '../app/WeatherLogic';

interface Props {
    condition: {
        text: string;
        icon: string;
    };
    current_temp: number;
    country: string;
    location: string;
    toggle: () => void;
}
export const Favorite: React.FC<Props> = ({condition, country, location, current_temp, toggle}) => {
    return(
        <div className="favorite">
            <Link to={`/weather/today/${location}`} className="flex align-center">
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
            <div className="remove-btn">
                <svg onClick={toggle} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
    )
}