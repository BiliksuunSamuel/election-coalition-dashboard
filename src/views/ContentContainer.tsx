import {
  Stack,
  StackProps,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IProps extends StackProps {}
export default function ContentContainer({ children, ...others }: IProps) {
  const isMobileDevice = useMediaQuery(
    useTheme().breakpoints.between("xs", "sm")
  );
  return (
    <Stack
      alignItems="center"
      justifyContent="flex-start"
      padding={(theme) => theme.spacing(isMobileDevice ? 0.5 : 2.5)}
      bgcolor={(theme) => alpha(theme.palette.action.hover, 0.025)}
      {...others}
    >
      {children}
    </Stack>
  );
}
