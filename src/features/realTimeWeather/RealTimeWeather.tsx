import { useState } from "react";
import debounce from "lodash.debounce";

import useGeolocation from "./useGeoLocation";
import useRealTimeWeather from "./useRealTimeWeather";

import { Card, Input, Text, LoadingOverlay } from "@widgets";
import generateIconUrl from "@utils/icon";

import { FaRegEye, FaTemperatureHigh } from "react-icons/fa";
import { GiWhirlwind, GiSunrise, GiSunset } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";

import ReactSpeedometer from "react-d3-speedometer";

const RealTimeWeather = () => {
  const [search, setSearch] = useState(null);
  const { location } = useGeolocation();
  const { latitude, longitude } = location || {};

  const { data, isLoading, error } = useRealTimeWeather({
    latitude,
    longitude,
    q: search,
  });

  const {
    name,
    weather,
    visibility,
    main: {
      temp = 0,
      feelsLike = 0,
      tempMin = 0,
      tempMax = 0,
      humidity = 0,
      pressure = 0,
    } = {},
    wind: { deg = 0, speed = 0 } = {},
    sys: { sunrise = 0, sunset = 0 } = {},
  } = data || {};
  const currentWeather = weather ? weather[0] : null;

  return (
    <div className="h-full relative ">
      {isLoading && <LoadingOverlay />}
      <div className="h-full relative rounded-3xl bg-white overflow-hidden">
        <div className="h-full grid grid-cols-10 gap-4">
          <div className="col-span-3 p-10 flex flex-col gap-4">
            <div className="">
              <Input
                type="search"
                placeholder="Search City"
                onChange={debounce((e) => {
                  setSearch(e.target.value);
                }, 500)}
                className="rounded-md"
                disabled={isLoading}
              />
            </div>
            {error?.message ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center"
                role="alert"
              >
                {error.message}
              </div>
            ) : (
              <div className="flex-1 p-4 flex justify-center">
                {currentWeather ? (
                  <>
                    <div className="w-full flex flex-col gap-4 items-center">
                      <img
                        className="w-60 h-60"
                        src={generateIconUrl(currentWeather.icon)}
                      />
                      <div className="flex gap-1 justify-center items-center">
                        <Text size="lg" className="text-center uppercase">
                          {name}
                        </Text>
                        -
                        <Text className="text-center capitalize">
                          {currentWeather.description}
                        </Text>
                      </div>
                      <Text className="!text-9xl my-10">{temp}&deg;C</Text>
                      <div className="w-8/12 flex flex-1 flex-col gap-4">
                        <Card className="h-2/6 bg-gray-400">
                          <Card.Header>
                            <div className="flex gap-2 items-center">
                              <FaTemperatureHigh className="stroke-gray-400 fill-white size-6" />
                              <Text
                                variant="white"
                                size="lg"
                                className="font-bold"
                              >
                                Feels Like
                              </Text>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Text variant="white" className="!text-4xl">
                              {feelsLike}&deg;C
                            </Text>
                          </Card.Body>
                          <Card.Footer>
                            <div className="flex gap-4">
                              <Text variant="white">
                                Minimum - {tempMin}&deg;C
                              </Text>
                              <Text variant="white">
                                Maximum - {tempMax}&deg;C
                              </Text>
                            </div>
                          </Card.Footer>
                        </Card>
                        <Card className="h-2/6 bg-gray-400">
                          <Card.Header>
                            <div className="flex gap-2 items-center">
                              <FaRegEye className="fill-white size-6" />
                              <Text
                                variant="white"
                                size="lg"
                                className="font-bold"
                              >
                                Visibility
                              </Text>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Text variant="white" className="!text-4xl">
                              {visibility}M
                            </Text>
                          </Card.Body>
                          <Card.Footer>
                            <Text variant="white">Visibility, meter.</Text>
                          </Card.Footer>
                        </Card>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
          <div className="col-span-7 bg-slate-100 p-10 flex flex-col gap-4">
            <Text className="!text-4xl">Today's Weather</Text>
            <div className="w-full h-auto">
              <Card className="bg-white">
                <Card.Header>
                  <div className="flex gap-2 items-center justify-center">
                    <GiWhirlwind className="size-6" />
                    <Text size="lg">Wind</Text>
                  </div>
                </Card.Header>
                <Card.Body className="flex justify-center">
                  <ReactSpeedometer
                    maxValue={speed > 20 ? speed + 2 : 20}
                    value={speed}
                    needleColor="grey"
                    startColor="white"
                    segments={10}
                    endColor="red"
                    currentValueText={"${value} mph"}
                    width={400}
                  />
                </Card.Body>
                <Card.Footer className="text-center">
                  <Text size="lg">Wind Direction (degree): {deg}&deg; </Text>
                </Card.Footer>
              </Card>
            </div>
            <div className="w-full flex gap-4 px-20">
              <Card className="bg-white">
                <Card.Header>
                  <div className="flex gap-2 items-center">
                    <WiHumidity className="size-10" />
                    <Text size="lg">Humidity</Text>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Text size="lg">{humidity}%</Text>
                </Card.Body>
              </Card>
              <Card className="bg-white">
                <Card.Header>
                  <Text size="lg">Pressure</Text>
                </Card.Header>
                <Card.Body>
                  <Text size="lg">{pressure}</Text>
                </Card.Body>
                <Card.Footer>
                  <Text>Atmospheric pressure on the sea level, hPa</Text>
                </Card.Footer>
              </Card>
            </div>
            <div className="w-full flex gap-4 px-20">
              <Card className="bg-white">
                <Card.Header>
                  <div className="flex gap-2 items-center">
                    <GiSunrise className="size-10" />
                    <Text size="lg">Sunrise</Text>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Text size="lg">
                    {new Date(sunrise).toLocaleTimeString()}
                  </Text>
                </Card.Body>
              </Card>
              <Card className="bg-white">
                <Card.Header>
                  <div className="flex gap-2 items-center">
                    <GiSunset className="size-10" />
                    <Text size="lg">Sunset</Text>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Text size="lg">{new Date(sunset).toLocaleTimeString()}</Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeWeather;
