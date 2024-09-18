import { Chart, Header } from "@/components/organisms";
import React from "react";
import styles from "@/styles/dashboard.module.css";
import { colors } from "@/constants/colors";
import PageData from "@/data/dashboard.json";

export default function dashboard() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <h1>{PageData.title}</h1>

          <Chart
            title={PageData.overview.total.label}
            description={PageData.overview.total.description}
            rows={[
              { label: "available", value: "30/10" },
              { label: "percentage", value: "15%" },
              { label: "ending in 1h", value: "20" },
              { label: "starting in 1h", value: "5" },
            ]}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
            }}
          />
        </div>
      </main>
    </div>
  );
}
