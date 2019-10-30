import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  maxValue,
  required,
  naoPodeSerZero
} from "../../../helpers/fieldValidators";
import { extrairKitsLanche } from "../../SolicitacaoUnificada/helper";
import { STATUS_DRE_A_VALIDAR } from "../../../configs/constants";
import { validateTourRequestForm } from "../../../helpers/formValidators/tourRequestValidators";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../../helpers/utilities";
import { InputComData } from "../../Shareable/DatePicker";
import {
  getSolicitacoesKitLancheApi,
  inicioPedido,
  registroAtualizaKitLanche,
  removeKitLanche,
  solicitarKitLanche
} from "../../../services/solicitacaoDeKitLanche.service";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../Shareable/Botao/constants";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { InputText } from "../../Shareable/Input/InputText";
import ModalDataPrioritaria from "../../Shareable/ModalDataPrioritaria";
import { TextAreaWYSIWYG } from "../../Shareable/TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../../Shareable/Toast/dialogs";
import { PedidoKitLanche } from "../../Shareable/PedidoKitLanche";

import { Rascunhos } from "../Rascunhos";
import { montaObjetoRequisicao } from "./helper";
import "./style.scss";

const ENTER = 13;
export class SolicitacaoDeKitLanche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      qtd_kit_lanche: 0,
      kitsChecked: [],
      initialValues: false,
      radioChanged: false,
      rascunhosSolicitacoesKitLanche: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      showModal: false,
      modalConfirmation: false,
      modalMessage: "",
      botaoConfirma: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.validaDiasUteis = this.validaDiasUteis.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.updateKitsChecked = this.updateKitsChecked.bind(this);
  }

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      removeKitLanche(uuid).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            toastError("Houve um erro ao excluir o rascunho");
          }
        },
        function() {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
      this.resetForm();
    }
  }

  OnEditButtonClicked(solicitacaoKitLanche) {
    this.props.reset();
    this.props.change("uuid", solicitacaoKitLanche.uuid);
    this.props.change(
      "observacao",
      solicitacaoKitLanche.solicitacao_kit_lanche.descricao
    );
    this.props.change(
      "evento_data",
      solicitacaoKitLanche.solicitacao_kit_lanche.data
    );
    this.props.change("local", solicitacaoKitLanche.local);
    this.props.change(
      "quantidade_alunos",
      solicitacaoKitLanche.quantidade_alunos
    );
    this.props.change(
      "tempo_passeio",
      solicitacaoKitLanche.solicitacao_kit_lanche.tempo_passeio.toString()
    );
    this.setState({
      status: solicitacaoKitLanche.status,
      title: `Solicitação de Kit Lanche Passeio/Passeio # ${
        solicitacaoKitLanche.id_externo
      }`,
      salvarAtualizarLbl: "Atualizar",
      kitsChecked: extrairKitsLanche(
        solicitacaoKitLanche.solicitacao_kit_lanche.kits
      )
    });
  }

  resetForm() {
    this.props.reset();
    this.props.change("obs", "");
    this.setState({
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      qtd_kit_lanche: 0,
      initialValues: true,
      kitsChecked: []
    });
    this.refresh();
  }

  setInitialValues() {
    this.setState({ initialValues: false });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    const { meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading } = this.state;
    const dadosDaAPItotalmenteCarregados =
      meusDados !== null && proximos_dois_dias_uteis !== null && loading;
    if (dadosDaAPItotalmenteCarregados) {
      this.setState({
        loading: false
      });
    }
  }

  validaDiasUteis = event => {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        event.target.value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  };

  onSubmit(values) {
    values.kit_lanche = this.state.kitsChecked;
    values.quantidade_alunos = parseInt(values.quantidade_alunos);
    values.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;
    let solicitacao_kit_lanche = montaObjetoRequisicao(values);
    if (values.confirmar) {
      solicitacao_kit_lanche.confirmar = values.confirmar;
    }
    try {
      validateTourRequestForm(values);
      this.salvarOuEnviar(solicitacao_kit_lanche, values);
      this.handleConfirmation();
    } catch (SubmissionError) {
      toastError(SubmissionError.errors.kit_lanche);
    }
  }

  iniciarPedido(uuid) {
    inicioPedido(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Solicitação de Kit Lanche Passeio enviada com sucesso!"
          );
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(
            "Houve um erro ao enviar a Solicitação de Kit Lanche Passeio"
          );
        }
      },
      function() {
        toastError(
          "Houve um erro ao enviar a Solicitação de Kit Lanche Passeio"
        );
      }
    );
  }

  validaTipoMensagemError = response => {
    const tipoError = response.tipo_error[0];
    const messageModal = response.details[0];
    if (tipoError === "2") {
      this.setState({
        modalConfirmation: true,
        modalMessage: messageModal
      });
    } else if (tipoError === "1") {
      toastError(messageModal);
    }
  };

  salvarOuEnviar(solicitacao_kit_lanche, values) {
    if (values.status) {
      solicitacao_kit_lanche.status = values.status;
    }
    if (!values.uuid) {
      solicitarKitLanche(solicitacao_kit_lanche).then(resp => {
        if (resp.status === HTTP_STATUS.CREATED) {
          if (values.status === STATUS_DRE_A_VALIDAR) {
            this.iniciarPedido(resp.data.uuid);
          } else {
            toastSuccess(
              "Solicitação de Kit Lanche Passeio salva com sucesso!"
            );
            this.resetForm();
          }
        } else if (resp.data.tipo_error) {
          this.validaTipoMensagemError(resp.data);
        } else {
          toastError("Erro ao salvar Solicitação de Kit Lanche Passeio");
        }
      });
    } else {
      registroAtualizaKitLanche(solicitacao_kit_lanche, values.uuid)
        .then(resp => {
          if (resp.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(values.uuid);
            } else {
              toastSuccess(
                "Solicitação de Kit Lanche Passeio atualizada com sucesso!"
              );
              this.resetForm();
            }
          } else if (resp.data.tipo_error) {
            this.validaTipoMensagemError(resp.data);
          } else {
            toastError("erro ao atualizar a solicitação");
          }
        })
        .catch(() => {
          toastError("erro ao atualizar a solicitação");
        });
    }
  }

  refresh() {
    getSolicitacoesKitLancheApi().then(resp => {
      this.setState({ rascunhosSolicitacoesKitLanche: resp.results });
    });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  handleConfirmation() {
    this.setState({ modalConfirmation: false });
  }

  updateKitsChecked(kitsChecked) {
    this.setState({ kitsChecked });
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      proximos_dois_dias_uteis,
      meusDados
    } = this.props;
    const {
      rascunhosSolicitacoesKitLanche,
      showModal,
      modalMessage,
      modalConfirmation,
      botaoConfirma,
      loading,
      kitsChecked
    } = this.state;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onKeyPress={this.onKeyPress}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados numeroAlunos={meusDados.quantidade_alunos} />
            <Rascunhos
              rascunhosSolicitacoesKitLanche={rascunhosSolicitacoesKitLanche}
              OnDeleteButtonClicked={(id_externo, uuid) =>
                this.OnDeleteButtonClicked(id_externo, uuid)
              }
              resetForm={event => this.resetForm(event)}
              refreshComponent={this.refresh.bind(this)}
              OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
            />
            <br />
            <h3 className="page-title">{this.state.title}</h3>
            <div className="card mt-3 p-5">
              <div className="form-group row">
                <div className="col-3">
                  <Field
                    component={InputComData}
                    label="Data do passeio"
                    name="evento_data"
                    onBlur={event => this.validaDiasUteis(event)}
                    minDate={proximos_dois_dias_uteis}
                    required
                    validate={required}
                  />
                </div>
                <div className="col-9">
                  <Field
                    component={InputText}
                    label="Local do passeio"
                    name="local"
                    required
                    validate={[required]}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-3">
                  <Field
                    component={InputText}
                    name="quantidade_alunos"
                    type="number"
                    label="Número de alunos"
                    required
                    validate={[
                      required,
                      maxValue(meusDados.quantidade_alunos),
                      naoPodeSerZero
                    ]}
                  />
                </div>
              </div>
              <PedidoKitLanche
                nameTempoPasseio="tempo_passeio"
                nomeKitsLanche="kit_lanche"
                updateKitsChecked={this.updateKitsChecked}
                kitsChecked={kitsChecked}
                mostrarExplicacao
                validate={required}
              />
              <div className="kits-total form-group row mt-2 pt-3">
                <div className="col-12">
                  <label>{"Número total de kits:"}</label>
                  <span className="font-weight-bold pl-2">
                    {(this.props.quantidade_alunos &&
                      parseInt(this.props.quantidade_alunos) *
                        kitsChecked.length) ||
                      0}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  placeholder="Campo opcional"
                />
              </div>
              <div className="row mt-5">
                <div className="col-12 text-right">
                  <Botao
                    texto="Cancelar"
                    onClick={e => this.resetForm(e)}
                    disabled={pristine || submitting}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    type={BUTTON_TYPE.BUTTON}
                  />
                  <Botao
                    texto={this.state.salvarAtualizarLbl}
                    disabled={pristine || submitting}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: "RASCUNHO"
                      })
                    )}
                    className="ml-3"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto="Enviar"
                    disabled={pristine || submitting}
                    type={BUTTON_TYPE.SUBMIT}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: STATUS_DRE_A_VALIDAR
                      })
                    )}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                  />
                </div>
              </div>
              <Modal show={modalConfirmation} onHide={this.handleConfirmation}>
                <Modal.Header closeButton>
                  <Modal.Title>Atenção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <strong>{modalMessage}</strong>
                </Modal.Body>
                <Modal.Footer>
                  {botaoConfirma && (
                    <Botao
                      texto="CONFIRMAR MESMO ASSIM"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR,
                          salvo_em: new Date(),
                          confirmar: true
                        })
                      )}
                      style={BUTTON_STYLE.BLUE}
                      className="ml-3"
                    />
                  )}
                  <Botao
                    texto="CANCELAR"
                    type={BUTTON_TYPE.BUTTON}
                    onClick={this.handleConfirmation}
                    style={BUTTON_STYLE.BLUE_OUTLINE}
                    className="ml-3"
                  />
                </Modal.Footer>
              </Modal>
            </div>
          </form>
        )}
        <ModalDataPrioritaria
          showModal={showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

SolicitacaoDeKitLanche = reduxForm({
  form: "tourRequest",
  destroyOnUnmount: false
})(SolicitacaoDeKitLanche);

const selector = formValueSelector("tourRequest");
const mapStateToProps = state => {
  return {
    tempo_passeio: selector(state, "tempo_passeio"),
    quantidade_alunos: selector(state, "quantidade_alunos")
  };
};
export default connect(mapStateToProps)(SolicitacaoDeKitLanche);
