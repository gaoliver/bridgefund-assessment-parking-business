import React from "react";
import PageData from "@/data/dashboard.json";
import styles from "./ParkingList.module.css";
import { Button } from "@/components/atoms";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/formatDate";
import { Filters } from "../Filters";
import useFilterStore, { SectionType, Status } from "@/zustand/filters";

type VehicleType = "Car" | "Motorcycle" | undefined;
type TableSectionType = Omit<SectionType, "all">;
type TableStatus = Omit<Status, "all">;

type ListResult = {
  parkingSpace: string;
  sectionType: TableSectionType;
  status: TableStatus;
  startTime: string;
  endTime: string;
  vehicleType: VehicleType;
  licensePlate: string;
}[];

const listResult: ListResult = [
  {
    parkingSpace: "A1",
    sectionType: "Residents",
    status: "Occupied",
    startTime: "2023-10-01T08:00:00Z",
    endTime: "2023-10-01T10:00:00Z",
    vehicleType: "Car",
    licensePlate: "ABC123",
  },
  {
    parkingSpace: "B2",
    sectionType: "Non-residents",
    status: "Available",
    startTime: "",
    endTime: "",
    vehicleType: undefined,
    licensePlate: "",
  },
  {
    parkingSpace: "C3",
    sectionType: "Non-residents",
    status: "Occupied",
    startTime: "2023-10-01T09:00:00Z",
    endTime: "2023-10-01T11:00:00Z",
    vehicleType: "Motorcycle",
    licensePlate: "XYZ789",
  },
];

const getStatusColor = (status: TableStatus) => {
  return status === "Available" ? colors.green : colors.red;
};

export const ParkingList = () => {
  const { searchQuery, sectionType, sortBy, status, vehicleType } =
    useFilterStore();

  const filterSectionType = (item: ListResult[0]) => {
    if (sectionType !== "all") {
      if (sectionType === "residents" && item.sectionType !== "Residents") {
        return false;
      }

      if (
        sectionType === "non-residents-cars" &&
        (item.sectionType !== "Non-residents" || item.vehicleType !== "Car")
      ) {
        return false;
      }

      if (
        sectionType === "non-residents-motorcycles" &&
        (item.sectionType !== "Non-residents" ||
          item.vehicleType !== "Motorcycle")
      ) {
        return false;
      }
    }

    return true;
  };

  const filterStatus = (item: ListResult[0]) => {
    if (status !== "all") {
      if (status === "available" && item.status !== "Available") {
        return false;
      }

      if (status === "occupied" && item.status !== "Occupied") {
        return false;
      }
    }

    return true;
  };

  const filterVehicleType = (item: ListResult[0]) => {
    if (
      vehicleType !== "all" &&
      item.vehicleType?.toLowerCase() !== vehicleType
    ) {
      return false;
    }

    return true;
  };

  const handleSortBy = (a: ListResult[0], b: ListResult[0]) => {
    if (sortBy === "parkingSpace") {
      return a.parkingSpace.localeCompare(b.parkingSpace);
    }
    if (sortBy === "status") {
      return a.status.toLowerCase().localeCompare(b.status.toLowerCase());
    }
    if (sortBy === "startTime") {
      return a.startTime.localeCompare(b.startTime);
    }
    if (sortBy === "endTime") {
      return a.endTime.localeCompare(b.endTime);
    }
    if (sortBy === "vehicleType") {
      return (a.vehicleType || "").localeCompare(b.vehicleType || "");
    }
    return 0;
  };

  const listResultFiltered =
    listResult
      .filter((item) => {
        const isSectionType = filterSectionType(item);
        const isStatus = filterStatus(item);
        const isVehicleType = filterVehicleType(item);

        if (!isSectionType || !isStatus || !isVehicleType) {
          return false;
        }

        return true;
      })
      .filter(
        (item) =>
          item.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.parkingSpace.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(handleSortBy) || [];

  return (
    <>
      <Filters />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{PageData.list.columns.parkingSpace}</th>
            <th>{PageData.list.columns.sectionType}</th>
            <th>{PageData.list.columns.status}</th>
            <th>{PageData.list.columns.startTime}</th>
            <th>{PageData.list.columns.endTime}</th>
            <th>{PageData.list.columns.vehicleType}</th>
            <th>{PageData.list.columns.licensePlate}</th>
            <th>{PageData.list.columns.action.label}</th>
          </tr>
        </thead>
        <tbody>
          {listResultFiltered.map((item, index) => (
            <tr key={index}>
              <td>{item.parkingSpace}</td>
              <td>{item.sectionType}</td>
              <td
                className={styles.status}
                style={{
                  color: getStatusColor(item.status),
                }}
              >
                {item.status}
              </td>
              <td>{item.startTime ? formatDate(item.startTime) : null}</td>
              <td>{item.endTime ? formatDate(item.endTime) : null}</td>
              <td>{item.vehicleType}</td>
              <td>{item.licensePlate}</td>
              <td>
                {item.status === "Occupied" && (
                  <Button color="danger">
                    {PageData.list.columns.action.buttons.endParking}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
