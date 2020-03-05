import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { Select } from "../../Shareable/Select";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { Field, formValueSelector, reduxForm, FormSection } from "redux-form";
import { bindActionCreators } from "redux";
import { loadAlteracaoCardapioCei } from "../../../reducers/alteracaoCardapioReducer";
import { connect } from "react-redux";
import { Rascunhos } from "../Rascunhos";
import {
  required,
  textAreaRequired,
  numericInteger,
  minValue,
  maxValue
} from "../../../helpers/fieldValidators";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../../helpers/utilities";
import { InputComData } from "../../Shareable/DatePicker";
import { construirPeriodosECombos } from "../helper";
import { agregarDefault } from "../../../helpers/utilities";
import { faixaToString } from "../../../helpers/faixasEtarias";
import { getVinculosTipoAlimentacaoPorUnidadeEscolar } from "../../../services/cadastroTipoAlimentacao.service";
import "../style.scss";
import "./style.scss";
import { TextAreaWYSIWYG } from "../../Shareable/TextArea/TextAreaWYSIWYG";
import ModalDataPrioritaria from "../../Shareable/ModalDataPrioritaria";
import { toastSuccess, toastError } from "../../Shareable/Toast/dialogs";
import InputText from "../../Shareable/Input/InputText";
import { enviarAlteracaoCardapio } from "../../../services/alteracaoDecardapio.service";
import {
  getAlunosPorFaixaEtariaNumaData,
  getEscolaPeriodoEscolares,
  getMeusRascunhosAlteracoesCardapioCei,
  criaAlteracaoCardapioCei,
  iniciaFluxoAlteracaoCardapioCei,
  deleteAlteracaoCardapioCei
} from "../../../services/alteracaoDeCardapioCEI.service";
import { converterDDMMYYYYparaYYYYMMDD } from "../../../helpers/utilities";
import moment from "moment";
import { parseFormValues } from "./helper";

const ENTER = 13;

class AlteracaoCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodos: [],
      loading: true,
      alteracaoCardapioList: [],
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      substituicoesAlimentacao: [],
      substituicoesEdit: [],
      dataInicial: null,
      ultimaDataAlteracao: undefined,
      submitting: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate = async () => {
    const { meusDados, proximos_dois_dias_uteis, data_alteracao } = this.props;
    let {
      loading,
      periodos,
      substituicoesAlimentacao,
      ultimaDataAlteracao
    } = this.state;

    if (
      meusDados &&
      proximos_dois_dias_uteis &&
      loading &&
      periodos.length === 0
    ) {
      const vinculo = this.props.meusDados.vinculo_atual.instituicao
        .tipo_unidade_escolar;

      const response = await getVinculosTipoAlimentacaoPorUnidadeEscolar(
        vinculo
      );
      periodos = construirPeriodosECombos(response.results);
      const responsePeriodos = await getEscolaPeriodoEscolares();
      periodos.forEach(periodo => {
        const escolaPeriodoEscolar = responsePeriodos.data.results.find(
          r => r.periodo_escolar.nome === periodo.nome
        );
        periodo.escolaPeriodoEscolar = escolaPeriodoEscolar;
        this.montaObjetoDeSubstituicoesEdit(periodo);
      });
      this.setState({ periodos, loading: false });
    }

    if (substituicoesAlimentacao.length === 0) {
      periodos.forEach(periodo => {
        periodo["ck"] = null;
        substituicoesAlimentacao.push({ substituicoes: [] });
      });
    }

    if (data_alteracao && ultimaDataAlteracao !== data_alteracao) {
      for (let periodo of periodos) {
        const response = await getAlunosPorFaixaEtariaNumaData(
          periodo.escolaPeriodoEscolar.uuid,
          converterDDMMYYYYparaYYYYMMDD(data_alteracao)
        );
        periodo.alunosPorFaixaEtaria = response.data.results.sort(
          (a, b) => a.faixa_etaria.inicio - b.faixa_etaria.inicio
        );
        periodo.alunosPorFaixaEtaria.forEach(faixa => {
          faixa.validators = [
            numericInteger,
            minValue(0),
            maxValue(faixa.count)
          ];
        });
      }
      this.setState({ ultimaDataAlteracao: data_alteracao, periodos });
    }
  };

  componentDidMount() {
    this.refresh();
  }

  montaObjetoDeSubstituicoesEdit = periodo => {
    let substituicoesEdit = this.state.substituicoesEdit;
    substituicoesEdit.push({
      turno: periodo.nome,
      substituicoes: [],
      checked: false
    });
    this.setState({ substituicoesEdit });
  };

  retornaTurnoAlteracao = substituicao => {
    let substituicoesEdit = this.state.substituicoesEdit;
    let periodos = this.state.periodos;
    substituicoesEdit.forEach((item, indice) => {
      if (item.turno === substituicao.periodo_escolar.nome) {
        item.substituicoes = substituicao.tipo_alimentacao_de.substituicoes;
      }
      if (
        periodos[indice] &&
        periodos[indice].nome === substituicao.periodo_escolar.nome
      ) {
        periodos[indice].checado = true;
      }
    });
    this.setState({ substituicoesEdit, periodos });
  };

  retornaOpcoesAlteracao = (indice, param) => {
    const substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    if (indice === undefined) {
      param.substituicoes.forEach(substituicao => {
        this.retornaTurnoAlteracao(substituicao);
      });
      return [];
    } else {
      const substituicoes =
        substituicoesAlimentacao[indice].substituicoes !== null
          ? substituicoesAlimentacao[indice].substituicoes
          : [];
      return substituicoes;
    }
  };

  OnEditButtonClicked(param) {
    const alteracaoDeCardapio = param.alteracaoDeCardapio;
    this.props.loadAlteracaoCardapioCei(alteracaoDeCardapio);
    const periodos = this.state.periodos.map(periodo => {
      const index = alteracaoDeCardapio.substituicoes.findIndex(
        substituicao => substituicao.periodo_escolar.nome === periodo.nome
      );
      periodo.checked = index > -1;
      return periodo;
    });
    this.setState({ periodos });
  }

  refresh = async () => {
    let alteracaoCardapioList = this.state.alteracaoCardapioList;
    try {
      const response = await getMeusRascunhosAlteracoesCardapioCei();
      if (response.status === HTTP_STATUS.OK) {
        alteracaoCardapioList =
          response.data.results.length > 0 ? response.data.results : [];
        this.setState({
          alteracaoCardapioList
        });
      }
    } catch (error) {
      toastError("Houve um erro ao carregar Rascunhos Salvos", error);
    }
  };

  resetForm() {
    let { periodos } = this.state;
    this.props.loadAlteracaoCardapioCei(null);
    this.props.change("data_alteracao", "");
    this.props.change("motivo", "");
    this.props.change("observacao", "<p><p/>\n");
    periodos.forEach(periodo => {
      periodo.checked = false;
    });
    this.setState({
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dataInicial: null,
      periodos
    });
  }

  enviaAlteracaoCardapio(uuid) {
    enviarAlteracaoCardapio(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração de Cardápio enviada com sucesso");
          this.refresh();
          this.resetForm("alteracaoCardapio");
        } else {
          toastError("Houve um erro ao enviar a Alteração de Cardápio");
        }
      },
      function() {
        toastError("Houve um erro ao enviar a Alteração de Cardápio");
      }
    );
  }

  onSubmit = async (values, rascunho = false) => {
    this.setState({ submitting: true });
    const parsedValues = parseFormValues(values);
    parsedValues.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;

    const response = await criaAlteracaoCardapioCei(parsedValues);
    if (response.status === HTTP_STATUS.CREATED) {
      if (!rascunho) {
        const responseInicia = await iniciaFluxoAlteracaoCardapioCei(
          response.data.uuid
        );
        if (responseInicia.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração de Cardápio salva com sucesso");
          this.refresh();
          this.resetForm("alteracaoCardapio");
        } else {
          toastError(responseInicia.error);
        }
      } else {
        toastSuccess("Alteração de Cardápio salva com sucesso");
        this.refresh();
        this.resetForm("alteracaoCardapio");
      }
    }
    this.setState({ submitting: false });
  };

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  onAlterarDiaChanged(event) {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        event.target.value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  }

  OnDeleteButtonClicked = async (id_externo, uuid) => {
    if (window.confirm("Deseja remover este rascunho?")) {
      try {
        const response = await deleteAlteracaoCardapioCei(uuid);
        if (response.status === HTTP_STATUS.NO_CONTENT) {
          toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
          this.refresh();
        } else {
          toastError("Houve um erro ao excluir o rascunho");
        }
      } catch (error) {
        toastError("Houve um erro ao excluir o rascunho");
      }
    }
  };

  resetaTodoPeriodoCheck() {
    let periodos = this.state.periodos;
    periodos.forEach(periodo => {
      if (periodo.checado) {
        periodo.checado = false;
      }
    });
    this.setState({ periodos });
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  obtemDataInicial = value => {
    let dataInicial = this.state.dataInicial;
    dataInicial = moment(value, "DD/MM/YYYY").add(1, "days")["_d"];
    this.setState({ dataInicial });
  };

  limpaCamposAlteracaoDoPeriodo(periodo, periodoNome) {
    if (periodo.checked) {
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_de`,
        null
      );
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        null
      );
    }
  }

  atualizaPeriodoCheck(input, indice, periodoNome) {
    let periodos = this.state.periodos;
    this.limpaCamposAlteracaoDoPeriodo(periodos[indice], periodoNome);
    periodos[indice].checked = !periodos[indice].checked;
    this.props.change(input, periodos[indice].checked);
    this.setState({ periodos });
  }

  selectSubstituicoesAlimentacaoAPartirDe = (alimentacaoUUID, indice) => {
    let periodos = this.state.periodos;
    const tiposAlimentacao = periodos[indice].tipos_alimentacao;
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    tiposAlimentacao.forEach(tipoAlimentacao => {
      if (tipoAlimentacao.uuid === alimentacaoUUID) {
        substituicoesAlimentacao[indice].substituicoes =
          tipoAlimentacao.substituicoes;
        substituicoesAlimentacao[indice].uuidAlimentacao = alimentacaoUUID;
      }
    });
    this.setState({ substituicoesAlimentacao });
  };

  resetAlteracaoDoPeriodo(uuidInput, periodoNome, indice) {
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    if (substituicoesAlimentacao[indice].uuidAlimentacao !== uuidInput) {
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        null
      );
    }
  }

  render() {
    const {
      loading,
      alteracaoCardapioList,
      showModal,
      periodos,
      substituicoesAlimentacao,
      submitting
    } = this.state;
    const {
      data_alteracao,
      formValues,
      handleSubmit,
      meusDados,
      proximos_dois_dias_uteis,
      motivos,
      pristine
    } = this.props;
    return (
      <Fragment>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            className="mt-3"
            onSubmit={handleSubmit}
            onKeyPress={this.onKeyPress}
          >
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={
                meusDados.vinculo_atual.instituicao.quantidade_alunos
              }
            />

            {alteracaoCardapioList.length > 0 && (
              <section className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  alteracaoCardapioList={alteracaoCardapioList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </section>
            )}
            <section className="card  mt-3">
              <article className="card-body">
                <div
                  className="card-title font-weight-bold descricao"
                  style={this.fontHeader}
                >
                  Descrição da Alteração de Cardápio
                </div>
                <div className="header-alteracao-cei">
                  <section className="section-form-motivo">
                    <Field
                      component={Select}
                      name="motivo"
                      label="Motivo"
                      options={motivos}
                      validate={required}
                    />
                  </section>
                  <section className="section-form-datas">
                    <Field
                      component={InputComData}
                      onBlur={event => this.onAlterarDiaChanged(event)}
                      name="data_alteracao"
                      minDate={proximos_dois_dias_uteis}
                      label="Alterar dia"
                    />
                  </section>
                </div>
              </article>
              <hr />
              <article className="card-body">
                <header className="descricao-periodos-alimentacao">
                  <div>Período</div>
                  <div>Alterar alimentação de:</div>
                  <div>Para alimentação:</div>
                </header>
                {periodos.map((periodo, indice) => {
                  const formSectionName = `substituicoes_${periodo.nome}`;
                  this.props.change(`${formSectionName}.periodo`, periodo.uuid);
                  let totalAlunos = 0;
                  if (periodo.alunosPorFaixaEtaria) {
                    periodo.alunosPorFaixaEtaria.forEach(faixaEtaria => {
                      totalAlunos += faixaEtaria.count;
                    });
                  }
                  let totalSelecionados = 0;
                  if (
                    formValues &&
                    data_alteracao &&
                    periodo.checked &&
                    periodo.alunosPorFaixaEtaria
                  ) {
                    for (let [faixa, valor] of Object.entries(
                      formValues[formSectionName]
                    )) {
                      if (faixa.startsWith("qtde-faixa")) {
                        totalSelecionados += parseInt(valor);
                      }
                    }
                  }
                  return (
                    <FormSection name={formSectionName} key={indice}>
                      <div className="item-periodo-alimentacao">
                        <label
                          htmlFor="check"
                          className="checkbox-label"
                          style={{
                            background: periodo.style.background,
                            border: `1px solid ${periodo.style.borderColor}`
                          }}
                        >
                          <Field
                            component={"input"}
                            type="checkbox"
                            name="check"
                          />
                          <span
                            onClick={() =>
                              this.atualizaPeriodoCheck(
                                `substituicoes_${periodo.nome}.check`,
                                indice,
                                periodo.nome
                              )
                            }
                            className="checkbox-custom"
                            data-cy={`checkbox-${periodo.nome}`}
                          />
                          <div className=""> {periodo.nome}</div>
                        </label>
                        <Field
                          component={Select}
                          name="tipo_alimentacao_de"
                          options={agregarDefault(periodo.tipos_alimentacao)}
                          disabled={!periodo.checked}
                          onChange={event => {
                            this.resetAlteracaoDoPeriodo(
                              event.target.value,
                              periodo.nome,
                              indice
                            );
                            this.selectSubstituicoesAlimentacaoAPartirDe(
                              event.target.value,
                              indice
                            );
                          }}
                          validate={periodo.checado && required}
                        />

                        <Field
                          component={Select}
                          name="tipo_alimentacao_para"
                          disabled={!periodo.checked}
                          options={agregarDefault(
                            substituicoesAlimentacao.length > 0
                              ? substituicoesAlimentacao[indice].substituicoes
                              : []
                          )}
                          validate={periodo.checado && required}
                        />
                      </div>
                      {periodo.checked && periodo.alunosPorFaixaEtaria && (
                        <div>
                          <table className="table">
                            <thead className="thead-light">
                              <tr>
                                <th>Faixa Etária</th>
                                <th>Alunos Matriculados</th>
                                <th>Quantidade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {periodo.alunosPorFaixaEtaria.map(
                                (faixa, key) => (
                                  <tr key={key}>
                                    <td>{faixaToString(faixa.faixa_etaria)}</td>
                                    <td>{faixa.count}</td>
                                    <td>
                                      <Field
                                        component={InputText}
                                        name={`qtde-faixa-${
                                          faixa.faixa_etaria.uuid
                                        }`}
                                        validate={faixa.validators}
                                        type="number"
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                              <tr>
                                <th>Total{" >>"}</th>
                                <th>{totalAlunos}</th>
                                <th>{totalSelecionados}</th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </FormSection>
                  );
                })}
              </article>
              <hr />
              <article className="card-body">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  required
                  validate={textAreaRequired}
                />
              </article>
              <article className="card-body footer-button">
                <Botao
                  texto="Cancelar"
                  onClick={event => this.resetForm(event)}
                  disabled={pristine || submitting}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  disabled={pristine || submitting}
                  texto={this.state.salvarAtualizarLbl}
                  onClick={handleSubmit(values => this.onSubmit(values, true))}
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  texto="Enviar"
                  disabled={pristine || submitting}
                  type={BUTTON_TYPE.SUBMIT}
                  onClick={handleSubmit(values => this.onSubmit(values))}
                  style={BUTTON_STYLE.Primary}
                />
              </article>
            </section>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
          </form>
        )}
      </Fragment>
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
    formValues:
      state.form.alteracaoCardapio && state.form.alteracaoCardapio.values,
    data_alteracao: selector(state, "data_alteracao"),
    motivo: selector(state, "motivo"),
    observacao: selector(state, "observacao")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadAlteracaoCardapioCei
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoCardapioForm);
