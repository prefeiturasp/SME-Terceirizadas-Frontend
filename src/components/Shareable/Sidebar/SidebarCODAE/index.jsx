import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CODAE,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  RELATORIOS,
  CONFIGURACOES,
  MENSAGEM,
  PERMISSOES,
  CADASTROS,
  LOTE,
  EMPRESA,
  EDITAIS_CONTRATOS,
  TIPOS_ALIMENTACAO,
  FAIXAS_ETARIAS
} from "../../../../configs/constants";
import { PERFIL } from "../../../../constants/shared";
import {
  usuarioCODAEGestaoAlimentacao,
  usuarioCODAEDietaEspecial
} from "../../../../helpers/utilities";

export class SidebarCODAE extends Component {
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
      usuarioCODAEGestaoAlimentacao() && (
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
                to="/"
              >
                Painel de Solicitações
              </NavLink>
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
                    to={`/${CODAE}/${SOLICITACOES_PENDENTES}`}
                  >
                    Aguardando autorização
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to={`/${CODAE}/${SOLICITACOES_AUTORIZADAS}`}
                  >
                    Autorizadas
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to={`/${CODAE}/${SOLICITACOES_NEGADAS}`}
                  >
                    Negadas
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to={`/${CODAE}/${SOLICITACOES_CANCELADAS}`}
                  >
                    Canceladas
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </li>
      ),
      usuarioCODAEDietaEspecial() && (
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
                to={`/`}
              >
                Painel Inicial
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
        </li>
      ),
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
      <li key={4} className="nav-item">
        <NavLink className={`nav-link collapsed`} to={`/${RELATORIOS}/`}>
          <i className="fas fa-file-alt" />
          <span>Relatórios</span>
        </NavLink>
      </li>,
      <li key={5} className="nav-item">
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
              to={`/${CONFIGURACOES}/${CADASTROS}`}
            >
              Perfil
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}`}
            >
              Unidades Escolares
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}/${LOTE}`}
            >
              Lotes
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}/${EMPRESA}`}
            >
              Empresas
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CONTRATOS}`}
            >
              Editais e Contratos
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}/${TIPOS_ALIMENTACAO}`}
            >
              Tipos de Alimentações
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${CADASTROS}/${FAIXAS_ETARIAS}`}
            >
              Faixas Etárias
            </NavLink>
          </div>
        </div>
      </li>,
      <li key={6} className="nav-item">
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
            {[
              PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA,
              PERFIL.COORDENADOR_DIETA_ESPECIAL
            ].includes(localStorage.getItem("perfil")) && (
              <NavLink
                activeClassName="active"
                className="collapse-item"
                to={`/${CONFIGURACOES}/${PERMISSOES}`}
              >
                Permissões
              </NavLink>
            )}
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}`}
            >
              Disparo de E-mail
            </NavLink>
            <NavLink
              activeClassName="active"
              className="collapse-item"
              to={`/${CONFIGURACOES}/${MENSAGEM}`}
            >
              Configuração de Mensagem
            </NavLink>
          </div>
        </div>
      </li>
    ];
  }
}
