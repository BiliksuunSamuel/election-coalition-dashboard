import { IconButton, IconButtonProps } from "@mui/material";

interface IProps extends IconButtonProps {}
export default function PrimaryButton({ children, ...others }: IProps) {
  return (
    <IconButton
      sx={(theme) => ({
        bgcolor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: theme.spacing(0.5),
        height: "40px",
        fontSize: theme.spacing(2),
        "&:hover": {
          bgcolor: theme.palette.primary.dark,
        },
      })}
      {...others}
    >
      {children}
    </IconButton>
  );
}
