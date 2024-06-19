import {
  Button,
  ButtonProps,
  CircularProgress,
  Stack,
  alpha,
} from "@mui/material";
import { RowContainer } from "../views";

interface IProps extends ButtonProps {
  variant?: "outlined" | "contained" | "text";
  loading?: boolean;
}

export default function PrimaryButton({
  children,
  variant = "contained",
  ...others
}: IProps) {
  return (
    <Button
      sx={(theme) => ({
        "&.MuiButtonBase-root": {
          backgroundColor:
            variant === "contained"
              ? theme.palette.primary.main
              : variant === "outlined"
              ? "transparent"
              : alpha(theme.palette.action.hover, 0.05),
          color:
            variant === "contained"
              ? theme.palette.common.white
              : variant === "outlined"
              ? theme.palette.primary.main
              : theme.palette.common.black,
          outline: "none",
          border:
            variant === "contained" || variant === "text"
              ? "none"
              : `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.spacing(0.85),
          height: "40px",
        },
        "&.Mui-disabled": {
          bgcolor: alpha(theme.palette.primary.main, 0.15),
          borderStyle: "none",
          color: alpha(theme.palette.primary.main, 0.35),
        },
      })}
      {...others}
    >
      <RowContainer spacing={2}>
        {others.loading && (
          <Stack
            width="15px"
            style={{ marginRight: "10px" }}
            marginRight={2}
            height="15px"
          >
            <CircularProgress
              color="inherit"
              variant="indeterminate"
              size="small"
            />
          </Stack>
        )}
        <>{children}</>
      </RowContainer>
    </Button>
  );
}
