import { Collapse } from "bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import weekdaysApi from "../api/weekdaysApi";

const Navigation: React.FC<{}> = () => {
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

  const revalidate = async () => {
    await weekdaysApi.revalidate("ИНБО-01-21");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "var(--bs-primary)" }}
    >
      <div className="container">
        <div className="d-flex align-tems-center">
          <button
            type="button"
            className="btn"
            onClick={revalidate}
            style={{ backgroundColor: "var(--bs-primary)", color: "white" }}
          >
            <i className="bi bi-arrow-repeat"></i>
          </button>
          <a className="navbar-brand" href="/">
            ИНБО-01-21
          </a>
        </div>

        <button
          className="navbar-toggler"
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
              to="/edit"
              className={`nav-link ${
                location.pathname === "/edit" && "active"
              }`}
            >
              Изменить
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
