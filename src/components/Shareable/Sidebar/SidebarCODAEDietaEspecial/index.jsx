import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class SidebarCODAEDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenu: ""
    };
  }

  onSubmenuClick(submenu) {
    let subMenu = this.state.subMenu;
    subMenu = subMenu === submenu ? "" : submenu;
    this.setState({ subMenu });
  }

  render() {
    return [
      <li key={1} className="nav-item">
        <NavLink
          className={`nav-link collapsed`}
          data-toggle="collapse"
          data-target="#collapsePainel"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-sliders-h" />
          <span>Painel Inicial</span>
        </NavLink>
        <div
          id="collapsePainel"
          className={`collapse`}
          aria-labelledby="headingPainel"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white collapse-inner rounded">
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/`}
            >
              Home
            </NavLink>
          </div>
        </div>
      </li>
    ];
  }
}
