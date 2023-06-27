import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { EDITAR_NOTIFICACAO } from "configs/constants";

const ListagemSolicitacoes = ({ guias }) => {
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
        {guias.map(guia => {
          return (
            <>
              <div key={guia.uuid} className="grid-table body-table">
                <div>{guia.numero}</div>
                <div>{guia.nome_empresa}</div>
                <div>{guia.status}</div>
                <div>{guia.processo_sei ? guia.processo_sei : "--"}</div>
                <div>
                  <span
                    onClick={() =>
                      history.push({
                        pathname: `/logistica/${EDITAR_NOTIFICACAO}`,
                        state: {
                          guia: guia
                        }
                      })
                    }
                  >
                    <i
                      title={
                        guia.status === "RASCUNHO"
                          ? "Editar Rascunho"
                          : "Visualizar Notificação"
                      }
                      className={`verde fas fa-${
                        guia.status === "RASCUNHO" ? "edit" : "eye"
                      }`}
                    />
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
