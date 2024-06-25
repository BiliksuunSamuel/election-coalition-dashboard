import { IconButton, IconButtonProps, Stack, Typography } from "@mui/material";
import { ISidebarRoute } from "../interfaces";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps extends IconButtonProps {
  routeInfo: ISidebarRoute;
}
export default function SidebarRouteLink({ routeInfo, ...others }: IProps) {
  const { Icon, title } = routeInfo;
  const location = useLocation();
  const navigation = useNavigate();
  const isActive = routeInfo.route && location.pathname == routeInfo.route;
  return (
    <IconButton
      sx={(theme) => ({
        borderRadius: 0,
        width: "100%",
        outlined: "none",
        diplay: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingX: theme.spacing(2),
        paddingY: theme.spacing(1.5),
        bgcolor: isActive ? theme.palette.primary.main : "inherit",
        color: isActive ? theme.palette.common.white : "inherit",
        "&:hover": {
          bgcolor: isActive ? theme.palette.primary.dark : "inherit",
        },
      })}
      onClick={() => {
        navigation(routeInfo.route ?? "");
      }}
      {...others}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1.5}
      >
        <Icon fontSize="medium" />
        <Typography>{title}</Typography>
      </Stack>
    </IconButton>
  );
}
