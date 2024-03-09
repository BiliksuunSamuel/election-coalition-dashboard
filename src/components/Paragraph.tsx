import { Typography, TypographyProps, alpha } from "@mui/material";

interface IProps extends TypographyProps {}
export default function Paragraph({ children, ...others }: IProps) {
  return (
    <Typography
      variant="body2"
      color={(theme) => alpha(theme.palette.action.hover, 0.5)}
      {...others}
    >
      {children}
    </Typography>
  );
}
