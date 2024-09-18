import React from "react";
import styles from "./Header.module.css";
import SiteData from "@/data/site.json";
import { Button } from "@/components/atoms";
import useDashboardStore from "@/zustand/dashboard";

export const Header = () => {
  const { setActiveContent } = useDashboardStore();

  const handleOverviewClick = () => {
    setActiveContent("overview");
  };

  const handleListClick = () => {
    setActiveContent("list");
  };

  return (
    <header className={styles.component}>
      <h1>{SiteData.title}</h1>

      <menu className={styles.menu}>
        <Button onClick={handleOverviewClick} variant="ghost">
          Overview
        </Button>
        <Button onClick={handleListClick} variant="ghost">
          Parking List
        </Button>
      </menu>

      <Button variant="secondary">Logout</Button>
    </header>
  );
};
