import { ParkingSessionRowDto } from "@/types/api";
import {
  ParkingListResultProps,
  Status,
  TableSessionType,
} from "@/types/parkingSessions";

export const mapParkingList = (
  list: ParkingSessionRowDto[]
): ParkingListResultProps[] => {
  const sessionType = (parkingSpaceId: number): TableSessionType => {
    if (parkingSpaceId === 1) {
      return TableSessionType.Resident;
    }
    return TableSessionType.NonResident;
  };

  const sessionStatus = (isSessionEnded: boolean): Status => {
    if (isSessionEnded) {
      return Status.Available;
    }
    return Status.Occupied;
  };

  return list.map((item) => ({
    parkingSessionId: item.parkingSessionId.toString(),
    parkingSpace: item.parkingSpaceId.toString(),
    sessionType: sessionType(item.parkingSpaceId),
    status: sessionStatus(item.isSessionEnded),
    startTime: item.sessionStartedAt,
    endTime: item.sessionEndedAt,
    vehicleType: item.vehicleType,
    licensePlate: item.vehicleLicensePlate,
  }));
};
