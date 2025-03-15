import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchForecastsByCity, addForecast, updateForecast, deleteForecast } from "../api/forecast";
import { useCity } from "../context/CityContext";

export const useForecastsByCity = (city: string, limit: number = 3) => {
  return useQuery({
    queryKey: ["forecasts", city],
    queryFn: () => fetchForecastsByCity(city, limit),
    enabled: !!city,
  });
};

export const useAddForecast = () => {
  const queryClient = useQueryClient();
  const { setTriggerWeatherFetch } = useCity();

  return useMutation({
    mutationFn: addForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forecasts"] });
      setTriggerWeatherFetch(true); 
    },
  });
};

export const useUpdateForecast = () => {
  const queryClient = useQueryClient();
  const { setTriggerWeatherFetch } = useCity();

  return useMutation({
    mutationFn: updateForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forecasts"] });
      setTriggerWeatherFetch(true); 
    },
  }); 
};

export const useDeleteForecast = () => {
  const queryClient = useQueryClient();
  const { setTriggerWeatherFetch } = useCity();

  return useMutation({
    mutationFn: deleteForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forecasts"] });
      setTriggerWeatherFetch(true); 
    },
  });
};
