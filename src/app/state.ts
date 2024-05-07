import { IResponseReducerState, IUserReducerState } from "./IState";

export const ResponseReducerState: IResponseReducerState = {
  loading: false,
  message: null,
  error: null,
};

export const UserReducerState: IUserReducerState = {
  user: null,
  token: null,
  prefix: null,
};
