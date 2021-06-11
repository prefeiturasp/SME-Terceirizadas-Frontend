import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";

const ListagemSolicitacoes = ({ solicitacoes, ativos, setAtivos, dilog }) => {
  return (
    <section
      className={`resultado-busca-entregas ${dilog ? "dilog" : "distribuidor"}`}
    >
      <article>
        <div className={`grid-table header-table top-header`}>
          <div className={dilog ? "colspan-4" : "colspan-3"} />
          <div className="colspan-4">Guias de Remessa</div>
          <div className="colspan-2">Exportar</div>
        </div>
        <div className="grid-table header-table">
          <div />
          <div>Requisição</div>
          {dilog && <div>Distribuidor</div>}
          <div>Data de entrega</div>
          <div>Qtde.</div>
          <div>Conferidas</div>
          <div>Insucesso</div>
          <div>Pendentes</div>
          <div>Relatório</div>
          <div>Guias de Remessa</div>
        </div>
        {solicitacoes.map(solicitacao => {
          const bordas =
            ativos && ativos.includes(solicitacao.uuid)
              ? "desativar-borda"
              : "";
          const icone =
            ativos && ativos.includes(solicitacao.uuid)
              ? "angle-up"
              : "angle-down";
          return (
            <>
              <div className="grid-table body-table">
                <div>
                  <i
                    className={`fas fa-${icone} expand`}
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
                  />
                </div>

                <div className={`${bordas}`}>
                  {solicitacao.numero_solicitacao}
                </div>
                {dilog && (
                  <div className={`${bordas}`}>
                    {solicitacao.distribuidor_nome}
                  </div>
                )}
                <div className={`${bordas}`}>{solicitacao.data_entrega}</div>
                <div className={`${bordas}`}>{solicitacao.qtd_guias}</div>
                <div className={`${bordas}`}>
                  {solicitacao.guias_parciais +
                    solicitacao.guias_recebidas +
                    solicitacao.guias_nao_recebidas}
                </div>
                <div className={`${bordas}`}>{solicitacao.guias_insucesso}</div>
                <div className={`${bordas}`}>{solicitacao.guias_pendentes}</div>

                <div>
                  <i className="fas fa-download download-icon" />
                </div>
                <div>
                  <i className="fas fa-download download-icon" />
                </div>
              </div>
              {ativos && ativos.includes(solicitacao.uuid) && (
                <>
                  <section className="resultado-busca-detalhe pb-3">
                    <div className="container-fluid">
                      <strong className="mb-2">
                        Detalhes das Guias Conferidas:{" "}
                      </strong>
                      <div className="card-container">
                        <div className="card-status">
                          <div className="card-content recebidas">
                            <div>Recebidas:</div>
                            <div>{solicitacao.guias_recebidas}</div>
                          </div>
                        </div>

                        <div className="card-status">
                          <div className="card-content parciais">
                            <div>Parciais:</div>
                            <div>{solicitacao.guias_parciais}</div>
                          </div>
                        </div>

                        <div className="card-status">
                          <div className="card-content nao-recebidas">
                            <div>Não Recebidas:</div>
                            <div>{solicitacao.guias_nao_recebidas}</div>
                          </div>
                        </div>

                        <div className="card-status">
                          <div className="card-content repo-parcial">
                            <div>Reposição Parcial:</div>
                            <div>{solicitacao.guias_reposicao_parcial}</div>
                          </div>
                        </div>

                        <div className="card-status">
                          <div className="card-content repo-total">
                            <div>Reposição Total:</div>
                            <div>{solicitacao.guias_reposicao_total}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemSolicitacoes;
