import { Backdrop, BackdropProps, Stack } from "@mui/material";

interface IProps extends BackdropProps {}

export default function CustomLoader({ ...others }: IProps) {
  return (
    <Backdrop style={{ zIndex: 10001 }} {...others}>
      <Stack>
        <span className="loader"></span>
      </Stack>
    </Backdrop>
  );
}
