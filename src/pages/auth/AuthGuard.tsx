import { Stack, StackProps } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleLogout } from "../../features/AuthReducer";

interface IProps extends StackProps {}
export default function AuthGuard({ children, ...others }: IProps) {
  const navigation = useNavigate();
  const { user, token } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (user && token && user.authenticated) {
      const pathname = location.pathname;
      navigation(
        pathname !== "/" && pathname !== "/verify-otp" ? pathname : "/dashboard"
      );
    }
    if (user && token && !user.authenticated) {
      navigation("/verify-otp");
    }
    if (!user || !token) {
      dispatch(handleLogout());
      navigation("/");
    }
  }, [user, token, user?.authenticated]);

  useEffect(() => {
    if (user && token && user.authenticated) {
      const pathname = location.pathname;
      navigation(
        pathname !== "/" && pathname !== "/verify-otp" ? pathname : "/dashboard"
      );
    }
    if (user && token && !user.authenticated) {
      navigation("/verify-otp");
    }
    if (!user || !token) {
      dispatch(handleLogout());
      navigation("/");
    }
  }, []);

  return <Stack {...others}>{children}</Stack>;
}
