import React, { Component, Fragment } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import { Botao } from "../../../Shareable/Botao";
import Wizard from "../../../Shareable/Wizard";
import { ModalCadastroTipoAlimentacao } from "./components/ModalCadastroTipoAlimentacao";
import "./style.scss";

import { getDadosUnidadeEscolar, adicionaCheckPossibilidades } from "./helper";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";

class CadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      uuidUnidadeEscolar: null,
      load: false,
      unidadesEscolares: [],
      dadosEscolares: null,
      tipoUnidadeSelect: null,
      currentStep: 0,
      currentTipoAlimentacao: 0,
      showModal: false,
      dadosWizard: null,
      redirect: false
    };
    this.closeModal = this.closeModal.bind(this);
  }

  montaTipoUnidadeEscolar = data => {
    let unidadesEscolares = this.state.unidadesEscolares;
    unidadesEscolares.push({ nome: "Selecione a unidade", uuid: "" });
    data.forEach(unidadeEscolar => {
      unidadesEscolares.push({
        nome: unidadeEscolar.tipo_ue,
        uuid: unidadeEscolar.uuid
      });
    });

    const dadosEscolares = adicionaCheckPossibilidades(data);

    this.setState({
      unidadesEscolares,
      dadosEscolares
    });
  };

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  // renderizarRedirecionamentoParaPedidos = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to={`/${ESCOLA}/${ALTERACAO_CARDAPIO}`} />;
  //   }
  // };

  requestDadosEscolares() {
    getDadosUnidadeEscolar().then(response => {
      this.montaTipoUnidadeEscolar(response.data);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { meusDados } = this.props;
    if (meusDados !== prevState.meusDados) {
      this.setState({ meusDados });
      if (this.state.load === false) {
        this.setState({ load: true });
        this.requestDadosEscolares();
      }
    }
  }

  getDadosTipoUnidadeEscolar = value => {
    const dadosEscolares = this.state.dadosEscolares;
    dadosEscolares.forEach(escola => {
      if (escola.uuid === value) {
        this.setState({ tipoUnidadeSelect: escola });
      }
    });
  };

  setaIndiceTipoAlimentacao = indice => {
    let currentTipoAlimentacao = this.state.currentTipoAlimentacao;
    if (indice !== currentTipoAlimentacao) {
      this.setState({ currentTipoAlimentacao: indice });
    }
  };

  adicionaItemASubstituicoes = (currentStep, currentTipoAlimentacao) => {
    let tipoUnidadeSelect = this.state.tipoUnidadeSelect;
    let arrayPossibilidades = [];
    tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
      currentTipoAlimentacao
    ].possibilidades.forEach((possibilidade, index) => {
      if (possibilidade.check) {
        possibilidade.check = false;

        tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
          currentTipoAlimentacao
        ].combinacoes.push(possibilidade);

        arrayPossibilidades.push(possibilidade);

        tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
          currentTipoAlimentacao
        ].possibilidades.splice(index, 1);
      }
    });

    this.setState({ tipoUnidadeSelect });
  };

  adicionaItemAPossibilidades = (currentStep, currentTipoAlimentacao) => {
    let tipoUnidadeSelect = this.state.tipoUnidadeSelect;
    tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
      currentTipoAlimentacao
    ].combinacoes.forEach((combinacao, index) => {
      if (combinacao.check) {
        combinacao.check = false;

        tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
          currentTipoAlimentacao
        ].possibilidades.push(combinacao);

        tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
          currentTipoAlimentacao
        ].combinacoes.splice(index, 1);
      }
    });
    this.setState({ tipoUnidadeSelect });
  };

  setaCheckTipoAlimentacao = (
    currentStep,
    currentTipoAlimentacao,
    indice,
    condicao
  ) => {
    let tipoUnidadeSelect = this.state.tipoUnidadeSelect;
    tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
      currentTipoAlimentacao
    ].possibilidades[indice].check = !condicao;

    this.setState({ tipoUnidadeSelect });
  };

  setaCheckCombinacaoAlimentacao = (
    currentStep,
    currentTipoAlimentacao,
    indice,
    condicao
  ) => {
    let tipoUnidadeSelect = this.state.tipoUnidadeSelect;
    tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
      currentTipoAlimentacao
    ].combinacoes[indice].check = !condicao;

    this.setState({ tipoUnidadeSelect });
  };

  obtemDadosDoWizard = (uuidUnidadeEscolar, dadosEscolares) => {
    dadosEscolares.forEach(dadoEscolar => {
      if (dadoEscolar.uuid === uuidUnidadeEscolar) {
        this.setState({ dadosWizard: dadoEscolar });
      }
    });
    this.showModal();
  };

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      uuidUnidadeEscolar,
      unidadesEscolares,
      tipoUnidadeSelect,
      currentStep,
      currentTipoAlimentacao,
      dadosEscolares,
      showModal,
      dadosWizard
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <ModalCadastroTipoAlimentacao
          closeModal={this.closeModal}
          showModal={showModal}
          tiposAlimentacoes={dadosWizard}
          // setRedirect={this.setRedirect.bind(this)}
        />
        <div className="card mt-3">
          <div className="card-body formulario-tipo-alimentacao">
            <form onSubmit={handleSubmit}>
              <section className="header">
                Cruzamento das possibilidades
              </section>
              <section className="tipos-de-unidade">
                <header>Tipos de Unidades</header>
                <article>
                  <Field
                    component={Select}
                    name="tipos_unidades"
                    options={unidadesEscolares}
                    onChange={event => {
                      this.getDadosTipoUnidadeEscolar(event.target.value);
                      this.setState({
                        uuidUnidadeEscolar: event.target.value
                      });
                    }}
                  />
                </article>
              </section>
              {uuidUnidadeEscolar !== null && (
                <Fragment>
                  <Wizard
                    arrayOfObjects={tipoUnidadeSelect.periodos}
                    currentStep={currentStep}
                    nameItem="turno"
                  />
                  <section className="conteudo-step">
                    <nav>Tipo de alimentos atuais </nav>
                    <nav>Possibilidade</nav>
                    <nav />
                    <nav>Combinação</nav>

                    <div className="itens-tipo-alimentacao">
                      {tipoUnidadeSelect.periodos[
                        currentStep
                      ].tipos_alimentos.map((alimento, indice) => {
                        return indice === 0 ? (
                          alimento.combinacoes.length > 0 ? (
                            <a
                              className="passou"
                              key={indice}
                              href={`#${indice}`}
                              onClick={event => {
                                event.preventDefault();
                                this.setaIndiceTipoAlimentacao(indice);
                              }}
                            >
                              <span>
                                {alimento.nome} <i className="fas fa-check" />
                              </span>
                            </a>
                          ) : (
                            <Fragment>
                              {this.setaIndiceTipoAlimentacao(indice)}
                              <a
                                className="ativo"
                                key={indice}
                                href={`#${indice}`}
                                onClick={event => {
                                  event.preventDefault();
                                }}
                              >
                                <span>{alimento.nome}</span>
                              </a>
                            </Fragment>
                          )
                        ) : tipoUnidadeSelect.periodos[currentStep]
                            .tipos_alimentos[indice - 1].combinacoes.length ===
                          0 ? (
                          <a
                            className="inativo"
                            key={indice}
                            href={`#${indice}`}
                            onClick={event => {
                              event.preventDefault();
                            }}
                          >
                            <span>{alimento.nome}</span>
                          </a>
                        ) : tipoUnidadeSelect.periodos[currentStep]
                            .tipos_alimentos[indice].combinacoes.length > 0 ? (
                          <a
                            className="passou"
                            key={indice}
                            href={`#${indice}`}
                            onClick={event => {
                              event.preventDefault();
                              this.setaIndiceTipoAlimentacao(indice);
                            }}
                          >
                            <span>
                              {alimento.nome} <i className="fas fa-check" />
                            </span>
                          </a>
                        ) : (
                          <Fragment>
                            <a
                              className="ativo"
                              key={indice}
                              href={`#${indice}`}
                              onClick={event => {
                                event.preventDefault();
                                this.setaIndiceTipoAlimentacao(indice);
                              }}
                            >
                              <span>{alimento.nome}</span>
                            </a>
                          </Fragment>
                        );
                      })}
                    </div>

                    <div className="itens-possibilidades">
                      {tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
                        currentTipoAlimentacao
                      ].possibilidades.map((possibilidade, indice) => {
                        return (
                          <div
                            key={indice}
                            className="input-possibilidade"
                            onClick={event => {
                              event.preventDefault();
                              this.setaCheckTipoAlimentacao(
                                currentStep,
                                currentTipoAlimentacao,
                                indice,
                                possibilidade.check
                              );
                            }}
                          >
                            <input
                              type="checkbox"
                              name={possibilidade.nome}
                              value={possibilidade.uuid}
                              checked={possibilidade.check}
                            />
                            <label>{possibilidade.nome}</label>
                          </div>
                        );
                      })}
                    </div>

                    <div className="funcoes">
                      {tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
                        currentTipoAlimentacao
                      ].possibilidades.filter(v => v.check).length > 0 ? (
                        tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
                          currentTipoAlimentacao
                        ].combinacoes.filter(v => v.check).length > 0 ? (
                          <Fragment>
                            <a
                              href="#0"
                              className="ativo-pass"
                              onClick={event => {
                                event.preventDefault();
                                this.adicionaItemASubstituicoes(
                                  currentStep,
                                  currentTipoAlimentacao
                                );
                              }}
                            >
                              <i className="fas fa-chevron-right" />
                            </a>
                            <a
                              href="#1"
                              className="ativo-pass"
                              onClick={event => {
                                event.preventDefault();
                                this.adicionaItemAPossibilidades(
                                  currentStep,
                                  currentTipoAlimentacao
                                );
                              }}
                            >
                              <i className="fas fa-chevron-left" />
                            </a>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <a
                              href="#0"
                              className="ativo-pass"
                              onClick={event => {
                                event.preventDefault();
                                this.adicionaItemASubstituicoes(
                                  currentStep,
                                  currentTipoAlimentacao
                                );
                              }}
                            >
                              <i className="fas fa-chevron-right" />
                            </a>
                            <a
                              href="#1"
                              onClick={event => {
                                event.preventDefault();
                              }}
                            >
                              <i className="fas fa-chevron-left" />
                            </a>
                          </Fragment>
                        )
                      ) : tipoUnidadeSelect.periodos[
                          currentStep
                        ].tipos_alimentos[
                          currentTipoAlimentacao
                        ].combinacoes.filter(v => v.check).length > 0 ? (
                        <Fragment>
                          <a
                            href="#1"
                            onClick={event => {
                              event.preventDefault();
                            }}
                          >
                            <i className="fas fa-chevron-right" />
                          </a>
                          <a
                            href="#1"
                            className="ativo-pass"
                            onClick={event => {
                              event.preventDefault();
                              this.adicionaItemAPossibilidades(
                                currentStep,
                                currentTipoAlimentacao
                              );
                            }}
                          >
                            <i className="fas fa-chevron-left" />
                          </a>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <a
                            href="#1"
                            onClick={event => {
                              event.preventDefault();
                            }}
                          >
                            <i className="fas fa-chevron-right" />
                          </a>
                          <a
                            href="#1"
                            onClick={event => {
                              event.preventDefault();
                            }}
                          >
                            <i className="fas fa-chevron-left" />
                          </a>
                        </Fragment>
                      )}
                    </div>

                    {tipoUnidadeSelect.periodos[currentStep].tipos_alimentos[
                      currentTipoAlimentacao
                    ].combinacoes.length > 0 ? (
                      <div className="itens-combinacoes-check">
                        {tipoUnidadeSelect.periodos[
                          currentStep
                        ].tipos_alimentos[
                          currentTipoAlimentacao
                        ].combinacoes.map((combinacao, indice) => {
                          return (
                            <div
                              key={indice}
                              className="input-possibilidade"
                              onClick={event => {
                                event.preventDefault();
                                this.setaCheckCombinacaoAlimentacao(
                                  currentStep,
                                  currentTipoAlimentacao,
                                  indice,
                                  combinacao.check
                                );
                              }}
                            >
                              <input
                                type="checkbox"
                                name={combinacao.nome}
                                value={combinacao.uuid}
                                checked={combinacao.check}
                              />
                              <label>{combinacao.nome}</label>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="itens-combinacoes" />
                    )}
                  </section>
                  <section className="adicionar-alimentacao">
                    <a href="#0" onClick={event => event.preventDefault()}>
                      <span>
                        <u>Adicionar Alimentação</u>
                      </span>
                    </a>
                  </section>

                  <section className="botao-footer">
                    {currentStep === 0 ? (
                      tipoUnidadeSelect.periodos[
                        currentStep
                      ].tipos_alimentos.filter(v => v.combinacoes.length)
                        .length ===
                      tipoUnidadeSelect.periodos[currentStep].tipos_alimentos
                        .length ? (
                        <Fragment>
                          <Botao
                            texto={"Próximo"}
                            onClick={() => {
                              this.setState({
                                currentStep: currentStep + 1,
                                currentTipoAlimentacao: 0
                              });
                            }}
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                          />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Botao
                            texto={"Próximo"}
                            className="desabilitado"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN}
                          />
                        </Fragment>
                      )
                    ) : (
                      <Fragment>
                        <Botao
                          texto={"Anterior"}
                          onClick={() => {
                            this.setState({
                              currentStep: currentStep - 1,
                              currentTipoAlimentacao: 0
                            });
                          }}
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                        {tipoUnidadeSelect.periodos[
                          currentStep
                        ].tipos_alimentos.filter(v => v.combinacoes.length)
                          .length ===
                        tipoUnidadeSelect.periodos[currentStep].tipos_alimentos
                          .length ? (
                          currentStep + 1 <
                          tipoUnidadeSelect.periodos.length ? (
                            <Botao
                              texto={"Próximo"}
                              className="ml-3"
                              onClick={() => {
                                this.setState({
                                  currentStep: currentStep + 1,
                                  currentTipoAlimentacao: 0
                                });
                              }}
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                            />
                          ) : (
                            <Botao
                              texto={"Finalizar"}
                              className="ml-3"
                              onClick={() =>
                                this.obtemDadosDoWizard(
                                  uuidUnidadeEscolar,
                                  dadosEscolares
                                )
                              }
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                            />
                          )
                        ) : currentStep + 1 <
                          tipoUnidadeSelect.periodos.length ? (
                          <Fragment>
                            <Botao
                              texto={"Próximo"}
                              className="desabilitado ml-3"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                            />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Botao
                              texto={"Finalizar"}
                              className="desabilitado ml-3"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                            />
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </section>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const TipoDeAlimentacaoForm = reduxForm({
  form: "TipoDeAlimentacaoForm",
  enableReinitialize: true
})(CadastroTipoAlimentacao);
const selector = formValueSelector("TipoDeAlimentacaoForm");
const mapStateToProps = state => {
  return {
    initialValues: state.TipoDeAlimentacaoForm.data,
    tipos_unidades: selector(state, "tipos_unidades")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadTipoAlimentacao
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TipoDeAlimentacaoForm);
