import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueriesKeys } from "../queries";
import { ParkingSessionRowDto, ParkingSessionsListResponse } from "@/types/api";
import { Session } from "next-auth";
import { InternalRoutes } from "@/types/routes";
import useAppState from "@/zustand/state";

interface SessionPayload {
  session: Session | undefined;
}

export const useSessionListIncrement = () => {
  const queryClient = useQueryClient();
  const {sessionListLimit, setHasReachedLimit, setSessionListLimit} = useAppState();

  const parkingSessionsList = queryClient.getQueryData<ParkingSessionRowDto[]>([
    QueriesKeys.SESSION_LIST,
  ]);

  return useMutation({
    mutationKey: [QueriesKeys.SESSION_LIST],
    mutationFn: async ({ session }: SessionPayload) => {
      if (!session) {
        throw new Error("No session available");
      }

      try {
        const searchOffset = Math.min(
          (parkingSessionsList || []).length + 1,
          sessionListLimit
        );

        const response = await fetch(
          `${InternalRoutes.SessionsList}?offset=${searchOffset}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: ParkingSessionsListResponse = await response.json();
        setSessionListLimit(data.parkingSessionsTotalCount);

        if (
          parkingSessionsList &&
          parkingSessionsList.length + 1 >= data.parkingSessionsTotalCount
        ) {
          setHasReachedLimit(true);
        }

        return data.parkingSessions;
      } catch (error) {
        console.error("Failed to mutate session list:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QueriesKeys.SESSION_LIST],
        (oldData: ParkingSessionRowDto[]) => {
          return [...(oldData || []), ...(data || [])];
        }
      );
    },
  });
};
