import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../config.json';
import { WeatherHeader } from './WeatherHeader';
import './WeatherToday.css';
import { WeatherContent } from './WeatherContent';
import { usePopups } from '../../contexts/PopupContext';
import { Popup } from '../../popups/Popup';
import { getWeatherByLocation } from './WeatherLogic';
import { Navbar } from '../../components/Navbar';
import { Loading } from '../../components/Loading';

interface Props extends RouteComponentProps {
    props: any;
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
interface Weather {
    location: {
        country: string;
        localtime: string;
        time_timestamp: number;
        name: string;
    },
    forecast: {
        forecastday: Forecast[]
    }
}
interface Forecast {
    date: string;
    date_epoch: number;
    day: {
        avgtemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    hour: CurrentWeatherData[];
}
const WeatherToday = (props: Props) => {
    const popups: any = usePopups();
    // @ts-ignore
    const location = props.match.params.query;
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        getWeatherByLocation(location)
            .then(response => {
                setCurrentWeather(response.current);
                setWeather({forecast: response.forecast, location: response.location})
            })
    }, [location]);

    if(!currentWeather || !weather) return (
        <div className="flex align-center justify-center" style={{height: '100vh'}}>
            <Loading />
        </div>
    );

    return(
        <div className="weather">
            <Navbar />
            <WeatherHeader 
                feels_like={currentWeather.feelslike_c}
                location={weather.location.name}
                country={weather.location.country}
                temp={currentWeather.temp_c}
                weather={currentWeather.condition.text}
                weatherIcon={currentWeather.condition.icon}
                is_day={currentWeather.is_day}
            />
            <WeatherContent 
                forecast={weather.forecast.forecastday}
            />
        </div>
    )
}

export default withRouter(WeatherToday);