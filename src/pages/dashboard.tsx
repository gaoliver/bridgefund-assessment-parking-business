import { Header } from "@/components/organisms";
import React from "react";
import styles from "@/styles/dashboard.module.css";
import { Overview } from "@/components/organisms/_features/Overview/Overview";
import { ParkingList } from "@/components/organisms/_features/ParkingList";
import useDashboardStore from "@/zustand/dashboard";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { ApiRoutes } from "@/types/routes";
import {
  ApiResponse,
  ParkingSessionsListResponse,
  ParkingSpaceListResponse,
} from "@/types/api";
import { mapChart } from "@/utils/mapChart";
import { mapParkingList } from "@/utils/mapParkingList";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const Page: NextPage<PageProps> = ({ parkingSpaces, parkingSessions }) => {
  const { activeContent } = useDashboardStore();

  const residentSpaces = parkingSpaces?.find(
    (space) => space.parkingSpaceId === 1
  );
  const nonResidentCarSpaces = parkingSpaces?.find(
    (space) => space.parkingSpaceId === 2
  );
  const nonResidentMotorcycleSpaces = parkingSpaces?.find(
    (space) => space.parkingSpaceId === 3
  );

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.content}>
          {activeContent === "overview" && (
            <Overview
              residents={mapChart(residentSpaces)}
              nonResidentsCars={mapChart(nonResidentCarSpaces)}
              nonResidentsMotorcyles={mapChart(nonResidentMotorcycleSpaces)}
            />
          )}
          {activeContent === "list" && <ParkingList listResult={mapParkingList(parkingSessions || [])} />}
        </div>
      </main>
    </div>
  );
};

export default Page;

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  async function getParkingSpaces() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.GetSpacesList}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );

    const data: ApiResponse<ParkingSpaceListResponse> = await response.json();

    return data.data.parkingSpaces;
  }

  async function getParkingSessions() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.GetSessionsList}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      }
    );

    const data: ApiResponse<ParkingSessionsListResponse> =
      await response.json();

    return data.data.parkingSessions;
  }

  try {
    const [parkingSpaces, parkingSessions] = await Promise.all([
      getParkingSpaces(),
      getParkingSessions(),
    ]);
    return {
      props: {
        parkingSpaces,
        parkingSessions,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
