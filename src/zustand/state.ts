import { LIST_SEARCH_LIMIT } from "@/constants/parkingSessions";
import { create } from "zustand";

interface AppState {
  acessToken: string;
  sessionListLimit: number;
  hasReachedLimit: boolean;
  setAcessToken: (acessToken: string) => void;
  setSessionListLimit: (sessionListLimit: number) => void;
  setHasReachedLimit: (hasReachedLimit: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  acessToken: "",
  sessionListLimit: LIST_SEARCH_LIMIT,
  hasReachedLimit: false,
  setAcessToken: (acessToken) => set({ acessToken }),
  setSessionListLimit: (sessionListLimit) => set({ sessionListLimit }),
  setHasReachedLimit: (hasReachedLimit) => set({ hasReachedLimit }),
}));

export default useAppState;
