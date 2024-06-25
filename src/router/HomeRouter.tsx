import { Route, Routes } from "react-router-dom";
import {
  ConstituencyManagementPage,
  ContentPage,
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
        <Route path="" element={<ContentPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="elections" element={<ElectionManagementPage />} />
        <Route path="profile-settings" element={<ProfileSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="constituencies" element={<ConstituencyManagementPage />} />
      </Route>
    </Routes>
  );
}
