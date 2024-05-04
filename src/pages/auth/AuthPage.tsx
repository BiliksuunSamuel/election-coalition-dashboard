import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <Stack style={{ overflowX: "hidden" }} height="100vh">
      <Outlet />
    </Stack>
  );
}
