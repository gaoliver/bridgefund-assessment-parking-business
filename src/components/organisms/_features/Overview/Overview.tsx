import { colors } from "@/constants/colors";
import PageData from "@/data/dashboard.json";
import { Chart } from "../../Chart";
import styles from "./Overview.module.css";

export interface ChartProps {
  isOccupied?: boolean;
  rows: { label: string; value: string }[];
}
interface OverviewProps {
  residents: ChartProps;
  nonResidentsCars: ChartProps;
  nonResidentsMotorcyles: ChartProps;
}

export const Overview: React.FC<OverviewProps> = ({
  residents,
  nonResidentsCars,
  nonResidentsMotorcyles,
}) => {
  return (
    <>
      <h1>{PageData.title}</h1>

      <section className={styles.charts}>
        <Chart
          title={PageData.overview.residents.label}
          description={PageData.overview.residents.description}
          isOccupied={residents.isOccupied}
          rows={residents.rows}
        />

        <Chart
          title={PageData.overview.nonResidentsCars.label}
          description={PageData.overview.nonResidentsCars.description}
          isOccupied={nonResidentsCars.isOccupied}
          rows={nonResidentsCars.rows}
          style={{
            backgroundColor: colors.gray200,
          }}
        />

        <Chart
          title={PageData.overview.nonResidentsMotorcyles.label}
          description={PageData.overview.nonResidentsMotorcyles.description}
          isOccupied={nonResidentsMotorcyles.isOccupied}
          rows={nonResidentsMotorcyles.rows}
          style={{
            backgroundColor: colors.gray200,
          }}
        />
      </section>
    </>
  );
};
