import React, { useEffect, useRef, useState } from 'react';
import { Forecast } from './Forecast';
import { ForecastHour } from './ForecastHour';

interface Props {
    forecast: Forecast[];
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
export const WeatherContent: React.FC<Props> = ({forecast}) => {
    const [activeForecast, setActiveForecast] = useState(0);
    const [lineStyle, setLineStyle] = useState();
    const line = useRef(null);

    const activeHours = forecast[activeForecast].hour;

    const updateLineStyles = () => {
        const activeForecast = document.querySelector('.forecast-item.active');
        if(!activeForecast) return;
        const rect = activeForecast.getBoundingClientRect();
        // @ts-ignore
        line.current.style.bottom = 0;
        // @ts-ignore
        line.current.style.left = `${activeForecast.offsetLeft}px`;
        // @ts-ignore
        line.current.style.width = activeForecast.offsetWidth + 'px';
    }

    useEffect(() => {
        if(!line.current) return;
        updateLineStyles();
    }, [activeForecast]);

    useEffect(() => {
        window.addEventListener('resize', updateLineStyles);

        return () => window.removeEventListener('resize', updateLineStyles);
    }, []);

    return(
        <div className="weather-content">
            <div className="container">
                <div className="forecast">
                    <div className="forecast-selector flex">
                        {forecast.map((forecast, key) => {
                            return(
                                <Forecast 
                                    average_temp={forecast.day.avgtemp_c}
                                    condition={forecast.day.condition}
                                    day_unixtime={forecast.date_epoch}
                                    active={key === activeForecast}
                                    onClick={() => setActiveForecast(key)}
                                    key={key}
                                />
                            )
                        })}
                        <span className="active-forecast-line" ref={line}></span>
                    </div>
                    <div className="forecast-container flex space-between">
                        {activeHours.map((forecastHour, key) => {
                            return(
                                <ForecastHour 
                                    temp_c={forecastHour.temp_c}
                                    feelslike_c={forecastHour.feelslike_c}
                                    wind_kph={forecastHour.wind_kph}
                                    condition={forecastHour.condition}
                                    timestamp={forecastHour.time_epoch}
                                    chance_of_rain={forecastHour.chance_of_rain}
                                    key={key}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}