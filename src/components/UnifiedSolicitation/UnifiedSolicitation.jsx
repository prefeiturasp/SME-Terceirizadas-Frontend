import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, formValueSelector, FormSection, reduxForm } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndCombo,
  LabelAndInput
} from "../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { Grid } from "../Shareable/responsiveBs4";
import { Modal } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";
import { required, maxValue } from "../../helpers/fieldValidators";
import SelecionaTempoPasseio from "../TourRequest/TourRequestCheck";
import SelecionaKitLancheBox from "../TourRequest/SelecionaKitLancheBox";
import { adapterEnumKits } from "../TourRequest/ConvertToFormat";
import { getRefeicoesApi } from "../../services/tourRequest.service";
import "../Shareable/style.scss";
import "./style.scss";
import {
  createOrUpdateUnifiedSolicitationForm,
  getUnifiedSolicitationsForm,
  removeUnifiedSolicitationForm
} from "../../services/unifiedSolicitation.service";
import { UnifiedSolicitationItemList } from "./UnifiedSolicitationItemList";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../helpers/utilities";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import { loadUnifiedSolicitation } from "../../reducers/unifiedSolicitation.reducer";
import { validateSubmit } from "./UnifiedSolicitationValidation";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};

class UnifiedSolicitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "SALVO",
      title: "Nova Solicitação Unificada",
      salvarAtualizarLbl: "Salvar Rascunho",
      id: "",
      showModal: false,
      schoolExists: false,
      schoolsExistArray: [],
      schoolsFiltered: [],
      schoolsTotal: 0,
      qtd_kit_lanche: 0,
      radioChanged: false,
      enumKits: null,
      kitsTotal: 0,
      choicesTotal: 0,
      studentsTotal: 0,
      unifiedSolicitationList: [],
      selectDefault: [
        {
          key: 0,
          label: "Selecione",
          value: ""
        }
      ]
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.filterList = this.filterList.bind(this);
    this.setNumeroDeKitLanches = this.setNumeroDeKitLanches.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
    this.pedidoMultiploRef = React.createRef();
    this.escolasRef = React.createRef();
  }

  OnEditButtonClicked(param) {
    this.resetForm();
    this.props.loadUnifiedSolicitation(param.dayChange);
    let schoolsFiltered = this.state.schoolsFiltered;
    const parser = {
      "4h": HORAS_ENUM._4.qtd_kits,
      "5_7h": HORAS_ENUM._5a7.qtd_kits,
      "8h": HORAS_ENUM._8.qtd_kits
    };
    let kitsTotal = 0;
    let studentsTotal = 0;
    let schoolsTotal = 0;
    param.dayChange.escolas.forEach(function(escola) {
      var foundIndex = schoolsFiltered.findIndex(x => x.id == escola.id);
      schoolsFiltered[foundIndex].checked = escola.check;
      schoolsFiltered[foundIndex].tempo_passeio = escola.tempo_passeio;
      schoolsFiltered[foundIndex].numero_alunos = escola.numero_alunos;
      schoolsFiltered[foundIndex].nro_alunos = escola.nro_alunos;
      schoolsFiltered[foundIndex].kit_lanche = escola.kit_lanche;
      schoolsFiltered[foundIndex].number_of_choices =
        parser[escola.tempo_passeio];
      schoolsFiltered[foundIndex].limit_of_meal_kits =
        parser[escola.tempo_passeio];
      if (escola.check) {
        if (escola.kit_lanche) {
          schoolsFiltered[foundIndex].number_of_meal_kits =
            escola.kit_lanche.length * escola.nro_alunos;
          kitsTotal += escola.kit_lanche.length * escola.nro_alunos;
        }
        schoolsTotal += 1;
        if (escola.numero_alunos) studentsTotal += escola.numero_alunos;
      }
    });
    this.props.change("pedido_multiplo", param.dayChange.pedido_multiplo);
    this.setState({
      schoolsFiltered: schoolsFiltered,
      choicesTotal: param.dayChange.kit_lanche.length,
      qtd_kit_lanche: param.dayChange.tempo_passeio
        ? parser[param.dayChange.tempo_passeio]
        : 0,
      kitsTotal: kitsTotal,
      studentsTotal: studentsTotal,
      schoolsTotal: schoolsTotal,
      status: "SALVO",
      title: `Solicitação Unificada # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  OnDeleteButtonClicked(id, uuid) {
    removeUnifiedSolicitationForm(uuid).then(
      res => {
        if (res.status === 200) {
          toastSuccess(`Rascunho # ${id} excluído com sucesso`);
          this.refresh();
        } else {
          toastError(res.log_content[0]);
        }
      },
      function(error) {
        toastError("Houve um erro ao excluir o rascunho");
      }
    );
  }

  cancelForm(event) {
    this.resetForm();
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  resetForm(event) {
    this.props.reset("unifiedSolicitation");
    this.props.loadUnifiedSolicitation(null);
    let schools = this.props.schools;
    schools.forEach(function(school) {
      school["id"] = school["_id"].toString();
      school["burger_active"] = false;
      school["limit_of_meal_kits"] = 0;
      school["number_of_choices"] = 0;
      school["number_of_meal_kits"] = 0;
      school["nro_alunos"] = 0;
      school["numero_alunos"] = 0;
      school["tempo_passeio"] = null;
      school["kit_lanche"] = null;
      school["checked"] = false;
    });
    this.setState({
      status: "SEM STATUS",
      title: "Nova Solicitação Unificada",
      id: "",
      showModal: false,
      schoolExists: false,
      schoolsExistArray: [],
      salvarAtualizarLbl: "Salvar Rascunho",
      schoolsFiltered: schools,
      schoolsTotal: 0,
      qtd_kit_lanche: 0,
      radioChanged: false,
      kitsTotal: 0,
      choicesTotal: 0,
      studentsTotal: 0
    });
    this.refresh();
  }

  componentDidMount() {
    this.props.change("schools_total", 0);
    this.props.change("kits_total", 0);

    getRefeicoesApi()
      .then(response => {
        this.setState({
          enumKits: adapterEnumKits(response)
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.refresh();
  }

  setNumeroDeKitLanches = (event, newValue, previousValue, name, school) => {
    const parser = {
      "4h": HORAS_ENUM._4.qtd_kits,
      "5_7h": HORAS_ENUM._5a7.qtd_kits,
      "8h": HORAS_ENUM._8.qtd_kits
    };
    let newQuantity = parser[event];
    let qtd_kit_lanche = this.state.qtd_kit_lanche;
    let schoolsFiltered = this.state.schoolsFiltered;
    if (school) {
      var foundIndex = this.state.schoolsFiltered.findIndex(
        x => x.id === school.id
      );
      schoolsFiltered[foundIndex].limit_of_meal_kits = newQuantity;
      schoolsFiltered[foundIndex].tempo_passeio = newValue;
    } else {
      qtd_kit_lanche = newQuantity;
    }
    this.setState({
      ...this.state,
      qtd_kit_lanche,
      schoolsFiltered,
      radioChanged: event !== previousValue
    });
  };

  handleMultipleOrder() {
    this.props.change("pedido_multiplo", !this.props.multipleOrder);
    window.scrollTo(0, this.pedidoMultiploRef.current.offsetTop - 75);
  }

  handleSelecionaKitLancheBox(school, value) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    var schoolsFiltered = this.state.schoolsFiltered;
    schoolsFiltered[foundIndex].number_of_choices = value.length;
    schoolsFiltered[foundIndex].kit_lanche = value;
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      schoolsFiltered: schoolsFiltered
    });
    this.handleKitsTotal();
  }

  handleNumberOfStudents(school, event) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    schoolsFiltered[foundIndex].nro_alunos = event.target.value;
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      schoolsFiltered: schoolsFiltered
    });
    this.handleKitsTotal();
  }

  handleStudentsTotal() {
    const schoolsFiltered = this.state.schoolsFiltered;
    let studentsTotal = 0;
    schoolsFiltered.forEach(function(school) {
      if (school.checked) {
        studentsTotal += parseInt(school.numero_alunos);
      }
    });
    return studentsTotal;
  }

  handleNumberOfStudentsPerSchool(school, event) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    schoolsFiltered[foundIndex].numero_alunos = event.target.value || 0;
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      studentsTotal: this.handleStudentsTotal(),
      schoolsFiltered: schoolsFiltered
    });
  }

  setNumberOfMealKits(school) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    var schoolsFiltered = this.state.schoolsFiltered;
    if (schoolsFiltered[foundIndex].checked) {
      schoolsFiltered[foundIndex].number_of_meal_kits =
        schoolsFiltered[foundIndex].number_of_choices *
        schoolsFiltered[foundIndex].nro_alunos;
    } else {
      schoolsFiltered[foundIndex].number_of_meal_kits = 0;
    }
    return schoolsFiltered;
  }

  componentDidUpdate(prevProps) {
    if (this.props.schools.length !== prevProps.schools.length) {
      this.setState({
        ...this.state,
        schoolsFiltered: this.props.schools
      });
    }
  }

  handleCheck(school) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    school.checked = !school.checked;
    schoolsFiltered[foundIndex].checked = school.checked;
    this.props.change(`school_${school.id}.check`, school.checked);
    if (this.props.multipleOrder) {
      schoolsFiltered[foundIndex].numero_alunos = this.props.max_alunos;
      this.props.change(
        `school_${school.id}.numero_alunos`,
        this.props.max_alunos
      );
    }
    schoolsFiltered = this.setNumberOfMealKits(school);
    let studentsTotal = 0;
    let kitsTotal = 0;
    let schoolsTotal = 0;
    schoolsFiltered.forEach(function(school) {
      if (school.checked) {
        studentsTotal += school.numero_alunos
          ? parseInt(school.numero_alunos)
          : 0;
        kitsTotal += school.number_of_choices * school.nro_alunos;
        schoolsTotal += 1;
      }
    });
    this.setState({
      ...this.state,
      schoolsFiltered: schoolsFiltered,
      studentsTotal: studentsTotal,
      kitsTotal: kitsTotal,
      schoolsTotal: schoolsTotal
    });
  }

  handleKitsTotal() {
    const schoolsFiltered = this.state.schoolsFiltered;
    let kitsTotal = 0;
    let schoolsTotal = 0;
    schoolsFiltered.forEach(function(school) {
      if (school.checked) {
        kitsTotal += school.number_of_choices * school.nro_alunos;
        schoolsTotal += 1;
      }
    });
    this.setState({
      ...this.state,
      kitsTotal: kitsTotal,
      schoolsTotal: schoolsTotal
    });
  }

  handleDate(event) {
    const value = event.target.value;
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        value,
        this.props.two_working_days,
        this.props.five_working_days
      )
    )
      this.showModal();
    this.props.change("dia", value);
  }

  changeBurger(school, key) {
    school.burger_active = !school.burger_active;
    this.refs.escolas.scrollTop = 47 * key;
    this.forceUpdate();
    window.scrollTo(0, this.escolasRef.current.offsetTop - 75);
  }

  closeModal(e) {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  refresh() {
    getUnifiedSolicitationsForm().then(
      res => {
        this.setState({
          ...this.state,
          unifiedSolicitationList: res
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
  }

  handleSubmit(values) {
    values.escolas = this.state.schoolsFiltered;
    values.kits_total = this.state.kitsTotal;
    const error = validateSubmit(values, this.state);
    if (!error) {
      createOrUpdateUnifiedSolicitationForm(JSON.stringify(values)).then(
        res => {
          if (res.status === 200) {
            toastSuccess(res.data.success);
            this.resetForm();
          } else {
            this.setState({
              schoolExists: true,
              schoolsExistArray: res.data.escolas
            });
            toastError(res.data.error);
          }
        },
        function(error) {
          toastError("Houve um erro ao salvar a inclusão de alimentação");
        }
      );
    } else {
      toastError(error);
    }
  }

  filterList(event) {
    if (event === undefined) event = { target: { value: "" } };
    let schoolsFiltered = this.props.schools;
    schoolsFiltered = schoolsFiltered.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return (
        item.nome.toLowerCase().search(wordToFilter) !== -1 ||
        item.id.includes(wordToFilter)
      );
    });
    this.setState({ schoolsFiltered });
  }

  render() {
    const {
      handleSubmit,
      enrolled,
      two_working_days,
      reasons_continuous_program,
      reasons_simple,
      multipleOrder,
      razao,
      max_alunos,
      prosseguir
    } = this.props;
    const {
      title,
      schoolExists,
      schoolsExistArray,
      selectDefault,
      qtd_kit_lanche,
      showModal,
      schoolsFiltered,
      enumKits,
      kitsTotal,
      choicesTotal,
      studentsTotal,
      schoolsTotal,
      unifiedSolicitationList
    } = this.state;
    return (
      <div>
        <Modal show={showModal} onHide={this.closeModal}>
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
              onClick={this.closeModal}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </Modal.Footer>
        </Modal>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <div className="card mt-3">
            <div className="card-body">
              <span className="blockquote-sme">
                Nº de Matriculados DRE Ipiranga
              </span>
              <div />
              <span className="badge-sme badge-secondary-sme">{enrolled}</span>
              <span className="blockquote-sme pl-2 text-color-sme-silver">
                Informação automática disponibilizada no Cadastro da Unidade
                Escolar
              </span>
              <p className="pt-3 blockquote-sme">Lotes pertencentes à DRE</p>
              <div>
                <table className="table-lote">
                  <tr>
                    <th>Lote</th>
                    <th>Tipo de Gestão</th>
                  </tr>
                  <tr>
                    <td>7A IP I IPIRANGA</td>
                    <td>TERC TOTAL</td>
                  </tr>
                  <tr>
                    <td>7A IP II IPIRANGA</td>
                    <td>TERC TOTAL</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          {unifiedSolicitationList.length > 0 && (
            <div className="card mt-3">
              <div className="card-body">
                <span className="page-title">Rascunhos</span>
                <UnifiedSolicitationItemList
                  schoolsLoaded={schoolsFiltered.length > 0}
                  unifiedSolicitationList={unifiedSolicitationList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </div>
            </div>
          )}
          <div ref={this.titleRef} className="form-row mt-3 ml-1">
            <h3 className="bold" style={{ color: "#353535" }}>
              {title}
            </h3>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-3">
              <Field
                component={LabelAndDate}
                name="dia"
                onBlur={event => this.handleDate(event)}
                minDate={two_working_days}
                label="Dia"
                validate={required}
              />
            </div>
            <div className="form-group col-sm-8">
              <Field
                component={LabelAndCombo}
                name="razao"
                label="Motivo"
                onChange={value => this.props.change("razao", value)}
                options={selectDefault
                  .concat(reasons_simple)
                  .concat(reasons_continuous_program)}
                validate={required}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-8 offset-sm-3">
              {razao === "Outro" && (
                <Field
                  component={LabelAndInput}
                  label="Qual o motivo?"
                  onChange={value => this.props.change("qual_razao", value)}
                  name="qual_razao"
                  className="form-control"
                  validate={required}
                />
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-12 pb-5">
              <Field
                component={LabelAndInput}
                label="Local do evento"
                placeholder="Insira o local do evento"
                name="local_passeio"
                className="form-control"
                validate={required}
              />
            </div>
          </div>
          <div
            ref={this.pedidoMultiploRef}
            className="col-md-12 pt-2 pb-2"
            style={{ paddingLeft: "2rem" }}
          >
            <label htmlFor="check" className="checkbox-label">
              <Field
                component={"input"}
                type="checkbox"
                name="pedido_multiplo"
              />
              <span
                onClick={() => this.handleMultipleOrder()}
                className="checkbox-custom"
                style={{ borderRadius: "15px" }}
              />{" "}
              Realizar pedido múltiplo
            </label>
          </div>
          <Collapse isOpened={multipleOrder}>
            <div className="col-md-12">
              <div className="form-group row">
                <Field
                  component={LabelAndInput}
                  cols="6"
                  name="max_numero_alunos_por_escola"
                  onChange={event =>
                    this.props.change(
                      "max_numero_alunos_por_escola",
                      event.target.value
                    )
                  }
                  type="number"
                  label="Número MÁXIMO de alunos participantes por escola"
                  validate={
                    multipleOrder !== undefined && [
                      required,
                      maxValue(max_alunos)
                    ]
                  }
                />
              </div>
            </div>
            <SelecionaTempoPasseio
              className="mt-3"
              validate={multipleOrder !== undefined}
              onChange={(event, newValue, previousValue, name) =>
                this.setNumeroDeKitLanches(
                  event,
                  newValue,
                  previousValue,
                  name,
                  null
                )
              }
            />
            {enumKits && (
              <SelecionaKitLancheBox
                className="mt-3"
                validate={multipleOrder !== undefined}
                choicesNumberLimit={qtd_kit_lanche}
                onChange={value =>
                  this.setState({ choicesTotal: value.length })
                }
                showOptions={false}
                kits={enumKits}
              />
            )}
          </Collapse>
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar"
            onChange={this.filterList}
          />
          <span ref={this.escolasRef} />
          <div scrollTop={100} ref="escolas" className="schools-group">
            {schoolsFiltered.length === 0 && (
              <p>
                Carregando escolas...{" "}
                <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
              </p>
            )}
            {schoolsFiltered.length > 0 &&
              schoolsFiltered.map((school, key) => {
                return (
                    <FormSection name={`school_${school.id}`}>
                      <div>
                        <div
                          className="school-container col-md-12 mr-4"
                          style={
                            school.burger_active
                              ? { background: "#F2FBFE" }
                              : {}
                          }
                        >
                          <div
                            className="col-md-12 pt-2 pb-2"
                            style={{ paddingLeft: "2rem" }}
                          >
                            <label htmlFor="check" className="checkbox-label">
                              <Field
                                component={"input"}
                                type="checkbox"
                                name="check"
                              />
                              <span
                                onClick={() => this.handleCheck(school)}
                                className="checkbox-custom"
                              />{" "}
                              {school._id + " - " + school.nome}
                            </label>
                            {!multipleOrder && (
                              <Stand
                                onClick={() => this.changeBurger(school, key)}
                                color={"#C8C8C8"}
                                width={30}
                                padding={0}
                                lineSpacing={5}
                                className="float-right"
                                active={school.burger_active}
                              />
                            )}
                            {multipleOrder && school.checked && (
                              <div className="label-n-alunos float-right">
                                <span>Nº de Alunos</span>
                                <Field
                                  component={"input"}
                                  type={"number"}
                                  onChange={event =>
                                    this.handleNumberOfStudentsPerSchool(
                                      school,
                                      event
                                    )
                                  }
                                  min={0}
                                  max={studentsTotal}
                                  style={{ width: "70px", textAlign: "center" }}
                                  name="numero_alunos"
                                />
                              </div>
                            )}
                          </div>
                          <Collapse isOpened={school.burger_active}>
                            <div className="col-md-12">
                              <div className="form-group row">
                                <Field
                                  component={LabelAndInput}
                                  cols="3 3 3 3"
                                  name="nro_alunos"
                                  type="number"
                                  onChange={event =>
                                    this.handleNumberOfStudents(school, event)
                                  }
                                  label="Número de alunos participantes"
                                  validate={
                                    school.checked &&
                                    !multipleOrder && [required]
                                  }
                                />
                              </div>
                            </div>
                            <SelecionaTempoPasseio
                              className="mt-3"
                              validate={school.checked && !multipleOrder}
                              onChange={(
                                event,
                                newValue,
                                previousValue,
                                name
                              ) =>
                                this.setNumeroDeKitLanches(
                                  event,
                                  newValue,
                                  previousValue,
                                  name,
                                  school
                                )
                              }
                            />
                            {enumKits && (
                              <SelecionaKitLancheBox
                                kits={enumKits}
                                showOptions={false}
                                validate={school.checked && !multipleOrder}
                                className="mt-3"
                                onChange={value =>
                                  this.handleSelecionaKitLancheBox(
                                    school,
                                    value
                                  )
                                }
                                choicesNumberLimit={school.limit_of_meal_kits}
                              />
                            )}
                            <div className="form-group">
                              <label className="bold">
                                {"Número total de kits dessa escola:"}
                              </label>
                              <br />
                              <Grid
                                cols="1 1 1 1"
                                className="border rounded p-2"
                                style={{
                                  background: "#E8E8E8"
                                }}
                              >
                                <span className="bold d-flex justify-content-center">
                                  {school.number_of_meal_kits || 0}
                                </span>
                              </Grid>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                    </FormSection>
                );
              })}
          </div>
          <div
            className="form-group"
            style={{ paddingTop: "30px", paddingBottom: "50px" }}
          >
            <div style={{ display: "grid" }} className="float-left">
              <label className="bold">Total de Unidades Escolares</label>
              <label>{schoolsTotal || 0}</label>
            </div>
            <div style={{ display: "grid" }} className="float-right">
              <label className="bold">Total de Kits</label>
              <label>
                {multipleOrder ? choicesTotal * studentsTotal : kitsTotal}
              </label>
            </div>
          </div>
          <hr className="w-100" />
          <div className="form-group">
            <Field
              component={LabelAndTextArea}
              placeholder="Campo opcional"
              label="Observações"
              name="obs"
            />
          </div>
          {schoolExists && (
            <div
              className="col-md-12 pt-2 pb-2"
              style={{ paddingLeft: "2rem" }}
            >
              <label htmlFor="check" className="checkbox-label">
                <Field component={"input"} type="checkbox" name="prosseguir" />
                <span
                  onClick={() => this.props.change("prosseguir", !prosseguir)}
                  className="checkbox-custom"
                  style={{ borderRadius: "15px" }}
                />{" "}
                Reconheço que já existe um evento para as escolas abaixo e
                desejo continuar mesmo assim
              </label>
              <ul>
                {schoolsExistArray.map((school, key) => {
                  return <li>{school}</li>;
                })}
              </ul>
            </div>
          )}
          <div className="form-group row float-right mt-4">
            <BaseButton
              label="Cancelar"
              onClick={event => this.cancelForm(event)}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label={"Salvar Rascunho"}
              onClick={handleSubmit(values => this.handleSubmit(values))}
              className="ml-3"
              type={ButtonType.BUTTON}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label="Enviar Solicitação"
              type={ButtonType.SUBMIT}
              onClick={handleSubmit(values =>
                this.handleSubmit({ ...values, status: "A APROVAR" })
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

const UnifiedSolicitationForm = reduxForm({
  form: "unifiedSolicitation",
  enableReinitialize: true
})(UnifiedSolicitation);

const selector = formValueSelector("unifiedSolicitation");
const mapStateToProps = state => {
  return {
    initialValues: state.unifiedSolicitation.data,
    multipleOrder: selector(state, "pedido_multiplo"),
    kitsTotal: selector(state, "kits_total"),
    razao: selector(state, "razao"),
    max_alunos: selector(state, "max_numero_alunos_por_escola"),
    prosseguir: selector(state, "prosseguir")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadUnifiedSolicitation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnifiedSolicitationForm);
