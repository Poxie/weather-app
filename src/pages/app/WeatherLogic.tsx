import axios from 'axios';
import config from '../../config.json';

const getWeatherByLocation = (location: string) => {
    return axios.get(`${config["api_endpoint"]}?q=${location}&units=metric&appid=${config["api_key"]}`)
            .then(response => {
                const locationString = response.data.name;

                return axios.get(`${config["weather_api_endpoint"]}?q=${locationString}&days=5&key=${config["weather_api_key"]}`)
                    .then(response => {
                        return response.data;
                    })
            });
}

const getBackground = (weather: string, is_day: number | boolean) => {
    is_day = is_day === 1;
    weather = weather.toLocaleLowerCase();
    let background;
    if(weather.includes('cloud') || weather.includes('overcast')) {
        background = require('../../backgrounds/cloudy.mp4');
    } else if(weather.includes('mist') || weather.includes('fog')) {
        background = require('../../backgrounds/mist.mp4');
    } else if(weather.includes('snow')) {
        background = require('../../backgrounds/snowy.mp4');
    } else if(weather.includes('rain')) {
        background = require('../../backgrounds/rain.mp4');
    } else if(weather.includes('clear') && !is_day) {
        background = require('../../backgrounds/clear_night.mp4');
    }
    
    return background?.default;
}

const toggleFavorite = (location: string) => {
    let favorites = window.localStorage.favorites;
    if(favorites) {
        favorites = JSON.parse(favorites);
        let index = favorites.indexOf(location);
        if(index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(location);
        }

        window.localStorage.favorites = JSON.stringify(favorites);
    } else {
        window.localStorage.favorites = JSON.stringify([location]);
    }
    return favorites;
}

export { getWeatherByLocation, getBackground, toggleFavorite };