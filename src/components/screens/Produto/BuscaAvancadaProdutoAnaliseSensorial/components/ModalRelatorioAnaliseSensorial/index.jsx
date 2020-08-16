import React, { Fragment } from "react";
import { Modal } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { getRelatorioEmAnaliseSensorial } from "services/relatorios";
import { getTituloRelatorio } from "./helpers";

const ModalRelatorioAnaliseSensorial = ({
  showModal,
  closeModal,
  produtos,
  filtros
}) => {
  return (
    <Modal
      visible={showModal}
      title="Relatório de produtos em análise sensorial"
      onCancel={closeModal}
      width={"95%"}
      footer={[
        <Botao
          key={0}
          texto="Voltar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={closeModal}
        />,
        <Botao
          key={1}
          type={BUTTON_TYPE.BUTTON}
          texto="Imprimir"
          style={BUTTON_STYLE.BLUE}
          icon={BUTTON_ICON.PRINT}
          onClick={() => {
            getRelatorioEmAnaliseSensorial({
              produtos: produtos,
              filtros: filtros
            });
          }}
        />
      ]}
    >
      <div className="body-modal">
        <div className="header-modal">
          {filtros && getTituloRelatorio(filtros)}
        </div>
        <div className="section-produtos-itens">
          <div className="item-produto-modal">
            <div className="item-header-produto-modal">
              <div className="item-grid-produto">
                <div>Nome do Produto</div>
                <div>Marca</div>
                <div>Fabricante</div>
                <div>Data de cadastro do produto</div>
                <div>Data solicitação análise sensorial</div>
              </div>

              {produtos !== null &&
                produtos.map((produto, index) => {
                  const dataSolicitacao = produto.ultima_homologacao.log_solicitacao_analise.criado_em.split(
                    " "
                  )[0];
                  const infoAdicionais =
                    produto.ultima_homologacao.log_solicitacao_analise
                      .justificativa;
                  return (
                    <Fragment key={index}>
                      <div className="item-grid-produto item-prod-detalhe">
                        <div>{produto.nome}</div>
                        <div>{produto.marca.nome}</div>
                        <div>{produto.fabricante.nome}</div>
                        <div>{produto.criado_em.split(" ")[0]}</div>
                        <div>{dataSolicitacao}</div>
                      </div>

                      <div className="row mt-3">
                        <div className="col">
                          <div className="ml-3">
                            <label>Empresa solicitante (Terceirizada)</label>
                            <br />
                            <b>
                              {
                                produto.ultima_homologacao.rastro_terceirizada
                                  .nome_fantasia
                              }
                            </b>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row mt-3">
                        <div className="col-6">
                          <div className="ml-3">
                            <label>Informações adicionais</label>
                            <br />
                            <b
                              dangerouslySetInnerHTML={{
                                __html: infoAdicionais
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-3">
                          <label>Data / Hora entrega do produto</label>
                          <br />
                          <b>
                            {produto.ultima_homologacao.resposta_analise.data}
                          </b>
                          <br />
                          <b>
                            {produto.ultima_homologacao.resposta_analise.hora}
                          </b>
                        </div>
                        <div className="col-3">
                          <label>Amostra(s) recebidas por:</label>
                          <br />
                          <b>
                            {
                              produto.ultima_homologacao.resposta_analise
                                .responsavel_produto
                            }
                          </b>
                          <br />
                          <b>
                            RF:{" "}
                            {
                              produto.ultima_homologacao.resposta_analise
                                .registro_funcional
                            }
                          </b>
                        </div>
                      </div>
                      <hr />
                      <div className="row mt-3">
                        <div className="col-3">
                          <div className="ml-3">
                            <label>Número de protocólo AS.</label>
                            <br />
                            <b>
                              {
                                produto.ultima_homologacao
                                  .protocolo_analise_sensorial
                              }
                            </b>
                          </div>
                        </div>
                        <div className="col-3">
                          <label>Data resposta terceirizada</label>
                          <br />
                          <b>
                            {
                              produto.ultima_homologacao.resposta_analise.criado_em.split(
                                " "
                              )[0]
                            }
                          </b>
                        </div>
                        <div className="col-6">
                          <label>Observação</label>
                          <br />
                          <b>
                            {
                              produto.ultima_homologacao.resposta_analise
                                .observacao
                            }
                          </b>
                        </div>
                      </div>
                      <hr />
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRelatorioAnaliseSensorial;
