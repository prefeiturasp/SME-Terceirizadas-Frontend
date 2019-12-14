import React, { Component, Fragment } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import Wizard from "../../../Shareable/Wizard";
import {
  getVinculosTipoAlimentacaoPorUnidadeEscolar,
  getTiposDeAlimentacao
} from "../../../../services/cadastroTipoAlimentacao.service";
import {
  montaTipoUnidadeEscolar,
  montaLabelCombo,
  podeAdicionarElemento,
  // modificacoes
  estruturarDadosTiposDeAlimentacao,
  verificaSeFormularioOuRelatorioEhApresentado
} from "./helper";
import "./style.scss";
import { toastError } from "../../../Shareable/Toast/dialogs";

class CadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodoEscolar: 0,
      unidadesEscolares: null,
      uuidUnidadeEscolar: null,
      vinculosTiposAlimentacao: null,
      exibirRelatorio: null,
      tiposAlimentacao: null,
      exibeFormularioInicial: true
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

    // busca todas as unidades escolares no banco
    if (unidadesEscolares === null && this.props.tiposUnidadesEscolar) {
      unidadesEscolares = montaTipoUnidadeEscolar(
        this.props.tiposUnidadesEscolar
      );
      this.setState({ unidadesEscolares });
    }

    //  ao selecionar a unidade escolar, faz o filtro das alimentacoes no banco
    if (
      uuidUnidadeEscolar !== prevState.uuidUnidadeEscolar &&
      vinculosTiposAlimentacao === prevState.vinculosTiposAlimentacao
    ) {
      getVinculosTipoAlimentacaoPorUnidadeEscolar(uuidUnidadeEscolar).then(
        response => {
          if (response.results.length === 0) {
            this.setState({ uuidUnidadeEscolar: null });
            toastError("Nenhum registro associado ao tipo de unidade escolar");
          } else {
            vinculosTiposAlimentacao = estruturarDadosTiposDeAlimentacao(
              response.results
            );
            const exibirRelatorio = verificaSeFormularioOuRelatorioEhApresentado(
              vinculosTiposAlimentacao
            );
            this.setState({
              vinculosTiposAlimentacao,
              exibirRelatorio
            });
          }
        }
      );
    }
  }

  adicionaTipoAlimentacaoAoCombo = tipoAlimentacao => {
    let vinculosTiposAlimentacao = this.state.vinculosTiposAlimentacao;
    const periodoEscolar = this.state.periodoEscolar;
    vinculosTiposAlimentacao[periodoEscolar].combos.forEach(combo => {
      if (combo.adicionar && podeAdicionarElemento(combo, tipoAlimentacao)) {
        combo.tipos_alimentacao.push(tipoAlimentacao.uuid);
        montaLabelCombo(combo, tipoAlimentacao.nome);
      }
    });
    this.setState({ vinculosTiposAlimentacao });
  };

  enviarComboTipoAlimentacao = () => {};

  acrescentaCampoVazio = comboAtual => {
    let vinculosTiposAlimentacao = this.state.vinculosTiposAlimentacao;
    const periodoEscolar = this.state.periodoEscolar;
    vinculosTiposAlimentacao[periodoEscolar].combos.push({
      uuid: "5b638de8-7582-4be1-89da-f77fa4592ec7",
      tipos_alimentacao: [],
      vinculo: comboAtual.vinculo,
      substituicoes: [
        {
          uuid: null,
          tipos_alimentacao: [],
          combo: comboAtual.vinculo,
          label: "",
          adicionar: true
        }
      ],
      label: "",
      adicionar: true
    });
    this.setState({ vinculosTiposAlimentacao });
  };

  render() {
    const {
      unidadesEscolares,
      uuidUnidadeEscolar,
      vinculosTiposAlimentacao,
      exibirRelatorio,
      periodoEscolar,
      tiposAlimentacao,
      exibeFormularioInicial
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
                    disabled={uuidUnidadeEscolar}
                  />
                </article>
              </section>
              <section>
                {uuidUnidadeEscolar !== null &&
                  vinculosTiposAlimentacao !== null &&
                  (exibirRelatorio !== null ? (
                    exibirRelatorio ? (
                      <div>relatorio</div>
                    ) : (
                      <Fragment>
                        <Wizard
                          arrayOfObjects={vinculosTiposAlimentacao}
                          currentStep={periodoEscolar}
                          nameItem="nome"
                        />
                        {exibeFormularioInicial ? (
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
                                          this.adicionaTipoAlimentacaoAoCombo(
                                            tipo
                                          )
                                        }
                                      >
                                        {tipo.nome}
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                            <div className="combo-tipo-alimentacao">
                              {vinculosTiposAlimentacao &&
                                vinculosTiposAlimentacao[
                                  periodoEscolar
                                ].combos.map((combo, indice) => {
                                  let ultimoCombo =
                                    vinculosTiposAlimentacao[periodoEscolar]
                                      .combos[
                                      vinculosTiposAlimentacao[periodoEscolar]
                                        .combos.length - 1
                                    ];
                                  return (
                                    <div key={indice} className="item-combo">
                                      <div
                                        className={
                                          ultimoCombo !== combo
                                            ? "descricao"
                                            : "descricao-desabilitado"
                                        }
                                      >
                                        <nav>{combo.label}</nav>
                                      </div>
                                      <div
                                        className={`acao ${
                                          ultimoCombo === combo
                                            ? ""
                                            : "impedir-adicionar"
                                        }`}
                                      >
                                        <i
                                          className="fas fa-plus-circle"
                                          onClick={() => {
                                            ultimoCombo === combo &&
                                              (combo.adicionar
                                                ? this.enviarComboTipoAlimentacao(
                                                    combo
                                                  )
                                                : this.acrescentaCampoVazio(
                                                    combo
                                                  ));
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
                          <div>form secundario</div>
                        )}
                      </Fragment>
                    )
                  ) : (
                    <div>Carregando ...</div>
                  ))}
              </section>
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
