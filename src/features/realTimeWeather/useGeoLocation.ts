import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setError(null);
      setLocation(e.coords);
    };
    const errorHandler = (e: GeolocationPositionError) => {
      setError(e);
    };
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);
  return { location, error };
}
