import {
  BaseSelectProps,
  InputLabel,
  Select,
  Stack,
  alpha,
} from "@mui/material";

interface IProps extends BaseSelectProps {}
export default function CustomSelect({ label, children, ...props }: IProps) {
  return (
    <Stack>
      {label && (
        <InputLabel
          sx={(theme) => ({
            fontWeight: 500,
            fontSize: theme.spacing(2.5),
            marginBottom: -0.5,
            fontFamily: "Nunito, sans-serif",
            color: alpha(theme.palette.common.black, 1),
          })}
          shrink
        >
          {label}
        </InputLabel>
      )}
      <Select
        size="small"
        variant="outlined"
        color="primary"
        sx={(theme) => ({
          "&.MuiInputBase-root": {
            border: `0px solid ${theme.palette.primary.main}`,
            borderRadius: theme.spacing(0.5),
            color: theme.palette.primary.main,
            position: "relative",
            fontSize: theme.spacing(2),
            width: "100%",
            height: "40px",
            padding: theme.spacing(0.5),
            transition: theme.transitions.create([
              "border-color",
              "background-color",
              "box-shadow",
            ]),
            boxShadow: `${alpha(
              theme.palette.primary.main,
              0.25
            )} 0 0 0 0.0rem`,
          },
        })}
        {...props}
      >
        {children}
      </Select>
    </Stack>
  );
}
