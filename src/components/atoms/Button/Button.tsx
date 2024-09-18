import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  element?: "button" | "a";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  element,
  variant,
}) => {
  const Element = element || "button";

  return (
    <Element
      className={`${styles.component} ${variant ? styles[variant] : ""}`}
    >
      {children}
    </Element>
  );
};
