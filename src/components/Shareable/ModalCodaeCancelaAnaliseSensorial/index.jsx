import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Spin } from "antd";
import { withRouter } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { Field as FieldReduxForm } from "redux-form";
import { OnChange } from "react-final-form-listeners";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import {
  maxLengthProduto,
  textAreaRequiredAndAtLeastOneCharacter
} from "helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess, toastWarn } from "../Toast/dialogs";
import { MENSAGEM_VAZIA } from "../TextArea/constants";
import { composeValidators } from "helpers/utilities";
import { InputText } from "components/Shareable/Input/InputText";

import "./styles.scss";
import { CODAECancelaAnaliseSensorialProduto } from "services/produto.service";

const maxLength1500 = maxLengthProduto(1500);

class ModalCodaeCancelaAnaliseSensorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desabilitarSubmit: true,
      loading: false
    };

    this.setDesabilitarSubmit = this.setDesabilitarSubmit.bind(this);
  }

  setDesabilitarSubmit(value) {
    this.setState({
      desabilitarSubmit:
        [undefined, null, "", "<p></p>\n"].includes(value) ||
        maxLength1500(value)
    });
  }

  async autorizarSolicitacao(uuid, values) {
    const { closeModal, loadSolicitacao, setDisableBotaoCancelar } = this.props;
    if (values.justificativa_autorizacao === MENSAGEM_VAZIA) {
      toastWarn("Justificativa é obrigatória.");
    } else {
      this.setState({
        loading: true
      });
      const resp = await CODAECancelaAnaliseSensorialProduto(
        uuid,
        values.justificativa_autorizacao
      );
      if (resp.status === HTTP_STATUS.OK) {
        this.setState({
          loading: false
        });
        setDisableBotaoCancelar();
        closeModal();
        loadSolicitacao(uuid);
        toastSuccess("Solicitação cancelada com sucesso");
      } else {
        toastError(resp.data.detail);
      }
    }
  }

  render() {
    const { showModal, closeModal, produto, uuid } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Spin spinning={this.state.loading} tip="Carregando...">
          <Form
            onSubmit={() => {}}
            initialValues={{}}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Deseja cancelar a solicitação de análise sensorial do
                    produto?
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <section className="informacoes-do-produto">
                    <div className="">
                      <label className="label-formulario-produto">
                        <nav>*</nav>Nome do produto
                      </label>
                      <FieldReduxForm
                        component={InputText}
                        name="nome_produto"
                        placeholder={produto.nome}
                        disabled={true}
                      />
                    </div>
                    <div className="">
                      <label className="label-formulario-produto">
                        <nav>*</nav>Marca
                      </label>
                      <FieldReduxForm
                        component={InputText}
                        name="marca_produto"
                        placeholder={produto.marca && produto.marca.nome}
                        disabled={true}
                      />
                    </div>
                  </section>
                  <div className="form-row">
                    <div className="form-group col-12">
                      <Field
                        component={TextAreaWYSIWYG}
                        label="Justificativa"
                        name="justificativa_autorizacao"
                        required
                        validate={composeValidators(
                          textAreaRequiredAndAtLeastOneCharacter,
                          maxLength1500
                        )}
                      />
                      <OnChange name="justificativa_autorizacao">
                        {value => {
                          this.setDesabilitarSubmit(value);
                        }}
                      </OnChange>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="row mt-4">
                    <div className="col-12">
                      <Botao
                        texto="Voltar"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={closeModal}
                        style={BUTTON_STYLE.BLUE_OUTLINE}
                        className="ml-3"
                      />
                      <Botao
                        texto="Enviar Cancelamento"
                        type={BUTTON_TYPE.BUTTON}
                        onClick={() => {
                          this.autorizarSolicitacao(uuid, values);
                        }}
                        style={BUTTON_STYLE.BLUE}
                        className="ml-3"
                        disabled={this.state.desabilitarSubmit}
                      />
                    </div>
                  </div>
                </Modal.Footer>
              </form>
            )}
          />
        </Spin>
      </Modal>
    );
  }
}

export default withRouter(ModalCodaeCancelaAnaliseSensorial);
