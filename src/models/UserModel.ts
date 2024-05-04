import { IBaseEntity } from ".";

export default interface IUser extends IBaseEntity {
  name: string;
  phoneNumber: string;
  email: string;
  membershipId: string;
  constituencies: string[];
  address: string;
  profileImage: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export const InitialLoginRequest: ILoginRequest = {
  username: "",
  password: "",
};
