import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../../../services/auth";
import "./style.scss";
import { ENVIRONMENT } from "constants/config";
import NotificacoesNavbar from "../NotificacoesNavbar";

export class Header extends Component {
  render() {
    const { toggled } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white static-top navbar-sme fixed-top">
          <div className="container-fluid">
            <div
              className={`nav-bar ${toggled && "toggled"} ${
                ENVIRONMENT !== "production" ? "p-0" : ""
              }`}
            >
              <Link className="navbar-brand" to="/">
                <img src="/assets/image/logo-sigpae.png" alt="" />
              </Link>
              {ENVIRONMENT === "development" && (
                <img
                  className="marca-d-agua"
                  src="/assets/image/marca-dev.png"
                  alt=""
                />
              )}
              {ENVIRONMENT === "homolog" && (
                <img
                  className="marca-d-agua"
                  src="/assets/image/marca-hom.png"
                  alt=""
                />
              )}
              {ENVIRONMENT === "treinamento" && (
                <img
                  className="marca-d-agua"
                  src="/assets/image/marca-tre.png"
                  alt=""
                />
              )}
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
                  <Link
                    to={{
                      pathname: `/ajuda`,
                      state: {
                        prevPath: window.location.pathname
                      }
                    }}
                    className="nav-link"
                  >
                    <img src="/assets/image/ajuda.svg" alt="Ícone de ajuda" />
                  </Link>
                  <p className="title">Ajuda</p>
                </li>
                <li className="nav-item">
                  <NotificacoesNavbar />
                </li>
                <li onClick={() => authService.logout()} className="nav-item">
                  <div className="nav-link">
                    <img src="/assets/image/sair.svg" alt="Ícone de logout" />
                  </div>
                  <p className="title">Sair</p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
