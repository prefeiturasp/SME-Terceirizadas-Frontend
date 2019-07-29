import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { required, textAreaRequired } from "../../helpers/fieldValidators";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import {
  LabelAndDate,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import { DayChangeItemList } from "./DayChangeItemList";
import {
  carregarInversoes,
  salvarInversao,
  deletaInversao,
  solicitarInversao
} from "../../services/dayChange.service";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import CardMatriculados from "../Shareable/CardMatriculados";
import "./style.scss";
import {convertStringToDate} from '../TourRequest/ConvertToFormat'
import { getDiasUteis } from '../../services/tourRequest.service'
import { Modal } from "react-bootstrap";

export class DayChangeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayChangeList: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      uuid: "",
      salvarAtualizarLbl: "Salvar",
      quatidadeAluno: 250,
      segundoDiaUtil : "",
      showModal : false,
      
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this)
    this.pegaSegundoDiaUtil = this.pegaSegundoDiaUtil.bind(this)
  }

  OnDeleteButtonClicked(uuid) {
    if (window.confirm("Deseja realmente remover esta solicitação?")) {
      deletaInversao(uuid)
        .then(response => {
          if (response.success) {
            toastSuccess(response.success);
            this.refresh();
          } else if (response.error) {
            toastError(response.error);
          }
        })
        .catch(resp => {
          console.error("ERROR REMOVER INVERSÃO: ", resp);
        });
    }
  }

  resetForm(event) {
    this.props.reset();
    // rich text field doesn't become clear by props.reset()...
    this.props.change("descricao", "");
    this.props.change("observacao", "");
    this.setState({
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar",
      id: ""
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset();
    this.props.change("descricao", param.descricao);
    this.props.change("observacao", param.observacao);
    this.props.change("data_de", param.data_de);
    this.props.change("data_para", param.data_para);
    this.setState({
      status: param.status,
      title: `Solicitação # ${param.uuid}`,
      salvarAtualizarLbl: "Atualizar",
      uuid: param.uuid
    });
  }

  componentDidMount() {
    this.refresh();
    getDiasUteis().then(resp => {
      this.setState({
        segundoDiaUtil: convertStringToDate(resp[0].date_two_working_days)
      });
    }).catch(error => {
      console.log('ERROR AO CARREGAR DIAS ULTEIS', error)
    });
  }

  refresh() {
    carregarInversoes()
      .then(res => {
        const dayChangeList = res;
        this.setState({ dayChangeList });
      })
      .catch(error => {
        console.log("ERROR AO TENTAR CARREGAR INVERSÕES SALVAS: ", error);
      });
  }

  pegaSegundoDiaUtil() {
    getDiasUteis()
      .then(resp => {
        return convertStringToDate(resp[0].date_two_working_days);
      })
      .catch(erro => {
        return null;
      });
  }

  validaDiasUteis = event => {
    if (event.target.value) {
      const diaSelecionado = convertStringToDate(event.target.value);
      getDiasUteis().then(resp => {
        const segundoDiaUtil = convertStringToDate(
          resp[0].date_two_working_days
        );
        const quintoDiaUtil = convertStringToDate(
          resp[0].date_five_working_days
        );
        if (
          diaSelecionado <= segundoDiaUtil ||
          diaSelecionado < quintoDiaUtil
        ) {
          this.setState({
            showModal: true
          });
        }
      });
    }
  };

  handleShowModal() {
    this.setState({ ...this.state, showModal: false });
  }

  onSubmit(values) {
    if (values.status === "SALVAR") {
      salvarInversao(values)
        .then(response => {
          if (response.success) {
            this.resetForm();
            this.refresh();
            toastSuccess(response.success);
          } else {
            toastError(response.error);
          }
        })
        .catch(error => {
          console.log("ERRO AO TENTAR SALVAR: ", error);
        });
    } else if (values.status === "COMPLETO") {
      solicitarInversao(values)
        .then(response => {
          if (response.success) {
            this.resetForm();
            this.refresh();
            toastSuccess(response.success);
          } else {
            toastError(response.error);
          }
        })
        .catch(error => {
          console.log("ERROR AO TENTAR SOLICITAR: ", error);
        });
    }
  }

  render() {
    const { quatidadeAluno, segundoDiaUtil, showModal } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <Modal show={showModal} onHide={this.handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Atenção, a solicitação está fora do prazo contratual (entre
            <b>2 e 5 dias úteis</b>). Sendo assim, a autorização dependerá da
            disponibilidade dos alimentos adequados para o cumprimento do
            cardápio.
          </Modal.Body>
          <Modal.Footer>
            <BaseButton
              label="OK"
              type={ButtonType.BUTTON}
              onClick={this.handleShowModal}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </Modal.Footer>
        </Modal>
        <form>
          <CardMatriculados numeroAlunos={quatidadeAluno} />
          <DayChangeItemList
            dayChangeList={this.state.dayChangeList}
            OnDeleteButtonClicked={this.OnDeleteButtonClicked}
            resetForm={event => this.resetForm(event)}
            OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
          />
          <div className="mt-3 page-title">{this.state.title}</div>
          <div className="card border rounded mt-2">
            <div className="card-body">
              <label className="font-weight-bold">Descrição da Alteração</label>
              <div className="row w-100 pb-3">
                <div className="col-md-12 col-lg-5">
                  <Field
                    component={LabelAndDate}
                    name="data_de"
                    label="Referência"
                    textoLabel="Cardápio dia"
                    validate={required}
                    onBlur={event => this.validaDiasUteis(event)}
                    minDate={segundoDiaUtil}
                  />
                </div>
                <div className="col-md-12 col-lg-2 for-span">
                  <span className="font-weight-bold pr-3">para</span>
                  <i class="fas fa-arrow-right" />
                </div>
                <div className="col-md-12 col-lg-5">
                  <Field
                    component={LabelAndDate}
                    name="data_para"
                    label="Aplicar em"
                    textoLabel="Cardápio dia"
                    validate={required}
                    activeCalendar
                    minDate={segundoDiaUtil}
                  />
                </div>
              </div>
              <div className="row form-group">
                <Field
                  component={LabelAndTextArea}
                  label="Motivo"
                  name="descricao"
                  validate={[textAreaRequired]}
                />
              </div>
              <div className="row form-group">
                <Field
                  component={LabelAndTextArea}
                  placeholder="Campo opcional"
                  label="Observação"
                  name="observacao"
                />
              </div>
              <div className="row form-group text-right mt-4">
                <div className="col-12">
                  <BaseButton
                    label="Cancelar"
                    onClick={event => this.resetForm(event)}
                    disabled={pristine || submitting}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={this.state.salvarAtualizarLbl}
                    disabled={pristine || submitting}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: "SALVAR",
                        salvo_em: new Date(),
                        uuid: this.state.uuid
                      })
                    )}
                    className="ml-3"
                    type={ButtonType.SUBMIT}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label="Enviar Solicitação"
                    disabled={pristine || submitting}
                    type={ButtonType.SUBMIT}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: "COMPLETO",
                        salvo_em: new Date(),
                        uuid: this.state.uuid
                      })
                    )}
                    style={ButtonStyle.Primary}
                    className="ml-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

DayChangeEditor = reduxForm({
  form: "dayChange"
})(DayChangeEditor);

export default DayChangeEditor;
