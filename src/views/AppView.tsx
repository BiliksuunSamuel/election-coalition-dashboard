import { Stack, StackProps, alpha } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { handleLogout } from "../features/AuthReducer";

interface IProps extends StackProps {}
export default function AppView({ children, ...others }: IProps) {
  const { token } = useAppSelector((state) => state.AuthReducer);
  const { getProfile } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || isExpired(token)) {
      dispatch(handleLogout());
    }
    if (token && !isExpired(token)) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (!token || isExpired(token)) {
      dispatch(handleLogout());
    }
    if (token && !isExpired(token)) {
      getProfile();
    }
  }, [token]);
  return (
    <Stack
      height="100vh"
      width="100vw"
      bgcolor={(theme) =>
        theme.palette.mode === "light"
          ? theme.palette.common.white
          : alpha(theme.palette.common.black, 0.065)
      }
      color={(theme) =>
        theme.palette.mode === "light"
          ? theme.palette.common.black
          : theme.palette.common.white
      }
      overflow="auto"
      flex={1}
      {...others}
    >
      {children}
    </Stack>
  );
}
