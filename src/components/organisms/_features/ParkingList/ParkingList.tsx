import React from "react";
import PageData from "@/data/dashboard.json";
import styles from "./ParkingList.module.css";
import { Button } from "@/components/atoms";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/formatDate";
import { Filters } from "../Filters";
import useFilterStore, { SessionType, Status } from "@/zustand/filters";
import { VehicleType } from "@/types/api";

type TableSessionType = Omit<SessionType, "all">;
type TableStatus = Omit<Status, "all">;

type ParkingList = {
  parkingSpace: string;
  sessionType: TableSessionType;
  status: TableStatus;
  startTime: string;
  endTime: string;
  vehicleType: VehicleType;
  licensePlate: string;
}[];

const listResult: ParkingList = [
  {
    parkingSpace: "A1",
    sessionType: "Residents",
    status: "Occupied",
    startTime: "2023-10-01T08:00:00Z",
    endTime: "2023-10-01T10:00:00Z",
    vehicleType: VehicleType.CAR,
    licensePlate: "ABC123",
  },
  {
    parkingSpace: "B2",
    sessionType: "Non-residents",
    status: "Available",
    startTime: "",
    endTime: "",
    vehicleType: VehicleType.CAR,
    licensePlate: "",
  },
  {
    parkingSpace: "C3",
    sessionType: "Non-residents",
    status: "Occupied",
    startTime: "2023-10-01T09:00:00Z",
    endTime: "2023-10-01T11:00:00Z",
    vehicleType: VehicleType.MOTOR,
    licensePlate: "XYZ789",
  },
];

const getStatusColor = (status: TableStatus) => {
  return status === "Available" ? colors.green : colors.red;
};

export const ParkingList = () => {
  const { searchQuery, sessionType, sortBy, status, vehicleType } =
    useFilterStore();

  const filterSessionType = (item: ParkingList[0]) => {
    if (sessionType !== "all") {
      if (sessionType === "residents" && item.sessionType !== "Residents") {
        return false;
      }

      if (
        sessionType === "non-residents-cars" &&
        (item.sessionType !== "Non-residents" ||
          item.vehicleType !== VehicleType.CAR)
      ) {
        return false;
      }

      if (
        sessionType === "non-residents-motorcycles" &&
        (item.sessionType !== "Non-residents" ||
          item.vehicleType !== VehicleType.MOTOR)
      ) {
        return false;
      }
    }

    return true;
  };

  const filterStatus = (item: ParkingList[0]) => {
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

  const filterVehicleType = (item: ParkingList[0]) => {
    if (vehicleType !== "all" && item.vehicleType !== vehicleType) {
      return false;
    }

    return true;
  };

  const handleSortBy = (a: ParkingList[0], b: ParkingList[0]) => {
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
      return (a.vehicleType.toString() || "").localeCompare(
        b.vehicleType.toString() || ""
      );
    }
    return 0;
  };

  const listResultFiltered =
    listResult
      .filter((item) => {
        const isSessionType = filterSessionType(item);
        const isStatus = filterStatus(item);
        const isVehicleType = filterVehicleType(item);

        if (!isSessionType || !isStatus || !isVehicleType) {
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
            <th>{PageData.list.columns.sessionType}</th>
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
              <td>{item.sessionType}</td>
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
