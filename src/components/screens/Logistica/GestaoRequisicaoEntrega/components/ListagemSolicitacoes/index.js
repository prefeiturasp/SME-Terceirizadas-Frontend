import React from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";

const ListagemSolicitacoes = ({ solicitacoes, ativos, setAtivos }) => {
  return (
    <section className="resultado-busca-requisicao-entrega">
      <header>Veja solicitações disponibilizadas</header>
      <article>
        <div className="grid-table header-table">
          <div />
          <div>Nº da solicitação</div>
          <div>Qtde de guias</div>
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
                <div className={`${bordas}`}>
                  <Button className="acoes confirmar" variant="link">
                    <i className="fas fa-check-circle confirmar" /> Confirmar
                  </Button>
                  |
                  <Button className="acoes alterar" variant="link">
                    {" "}
                    <i className="fas fa-sync-alt alterar" /> Alterar
                  </Button>
                  |
                  <Button className="acoes text-dark" variant="link">
                    <i className="fas fa-print imprimir" /> Imprimir
                  </Button>
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
                            <div className="col-md-9 justify-content-center align-self-center">
                              <span>
                                {" "}
                                N° da guia: <b>{guia.numero_guia}</b>
                              </span>
                            </div>
                            <div className="col-md-3">
                              <Botao
                                texto="Imprimir"
                                type={BUTTON_TYPE.BUTTON}
                                style={BUTTON_STYLE.DARK_OUTLINE}
                                icon={BUTTON_ICON.PRINT}
                                className="float-right"
                              />
                            </div>
                          </div>

                          <hr />

                          <div className="row">
                            <div className="col">
                              <b>Cód. CODAE UE</b>
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
                                  <div className="col">
                                    <b>Nome do produto</b>
                                    <br />
                                    {alimento.nome_alimento}
                                  </div>
                                  <div className="col border-left">
                                    <b>Quantidade</b>
                                    <br />
                                    {alimento.qtd_volume}
                                  </div>
                                  <div className="col border-left">
                                    <b>Embalagem</b>
                                    <br />
                                    {alimento.embalagem}
                                  </div>
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
