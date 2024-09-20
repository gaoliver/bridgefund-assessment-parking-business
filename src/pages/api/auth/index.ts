import { UserResponse } from "@/types/api";
import { ApiRoutes } from "@/types/routes";
import type { NextApiRequest, NextApiResponse } from "next";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } =
          typeof body === "string" ? JSON.parse(body) : body;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const response = await fetch(NEXT_PUBLIC_API_URL + ApiRoutes.PostAuth, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }

        const { data }: { data: UserResponse } = await response.json();

        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;

    default:
      try {
        const response = await fetch(NEXT_PUBLIC_API_URL + ApiRoutes.GetAuth);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;
  }
}
