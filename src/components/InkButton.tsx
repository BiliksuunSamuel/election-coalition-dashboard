import { ButtonBase, ButtonBaseProps, styled } from "@mui/material";
import { PrimaryShadeds } from "../theme/AppColors";

const StyledButton = styled(ButtonBase)(({}) => ({
  "&.MuiButtonBase-root": {
    padding: 0,
    color: PrimaryShadeds[500],
    outline: "none",
    borderStyle: "none",
  },
}));

interface IProps extends ButtonBaseProps {}

export default function InkButton({ children, ...others }: IProps) {
  return <StyledButton {...others}>{children}</StyledButton>;
}
