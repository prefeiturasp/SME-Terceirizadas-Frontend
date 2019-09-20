import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  maxValue,
  required,
  naoPodeSerZero
} from "../../helpers/fieldValidators";
import { extrairKitsLanche } from "../../components/SolicitacaoUnificada/helper";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import { validateTourRequestForm } from "../../helpers/formValidators/tourRequestValidators";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../helpers/utilities";
import {
  getSolicitacoesKitLancheApi,
  inicioPedido,
  registroAtualizaKitLanche,
  removeKitLanche,
  solicitarKitLanche
} from "../../services/solicitacaoDeKitLanche.service";
import {
  ButtonStyle,
  ButtonType,
  default as BaseButton,
  default as Button
} from "../Shareable/button";
import CardMatriculados from "../Shareable/CardMatriculados";
import { InputText } from "../Shareable/Input/InputText";
import SelecionaKitLancheBox from "../Shareable/KitLanche/SelecionaKitLancheBox/SelecionaKitLancheBox";
import SelecionaTempoPasseio from "../Shareable/KitLanche/SelecionaTempoPasseio/SelecionaTempoPasseio";
import {
  LabelAndDate,
  LabelAndInput,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import { Rascunhos } from "./Rascunhos";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Grid } from "../Shareable/responsiveBs4";
import { montaObjetoRequisicao } from "./helper";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};
export class SolicitacaoDeKitLanche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      qtd_kit_lanche: 0,
      initialValues: false,
      radioChanged: false,
      rascunhosSolicitacoesKitLanche: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar",
      showModal: false,
      modalConfirmation: false,
      modalMessage: "",
      botaoConfirma: true
    };
    this.setNumeroDeKitLanches = this.setNumeroDeKitLanches.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.validaDiasUteis = this.validaDiasUteis.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
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
        function(error) {
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
      solicitacaoKitLanche.solicitacao_kit_lanche.tempo_passeio
    );
    this.props.change(
      "kit_lanche",
      extrairKitsLanche(solicitacaoKitLanche.solicitacao_kit_lanche.kits)
    );
    this.setState({
      status: solicitacaoKitLanche.status,
      title: `Solicitação # ${solicitacaoKitLanche.id_externo}`,
      salvarAtualizarLbl: "Atualizar"
    });
  }

  resetForm(event) {
    this.props.reset();
    this.props.change("obs", "");
    this.setState({
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar",
      qtd_kit_lanche: 0,
      initialValues: true
    });
    this.refresh();
  }

  setInitialValues() {
    this.setState({ initialValues: false });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    const { meusDados, proximos_dois_dias_uteis, enumKits } = this.props;
    const { loading } = this.state;
    const dadosDaAPItotalmenteCarregados =
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      enumKits !== null &&
      loading;
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
    values.escola = this.props.meusDados.escolas[0].uuid;
    let solicitacao_kit_lanche = montaObjetoRequisicao(values);
    if (values.confirmar) {
      solicitacao_kit_lanche.confirmar = values.confirmar;
    }
    validateTourRequestForm(values);
    this.salvarOuEnviar(solicitacao_kit_lanche, values);
    this.handleConfirmation();
  }

  iniciarPedido(uuid) {
    inicioPedido(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação de Kit Lanche enviada com sucesso!");
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao enviar a Solicitação de Kit Lanche");
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Solicitação de Kit Lanche");
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
      solicitarKitLanche(solicitacao_kit_lanche)
        .then(resp => {
          if (resp.status === HTTP_STATUS.CREATED) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(resp.data.uuid);
            } else {
              toastSuccess("Solicitação de Kit Lanche salva com sucesso!");
              this.resetForm();
            }
          } else if (resp.data.tipo_error) {
            this.validaTipoMensagemError(resp.data);
          } else {
            toastError("Erro ao salvar Solicitação de Kit Lanche");
          }
        })
        .catch(error => {
          toastError(error.details);
        });
    } else {
      registroAtualizaKitLanche(solicitacao_kit_lanche, values.uuid)
        .then(resp => {
          if (resp.status === HTTP_STATUS.OK) {
            if (values.status === STATUS_DRE_A_VALIDAR) {
              this.iniciarPedido(values.uuid);
            } else {
              toastSuccess("Solicitação de Kit Lanche atualizada com sucesso!");
              this.resetForm();
            }
          } else if (resp.data.tipo_error) {
            this.validaTipoMensagemError(resp.data);
          } else {
            toastError("erro ao atualizar a solicitação");
          }
        })
        .catch(erro => {
          toastError("erro ao atualizar a solicitação");
        });
    }
  }

  refresh() {
    getSolicitacoesKitLancheApi()
      .then(resp => {
        this.setState({ rascunhosSolicitacoesKitLanche: resp.results });
      })
      .catch(error => {
        console.log(error);
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

  setNumeroDeKitLanches = (event, newValue, previousValue, name) => {
    const parser = {
      "4h": HORAS_ENUM._4.qtd_kits,
      "5_7h": HORAS_ENUM._5a7.qtd_kits,
      "8h": HORAS_ENUM._8.qtd_kits
    };

    let newQuantity = parser[event];
    this.setState({
      ...this.state,
      qtd_kit_lanche: newQuantity,
      radioChanged: event !== previousValue
    });
  };

  onKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      meusDados,
      enumKits,
      proximos_dois_dias_uteis
    } = this.props;
    const {
      rascunhosSolicitacoesKitLanche,
      showModal,
      modalMessage,
      modalConfirmation,
      botaoConfirma,
      loading,
      qtd_kit_lanche,
      initialValues
    } = this.state;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onKeyPress={this.onKeyPress}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={meusDados.escolas[0].quantidade_alunos}
            />
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
                <Field
                  component={LabelAndDate}
                  cols="4 4 4 4"
                  hasIcon={true}
                  label="Data do evento"
                  name="evento_data"
                  onBlur={event => this.validaDiasUteis(event)}
                  minDate={proximos_dois_dias_uteis}
                />
                <div className="col-8">
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
                <Field
                  component={LabelAndInput}
                  cols="4 4 4 4 "
                  name="quantidade_alunos"
                  type="number"
                  label="Número de alunos participantes"
                  validate={[
                    required,
                    maxValue(meusDados.escolas[0].quantidade_alunos),
                    naoPodeSerZero
                  ]}
                />
              </div>
              <hr />

              <SelecionaTempoPasseio
                className="mt-3"
                onChange={(event, newValue, previousValue, name) =>
                  this.setNumeroDeKitLanches(
                    event,
                    newValue,
                    previousValue,
                    name
                  )
                }
                mostrarExplicacao
              />

              <hr className="mt-4 mb-4 w-100" />

              {enumKits && (
                <SelecionaKitLancheBox
                  className="mt-3"
                  choicesNumberLimit={qtd_kit_lanche}
                  initialValues={initialValues}
                  setInitialValues={this.setInitialValues}
                  kits={enumKits}
                />
              )}

              <div className="form-group mt-2 pt-3">
                <label className="font-weight-bold">
                  {"Número total kits:"}
                </label>
                <br />
                <Grid
                  cols="1 1 1 1"
                  className="border rounded p-2"
                  style={{
                    background: "#E8E8E8"
                  }}
                >
                  <span className="font-weight-bold d-flex justify-content-center">
                    {this.props.qtd_total || 0}
                  </span>
                </Grid>
              </div>
              <hr className="mt-3 mb-3 w-100" />
              <div className="form-group">
                <Field
                  component={LabelAndTextArea}
                  label="Observações"
                  name="observacao"
                  placeholder="Campo opcional"
                />
              </div>
              <div align="right" className="form-group mt-4 mr-2">
                <Button
                  label="Cancelar"
                  onClick={e => this.resetForm(e)}
                  disabled={pristine || submitting}
                  style={ButtonStyle.OutlinePrimary}
                />
                <Button
                  label={this.state.salvarAtualizarLbl}
                  disabled={pristine || submitting}
                  onClick={handleSubmit(values =>
                    this.onSubmit({
                      ...values,
                      status: "RASCUNHO"
                    })
                  )}
                  className="ml-3"
                  type={ButtonType.SUBMIT}
                  style={ButtonStyle.OutlinePrimary}
                />
                <Button
                  label="Enviar Solicitação"
                  disabled={pristine || submitting}
                  type={ButtonType.SUBMIT}
                  onClick={handleSubmit(values =>
                    this.onSubmit({
                      ...values,
                      status: STATUS_DRE_A_VALIDAR
                    })
                  )}
                  style={ButtonStyle.Primary}
                  className="ml-3"
                />
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
                    <BaseButton
                      label="CONFIRMAR MESMO ASSIM"
                      type={ButtonType.BUTTON}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR,
                          salvo_em: new Date(),
                          confirmar: true
                        })
                      )}
                      style={ButtonStyle.Primary}
                      className="ml-3"
                    />
                  )}
                  <BaseButton
                    label="CANCELAR"
                    type={ButtonType.BUTTON}
                    onClick={this.handleConfirmation}
                    style={ButtonStyle.Warning}
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

SolicitacaoDeKitLanche = connect(state => {
  const nro_alunos = selector(state, "quantidade_alunos");
  const kit_lanche = selector(state, "kit_lanche") || [];

  return { qtd_total: kit_lanche.length * nro_alunos };
})(SolicitacaoDeKitLanche);

export default SolicitacaoDeKitLanche;
