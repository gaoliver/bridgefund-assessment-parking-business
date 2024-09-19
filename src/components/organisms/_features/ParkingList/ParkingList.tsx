import React from "react";
import PageData from "@/data/dashboard.json";
import styles from "./ParkingList.module.css";
import { Button } from "@/components/atoms";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/formatDate";
import { Filters } from "../Filters";
import useFilterStore from "@/zustand/filters";
import { VehicleType } from "@/types/api";
import {
  SessionType,
  Status,
  TableSessionType,
  ParkingListResultProps,
} from "@/types/parkingSessions";
import { capitalize } from "@/utils/capitalize";

interface ParkingListProps {
  listResult: ParkingListResultProps[];
}

const getStatusColor = (status: Status) => {
  return status === "Available" ? colors.green : colors.red;
};

export const ParkingList: React.FC<ParkingListProps> = ({
  listResult = [],
}) => {
  const { searchQuery, sessionType, sortBy, status, vehicleType } =
    useFilterStore();

  const filterSessionType = (item: ParkingListResultProps) => {
    if (sessionType !== "all") {
      if (
        sessionType === SessionType.Residents &&
        item.sessionType !== TableSessionType.Resident
      ) {
        return false;
      }

      if (
        sessionType === SessionType.NonResidentsCars &&
        (item.sessionType !== TableSessionType.NonResident ||
          item.vehicleType !== VehicleType.CAR)
      ) {
        return false;
      }

      if (
        sessionType === SessionType.NonResidentsMotorcycles &&
        (item.sessionType !== TableSessionType.NonResident ||
          item.vehicleType !== VehicleType.MOTOR)
      ) {
        return false;
      }
    }

    return true;
  };

  const filterStatus = (item: ParkingListResultProps) => {
    if (status !== "all") {
      if (status === Status.Available && item.status !== "Available") {
        return false;
      }

      if (status === Status.Occupied && item.status !== "Occupied") {
        return false;
      }
    }

    return true;
  };

  const filterVehicleType = (item: ParkingListResultProps) => {
    if (vehicleType !== "all" && item.vehicleType !== vehicleType) {
      return false;
    }

    return true;
  };

  const handleSortBy = (
    a: ParkingListResultProps,
    b: ParkingListResultProps
  ) => {
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
      .filter((item) =>
        item.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
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
              <td>{capitalize(item.vehicleType)}</td>
              <td>{item.licensePlate}</td>
              <td>
                {item.status === Status.Occupied && (
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
