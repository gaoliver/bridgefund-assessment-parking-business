import React from "react";
import styles from "./Header.module.css";
import SiteData from "@/data/site.json";
import { Button } from "@/components/atoms";

export const Header = () => {
  return (
    <header className={styles.component}>
      <h1>{SiteData.title}</h1>

      <Button variant="secondary">
        Logout
      </Button>
    </header>
  );
};
