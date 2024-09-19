import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useAppState;
