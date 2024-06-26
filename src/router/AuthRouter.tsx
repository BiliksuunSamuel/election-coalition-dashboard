import { Route, Routes } from "react-router-dom";
import {
  AuthGuard,
  AuthPage,
  LoginPage,
  VerificationPage,
} from "../pages/auth";

export default function AuthRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <AuthPage />
          </AuthGuard>
        }
      >
        <Route path="" element={<LoginPage />} />
        <Route path="verify-otp" element={<VerificationPage />} />
      </Route>
    </Routes>
  );
}
