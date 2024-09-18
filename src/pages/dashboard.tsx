import { Header } from "@/components/organisms";
import React from "react";
import styles from "@/styles/dashboard.module.css";

export default function dashboard() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <h1>Dashboard</h1>
        </div>
      </main>
    </div>
  );
}
