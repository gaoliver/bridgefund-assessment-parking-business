import { Header } from "@/components/organisms";
import React, { useState } from "react";
import styles from "@/styles/dashboard.module.css";
import { Overview } from "@/components/organisms/_features/Overview/Overview";

type ActiveContent = "overview" | "list";

export const Page = () => {
  const [activeContent, setActiveContent] = useState<ActiveContent>("overview");

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.content}>
          {activeContent === "overview" && <Overview />}
        </div>
      </main>
    </div>
  );
}

export default Page;
