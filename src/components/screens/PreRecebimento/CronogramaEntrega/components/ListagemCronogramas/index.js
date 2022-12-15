import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import {
  CADASTRO_CRONOGRAMA,
  DETALHE_CRONOGRAMA,
  PRE_RECEBIMENTO,
  EDITAR
} from "configs/constants";
import {
  usuarioEhCronogramaCriacaoEdicao,
  usuarioEhFornecedor
} from "helpers/utilities";

const ListagemCronogramas = ({ cronogramas, ativos }) => {
  const statusValue = status => {
    if (usuarioEhFornecedor()) {
      if (status === "Enviado ao Fornecedor") {
        return "Recebido";
      }
    } else {
      return status;
    }
  };

  return (
    <section className="resultado-cronograma-de-entrega">
      <header>Resultado de Pesquisa</header>
      <article>
        <div className="grid-table header-table">
          <div>N° do Cronograma</div>
          <div>Produto</div>
          <div>Quantidade</div>
          <div>Armazém</div>
          <div>Status</div>
          <div>Ações</div>
        </div>
        {cronogramas.map((cronograma, index) => {
          const bordas =
            ativos && ativos.includes(cronograma.uuid) ? "desativar-borda" : "";
          return (
            <div key={`${cronograma.numero}_${index}`}>
              <div className="grid-table body-table">
                <div className={`${bordas}`}>{cronograma.numero}</div>
                <div className={`${bordas}`}>{cronograma.nome_produto}</div>
                <div className={`${bordas}`}>
                  {cronograma.qtd_total_programada}
                </div>
                <div className={`${bordas}`}>
                  {cronograma.armazem
                    ? cronograma.armazem.nome_fantasia
                    : undefined}
                </div>
                <div className={`${bordas}`}>
                  {statusValue(cronograma.status)}
                </div>

                <div className={`${bordas}`}>
                  {!usuarioEhFornecedor() && (
                    <>
                      {cronograma.status !== "Rascunho" ? (
                        <>
                          <NavLink
                            className="float-left"
                            to={`/${PRE_RECEBIMENTO}/${DETALHE_CRONOGRAMA}?uuid=${
                              cronograma.uuid
                            }`}
                          >
                            <span className="link-acoes green">Detalhar</span>
                          </NavLink>
                        </>
                      ) : (
                        <>
                          {usuarioEhCronogramaCriacaoEdicao() && (
                            <NavLink
                              className="float-left"
                              to={`/${PRE_RECEBIMENTO}/${CADASTRO_CRONOGRAMA}/${EDITAR}?uuid=${
                                cronograma.uuid
                              }`}
                            >
                              <span className="link-acoes green">Editar</span>
                            </NavLink>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemCronogramas;
