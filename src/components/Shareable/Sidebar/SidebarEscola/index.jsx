import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ALTERACAO_CARDAPIO,
  DIETA_ESPECIAL,
  ESCOLA,
  INCLUSAO_ALIMENTACAO,
  INVERSAO_CARDAPIO,
  RELATORIOS,
  SOLICITACAO_KIT_LANCHE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_RECUSADAS,
  SUSPENSAO_ALIMENTACAO,
  CONFIGURACOES,
  CADASTROS,
  HORARIO_COMBOS_ALIMENTACAO
} from "../../../../configs/constants";
import { PERFIL } from "../../../../constants/shared";

export class SidebarEscola extends Component {
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
        <NavLink className={`nav-link collapsed`} to="/">
          <i className="fas fa-file-alt" />
          <span>Painel Inicial</span>
        </NavLink>
      </li>,
      <li key={1} className="nav-item">
        <Link
          className={`nav-link collapsed`}
          href="#teste"
          data-toggle="collapse"
          data-target="#collapseGestaoAlimentacao"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          <i className="fas fa-utensils" />
          <span>Gestão de Alimentação</span>
        </Link>
        <div
          id="collapseGestaoAlimentacao"
          className={`collapse`}
          aria-labelledby="headingConfig"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to="/painel-gestao-alimentacao"
            >
              Painel de Solicitações
            </NavLink>
            <NavLink
              onClick={() => this.onSubmenuClick("novas-solicitacoes")}
              activeClassName="active"
              className="collapse-item"
              to="#"
            >
              Novas Solicitações
              <i className="fas fa-chevron-down" />
            </NavLink>
            {subMenu === "novas-solicitacoes" && (
              <div className="submenu">
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`}
                >
                  Inclusão de Alimentação
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${ALTERACAO_CARDAPIO}`}
                >
                  Alteração de Cardápio
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${SOLICITACAO_KIT_LANCHE}`}
                >
                  Kit Lanche Passeio
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${INVERSAO_CARDAPIO}`}
                >
                  Inversão de Dia de Cardápio
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${SUSPENSAO_ALIMENTACAO}`}
                >
                  Suspensão de Alimentação
                </NavLink>
              </div>
            )}
            <NavLink
              onClick={() => this.onSubmenuClick("consulta-solicitacoes")}
              activeClassName="active"
              className="collapse-item"
              to="#"
            >
              Consulta de Solicitações
              <i className="fas fa-chevron-down" />
            </NavLink>
            {subMenu === "consulta-solicitacoes" && (
              <div className="submenu">
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${SOLICITACOES_PENDENTES}`}
                >
                  Aguardando autorização
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${SOLICITACOES_AUTORIZADAS}`}
                >
                  Autorizadas
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${SOLICITACOES_RECUSADAS}`}
                >
                  Negadas
                </NavLink>
                <NavLink
                  activeClassName="active"
                  className="collapse-item"
                  to={`/${ESCOLA}/${SOLICITACOES_CANCELADAS}`}
                >
                  Canceladas
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </li>,
      <li key={2} className="nav-item">
        <Link
          className={`nav-link collapsed`}
          href="#teste"
          data-toggle="collapse"
          data-target="#collapseDietaEspecial"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-carrot" />
          <span>Dieta Especial</span>
        </Link>
        <div
          id="collapseDietaEspecial"
          className={`collapse`}
          aria-labelledby="headingConfig"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to="/painel-dieta-especial"
            >
              Painel de Solicitações
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${ESCOLA}/${DIETA_ESPECIAL}`}
            >
              Nova Solicitação
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/dieta-especial/ativas-inativas`}
            >
              Consulta Dieta de Alunos
            </NavLink>
          </div>
        </div>
      </li>,
      <li key={3} className="nav-item">
        <Link
          className={`nav-link collapsed`}
          href="#teste"
          data-toggle="collapse"
          data-target="#collapsePD"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-atom" />
          <span>{"P&D"}</span>
        </Link>
        <div
          id="collapsePD"
          className={`collapse`}
          aria-labelledby="headingConfig"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/pesquisa-desenvolvimento/busca-produto`}
            >
              Busca de Produto
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
          data-target="#collapseCadastros"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-user-plus" />
          <span>Cadastros</span>
        </Link>
        <div
          id="collapseCadastros"
          className={`collapse`}
          aria-labelledby="headingConfig"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}/${HORARIO_COMBOS_ALIMENTACAO}`}
            >
              Horários de Alimentações
            </NavLink>
          </div>
        </div>
      </li>,
      localStorage.getItem("perfil") === PERFIL.DIRETOR && (
        <li key={5} className="nav-item">
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
                activeClassName="active"
                className="collapse-item"
                to="/configuracoes/permissoes"
              >
                Permissões
              </NavLink>
            </div>
          </div>
        </li>
      )
    ];
  }
}
