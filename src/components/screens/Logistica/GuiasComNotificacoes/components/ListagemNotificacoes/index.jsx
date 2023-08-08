import {
  DETALHAR_NOTIFICACAO,
  LOGISTICA,
  NOTIFICAR_EMPRESA
} from "configs/constants";
import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./styles.scss";
import { EDITAR_NOTIFICACAO } from "configs/constants";
import { usuarioComAcessoTelaDetalharNotificacaoOcorrencia } from "helpers/utilities";

const ListagemNotificacoes = ({ notificacoes, fiscal }) => {
  const history = useHistory();

  const renderizarBotoesDeAcoes = notificacao => {
    const botaoRascunho = (
      <span
        className="link-acoes px-2"
        onClick={() =>
          history.push({
            pathname: `/${LOGISTICA}/${EDITAR_NOTIFICACAO}`,
            state: {
              guia: notificacao
            }
          })
        }
      >
        <i title="Editar Rascunho" className="verde fas fa-edit" />
      </span>
    );

    const botaoVisualizarNotificacao = (
      <NavLink
        to={`/${LOGISTICA}/${DETALHAR_NOTIFICACAO}?uuid=${notificacao.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Notificação" className="fas fa-eye green" />
        </span>
      </NavLink>
    );

    const botaoNotificarEmpresaHabilitado = (
      <NavLink
        to={`/${LOGISTICA}/${NOTIFICAR_EMPRESA}?uuid=${notificacao.uuid}`}
      >
        <span className="link-acoes px-2">
          <i title="Notificação" className="fas fa-bell green" />
        </span>
      </NavLink>
    );

    const botaoNotificarEmpresaDesabilitado = (
      <span className="link-acoes px-2">
        <i title="Notificação Enviada" className="fas fa-bell" />
      </span>
    );

    const status = notificacao.status.toUpperCase();

    return (
      <div>
        {status === "RASCUNHO" && botaoRascunho}
        {status === "NOTIFICAÇÃO ENVIADA FISCAL" ? (
          <>
            {usuarioComAcessoTelaDetalharNotificacaoOcorrencia() &&
              botaoVisualizarNotificacao}
            {botaoNotificarEmpresaDesabilitado}
          </>
        ) : (
          botaoNotificarEmpresaHabilitado
        )}
      </div>
    );
  };

  return (
    <section className="resultado-guias-notificacoes">
      <div className="titulo-verde">Lista de Notificações</div>
      <article>
        <div className="grid-table header-table">
          <div>Nº da Notificação</div>
          <div>Empresa</div>
          <div>Status da Notificação</div>
          <div>Número SEI</div>
          <div>Ações</div>
        </div>
        {notificacoes.map(notificacao => {
          return (
            <>
              <div key={notificacao.uuid} className="grid-table body-table">
                <div>{notificacao.numero}</div>
                <div>{notificacao.nome_empresa}</div>
                <div>{notificacao.status}</div>
                <div>
                  {notificacao.processo_sei ? notificacao.processo_sei : "--"}
                </div>
                {fiscal ? (
                  <div>
                    <span className="link-acoes px-2">
                      <i className="fas fa-file-signature" />
                    </span>
                  </div>
                ) : (
                  renderizarBotoesDeAcoes(notificacao)
                )}
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemNotificacoes;
