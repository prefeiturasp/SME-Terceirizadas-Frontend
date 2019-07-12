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
import CardHeader from "../Shareable/CardHeader";
import "./style.scss";

export class DayChangeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayChangeList: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      uuid: "",
      salvarAtualizarLbl: "Salvar",
      quatidadeAluno: 250
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.refresh = this.refresh.bind(this);
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
    const { quatidadeAluno } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form>
          <CardHeader numeroAlunos={quatidadeAluno} />
          <DayChangeItemList
            dayChangeList={this.state.dayChangeList}
            OnDeleteButtonClicked={this.OnDeleteButtonClicked}
            resetForm={event => this.resetForm(event)}
            OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
          />
          <div className="mt-5" />
          <br />
          <span className="page-title">{this.state.title}</span>
          <div className="mt-3" />
          <div className="card border rounded mt-2 p-4">
            <label className="bold ml-2">Descrição da Alteração</label>
            <div className="row ml-2 mt-4 pb-3">
              <span>Substituição</span>
              <div className="w-100 m-2" />
              <Field
                component={LabelAndDate}
                cols="5 5 5 5"
                placeholder="Cardápio dia"
                name="data_de"
                label=""
                validate={required}
              />
              <div className="col-sm-2 justify-content-center pt-4">
                <span className="font-weight-bold">Para</span>{" "}
                &nbsp;&nbsp;&nbsp; <i class="fas fa-arrow-right" />
              </div>
              <Field
                component={LabelAndDate}
                cols="5 5 5 5"
                placeholder="Cardápio dia"
                name="data_para"
                label=""
                validate={required}
              />
            </div>
            <div className="form-group">
              <Field
                component={LabelAndTextArea}
                label="Motivo"
                name="descricao"
                validate={[textAreaRequired]}
              />
            </div>
            <div className="form-group">
              <Field
                component={LabelAndTextArea}
                placeholder="Campo opcional"
                label="Observação"
                name="observacao"
              />
            </div>
            <div className="form-group text-right mt-4">
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
        </form>
      </div>
    );
  }
}

DayChangeEditor = reduxForm({
  form: "dayChange"
})(DayChangeEditor);

export default DayChangeEditor;
