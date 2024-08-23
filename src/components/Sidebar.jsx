import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/list">List View</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
