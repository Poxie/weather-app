import { count } from 'console';
import React, { useEffect, useState } from 'react';
import { WeatherIcon } from './WeatherIcon';
import { getBackground, toggleFavorite } from './WeatherLogic';

interface Props {
    location: string;
    country: string;
    temp: number;
    feels_like: number;
    weather: string;
    weatherIcon: string;
    is_day: number;
}
export const WeatherHeader: React.FC<Props> = ({location, country, temp, feels_like, weather, weatherIcon, is_day}) => {
    const [background, setBackground] = useState(undefined);
    const favoriteLocations = window.localStorage.favorites;
    let isFavorite = false;
    if(favoriteLocations) {
        const favorites = JSON.parse(favoriteLocations);
        if(favorites.includes(location)) {
            isFavorite = true;
        }
    }
    const countryString = country !== location ? `${location}, ${country}` : location;

    useEffect(() => {
        const background = getBackground(weather, is_day);
        setBackground(background)
    }, [location, weather]);

    return(
        <div className={`weather-header ${weather.toLowerCase()}`}>
            {background ? (
                <video muted autoPlay src={background}></video>
            ) : null}
            <div className="container flex">
                <WeatherIcon 
                    iconURL={weatherIcon}
                    text={weather}
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
                    <h2 className="location flex align-center">
                        {countryString}
                        <div className="favorite-btn flex align-center" has-tooltip="true" tooltip-text={`${isFavorite ? ' Remove from' : 'Add to'} favorites`}>
                            {isFavorite ? (
                                <svg onClick={() => toggleFavorite(location)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                            ) : (
                                <svg onClick={() => toggleFavorite(location)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>
                            )}
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    )
}