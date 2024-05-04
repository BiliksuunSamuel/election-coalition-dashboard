import { ChangeEvent, useState } from "react";
import {
  IAuthResponse,
  ILoginRequest,
  InitialLoginRequest,
} from "../models/UserModel";
import { useAppDispatch } from "../app/hooks";
import {
  clearResponse,
  setError,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";
import { IApiResponse } from "../interfaces";
import { setAuth } from "../features/AuthReducer";

export default function useAuth() {
  const [loginRequest, setLoginRequest] =
    useState<ILoginRequest>(InitialLoginRequest);
  const dispatch = useAppDispatch();
  //handle login form
  function handleLoginForm(e: ChangeEvent<HTMLInputElement>) {
    setLoginRequest({
      ...loginRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }

  //handle login
  async function handleLogin() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IAuthResponse>>({
        method: "post",
        url: "api/auth/login",
        data: loginRequest,
      });
      dispatch(setAuth(res.data));
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return { loginRequest, handleLoginForm, handleLogin };
}
