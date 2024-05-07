import { ChangeEvent, useState } from "react";
import {
  IAuthResponse,
  ILoginRequest,
  InitialLoginRequest,
} from "../models/UserModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearResponse,
  setError,
  setPending,
} from "../features/ResponseReducer";
import HttpClient from "../controller";
import { IApiResponse } from "../interfaces";
import { setAuth, setOtpPrefix } from "../features/AuthReducer";

export default function useAuth() {
  const [loginRequest, setLoginRequest] =
    useState<ILoginRequest>(InitialLoginRequest);
  const dispatch = useAppDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const { token, prefix } = useAppSelector((state) => state.AuthReducer);
  //handle login form
  function handleLoginForm(e: ChangeEvent<HTMLInputElement>) {
    setLoginRequest({
      ...loginRequest,
      [e.currentTarget.name]: e.target.value,
    });
  }

  // handle verify code
  async function handleVerifyCode() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IAuthResponse>>({
        method: "patch",
        url: "api/auth/otp-verify",
        data: {
          prefix,
          code: verificationCode,
        },
        token,
      });
      dispatch(
        setAuth({
          user: res.data.user,
          prefix: null,
          token: res.data.token,
        })
      );
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }
  //handle function resend verification code
  async function handleResendCode() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IAuthResponse>>({
        method: "post",
        url: "api/auth/otp-resend",
        token,
      });
      dispatch(clearResponse());
      dispatch(setOtpPrefix(res.data.prefix));
    } catch (error) {
      dispatch(setError(error));
    }
  }

  //handle login
  async function handleLogin() {
    try {
      dispatch(setPending());
      const res = await HttpClient<IApiResponse<IAuthResponse>>({
        method: "post",
        url: "api/auth/login",
        data: {
          ...loginRequest,
          password: "*****",
        },
      });
      dispatch(setAuth(res.data));
      dispatch(clearResponse());
    } catch (error) {
      dispatch(setError(error));
    }
  }

  return {
    loginRequest,
    handleLoginForm,
    handleLogin,
    handleResendCode,
    verificationCode,
    setVerificationCode,
    handleVerifyCode,
  };
}
