import { Header } from "@/components/organisms";
import React, { useState } from "react";
import styles from "@/styles/dashboard.module.css";
import { Overview } from "@/components/organisms/_features/Overview/Overview";
import { ParkingList } from "@/components/organisms/_features/ParkingList";
import useDashboardStore from "@/zustand/dashboard";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { ApiRoutes, InternalRoutes } from "@/types/routes";
import {
  ApiResponse,
  ParkingSessionRowDto,
  ParkingSessionsListResponse,
  ParkingSpaceListResponse,
} from "@/types/api";
import { mapChart } from "@/utils/mapChart";
import { mapParkingList } from "@/utils/mapParkingList";
import useAppState from "@/zustand/state";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const Page: NextPage<PageProps> = ({
  parkingSpaces,
  parkingSessions,
  session,
}) => {
  const { isLoading, setIsLoading } = useAppState();
  const { activeContent } = useDashboardStore();

  const [parkingSessionsList, setParkingSessionsList] = useState<
    ParkingSessionRowDto[] | undefined
  >();

  const residentSpaces = parkingSpaces?.find(
    (space) => space.parkingSpaceId === 1
  );
  const nonResidentCarSpaces = parkingSpaces?.find(
    (space) => space.parkingSpaceId === 2
  );
  const nonResidentMotorcycleSpaces = parkingSpaces?.find(
    (space) => space.parkingSpaceId === 3
  );

  const handleFetchMore = async () => {
    if (isLoading) return;

    const searchOffset = (parkingSessions || []).length + 1;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${InternalRoutes.SessionsList}?offset=${searchOffset}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      const data: ParkingSessionsListResponse = await response.json();

      const filteredList = data.parkingSessions.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (obj) => obj.parkingSessionId === item.parkingSessionId
          )
      );

      setParkingSessionsList((prev) => [...(prev || []), ...filteredList]);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setParkingSessionsList(parkingSessions);
  }, [parkingSessions]);

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
          {activeContent === "list" && (
            <ParkingList
              listResult={mapParkingList(parkingSessionsList || [])}
              fetchMore={handleFetchMore}
            />
          )}
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
        session,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
