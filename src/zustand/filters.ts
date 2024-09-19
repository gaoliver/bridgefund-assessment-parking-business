import { VehicleType } from "@/types/api";
import { create } from "zustand";

export type sortBy =
  | "parkingSpace"
  | "status"
  | "startTime"
  | "endTime"
  | "vehicleType";
export type SessionType =
  | "all"
  | "residents"
  | "non-residents-cars"
  | "non-residents-motorcycles";
export type Status = "all" | "available" | "occupied";
export type StoreVehicleType = VehicleType | "all";

interface FilterState {
  searchQuery: string;
  sessionType: SessionType;
  status: Status;
  vehicleType: StoreVehicleType;
  sortBy: sortBy;
  setSearchQuery: (query: string) => void;
  setSessionType: (sessionType: SessionType) => void;
  setStatus: (status: Status) => void;
  setVehicleType: (vehicleType: StoreVehicleType) => void;
  setSortBy: (sortBy: sortBy) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  searchQuery: "",
  sessionType: "all",
  status: "all",
  vehicleType: "all",
  sortBy: "parkingSpace",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSessionType: (sessionType) => set({ sessionType }),
  setStatus: (status) => set({ status }),
  setVehicleType: (vehicleType) => set({ vehicleType }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useFilterStore;
