import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import * as constants from "configs/constants";

const ListagemAlteracoesCronogramas = ({ alteracoesCronogramas }) => {
  const labelBotãoDetalhar = status => {
    const labels = {
      "Em análise": "Analisar",
      "Cronograma ciente": "Detalhar"
    };
    return labels[status];
  };

  return (
    <section className="resultado-cronograma-de-entrega">
      <header>Resultados da Pesquisa</header>
      <article className="mt-3">
        <div className="grid-table header-table">
          <div>Nº da Solicitação de Alteração</div>
          <div>Nº do Cronograma</div>
          <div>Nome do Fornecedor</div>
          <div>Status</div>
          <div>Data da Solicitação</div>
          <div>Ações</div>
        </div>
        {alteracoesCronogramas.map((alteracaoCronograma, index) => {
          return (
            <div key={`${alteracaoCronograma.numero_solicitacao}_${index}`}>
              <div className="grid-table body-table">
                <div>{alteracaoCronograma.numero_solicitacao}</div>
                <div>{alteracaoCronograma.cronograma}</div>
                <div>{alteracaoCronograma.fornecedor}</div>
                <div>{alteracaoCronograma.status}</div>
                <div>{alteracaoCronograma.criado_em.split(" ")[0]}</div>
                <div>
                  <NavLink
                    className="float-left"
                    to={`/${constants.PRE_RECEBIMENTO}/${
                      constants.DETALHAR_ALTERACAO_CRONOGRAMA
                    }?uuid=${alteracaoCronograma.uuid}`}
                  >
                    <span className="link-acoes green">
                      {labelBotãoDetalhar(alteracaoCronograma.status)}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemAlteracoesCronogramas;
