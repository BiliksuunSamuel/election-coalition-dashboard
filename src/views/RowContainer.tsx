import { Stack, StackProps } from "@mui/material";

interface IProps extends StackProps {}
export default function RowContainer({ children, ...others }: IProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      {...others}
    >
      {children}
    </Stack>
  );
}
