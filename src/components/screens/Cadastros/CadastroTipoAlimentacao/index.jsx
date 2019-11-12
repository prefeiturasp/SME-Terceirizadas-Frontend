import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadTipoAlimentacao } from "../../../../reducers/tipoAlimentacaoReducer";
import { Select } from "../../../Shareable/Select";
import "./style.scss";

class CadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { meusDados } = this.props;

    if (meusDados !== prevState.meusDados) {
      this.setState({ meusDados });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card mt-3">
        <div className="card-body formulario-tipo-alimentacao">
          <form onSubmit={handleSubmit}>
            <section className="header">Cruzamento das possibilidades</section>
            <section className="tipos-de-unidade">
              <header>Tipos de Unidades</header>
              <article>
                <Field
                  component={Select}
                  name="tipos_unidades"
                  options={[
                    { nome: "Selecione", uuid: "" },
                    { nome: "teste1", uuid: "fdhjfd-fdkdj-4fddf" },
                    { nome: "teste2", uuid: "jsh5d-iuehd-fhdjjsawe" }
                  ]}
                />
              </article>
            </section>
          </form>
        </div>
      </div>
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
