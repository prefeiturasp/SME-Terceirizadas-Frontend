import React, { Component, Fragment } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import Wizard from "../../../Shareable/Wizard";
import { getVinculosTipoAlimentacaoPorUnidadeEscolar } from "../../../../services/cadastroTipoAlimentacao.service";
import { montaTipoUnidadeEscolar } from "./helper";
import "./style.scss";

class CadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      unidadesEscolares: null,
      uuidUnidadeEscolar: null,
      vinculosTiposAlimentacao: null,
      combosAtuais: null
    };
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
          this.setState({ vinculosTiposAlimentacao });
        }
      );
    }

    if (
      (currentStep !== prevState.currentStep && vinculosTiposAlimentacao) ||
      (currentStep === 0 && vinculosTiposAlimentacao)
    ) {
      combosAtuais = vinculosTiposAlimentacao[currentStep].combos;
      if (
        combosAtuais.length === 0 ||
        combosAtuais[combosAtuais.length - 1].vinculo !== ""
      ) {
        combosAtuais.push({
          label: "",
          tipos_alimentacao: [],
          vinculo: ""
        });
      }

      // console.log(combosAtuais);
    }
  }

  render() {
    const {
      uuidUnidadeEscolar,
      unidadesEscolares,
      currentStep,
      vinculosTiposAlimentacao
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
                    <div className="conteudo-tipo-alimentacao" />
                    <div className="combo-tipo-alimentacao">
                      {vinculosTiposAlimentacao &&
                        vinculosTiposAlimentacao[currentStep].combos.map(
                          (combo, indice) => {
                            // const combos =
                            //   vinculosTiposAlimentacao[currentStep].combos;
                            // console.log(combos[combos.length - 1] === combo);
                            return (
                              <div key={indice} className="item-combo">
                                <div className="descricao">
                                  <nav>{combo.label}</nav>
                                </div>
                                <div className="acao">
                                  <i className="fas fa-plus-circle" />
                                  <i className="fas fa-trash-alt" />
                                </div>
                              </div>
                            );
                          }
                        )}
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
