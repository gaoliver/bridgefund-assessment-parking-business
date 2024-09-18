import React from "react";
import styles from "./Filters.module.css";
import { Selector, TextInput } from "@/components/molecules";

const sectionTypeOptions = [
  { value: "all", label: "All" },
  { value: "residents", label: "Residents" },
  { value: "non-residents-cars", label: "Non-Residents Cars" },
  { value: "non-residents-motorcycles", label: "Non-Residents Motorcycles" },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "occupied", label: "Occupied" },
];

const vehicleOptions = [
  { value: "all", label: "All" },
  { value: "car", label: "Car" },
  { value: "motorcycle", label: "Motorcycle" },
];

const sortOptions = [
  { value: "parkingSpace", label: "Parking space" },
  { value: "status", label: "Status" },
  { value: "startTime", label: "Start time" },
  { value: "endTime", label: "End time" },
  { value: "vehicleType", label: "Vehicle" },
];

export const Filters = () => {
  return (
    <div className={styles.filters}>
      <div style={{ flex: 0.5 }}>
        <TextInput
          label="Search"
          name="search"
          placeholder="License plate/Parking space"
        />
      </div>

      <Selector
        label="Section type"
        name="sectionType"
        options={sectionTypeOptions}
      />

      <Selector label="Status" name="status" options={statusOptions} />
      <Selector label="Vehicle" name="vehicle" options={vehicleOptions} />
      <Selector label="Sort by" name="sortBy" options={sortOptions} />
    </div>
  );
};
