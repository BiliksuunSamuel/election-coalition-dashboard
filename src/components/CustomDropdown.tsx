import { Autocomplete, FormControl, alpha, useTheme } from "@mui/material";
import { YellowShades } from "../theme/AppColors";

interface IProps {}
export default function CustomDropdown({}: IProps) {
  const theme = useTheme();
  return (
    <FormControl variant="standard">
      <Autocomplete
        sx={{
          display: "inline-block",
          "& input": {
            bgcolor: alpha(YellowShades[100], 0.85),
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
            borderRadius: theme.spacing(0.5),
          },
          width: "100%",
        }}
        id="custom-input-demo"
        options={["A", "B", "C"]}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              style={{
                boxShadow: `${alpha(
                  theme.palette.primary.main,
                  0.25
                )} 0 0 0 0.05rem`,
                borderColor: theme.palette.primary.main,
                padding: theme.spacing(1),
                outline: "none",
                borderStyle: "none",
              }}
              type="text"
              {...params.inputProps}
            />
          </div>
        )}
      />
    </FormControl>
  );
}
