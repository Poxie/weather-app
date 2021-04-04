import React from 'react';
import { Tooltip } from '../../components/Tooltip';

interface Props {
    iconURL: string;
    text: string;
}
export const WeatherIcon: React.FC<Props> = ({iconURL, text}) => {
    return(
        <Tooltip text={text}>
            <div className="weather-icon flex align-center" has-tooltip="true" tooltip-text={text} tooltip-lowered="true">
                <img src={`https:${iconURL}`} alt=""/>
            </div>
        </Tooltip>
    )
}