import { ISidebarRoute } from "../interfaces";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { UserRole } from "../enums/UserRoles";
import { AiOutlinePartition } from "react-icons/ai";
import { MdOutlinePoll } from "react-icons/md";
import { LiaVoteYeaSolid } from "react-icons/lia";

export default (role?: UserRole): ISidebarRoute[] => {
  const adminRoutes = [
    { title: "Dashboard", Icon: RxDashboard, route: "/dashboard" },
    {
      title: "Users",
      Icon: FaUsers,
      route: "/dashboard/users",
    },
    {
      title: "Elections",
      Icon: MdOutlinePoll,
      route: "/dashboard/elections",
    },
    {
      title: "Results",
      Icon: LiaVoteYeaSolid,
      route: "/dashboard/results",
    },
    {
      title: "Candidates",
      Icon: LuUsers,
      route: "/dashboard/candidates",
    },
    {
      title: "Constituencies",
      route: "/dashboard/constituencies",
      Icon: AiOutlinePartition,
    },

    {
      title: "Notifications",
      Icon: IoNotificationsOutline,
      route: "/dashboard/notifications",
    },
    {
      title: "Profile",
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
