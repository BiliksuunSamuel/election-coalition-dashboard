import { Box, BoxProps } from "@mui/material";

interface IProps extends BoxProps {}
export default function AuthGuard({ children, ...others }: IProps) {
  return <Box {...others}>{children}</Box>;
}
