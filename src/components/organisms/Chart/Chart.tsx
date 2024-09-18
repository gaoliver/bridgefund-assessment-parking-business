import { Card } from "@/components/atoms";
import styles from "./Chart.module.css";
import React from "react";
import { slugGenerator } from "@/utils/slugGenerator";

interface ChartProps {
  title: string;
  description?: string;
  rows?: Array<{ label: string; value: string }>;
  style?: React.CSSProperties;
}

export const Chart: React.FC<ChartProps> = ({
  title,
  description,
  rows = [],
  style,
}) => {
  return (
    <Card style={style}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <table className={styles.table}>
        <tbody>
          {rows.map((row) => (
            <tr key={slugGenerator(row.label)}>
              <td>{row.label.toUpperCase()}</td>
              <td>{row.value.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
