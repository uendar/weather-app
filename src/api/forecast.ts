import axiosInstance from "./instance";

interface Forecast {
  forecast_id: string;
  forecast_date: string;
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
}

export interface UpdateForecastParams {
  id: string;
  forecast: Partial<Forecast>; 
}

//api to fetch forecast by city name and limit number of days (default 3)
export const fetchForecastsByCity = async (city: string, limit: number = 3) => {
  const { data } = await axiosInstance.get(`/forecasts`, {
    params: { city, limit }, 
  });
  return data;
};

//api to add forecast
export const addForecast = async (forecast: any) => {
  const { data } = await axiosInstance.post("/forecasts", forecast);
  return data;
};

//api to update forecast
export const updateForecast = async ({ id, forecast }: UpdateForecastParams) => {
  const { data } = await axiosInstance.put(`/forecasts/${id}`, forecast);
  return data;
};

//api to delete forecast
export const deleteForecast = async (id: string) => {
  await axiosInstance.delete(`/forecasts/${id}`);
};
