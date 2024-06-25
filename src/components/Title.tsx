import { Typography, TypographyProps } from "@mui/material";

interface IProps extends TypographyProps {}
export default function Title({ children, ...others }: IProps) {
  return (
    <Typography fontWeight="bold" {...others}>
      {children}
    </Typography>
  );
}
