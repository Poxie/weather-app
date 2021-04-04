import { useEffect, useRef } from "react";
import { Flex } from "../../components/Flex"
import { Forecast } from "./Forecast"

interface Props {
    forecast: Forecast[];
    activeForecast: number;
    setActiveForecast: (value: number) => void;
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
}
export const ForecastSelector: React.FC<Props> = ({ forecast, activeForecast, setActiveForecast }) => {
    const line: any = useRef(null);
    const updateLineStyles = () => {
        const activeForecast = document.querySelector<HTMLElement>('.forecast-item.active');
        if(!activeForecast || !line.current) return;
        const rect = activeForecast.getBoundingClientRect();
        line.current.style.bottom = 0;
        line.current.style.left = `${activeForecast.offsetLeft}px`;
        line.current.style.width = activeForecast.offsetWidth + 'px';
    }

    useEffect(() => {
        updateLineStyles();
    }, [activeForecast]);

    useEffect(() => {
        window.addEventListener('resize', updateLineStyles);

        return () => window.removeEventListener('resize', updateLineStyles);
    }, []);

    return(
        <Flex className="forecast-selector">
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
        </Flex>
    )
}