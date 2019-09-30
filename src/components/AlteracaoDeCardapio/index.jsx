import React, { Component, Fragment } from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Select } from "../Shareable/Select";
import HTTP_STATUS from "http-status-codes";
import CardMatriculados from "../Shareable/CardMatriculados";
import { Field, formValueSelector, reduxForm, FormSection } from "redux-form";
import { bindActionCreators } from "redux";
import { loadAlteracaoCardapio } from "../../reducers/alteracaoCardapioReducer";
import { connect } from "react-redux";
import { Rascunhos } from "./Rascunhos";
import { required } from "../../helpers/fieldValidators";
import { LabelAndCombo } from "../Shareable/labelAndInput/labelAndInput";
import { deleteAlteracaoCardapio } from "../../services/alteracaoDecardapio.service";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import { InputComData } from "../Shareable/DatePicker";
import { InputText } from "../Shareable/Input/InputText";
import { montaPeriodoDeAlteracao } from "./helper";
import { formatarParaMultiselect } from "../../helpers/utilities";
import { agregarDefault } from "../../helpers/utilities";
import "./style.scss";

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
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",

      substituicoesAlimentacao: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.periodos.length === 0 && this.props.periodos.length > 0) {
      let periodos = this.state.periodos;
      let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
      this.props.periodos.forEach((periodo, indice) => {
        substituicoesAlimentacao.push({ substituicoes: null });
        periodos.push(montaPeriodoDeAlteracao(periodo));
      });
      this.setState({ periodos });
    }
    const { motivos, meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading, periodos } = this.state;
    if (
      motivos !== [] &&
      periodos !== [] &&
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      loading
    ) {
      this.setState({
        loading: false
      });
    }
  }

  resetAlteracao() {
    console.log(this.props);
    this.props.reset("values.substituicoes_MANHA.tipo_alimentacao_para");
  }

  atualizaPeriodoCheck(input, indice) {
    let periodos = this.state.periodos;
    periodos[indice].checado = !periodos[indice].checado;
    this.props.change(input, periodos[indice].checado);
    this.setState({ periodos });
  }

  handleSelectedChanged = (selectedOptions, periodo) => {
    let opcoesDe = this.state.opcoesDe;
    opcoesDe[periodo.nome] = selectedOptions;
    this.setState({
      ...this.state,
      opcoesDe: opcoesDe
    });
    this.props.change(
      `substituicoes_${periodo.nome}.tipo_de_refeicao`,
      selectedOptions
    );
  };

  selectSubstituicoesAlimentacaoAPartirDe = (alimentacaoUUID, indice) => {
    let periodos = this.state.periodos;
    const tiposAlimentacao = periodos[indice].tipos_alimentacao;
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    tiposAlimentacao.forEach(tipoAlimentacao => {
      if (tipoAlimentacao.uuid === alimentacaoUUID) {
        substituicoesAlimentacao[indice].substituicoes =
          tipoAlimentacao.substituicoes;
      }
    });
    this.setState({ substituicoesAlimentacao });
  };

  render() {
    const {
      loading,
      alteracaoCardapioList,
      periodos,
      substituicoesAlimentacao
    } = this.state;
    const {
      handleSubmit,
      meusDados,
      proximos_dois_dias_uteis,
      motivos
    } = this.props;
    return (
      <Fragment>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form className="mt-3" onSubmit={handleSubmit}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={meusDados.escolas[0].quantidade_alunos}
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
                  className="card-title font-weight-bold"
                  style={this.fontHeader}
                >
                  Descrição da Alteração
                </div>
                <section className="section-form-datas mt-4">
                  <Field
                    component={InputComData}
                    //onBlur={event => this.onAlterarDiaChanged(event)}
                    name="alterar_dia"
                    minDate={proximos_dois_dias_uteis}
                    label="Alterar dia"
                    disabled={this.props.data_inicial || this.props.data_final}
                  />
                  <div className="opcao-data">Ou</div>
                  <Field
                    component={InputComData}
                    name="data_inicial"
                    label="De"
                    disabled={this.props.alterar_dia}
                  />
                  <Field
                    component={InputComData}
                    name="data_final"
                    label="Até"
                    disabled={this.props.alterar_dia}
                  />
                </section>
                <section className="section-form-motivo mt-3">
                  <Field
                    component={LabelAndCombo}
                    name="motivo"
                    label="Motivo"
                    options={motivos}
                    validate={required}
                  />
                </section>
              </article>
              <hr />
              <article className="card-body">
                <header className="descricao-periodos-alimentacao">
                  <div>Período</div>
                  <div>Alterar alimentação de:</div>
                  <div>Para alimentação:</div>
                  <div>N° de alunos</div>
                </header>

                {periodos.map((periodo, indice) => {
                  this.props.change(
                    `substituicoes_${periodo.nome}.periodo`,
                    periodo.uuid
                  );
                  return (
                    <FormSection
                      name={`substituicoes_${periodo.nome}`}
                      className="item-periodo-alimentacao"
                      key={indice}
                    >
                      <Fragment>
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
                            onClick={() => {
                              this.atualizaPeriodoCheck(
                                `substituicoes_${periodo.nome}.check`,
                                indice,
                                periodo.nome
                              );
                              this.resetAlteracao();
                            }}
                            className="checkbox-custom"
                          />
                          <div className=""> {periodo.nome}</div>
                        </label>
                      </Fragment>

                      <Field
                        component={Select}
                        name="tipo_alimentacao_de"
                        options={agregarDefault(periodo.tipos_alimentacao)}
                        disabled={!periodo.checado}
                        onChange={event => {
                          this.selectSubstituicoesAlimentacaoAPartirDe(
                            event.target.value,
                            indice
                          );
                        }}
                      />

                      <Field
                        component={Select}
                        name="tipo_alimentacao_para"
                        disabled={!periodo.checado}
                        options={agregarDefault(
                          substituicoesAlimentacao[indice].substituicoes !==
                            null
                            ? substituicoesAlimentacao[indice].substituicoes
                            : []
                        )}
                      />

                      <Field
                        component={InputText}
                        type="number"
                        name="numero_de_alunos"
                        min="0"
                        className="form-control"
                      />
                    </FormSection>
                  );
                })}
              </article>
            </section>
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
    initialValues: state.alteracaoCardapio.data
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
