import { Route, Routes } from "react-router-dom";
import {
  ElectionCategoryPage,
  ElectionManagementPage,
  HomePage,
  NotificationsPage,
  ProfileSettingsPage,
  UserManagementPage,
} from "../pages/home";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage />}>
        <Route path="user-management" element={<UserManagementPage />} />
        <Route
          path="election-management"
          element={<ElectionManagementPage />}
        />
        <Route path="election-categories" element={<ElectionCategoryPage />} />
        <Route path="profile-settings" element={<ProfileSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
}
