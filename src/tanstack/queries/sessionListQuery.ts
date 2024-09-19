import { InternalRoutes } from "@/types/routes";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QueriesKeys } from "../queries";
import { ParkingSessionRowDto, ParkingSessionsListResponse } from "@/types/api";
import { useSession } from "next-auth/react";

export const useSessionListQuery = (): UseQueryResult<
  ParkingSessionRowDto[]
> => {
  const { data } = useSession();
  const accessToken = data?.user.accessToken;

  return useQuery({
    queryKey: [QueriesKeys.SESSION_LIST],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("No session available");
      }

      try {
        const response = await fetch(InternalRoutes.SessionsList, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: ParkingSessionsListResponse = await response.json();
        return data.parkingSessions;
      } catch (error) {
        console.error("Failed to fetch session list:", error);
        throw error;
      }
    },
  });
};
