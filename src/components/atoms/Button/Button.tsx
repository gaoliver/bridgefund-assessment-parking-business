import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  type?: "button" | "submit" | "reset";
  color?: "danger" | "warning" | "success" | "info";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  color,
  ...props
}) => {
  return (
    <button
      className={`${styles.component} ${variant ? styles[variant] : ""} ${color ? styles[color] : ""}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
