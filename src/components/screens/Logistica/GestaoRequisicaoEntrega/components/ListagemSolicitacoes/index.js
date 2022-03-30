import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";
import { Spin } from "antd";
import Confirmar from "../Confirmar";
import Alterar from "../Alterar";
import ListagemGuias from "../ListagemGuias";

const ListagemSolicitacoes = ({
  solicitacoes,
  ativos,
  setAtivos,
  updatePage,
  confirmaCancelamentoGuias,
  imprimirRequisicao
}) => {
  const [carregandoPDFSolicitacao, setCarregandoPDFSolicitacao] = useState([]);
  return (
    <section className="resultado-busca-requisicao-entrega">
      <header>Veja requisições disponibilizadas</header>
      <article>
        <div className="grid-table header-table">
          <div />
          <div>N° da Requisição de Entrega</div>
          <div>Qtde. de Guias Remessa</div>
          <div>Status</div>
          <div>Data de entrega</div>
          <div>Ações</div>
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
                    className={`fas fa-${icone}`}
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
                <div className={`${bordas}`}>
                  {solicitacao.guias.length}{" "}
                  {solicitacao.guias.length === 1 ? "guia" : "guias"}
                </div>
                <div className={`${bordas}`}>
                  {solicitacao.status === "Enviada"
                    ? "Recebida"
                    : solicitacao.status}
                </div>
                <div className={`${bordas}`}>
                  {solicitacao.guias[0].data_entrega}
                </div>
                <div>
                  <Confirmar
                    className="acoes confirmar"
                    solicitacao={solicitacao}
                    updatePage={updatePage}
                  />
                  |&nbsp;
                  <Alterar
                    className="acoes alterar"
                    solicitacao={solicitacao}
                    updatePage={updatePage}
                  />
                  |
                  <Spin
                    size="small"
                    spinning={carregandoPDFSolicitacao.includes(
                      solicitacao.uuid
                    )}
                  >
                    <Button
                      className="acoes text-dark"
                      variant="link"
                      onClick={async () => {
                        setCarregandoPDFSolicitacao([
                          ...carregandoPDFSolicitacao,
                          solicitacao.uuid
                        ]);
                        await imprimirRequisicao(solicitacao.uuid);
                        const index = carregandoPDFSolicitacao.indexOf(
                          solicitacao.uuid
                        );
                        setCarregandoPDFSolicitacao(
                          carregandoPDFSolicitacao.splice(index, 1)
                        );
                      }}
                      disabled={solicitacao.status !== "Confirmada"}
                    >
                      <i className="fas fa-print imprimir" /> Imprimir
                    </Button>
                  </Spin>
                </div>
              </div>
              {ativos && ativos.includes(solicitacao.uuid) && (
                <>
                  <ListagemGuias
                    solicitacao={solicitacao}
                    confirmaCancelamentoGuias={confirmaCancelamentoGuias}
                  />
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
