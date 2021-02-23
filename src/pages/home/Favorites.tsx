import React, { useEffect, useState } from 'react';
import { getWeatherByLocation } from '../app/WeatherLogic';
import { Favorite } from './Favorite';

interface Weather {
    location: {
        country: string;
        localtime: string;
        time_timestamp: number;
        name: string;
    },
    current: CurrentWeatherData;
}
interface CurrentWeatherData {
    condition: {
        text: string;
        icon: string;
    }
    feelslike_c: number;
    temp_c: number;
    humidity: number;
    is_day: number;
    wind_kph: number;
    wind_degree: number;
    cloud: number;
    time_epoch: number;
    chance_of_rain: number;
}
export const Favorites = () => {
    const [favorites, setFavorites] = useState<Weather[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let favoriteLocations = window.localStorage.favorites;
        if(favoriteLocations.length > 0) {
            favoriteLocations = JSON.parse(favoriteLocations);
            const favorites: Weather[] = [];
            favoriteLocations.forEach(async (location: string) => {
                const favorite = await getWeatherByLocation(location);
                favorites.push(favorite);
                if(favorites.length === favoriteLocations.length) {
                    setFavorites(favorites);
                    setLoading(false);
                }
            })
        }
        if(favoriteLocations.length === 0) {
            setLoading(false);
        }
    }, []);

    return(
        <div className="favorites">
            <h2>Favorites</h2>
            {loading ? (
                <div className="loading-favorites flex">
                    <div className="loading-favorite" />
                    <div className="loading-favorite" />
                    <div className="loading-favorite" />
                </div>
            ) : (
                favorites.length === 0 ? (
                    <span className="silent">Any added favorites will be added here. (Add them by pressing the star after searching)</span>
                ) : (
                    <div className="favorite-container flex">
                        {favorites.map((favorite, key) => {
                            return(
                                <Favorite 
                                    country={favorite.location.country}
                                    location={favorite.location.name}
                                    current_temp={favorite.current.temp_c}
                                    condition={favorite.current.condition}
                                    key={key}
                                />
                            )
                        })}
                    </div>
                )
            )}
        </div>
    )
}