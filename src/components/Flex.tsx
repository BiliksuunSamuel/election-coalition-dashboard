import { Stack, StackProps } from "@mui/material";

interface IProps extends StackProps {}
export default function Flex(props: IProps) {
  return <Stack flex={1} {...props} />;
}
