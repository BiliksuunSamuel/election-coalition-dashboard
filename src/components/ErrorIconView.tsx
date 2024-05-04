import { Stack, StackProps, alpha, useTheme } from "@mui/material";
import { MdClose } from "react-icons/md";

interface IProps extends StackProps {}
export default function ErrorIconView({ ...others }: IProps) {
  return (
    <Stack
      sx={(theme) => ({
        width: "80px",
        height: "80px",
        border: `5px solid ${alpha(theme.palette.error.main, 0.5)}`,
        borderRadius: "80px",
        alignItems: "center",
        justifyContent: "center",
      })}
      {...others}
    >
      <MdClose style={{ color: useTheme().palette.error.main }} fontSize={50} />
    </Stack>
  );
}
