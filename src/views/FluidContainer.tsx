import { Stack, StackProps, alpha } from "@mui/material";

interface IProps extends StackProps {}
export default function FluidContainer({ children, ...others }: IProps) {
  return (
    <Stack
      width="100%"
      height="100%"
      bgcolor={(theme) => alpha(theme.palette.common.black, 0.015)}
      {...others}
    >
      {children}
    </Stack>
  );
}
