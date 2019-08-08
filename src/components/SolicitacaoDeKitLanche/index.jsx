import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { maxValue, required } from "../../helpers/fieldValidators";
import { validateTourRequestForm } from "../../helpers/formValidators/tourRequestValidators";
import { extrairKitsLanche } from "../../components/SolicitacaoUnificada/helper";
import Button, { ButtonStyle, ButtonType } from "../Shareable/button";
import {
  LabelAndDate,
  LabelAndInput,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import { Grid } from "../Shareable/responsiveBs4";
import SelecionaTempoPasseio from "../Shareable/KitLanche/SelecionaTempoPasseio/SelecionaTempoPasseio";
import SelecionaKitLancheBox from "../Shareable/KitLanche/SelecionaKitLancheBox/SelecionaKitLancheBox";
import { dataPrioritaria } from "../../helpers/utilities";
import { Rascunhos } from "./Rascunhos";
import {
  removeKitLanche,
  solicitarKitLanche,
  getSolicitacoesKitLancheApi,
  registroAtualizaKitLanche,
  inicioPedido
} from "../../services/solicitacaoDeKitLanche.service";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import { Modal } from "react-bootstrap";
import BaseButton from "../Shareable/button";
import CardMatriculados from "../Shareable/CardMatriculados";
import { montaObjetoRequisicao } from "./helper";

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

  OnDeleteButtonClicked(id) {
    if (window.confirm("Deseja remover esta solicitação salva?")) {
      removeKitLanche(id).then(resp => {
        this.refresh();
        toastSuccess("solicitação removida com sucesso!");
      });
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
      dataPrioritaria(
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

  salvarOuEnviar(solicitacao_kit_lanche, values) {
    if (!values.uuid) {
      solicitarKitLanche(solicitacao_kit_lanche)
        .then(resp => {
          if (resp.status === HTTP_STATUS.CREATED) {
            toastSuccess("Solicitação de Kit Lanche salva com sucesso!");
            if (values.status === "DRE_A_VALIDAR") {
              this.iniciarPedido(values.uuid);
            } else this.resetForm();
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
            toastSuccess("Solicitação de Kit Lanche atualizada com sucesso!");
            if (values.status === "DRE_A_VALIDAR") {
              this.iniciarPedido(values.uuid);
            } else this.resetForm();
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
          <form>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={meusDados.escolas[0].quantidade_alunos}
            />
            <Rascunhos
              rascunhosSolicitacoesKitLanche={rascunhosSolicitacoesKitLanche}
              OnDeleteButtonClicked={id => this.OnDeleteButtonClicked(id)}
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
                <Field
                  component={LabelAndInput}
                  cols="8 8 8 8"
                  label="Local do passeio"
                  name="local"
                />
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
                    maxValue(meusDados.escolas[0].quantidade_alunos)
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

              <div className="form-group pt-3">
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
                  onClick={handleSubmit(values => this.onSubmit(values))}
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
                      status: "DRE_A_VALIDAR"
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
                          status: "Enviar solicitação",
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
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Atenção, a solicitação está fora do prazo contratual (entre
            <b> 2 e 5 dias úteis</b>). Sendo assim, a autorização dependerá da
            disponibilidade dos alimentos adequados para o cumprimento do
            cardápio.
          </Modal.Body>
          <Modal.Footer>
            <BaseButton
              label="OK"
              type={ButtonType.BUTTON}
              onClick={this.closeModal}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </Modal.Footer>
        </Modal>
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
