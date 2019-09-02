import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SidebarCODAE } from "./SidebarCODAE";
import { SidebarDRE } from "./SidebarDRE";
import { SidebarEscola } from "./SidebarEscola";
import { SidebarTerceirizada } from "./SidebarTerceirizada";
import "./style.scss";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: "escola",
      toggled: false
    };
  }

  render() {
    const { perfil } = this.state;
    const { nome, toggle, toggled } = this.props;
    return (
      <div>
        <div className="mb-5" />
        <ul
          className={`navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5
          ${toggled && "toggled"}`}
          id="accordionSidebar"
        >
          <div className="sidebar-divider my-0" />
          {/* Somente para testar o sidebar enquanto ainda não há perfil/permissões */}
          {!toggled && (
            <div className="testing-sidebar row">
              <div
                onClick={() => this.setState({ perfil: "escola" })}
                className="col-2"
              >
                Escola
              </div>
              <div
                onClick={() => this.setState({ perfil: "dre" })}
                className="col-2"
              >
                DRE
              </div>
              <div
                onClick={() => this.setState({ perfil: "codae" })}
                className="col-2"
              >
                CODAE
              </div>
              <div
                onClick={() => this.setState({ perfil: "terceirizada" })}
                className="col-2"
              >
                Terceirizada
              </div>
            </div>
          )}
          <p onClick={() => toggle()} className="text-right c-pointer">
            <i
              className={
                toggled
                  ? `fas fa-chevron-circle-right`
                  : `fas fa-chevron-circle-left`
              }
            />
          </p>
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <img
                alt="Imagem ilustrativa"
                className="img-profile rounded-circle"
                src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
              />
            </div>
          </Link>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3">
            <div className="nav-item">
              {!toggled && nome && nome !== "" && (
                <div className="sidebar-brand-text text-center">
                  <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                    {nome}
                  </span>
                </div>
              )}
              <div className="profile">
                <i className="fas fa-user-edit" />
                <span>Perfil</span>
              </div>
            </div>
          </div>
          {perfil === "codae" && <SidebarCODAE />}
          {perfil === "dre" && <SidebarDRE />}
          {perfil === "escola" && <SidebarEscola />}
          {perfil === "terceirizada" && <SidebarTerceirizada />}
          {!toggled && (
            <div className="text-center page-footer mx-auto justify-content-center mt-5 pb-2">
              <img
                src="/assets/image/logo-sme-branco.svg"
                className="rounded"
                alt="SME Educação"
              />
              <p>
                SME-SP-SGA - Distribuído sob <br />a Licença AGPL V3
              </p>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
