import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueriesKeys } from "../queries";
import { ParkingSessionRowDto } from "@/types/api";
import { InternalRoutes } from "@/types/routes";
import { useSession } from "next-auth/react";

interface SessionPayload {
  parkingSessionId: string;
}

export const useSessionEndParking = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const parkingSessionsList = queryClient.getQueryData<ParkingSessionRowDto[]>([
    QueriesKeys.SESSION_LIST,
  ]);

  return useMutation({
    mutationKey: [QueriesKeys.SESSION_LIST],
    mutationFn: async ({ parkingSessionId }: SessionPayload) => {
      if (!session || !parkingSessionId) {
        throw new Error("No session available");
      }

      try {
        const response = await fetch(InternalRoutes.SessionsEnd, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({ parkingSession: { id: parkingSessionId } }),
        });

        if (!response.ok) {
          throw new Error("Failed to end session.");
        }

        return parkingSessionId;
      } catch (error) {
        console.error("Failed to mutate session list:", error);
        throw error;
      }
    },
    onSuccess: (sessionId) => {
      if (parkingSessionsList) {
        const changedSessionIndex = parkingSessionsList.findIndex(
          (s) => s.parkingSessionId === sessionId
        );

        if (changedSessionIndex !== -1) {
          const newSessionList = [...parkingSessionsList];
          newSessionList.splice(changedSessionIndex, 1);

          queryClient.setQueryData([QueriesKeys.SESSION_LIST], newSessionList);
        }
      }
    },
  });
};
