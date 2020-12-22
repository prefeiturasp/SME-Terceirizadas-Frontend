import React from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";

export default ({ solicitacoes, ativos, setAtivos }) => {
  return (
    <section className="resultado-busca-requisicao-entrega-dilog">
      <header>Veja requisições disponibilizadas</header>
      <article>
        <div className="grid-table header-table">
          <div>N° da Requisição de Entrega</div>
          <div>Qtde. de Guias Remessa</div>
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
                <div className={`${bordas}`}>
                  {solicitacao.guias.length}{" "}
                  {solicitacao.guias.length === 1 ? "guia" : "guias"}
                </div>
                <div className={`${bordas}`}>{solicitacao.status}</div>
                <div className={`${bordas}`}>
                  {solicitacao.guias[0].data_entrega}
                </div>

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
              {ativos &&
                ativos.includes(solicitacao.uuid) &&
                solicitacao.guias.map(guia => {
                  return (
                    <>
                      <section className="resultado-busca-detalhe pb-3 pt-3">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col justify-content-center align-self-center">
                              <span>
                                {" "}
                                N° da guia: <b>{guia.numero_guia}</b>
                              </span>
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
