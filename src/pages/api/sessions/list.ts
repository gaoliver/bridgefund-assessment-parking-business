import { LIST_SEARCH_LIMIT } from "@/constants/parkingSessions";
import { ApiResponse, ParkingSessionsListResponse } from "@/types/api";
import { ApiRoutes } from "@/types/routes";
import type { NextApiRequest, NextApiResponse } from "next";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParkingSessionsListResponse>
) {
  const { query, headers } = req;

  try {
    const { offset } = query;

    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}${ApiRoutes.GetSessionsList}?offset=${offset}&limit=${LIST_SEARCH_LIMIT}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: headers.authorization as string,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch list.");
    }

    const data: ApiResponse<ParkingSessionsListResponse> =
      await response.json();

    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
