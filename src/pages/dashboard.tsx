import { Header } from "@/components/organisms";
import React from "react";
import styles from "@/styles/dashboard.module.css";
import { Overview } from "@/components/organisms/_features/Overview/Overview";
import { ParkingList } from "@/components/organisms/_features/ParkingList";
import useDashboardStore from "@/zustand/dashboard";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const Page = () => {
  const { activeContent } = useDashboardStore();

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.content}>
          {activeContent === "overview" && <Overview />}
          {activeContent === "list" && <ParkingList />}
        </div>
      </main>
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  }
};
