import React from "react";
import styles from "./ParkingList.module.css";

export const ParkingList = () => {
  return (
    <>
    <header>
      <h1></h1>
    </header>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Available</th>
          </tr>
        </thead>
      </table>
    </>
  );
};
