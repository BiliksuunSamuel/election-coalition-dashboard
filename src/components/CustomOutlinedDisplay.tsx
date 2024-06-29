import {
  InputLabel,
  Stack,
  StackProps,
  Typography,
  alpha,
} from "@mui/material";

interface IProps extends StackProps {
  label?: string;
  value?: string;
}
export default function CustomOutlinedDisplay({
  label,
  value,
  ...others
}: IProps) {
  return (
    <Stack flex={1} {...others}>
      {label && (
        <InputLabel
          sx={(theme) => ({
            fontWeight: 300,
            fontSize: theme.spacing(2.5),
            color: alpha(theme.palette.common.black, 1),
            fontFamily: "Nunito, sans-serif",
            marginBottom: theme.spacing(-0.85),
          })}
          shrink
        >
          {label}
        </InputLabel>
      )}
      <Stack
        sx={(theme) => ({
          border: `1px solid ${theme.palette.grey[300]}`,
          padding: theme.spacing(0.85),
          borderRadius: theme.spacing(0.5),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        })}
      >
        <Typography>{value}</Typography>
      </Stack>
    </Stack>
  );
}
