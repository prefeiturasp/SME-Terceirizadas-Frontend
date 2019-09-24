import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, formValueSelector, FormSection, reduxForm } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndInput
} from "../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { Grid } from "../Shareable/responsiveBs4";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";
import {
  required,
  maxValue,
  naoPodeSerZero
} from "../../helpers/fieldValidators";
import SelecionaTempoPasseio from "../Shareable/KitLanche/SelecionaTempoPasseio/SelecionaTempoPasseio";
import SelecionaKitLancheBox from "../Shareable/KitLanche/SelecionaKitLancheBox/SelecionaKitLancheBox";
import CardMatriculados from "../Shareable/CardMatriculados";
import TabelaHistoricoLotes from "../Shareable/TabelaHistoricoLotes";
import { extrairKitsLanchesParaCards } from "../Shareable/KitLanche/helper";
import { getKitLanches } from "../../services/solicitacaoDeKitLanche.service";
import "../Shareable/style.scss";
import "./style.scss";
import {
  criarSolicitacaoUnificada,
  inicioPedido,
  atualizarSolicitacaoUnificada,
  solicitacoesUnificadasSalvas,
  removerSolicitacaoUnificada
} from "../../services/solicitacaoUnificada.service";
import { Rascunhos } from "./Rascunhos";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../helpers/utilities";
import { toastSuccess, toastError } from "../Shareable/Toast/dialogs";
import { loadUnifiedSolicitation } from "../../reducers/unifiedSolicitation.reducer";
import { validateSubmit } from "./validacao";
import { formatarSubmissao, extrairKitsLanche } from "./helper";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 'kit'" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};
const ENTER = 13;

class SolicitacaoUnificada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: "RASCUNHO",
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
      collapsed: true,
      initialValues: false,
      outroMotivo: false,
      lotes: [
        {
          nome: "7A IP I IPIRANGA",
          tipo_de_gestao: "TERC TOTAL"
        },
        {
          nome: "7A IP II IPIRANGA",
          tipo_de_gestao: "TERC TOTAL"
        }
      ],
      choicesTotal: 0,
      studentsTotal: 0,
      unifiedSolicitationList: []
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
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);
  }

  OnEditButtonClicked(param) {
    this.resetForm();
    this.props.loadUnifiedSolicitation(param.solicitacaoUnificada);
    const listaKitLancheIgual =
      param.solicitacaoUnificada.lista_kit_lanche_igual;
    let schoolsFiltered = this.state.schoolsFiltered;
    const parser = {
      "4h": HORAS_ENUM._4.qtd_kits,
      "5_7h": HORAS_ENUM._5a7.qtd_kits,
      "8h": HORAS_ENUM._8.qtd_kits
    };
    let kitsTotal = 0;
    let studentsTotal = 0;
    let schoolsTotal = 0;
    param.solicitacaoUnificada.escolas_quantidades.forEach(function(
      escola_quantidade
    ) {
      var foundIndex = schoolsFiltered.findIndex(
        escola => escola.codigo_eol === escola_quantidade.escola.codigo_eol
      );
      schoolsFiltered[foundIndex].checked = true;
      schoolsFiltered[foundIndex].tempo_passeio = listaKitLancheIgual
        ? param.solicitacaoUnificada.solicitacao_kit_lanche.tempo_passeio
        : escola_quantidade.tempo_passeio;
      schoolsFiltered[foundIndex].quantidade_alunos =
        escola_quantidade.quantidade_alunos;
      schoolsFiltered[foundIndex].nro_alunos =
        escola_quantidade.quantidade_alunos;
      schoolsFiltered[foundIndex].kit_lanche = extrairKitsLanche(
        escola_quantidade.kits
      );
      schoolsFiltered[foundIndex].number_of_choices =
        escola_quantidade.tempo_passeio;
      schoolsFiltered[foundIndex].limit_of_meal_kits =
        escola_quantidade.tempo_passeio;
      if (schoolsFiltered[foundIndex].kit_lanche.length) {
        schoolsFiltered[foundIndex].number_of_meal_kits =
          schoolsFiltered[foundIndex].kit_lanche.length *
          escola_quantidade.quantidade_alunos;
        kitsTotal +=
          escola_quantidade.kits.length * escola_quantidade.quantidade_alunos;
      }
      schoolsTotal += 1;
      if (escola_quantidade.quantidade_alunos)
        studentsTotal += escola_quantidade.quantidade_alunos;
    });
    //this.props.change(`school_${escola_quantidade.escola.codigo_eol}.check`, true);
    this.props.change(
      "lista_kit_lanche_igual",
      param.solicitacaoUnificada.lista_kit_lanche_igual
    );
    this.setState({
      schoolsFiltered: schoolsFiltered,
      choicesTotal:
        param.solicitacaoUnificada.solicitacao_kit_lanche.kits.length,
      qtd_kit_lanche: param.solicitacaoUnificada.tempo_passeio
        ? parser[param.solicitacaoUnificada.tempo_passeio]
        : 0,
      kitsTotal: kitsTotal,
      studentsTotal: studentsTotal,
      schoolsTotal: schoolsTotal,
      status: "RASCUNHO",
      title: `Solicitação Unificada # ${param.solicitacaoUnificada.id_externo}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.solicitacaoUnificada.id_externo,
      outroMotivo:
        param.solicitacaoUnificada.outro_motivo !== null &&
        param.solicitacaoUnificada.outro_motivo !== ""
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      removerSolicitacaoUnificada(uuid).then(
        res => {
          if (res.status === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.resetForm();
          } else {
            toastError("Houve um erro ao excluir o rascunho");
          }
        },
        function(error) {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
    }
  }

  onMotivoChanged(value) {
    const motivo = this.props.motivos.find(motivo => motivo.uuid === value);
    const outroMotivo = motivo.nome.includes("Outro");
    this.setState({ outroMotivo });
    if (!outroMotivo) {
      this.props.change("outro_motivo", "");
    }
  }

  cancelForm(event) {
    this.resetForm();
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  resetForm(event) {
    this.props.reset("unifiedSolicitation");
    this.props.loadUnifiedSolicitation(null);
    let escolas = this.props.escolas;

    escolas.forEach(function(escola) {
      escola["burger_active"] = false;
      escola["limit_of_meal_kits"] = 0;
      escola["number_of_choices"] = 0;
      escola["number_of_meal_kits"] = 0;
      escola["nro_alunos"] = 0;
      escola["numero_alunos"] = 0;
      escola["tempo_passeio"] = null;
      escola["kit_lanche"] = null;
      escola["checked"] = false;
    });
    this.setState({
      status: "SEM STATUS",
      title: "Nova Solicitação Unificada",
      id: "",
      showModal: false,
      schoolExists: false,
      schoolsExistArray: [],
      salvarAtualizarLbl: "Salvar Rascunho",
      schoolsFiltered: escolas,
      schoolsTotal: 0,
      qtd_kit_lanche: 0,
      radioChanged: false,
      kitsTotal: 0,
      choicesTotal: 0,
      studentsTotal: 0,
      outroMotivo: false,
      initialValues: true
    });
    this.refresh();
  }

  componentDidMount() {
    this.props.change("schools_total", 0);
    this.props.change("kits_total", 0);

    getKitLanches()
      .then(response => {
        this.setState({
          enumKits: extrairKitsLanchesParaCards(response)
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
        escola => escola.codigo_eol === school.codigo_eol
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
    this.props.change("lista_kit_lanche_igual", !this.props.multipleOrder);
    window.scrollTo(
      0,
      this.pedidoMultiploRef.current.offsetTop +
        295 +
        120 * this.state.unifiedSolicitationList.length
    );
  }

  handleSelecionaKitLancheBox(school, value) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      escola => escola.codigo_eol === school.codigo_eol
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
      escola => escola.codigo_eol === school.codigo_eol
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
        studentsTotal += parseInt(school.quantidade_alunos);
      }
    });
    return studentsTotal;
  }

  handleNumberOfStudentsPerSchool(school, event) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      escola => escola.codigo_eol === school.codigo_eol
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    schoolsFiltered[foundIndex].quantidade_alunos = event.target.value || 0;
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      studentsTotal: this.handleStudentsTotal(),
      schoolsFiltered: schoolsFiltered
    });
  }

  setNumberOfMealKits(school) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      escola => escola.codigo_eol === school.codigo_eol
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
    if (this.props.escolas.length !== prevProps.escolas.length) {
      this.setState({
        schoolsFiltered: this.props.escolas
      });
    }
    const { meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading } = this.state;
    if (meusDados !== null && proximos_dois_dias_uteis !== null && loading) {
      this.setState({
        loading: false
      });
    }
  }

  handleCheck(school) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      escola => escola.codigo_eol === school.codigo_eol
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    school.checked = !school.checked;
    schoolsFiltered[foundIndex].checked = school.checked;
    this.props.change(`school_${school.codigo_eol}.check`, school.checked);
    if (this.props.multipleOrder) {
      schoolsFiltered[foundIndex].quantidade_alunos = this.props.max_alunos;
      this.props.change(
        `school_${school.codigo_eol}.quantidade_alunos`,
        this.props.max_alunos
      );
    }
    schoolsFiltered = this.setNumberOfMealKits(school);
    let studentsTotal = 0;
    let kitsTotal = 0;
    let schoolsTotal = 0;
    schoolsFiltered.forEach(function(school) {
      if (school.checked) {
        studentsTotal += school.quantidade_alunos
          ? parseInt(school.quantidade_alunos)
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
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    )
      this.showModal();
    this.props.change("dia", value);
  }

  setInitialValues() {
    this.setState({ initialValues: false });
  }

  changeBurger(school, key) {
    school.burger_active = !school.burger_active;
    this.refs.escolas.scrollTop = 47 * key;
    this.forceUpdate();
    window.scrollTo(0, this.escolasRef.current.offsetTop + 295);
  }

  closeModal(e) {
    this.setState({ showModal: false });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  refresh() {
    solicitacoesUnificadasSalvas().then(
      res => {
        this.setState({
          ...this.state,
          unifiedSolicitationList: res.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
  }

  iniciarPedido(uuid) {
    inicioPedido(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação Unificada enviada com sucesso!");
          this.resetForm();
        } else if (res.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao enviar a solicitação unificada");
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a solicitação unificada");
      }
    );
  }

  handleSubmit(values) {
    values.escolas = this.state.schoolsFiltered;
    values.diretoria_regional = this.props.meusDados.diretorias_regionais[0].uuid;
    values.kits_total = this.state.kitsTotal;
    const error = validateSubmit(values, this.state);
    if (!error) {
      if (!values.uuid) {
        criarSolicitacaoUnificada(
          JSON.stringify(formatarSubmissao(values))
        ).then(
          res => {
            if (res.status === HTTP_STATUS.CREATED) {
              if (values.status === "DRE_A_VALIDAR") {
                this.iniciarPedido(res.data.uuid);
              } else {
                toastSuccess("Solicitação Unificada salva com sucesso!");
                this.resetForm();
              }
            } else {
              toastError("Houve um erro ao salvar a solicitação unificada");
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a solicitação unificada");
          }
        );
      } else {
        atualizarSolicitacaoUnificada(
          values.uuid,
          JSON.stringify(formatarSubmissao(values))
        ).then(
          res => {
            if (res.status === HTTP_STATUS.OK) {
              if (values.status === "DRE_A_VALIDAR") {
                this.iniciarPedido(res.data.uuid);
              } else {
                toastSuccess("Solicitação Unificada atualizada com sucesso!");
                this.resetForm();
              }
            } else {
              toastError("Houve um erro ao salvar a solicitação unificada");
            }
          },
          function(error) {
            toastError("Houve um erro ao atualizar a solicitação unificada");
          }
        );
      }
    } else {
      toastError(error);
    }
  }

  filterList(event) {
    if (event === undefined) event = { target: { value: "" } };
    let schoolsFiltered = this.props.escolas;
    schoolsFiltered = schoolsFiltered.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return (
        item.nome.toLowerCase().search(wordToFilter) !== -1 ||
        item.codigo_eol.includes(wordToFilter)
      );
    });
    this.setState({ schoolsFiltered });
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  render() {
    const {
      handleSubmit,
      meusDados,
      proximos_dois_dias_uteis,
      multipleOrder,
      max_alunos,
      prosseguir
    } = this.props;
    const {
      loading,
      title,
      schoolExists,
      schoolsExistArray,
      qtd_kit_lanche,
      showModal,
      schoolsFiltered,
      enumKits,
      lotes,
      kitsTotal,
      choicesTotal,
      studentsTotal,
      schoolsTotal,
      unifiedSolicitationList,
      collapsed
    } = this.state;
    return (
      <div className="unified-solicitation">
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            onSubmit={handleSubmit(this.props.handleSubmit)}
            onKeyPress={this.onKeyPress}
          >
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              collapsed={collapsed}
              alterarCollapse={this.alterarCollapse}
              numeroAlunos={
                meusDados.diretorias_regionais &&
                meusDados.diretorias_regionais[0].quantidade_alunos
              }
            >
              <Collapse isOpened={!collapsed}>
                <TabelaHistoricoLotes lotes={lotes} />
              </Collapse>
            </CardMatriculados>
            {unifiedSolicitationList && unifiedSolicitationList.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  schoolsLoaded={schoolsFiltered.length > 0}
                  unifiedSolicitationList={unifiedSolicitationList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </div>
            )}
            <div ref={this.titleRef} className="form-row mt-3 ml-1">
              <h3 className="font-weight-bold" style={{ color: "#353535" }}>
                {title}
              </h3>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-3">
                    <Field
                      component={LabelAndDate}
                      name="data"
                      onBlur={event => this.handleDate(event)}
                      minDate={proximos_dois_dias_uteis}
                      label="Dia"
                      validate={required}
                    />
                  </div>
                  <div className="col-9 pl-0 pr-0 pb-3">
                    <Field
                      component={LabelAndInput}
                      label="Local do evento"
                      placeholder="Insira o local do evento"
                      name="local"
                      className="form-control"
                      validate={required}
                    />
                  </div>
                </div>
                <div className="row" />
                <div className="row" />
                <hr />
                <div className="row">
                  <div className="col-12 pl-0 pr-0 pb-3">
                    <Field
                      component={LabelAndInput}
                      label="Unidades Escolares"
                      placeholder="Pesquisar"
                      onChange={this.filterList}
                      className="form-control"
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
                      name="lista_kit_lanche_igual"
                    />
                    <span
                      onClick={() => this.handleMultipleOrder()}
                      className="checkbox-custom"
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
                        name="quantidade_max_alunos_por_escola"
                        onChange={event =>
                          this.props.change(
                            "quantidade_max_alunos_por_escola",
                            event.target.value
                          )
                        }
                        type="number"
                        label="Número MÁXIMO de alunos participantes por escola"
                        validate={
                          multipleOrder === true && [
                            required,
                            maxValue(max_alunos)
                          ]
                        }
                      />
                    </div>
                  </div>
                  <SelecionaTempoPasseio
                    className="mt-3"
                    validate={multipleOrder === true}
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
                      validate={multipleOrder === true}
                      choicesNumberLimit={qtd_kit_lanche}
                      setInitialValues={this.setInitialValues}
                      onChange={value =>
                        this.setState({ choicesTotal: value.length })
                      }
                      showOptions={false}
                      kits={enumKits}
                    />
                  )}
                </Collapse>
                <span ref={this.escolasRef} />
                <div scrollTop={100} ref="escolas" className="schools-group">
                  {schoolsFiltered.length === 0 && (
                    <p>
                      Carregando escolas...{" "}
                      <img
                        src="/assets/image/ajax-loader.gif"
                        alt="ajax-loader"
                      />
                    </p>
                  )}
                  {schoolsFiltered.length > 0 &&
                    schoolsFiltered.map((school, key) => {
                      return (
                        <FormSection name={`school_${school.codigo_eol}`}>
                          <div
                            className={`${school.checked &&
                              !school.burger_active &&
                              "school-checked"}`}
                          >
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
                                <label
                                  htmlFor="check"
                                  className="checkbox-label"
                                >
                                  <Field
                                    component={"input"}
                                    type="checkbox"
                                    name="check"
                                  />
                                  <span
                                    onClick={() => this.handleCheck(school)}
                                    className="checkbox-custom"
                                  />{" "}
                                  {school.codigo_eol + " - " + school.nome}
                                </label>
                                {!multipleOrder && (
                                  <Stand
                                    onClick={() =>
                                      this.changeBurger(school, key)
                                    }
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
                                      style={{
                                        width: "70px",
                                        textAlign: "center"
                                      }}
                                      name="quantidade_alunos"
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
                                        this.handleNumberOfStudents(
                                          school,
                                          event
                                        )
                                      }
                                      label="Nº de alunos participantes"
                                      validate={
                                        school.checked &&
                                        !multipleOrder && [
                                          required,
                                          naoPodeSerZero
                                        ]
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
                                    setInitialValues={this.setInitialValues}
                                    validate={school.checked && !multipleOrder}
                                    className="mt-3"
                                    onChange={value =>
                                      this.handleSelecionaKitLancheBox(
                                        school,
                                        value
                                      )
                                    }
                                    choicesNumberLimit={
                                      school.limit_of_meal_kits
                                    }
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
                    name="descricao"
                  />
                </div>
                {schoolExists && (
                  <div
                    className="col-md-12 pt-2 pb-2"
                    style={{ paddingLeft: "2rem" }}
                  >
                    <label htmlFor="check" className="checkbox-label">
                      <Field
                        component={"input"}
                        type="checkbox"
                        name="prosseguir"
                      />
                      <span
                        onClick={() =>
                          this.props.change("prosseguir", !prosseguir)
                        }
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
                    style={ButtonStyle.OutlineSuccess}
                  />
                  <BaseButton
                    label={"Salvar Rascunho"}
                    onClick={handleSubmit(values => this.handleSubmit(values))}
                    className="ml-3"
                    type={ButtonType.BUTTON}
                    style={ButtonStyle.OutlineSuccess}
                  />
                  <BaseButton
                    label="Enviar Solicitação"
                    type={ButtonType.SUBMIT}
                    onClick={handleSubmit(values =>
                      this.handleSubmit({ ...values, status: "DRE_A_VALIDAR" })
                    )}
                    style={ButtonStyle.Success}
                    className="ml-3"
                  />
                </div>
              </div>
            </div>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
          </form>
        )}
      </div>
    );
  }
}

const UnifiedSolicitationForm = reduxForm({
  form: "unifiedSolicitation",
  enableReinitialize: true
})(SolicitacaoUnificada);

const selector = formValueSelector("unifiedSolicitation");
const mapStateToProps = state => {
  return {
    initialValues: state.unifiedSolicitation.data,
    multipleOrder: selector(state, "lista_kit_lanche_igual"),
    kitsTotal: selector(state, "kits_total"),
    motivo: selector(state, "motivo"),
    max_alunos: selector(state, "quantidade_max_alunos_por_escola"),
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
