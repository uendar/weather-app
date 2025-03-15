import { useState } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { useCity } from "../../../context/CityContext";
import './styles.css';

interface ForecastPopoverProps {
  showPopover: boolean;
  onClose: () => void;
  onCreate: (newForecast: { city: string; temperature: number; humidity: number; wind: number }) => void;
}

const ForecastPopover: React.FC<ForecastPopoverProps> = ({ showPopover, onClose, onCreate }) => {
  const { city } = useCity();
  const [newForecast, setNewForecast] = useState({ temperature: 0, humidity: 0, wind: 0 });

  return (
    <Modal opened={showPopover} onClose={onClose} title="Create New Forecast" >
      <TextInput
        label="Temperature (°C)"
        type="number"
        value={newForecast.temperature}
        onChange={(e) => setNewForecast({ ...newForecast, temperature: parseFloat(e.target.value) })}
      />
      <TextInput
        label="Humidity (%)"
        type="number"
        value={newForecast.humidity}
        onChange={(e) => setNewForecast({ ...newForecast, humidity: parseFloat(e.target.value) })}
      />
      <TextInput
        label="Wind (m/s)"
        type="number"
        value={newForecast.wind}
        onChange={(e) => setNewForecast({ ...newForecast, wind: parseFloat(e.target.value) })}
      />
      <Button fullWidth onClick={() => onCreate({ city, ...newForecast })} mt="md">
        Submit
      </Button>
    </Modal>
  );
};

export default ForecastPopover;
