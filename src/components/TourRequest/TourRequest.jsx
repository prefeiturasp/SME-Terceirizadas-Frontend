import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { maxValue, required, diasAntecedencia } from "../../helpers/fieldValidators";
import { validateTourRequestForm } from "../../helpers/formValidators/tourRequestValidators";
import Button, { ButtonStyle, ButtonType } from "../Shareable/button";
import { LabelAndDate, LabelAndInput, LabelAndTextArea } from "../Shareable/labelAndInput";
import { Grid } from "../Shareable/responsiveBs4";
import SelecionaTempoPasseio from "./TourRequestCheck";
import SelecionaKitLancheBox from './SelecionaKitLancheBox'
import { TourRequestItemList } from "./TourRequesttemList";
import { removeKitLanche, getQuatidadeAlunoApi, solicitarKitLanche,RegistroSalvarKitLanche, getDiasUteis, getSolicitacoesKitLancheApi, getRefeicoesApi } from '../../services/tourRequest.service'
import { convertToFormat, adapterEnumKits, convertStringToDate } from './ConvertToFormat'
import { toastSuccess, toastError, toastWarn } from "../Shareable/dialogs";
import { Modal } from "react-bootstrap";
import BaseButton from "../Shareable/button";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};
export let segundoDia = ''

export class TourRequest extends Component {
  constructor(props) {
    super(props);
    this.setNumeroDeKitLanches = this.setNumeroDeKitLanches.bind(this);

    this.state = {
      qtd_kit_lanche: 0,
      radioChanged: false,
      tourRequestList: [],
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar",
      id: "",
      nro_matriculados: 0,
      enumKits: null,
      showModal: false,
    };


    this.onSubmit = this.onSubmit.bind(this);
    this.refresh = this.refresh.bind(this)
    this.validaDiasUteis = this.validaDiasUteis.bind(this)
    this.handleShowModal = this.handleShowModal.bind(this)
  }

  OnDeleteButtonClicked(id) {
    if (window.confirm('Deseja remover esta solicitação salva?')) {
      removeKitLanche(id).then(resp => {
        this.refresh()
        if(resp.success){
          toastSuccess(resp.success)
        }else{
          toastError(resp.error)
        }
      })
    }
  }

  OnEditButtonClicked(param) {
    this.props.reset();
    this.props.change("obs", param.obs);
    this.props.change("evento_data", param.evento_data);
    this.props.change("local_passeio", param.local_passeio);
    this.props.change("nro_alunos", param.nro_alunos);
    this.props.change("tempo_passeio", param.tempo_passeio);
    this.props.change("kit_lanche", param.kit_lanche);
    this.setState({
      status: param.status,
      title: `Solicitação # ${param.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.id
    });
  }

  resetForm(event) {
    this.props.reset();
    // rich text field doesn't become clear by props.reset()...
    this.props.change("obs", "");
    this.setState({
      status: "SEM STATUS",
      title: "Nova solicitação",
      salvarAtualizarLbl: "Salvar",
      id: "",
      qtd_kit_lanche: 0
    });
  }


  componentDidMount() {
    this.refresh();
    this.getQuatidadeAlunos()
  }

  validaDiasUteis = (event)=>{
    const diaSelecionado = convertStringToDate(event.target.value)
    getDiasUteis().then(resp =>{
      const segundoDiaUtil = convertStringToDate(resp[0].date_two_working_days)
      const quintoDiaUtil = convertStringToDate(resp[0].date_five_working_days)
      if(diaSelecionado <= segundoDiaUtil || diaSelecionado < quintoDiaUtil){
        this.setState({
          showModal : true
        })
      }
    })
  }

  getQuatidadeAlunos() {
    getQuatidadeAlunoApi().then(resp => {
      this.setState({
        ...this.state,
        nro_alunos: this.state.nro_matriculados = resp.students
      })
    })
  }

  onSubmit(values) {

    validateTourRequestForm(values);
    this.salvarOuEnviar(values)
  }

  salvarOuEnviar(values){
    if(values.status === "SALVO"){
      RegistroSalvarKitLanche(values).then(resp => {
        if(resp.success){
          toastSuccess(resp.success)
          this.resetForm()
          this.refresh()
          }else{
            toastError(resp.error)
          }
        }).catch(erro => {
          toastError(erro.details)
        })
      }else{
        solicitarKitLanche(values).then(resp =>{
          if(resp.success){
            toastSuccess(resp.success)
            this.resetForm()
            this.refresh()
          }else{
            toastError(resp.error)
          }
        }).catch(error =>{
          toastError(error.details)
        })
      }
  }

  refresh() {
    getSolicitacoesKitLancheApi().then(resp => {
      this.setState({ tourRequestList: convertToFormat(resp) });
    }).catch(error => {
      console.log(error)
    })

    getRefeicoesApi().then(response => {
      this.setState({
        enumKits: adapterEnumKits(response)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  handleShowModal(){
    this.setState({...this.state,  showModal : false})
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
    const { handleSubmit, pristine, submitting } = this.props;
    const { enumKits, tourRequestList, showModal } = this.state;
    return (

      <div className="d-flex flex-column p-4 mt-5">
        <Modal show={showModal} onHide={this.handleShowModal}>
            <Modal.Header closeButton>
              <Modal.Title>Atenção</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Atenção, a solicitação está fora do prazo contratual (entre{" "}
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
          <div>
            <label className="header-form-label mb-5">Nº de matriculados</label>
          </div>
          <Grid
            cols="1 1 1 1"
            className="border rounded p-2"
            style={{
              background: "#E8E8E8"
            }}
          >
            <span className="bold d-flex justify-content-center">
              {this.state.nro_matriculados}
            </span>
          </Grid>
          <TourRequestItemList
            tourRequestList={tourRequestList}
            OnDeleteButtonClicked={id => this.OnDeleteButtonClicked(id)}
            resetForm={event => this.resetForm(event)}
            refreshComponent={this.refresh.bind(this)}
            OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
          />
          <div className="form-row mt-3 ml-1">
            <h3 className="bold" style={{ color: "#353535" }}>
              {this.state.title}
            </h3>
          </div>
          <div className="border rounded p-3">
            <div className="form-group row">
              <Field
                component={LabelAndDate}
                cols="4 4 4 4"
                hasIcon={true}
                label="Data do evento"
                name="evento_data"
                onBlur={event => this.validaDiasUteis(event)}
              />
              <Field
                component={LabelAndInput}
                cols="8 8 8 8"
                label="Local do passeio"
                name="local_passeio"
              />
            </div>
            <div className="form-group row">
              <Field
                component={LabelAndInput}
                cols="3 3 3 3"
                name="nro_alunos"
                type="number"
                label="Número de alunos participantes"
                validate={[required, maxValue(this.state.nro_matriculados)]}
              />
            </div>
            <SelecionaTempoPasseio
              className="mt-3"
              onChange={(event, newValue, previousValue, name) =>
                this.setNumeroDeKitLanches(event, newValue, previousValue, name)
              }
            />
            {enumKits && <SelecionaKitLancheBox
              className="mt-3"
              choicesNumberLimit={this.state.qtd_kit_lanche}
              kits={enumKits}
            />}
            <div className="form-group">
              <label className="bold">{"Número total kits:"}</label>
              <br />
              <Grid
                cols="1 1 1 1"
                className="border rounded p-2"
                style={{
                  background: "#E8E8E8"
                }}
              >
                <span className="bold d-flex justify-content-center">
                  {this.props.qtd_total || 0}
                </span>
              </Grid>
            </div>
            <div className="form-group">
              <Field
                component={LabelAndTextArea}
                label="Observações"
                name="obs"
                placeholder="Campo opcional"
              />
            </div>
          </div>
          <div className="form-group row float-right mt-3">
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
                  status: "SALVO",
                  salvo_em: new Date(),
                  id: this.state.id
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
                  Acao: "Enviar solicitação"
                })
              )}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </div>
        </form>
      </div>
    );
  }
}

TourRequest = reduxForm({
  form: "tourRequest",
  destroyOnUnmount: false // para nao perder o estado,
})(TourRequest);

const selector = formValueSelector("tourRequest");

TourRequest = connect(state => {
  const nro_alunos = selector(state, "nro_alunos");
  const kit_lanche = selector(state, "kit_lanche") || [];
  return { qtd_total: kit_lanche.length * nro_alunos };
})(TourRequest);

export default TourRequest;
