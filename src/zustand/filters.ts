import {
  FilterSessionType,
  FilterSortBy,
  FilterStatus,
  FilterVehicleType,
} from "@/types/parkingSessions";
import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  sessionType: FilterSessionType;
  status: FilterStatus;
  vehicleType: FilterVehicleType;
  sortBy: FilterSortBy;
  setSearchQuery: (query: string) => void;
  setSessionType: (sessionType: FilterSessionType) => void;
  setStatus: (status: FilterStatus) => void;
  setVehicleType: (vehicleType: FilterVehicleType) => void;
  setSortBy: (sortBy: FilterSortBy) => void;
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
