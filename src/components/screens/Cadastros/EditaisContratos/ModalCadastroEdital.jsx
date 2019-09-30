import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";

import "../style.scss";

export class ModalCadastroEdital extends Component {
  onSubmit() {
    let requisicao_edital = this.props.edital_contratos;
    const values = {
      numero: requisicao_edital.numero,
      tipo_contratacao: requisicao_edital.tipo_contratacao,
      processo: requisicao_edital.numero_processo,
      objeto: requisicao_edital.resumo,
      contratos: requisicao_edital.contratos_relacionados.map(contrato => {
        return {
          terceirizada: contrato.empresas[0],
          vigencias: contrato.vigencias,
          numero: contrato.numero_contrato,
          processo: contrato.processo_administrativo,
          lotes: contrato.lotes,
          diretorias_regionais: contrato.dres,
          data_proposta: contrato.data_proposta
        };
      })
    };
    this.props.onSubmit(values);
  }

  render() {
    const { showModal, closeModal, edital_contratos } = this.props;
    return (
      <Modal dialogClassName=" modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-cadastro-edital">
            Deseja Cadastrar um novo contrato?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            {edital_contratos && (
              <Fragment>
                <article className="modal-cadastro-edital">
                  <header>Resumo</header>
                  <div className="detalhes">
                    <div>
                      <span>Tipo de contratação:</span>{" "}
                      {edital_contratos.tipo_contratacao}
                    </div>
                    <div>
                      <span>Nº do edital:</span> {edital_contratos.numero}
                    </div>
                    <div>
                      <span>Processo administrativo do contrato:</span>{" "}
                      {edital_contratos.numero_processo}
                    </div>
                    <div>
                      <span>Objeto resumido:</span> {edital_contratos.resumo}
                    </div>
                  </div>
                </article>
                <hr />

                <article className="modal-cadastro-edital">
                  <header className="pb-3">Contratos relacionados</header>

                  {edital_contratos.contratos_relacionados.map(contrato => {
                    return (
                      <Fragment>
                        <section>
                          <div className="detalhes">
                            <div>
                              <span>Contrato n°:</span>{" "}
                              {contrato.numero_contrato}
                            </div>
                            <div className="vigencias">
                              <span>Vigência: </span>
                              <div className="iteracao-elementos">
                                {contrato.vigencias.map(vigencia => {
                                  return (
                                    <div className="elementos">
                                      De {vigencia.data_inicial} até{" "}
                                      {vigencia.data_final};
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              <span>Processo administrativo do contrato:</span>{" "}
                              {contrato.processo_administrativo}
                            </div>
                            <div>
                              <span>Data da proposta:</span>{" "}
                              {contrato.data_proposta}
                            </div>
                            <div className="iteracao-elementos">
                              <span>Lote:</span>
                              <div className="iteracao-elementos">
                                {contrato.lotes_nomes.map(lote => {
                                  return (
                                    <div className="elementos">{lote}; </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="iteracao-elementos">
                              <span>DRE:</span>
                              <div className="iteracao-elementos">
                                {contrato.dres_nomes.map(dre => {
                                  return (
                                    <div className="elementos">{dre}; </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="iteracao-elementos">
                              <span>Empresa:</span>
                              <div className="iteracao-elementos">
                                {contrato.empresas_nomes}
                              </div>
                            </div>
                          </div>
                        </section>
                        <hr />
                      </Fragment>
                    );
                  })}
                </article>
              </Fragment>
            )}
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
