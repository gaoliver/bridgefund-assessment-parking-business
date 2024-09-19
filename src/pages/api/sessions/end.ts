import { ApiResponse, ParkingSessionEndedResponse } from "@/types/api";
import { ApiRoutes } from "@/types/routes";
import type { NextApiRequest, NextApiResponse } from "next";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParkingSessionEndedResponse>
) {
  const { method, body, headers } = req;

  if (method !== "POST") {
    res.status(405).end();
    return;
  }

  try {
    const { parkingSession } =
      typeof body === "string" ? JSON.parse(body) : body;

    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}${ApiRoutes.PostEndSession}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: headers.authorization as string,
        },
        body: JSON.stringify({ parkingSession }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to end session.");
    }

    const data: ApiResponse<ParkingSessionEndedResponse> =
      await response.json();

    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
