import React from "react";

import "./styles.scss";
import { NavLink } from "react-router-dom";
import * as constants from "configs/constants";
import { deParaStatusAltCronograma } from "components/screens/helper";

const ListagemAlteracoesCronogramas = ({
  alteracoesCronogramas,
  fornecedor,
}) => {
  return (
    <section className="resultado-solicitacao-alteracao-cronograma-de-entrega">
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
                <div
                  className={`${
                    alteracaoCronograma.status ===
                      "Alteração Enviada ao Fornecedor" && "orange"
                  }`}
                >
                  {fornecedor
                    ? deParaStatusAltCronograma(alteracaoCronograma.status)
                    : alteracaoCronograma.status}
                </div>
                <div>{alteracaoCronograma.criado_em.split(" ")[0]}</div>
                <div>
                  <NavLink
                    className="float-start"
                    to={`/${constants.PRE_RECEBIMENTO}/${constants.DETALHAR_ALTERACAO_CRONOGRAMA}?uuid=${alteracaoCronograma.uuid}`}
                  >
                    <span
                      className={`link-acoes ${
                        alteracaoCronograma.status ===
                        "Alteração Enviada ao Fornecedor"
                          ? "orange"
                          : "green"
                      }`}
                    >
                      Detalhar
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
