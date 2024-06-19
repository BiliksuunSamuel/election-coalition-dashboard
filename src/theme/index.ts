import { createTheme } from "@mui/material";
import { BlackShades, PrimaryShadeds } from "./AppColors";

export default (mode: "dark" | "light" = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: PrimaryShadeds[500],
        dark: PrimaryShadeds[600],
      },
    },
    typography: {
      fontFamily: "Nunito Sans",
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
          },
          head: {
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
            fontWeight: "bold",
            color: BlackShades[300],
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito Sans",
          },
          body2: {
            fontSize: "15px",
          },
          body1: {
            fontSize: "18px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
            color: BlackShades[500],
            "&::placeholder": {
              color: BlackShades[800],
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
            color: BlackShades[500],
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: "Nunito Sans",
            fontSize: "16px",
            color: BlackShades[500],
          },
        },
      },
    },
  });
