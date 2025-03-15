import { useQuery } from "@tanstack/react-query";
import { fetchTemperatureHistory } from "../api/temperature";

export const useTemperatureHistory = (city: string, days: number = 5) => {
  return useQuery({
    queryKey: ["temperatureHistory", city, days],
    queryFn: () => fetchTemperatureHistory(city, days),
    enabled: !!city,
  });
};
