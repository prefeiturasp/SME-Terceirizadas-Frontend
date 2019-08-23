import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../../../pages/Home";
import authService from "../../../services/auth";
import BaseButton, { ButtonIcon } from "../button";
import "./style.scss";

export class Header extends Component {
  state = {};
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white static-top navbar-sme fixed-top">
          <div className="container-fluid">
            <div className="nav-bar">
              <Link className="navbar-brand" exact to="/" component={Home}>
                <img src="/assets/image/logo-sigpae.png" alt="" />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link">
                    Profile &nbsp;
                    <i className="fa fa-1x fa-user-circle" />
                  </Link>
                </li>
                <li className="nav-item">
                  <BaseButton
                    className="nav-link"
                    icon={ButtonIcon.POWER_OFF}
                    label="Sair &nbsp;"
                    onClick={() => authService.logout()}
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
