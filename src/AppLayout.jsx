import { Outlet } from "react-router-dom";
import { BackgroundVideo } from "./components/BackgroundVideo.jsx";

export function AppLayout() {
  return (
    <div className="page">
      <BackgroundVideo />
      <Outlet />
    </div>
  );
}
