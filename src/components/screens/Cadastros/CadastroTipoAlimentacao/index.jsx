import React, { Component, Fragment } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import { Botao } from "../../../Shareable/Botao";
import Wizard from "../../../Shareable/Wizard";
import { ModalCadastroTipoAlimentacao } from "./components/ModalCadastroTipoAlimentacao";
import { getVinculosTipoAlimentacao } from "../../../../services/cadastroTipoAlimentacao.service";
import "./style.scss";

import {
  pegaDadosdeUnidadeEscolar,
  criaArraydePeriodosEscolares,
  criaArrayDeTiposAlimentacao,
  adicionaCheckAObjetos,
  pegaDadosdeUnidadeEscolarOriginal
} from "./helper";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";

class CadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,

      dadosEscolares: null,
      tipoUnidadeSelect: null,
      currentTipoAlimentacao: 0,
      showModal: false,
      dadosWizard: null,
      redirect: false,

      dadosTipoAlimentacaoPorUe: null,
      dadosTipoAlimentacaoOriginal: null,
      currentStep: 0,
      unidadesEscolares: null,
      meusDados: null,
      uuidUnidadeEscolar: null,
      periodosEscolares: null,
      tiposAlimentacao: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  montaTipoUnidadeEscolar = tiposUnidades => {
    let unidadesEscolares = [{ nome: "Selecione a unidade", uuid: "" }];

    tiposUnidades &&
      tiposUnidades.forEach(tipoUnidade => {
        unidadesEscolares.push({
          nome: tipoUnidade.iniciais,
          uuid: tipoUnidade.uuid
        });
      });

    if (this.state.unidadesEscolares === null) {
      this.setState({
        unidadesEscolares
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    let unidadesEscolares = this.state.unidadesEscolares;
    const { meusDados } = this.props;
    if (meusDados !== prevState.meusDados) {
      this.setState({ meusDados });
      if (this.state.load === false) {
        this.setState({ load: true });
      }
    }

    if (unidadesEscolares === null && this.props.tiposUnidadesEscolar) {
      this.montaTipoUnidadeEscolar(this.props.tiposUnidadesEscolar);
    }
  }

  getDadosTipoUnidadeEscolar = uuid => {
    getVinculosTipoAlimentacao().then(response => {
      const dadosTipoAlimentacaoOriginal = pegaDadosdeUnidadeEscolarOriginal(
        uuid,
        response.results
      );
      let dadosTipoAlimentacaoPorUe = pegaDadosdeUnidadeEscolar(
        uuid,
        response.results
      );
      let periodosEscolares = criaArraydePeriodosEscolares(
        dadosTipoAlimentacaoPorUe
      );

      let tiposAlimentacao = criaArrayDeTiposAlimentacao(
        dadosTipoAlimentacaoPorUe
      );

      dadosTipoAlimentacaoPorUe = adicionaCheckAObjetos(
        dadosTipoAlimentacaoPorUe
      );

      this.setState({
        dadosTipoAlimentacaoOriginal,
        dadosTipoAlimentacaoPorUe,
        periodosEscolares,
        uuidUnidadeEscolar: uuid,
        tiposAlimentacao
      });
    });
  };

  setaIndiceTipoAlimentacao = indice => {
    let currentTipoAlimentacao = this.state.currentTipoAlimentacao;
    if (indice !== currentTipoAlimentacao) {
      this.setState({ currentTipoAlimentacao: indice });
    }
  };

  adicionaItemASubstituicoes = (currentStep, currentTipoAlimentacao) => {
    let dadosTipoAlimentacaoPorUe = this.state.dadosTipoAlimentacaoPorUe;
    let arrayPossibilidades = [];
    dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
      currentTipoAlimentacao
    ].possibilidades.forEach((possibilidade, index) => {
      if (possibilidade.check) {
        possibilidade.check = false;

        dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
          currentTipoAlimentacao
        ].substituicoes.push(possibilidade);

        arrayPossibilidades.push(possibilidade);

        dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
          currentTipoAlimentacao
        ].possibilidades.splice(index, 1);
      }
    });

    this.setState({ dadosTipoAlimentacaoPorUe });
  };

  adicionaItemAPossibilidades = (currentStep, currentTipoAlimentacao) => {
    let dadosTipoAlimentacaoPorUe = this.state.dadosTipoAlimentacaoPorUe;
    dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
      currentTipoAlimentacao
    ].substituicoes.forEach((combinacao, index) => {
      if (combinacao.check) {
        combinacao.check = false;

        dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
          currentTipoAlimentacao
        ].possibilidades.push(combinacao);

        dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
          currentTipoAlimentacao
        ].substituicoes.splice(index, 1);
      }
    });
    this.setState({ dadosTipoAlimentacaoPorUe });
  };

  setaCheckTipoAlimentacao = (
    currentStep,
    currentTipoAlimentacao,
    indice,
    condicao
  ) => {
    let dadosTipoAlimentacaoPorUe = this.state.dadosTipoAlimentacaoPorUe;
    dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
      currentTipoAlimentacao
    ].possibilidades[indice].check = !condicao;

    this.setState({ dadosTipoAlimentacaoPorUe });
  };

  setaCheckCombinacaoAlimentacao = (
    currentStep,
    currentTipoAlimentacao,
    indice,
    condicao
  ) => {
    let dadosTipoAlimentacaoPorUe = this.state.dadosTipoAlimentacaoPorUe;
    dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
      currentTipoAlimentacao
    ].substituicoes[indice].check = !condicao;

    this.setState({ dadosTipoAlimentacaoPorUe });
  };

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  onSubmit() {
    let dadosTipoAlimentacaoPorUe = this.state.dadosTipoAlimentacaoPorUe;
    dadosTipoAlimentacaoPorUe.forEach(tipoAlimentacao => {
      let data = {
        tipo_unidade_escolar: tipoAlimentacao.uuid,
        periodo_escolar: tipoAlimentacao.periodo_escolar.uuid,
        substituicoes: [
          {
            tipo_alimentacao: null,
            substituicoes: [],
            possibilidades: []
          }
        ]
      };

      let possibilidadesArray = [];
      let substituicoesArray = [];

      tipoAlimentacao.substituicoes.forEach(substituicao => {
        data.substituicoes[0].tipo_alimentacao =
          substituicao.tipo_alimentacao.uuid;
        substituicoesArray = substituicao.substituicoes;
        possibilidadesArray = substituicao.substituicoes.concat(
          substituicao.possibilidades
        );
      });

      possibilidadesArray.forEach(possibilidade => {
        data.substituicoes[0].possibilidades.push(possibilidade.uuid);
      });

      substituicoesArray.forEach(substituicao => {
        data.substituicoes[0].substituicoes.push(substituicao.uuid);
      });

      console.log(data);
    });
  }

  render() {
    const {
      dadosTipoAlimentacaoPorUe,
      uuidUnidadeEscolar,
      unidadesEscolares,
      currentStep,
      currentTipoAlimentacao,
      showModal
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <ModalCadastroTipoAlimentacao
          closeModal={this.closeModal}
          showModal={showModal}
          onSubmit={this.onSubmit}
          tiposAlimentacoes={dadosTipoAlimentacaoPorUe}
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
                    options={unidadesEscolares ? unidadesEscolares : []}
                    onChange={event => {
                      this.getDadosTipoUnidadeEscolar(event.target.value);
                    }}
                  />
                </article>
              </section>
              {uuidUnidadeEscolar !== null && (
                <Fragment>
                  <Wizard
                    arrayOfObjects={dadosTipoAlimentacaoPorUe}
                    currentStep={currentStep}
                    nameItem="nome"
                  />
                  <section className="conteudo-step">
                    <nav>Tipo de alimentos atuais </nav>
                    <nav>Possibilidade</nav>
                    <nav />
                    <nav>Combinação</nav>

                    <div className="itens-tipo-alimentacao">
                      {dadosTipoAlimentacaoPorUe[currentStep].substituicoes.map(
                        (alimento, indice) => {
                          return indice === 0 ? (
                            alimento.substituicoes.length > 0 ? (
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
                                  {alimento.tipo_alimentacao.nome}{" "}
                                  <i className="fas fa-check" />
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
                                  <span>{alimento.tipo_alimentacao.nome}</span>
                                </a>
                              </Fragment>
                            )
                          ) : dadosTipoAlimentacaoPorUe[currentStep]
                              .substituicoes[indice - 1].substituicoes
                              .length === 0 ? (
                            <a
                              className="inativo"
                              key={indice}
                              href={`#${indice}`}
                              onClick={event => {
                                event.preventDefault();
                              }}
                            >
                              <span>{alimento.tipo_alimentacao.nome}</span>
                            </a>
                          ) : dadosTipoAlimentacaoPorUe[currentStep]
                              .substituicoes[indice].substituicoes.length >
                            0 ? (
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
                                {alimento.tipo_alimentacao.nome}{" "}
                                <i className="fas fa-check" />
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
                                <span>{alimento.tipo_alimentacao.nome}</span>
                              </a>
                            </Fragment>
                          );
                        }
                      )}
                    </div>

                    <div className="itens-possibilidades">
                      {dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
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
                      {dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
                        currentTipoAlimentacao
                      ].possibilidades.filter(v => v.check).length > 0 ? (
                        dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
                          currentTipoAlimentacao
                        ].substituicoes.filter(v => v.check).length > 0 ? (
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
                      ) : dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
                          currentTipoAlimentacao
                        ].substituicoes.filter(v => v.check).length > 0 ? (
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

                    {dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
                      currentTipoAlimentacao
                    ].substituicoes.length > 0 ? (
                      <div className="itens-combinacoes-check">
                        {dadosTipoAlimentacaoPorUe[currentStep].substituicoes[
                          currentTipoAlimentacao
                        ].substituicoes.map((substituicao, indice) => {
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
                                  substituicao.check
                                );
                              }}
                            >
                              <input
                                type="checkbox"
                                name={substituicao.nome}
                                value={substituicao.uuid}
                                checked={substituicao.check}
                              />
                              <label>{substituicao.nome}</label>
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
                      dadosTipoAlimentacaoPorUe[
                        currentStep
                      ].substituicoes.filter(v => v.substituicoes.length)
                        .length ===
                      dadosTipoAlimentacaoPorUe[currentStep].substituicoes
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
                        {dadosTipoAlimentacaoPorUe[
                          currentStep
                        ].substituicoes.filter(v => v.substituicoes.length)
                          .length ===
                        dadosTipoAlimentacaoPorUe[currentStep].substituicoes
                          .length ? (
                          currentStep + 1 < dadosTipoAlimentacaoPorUe.length ? (
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
                              onClick={() => this.showModal()}
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                            />
                          )
                        ) : currentStep + 1 <
                          dadosTipoAlimentacaoPorUe.length ? (
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
