import React from "react";
import PageData from "@/data/dashboard.json";
import styles from "./ParkingList.module.css";
import { Button } from "@/components/atoms";
import { colors } from "@/constants/colors";
import { formatDate } from "@/utils/formatDate";

type ListResultStatus = "Available" | "Occupied";

type ListResult = {
  parkingSpace: string;
  status: ListResultStatus;
  startTime: string;
  endTime: string;
  vehicleType: string;
  licensePlate: string;
}[];

const listResult: ListResult = [
  {
    parkingSpace: "A1",
    status: "Occupied",
    startTime: "2023-10-01T08:00:00Z",
    endTime: "2023-10-01T10:00:00Z",
    vehicleType: "Sedan",
    licensePlate: "ABC123",
  },
  {
    parkingSpace: "B2",
    status: "Available",
    startTime: "",
    endTime: "",
    vehicleType: "",
    licensePlate: "",
  },
  {
    parkingSpace: "C3",
    status: "Occupied",
    startTime: "2023-10-01T09:00:00Z",
    endTime: "2023-10-01T11:00:00Z",
    vehicleType: "SUV",
    licensePlate: "XYZ789",
  },
];

const getStatusColor = (status: ListResultStatus) => {
  return status === "Available" ? colors.green : colors.red;
};

export const ParkingList = () => {
  return (
    <>
      <header>
        <h1></h1>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{PageData.list.columns.parkingSpace}</th>
            <th>{PageData.list.columns.status}</th>
            <th>{PageData.list.columns.startTime}</th>
            <th>{PageData.list.columns.endTime}</th>
            <th>{PageData.list.columns.vehicleType}</th>
            <th>{PageData.list.columns.licensePlate}</th>
            <th>{PageData.list.columns.action.label}</th>
          </tr>
        </thead>
        <tbody>
          {listResult.map((item, index) => (
            <tr key={index}>
              <td>{item.parkingSpace}</td>
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
