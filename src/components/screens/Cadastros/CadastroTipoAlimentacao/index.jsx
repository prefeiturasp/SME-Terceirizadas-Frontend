import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import Wizard from "../../../Shareable/Wizard";
import {
  getVinculosTipoAlimentacaoPorUnidadeEscolar,
  getTiposDeAlimentacao,
  createVinculoTipoAlimentacaoPeriodoEscolar,
  deleteVinculoTipoAlimentacaoPeriodoEscolar
} from "../../../../services/cadastroTipoAlimentacao.service";
import {
  montaTipoUnidadeEscolar,
  adicionarComboVazio,
  montaLabelCombo,
  podeAdicionarElemento
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
      tiposAlimentacao: null
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
    const currentStep = this.state.currentStep;

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
            toastError("Nenhum registro associado ao tipo de unidade escolar");
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

    // TODO: MONTAR LOGICA PARA ATUALIZAÇÃO DE PERIODO
    if (currentStep !== prevState.currentStep) {
      let combosAtuais = null;
      combosAtuais = adicionarComboVazio(
        vinculosTiposAlimentacao[currentStep].combos || []
      );
      this.setState({ combosAtuais });
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

  deletaComboTipoAlimentacao = (combo, indice) => {
    let combosAtuais = this.state.combosAtuais;
    if (!combo.uuid) {
      combosAtuais.splice(indice, 1);
      this.setState({ combosAtuais });
    } else {
      deleteVinculoTipoAlimentacaoPeriodoEscolar(combo.uuid).then(response => {
        if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(response.data.detail);
        } else {
          combosAtuais.splice(indice, 1);
          this.setState({ combosAtuais });
        }
      });
    }
  };
  apagarCampoComboTipoAlimentacao = indice => {
    let combosAtuais = this.state.combosAtuais;
    combosAtuais[indice].label = "";
    combosAtuais[indice].tipos_alimentacao = [];
    this.setState({ combosAtuais });
  };

  render() {
    const {
      uuidUnidadeEscolar,
      unidadesEscolares,
      currentStep,
      vinculosTiposAlimentacao,
      combosAtuais,
      tiposAlimentacao
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
                                  combo.adicionar
                                    ? "descricao"
                                    : "descricao-desabilitado"
                                }
                              >
                                <nav>{combo.label}</nav>
                              </div>
                              <div
                                className={`acao ${!combo.adicionar &&
                                  "impedir-adicionar"}`}
                              >
                                <i
                                  className="fas fa-plus-circle"
                                  onClick={() => {
                                    combo.adicionar &&
                                      this.enviarComboTipoAlimentacao(combo);
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
