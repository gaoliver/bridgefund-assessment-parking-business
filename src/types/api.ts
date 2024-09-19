export type LoginWithPasswordDto = {
  email: string;
  password: string;
};

export type UserDto = {
  id: string;
  email: string;
};

export type AuthDto = {
  accessToken: string;
  expiresIn: number;
};

export type UserResponse = {
  user: UserDto;
  auth: AuthDto;
};

export enum VehicleType {
  CAR = "CAR",
  MOTOR = "MOTORCYCLE",
}

export type StartParkingSessionDto = {
  vehicleType: VehicleType;
  isResident: boolean;
  vehicleLicensePlate: string;
};

export type StartParkingSessionRequest = {
  parkingSession: StartParkingSessionDto;
};

export type ParkingSessionStartedDto = {
  parkingSessionId: string;
  parkingSpaceId: number;
  sessionStartedAt: string;
  vehicleLicensePlate: string;
};

export type ParkingSessionStartedResponse = {
  startedSession: ParkingSessionStartedDto;
};

export type EndParkingSessionDto = {
  parkingSessionId: string;
};

export type EndParkingSessionRequest = {
  parkingSession: EndParkingSessionDto;
};

export type ParkingSessionEndedDto = {
  parkingSpaceId: number;
  sessionLengthInHoursMinutes: number;
};

export type ParkingSessionEndedResponse = {
  endedSession: ParkingSessionEndedDto;
};

export type ParkingSpaceRowDto = {
  parkingSpaceId: number;
  isOccupied: boolean;
  occupancy: number;
  capacity: number;
  vehicleType: VehicleType;
};

export type ParkingSpaceListResponse = {
  parkingSpaces: ParkingSpaceRowDto[];
};

export type ParkingSessionRowDto = {
  parkingSessionId: string;
  parkingSpaceId: number;
  isSessionEnded: boolean;
  sessionLengthInHoursMinutes: number;
  sessionStartedAt: string;
  sessionEndedAt: string;
  vehicleLicensePlate: string;
  vehicleType: VehicleType;
};

export type ParkingSessionsListResponse = {
  parkingSessions: ParkingSessionRowDto[];
  parkingSessionsTotalCount: number;
};

export type ApiResponse<T> = {
  data: T;
  request: {
    body: object;
    method: string;
    params: object;
    path: string;
    query: object;
    timestamp: string;
  };
  status: { code: number; message: string; success: boolean };
};
