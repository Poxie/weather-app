import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../config.json';
import { WeatherHeader } from './WeatherHeader';
import './WeatherToday.css';
import { WeatherContent } from './WeatherContent';
import { usePopups } from '../../contexts/PopupContext';
import { Popup } from '../../popups/Popup';

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
        axios.get(`${config["api_endpoint"]}?q=${location}&units=metric&appid=${config["api_key"]}`)
            .then(response => {
                const locationString = response.data.name;

                axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${locationString}&days=5&key=677a94af32e249ffb63192541201511`)
                    .then(response => {
                        const data = response.data;
                        setCurrentWeather(data.current);
                        setWeather({forecast: data.forecast, location: data.location})
                    });
            })
    }, [location]);

    const setPopup = (e: any) => {
        if(!e) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const { top, left } = rect;
        const height = e.currentTarget.offsetHeight;
        const width = e.currentTarget.offsetWidth;
        const text = e.currentTarget.getAttribute('tooltip-text');
        popups.setPopup(
            <Popup top={top - height} left={left + width / 2}>
                <span>
                    {text}
                </span>
            </Popup>
        )
    }
    const removePopup = () => {
        popups.setPopup(null);
    }

    // Adding tooltip functionality
    useEffect(() => {
        const elements = document.querySelectorAll('[has-tooltip="true"]');
        if(!elements) return;

        elements.forEach(element => {
            element.addEventListener('mouseenter', setPopup);
            element.addEventListener('mouseleave', removePopup)
        })

        return () => {
            elements.forEach(element => {
                element.removeEventListener('mouseenter', setPopup);
                element.removeEventListener('mouseleave', removePopup)
            })
        }
    }, [weather])

    if(!currentWeather || !weather) return <div></div>;

    return(
        <div className="weather">
            <WeatherHeader 
                feels_like={currentWeather.feelslike_c}
                location={weather.location.name}
                country={weather.location.country}
                temp={currentWeather.temp_c}
                weather={currentWeather.condition.text}
                weatherIcon={currentWeather.condition.icon}
            />
            <WeatherContent 
                forecast={weather.forecast.forecastday}
            />
        </div>
    )
}

export default withRouter(WeatherToday);