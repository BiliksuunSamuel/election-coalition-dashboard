import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <Stack
      style={{
        overflowX: "hidden",
        // backgroundImage: `linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.85),rgba(0,0,0,0.85)),url(${resources.landingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      height="100vh"
    >
      <Outlet />
    </Stack>
  );
}
