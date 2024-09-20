/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "@/components/organisms";
import React, { useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import { Overview } from "@/components/organisms/_features/Overview/Overview";
import { ParkingList } from "@/components/organisms/_features/ParkingList";
import useDashboardStore from "@/zustand/dashboard";
import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { ApiRoutes } from "@/types/routes";
import { ApiResponse, ParkingSpaceListResponse } from "@/types/api";
import { mapChart } from "@/utils/mapChart";
import { mapParkingList } from "@/utils/mapParkingList";
import useAppState from "@/zustand/state";
import { useSessionListIncrement } from "@/tanstack/mutations";
import { useSessionListQuery } from "@/tanstack/queries";
import PageData from "@/data/dashboard.json";

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const Page: NextPage<PageProps> = ({ parkingSpaces, session }) => {
  const { data: parkingSessionsList, isLoading } = useSessionListQuery();
  const { mutateAsync, isPending: isFetchingMore } = useSessionListIncrement();
  const { activeContent } = useDashboardStore();
  const { setAcessToken, hasReachedLimit } = useAppState();

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
    if (!hasReachedLimit) {
      await mutateAsync({ session });
    }
  };

  useEffect(() => {
    if (session) {
      setAcessToken(session.user.accessToken);
    }
  }, [session]);

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
              isLoading={isLoading || isFetchingMore}
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

  try {
    const [parkingSpaces] = await Promise.all([getParkingSpaces()]);
    return {
      props: {
        parkingSpaces,
        session,
        seo: {
          title: PageData.title,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
