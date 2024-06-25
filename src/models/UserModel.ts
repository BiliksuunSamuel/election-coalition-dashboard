import { IBaseEntity } from ".";
import { UserStatus } from "../enums/UserStatus";

export default interface IUser extends IBaseEntity {
  name: string;
  phoneNumber: string;
  email: string;
  membershipId: string;
  constituency: string;
  constituencyId: string;
  pollingStation: string;
  pollingStationCode: string;
  pollingStationId: string;
  address: string;
  profileImage: string;
  authenticated: boolean;
  status: UserStatus;
}

export interface ICreateUserRequest {
  name: string;
  phoneNumber: string;
  email: string;
  memberShipId: string;
  constituency: string;
  constituencyId: string;
  pollingStation: string;
  pollingStationCode: string;
  pollingStationId: string;
  address: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string | null;
  prefix: string | null;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export const InitialLoginRequest: ILoginRequest = {
  username: "",
  password: "******",
};

export const initialCreateUserRequest: ICreateUserRequest = {
  name: "",
  email: "",
  phoneNumber: "",
  constituency: "",
  constituencyId: "",
  pollingStation: "",
  pollingStationCode: "",
  pollingStationId: "",
  memberShipId: "",
  address: "",
};
