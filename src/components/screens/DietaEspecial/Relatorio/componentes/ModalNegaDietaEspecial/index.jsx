import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import {
  peloMenosUmCaractere,
  required
} from "../../../../../../helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../../../../../Shareable/TextArea/TextAreaWYSIWYG";
import {
  toastError,
  toastSuccess,
  toastWarn
} from "../../../../../Shareable/Toast/dialogs";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";
import { MENSAGEM_VAZIA } from "../../../../../Shareable/TextArea/constants";
import Select from "../../../../../Shareable/Select";
import { agregarDefault } from "../../../../../../helpers/utilities";
import { getMotivosNegacaoDietaEspecial } from "../../../../../../services/painelNutricionista.service";
import { formataMotivos } from "./helper";

export class ModalNegarSolicitacao extends Component {
  constructor(props) {
    super(props);
    this.state = { justificativa: "" };
  }

  async negarSolicitacaoEscolaOuDre(uuid) {
    const { justificativa, motivo } = this.props;
    if (justificativa === MENSAGEM_VAZIA) {
      toastWarn("Justificativa é obrigatória.");
    } else {
      const payload = {
        motivo_negacao: motivo,
        justificativa_negacao: justificativa
      };
      const resp = await this.props.endpoint(uuid, payload);
      if (resp.status === HTTP_STATUS.OK) {
        this.props.closeModal();
        toastSuccess("Solicitação negada com sucesso!");
        if (this.props.loadSolicitacao) {
          this.props.loadSolicitacao(this.props.uuid);
        }
      } else {
        toastError(resp.data.detail);
      }
    }
  }

  componentDidMount = async () => {
    const motivosNegacao = await getMotivosNegacaoDietaEspecial();
    this.setState({
      motivosNegacao: agregarDefault(formataMotivos(motivosNegacao.results))
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({ justificativa: this.props.justificativa });
    }
  }

  render() {
    const { motivosNegacao } = this.state;
    const { showModal, closeModal, uuid } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja negar a solicitação?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Field
                component={Select}
                label="Motivo"
                name="motivo_negacao"
                options={motivosNegacao}
                required
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="form-group col-12">
              <Field
                component={TextAreaWYSIWYG}
                label="Justificativa"
                name="justificativa_negacao"
                required
                validate={[peloMenosUmCaractere, required]}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row mt-4">
            <div className="col-12">
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.BLUE_OUTLINE}
                className="ml-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => {
                  this.negarSolicitacaoEscolaOuDre(uuid);
                }}
                style={BUTTON_STYLE.BLUE}
                className="ml-3"
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalNegarSolicitacao;
