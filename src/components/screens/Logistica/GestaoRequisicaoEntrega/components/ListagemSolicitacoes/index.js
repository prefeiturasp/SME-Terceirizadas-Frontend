import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import { Spin } from "antd";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import {
  gerarPDFDistribuidorSolicitacao,
  gerarPDFDistribuidorGuia
} from "services/logistica.service";
import Confirmar from "../Confirmar";
import Alterar from "../Alterar";

const ListagemSolicitacoes = ({
  solicitacoes,
  ativos,
  setAtivos,
  updatePage
}) => {
  const [carregandoPDFSolicitacao, setCarregandoPDFSolicitacao] = useState([]);
  const [carregandoPDFGuia, setCarregandoPDFGuia] = useState([]);
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
                      onClick={() => {
                        setCarregandoPDFSolicitacao([
                          ...carregandoPDFSolicitacao,
                          solicitacao.uuid
                        ]);
                        gerarPDFDistribuidorSolicitacao(solicitacao.uuid).then(
                          () => {
                            const index = carregandoPDFSolicitacao.indexOf(
                              solicitacao.uuid
                            );
                            setCarregandoPDFSolicitacao(
                              carregandoPDFSolicitacao.splice(index, 1)
                            );
                          }
                        );
                      }}
                      disabled={solicitacao.status !== "Confirmada"}
                    >
                      <i className="fas fa-print imprimir" /> Imprimir
                    </Button>
                  </Spin>
                </div>
              </div>
              {ativos &&
                ativos.includes(solicitacao.uuid) &&
                solicitacao.guias.map(guia => {
                  return (
                    <>
                      <section className="resultado-busca-detalhe pb-3">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-10 justify-content-center align-self-center">
                              <span>
                                {" "}
                                N° da guia: <b>{guia.numero_guia}</b>
                              </span>
                            </div>
                            <div className="col text-center">
                              <Spin
                                size="small"
                                spinning={carregandoPDFGuia.includes(guia.uuid)}
                              >
                                <div>
                                  <Botao
                                    texto="Imprimir"
                                    type={BUTTON_TYPE.BUTTON}
                                    style={BUTTON_STYLE.DARK_OUTLINE}
                                    icon={BUTTON_ICON.PRINT}
                                    disabled={
                                      solicitacao.status !== "Confirmada"
                                    }
                                    onClick={() => {
                                      setCarregandoPDFGuia([
                                        ...carregandoPDFGuia,
                                        guia.uuid
                                      ]);
                                      gerarPDFDistribuidorGuia(guia.uuid).then(
                                        () => {
                                          const index = carregandoPDFGuia.indexOf(
                                            guia.uuid
                                          );
                                          setCarregandoPDFGuia(
                                            carregandoPDFGuia.splice(index, 1)
                                          );
                                        }
                                      );
                                    }}
                                  />
                                </div>
                              </Spin>
                            </div>
                          </div>

                          <hr />

                          <div className="row">
                            <div className="col">
                              <b>Cód. CODAE U.E</b>
                              <br />
                              {guia.codigo_unidade}
                            </div>
                            <div className="col border-left">
                              <b>Nome Unidade Educacional</b>
                              <br />
                              {guia.nome_unidade}
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col">
                              <b>Endereço</b>
                              <br />
                              {guia.endereco_unidade}, {guia.numero_unidade} -{" "}
                              {guia.bairro_unidade} - CEP: {guia.cep_unidade} -{" "}
                              {guia.cidade_unidade} - {guia.estado_unidade}
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col">
                              <b>Contato de entrega</b>
                              <br />
                              {guia.contato_unidade}
                            </div>
                            <div className="col border-left">
                              <b>Telefone</b>
                              <br />
                              {guia.telefone_unidade}
                            </div>
                          </div>

                          {guia.alimentos.map(alimento => {
                            return (
                              <>
                                <div className="row mt-3">
                                  <div className="col-2">
                                    <b>Nome do produto</b>
                                    <br />
                                    {alimento.nome_alimento}
                                  </div>

                                  <div className={"col-2"}>
                                    <b>Quantidade</b>
                                    <br />
                                    {alimento.embalagens[0].qtd_volume}
                                  </div>
                                  <div className="col">
                                    <b>
                                      Embalagem{" "}
                                      {alimento.embalagens[0].tipo_embalagem}
                                    </b>
                                    <br />
                                    {
                                      alimento.embalagens[0].descricao_embalagem
                                    }{" "}
                                    {
                                      alimento.embalagens[0]
                                        .capacidade_embalagem
                                    }{" "}
                                    {alimento.embalagens[0].unidade_medida}
                                  </div>

                                  {alimento.embalagens.length > 1 && (
                                    <>
                                      <div className={"col-2 border-left"}>
                                        <b>Quantidade</b>
                                        <br />
                                        {alimento.embalagens[1].qtd_volume}
                                      </div>
                                      <div className="col">
                                        <b>
                                          Embalagem{" "}
                                          {
                                            alimento.embalagens[1]
                                              .tipo_embalagem
                                          }
                                        </b>
                                        <br />
                                        {
                                          alimento.embalagens[1]
                                            .descricao_embalagem
                                        }{" "}
                                        {
                                          alimento.embalagens[1]
                                            .capacidade_embalagem
                                        }{" "}
                                        {alimento.embalagens[1].unidade_medida}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </section>
                    </>
                  );
                })}
            </>
          );
        })}
      </article>
    </section>
  );
};

export default ListagemSolicitacoes;
