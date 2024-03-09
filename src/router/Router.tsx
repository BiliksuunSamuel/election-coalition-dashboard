import { HashRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";

export default function Router() {
  return (
    <HashRouter>
      <AuthRouter />
    </HashRouter>
  );
}
