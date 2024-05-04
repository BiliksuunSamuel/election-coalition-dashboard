import { HashRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";

export default function Router() {
  return (
    <HashRouter>
      <AuthRouter />
      <HomeRouter />
    </HashRouter>
  );
}
