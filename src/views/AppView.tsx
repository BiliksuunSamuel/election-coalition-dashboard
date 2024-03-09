import { Stack, StackProps, alpha } from "@mui/material";

interface IProps extends StackProps {}
export default function AppView({ children, ...others }: IProps) {
  return (
    <Stack
      height="100vh"
      width="100vw"
      bgcolor={(theme) =>
        theme.palette.mode === "light"
          ? theme.palette.common.white
          : alpha(theme.palette.common.black, 0.065)
      }
      color={(theme) =>
        theme.palette.mode === "light"
          ? theme.palette.common.black
          : theme.palette.common.white
      }
      overflow="auto"
      flex={1}
      {...others}
    >
      {children}
    </Stack>
  );
}
