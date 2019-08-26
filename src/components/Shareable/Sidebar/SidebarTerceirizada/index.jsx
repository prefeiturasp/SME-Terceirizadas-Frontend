import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";

export class SidebarCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      redirectPainel: false,
      redirectRelatorio: false,
      menuOpened: "",
      subMenu: "",
      timeout: null
    };
  }

  setRedirectPainel() {
    this.setState({
      redirectPainel: true
    });
  }

  setRedirectRelatorio() {
    this.setState({
      redirectRelatorio: true
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

  renderizarRedirecionamentoPainel = () => {
    if (this.state.redirectPainel) {
      this.setState({ redirectPainel: false });
      return <Redirect to={"/codae/painel-de-controle"} />;
    }
  };

  renderizarRedirecionamentoRelatorio = () => {
    if (this.state.redirectRelatorio) {
      this.setState({ redirectRelatorio: false });
      return <Redirect to={"#"} />;
    }
  };

  renderTerceirizada() {
    const { menuOpened, subMenu } = this.state;
    return [
      <li onMouseLeave={event => this.closeMenu(event)} className="nav-item">
        <NavLink
          onClick={() => this.setRedirectPainel()}
          onMouseOver={() => this.openMenu("painel-inicial")}
          className={`nav-link collapsed ${menuOpened === "painel-inicial" &&
            "keep-hover-settings"} `}
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
          className={`collapse ${menuOpened === "painel-inicial" && "show"}`}
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
      </li>,
      <li onMouseLeave={event => this.closeMenu(event)} className="nav-item">
        <NavLink
          onClick={() => this.setRedirectRelatorio()}
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
      </li>,
      <li onMouseLeave={event => this.closeMenu(event)} className="nav-item">
        <Link
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
                  to="/configuracoes/cadastros"
                >
                  Perfil
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
          </div>
        </div>
      </li>
    ];
  }

  render() {
    return this.renderTerceirizada();
  }
}
