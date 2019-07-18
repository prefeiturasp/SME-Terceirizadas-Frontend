import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createOrUpdateFoodSuspension,
  deleteFoodSuspension,
  getSavedFoodSuspensions
} from "../../services/foodSuspension.service";
import { getPeriods } from "../../services/school.service";
import { getReasons } from "../../services/foodSuspension.service";
import { getWorkingDays } from "../../services/workingDays.service";
import { validateSubmit } from "./ValidacaoFormulario";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndInput
} from "../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { required } from "../../helpers/fieldValidators";
import CardMatriculados from "../Shareable/CardMatriculados";
import { Modal } from "react-bootstrap";
import { Rascunhos } from "./Rascunhos";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import { loadFoodSuspension } from "../../reducers/foodSuspensionReducer";
import "./style.scss";

class AlteracaoDeCardapio extends Component {
  typeFoodContinuousProgram = [
    {
      label: "Lanche 4 Horas",
      value: "Lanche 4 Horas"
    },
    {
      label: "Refeição/Sobremesa",
      value: "Refeição/Sobremesa"
    },
    {
      label: "Lanche 5/6 Horas",
      value: "Lanche 5/6 Horas"
    },
    {
      label: "Sobremesa",
      value: "Sobremesa"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      foodSuspensionList: [],
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          reason: null,
          date_from: null,
          date_to: null,
          weekdays: []
        }
      ],
      options: {
        first_period: [],
        second_period: [],
        third_period: [],
        fourth_period: [],
        integrate: []
      },
      selectDefault: [
        {
          key: 0,
          label: "Selecione",
          value: ""
        }
      ],
      enrolled: 300,
      reasons_simple: [],
      reasons_continuous_program: [],
      day: new Date(),
      periods: [],
      typeFoodContinuousProgram: this.typeFoodContinuousProgram,
      two_working_days: null,
      five_working_days: null
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.addDay = this.addDay.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
  }

  handleField(field, value) {
    if (field === "which_reason") value = value.target.value;
    if (field === "alterar_dia") {
      console.log("VRUM");
      const _date = value.split("/");
      if (
        this.props.two_working_days <=
          new Date(_date[2], _date[1] - 1, _date[0]) &&
        new Date(_date[2], _date[1] - 1, _date[0]) <
          this.props.five_working_days
      ) {
        this.showModal();
      }
    }
  }

  closeModal(e) {
    this.setState({ ...this.state, showModal: false });
  }

  addDay() {
    this.setState({
      dias_razoes: this.state.dias_razoes.concat([
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          reason: null,
          date_from: null,
          date_to: null,
          weekdays: []
        }
      ])
    });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  handleSelectedChanged = (selectedOptions, period) => {
    let options = this.state.options;
    options[period.value] = selectedOptions;
    this.setState({
      ...this.state,
      options: options
    });
    this.props.change(
      `descricoes_${period.value}.tipo_de_refeicao`,
      selectedOptions
    );
  };

  fontHeader = {
    color: "#686868"
  };
  bgMorning = {
    background: "#FFF7CB"
  };

  OnDeleteButtonClicked(id, uuid) {
    deleteFoodSuspension(JSON.stringify({ uuid: uuid })).then(
      res => {
        if (res.code === 200) {
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

  resetForm(event) {
    this.props.reset("foodSuspension");
    this.props.loadFoodSuspension(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          data: null,
          razao: null,
          data_de: null,
          data_ate: null,
          weekdays: []
        }
      ],
      options: {
        first_period: [],
        second_period: [],
        third_period: [],
        fourth_period: [],
        integrate: []
      },
      selectDefault: [
        {
          key: 0,
          label: "Selecione",
          value: ""
        }
      ]
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset("foodSuspension");
    this.props.loadFoodSuspension(param.dayChange);
    this.setState({
      status: param.dayChange.status,
      title: `Alteração de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      dias_razoes: param.dayChange.dias_razoes,
      options: {
        first_period:
          param.dayChange.descricoes_first_period !== undefined
            ? param.dayChange.descricoes_first_period.tipo_de_refeicao
            : [],
        second_period:
          param.dayChange.descricoes_second_period !== undefined
            ? param.dayChange.descricoes_second_period.tipo_de_refeicao
            : [],
        third_period:
          param.dayChange.descricoes_third_period !== undefined
            ? param.dayChange.descricoes_third_period.tipo_de_refeicao
            : [],
        fourth_period:
          param.dayChange.descricoes_fourth_period !== undefined
            ? param.dayChange.descricoes_fourth_period.tipo_de_refeicao
            : [],
        integrate:
          param.dayChange.descricoes_integrate !== undefined
            ? param.dayChange.descricoes_integrate.tipo_de_refeicao
            : []
      }
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    let _two,
      _five = null;
    getPeriods().then(resPeriods => {
      getReasons().then(resReasons => {
        this.setState({
          ...this.state,
          periods: resPeriods.content.school_periods,
          reasons_simple: resReasons.content.reasons_simple,
          reasons_continuous_program:
            resReasons.content.reasons_continuous_program
        });
      });
    });
    getWorkingDays().then(res => {
      _two = res[0].date_two_working_days.split("/");
      _five = res[0].date_five_working_days.split("/");
      this.setState({
        ...this.state,
        two_working_days: new Date(_two[2], _two[1] - 1, _two[0]),
        five_working_days: new Date(_five[2], _five[1] - 1, _five[0])
      });
    });
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    const fields = [
      "descricoes_first_period",
      "descricoes_second_period",
      "descricoes_third_period",
      "descricoes_fourth_period",
      "descricoes_integrate"
    ];
    fields.forEach(
      function(field) {
        if (
          prevProps[field] &&
          prevProps[field].check &&
          this.props[field] &&
          !this.props[field].check
        ) {
          let options = this.state.options;
          const value = field.split("descricoes_")[1];
          options[value] = [];
          this.setState({
            ...this.state,
            options: options
          });
          this.props.change(field + ".tipo_de_refeicao", []);
          this.props.change(field + ".numero_de_alunos", "");
        }
      }.bind(this)
    );
  }

  refresh() {
    getSavedFoodSuspensions().then(
      res => {
        this.setState({
          ...this.state,
          foodSuspensionList: res.content.suspensoes_de_alimentacao
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
    this.resetForm("foodSuspension");
  }

  onSubmit(values) {
    values.dias_razoes = this.state.dias_razoes;
    const error = validateSubmit(values, this.state);
    if (!error) {
      createOrUpdateFoodSuspension(JSON.stringify(values)).then(
        res => {
          if (res.status === 200) {
            toastSuccess(
              (values.status === "SALVO"
                ? "Rascunho salvo"
                : "Alteração de Cardápio enviada") + " com sucesso"
            );
            this.refresh();
          } else {
            toastError(res.error);
          }
        },
        function(error) {
          toastError("Houve um erro ao salvar a Alteração de alimentação");
        }
      );
      this.closeModal();
    } else {
      toastError(error);
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      descricoes_first_period,
      descricoes_second_period,
      descricoes_third_period,
      descricoes_fourth_period,
      descricoes_integrate
    } = this.props;
    const {
      typeFoodContinuousProgram,
      periods,
      enrolled,
      title,
      options,
      foodSuspensionList,
      dias_razoes,
      showModal
    } = this.state;
    let checkMap = {
      first_period: descricoes_first_period && descricoes_first_period.check,
      second_period: descricoes_second_period && descricoes_second_period.check,
      third_period: descricoes_third_period && descricoes_third_period.check,
      fourth_period: descricoes_fourth_period && descricoes_fourth_period.check,
      integrate: descricoes_integrate && descricoes_integrate.check
    };
    const colors = {
      first_period: "#FFF7CB",
      second_period: "#EAFFE3",
      third_period: "#FFEED6",
      fourth_period: "#E4F1FF",
      integrate: "#EBEDFF"
    };
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados numeroAlunos={enrolled} />
          {foodSuspensionList.length > 0 && (
            <div className="mt-3">
              <span className="page-title">Rascunhos</span>
              <Rascunhos
                foodSuspensionList={foodSuspensionList}
                OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                resetForm={event => this.resetForm(event)}
                OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
              />
            </div>
          )}
          <div ref={this.titleRef} className="form-row mt-3 ml-1">
            <h3 className="font-weight-bold" style={{ color: "#353535" }}>
              {title}
            </h3>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div
                className="card-title font-weight-bold"
                style={this.fontHeader}
              >
                Descrição da Alteração
              </div>
              <div className="form-row">
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    onChange={value => this.handleField("alterar_dia", value)}
                    name="alterar_dia"
                    label="Alterar dia"
                    validate={required}
                  />
                </div>
                <div className="or-div form-group col-sm-1">Ou</div>
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    onChange={value => this.handleField("data_de", value)}
                    name="data_de"
                    label="De"
                    validate={required}
                  />
                </div>
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    onChange={value => this.handleField("data_ate", value)}
                    name="data_ate"
                    label="Até"
                    validate={required}
                  />
                </div>
              </div>
              <table className="table table-borderless">
                <tr>
                  <td>Período</td>
                  <td style={{ paddingLeft: "9rem" }}>Tipo de Alimentação</td>
                  <td>Nº de Alunos</td>
                </tr>
              </table>
              {periods.map((period, key) => {
                this.props.change(
                  `descricoes_${period.value}.periodo`,
                  period.value
                );
                return (
                  <FormSection name={`descricoes_${period.value}`}>
                    <div className="form-row">
                      <Field component={"input"} type="hidden" name="value" />
                      <div className="form-check col-md-3 mr-4 ml-4">
                        <div
                          className="pl-5 pt-2 pb-2"
                          style={{
                            marginLeft: "-1.4rem",
                            background: colors[period.value],
                            borderRadius: "7px"
                          }}
                        >
                          <label htmlFor="check" className="checkbox-label">
                            <Field
                              component={"input"}
                              type="checkbox"
                              name="check"
                            />
                            <span
                              onClick={() =>
                                this.props.change(
                                  `descricoes_${period.value}.check`,
                                  !checkMap[period.value]
                                )
                              }
                              className="checkbox-custom"
                            />{" "}
                            {period.label}
                          </label>
                        </div>
                      </div>
                      <div className="form-group col-md-5 mr-5">
                        <div
                          className={
                            checkMap[period.value]
                              ? "multiselect-wrapper-enabled"
                              : "multiselect-wrapper-disabled"
                          }
                        >
                          <Field
                            component={StatefulMultiSelect}
                            name=".tipo_de_refeicao"
                            selected={options[period.value] || []}
                            options={
                              dias_razoes[0].razao &&
                              dias_razoes[0].razao.includes("Programa Contínuo")
                                ? typeFoodContinuousProgram
                                : period.meal_types
                            }
                            onSelectedChanged={values =>
                              this.handleSelectedChanged(values, period)
                            }
                            disableSearch={true}
                            overrideStrings={{
                              selectSomeItems: "Selecione",
                              allItemsAreSelected:
                                "Todos os itens estão selecionados",
                              selectAll: "Todos"
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-2">
                        <Field
                          component={LabelAndInput}
                          disabled={
                            options[period.value].length === 0 ||
                            !checkMap[period.value]
                          }
                          type="number"
                          name="numero_de_alunos"
                          min="0"
                          className="form-control"
                          validate={checkMap[period.value] ? required : null}
                        />
                      </div>
                    </div>
                  </FormSection>
                );
              })}
              <hr className="w-100" />
              <div className="form-group">
                <Field
                  component={LabelAndTextArea}
                  placeholder="Campo opcional"
                  label="Observações"
                  name="obs"
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
                      status: "SALVO",
                      salvo_em: new Date(),
                      id: this.state.id
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
                      status: "A_VALIDAR"
                    })
                  )}
                  style={ButtonStyle.Primary}
                  className="ml-3"
                />
              </div>
            </div>
          </div>
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
        </form>
      </div>
    );
  }
}

const AlteracaoDeCardapioForm = reduxForm({
  form: "alteracaoDeCardapio",
  enableReinitialize: true
})(AlteracaoDeCardapio);
const selector = formValueSelector("alteracaoDeCardapio");
const mapStateToProps = state => {
  return {
    initialValues: state.foodSuspension.data,
    descricoes_first_period: selector(state, "descricoes_first_period"),
    descricoes_second_period: selector(state, "descricoes_second_period"),
    descricoes_third_period: selector(state, "descricoes_third_period"),
    descricoes_fourth_period: selector(state, "descricoes_fourth_period"),
    descricoes_integrate: selector(state, "descricoes_integrate")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodSuspension
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoDeCardapioForm);
