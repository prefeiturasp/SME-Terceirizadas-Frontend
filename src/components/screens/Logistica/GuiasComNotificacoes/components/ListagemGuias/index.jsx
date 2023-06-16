import React from "react";

import "./styles.scss";

const ListagemSolicitacoes = ({ guias }) => {
  return (
    <section className="resultado-guias-notificacoes">
      <div className="titulo-verde">Lista de Notificações</div>
      <article>
        <div className="grid-table header-table">
          <div>Nº da Notificação</div>
          <div>Empresa</div>
          <div>Status da Notificação</div>
          <div>Número SEI</div>
        </div>
        {guias.map(guia => {
          return (
            <>
              <div key={guia.uuid} className="grid-table body-table">
                <div>{guia.numero}</div>
                <div>{guia.nome_empresa}</div>
                <div>{guia.status}</div>
                <div>{guia.processo_sei ? guia.processo_sei : "--"}</div>
              </div>
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemSolicitacoes;
