import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { required, textAreaRequired } from "../../helpers/fieldValidators";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import "../Shareable/custom.css";
import { LabelAndDate, LabelAndTextArea } from "../Shareable/labelAndInput";
import { DayChangeItemList } from "./DayChangeItemList";
import { carregarInversoes, salvarInversao, deletaInversao, solicitarInversao } from '../../services/dayChange.service'
import { toastSuccess, toastError, toastWarn } from "../Shareable/dialogs";
import CardHeader from "../Shareable/CardHeader";
import './style.css'

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
    if (window.confirm('Deseja realmente remover esta solicitação?')) {
      deletaInversao(uuid).then(response => {
        toastSuccess(response.details)
        this.refresh()
      }).catch(resp => {
        toastError(resp.details)
      })
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
      id: ''
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
    carregarInversoes().then(res => {
      const dayChangeList = res
      this.setState({ dayChangeList });
    });
  }

  onSubmit(values) {
    if (values.status === 'SALVAR') {
      salvarInversao(values).then(response => {
        if (response.success) {
          this.resetForm()
          this.refresh()
          toastSuccess(response.success)
        } else {
          toastError(response.error)
        }
      })
    } else if (values.status === 'COMPLETO') {
      solicitarInversao(values).then(response => {
        if (response.success) {
          this.resetForm()
          this.refresh()
          toastSuccess(response.success)
        } else {
          toastError(response.error)
        }
      })
    }
  }

  render() {
    const { quatidadeAluno } = this.state
    const { handleSubmit, pristine, reset, submitting } = this.props;
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
          <div className="mt-5"></div>
          <br></br>
          <span className="page-title">{this.state.title}</span>
          <div className="mt-3"></div>
          <div className="card border rounded mt-2 p-4">
            <label className="bold ml-2">Descrição da Alteração</label>

            <div className="row ml-2 mt-4 pb-3">
              <span>Substituição</span>
              <div className="w-100 m-2"></div>
                <Field
                  component={LabelAndDate}
                  cols="5 5 5 5"
                  placeholder="Cardápio dia"
                  name="data_de"
                  label=""
                  validate={required}
                />
              <div className="col-sm-2 justify-content-center pt-4">
                <span className="font-weight-bold">Para</span> &nbsp;&nbsp;&nbsp; <i class="fas fa-arrow-right"></i>
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
            <div className="form-group row float-right mt-4 ml-2">
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
        </form>
      </div>
    );
  }
}

DayChangeEditor = reduxForm({
  form: "dayChange"
})(DayChangeEditor);

export default DayChangeEditor;
