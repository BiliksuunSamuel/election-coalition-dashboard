import { Stack, StackProps, alpha } from "@mui/material";

interface IProps extends StackProps {}
export default function ProfileAvatar({ children, ...others }: IProps) {
  return (
    <Stack
      width="35px"
      height="35px"
      borderRadius="100%"
      border={(theme) => `1px solid ${alpha(theme.palette.action.hover, 0.05)}`}
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      {...others}
    >
      {children}
    </Stack>
  );
}
