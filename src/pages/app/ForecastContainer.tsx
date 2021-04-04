import { Flex } from "../../components/Flex"
import { ForecastHour } from "./ForecastHour"

interface Props {
    hours: CurrentWeatherData[]
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
export const ForecastContainer: React.FC<Props> = ({ hours }) => {
    return(
        <Flex className="forecast-container" justifyContent={'space-between'}>
            {hours.map((forecastHour, key) => {
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
        </Flex>
    )
}