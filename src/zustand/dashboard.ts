import { create } from "zustand";

interface DashboardState {
  activeContent: "overview" | "list";
  setActiveContent: (activeContent: "overview" | "list") => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  activeContent: "overview",
  setActiveContent: (activeContent) => set({ activeContent }),
}));

export default useDashboardStore;
