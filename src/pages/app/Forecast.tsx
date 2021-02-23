import React from 'react';
import { WeatherIcon } from './WeatherIcon';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Props {
    average_temp: number;
    condition: {
        text: string;
        icon: string;
    }
    day_unixtime: number;
    active: boolean;
    onClick: () => void;
}
export const Forecast: React.FC<Props> = ({average_temp, condition, day_unixtime, active, onClick}) => {
    const date = new Date(day_unixtime * 1000);
    const day = days[date.getDay()];

    return(
        <div className={`forecast-item${active ? ' active' : ''} flex align-center`} onClick={onClick}>
            <WeatherIcon 
                iconURL={condition.icon}
            />
            <div className="temperature">
                {average_temp}°C
            </div>
            <div className="forecast-day">
                <span>
                    {day}
                </span>
            </div>
        </div>
    )
}