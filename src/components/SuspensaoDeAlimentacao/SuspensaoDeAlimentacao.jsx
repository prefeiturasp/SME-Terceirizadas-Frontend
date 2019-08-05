import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createOrUpdateFoodSuspension,
  deleteFoodSuspension,
  getSuspensoesDeAlimentacaoSalvas
} from "../../services/suspensaoDeAlimentacao.service";
import { validateSubmit } from "./SuspensaoDeAlimentacaoValidation";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndCombo,
  LabelAndInput
} from "../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { required } from "../../helpers/fieldValidators";
import CardMatriculados from "../Shareable/CardMatriculados";
import Weekly from "../Shareable/Weekly/Weekly";
import { Modal } from "react-bootstrap";
import { FoodSuspensionItemList } from "./SuspensaoDeAlimentacaoItemList";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import { loadFoodSuspension } from "../../reducers/suspensaoDeAlimentacaoReducer";

class FoodSuspensionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suspensoesDeAlimentacaoList: [],
      status: "SEM STATUS",
      title: "Nova Suspensão de Alimentação",
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
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      },
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
    this.addDay = this.addDay.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
  }

  handleField(field, value, id) {
    var foundIndex = this.state.dias_razoes.findIndex(x => x.id === id);
    var dias_razoes = this.state.dias_razoes;
    if (field === "which_reason") value = value.target.value;
    dias_razoes[foundIndex][field] = value;
    this.setState({
      ...this.state,
      dias_razoes: dias_razoes
    });
    if (field === "date") {
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
      `suspensoes_${period.value}.tipo_de_refeicao`,
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
      title: "Nova Suspensão de Alimentação",
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
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
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
      title: `Suspensão de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      dias_razoes: param.dayChange.dias_razoes,
      options: {
        MANHA:
          param.dayChange.suspensoes_MANHA !== undefined
            ? param.dayChange.suspensoes_MANHA.tipo_de_refeicao
            : [],
        TARDE:
          param.dayChange.suspensoes_TARDE !== undefined
            ? param.dayChange.suspensoes_TARDE.tipo_de_refeicao
            : [],
        NOITE:
          param.dayChange.suspensoes_NOITE !== undefined
            ? param.dayChange.suspensoes_NOITE.tipo_de_refeicao
            : [],
        INTEGRAL:
          param.dayChange.suspensoes_INTEGRAL !== undefined
            ? param.dayChange.suspensoes_INTEGRAL.tipo_de_refeicao
            : []
      }
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    const fields = [
      "suspensoes_MANHA",
      "suspensoes_TARDE",
      "suspensoes_NOITE",
      "suspensoes_INTEGRAL"
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
          const value = field.split("suspensoes_")[1];
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
    getSuspensoesDeAlimentacaoSalvas().then(
      res => {
        console.log("List ===========================>", res);

        this.setState({
          suspensoesDeAlimentacaoList: res.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as suspensões salvas");
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
                : "Suspensão de Alimentação enviada") + " com sucesso"
            );
            this.refresh();
          } else {
            toastError(res.error);
          }
        },
        function(error) {
          toastError("Houve um erro ao salvar a Suspensão de alimentação");
        }
      );
      this.closeModal();
    } else {
      toastError(error);
    }
  }

  getOptionsFromTiposAlimentacao = tiposAlimentacao => {
    let options = [];
    tiposAlimentacao.forEach(function(tipoAlimentacao) {
      options.push({
        label: tipoAlimentacao.nome,
        value: tipoAlimentacao.uuid
      });
    });
    return options;
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      enrolled,
      reasons_simple,
      reasons_continuous_program,
      periods,
      suspensoes_MANHA,
      suspensoes_TARDE,
      suspensoes_NOITE,
      suspensoes_INTEGRAL,
      two_working_days,
      typeFoodContinuousProgram
    } = this.props;
    const {
      title,
      options,
      suspensoesDeAlimentacaoList,
      selectDefault,
      dias_razoes,
      showModal
    } = this.state;
    let checkMap = {
      MANHA: suspensoes_MANHA && suspensoes_MANHA.check,
      TARDE: suspensoes_TARDE && suspensoes_TARDE.check,
      NOITE: suspensoes_NOITE && suspensoes_NOITE.check,
      INTEGRAL: suspensoes_INTEGRAL && suspensoes_INTEGRAL.check
    };
    const colors = {
      MANHA: "#FFF7CB",
      TARDE: "#FFEED6",
      NOITE: "#E4F1FF",
      INTEGRAL: "#EBEDFF"
    };
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados numeroAlunos={enrolled} />
          {suspensoesDeAlimentacaoList.length > 0 && (
            <div className="mt-3">
              <span className="page-title">Rascunhos</span>
              <FoodSuspensionItemList
                suspensoesDeAlimentacaoList={suspensoesDeAlimentacaoList}
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
                Descrição da Suspensão
              </div>
              {dias_razoes.map((dia_razao, key) => {
                return (
                  <FormSection name={`dias_razoes_${dia_razao.id}`}>
                    <div className="form-row">
                      {(!dia_razao.razao ||
                        !dia_razao.razao.includes("Programa Contínuo")) && (
                        <div className="form-group col-sm-3">
                          <Field
                            component={LabelAndDate}
                            name="data"
                            onChange={value =>
                              this.handleField("data", value, dia_razao.id)
                            }
                            minDate={two_working_days}
                            label="Dia"
                            validate={required}
                          />
                        </div>
                      )}
                      <div className="form-group col-sm-8">
                        <Field
                          component={LabelAndCombo}
                          name="razao"
                          label="Motivo"
                          onChange={value =>
                            this.handleField("razao", value, dia_razao.id)
                          }
                          options={
                            dias_razoes.length > 1
                              ? selectDefault.concat(reasons_simple)
                              : selectDefault
                                  .concat(reasons_simple)
                                  .concat(reasons_continuous_program)
                          }
                          validate={required}
                        />
                      </div>
                    </div>
                    {dia_razao.razao && dia_razao.razao.includes("Outro") && (
                      <div className="form-row">
                        <div
                          className={
                            !dia_razao.razao ||
                            !dia_razao.razao.includes(
                              "Programa Contínuo - Outro"
                            )
                              ? "form-group col-sm-8 offset-sm-3"
                              : "form-group col-sm-8"
                          }
                        >
                          <Field
                            component={LabelAndInput}
                            label="Qual o motivo?"
                            onChange={event =>
                              this.handleField(
                                "qual_razao",
                                event,
                                dia_razao.id
                              )
                            }
                            name="qual_razao"
                            className="form-control"
                            validate={required}
                          />
                        </div>
                      </div>
                    )}
                    {dia_razao.razao &&
                      dia_razao.razao.includes("Programa Contínuo") && (
                        <div className="form-row">
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              onChange={value =>
                                this.handleField("data_de", value, dia_razao.id)
                              }
                              name="data_de"
                              label="De"
                              validate={required}
                            />
                          </div>
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              onChange={value =>
                                this.handleField(
                                  "data_ate",
                                  value,
                                  dia_razao.id
                                )
                              }
                              name="data_ate"
                              label="Até"
                              validate={required}
                            />
                          </div>
                          <Field
                            component={Weekly}
                            name="dias_de_semana"
                            onChange={value =>
                              this.handleField(
                                "dias_de_semana",
                                value,
                                dia_razao.id
                              )
                            }
                            classNameArgs="form-group col-sm-4"
                            label="Repetir"
                          />
                        </div>
                      )}
                  </FormSection>
                );
              })}
              <BaseButton
                label="Adicionar dia"
                className="col-sm-3"
                onClick={() => this.addDay()}
                disabled={
                  dias_razoes[0].razao &&
                  dias_razoes[0].razao.includes("Programa Contínuo")
                }
                style={ButtonStyle.OutlinePrimary}
              />
              <table className="table table-borderless">
                <tr>
                  <td>Período</td>
                  <td style={{ paddingLeft: "9rem" }}>Tipo de Alimentação</td>
                  <td>Nº de Alunos</td>
                </tr>
              </table>
              {periods.map((period, key) => {
                this.props.change(
                  `suspensoes_${period.value}.periodo`,
                  period.uuid
                );
                return (
                  <FormSection name={`suspensoes_${period.nome}`}>
                    <div className="form-row">
                      <Field component={"input"} type="hidden" name="value" />
                      <div className="form-check col-md-3 mr-4 ml-4">
                        <div
                          className="pl-5 pt-2 pb-2"
                          style={{
                            marginLeft: "-1.4rem",
                            background: colors[period.nome],
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
                                  `suspensoes_${period.nome}.check`,
                                  !checkMap[period.nome]
                                )
                              }
                              className="checkbox-custom"
                            />{" "}
                            {period.nome}
                          </label>
                        </div>
                      </div>
                      <div className="form-group col-md-5 mr-5">
                        <div
                          className={
                            checkMap[period.nome]
                              ? "multiselect-wrapper-enabled"
                              : "multiselect-wrapper-disabled"
                          }
                        >
                          <Field
                            component={StatefulMultiSelect}
                            name=".tipo_de_refeicao"
                            selected={options[period.nome] || []}
                            options={this.getOptionsFromTiposAlimentacao(
                              period.tipos_alimentacao
                            )}
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
                          type="number"
                          name="numero_de_alunos"
                          min="0"
                          className="form-control"
                          validate={checkMap[period.nome] ? required : null}
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

const FoodSuspensionEditorForm = reduxForm({
  form: "foodSuspension",
  enableReinitialize: true
})(FoodSuspensionEditor);
const selector = formValueSelector("foodSuspension");
const mapStateToProps = state => {
  return {
    // initialValues: state.foodSuspension.data,
    suspensoes_MANHA: selector(state, "suspensoes_MANHA"),
    suspensoes_TARDE: selector(state, "suspensoes_TARDE"),
    suspensoes_NOITE: selector(state, "suspensoes_NOITE"),
    suspensoes_INTEGRAL: selector(state, "suspensoes_INTEGRAL")
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
)(FoodSuspensionEditorForm);
