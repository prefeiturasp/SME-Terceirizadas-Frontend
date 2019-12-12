import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import Wizard from "../../../Shareable/Wizard";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import {
  getVinculosTipoAlimentacaoPorUnidadeEscolar,
  getTiposDeAlimentacao,
  createVinculoTipoAlimentacaoPeriodoEscolar,
  deleteVinculoTipoAlimentacaoPeriodoEscolar,
  createVinculoSubstituicaoPeriodoEscolar,
  deleteSubstituicaoTipoAlimentacaoPeriodoEscolar
} from "../../../../services/cadastroTipoAlimentacao.service";
import {
  montaTipoUnidadeEscolar,
  adicionarComboVazio,
  montaLabelCombo,
  podeAdicionarElemento,
  podeAdicionarElementoSubstituicao
} from "./helper";
import "./style.scss";
import { toastError } from "../../../Shareable/Toast/dialogs";

class CadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      unidadesEscolares: null,
      uuidUnidadeEscolar: null,
      vinculosTiposAlimentacao: null,
      combosAtuais: null,

      tiposAlimentacao: null,
      formComboAlimentacao: true,

      tipoAlimentacaoAtual: 0,
      atualizaCombo: false
    };
  }

  componentDidMount() {
    let tiposAlimentacao = this.state.tiposAlimentacao;
    if (!tiposAlimentacao) {
      getTiposDeAlimentacao().then(response => {
        this.setState({ tiposAlimentacao: response.results });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let unidadesEscolares = this.state.unidadesEscolares;
    let uuidUnidadeEscolar = this.state.uuidUnidadeEscolar;
    let vinculosTiposAlimentacao = this.state.vinculosTiposAlimentacao;
    let combosAtuais = this.state.combosAtuais;
    let atualizaCombo = this.state.atualizaCombo;
    const currentStep = this.state.currentStep;
    if (this.state.formComboAlimentacao) {
      if (unidadesEscolares === null && this.props.tiposUnidadesEscolar) {
        unidadesEscolares = montaTipoUnidadeEscolar(
          this.props.tiposUnidadesEscolar
        );
        this.setState({ unidadesEscolares });
      }

      if (
        uuidUnidadeEscolar !== prevState.uuidUnidadeEscolar &&
        vinculosTiposAlimentacao === prevState.vinculosTiposAlimentacao
      ) {
        getVinculosTipoAlimentacaoPorUnidadeEscolar(uuidUnidadeEscolar).then(
          response => {
            vinculosTiposAlimentacao = response.results;
            if (response.results.length === 0) {
              this.setState({ uuidUnidadeEscolar: null });
              toastError(
                "Nenhum registro associado ao tipo de unidade escolar"
              );
            } else {
              combosAtuais = adicionarComboVazio(
                vinculosTiposAlimentacao[currentStep].combos,
                vinculosTiposAlimentacao[currentStep].uuid
              );
              this.setState({
                vinculosTiposAlimentacao,
                combosAtuais
              });
            }
          }
        );
      }
    } else {
      if (
        vinculosTiposAlimentacao === prevState.vinculosTiposAlimentacao &&
        combosAtuais === prevState.combosAtuais
      ) {
        combosAtuais.forEach(comboAtual => {
          if (
            comboAtual.substituicoes &&
            comboAtual.substituicoes.length === 0
          ) {
            comboAtual.substituicoes.push({
              uuid: null,
              tipos_alimentacao: [],
              combo: null,
              label: ""
            });
          }
        });
        if (!atualizaCombo) {
          this.setState({ combosAtuais, atualizaCombo: true });
        }

        getVinculosTipoAlimentacaoPorUnidadeEscolar(uuidUnidadeEscolar).then(
          response => {
            vinculosTiposAlimentacao = response.results;
            vinculosTiposAlimentacao[currentStep].combos.forEach(combo => {
              combo.substituicoes.push({
                uuid: null,
                combo: combo.uuid,
                label: "",
                tipos_alimentacao: [],
                adicionar: true
              });
            });
            if (
              this.state.vinculosTiposAlimentacao !==
              prevState.vinculosTiposAlimentacao
            ) {
              this.setState({ vinculosTiposAlimentacao });
            }
          }
        );
      }
    }
  }

  adicionaTipoAlimentacaoAoCombo = tipoAlimentacao => {
    let combosAtuais = this.state.combosAtuais;
    combosAtuais.forEach(combo => {
      if (combo.adicionar && podeAdicionarElemento(combo, tipoAlimentacao)) {
        combo.tipos_alimentacao.push(tipoAlimentacao.uuid);
        montaLabelCombo(combo, tipoAlimentacao.nome);
      }
    });
    this.setState({ combosAtuais });
  };

  adicionaSubstituicaoAoCombo = tipoAlimentacao => {
    const tipoAlimentacaoAtual = this.state.tipoAlimentacaoAtual;
    let combosAtuais = this.state.combosAtuais;
    const combo =
      combosAtuais[tipoAlimentacaoAtual].substituicoes[
        combosAtuais[tipoAlimentacaoAtual].substituicoes.length - 1
      ];
    if (podeAdicionarElementoSubstituicao(combo, tipoAlimentacao)) {
      combosAtuais[tipoAlimentacaoAtual].substituicoes[
        combosAtuais[tipoAlimentacaoAtual].substituicoes.length - 1
      ].tipos_alimentacao.push(tipoAlimentacao);
      montaLabelCombo(combo, tipoAlimentacao.nome);
      this.setState({ combosAtuais });
    }
  };

  acescentaCampoVazio = combo => {
    let combosAtuais = this.state.combosAtuais;
    combosAtuais.push({
      label: "",
      tipos_alimentacao: [],
      vinculo: combo.vinculo,
      adicionar: true
    });
    this.setState({ combosAtuais });
  };

  enviarComboTipoAlimentacao = combo => {
    let combosAtuais = this.state.combosAtuais;
    const request = {
      tipos_alimentacao: combo.tipos_alimentacao,
      vinculo: combo.vinculo
    };
    createVinculoTipoAlimentacaoPeriodoEscolar(request).then(response => {
      if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(response.data.tipos_alimentacao[0]);
      } else {
        combo.adicionar = false;
        combo.uuid = response.data.uuid;
        combosAtuais.push({
          label: "",
          tipos_alimentacao: [],
          vinculo: combo.vinculo,
          adicionar: true
        });
        this.setState({ combosAtuais });
      }
    });
  };

  enviarComboSubstituicao = combo => {
    const currentStep = this.state.currentStep;
    const tipoAlimentacaoAtual = this.state.tipoAlimentacaoAtual;
    let vinculosTiposAlimentacao = this.state.vinculosTiposAlimentacao;
    const request = {
      tipos_alimentacao: combo.tipos_alimentacao,
      combo: combo.combo
    };
    createVinculoSubstituicaoPeriodoEscolar(request).then(response => {
      if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(response.data.tipos_alimentacao[0]);
      } else {
        combo.adicionar = false;
        combo.uuid = response.data.uuid;
        vinculosTiposAlimentacao[currentStep].combos[
          tipoAlimentacaoAtual
        ].substituicoes.push({
          label: "",
          tipos_alimentacao: [],
          combo: combo.uuid,
          adicionar: true
        });
        this.setState({ vinculosTiposAlimentacao });
      }
    });
  };

  deletaComboTipoAlimentacao = (combo, indice) => {
    let combosAtuais = this.state.combosAtuais;
    if (!combo.uuid) {
      combosAtuais.splice(indice, 1);
      this.setState({ combosAtuais });
    } else {
      deleteVinculoTipoAlimentacaoPeriodoEscolar(combo.uuid).then(response => {
        if (
          response === HTTP_STATUS.BAD_REQUEST ||
          response === HTTP_STATUS.FORBIDDEN
        ) {
          toastError("Tipo de alimentação já está vinculado a um registro");
        } else {
          combosAtuais.splice(indice, 1);
          this.setState({ combosAtuais });
        }
      });
    }
  };
  apagarCampoComboTipoAlimentacao = indice => {
    let combosAtuais = this.state.combosAtuais;
    if (combosAtuais[indice].tipos_alimentacao.length === 0) {
      combosAtuais.splice(indice, 1);
    } else {
      combosAtuais[indice].label = "";
      combosAtuais[indice].tipos_alimentacao = [];
    }
    this.setState({ combosAtuais });
  };

  validaESalvaOUltimoElemento = combosAtuais => {
    combosAtuais.forEach(combo => {
      if (combo.adicionar) {
        const request = {
          tipos_alimentacao: combo.tipos_alimentacao,
          vinculo: combo.vinculo
        };
        createVinculoTipoAlimentacaoPeriodoEscolar(request).then(response => {
          if (response.status === HTTP_STATUS.BAD_REQUEST) {
            toastError(response.data.tipos_alimentacao[0]);
          } else {
            combo.adicionar = false;
            combo.uuid = response.data.uuid;
            this.setState({ combosAtuais });
          }
        });
      }
    });
    this.setState({ formComboAlimentacao: false });
  };

  apagaUnicaSubstituicao = substituicao => {
    let combosAtuais = this.state.combosAtuais;
    const tipoAlimentacaoAtual = this.state.tipoAlimentacaoAtual;
    deleteSubstituicaoTipoAlimentacaoPeriodoEscolar(substituicao.uuid).then(
      response => {
        if (
          response === HTTP_STATUS.BAD_REQUEST ||
          response === HTTP_STATUS.FORBIDDEN
        ) {
          toastError("Não foi possivel deletar registro do sistema!");
        } else {
          combosAtuais[tipoAlimentacaoAtual].substituicoes.splice(0, 1);
          combosAtuais[tipoAlimentacaoAtual].substituicoes.push({
            uuid: null,
            tipos_alimentacao: [],
            combo: null,
            label: ""
          });
          this.setState({ combosAtuais });
        }
      }
    );
  };

  render() {
    const {
      uuidUnidadeEscolar,
      unidadesEscolares,
      currentStep,
      vinculosTiposAlimentacao,
      combosAtuais,
      tiposAlimentacao,
      formComboAlimentacao,
      tipoAlimentacaoAtual
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Fragment>
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
                      this.setState({ uuidUnidadeEscolar: event.target.value });
                    }}
                  />
                </article>
              </section>
              {uuidUnidadeEscolar !== null && (
                <Fragment>
                  <Wizard
                    arrayOfObjects={vinculosTiposAlimentacao}
                    currentStep={currentStep}
                    nameItem="nome"
                  />
                  {formComboAlimentacao ? (
                    <section className="conteudo-wizard">
                      <div className="titulo-combo">Todos Alimentos</div>
                      <div className="titulo-combo">Combinacoes</div>
                      <div className="conteudo-tipo-alimentacao">
                        <ul>
                          {tiposAlimentacao &&
                            tiposAlimentacao.map((tipo, indice) => {
                              return (
                                <li
                                  key={indice}
                                  onClick={() =>
                                    this.adicionaTipoAlimentacaoAoCombo(tipo)
                                  }
                                >
                                  {tipo.nome}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="combo-tipo-alimentacao">
                        {combosAtuais &&
                          combosAtuais.map((combo, indice) => {
                            return (
                              <div key={indice} className="item-combo">
                                <div
                                  className={
                                    combosAtuais[combosAtuais.length - 1] ===
                                    combosAtuais[indice]
                                      ? "descricao"
                                      : "descricao-desabilitado"
                                  }
                                >
                                  <nav>{combo.label}</nav>
                                </div>
                                <div
                                  className={`acao ${
                                    combosAtuais[combosAtuais.length - 1] ===
                                    combosAtuais[indice]
                                      ? ""
                                      : "impedir-adicionar"
                                  }`}
                                >
                                  <i
                                    className="fas fa-plus-circle"
                                    onClick={() => {
                                      combosAtuais[combosAtuais.length - 1] ===
                                        combosAtuais[indice] &&
                                        (combo.adicionar
                                          ? this.enviarComboTipoAlimentacao(
                                              combo
                                            )
                                          : this.acescentaCampoVazio(combo));
                                    }}
                                  />
                                  <i
                                    className="fas fa-trash-alt"
                                    onClick={() => {
                                      combo.adicionar
                                        ? this.apagarCampoComboTipoAlimentacao(
                                            indice
                                          )
                                        : this.deletaComboTipoAlimentacao(
                                            combo,
                                            indice
                                          );
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </section>
                  ) : (
                    <section className="conteudo-wizard-substituicoes">
                      <div className="titulo-combo-substituicoes">Combos</div>
                      <div className="titulo-combo-substituicoes">
                        Tipos de Alimentação
                      </div>
                      <div className="titulo-combo-substituicoes">
                        Substituições
                      </div>
                      <ul className="lista-combo-alimentacoes">
                        {combosAtuais &&
                          combosAtuais.map((combo, index) => {
                            return tipoAlimentacaoAtual === index ? (
                              combosAtuais &&
                              combosAtuais[tipoAlimentacaoAtual].substituicoes
                                .length > 0 &&
                              combosAtuais[tipoAlimentacaoAtual].substituicoes[
                                combosAtuais[tipoAlimentacaoAtual].substituicoes
                                  .length - 1
                              ].tipos_alimentacao.length > 0 ? (
                                <li className="passou_atual" key={index}>
                                  <nav>{combo.label}</nav>{" "}
                                  <div>
                                    <i className="fas fa-check" />
                                  </div>
                                </li>
                              ) : (
                                <li className="nao_passou_atual" key={index}>
                                  <nav>{combo.label}</nav> <div> </div>
                                </li>
                              )
                            ) : // implementar logica para itens anteriores e proximos
                            //  implementando logica para itens passados
                            tipoAlimentacaoAtual > index ? (
                              <li
                                className="passou_anterior"
                                key={index}
                                onClick={() =>
                                  this.setState({ tipoAlimentacaoAtual: index })
                                }
                              >
                                <nav>{combo.label}</nav>{" "}
                                <div>
                                  <i className="fas fa-check" />
                                </div>
                              </li>
                            ) : // aqui import a logica de proximo item ao index atual
                            // console.log(combosAtuais[tipoAlimentacaoAtual].substituicoes[index - 1] && combosAtuais[tipoAlimentacaoAtual].substituicoes[index - 1].tipos_alimentacao. length > 0)
                            index - 1 === tipoAlimentacaoAtual &&
                              combosAtuais[tipoAlimentacaoAtual].substituicoes
                                .length > 0 &&
                              combosAtuais[tipoAlimentacaoAtual].substituicoes[
                                index - 1
                              ] &&
                              combosAtuais[tipoAlimentacaoAtual].substituicoes[
                                index - 1
                              ].tipos_alimentacao.length > 0 ? (
                              <li
                                className="nao_passou_proximo"
                                key={index}
                                onClick={() =>
                                  this.setState({ tipoAlimentacaoAtual: index })
                                }
                              >
                                <nav>{combo.label}</nav> <div />
                              </li>
                            ) : (
                              // aqui vao as logicas para proximos itens normais
                              <li className="proximos_itens" key={index}>
                                <nav>{combo.label}</nav> <div> </div>
                              </li>
                            );
                            // fim
                          })}
                      </ul>
                      <ul className="tipos-alimentacao-substituicoes">
                        {tiposAlimentacao &&
                          tiposAlimentacao.map((tipo, indice) => {
                            return (
                              <li
                                key={indice}
                                onClick={() =>
                                  this.adicionaSubstituicaoAoCombo(tipo)
                                }
                              >
                                {tipo.nome}
                              </li>
                            );
                          })}
                      </ul>
                      <div className="combo-tipo-alimentacao">
                        {combosAtuais &&
                          combosAtuais[tipoAlimentacaoAtual].substituicoes.map(
                            (substituicao, indice) => {
                              return (
                                <div className="item-combo" key={indice}>
                                  <div className="descricao">
                                    <nav>{substituicao.label}</nav>
                                  </div>
                                  <div className="acao">
                                    <i className="fas fa-plus-circle" />
                                    <i
                                      className="fas fa-trash-alt"
                                      onClick={() =>
                                        this.apagaUnicaSubstituicao(
                                          substituicao
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </section>
                  )}

                  <section className="rodape-botoes">
                    {formComboAlimentacao ? (
                      combosAtuais && combosAtuais.length === 0 ? (
                        <Botao
                          texto={"Formar Combos"}
                          className="botao-desabilitado"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                      ) : combosAtuais &&
                        combosAtuais[combosAtuais.length - 1].tipos_alimentacao
                          .length > 0 &&
                        combosAtuais &&
                        combosAtuais.length > 0 ? (
                        <Fragment>
                          <Botao
                            texto={"Formar Combos"}
                            onClick={() => {
                              this.validaESalvaOUltimoElemento(combosAtuais);
                            }}
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                          />
                        </Fragment>
                      ) : (
                        <Botao
                          texto={"Formar Combos"}
                          className="botao-desabilitado"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                      )
                    ) : (
                      <Fragment>
                        <Botao
                          texto={"Voltar"}
                          onClick={() =>
                            this.setState({ formComboAlimentacao: true })
                          }
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="mr-2"
                        />
                        <Botao
                          texto={"Confirmar"}
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN}
                          onClick={() =>
                            this.setState({
                              currentStep: currentStep + 1,
                              formComboAlimentacao: true
                            })
                          }
                        />
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
