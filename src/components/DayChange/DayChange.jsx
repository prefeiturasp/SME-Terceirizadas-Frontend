import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { required, textAreaRequired } from "../../helpers/fieldValidators";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import "../Shareable/custom.css";
import { LabelAndDate, LabelAndTextArea } from "../Shareable/labelAndInput";
import { DayChangeItemList } from "./DayChangeItemList";
import {carregarInversoes, salvarInversao, deletaInversao, solicitarInversao} from '../../services/dayChange.service'
import { toastSuccess, toastError, toastWarn } from "../Shareable/dialogs";

export class DayChangeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayChangeList: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      uuid: "",
      salvarAtualizarLbl: "Salvar"
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  OnDeleteButtonClicked(uuid) {
    if(window.confirm('Deseja realmente remover esta solicitação?')){
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
    if (values.status === 'SALVAR'){
      salvarInversao(values).then(response => {
        if(response.success){
          this.resetForm()
          this.refresh()
          toastSuccess(response.success)
        }else{
          toastError(response.error)
        }
      })
    }else if(values.status === 'COMPLETO'){
      solicitarInversao(values).then(response => {
        if(response.success){
          this.resetForm()
          this.refresh()
          toastSuccess(response.success)
        }else{
          toastError(response.error)
        }
      })
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="container">
        <div>
          <label className="subtitle">Solicitações</label>
        </div>
        <div>
          <label className="category">Alteração de Dias do Cardápio</label>
        </div>
        <form>
          <div className="form-group row">
            <div className="col-12">
              <label htmlFor="rf-responsible">Nº de Matriculados</label>
              <p className="number-registered">
                <span className="gray-rectangle">150</span>
                Informação automática disponibilizada no
                <br />
                <span className="text-primary">
                  Cadastro da Unidade Escolar
                </span>
              </p>
            </div>
          </div>
          <DayChangeItemList
            dayChangeList={this.state.dayChangeList}
            OnDeleteButtonClicked={this.OnDeleteButtonClicked}
            resetForm={event => this.resetForm(event)}
            OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
          />
          <div className="form-row mt-3 ml-1">
            <h3 className="bold" style={{ color: "#353535" }}>
              {this.state.title}
            </h3>
          </div>
          <div className="border rounded mt-2 p-3">
            <div>
              <label className="bold">Substituição de dia de cardápio</label>
            </div>
            <div className="form-row">
              <Field
                component={LabelAndDate}
                cols="4 4 4 4"
                placeholder="Dia a ser substituído"
                name="data_de"
                label="De:"
                validate={required}
              />
              <Field
                component={LabelAndDate}
                cols="4 4 4 4"
                placeholder="Novo dia do cardápio"
                name="data_para"
                label="Para:"
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
            <div className="form-group row float-right mt-4">
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
                    uuid : this.state.uuid
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
