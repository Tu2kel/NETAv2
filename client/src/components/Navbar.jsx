import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar(props) {
  const { logout } = props;
  return (
      <div className="links_header">
        <Link to="/create" className="nav_link creates">
          Home{" "}
        </Link>
        <Link to="/public" className="nav_link publics">
          Reviews{" "}
        </Link>
        <h2 onClick={logout} className="nav_link logouts">
          Logout{" "}
        </h2>
      </div>
  );
}
