import { Stack, StackProps, Typography, alpha } from "@mui/material";
import { UserStatus } from "../enums/UserStatus";

interface IProps extends StackProps {
  value: UserStatus;
}
export default function CustomStatusChip({ value, ...others }: IProps) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...others}
    >
      <Stack
        sx={(theme) => ({
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: theme.spacing(2),
          padding: theme.spacing(0.25, 1),
          bgcolor:
            value === UserStatus.Active
              ? alpha(theme.palette.success.main, 0.18)
              : alpha(theme.palette.error.main, 0.18),
          color:
            value === UserStatus.Active
              ? theme.palette.success.dark
              : theme.palette.warning.dark,
        })}
      >
        <Typography variant="body2">{value}</Typography>
      </Stack>
    </Stack>
  );
}
