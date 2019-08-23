import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import "./style.scss";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      toggled: false,
      redirect: false,
      menuOpened: "",
      subMenu: "",
      timeout: null
    };
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  openMenu(menu) {
    const timeout = setTimeout(
      function() {
        this.setState({ menuOpened: menu });
      }.bind(this),
      1000
    );
    this.setState({ timeout });
  }

  closeMenu(event) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    }
    this.setState({ menuOpened: "" });
  }

  onSubmenuClick(submenu) {
    let subMenu = this.state.subMenu;
    subMenu = subMenu === submenu ? "" : submenu;
    this.setState({ subMenu });
  }

  renderizarRedirecionamento = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to={"/codae/painel-de-controle"} />;
    }
  };

  renderCODAE() {
    const { toggle, menuOpened, subMenu } = this.state;
    return (
      <div>
        {this.renderizarRedirecionamento()}
        <div className="mb-5" />
        <ul
          className={`navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5
          ${toggle && "toggled"}`}
          id="accordionSidebar"
        >
          <div className="sidebar-divider my-0" />
          <p
            onClick={() => this.setState({ toggle: !toggle })}
            className="text-right c-pointer"
          >
            <img
              src="/assets/image/button_recolher-menu.png"
              alt="botão recolher menu"
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
              <div className="sidebar-brand-text text-center">
                <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                  Valeria Luna
                </span>
              </div>
              <Link
                className="nav-link text-white small text-center collapsed"
                href="#teste"
              >
                <i className="fas fa-user-edit" />
                <span>Perfil</span>
              </Link>
            </div>
          </div>
          <li
            onMouseLeave={event => this.closeMenu(event)}
            className="nav-item"
          >
            <NavLink
              onClick={() => this.setRedirect()}
              onMouseOver={() => this.openMenu("painel-inicial")}
              className={`nav-link collapsed ${menuOpened ===
                "painel-inicial" && "keep-hover-settings"} `}
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
              className={`collapse ${menuOpened === "painel-inicial" &&
                "show"}`}
              aria-labelledby="headingPainel"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white collapse-inner rounded">
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/codae/solicitacoes"
                >
                  Solicitações Autorizadas
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/codae/solicitacoes"
                >
                  Solicitações Pendentes <br />
                  de Autorização
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/codae/solicitacoes"
                >
                  Solicitações Recusadas
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/codae/solicitacoes"
                >
                  Solicitações Canceladas
                </NavLink>
              </div>
            </div>
          </li>
          <li
            onMouseLeave={event => this.closeMenu(event)}
            className="nav-item"
          >
            <NavLink
              onClick={() => this.setRedirect()}
              onMouseOver={() => this.openMenu("relatorio")}
              className={`nav-link collapsed ${menuOpened === "relatorio" &&
                "keep-hover-settings"} `}
              data-toggle="collapse"
              data-target="#collapseRelatorio"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-file-alt" />
              <span>Relatório</span>
            </NavLink>
            <div
              id="collapseRelatorio"
              className={`collapse ${menuOpened === "relatorio" && "show"}`}
              aria-labelledby="headingSchool"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white collapse-inner rounded">
                <NavLink
                  onClick={() => this.onSubmenuClick("solicitacoes")}
                  activeClassName="active"
                  className="collapse-item"
                  to="#"
                >
                  Por tipo de Solicitação
                  <i className="fas fa-chevron-down" />
                </NavLink>
                {subMenu === "solicitacoes" && (
                  <div className="submenu">
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Inclusão de Alimentação
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Alteração de Cardápio
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Solicitação de Kit Lanche
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Solicitação Unificada
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Inversão de Dia de Cardápio
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Suspensão de Alimentação
                    </NavLink>
                  </div>
                )}
                <NavLink
                  onClick={() => this.onSubmenuClick("status")}
                  activeClassName="active"
                  className="collapse-item"
                  to="#"
                >
                  Por tipo de Status
                  <i className="fas fa-chevron-down" />
                </NavLink>
                {subMenu === "status" && (
                  <div className="submenu">
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Inclusão de Alimentação
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Alteração de Cardápio
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Solicitação de Kit Lanche
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Solicitação Unificada
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Inversão de Dia de Cardápio
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Suspensão de Alimentação
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </li>
          <li
            onMouseLeave={event => this.closeMenu(event)}
            className="nav-item"
          >
            <Link
              onClick={() => this.setRedirect()}
              onMouseOver={() => this.openMenu("cadastros")}
              className={`nav-link collapsed ${menuOpened === "cadastros" &&
                "keep-hover-settings"} `}
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
              className={`collapse ${menuOpened === "cadastros" && "show"}`}
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
                      to="#"
                    >
                      Perfil
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Unidades Escolares
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="/configuracoes/cadastros/lote"
                    >
                      Lotes
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="/configuracoes/cadastros/empresa"
                    >
                      Empresas
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="/configuracoes/cadastros/editais-contratos"
                    >
                      Editais e Contratos
                    </NavLink>
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="#"
                    >
                      Tipos de Alimentações
                    </NavLink>
                  </div>
                )}
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to="/configuracoes/permissoes"
                >
                  Permissões
                </NavLink>
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
          <div
            style={{ display: !this.state.isVisible ? "none" : "block" }}
            className="page-footer mx-auto justify-content-center mt-5 pb-2"
          >
            <img
              src="/assets/image/logo_sme.svg"
              className="rounded float-left"
              alt="SME Educação"
            />
          </div>
        </ul>
      </div>
    );
  }

  render() {
    return this.renderCODAE();
  }
}
