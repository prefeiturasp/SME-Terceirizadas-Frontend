import StatefulMultiSelect from "@khanacademy/react-multi-select";
import React, { Component } from "react";
import { formatarTiposDeAlimentacao } from "./helper";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FormSection, formValueSelector, reduxForm } from "redux-form";
import { required } from "../../helpers/fieldValidators";
import { loadFoodInclusion } from "../../reducers/foodInclusionReducer";
import {
  createOrUpdateFoodInclusion,
  deleteFoodInclusion,
  getInclusoesContinuasSalvas
} from "../../services/foodInclusion.service";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import CardMatriculados from "../Shareable/CardMatriculados";
import { toastError, toastSuccess } from "../Shareable/dialogs";
import {
  LabelAndCombo,
  LabelAndDate,
  LabelAndInput,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import Weekly from "../Shareable/Weekly/Weekly";
import { FoodInclusionItemList } from "./FoodInclusionItemList";
import { validateSubmit } from "./FoodInclusionValidation";

class FoodInclusionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodInclusionList: [],
      status: "SEM STATUS",
      title: "Nova Inclusão de Alimentação",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_motivos: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          motivo: null,
          motivoContinuo: false,
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
    var indiceDiaMotivo = this.state.dias_motivos.findIndex(x => x.id === id);
    var dias_motivos = this.state.dias_motivos;
    if (field === "motivo") {
      const indiceMotivo = this.props.reasons_continuous_program.findIndex(
        motivo => motivo.uuid === value
      );
      dias_motivos[indiceDiaMotivo]["motivoContinuo"] = indiceMotivo !== -1;
    }
    if (field === "which_reason") value = value.target.value;
    dias_motivos[indiceDiaMotivo][field] = value;
    this.setState({
      ...this.state,
      dias_motivos: dias_motivos
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
      dias_motivos: this.state.dias_motivos.concat([
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
    this.props.change(`description_${period.value}.select`, selectedOptions);
  };

  fontHeader = {
    color: "#686868"
  };
  bgMorning = {
    background: "#FFF7CB"
  };

  OnDeleteButtonClicked(id, uuid) {
    deleteFoodInclusion(JSON.stringify({ uuid: uuid })).then(
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
    this.props.reset("foodInclusion");
    this.props.loadFoodInclusion(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Inclusão de Alimentação",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_motivos: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          reason: null,
          date_from: null,
          date_to: null,
          weekdays: []
        }
      ],
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
    this.props.reset("foodInclusion");
    this.props.loadFoodInclusion(param.dayChange);
    this.setState({
      status: param.dayChange.status,
      title: `Inclusão de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      dias_motivos: param.dayChange.dias_motivos
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    // TODO: definir a escola atraves do login, aguardar os perfis implementados..
    const escolaTemp = "88d9fd38-6d48-41d9-ae1e-133265260154";
    // getInclusoesContinuasSalvas(escolaTemp).then(
    //   // TODO: criar status das inclusoes
    //   foodInclusionList => {
    //     this.setState({
    //       foodInclusionList
    //     });
    //   },
    //   function(error) {
    //     toastError("Erro ao carregar as inclusões salvas");
    //   }
    // );
    this.resetForm("foodInclusion");
  }

  onSubmit(values) {
    values.dias_motivos = this.state.dias_motivos;
    const error = validateSubmit(values, this.state);
    if (!error) {
      createOrUpdateFoodInclusion(JSON.stringify(values)).then(
        res => {
          if (res.code === 200) {
            toastSuccess(
              (values.status === "SALVO"
                ? "Rascunho salvo"
                : "Inclusão de Alimentação enviada") + " com sucesso"
            );
            this.refresh();
          } else {
            toastError(res.log_content[0]);
          }
        },
        function(error) {
          toastError("Houve um erro ao salvar a inclusão de alimentação");
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
      enrolled,
      reasons_simple,
      reasons_continuous_program,
      periodos,
      two_working_days
    } = this.props;
    const {
      title,
      foodInclusionList,
      selectDefault,
      dias_motivos,
      showModal
    } = this.state;
    const colors = {
      MANHA: "#FFF7CB",
      TARDE: "#EAFFE3",
      NOITE: "#FFEED6",
      INTEGRAL: "#E4F1FF",
      integrate: "#EBEDFF"
    };
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados numeroAlunos={enrolled} />
          {foodInclusionList.length > 0 && (
            <div className="mt-3">
              <span className="page-title">Rascunhos</span>
              <FoodInclusionItemList
                foodInclusionList={foodInclusionList}
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
                Descrição da Inclusão
              </div>
              {dias_motivos.map((day_reason, key) => {
                return (
                  <FormSection name={`dias_motivos_${day_reason.id}`}>
                    <div className="form-row">
                      {(!day_reason.reason ||
                        !day_reason.reason.includes("Programa Contínuo")) && (
                        <div className="form-group col-sm-3">
                          <Field
                            component={LabelAndDate}
                            name="date"
                            onChange={value =>
                              this.handleField("date", value, day_reason.id)
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
                          name="motivo"
                          label="Motivo"
                          onChange={value =>
                            this.handleField("motivo", value, day_reason.id)
                          }
                          options={
                            dias_motivos.length > 1
                              ? selectDefault.concat(reasons_simple)
                              : selectDefault
                                  .concat(reasons_simple)
                                  .concat(reasons_continuous_program)
                          }
                          validate={required}
                        />
                      </div>
                    </div>
                    {day_reason.reason && day_reason.reason.includes("Outro") && (
                      <div className="form-row">
                        <div
                          className={
                            !day_reason.reason ||
                            !day_reason.reason.includes(
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
                                "which_reason",
                                event,
                                day_reason.id
                              )
                            }
                            name="which_reason"
                            className="form-control"
                            validate={required}
                          />
                        </div>
                      </div>
                    )}
                    {day_reason.motivo && day_reason.motivoContinuo && (
                      <div className="form-row">
                        <div className="form-group col-sm-3">
                          <Field
                            component={LabelAndDate}
                            onChange={value =>
                              this.handleField(
                                "date_from",
                                value,
                                day_reason.id
                              )
                            }
                            name="date_from"
                            label="De"
                            validate={required}
                          />
                        </div>
                        <div className="form-group col-sm-3">
                          <Field
                            component={LabelAndDate}
                            onChange={value =>
                              this.handleField("date_to", value, day_reason.id)
                            }
                            name="date_to"
                            label="Até"
                            validate={required}
                          />
                        </div>
                        <Field
                          component={Weekly}
                          name="weekdays"
                          onChange={value =>
                            this.handleField("weekdays", value, day_reason.id)
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
                  dias_motivos[0].reason &&
                  dias_motivos[0].reason.includes("Programa Contínuo")
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
              {periodos.map((periodo, key) => {
                return (
                  <FormSection name={`quantidades_periodo_${periodo.nome}`}>
                    <div className="form-row">
                      <Field component={"input"} type="hidden" name="value" />
                      <div className="form-check col-md-3 mr-4 ml-4">
                        <div
                          className="pl-5 pt-2 pb-2"
                          style={{
                            marginLeft: "-1.4rem",
                            background: colors[periodo.nome],
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
                                  `quantidades_periodo_${periodo.nome}.check`,
                                  true
                                )
                              }
                              className="checkbox-custom"
                            />{" "}
                            {periodo.nome}
                          </label>
                        </div>
                      </div>
                      <div className="form-group col-md-5 mr-5">
                        <div
                          className={
                            true
                              ? "multiselect-wrapper-enabled"
                              : "multiselect-wrapper-disabled"
                          }
                        >
                          <Field
                            component={StatefulMultiSelect}
                            name=".select"
                            selected={[]}
                            options={formatarTiposDeAlimentacao(
                              periodo.tipos_alimentacao
                            )}
                            onSelectedChanged={values =>
                              this.handleSelectedChanged(values, periodo)
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
                          disabled={false}
                          type="number"
                          name="number"
                          min="0"
                          className="form-control"
                          validate={true ? required : null}
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

const FoodInclusionEditorForm = reduxForm({
  form: "foodInclusion",
  enableReinitialize: true
})(FoodInclusionEditor);
const selector = formValueSelector("foodInclusion");
const mapStateToProps = state => {
  return {
    initialValues: state.foodInclusion.data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodInclusion
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodInclusionEditorForm);
