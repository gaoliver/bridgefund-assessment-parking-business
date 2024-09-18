import { colors } from "@/constants/colors";
import PageData from "@/data/dashboard.json";
import { Button } from "@/components/atoms";
import { Chart } from "../../Chart";
import styles from "./Overview.module.css";

export const Overview = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>{PageData.title}</h1>

        <Button>See complete list</Button>
      </header>

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
            backgroundColor: colors.gray200,
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
            backgroundColor: colors.gray200,
          }}
        />
      </section>
    </>
  );
};