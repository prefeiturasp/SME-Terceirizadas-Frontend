import React from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";
import AlimentosConsolidado from "../AlimentosConsolidado";
import Aceitar from "../Aceitar";

const ListagemSolicitacoes = ({
  solicitacoes,
  ativos,
  setAtivos,
  updatePage
}) => {
  return (
    <section className="resultado-busca-solicitacao-alteracao">
      <header>Veja solicitações disponibilizadas</header>
      <article>
        <div className="grid-table header-table">
          <div>N° da Solicitação de Alteração</div>
          <div>Qtde. de Guias Remessa</div>
          <div>Nome do Distribuidor</div>
          <div>Status</div>
          <div>Data de entrega</div>
          <div />
        </div>
        {solicitacoes.map(solicitacao => {
          const bordas =
            ativos && ativos.includes(solicitacao.uuid)
              ? "desativar-borda"
              : "";
          const toggleText =
            ativos && ativos.includes(solicitacao.uuid)
              ? "Ver menos"
              : "Ver mais";
          return (
            <>
              <div className="grid-table body-table">
                <div className={`${bordas}`}>
                  {solicitacao.numero_solicitacao}
                </div>
                <div className={`${bordas}`}>{solicitacao.qtd_guias}</div>
                <div className={`${bordas}`}>
                  {solicitacao.nome_distribuidor}
                </div>
                <div className={`${bordas}`}>{solicitacao.status}</div>
                <div className={`${bordas}`}>{solicitacao.data_entrega}</div>
                <div>
                  <Button
                    className="acoes"
                    variant="link"
                    onClick={() => {
                      ativos && ativos.includes(solicitacao.uuid)
                        ? setAtivos(
                            ativos.filter(el => el !== solicitacao.uuid)
                          )
                        : setAtivos(
                            ativos
                              ? [...ativos, solicitacao.uuid]
                              : [solicitacao.uuid]
                          );
                    }}
                  >
                    {toggleText}
                  </Button>
                </div>
              </div>
              {ativos && ativos.includes(solicitacao.uuid) && (
                <section className="resultado-busca-detalhe pb-3 pt-3">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        <b>Data de Solicitação de Alteração: </b>{" "}
                        {solicitacao.criado_em}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col">
                        <b>Motivo</b> <br />
                        {solicitacao.motivo.replace(",", " /")}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col">
                        <b>Justificativa da solicitação</b> <br />
                        {solicitacao.justificativa}
                      </div>
                    </div>
                    {solicitacao.justificativa_aceite && (
                      <div className="row mt-2">
                        <div className="col">
                          <b>Justificativa de aceite</b> <br />
                          {solicitacao.justificativa_aceite}
                        </div>
                      </div>
                    )}

                    <div>
                      <AlimentosConsolidado solicitacao={solicitacao} />

                      <div className="d-flex justify-content-end">
                        <Aceitar
                          className=""
                          solicitacao={solicitacao}
                          updatePage={updatePage}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemSolicitacoes;
