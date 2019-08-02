import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  createAlteracaoCardapio,
  deleteAlteracaoCardapio,
  getAlteracoesCardapioList,
  updateAlteracaoCardapio,
  enviarAlteracaoCardapio
} from "../../services/cardapio.service";
import { getPeriods, escolas } from "../../services/school.service";
import { getMotivosAlteracaoCardapio } from "../../services/cardapio.service";
import { getWorkingDays } from "../../services/workingDays.service";
import { validateSubmit } from "./ValidacaoFormulario";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import {
  LabelAndCombo,
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
import { loadAlteracaoCardapio } from "../../reducers/alteracaoCardapioReducer";
import "./style.scss";

class AlteracaoCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alteracaoCardapioList: [],
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          motivo: null,
          observacao: null,
          data_inicial: null,
          data_final: null,
          weekdays: []
        }
      ],
      // TODO: Desacoplar options do nome dos períodos escolares
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
      ],
      enrolled: 300,
      motivosList: [],
      day: new Date(),
      periods: [],
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
          motivo: null,
          observacao: null,
          date_inicial: null,
          date_final: null,
          weekdays: []
        }
      ])
    });
  }

  getOptionsFromTiposAlimentacao = tiposAlimentacao => {
    // Formato esperado para options = [{label: "Onex", value: 1}, {label: "Twox", value: 2},{label: "Threex", value: 3}]
    let options = [];
    tiposAlimentacao.forEach(function(tipoAlimentacao) {
      options.push({
        label: tipoAlimentacao.nome,
        value: tipoAlimentacao.uuid
      });
    });
    return options;
  };

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  handleSelectedChanged = (selectedOptions, period) => {
    let options = this.state.options;
    options[period.nome] = selectedOptions;
    this.setState({
      ...this.state,
      options: options
    });
    this.props.change(
      `substituicoes_${period.nome}.tipo_de_refeicao`,
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
    if (window.confirm("Deseja remover este rascunho?")) {
      deleteAlteracaoCardapio(uuid).then(
        statusCode => {
          if (statusCode === 204) {
            toastSuccess(`Rascunho excluído com sucesso`);
            this.refresh();
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

  resetForm(event) {
    this.props.reset("alteracaoCardapio");
    this.props.loadAlteracaoCardapio(null);
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
          motivo: null,
          observacao: null,
          data_inicial: null,
          data_final: null,
          weekdays: []
        }
      ],
      // TODO: Desacoplar options dos nomes dos períodos escolares
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
    this.props.reset("alteracaoCardapio");
    this.props.loadAlteracaoCardapio(param.dayChange);
    this.setState({
      status: param.dayChange.status,
      title: `Alteração de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      dias_razoes: param.dayChange.dias_razoes,
      // TODO: Desacoplar options dos nomes dos períodos escolares
      options: {
        MANHA:
          param.dayChange.substituicoes_MANHA !== undefined
            ? param.dayChange.substituicoes_MANHA.tipo_de_refeicao
            : [],
        TARDE:
          param.dayChange.substituicoes_TARDE !== undefined
            ? param.dayChange.substituicoes_TARDE.tipo_de_refeicao
            : [],
        NOITE:
          param.dayChange.substituicoes_NOITE !== undefined
            ? param.dayChange.substituicoes_NOITE.tipo_de_refeicao
            : [],
        INTEGRAL:
          param.dayChange.substituicoes_INTEGRAL !== undefined
            ? param.dayChange.substituicoes_INTEGRAL.tipo_de_refeicao
            : []
      }
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    let _two,
      _five = null;
    escolas().then(resEscolas => {
    getPeriods().then(resPeriods => {
      getMotivosAlteracaoCardapio().then(resMotivos => {
        this.setState({
          ...this.state,
          periods: resPeriods.results,
          motivosList: resMotivos.results,
          escola:  resEscolas.results[0]
        });
      });
    })});

    getWorkingDays().then(res => {
      this.setState({
        two_working_days: new Date(res.proximos_dois_dias_uteis),
        five_working_days: new Date(res.proximos_cinco_dias_uteis)
      });
    });
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    // TODO: Desacoplar dos nomes dos períodos escolares
    const fields = [
      "substituicoes_MANHA",
      "substituicoes_TARDE",
      "substituicoes_NOITE",
      "substituicoes_INTEGRAL"
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
          const value = field.split("substituicoes_")[1];
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
    getAlteracoesCardapioList().then(
      res => {
        this.setState({
          ...this.state,
          alteracaoCardapioList: res.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
    this.resetForm("alteracaoCardapio");
  }

  enviaAlteracaoCardapio(uuid) {
    enviarAlteracaoCardapio(uuid).then(
      res => {
        if (res.status === 200) {
          this.refresh();
          toastSuccess("Alteração de Cardápio enviada com sucesso");
        } else {
          toastError(res.error);
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Alteração de Cardápio");
      }
    );
  }

  onSubmit(values) {
    values.dias_razoes = this.state.dias_razoes;
    const error = validateSubmit(values, this.state);

    if (!error) {
      const payload = {

        escola: this.state.escola.uuid,
        motivo: values.motivo,
        data_inicial: values.data_inicial,
        data_final: values.data_final,
        observacao: values.observacao,
        substituicoes: values.substituicoes
      };


      if (!values.uuid) {
        createAlteracaoCardapio(JSON.stringify(payload)).then(
          async res => {
            if (res.status === 201) {
              toastSuccess("Alteração de Cardápio salva com sucesso");
              this.refresh();

              if (values.status === "A_VALIDAR") {
                await this.enviaAlteracaoCardapio(res.data.uuid);
                this.refresh();
              }
            } else {
              toastError(res.error);
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a Alteração de Cardápio");
          }
        );
      } else {
        updateAlteracaoCardapio(values.uuid, JSON.stringify(payload)).then(
          async res => {
            if (res.status === 200) {
              toastSuccess("Alteração de Cardápio salva com sucesso");
              this.refresh();
              if (values.status === "A_VALIDAR") {
                await this.enviaAlteracaoCardapio(res.data.uuid);
                this.refresh();
              }
            } else {
              toastError(res.error);
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a Alteração de Cardápio");
          }
        );
      }
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
      substituicoes_MANHA, // TODO: Desacoplar variáveis dos nomes de períodos escolares.
      substituicoes_TARDE,
      substituicoes_NOITE,
      substituicoes_INTEGRAL
    } = this.props;
    const {
      periods,
      motivosList,
      enrolled,
      title,
      options,
      alteracaoCardapioList,
      dias_razoes,
      showModal
    } = this.state;
    // TODO: Desacoplar checkMap dos nomes de períodos escolares.
    let checkMap = {
      MANHA: substituicoes_MANHA && substituicoes_MANHA.check,
      TARDE: substituicoes_TARDE && substituicoes_TARDE.check,
      NOITE: substituicoes_NOITE && substituicoes_NOITE.check,
      INTEGRAL: substituicoes_INTEGRAL && substituicoes_INTEGRAL.check
    };
    // TODO: Desacoplar colors dos nomes de períodos escolares
    const colors = {
      manha: "#FFF7CB",
      tarde: "#FFEED6",
      noite: "#E4F1FF",
      integral: "#EBEDFF"
    };
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados numeroAlunos={enrolled} />
          {alteracaoCardapioList.length > 0 && (
            <div className="mt-3">
              <span className="page-title">Rascunhos</span>
              <Rascunhos
                alteracaoCardapioList={alteracaoCardapioList}
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
                    disabled={this.props.data_inicial || this.props.data_final}
                    // validate={[required]}
                  />
                </div>
                <div className="or-div form-group col-sm-1">Ou</div>
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    onChange={value => this.handleField("data_inicial", value)}
                    name="data_inicial"
                    label="De"
                    disabled={this.props.alterar_dia}
                    // validate={required}
                  />
                </div>
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    onChange={value => this.handleField("data_final", value)}
                    name="data_final"
                    label="Até"
                    disabled={this.props.alterar_dia}
                    // validate={required}
                  />
                </div>

              </div>

              <div className="form-row">
                <Field
                  component={LabelAndCombo}
                  name="motivo"
                  label="Motivo"
                  options={motivosList}

                  validate={required}
                />
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
                  `substituicoes_${period.nome}.periodo`,
                  period.uuid
                );

                return (
                  <FormSection name={`substituicoes_${period.nome}`}>
                    <div className="form-row">
                      <Field component={"input"} type="hidden" name="value" />
                      <div className="form-check col-md-3 mr-4 ml-4">
                        <div
                          className="pl-5 pt-2 pb-2"
                          style={{
                            marginLeft: "-1.4rem",
                            background: colors[period.nome.toLowerCase()],
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
                                  `substituicoes_${period.nome}.check`,
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
                          {/* !!!! */}
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
                          // disabled={
                          //   options[period.nome].length === 0 || !checkMap[period.nome]
                          // }
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

const AlteracaoCardapioForm = reduxForm({
  form: "alteracaoCardapio",
  enableReinitialize: true
})(AlteracaoCardapio);
const selector = formValueSelector("alteracaoCardapio");

const mapStateToProps = state => {
  return {
    initialValues: state.alteracaoCardapio.data,
    // TODO: Desacoplar do nome dos períodos escolares
    substituicoes_MANHA: selector(state, "substituicoes_MANHA"),
    substituicoes_TARDE: selector(state, "substituicoes_TARDE"),
    substituicoes_NOITE: selector(state, "substituicoes_NOITE"),
    substituicoes_INTEGRAL: selector(state, "substituicoes_INTEGRAL"),
    data_inicial: selector(state, "data_inicial"),
    data_final: selector(state, "data_final"),
    alterar_dia: selector(state, "alterar_dia")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadAlteracaoCardapio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoCardapioForm);
