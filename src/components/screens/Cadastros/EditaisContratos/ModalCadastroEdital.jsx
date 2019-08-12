import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { montaEstadoEditalEContrato } from "./helper";

import "../style.scss";

export class ModalCadastroEdital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vigencias: [
        {
          data_ini: "17/07/07",
          data_fim: "14/07/07"
        },
        {
          data_ini: "17/07/07",
          data_fim: "14/07/07"
        }
      ]
    };
  }

  render() {
    const { showModal, closeModal, edital_contratos } = this.props;
    const { vigencias } = this.state;
    return (
      <Modal dialogClassName=" modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-cadastro-edital">
            Deseja Cadastrar um novo contrato?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <article className="modal-cadastro-edital">
              <header>Resumo</header>
              <div className="detalhes">
                <div>
                  <span>Tipo de contratação:</span> Pregão eletrônico{" "}
                </div>
                <div>
                  <span>Edital nº:</span> 78/SME/2016
                </div>
                <div>
                  <span>Processo administrativo do contrato:</span>{" "}
                  6016.2016/0003098-3
                </div>
                <div>
                  <span>Objeto resumido:</span> Contratação de empresa
                  especializada para prestação de serviço de nutrição e
                  alimentação escolar - terceirização total
                </div>
              </div>
            </article>
            <hr />

            <article className="modal-cadastro-edital">
              <header className="pb-3">Contratos relacionados</header>

              <section>
                <div className="detalhes">
                  <div>
                    <span>Contrato n°:</span> 38/SME/CODAE/2017
                  </div>
                  <div className="vigencias">
                    <span>Vigência: </span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <span>Processo administrativo do contrato:</span>{" "}
                    6016.2017/0029748-5
                  </div>
                  <div>
                    <span>Data da proposta:</span> 10/04/17
                  </div>
                  <div className="iteracao-elementos">
                    <span>Lote:</span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="iteracao-elementos">
                    <span>DRE:</span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="iteracao-elementos">
                    <span>Empresa:</span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
              
              <hr/>
              
              <section>
                <div className="detalhes">
                  <div>
                    <span>Contrato n°:</span> 38/SME/CODAE/2017
                  </div>
                  <div className="vigencias">
                    <span>Vigência: </span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <span>Processo administrativo do contrato:</span>{" "}
                    6016.2017/0029748-5
                  </div>
                  <div>
                    <span>Data da proposta:</span> 10/04/17
                  </div>
                  <div className="iteracao-elementos">
                    <span>Lote:</span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="iteracao-elementos">
                    <span>DRE:</span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="iteracao-elementos">
                    <span>Empresa:</span>
                    <div className="iteracao-elementos">
                      {vigencias.map(vigencia => {
                        return (
                          <div className="elementos">
                            De {vigencia.data_ini} até {vigencia.data_fim};
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </section>
        </Modal.Body>

        <Modal.Footer>
          <BaseButton
            label="Não"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.OutlinePrimary}
            className="ml-3"
          />
          <BaseButton
            label="Sim"
            type={ButtonType.BUTTON}
            onClick={() => this.onSubmit()}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalCadastroEdital;
