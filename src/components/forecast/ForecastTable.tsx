import { useState } from "react";
import { useCity } from "../../context/CityContext";
import {
  useDeleteForecast,
  useForecastsByCity,
  useUpdateForecast,
  useAddForecast,
} from "../../hooks/useForecast";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import {
  Button,
  TextInput,
  Group,
  Container,
  ScrollArea,
} from "@mantine/core";
import ForecastPopover from "./popover/ForecastPopover";
import "./styles.css";


export interface Forecast {
  forecast_id: string;
  forecast_date?: string;
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
}

const ForecastTable: React.FC = () => {
  const { city } = useCity();
  const { data: forecasts = [] } = useForecastsByCity(city, 5);
  const deleteForecast = useDeleteForecast();
  const updateForecast = useUpdateForecast();
  const addForecast = useAddForecast();

  const [editingRow, setEditingRow] = useState<Forecast | null>(null);
  const [editedData, setEditedData] = useState<Partial<Forecast>>({});
  const [showPopover, setShowPopover] = useState(false);

  //update forecast
  const handleUpdate = () => {
    if (editingRow) {
      updateForecast.mutate({
        id: editingRow.forecast_id,
        forecast: { ...editingRow, ...editedData },
      });
      setEditingRow(null);
    }
  };

  //create forecast
  const handleCreateForecast = (newForecast: Omit<Forecast, "forecast_id">) => {
    addForecast.mutate(newForecast);
    setShowPopover(false);
  };

  //columns definition
  const columns: MRT_ColumnDef<Forecast>[] = [
    {
      accessorKey: "temperature",
      header: "Temperature (°C)",
      Cell: ({ row }) =>
        editingRow?.forecast_id === row.original.forecast_id ? (
          <TextInput
            defaultValue={row.original.temperature}
            className="small-input"
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                temperature: parseFloat(e.target.value),
              }))
            }
          />
        ) : (
          row.original.temperature
        ),
    },
    {
      accessorKey: "humidity",
      header: "Humidity (%)",
      Cell: ({ row }) =>
        editingRow?.forecast_id === row.original.forecast_id ? (
          <TextInput
            defaultValue={row.original.humidity}
            className="small-input"
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                humidity: parseFloat(e.target.value),
              }))
            }
          />
        ) : (
          row.original.humidity
        ),
    },
    {
      accessorKey: "wind",
      header: "Wind (m/s)",
      Cell: ({ row }) =>
        editingRow?.forecast_id === row.original.forecast_id ? (
          <TextInput
            defaultValue={row.original.wind}
            className="small-input"
            onChange={(e) =>
              setEditedData((prev) => ({
                ...prev,
                wind: parseFloat(e.target.value),
              }))
            }
          />
        ) : (
          row.original.wind
        ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div className="button-group">
          {editingRow?.forecast_id === row.original.forecast_id ? (
            <>
              <Button
                size="xs"
                color="green"
                className="save-btn"
                onClick={handleUpdate}
              >
                Save
              </Button>
              <Button
                size="xs"
                color="gray"
                className="cancel-btn"
                onClick={() => setEditingRow(null)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                size="xs"
                color="yellow"
                className="edit-btn"
                onClick={() => setEditingRow(row.original)}
              >
                Edit
              </Button>
              <Button
                size="xs"
                color="red"
                className="delete-btn"
                onClick={() => deleteForecast.mutate(row.original.forecast_id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
  

  return (
    <Container className="container">
     <Group
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <h2>Forecast Table for {city}</h2>
        <Button className="custom-button" onClick={() => setShowPopover(true)}>
          Add Forecast
        </Button>
      </Group>


   
      <ScrollArea h={400} style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
        <MantineReactTable
          columns={columns}
          data={forecasts}
          enablePagination={true}
          enableSorting={true}
          enableColumnFilters={true}
          enableStickyHeader
          enableRowNumbers
          mantineTableBodyProps={{
            style: { fontSize: "14px", lineHeight: "1.2" }, 
          }}
          mantineTableBodyCellProps={{
            style: { textAlign: "center", padding: "6px" }, 
          }}
        />
      </ScrollArea>


      {showPopover && (
        <ForecastPopover showPopover={showPopover} onClose={() => setShowPopover(false)} onCreate={handleCreateForecast} />
      )}
    </Container>
  );
};

export default ForecastTable;
