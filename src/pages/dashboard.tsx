import { Header } from "@/components/organisms";
import React from "react";
import styles from "@/styles/dashboard.module.css";
import { Overview } from "@/components/organisms/_features/Overview/Overview";
import { ParkingList } from "@/components/organisms/_features/ParkingList";
import useDashboardStore from "@/zustand/dashboard";

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
