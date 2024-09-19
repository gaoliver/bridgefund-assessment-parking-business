import { ChartProps } from "@/components/organisms/_features/Overview/Overview";
import { ParkingSpaceRowDto } from "@/types/api";

export const mapChart = (data: ParkingSpaceRowDto | undefined): ChartProps => {
  if (!data) {
    return { isOccupied: false, rows: [] };
  }

  const { capacity, occupancy } = data;

  const isOccupied = Math.abs(occupancy) >= capacity;
  const available = Math.max(capacity - Math.abs(occupancy), 0);

  return {
    isOccupied,
    rows: [
      {
        label: "available",
        value: `${available}/${capacity}`,
      },
      {
        label: "percentage",
        value: `${(((capacity - available) / capacity) * 100).toFixed(2)}%`,
      },
    ],
  };
};
