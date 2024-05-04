import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { Hidden } from "../../components";
import { Navbar, Sidebar } from "../components";
import { ContentContainer } from "../../views";
import { UserRole } from "../../enums/UserRoles";

export default function HomePage() {
  const [profileMenu, setProfileMenu] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const isMobileDevice = useMediaQuery(
    useTheme().breakpoints.between("xs", "sm")
  );

  useEffect(() => {}, []);

  return (
    <Stack height="100vh">
      {/* <ProfileActionMenu
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        handleLogout={() => {
          dispatch(handleLogout());
          dispatch(clearResponse());
          navigation("/");
        }}
        handleProfileSettings={() => navigation("/dashboard/settings")}
        onClose={() => setProfileMenu(null)}
      /> */}
      <Hidden device="sm">
        <Sidebar role={UserRole.Admin} />
      </Hidden>
      <Stack paddingLeft={isMobileDevice ? 0 : "240px"} flex={1}>
        <Navbar handleProfileMenu={(e) => setProfileMenu(e.currentTarget)} />
        <ContentContainer height="100%">
          <Outlet />
        </ContentContainer>
      </Stack>
    </Stack>
  );
}
