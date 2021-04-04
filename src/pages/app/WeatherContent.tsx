import React, { useEffect, useRef, useState } from 'react';
import { Flex } from '../../components/Flex';
import { Forecast } from './Forecast';
import { ForecastContainer } from './ForecastContainer';
import { ForecastHour } from './ForecastHour';
import { ForecastSelector } from './ForecastSelector';

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
    const activeHours = forecast[activeForecast].hour;

    return(
        <div className="weather-content">
            <div className="container">
                <div className="forecast">
                    <ForecastSelector 
                        activeForecast={activeForecast}
                        setActiveForecast={setActiveForecast}
                        forecast={forecast}
                    />
                    <ForecastContainer 
                        hours={activeHours}
                    />
                </div>
            </div>
        </div>
    )
}