import React from 'react';
import { Flex } from '../../components/Flex';
import { Tooltip } from '../../components/Tooltip';
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
                    <Tooltip text={`Chance of rain ${chance_of_rain}%`}>
                        <span className="chance-of-rain silent">
                            {chance_of_rain}%
                        </span>
                    </Tooltip>
                ) : null}
            </div>
            <Flex className="temperature" alignItems={'center'}>
                <div className="temp">
                    <Tooltip text={`Actually ${temp_c}°C`}>
                        <span className="silent">
                            {temp_c}°C
                        </span>
                    </Tooltip>
                </div>
                <div className="feels-like">
                    <Tooltip text={`Feels like ${feelslike_c}°C`}>
                        <span className="silent">
                            {feelslike_c}°C
                        </span>
                    </Tooltip>
                </div>
            </Flex>
        </div>
    )
}