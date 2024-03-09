import IUser from "../models/UserModel";

export interface IResponseReducerState {
  loading: boolean;
  message: any;
  error: any;
}

export interface IUserReducerState {
  user: IUser | null;
  token: string | null;
}
