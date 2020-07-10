import React from "react";
import { Link, NavLink } from "react-router-dom";

export const ListItem = ({ icon, to, children }) => (
  <li className="nav-item">
    <NavLink className={`nav-link collapsed`} to={to}>
      <i className={`fas ${icon}`} />
      <span>{children}</span>
    </NavLink>
  </li>
);

export const SubMenu = ({
  icon,
  path,
  title,
  onClick,
  activeMenu,
  children
}) => (
  <>
    <NavLink
      onClick={() => onClick(path)}
      activeClassName="active"
      className="collapse-item"
      to="#"
    >
      {title}
      <i className={`fas ${icon}`} />
    </NavLink>
    {activeMenu === path && <div className="submenu">{children}</div>}
  </>
);

export const LeafItem = ({ to, children }) => (
  <NavLink activeClassName="active" className="collapse-item" to={to}>
    {" "}
    {children}
  </NavLink>
);

export const Menu = ({ id, title, icon, children }) => (
  <li className="nav-item">
    <Link
      className={`nav-link collapsed`}
      to="#"
      data-toggle="collapse"
      data-target={`#collapse${id}`}
      aria-expanded="false"
      aria-controls={`collapse${id}`}
    >
      <i className={`fas ${icon}`} />
      <span>{title}</span>
    </Link>
    <div
      id={`collapse${id}`}
      className={`collapse`}
      aria-labelledby="headingConfig"
      data-parent="#accordionSidebar"
    >
      <div className="bg-white py-2 collapse-inner rounded">{children}</div>
    </div>
  </li>
);
