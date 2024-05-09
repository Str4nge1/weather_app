import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@utils/httpClient";
import { transformKeysToCamelCase } from "@utils/object";
import { AxiosError } from "axios";

const WEATHER_URL = "data/2.5/weather";

type RealTimeWeatherParams = {
  latitude: number | undefined;
  longitude: number | undefined;
  q: string | null;
};

type RealTimeWeatherResponse = {
  main: {
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    humidity: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  wind: { deg: number; speed: number };
  weather: { description: string; icon: string; id: number; main: string }[];
  name: string;
};

const useRealTimeWeather = (params: RealTimeWeatherParams) => {
  const { latitude, longitude, q } = params;
  const { data, isLoading, error } = useQuery({
    queryKey: ["useRealTimeWeather", { latitude, longitude, q }],
    queryFn: () => getRealTimeWeather(params),
    enabled: !!((latitude && longitude) || q),
  });

  return {
    data,
    isLoading,
    error: (error as AxiosError)?.response?.data as { message?: string },
  };
};

const getRealTimeWeather = async ({
  latitude,
  longitude,
  q,
}: RealTimeWeatherParams) => {
  const { data } = await axiosInstance.get<RealTimeWeatherResponse>(
    WEATHER_URL,
    {
      params: {
        lat: latitude,
        lon: longitude,
        q,
      },
    }
  );

  return transformKeysToCamelCase(data) as RealTimeWeatherResponse;
};

export default useRealTimeWeather;
