import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { CONFERENCIA_GUIA, LOGISTICA, REPOSICAO_GUIA } from "configs/constants";
import { NavLink } from "react-router-dom";

const ListagemSolicitacoes = ({ guias }) => {
  function ehReposicao(value) {
    let statusReposicao = ["Recebimento parcial", "Não recebida"];
    return statusReposicao.includes(value);
  }

  return (
    <section className="resultado-conferir-entrega">
      <article>
        <div className="grid-table header-table">
          <div>Número da Guia</div>
          <div>Nome do Distribuidor</div>
          <div>Data de entrega</div>
          <div>Status</div>
          <div>Ações</div>
        </div>
        {guias.map(guia => {
          return (
            <>
              <div key={guia.uuid} className="grid-table body-table">
                <div>{guia.numero_guia}</div>
                <div>{guia.nome_distribuidor}</div>
                <div>{guia.data_entrega}</div>
                <div>{guia.status}</div>
                <div>
                  {ehReposicao(guia.status) ? (
                    <NavLink
                      className="float-left"
                      to={`/${LOGISTICA}/${REPOSICAO_GUIA}?uuid=${guia.uuid}`}
                    >
                      <span className="link-acoes green">
                        <i className="fas fa-redo" />
                        Repor
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      className="float-left"
                      to={`/${LOGISTICA}/${CONFERENCIA_GUIA}?uuid=${guia.uuid}`}
                    >
                      <span className="link-acoes green">
                        <i className="fas fa-eye" />
                        Conferir
                      </span>
                    </NavLink>
                  )}
                  |
                  <span className="link-acoes">
                    <i className="fas fa-print" />
                    Imprimir
                  </span>
                </div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemSolicitacoes;
