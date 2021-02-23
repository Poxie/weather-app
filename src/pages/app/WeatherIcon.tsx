import React from 'react';

interface Props {
    iconURL: string;
}
export const WeatherIcon: React.FC<Props> = ({iconURL}) => {
    return(
        <div className="weather-icon flex align-center">
            <img src={`https:${iconURL}`} alt=""/>
        </div>
    )
}