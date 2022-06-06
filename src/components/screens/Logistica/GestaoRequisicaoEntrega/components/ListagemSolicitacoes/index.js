import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";
import { Spin } from "antd";
import Confirmar from "../Confirmar";
import Alterar from "../Alterar";
import ListagemGuias from "../ListagemGuias";
import { toastError } from "components/Shareable/Toast/dialogs";
import { gerarParametrosConsulta } from "helpers/utilities";
import { gerarExcelSolicitacoes } from "services/logistica.service";

const ListagemSolicitacoes = ({
  solicitacoes,
  ativos,
  setAtivos,
  updatePage,
  confirmaCancelamentoGuias,
  imprimirRequisicao
}) => {
  const [carregando, setCarregando] = useState(false);

  const baixarPDF = async solicitacao => {
    setCarregando(true);
    await imprimirRequisicao(solicitacao.uuid);
    setCarregando(false);
  };

  const baixarExcel = solicitacao => {
    setCarregando(true);
    const params = gerarParametrosConsulta({
      numero_requisicao: solicitacao.numero_solicitacao
    });
    gerarExcelSolicitacoes(params)
      .then(() => {
        setCarregando(false);
      })
      .catch(error => {
        error.response.data.text().then(text => toastError(text));
        setCarregando(false);
      });
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
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
            <div>Exportar relatório</div>
            <div>Exportar Requisição</div>
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
                    <span className="pr-3 pl-3">|</span>
                    <Alterar
                      className="acoes alterar"
                      solicitacao={solicitacao}
                      updatePage={updatePage}
                    />
                  </div>
                  <div className={`${bordas}`}>
                    <Button
                      className="acoes"
                      variant="link"
                      onClick={() => baixarExcel(solicitacao)}
                    >
                      <i className="fas fa-file-excel green" />
                      <span className="link-exportar">Planilha</span>
                    </Button>
                  </div>
                  <div className={`${bordas}`}>
                    <Button
                      className="acoes"
                      variant="link"
                      onClick={() => baixarPDF(solicitacao)}
                    >
                      <i className="fas fa-file-pdf red" />
                      <span className="link-exportar">PDF</span>
                    </Button>
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
    </Spin>
  );
};

export default ListagemSolicitacoes;
