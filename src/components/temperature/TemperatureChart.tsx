import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Button, Container } from "@mantine/core";
import { useTemperatureHistory } from "../../hooks/useTemperature";
import { useCity } from "../../context/CityContext";
import "./styles.css";

const TemperatureChart: React.FC = () => {
  const { city } = useCity();
  const { data, isLoading } = useTemperatureHistory(city, 5);

  //csv download
  const handleDownloadCSV = () => {
    window.location.href = `http://localhost:8000/temperature/${city}/download`;
  };

  return (
    <Container className="container">
      <h2>Temperature Trends for {city}</h2>

      {isLoading ? (
        <p>Loading temperature data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data?.temperature_history || []}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 14, fontWeight: 600 }}
                axisLine={{ strokeWidth: 2 }}
                tickLine={{ strokeWidth: 2 }}
                tickMargin={15}
              />

              <YAxis
                tick={{ fontSize: 14, fontWeight: 600 }}
                axisLine={{ strokeWidth: 2 }}
                tickLine={{ strokeWidth: 2 }}
              />

              <Tooltip
                contentStyle={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
                itemStyle={{ padding: "5px" }}
              />

              <Legend
                wrapperStyle={{
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingBottom: 10,
                }}
              />
              <Line
                type="monotone"
                dataKey="current_temperature"
                stroke="#3498db"
                name="Current Temperature"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="predicted_temperature"
                stroke="#e74c3c"
                name="Predicted Temperature"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ResponsiveContainer>
      )}

      <Button onClick={handleDownloadCSV} mt="xl">
        Download CSV
      </Button>
    </Container>
  );
};

export default TemperatureChart;
