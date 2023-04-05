import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import * as constants from "configs/constants";
import { deParaStatus } from "../../helper";

const ListagemAlteracoesCronogramas = ({
  alteracoesCronogramas,
  fornecedor
}) => {
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
        <div
          className={`grid-table header-table ${
            fornecedor ? "fornecedor" : ""
          }`}
        >
          <div>Nº da Solicitação de Alteração</div>
          <div>Nº do Cronograma</div>
          {!fornecedor && <div>Nome do Fornecedor</div>}
          <div>Status</div>
          <div>Data da Solicitação</div>
          <div>Ações</div>
        </div>
        {alteracoesCronogramas.map((alteracaoCronograma, index) => {
          return (
            <div key={`${alteracaoCronograma.numero_solicitacao}_${index}`}>
              <div
                className={`grid-table body-table ${
                  fornecedor ? "fornecedor" : ""
                }`}
              >
                <div>{alteracaoCronograma.numero_solicitacao}</div>
                <div>{alteracaoCronograma.cronograma}</div>
                {!fornecedor && <div>{alteracaoCronograma.fornecedor}</div>}
                <div>
                  {fornecedor
                    ? deParaStatus(alteracaoCronograma.status)
                    : alteracaoCronograma.status}
                </div>
                <div>{alteracaoCronograma.criado_em.split(" ")[0]}</div>
                <div>
                  <NavLink
                    className="float-left"
                    to={`/${constants.PRE_RECEBIMENTO}/${
                      constants.ANALISE_CRONOGRAMA_DILOG
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
