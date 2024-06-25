import { Divider, Drawer, DrawerProps, Stack } from "@mui/material";
import { UserRole } from "../../enums/UserRoles";
import SidebarRoutes from "../../routes/SidebarRoutes";
import { SidebarRouteLink, SizedBox, Title } from "../../components";

interface IProps extends DrawerProps {
  role?: UserRole;
}

export default function Sidebar({ role, ...others }: IProps) {
  return (
    <Drawer
      sx={() => ({
        width: "200px",
        border: "none",
        zIndex: 100,
      })}
      variant="persistent"
      open={true}
      {...others}
    >
      <Stack width="200px" height="100vh" padding={0} margin={0}>
        <Stack
          height="50px"
          padding={(theme) => theme.spacing(1)}
          direction="row"
        >
          <Title>Election Coalition</Title>
          {/* <Stack
            sx={(theme) => ({
              width: theme.spacing(5),
              height: theme.spacing(5),
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <img src={resources.logo} alt="wb-solutions-logo" className="img" />
          </Stack> */}
        </Stack>
        <Divider />
        <SizedBox height={20} />
        <Stack spacing={1.25}>
          {SidebarRoutes(role).map((routeInfo) => (
            <SidebarRouteLink routeInfo={routeInfo} key={routeInfo.title} />
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
}
