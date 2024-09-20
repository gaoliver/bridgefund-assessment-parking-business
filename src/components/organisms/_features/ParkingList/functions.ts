import { VehicleType } from "@/types/api";
import {
  FilterSessionType,
  FilterSortBy,
  FilterStatus,
  FilterVehicleType,
  ParkingListResultProps,
  SessionType,
  Status,
  TableSessionType,
} from "@/types/parkingSessions";

export const filterSessionType = (
  item: ParkingListResultProps,
  sessionType: FilterSessionType
) => {
  if (sessionType !== "all") {
    if (
      sessionType === SessionType.Residents &&
      item.sessionType !== TableSessionType.Resident
    ) {
      return false;
    }

    if (
      sessionType === SessionType.NonResidentsCars &&
      (item.sessionType !== TableSessionType.NonResident ||
        item.vehicleType !== VehicleType.CAR)
    ) {
      return false;
    }

    if (
      sessionType === SessionType.NonResidentsMotorcycles &&
      (item.sessionType !== TableSessionType.NonResident ||
        item.vehicleType !== VehicleType.MOTOR)
    ) {
      return false;
    }
  }

  return true;
};

export const filterStatus = (
  item: ParkingListResultProps,
  status: FilterStatus
) => {
  if (status !== "all") {
    if (status === Status.Available && item.status !== "Available") {
      return false;
    }

    if (status === Status.Occupied && item.status !== "Occupied") {
      return false;
    }
  }

  return true;
};

export const filterVehicleType = (
  item: ParkingListResultProps,
  vehicleType: FilterVehicleType
) => {
  if (vehicleType !== "all" && item.vehicleType !== vehicleType) {
    return false;
  }

  return true;
};

export const handleSortBy = (
  a: ParkingListResultProps,
  b: ParkingListResultProps,
  sortBy: FilterSortBy
) => {
  if (sortBy === "parkingSpace") {
    return a.parkingSpace.localeCompare(b.parkingSpace);
  }
  if (sortBy === "status") {
    return a.status.toLowerCase().localeCompare(b.status.toLowerCase());
  }
  if (sortBy === "startTime") {
    return a.startTime.localeCompare(b.startTime);
  }
  if (sortBy === "endTime") {
    return a.endTime.localeCompare(b.endTime);
  }
  if (sortBy === "vehicleType") {
    return (a.vehicleType.toString() || "").localeCompare(
      b.vehicleType.toString() || ""
    );
  }
  return 0;
};
