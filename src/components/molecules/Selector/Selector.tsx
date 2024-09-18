import React from "react";
import styles from "./Selector.module.css";
import { keyGenerator } from "@/utils/keyGenerator";

type Option = {
  value: string;
  label: string;
};

export interface SelectorProps extends React.HTMLProps<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  name,
  options = [],
  ...props
}) => {
  return (
    <div className={styles.component}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.field_wrapper}>
        <select name={name} className={styles.field} {...props}>
          {props.placeholder && (
            <option value="" className={styles.placeholder}>
              {props.placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={keyGenerator(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
