import {
  IconButton,
  InputBase,
  InputBaseProps,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { PiEyeClosedBold } from "react-icons/pi";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "&.MuiInputBase-root": {
    borderRadius: theme.spacing(0.5),
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light" ? theme.palette.common.white : "#1A2027",
    border: `1px solid ${alpha(theme.palette.common.black, 0.5)}`,
    borderColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.common.black, 0.25)
        : "#2D3843",
    fontSize: theme.spacing(1.65),
    padding: theme.spacing(0.5, 1.5),
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.action.hover, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.action.hover,
    },
  },
}));

export interface IProps extends InputBaseProps {
  label?: string;
}

export default function CustomInput({
  label,
  placeholder,
  id,
  type,
  ...others
}: IProps) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const [visible, setVisible] = useState(false);
  return (
    <FormControl sx={{ flex: 1 }} fullWidth={isMobile} variant="standard">
      {label && (
        <InputLabel
          sx={(theme) => ({
            fontWeight: 300,
            fontSize: theme.spacing(2),
            color: alpha(theme.palette.common.black, 1),
          })}
          shrink
          htmlFor={id ?? "custom-input"}
        >
          {label}
        </InputLabel>
      )}
      <BootstrapInput
        fullWidth
        id={id ?? "custom-input"}
        placeholder={placeholder}
        type={
          type === "password" && visible
            ? visible
              ? "text"
              : "password"
            : type
        }
        endAdornment={
          type === "password" ? (
            <IconButton onClick={() => setVisible(!visible)} size="small">
              <PiEyeClosedBold />
            </IconButton>
          ) : (
            others.endAdornment
          )
        }
        {...others}
      />
    </FormControl>
  );
}
