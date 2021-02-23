import React from 'react';
import { usePopups } from '../../contexts/PopupContext';
import { Popup } from '../../popups/Popup';
import { WeatherIcon } from './WeatherIcon';

interface Props {
    temp_c: number;
    feelslike_c: number;
    condition: {
        text: string;
        icon: string;
    }
    wind_kph: number;
    timestamp: number;
    chance_of_rain: number;
}
export const ForecastHour: React.FC<Props> = ({temp_c, feelslike_c, condition, wind_kph, timestamp, chance_of_rain}) => {
    const popups: any = usePopups();

    const date = new Date(timestamp * 1000);
    let hour = JSON.stringify(date.getHours());
    if(hour.length === 1) {
        hour = `0${hour}`;
    }
    
    return(
        <div className="forecast-hour flex align-center">
            <div className="condition flex align-center">
                <div className="hour">
                    {hour}
                </div>
                <WeatherIcon 
                    iconURL={condition.icon}
                    text={condition.text}
                />
                {chance_of_rain > 0 ? (
                    <span className="chance-of-rain silent" has-tooltip="true" tooltip-text={`Chance of rain: ${chance_of_rain}%`}>
                        {chance_of_rain}%
                    </span>
                ) : null}
            </div>
            <div className="temperature flex align-center">
                <div className="temp">
                    <span has-tooltip="true" tooltip-text={`Currently: ${temp_c}°C`}>
                        {temp_c}°C
                    </span>
                </div>
                <div className="feels-like">
                    <span className="silent" has-tooltip="true" tooltip-text={`Feels like: ${feelslike_c}°C`}>
                        {feelslike_c}°C
                    </span>
                </div>
            </div>
        </div>
    )
}