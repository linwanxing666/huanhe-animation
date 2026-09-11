import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navigation = [
  ["/", "首页"],
  ["/services", "服务"],
  ["/cases", "案例"],
  ["/contact", "联系"],
];

function navClass({ isActive }) {
  return isActive ? "active" : undefined;
}

export function SiteHeader({ menuOpen, onToggleMenu, menuToggleRef }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-wordmark" to="/" aria-label="幻核动漫首页">幻核动漫</Link>

        <nav className="desktop-nav" aria-label="主导航">
          {navigation.map(([path, label]) => (
            <NavLink key={path} className={navClass} end={path === "/"} to={path}>{label}</NavLink>
          ))}
        </nav>

        <Link className="desktop-contact" to="/contact">洽谈合作</Link>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMenu}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export function MobileMenu({ menuOpen, onClose, firstLinkRef }) {
  return (
    <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
      <button className="menu-overlay" type="button" aria-label="关闭导航菜单" onClick={() => onClose(true)} />
      <nav className="menu-sheet" aria-label="移动导航">
        {navigation.map(([path, label], index) => (
          <NavLink
            key={path}
            ref={index === 0 ? firstLinkRef : undefined}
            className={navClass}
            end={path === "/"}
            to={path}
            onClick={() => onClose(false)}
          >
            {label}
          </NavLink>
        ))}
        <Link className="menu-contact" to="/contact" onClick={() => onClose(false)}>洽谈合作</Link>
      </nav>
    </div>
  );
}

export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuToggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  function closeMenu(restoreFocus = false) {
    setMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuToggleRef.current?.focus({ preventScroll: true }));
    }
  }

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (menuOpen) {
      window.requestAnimationFrame(() => firstLinkRef.current?.focus({ preventScroll: true }));
    }

    function handleKeyDown(event) {
      if (event.key === "Escape" && menuOpen) closeMenu(true);
    }

    function handleResize() {
      if (window.innerWidth > 720) closeMenu(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return {
    menuOpen,
    menuToggleRef,
    firstLinkRef,
    closeMenu,
    toggleMenu,
  };
}
