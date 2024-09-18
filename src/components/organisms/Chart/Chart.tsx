import { Card } from "@/components/atoms";
import styles from "./Chart.module.css";
import React from "react";
import { keyGenerator } from "@/utils/keyGenerator";

interface ChartProps {
  title: string;
  description?: string;
  rows?: Array<{ label: string; value: string }>;
  style?: React.CSSProperties;
}

export const Chart: React.FC<ChartProps> = ({
  title,
  description,
  rows,
  style,
}) => {
  return (
    <Card style={style}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      {!!rows?.length && (
        <table className={styles.table}>
          {rows?.map((row) => (
            <tr key={keyGenerator(row.label)}>
              <td>{row.label.toUpperCase()}</td>
              <td>{row.value.toUpperCase()}</td>
            </tr>
          ))}
        </table>
      )}
    </Card>
  );
};
