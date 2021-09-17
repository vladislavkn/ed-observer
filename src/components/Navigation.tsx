import { Collapse } from "bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const navbarMobileRef = useRef<HTMLDivElement>(null);
  const [collapse, setCollapse] = useState<Collapse | null>(null);

  const toggle = () => collapse && collapse.toggle();

  useEffect(() => {
    if (navbarMobileRef.current)
      setCollapse(
        new Collapse(navbarMobileRef.current, {
          toggle: false,
        })
      );
  }, [navbarMobileRef]);

  const location = useLocation();

  useEffect(() => {
    collapse && collapse.hide();
  }, [location.pathname, collapse]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{ backgroundColor: "var(--bs-primary)" }}
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          ИНБО-01-21
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" ref={navbarMobileRef}>
          <div className="navbar-nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" && "active"}`}
            >
              Расписание
            </Link>
            <Link
              to="/login"
              className={`nav-link ${
                location.pathname === "/login" && "active"
              }`}
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
