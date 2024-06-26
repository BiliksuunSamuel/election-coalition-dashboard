import { Drawer, DrawerProps, Stack, alpha } from "@mui/material";
import { UserRole } from "../../enums/UserRoles";
import SidebarRoutes from "../../routes/SidebarRoutes";
import { SidebarRouteLink, Title } from "../../components";
import resources from "../../resources";

interface IProps extends DrawerProps {
  role?: UserRole;
}

export default function Sidebar({ role, ...others }: IProps) {
  return (
    <Drawer
      sx={() => ({
        width: "220px",
        border: "none",
        zIndex: 100,
        bgcolor: (theme) => theme.palette.primary.dark,
      })}
      variant="persistent"
      open={true}
      {...others}
    >
      <Stack
        width="220px"
        bgcolor={(theme) => theme.palette.primary.dark}
        height="100vh"
        padding={0}
        margin={0}
      >
        <Stack
          alignItems="center"
          justifyContent="flex-start"
          padding={(theme) => theme.spacing(1)}
          direction="row"
          bgcolor={(theme) => theme.palette.primary.dark}
        >
          <Stack
            sx={(theme) => ({
              width: theme.spacing(3),
              height: theme.spacing(3),
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.spacing(3),
              bgcolor: theme.palette.common.white,
              padding: theme.spacing(0.5),
              marginRight: theme.spacing(1),
            })}
          >
            <img src={resources.logo} alt="wb-solutions-logo" className="img" />
          </Stack>
          <Title color={(theme) => alpha(theme.palette.common.white, 1)}>
            Election Coalition
          </Title>
        </Stack>
        <Stack spacing={1.25}>
          {SidebarRoutes(role).map((routeInfo) => (
            <SidebarRouteLink routeInfo={routeInfo} key={routeInfo.title} />
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
}
