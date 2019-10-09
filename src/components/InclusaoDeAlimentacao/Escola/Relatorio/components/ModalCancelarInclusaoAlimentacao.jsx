import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import {
  toastError,
  toastSuccess,
  toastWarn
} from "../../../../Shareable/Toast/dialogs";
import { statusEnum } from "../../../../../constants/statusEnum";
import { stringSeparadaPorVirgulas } from "../../../../../helpers/utilities";
import { escolaCancelaInclusaoDeAlimentacaoAvulsa } from "../../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import { escolaCancelaInclusaoDeAlimentacaoContinua } from "../../../../../services/inclusaoDeAlimentacaoContinua.service";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants";
import { TextAreaWYSIWYG } from "../../../../Shareable/TextArea/TextAreaWYSIWYG";
import { MENSAGEM_VAZIA } from "../../../../Shareable/TextArea/constants";
import { required } from "../../../../../helpers/fieldValidators";

export class ModalCancelarInclusaoDeAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justificativa: ""
    };
  }

  async cancelarSolicitacaoDaEscola(uuid) {
    const { justificativa } = this.state;
    if (justificativa === MENSAGEM_VAZIA) {
      toastWarn("Justificativa é obrigatória.");
    } else {
      const escolaCancelaInclusao = this.props.ehInclusaoContinua
        ? escolaCancelaInclusaoDeAlimentacaoContinua
        : escolaCancelaInclusaoDeAlimentacaoAvulsa;
      let resp = "";
      resp = await escolaCancelaInclusao(uuid, justificativa);
      if (resp.status === HTTP_STATUS.OK) {
        this.props.closeModal();
        toastSuccess("Solicitação cancelada com sucesso!");
        this.props.setRedirect();
      } else {
        toastError(resp.detail);
      }
    }
  }

  renderParteAvulsa() {
    const { ehInclusaoContinua, inclusaoDeAlimentacao } = this.props;
    return (
      !ehInclusaoContinua && (
        <table className="table-periods">
          <tr>
            <th>Data</th>
            <th>Motivo</th>
          </tr>
          {inclusaoDeAlimentacao.inclusoes.map((inclusao, key) => {
            return (
              <tr key={key}>
                <td>{inclusao.data}</td>
                <td>{inclusao.motivo.nome}</td>
              </tr>
            );
          })}
        </table>
      )
    );
  }

  renderParteContinua() {
    const { ehInclusaoContinua, inclusaoDeAlimentacao } = this.props;
    return (
      ehInclusaoContinua && (
        <div>
          <div className="row">
            <div className="col-4 report-label-value">
              <p>Data do evento</p>
              <p className="value">
                {`${inclusaoDeAlimentacao.data_inicial} - ${
                  inclusaoDeAlimentacao.data_final
                }`}
              </p>
            </div>
            <div className="col-4 report-label-value">
              <p>Dias da Semana</p>
              <p className="value">
                {inclusaoDeAlimentacao.dias_semana_explicacao}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 report-label-value">
              <p>Motivo</p>
              <p className="value">{inclusaoDeAlimentacao.motivo.nome}</p>
            </div>
          </div>
        </div>
      )
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({ justificativa: this.props.justificativa });
    }
  }
  render() {
    const { showModal, closeModal, uuid, inclusaoDeAlimentacao } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelamento de Inclusão de Alimentação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="label--red">
                {inclusaoDeAlimentacao &&
                inclusaoDeAlimentacao.status === statusEnum.CODAE_AUTORIZADO
                  ? "Esta solicitação já foi autorizada pela CODAE. "
                  : "Esta solicitação está aguardando validação da DRE ou autorização da CODAE. "}
                Deseja seguir em frente com o cancelamento?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 label--gray margin-fix">
              <b>Resumo</b>
              <p>{`Solicitação nº #${inclusaoDeAlimentacao &&
                inclusaoDeAlimentacao.id_externo}`}</p>
              <p>{`Solicitante: AGUARDANDO DEFINIÇÃO DE PERFIL`}</p>
              {this.renderParteAvulsa()}
              {this.renderParteContinua()}
              <table className="table-periods">
                <tr>
                  <th>Período</th>
                  <th>Tipos de Alimentação</th>
                  <th>Quantidade de Alunos</th>
                </tr>
                {inclusaoDeAlimentacao &&
                  inclusaoDeAlimentacao.quantidades_periodo.map(
                    (quantidade_por_periodo, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            {quantidade_por_periodo.periodo_escolar &&
                              quantidade_por_periodo.periodo_escolar.nome}
                          </td>
                          <td>
                            {stringSeparadaPorVirgulas(
                              quantidade_por_periodo.tipos_alimentacao,
                              "nome"
                            )}
                          </td>
                          <td>{quantidade_por_periodo.numero_alunos}</td>
                        </tr>
                      );
                    }
                  )}
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Field
                component={TextAreaWYSIWYG}
                placeholder="Obrigatório"
                label="Justificativa"
                name="justificativa"
                required
                validate={required}
              />
            </div>
          </div>
        </Modal.Body>
        <div className="mt-5">
          <Modal.Footer>
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
                this.cancelarSolicitacaoDaEscola(uuid);
              }}
              style={BUTTON_STYLE.BLUE}
              className="ml-3"
            />
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}
