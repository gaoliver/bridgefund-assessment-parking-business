import { VehicleType } from "./api";

export enum Status {
  Available = "Available",
  Occupied = "Occupied",
}
export type StoreVehicleType = VehicleType | "all";

export enum SessionType {
  Residents = "residents",
  NonResidentsCars = "non-residents-cars",
  NonResidentsMotorcycles = "non-residents-motorcycles",
}

export enum TableSessionType {
  Resident = "Resident",
  NonResident = "Non-resident",
}

export type ParkingListResultProps = {
  parkingSpace: string;
  sessionType: TableSessionType;
  status: Status;
  startTime: string;
  endTime: string;
  vehicleType: VehicleType;
  licensePlate: string;
};

export type FilterSortBy =
  | "parkingSpace"
  | "status"
  | "startTime"
  | "endTime"
  | "vehicleType";
export type FilterStatus = Status | "all";
export type FilterVehicleType = VehicleType | "all";
export type FilterSessionType = SessionType | "all";
