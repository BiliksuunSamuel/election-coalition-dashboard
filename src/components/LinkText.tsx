import { Link, LinkProps } from "@mui/material";

interface IProps extends LinkProps {}

export default function LinkText({ children, ...others }: IProps) {
  return (
    <Link
      sx={(theme) => ({
        color: theme.palette.primary.dark,
        textDecoration: "none",
        fontWeight: 500,
      })}
      {...others}
    >
      {children}
    </Link>
  );
}
