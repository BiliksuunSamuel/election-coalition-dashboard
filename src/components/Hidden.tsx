import { Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";

interface IProps extends StackProps {
  device?: Device;
  orientation?: "up" | "down";
  mediaStart?: Device;
  mediaEnd?: Device;
}

export type Device = "sm" | "md" | "lg" | "xs" | "xl";

export default function Hidden({
  device = "sm",
  orientation = "down",
  children,
  mediaStart,
  mediaEnd,
  ...others
}: IProps) {
  // const isMedia =
  //   orientation === "down"
  //     ? useMediaQuery(useTheme().breakpoints.down(device))
  //     : useMediaQuery(useTheme().breakpoints.up(device));
  const isMediaRange = useMediaQuery(
    useTheme().breakpoints.between(mediaStart ?? "xs", mediaEnd ?? "sm")
  );

  if (isMediaRange) {
    return null;
  }
  return <Stack {...others}>{children}</Stack>;
}
