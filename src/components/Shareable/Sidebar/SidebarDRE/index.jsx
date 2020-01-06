import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  DRE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_RECUSADAS,
  SOLICITACOES_CANCELADAS,
  RELATORIOS
} from "../../../../configs/constants";
import { PERFIL } from "../../../../constants";

export class SidebarDRE extends Component {
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
    const { subMenu } = this.state;
    return [
      <li key={0} className="nav-item">
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
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${DRE}/${SOLICITACOES_AUTORIZADAS}`}
            >
              Autorizadas
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${DRE}/${SOLICITACOES_PENDENTES}`}
            >
              Aguardando autorização
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${DRE}/${SOLICITACOES_RECUSADAS}`}
            >
              Negadas
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${DRE}/${SOLICITACOES_CANCELADAS}`}
            >
              Canceladas
            </NavLink>
          </div>
        </div>
      </li>,
      <li key={1} className="nav-item">
        <NavLink
          className={`nav-link collapsed`}
          data-toggle="collapse"
          data-target="#collapseSolicitacoes"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-edit" />
          <span>Novas solicitações</span>
        </NavLink>
        <div
          id="collapseSolicitacoes"
          className={`collapse`}
          aria-labelledby="headingPainel"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white collapse-inner rounded">
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${DRE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}
            >
              Solicitação Unificada
            </NavLink>
          </div>
        </div>
      </li>,
      <li key={3} className="nav-item">
        <NavLink className={`nav-link collapsed`} to={`/${RELATORIOS}/`}>
          <i className="fas fa-file-alt" />
          <span>Relatórios</span>
        </NavLink>
      </li>,
      <li key={4} className="nav-item">
        <Link
          className={`nav-link collapsed`}
          href="#teste"
          data-toggle="collapse"
          data-target="#collapseConfig"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-cog" />
          <span>Configurações</span>
        </Link>
        <div
          id="collapseConfig"
          className={`collapse`}
          aria-labelledby="headingConfig"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              onClick={() => this.onSubmenuClick("cadastros")}
              activeClassName="active"
              className="collapse-item"
              to="#"
            >
              Cadastros
              <i className="fas fa-chevron-down" />
            </NavLink>
            {subMenu === "cadastros" && (
              <div className="submenu">
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/configuracoes/cadastros"
                >
                  Perfil
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/configuracoes/cadastros"
                >
                  Unidades Escolares
                </NavLink>
              </div>
            )}
            {[PERFIL.SUPLENTE, PERFIL.COGESTOR].includes(
              localStorage.getItem("perfil")
            ) && (
              <NavLink
                activeClassName="active"
                className="collapse-item"
                to="/configuracoes/permissoes"
              >
                Permissões
              </NavLink>
            )}
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to="/configuracoes"
            >
              Disparo de E-mail
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to="/configuracoes/mensagem"
            >
              Configuração de Mensagem
            </NavLink>
          </div>
        </div>
      </li>
    ];
  }
}
