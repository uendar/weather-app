import axiosInstance from "./instance";

//api to get weather based on city
export const fetchWeather = async (city: string) => {
  const { data } = await axiosInstance.get(`/weather/${city}`);
  return data;
};

