import { ISidebarRoute } from "../interfaces";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { More2 } from "iconsax-react";
import { UserRole } from "../enums/UserRoles";
import { AiOutlinePartition } from "react-icons/ai";

export default (role?: UserRole): ISidebarRoute[] => {
  const adminRoutes = [
    { title: "Dashboard", Icon: RxDashboard, route: "/dashboard" },
    {
      title: "User Management",
      Icon: FaUsers,
      route: "/dashboard/user-management",
    },
    {
      title: "Election Management",
      Icon: LuUsers,
      route: "/dashboard/election-management",
    },

    {
      title: "Constituency Management",
      route: "/dashboard/constituency-management",
      Icon: AiOutlinePartition,
    },

    {
      title: "Election Categories",
      route: "/dashboard/election-categories",
      Icon: More2,
    },

    {
      title: "Notifications",
      Icon: IoNotificationsOutline,
      route: "/dashboard/notifications",
    },
    {
      title: "Settings",
      Icon: IoSettingsOutline,
      route: "/dashboard/profile-settings",
    },
  ];

  const userRoutes = [
    { title: "Dashboard", Icon: RxDashboard, route: "/dashboard" },
    {
      title: "Election Management",
      Icon: LuUsers,
      route: "/dashboard/election-management",
    },

    {
      title: "Notifications",
      Icon: IoNotificationsOutline,
      route: "/dashboard/notifications",
    },
    {
      title: "Settings",
      Icon: IoSettingsOutline,
      route: "/dashboard/settings",
    },
  ];

  return role === UserRole.User
    ? userRoutes
    : role === UserRole.Admin
    ? adminRoutes
    : [];
};
