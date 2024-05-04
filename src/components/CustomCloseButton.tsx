import { IconButton, IconButtonProps } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface IProps extends IconButtonProps {}
export default function CustomCloseButton({ children, ...others }: IProps) {
  return (
    <IconButton size="small" {...others}>
      {children ?? <IoMdClose />}
    </IconButton>
  );
}
