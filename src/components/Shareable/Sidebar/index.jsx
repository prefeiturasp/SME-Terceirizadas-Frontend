import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SidebarContent } from "./SidebarContent";
import { AvatarEscola } from "../Avatar/AvatarEscola";
import { AvatarDRE } from "../Avatar/AvatarDRE";
import { AvatarCODAE } from "../Avatar/AvatarCODAE";
import { AvatarTerceirizada } from "../Avatar/AvatarTerceirizada";
import "./style.scss";
import {
  usuarioEhEscola,
  usuarioEhTerceirizada,
  usuarioEhDRE,
  usuarioEhCoordenadorEscola,
  usuarioEhDistribuidora,
  usuarioEhEscolaAbastecimento
} from "../../../helpers/utilities";
import { getAPIVersion } from "../../../services/api.service";
import { AvatarDistribuidor } from "../Avatar/AvatarDistribuidor";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      API_VERSION: ""
    };
  }

  retornaAvatar() {
    if (usuarioEhDistribuidora()) {
      return <AvatarDistribuidor />;
    } else if (usuarioEhTerceirizada()) {
      return <AvatarTerceirizada />;
    } else if (usuarioEhDRE()) {
      return <AvatarDRE />;
    } else if (
      usuarioEhEscola() ||
      usuarioEhEscolaAbastecimento() ||
      usuarioEhCoordenadorEscola()
    ) {
      return <AvatarEscola />;
    } else {
      return <AvatarCODAE />;
    }
  }

  async componentDidMount() {
    try {
      const response = await getAPIVersion();
      this.setState({ API_VERSION: response.API_Version });
    } catch (error) {
      // keep going
    }
  }

  render() {
    const { API_VERSION } = this.state;
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
            <div className="sidebar-brand-icon mb-3">
              {this.retornaAvatar()}
            </div>
          </Link>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3 pt-2">
            <div className="nav-item">
              {!toggled && nome && nome !== "" && (
                <div className="sidebar-brand-text text-center text-bold text-white small border border-light rounded-pill p-1 mx-3">
                  <span className="d-none d-lg-inline">{nome}</span>
                </div>
              )}
              <div className="profile mt-3">
                <i className="fas fa-user-edit" />
                <Link to="/perfil">
                  <span>Perfil</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="sidebar-wrapper div-submenu">
            <SidebarContent />
          </div>
          {!toggled && (
            <div className="text-center page-footer mx-auto justify-content-center mb-1 pb-2">
              <img
                src="/assets/image/logo-sme-branco.svg"
                className="rounded logo-sme"
                alt="SME Educação"
              />
              <div className="sidebar-wrapper">
                <div className="text-center mx-auto justify-content-center p-2 conteudo-detalhes">
                  <span className="text-white small">Licença AGPL V3</span>
                  <br />
                  <span className="text-white small">(API: {API_VERSION})</span>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
