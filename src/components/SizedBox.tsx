import { Stack, StackProps } from "@mui/material";

interface IProps extends StackProps {}
export default function SizedBox(props: IProps) {
  return <Stack {...props} />;
}
