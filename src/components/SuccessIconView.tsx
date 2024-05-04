import { Stack, StackProps, alpha, useTheme } from "@mui/material";
import { MdCheck } from "react-icons/md";

interface IProps extends StackProps {}
export default function SuccessIconView({ ...others }: IProps) {
  return (
    <Stack
      sx={(theme) => ({
        width: "80px",
        height: "80px",
        border: `5px solid ${alpha(theme.palette.success.main, 0.5)}`,
        borderRadius: "80px",
        alignItems: "center",
        justifyContent: "center",
      })}
      {...others}
    >
      <MdCheck
        style={{ color: useTheme().palette.success.main }}
        fontSize={50}
      />
    </Stack>
  );
}
