import { InputLabel, Select, Stack, alpha } from "@mui/material";

export default function CustomSelect({ label, children, ...props }: any) {
  return (
    <Stack>
      {label && (
        <InputLabel
          sx={(theme) => ({
            fontWeight: 500,
            fontSize: theme.spacing(2),
            marginBottom: -0.5,
            fontFamily: "Arial",
            color: alpha(theme.palette.common.black, 0.65),
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
            height: "37px",
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
