import React, { useEffect, useState } from 'react';
import { getWeatherByLocation, toggleFavorite } from '../app/WeatherLogic';
import { Favorite } from './Favorite';

interface Weather {
    location: {
        country: string;
        localtime: string;
        time_timestamp: number;
        name: string;
    },
    current: CurrentWeatherData;
    order: number;
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
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let favoriteLocations = window.localStorage.favorites;
        if(favoriteLocations?.length) {
            favoriteLocations = JSON.parse(favoriteLocations);
            let favorites: Weather[] = [];
            favoriteLocations.forEach(async (location: string) => {
                const favorite = await getWeatherByLocation(location);
                favorite.order = favoriteLocations.indexOf(location);
                favorites.push(favorite);
                if(favorites.length === favoriteLocations.length) {
                    favorites = favorites.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
                    setFavorites(favorites);
                    setNames(favoriteLocations);
                    setLoading(false);
                }
            })
        }
        if(!favoriteLocations?.length) {
            setLoading(false);
            setFavorites([]);
        }
    }, [names]);

    const toggle = (location: string) => {
        const newFavorites = toggleFavorite(location);
        setNames(newFavorites);
    }

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
                                    toggle={() => toggle(favorite.location.name)}
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