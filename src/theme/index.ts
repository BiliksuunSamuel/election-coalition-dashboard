import { createTheme } from "@mui/material";
import { PrimaryShadeds } from "./AppColors";

export default (mode: "dark" | "light" = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: PrimaryShadeds[500],
        dark: PrimaryShadeds[600],
      },
    },
  });
