import RealTimeWeather from "@features/realTimeWeather/RealTimeWeather";
import { MainContent } from "@widgets";

const RealTimeWeatherPage = () => (
  <MainContent className="h-screen bg-gray-400 px-8 py-16">
    <RealTimeWeather />
  </MainContent>
);

export default RealTimeWeatherPage;
