import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weather";

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
    refetchOnWindowFocus: false, 
    staleTime: 0, 
  });
};