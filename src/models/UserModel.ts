import { IBaseEntity } from ".";

export default interface IUser extends IBaseEntity {
  name: string;
  phoneNumber: string;
  email: string;
  membershipId: string;
  constituencies: string[];
  address: string;
  profileImage: string;
  authenticated: boolean;
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
