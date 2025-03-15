import { createContext, useContext, useState, ReactNode } from "react";


interface CityContextType {
  city: string;
  setCity: (newCity: string) => void;
  triggerWeatherFetch: boolean;
  setTriggerWeatherFetch: (value: boolean) => void;
}


const CityContext = createContext<CityContextType | undefined>(undefined);

//provider component
export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<string>("");
  const [triggerWeatherFetch, setTriggerWeatherFetch] = useState<boolean>(false);

  return (
    <CityContext.Provider value={{ city, setCity, triggerWeatherFetch, setTriggerWeatherFetch }}>
    {children}
  </CityContext.Provider>
  );
};

//custom hook to use CityContext
export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
