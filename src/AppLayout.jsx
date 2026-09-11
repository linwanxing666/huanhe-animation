import { Outlet } from "react-router-dom";
import { BackgroundVideo } from "./components/BackgroundVideo.jsx";
import { MobileMenu, SiteHeader, useMobileMenu } from "./components/SiteHeader.jsx";

export function AppLayout() {
  const {
    menuOpen,
    menuToggleRef,
    firstLinkRef,
    closeMenu,
    toggleMenu,
  } = useMobileMenu();

  return (
    <>
      <div className="page">
        <BackgroundVideo />
        <SiteHeader menuOpen={menuOpen} onToggleMenu={toggleMenu} menuToggleRef={menuToggleRef} />
        <Outlet />
      </div>
      <MobileMenu menuOpen={menuOpen} onClose={closeMenu} firstLinkRef={firstLinkRef} />
    </>
  );
}
