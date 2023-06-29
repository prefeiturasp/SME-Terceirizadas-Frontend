import { LOGISTICA, NOTIFICAR_EMPRESA } from "configs/constants";
import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./styles.scss";
import { EDITAR_NOTIFICACAO } from "configs/constants";

const ListagemNotificacoes = ({ notificacoes }) => {
  const history = useHistory();

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
                <div>
                  <span
                    onClick={() =>
                      history.push({
                        pathname: `/logistica/${EDITAR_NOTIFICACAO}`,
                        state: {
                          guia: notificacao
                        }
                      })
                    }
                  >
                    <i
                      title={
                        notificacao.status === "RASCUNHO"
                          ? "Editar Rascunho"
                          : "Visualizar Notificação"
                      }
                      className={`verde fas fa-${
                        notificacao.status === "RASCUNHO" ? "edit" : "eye"
                      }`}
                    />
                  </span>
                  {notificacao.status === "Notificação Enviada Fiscal" ? (
                    <span className="link-acoes px-2">
                      <i title="Notificação Enviada" className="fas fa-bell" />
                    </span>
                  ) : (
                    <NavLink
                      to={`/${LOGISTICA}/${NOTIFICAR_EMPRESA}?uuid=${
                        notificacao.uuid
                      }`}
                    >
                      <span className="link-acoes px-2">
                        <i title="Notificação" className="fas fa-bell green" />
                      </span>
                    </NavLink>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemNotificacoes;