import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";
import { Checkbox } from "antd";

export default ({
  solicitacoes,
  ativos,
  setAtivos,
  selecionados,
  setSelecionados
}) => {
  const [allChecked, setAllChecked] = useState(false);

  const checkSolicitacao = solicitacao => {
    let newSelecionados = [...selecionados];
    if (solicitacao.checked) {
      solicitacao.checked = false;
      const index = newSelecionados.indexOf(solicitacao);
      if (index > -1) {
        newSelecionados.splice(index, 1);
      }
      setAllChecked(false);
    } else {
      solicitacao.checked = true;
      newSelecionados.push(solicitacao);
      if (newSelecionados.length === solicitacoes.length) setAllChecked(true);
    }
    setSelecionados(newSelecionados);
  };

  const checkAll = () => {
    let newSelecionados = [];
    solicitacoes.map(solicitacao => {
      solicitacao.checked = !allChecked;
      if (!allChecked) newSelecionados.push(solicitacao);
    });
    setAllChecked(!allChecked);
    setSelecionados(newSelecionados);
  };

  useEffect(() => {
    setAllChecked(false);
    setSelecionados([]);
  }, [solicitacoes]);

  return (
    <section className="resultado-busca-requisicao-entrega-dilog">
      <header>Veja requisições disponibilizadas</header>
      <article>
        <div className="grid-table header-table">
          <div>
            <Checkbox checked={allChecked} onChange={() => checkAll()} />
          </div>
          <div>N° da Requisição de Entrega</div>
          <div>Qtde. de Guias Remessa</div>
          <div>Distribuidor</div>
          <div>Status</div>
          <div>Data de entrega</div>
          <div />
          <div />
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
                  <Checkbox
                    checked={solicitacao.checked}
                    onChange={() => checkSolicitacao(solicitacao)}
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
                  {solicitacao.distribuidor_nome}
                </div>
                <div className={`${bordas}`}>{solicitacao.status}</div>
                <div className={`${bordas}`}>
                  {solicitacao.guias[0].data_entrega}
                </div>

                <div>
                  <Button className="acoes" variant="link">
                    Exportar Guias
                  </Button>
                </div>

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
              </div>
              {ativos &&
                ativos.includes(solicitacao.uuid) &&
                solicitacao.guias.map(guia => {
                  return (
                    <>
                      <section className="resultado-busca-detalhe pb-3 pt-3">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-3 justify-content-center align-self-center">
                              <span>
                                {" "}
                                N° da guia: <b>{guia.numero_guia}</b>
                              </span>
                            </div>
                            <div className="col-3 justify-content-center align-self-center">
                              <span>
                                {" "}
                                Status da guia: <b>{guia.status}</b>
                              </span>
                            </div>
                          </div>

                          <hr />

                          <div className="row">
                            <div className="col">
                              <b>Cód. CODAE da U.E</b>
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
                                <div className="row mt-3 overflow-auto">
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
