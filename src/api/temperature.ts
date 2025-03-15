import axiosInstance from "./instance";

//api to get temperature perediction 
export const fetchTemperatureHistory = async (city: string, days: number) => {
    const { data } = await axiosInstance.get(`/temperature/${city}`, {
      params: { days },
    });
    return data;
  };
  