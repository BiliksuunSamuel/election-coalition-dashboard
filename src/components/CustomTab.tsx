import { Tab, TabProps } from "@mui/material";

interface IProps extends TabProps {}
export default function CustomTab({ ...others }: IProps) {
  return <Tab sx={{ textTransform: "none" }} {...others} />;
}
