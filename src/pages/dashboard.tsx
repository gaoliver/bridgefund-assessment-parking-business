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

          <section className={styles.charts}>
            <Chart
              title={PageData.overview.residents.label}
              description={PageData.overview.residents.description}
              rows={[
                { label: "available", value: "30/10" },
                { label: "percentage", value: "15%" },
                { label: "ending in 1h", value: "20" },
                { label: "starting in 1h", value: "5" },
              ]}
            />

            <Chart
              title={PageData.overview.nonResidentsCars.label}
              description={PageData.overview.nonResidentsCars.description}
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

            <Chart
              title={PageData.overview.nonResidentsMotorcyles.label}
              description={PageData.overview.nonResidentsMotorcyles.description}
              rows={[
                { label: "available", value: "30/10" },
                { label: "percentage", value: "15%" },
                { label: "ending in 1h", value: "20" },
                { label: "starting in 1h", value: "5" },
              ]}
              style={{
                backgroundColor: colors.secondary,
                color: colors.white,
              }}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
