import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import {
  InputLabel,
  Stack,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";

interface IProps extends DatePickerProps<any> {
  label?: string;
}
export default function CustomDatePicker({ label, ...others }: IProps) {
  const isMobileDevice = useMediaQuery(useTheme().breakpoints.down("sm"));
  const theme = useTheme();
  return isMobileDevice ? (
    <Stack>
      {label && (
        <InputLabel
          sx={(theme) => ({
            fontWeight: 500,
            fontSize: theme.spacing(2),
            marginBottom: -0.5,
          })}
          shrink
        >
          {label}
        </InputLabel>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          slotProps={{
            textField: { size: "small" },
          }}
          format="DD-MM-YYYY"
        />
      </LocalizationProvider>
    </Stack>
  ) : (
    <Stack>
      {label && (
        <InputLabel
          sx={(theme) => ({
            fontWeight: 500,
            fontSize: theme.spacing(2),
            marginBottom: -0.5,
          })}
          shrink
        >
          {label}
        </InputLabel>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD-MM-YYYY"
          views={["day", "month", "year"]}
          slotProps={{
            textField: {
              size: "small",
              sx: {
                "& .MuiInputBase-root": {
                  height: "35px",
                  borderStyle: "none",
                  fontSize: "13px",
                  color: alpha(theme.palette.common.black, 0.75),
                },
              },
            },
          }}
          {...others}
        />
      </LocalizationProvider>
    </Stack>
  );
}
