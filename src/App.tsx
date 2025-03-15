import { ReactQueryProvider } from "./context/ClientProvider";
import ForecastTable from "./components/forecast/ForecastTable";
import TemperatureChart from "./components/temperature/TemperatureChart";
import { Weather } from "./components/weather/Weather";

function App() {
  return (
    <ReactQueryProvider>
      <Weather />
      <ForecastTable />
      <TemperatureChart />
    </ReactQueryProvider>
  );
}

export default App;
