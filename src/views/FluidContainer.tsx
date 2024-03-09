import { Stack, StackProps, alpha } from "@mui/material";

interface IProps extends StackProps {}
export default function FluidContainer({ children, ...others }: IProps) {
  return (
    <Stack
      flex={1}
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.065)}
      {...others}
    >
      {children}
    </Stack>
  );
}
