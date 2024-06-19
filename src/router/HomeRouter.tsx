import { Route, Routes } from "react-router-dom";
import {
  ConstituencyManagementPage,
  ElectionCategoryPage,
  ElectionManagementPage,
  HomePage,
  NotificationsPage,
  ProfileSettingsPage,
  UserManagementPage,
} from "../pages/home";
import { AuthGuard } from "../pages/auth";

export default function HomeRouter() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      >
        <Route path="user-management" element={<UserManagementPage />} />
        <Route
          path="election-management"
          element={<ElectionManagementPage />}
        />
        <Route path="election-categories" element={<ElectionCategoryPage />} />
        <Route path="profile-settings" element={<ProfileSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route
          path="constituency-management"
          element={<ConstituencyManagementPage />}
        />
      </Route>
    </Routes>
  );
}
