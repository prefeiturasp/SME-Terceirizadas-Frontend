import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import Select from "../../../Shareable/Select";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import InputText from "../../../Shareable/Input/InputText";
import { toastError } from "../../../Shareable/Toast/dialogs";

import { obtemDadosAlunoPeloEOL } from "../../../../services/perfil.service";

import "./FormFiltros.scss";
import { TIPO_PERFIL } from "../../../../constants";

class Filtros extends Component {
  constructor(props) {
    super(props);
    this.onEolBlur = this.onEolBlur.bind(this);
  }

  onEolBlur = async event => {
    const { change } = this.props;
    change("nome_aluno", "Buscando...");
    this.setState({ loadingNomeAluno: true });
    const resposta = await obtemDadosAlunoPeloEOL(event.target.value);
    if (!resposta) return;
    if (resposta.status === 400) {
      toastError("Aluno não encontrado no EOL.");
      change("nome_aluno", "");
    } else {
      change("nome_aluno", resposta.detail.nm_aluno);
    }
    this.setState({ loadingNomeAluno: false });
  };

  render() {
    const {
      change,
      diretoriasRegionais,
      dre,
      escolas,
      handleSubmit,
      loading,
      loadingNomeAluno
    } = this.props;
    const escolasFiltrado = dre
      ? escolas.filter(e => e.uuid === "" || e.diretoria_regional.uuid === dre)
      : escolas;
    const tipoUsuario = localStorage.getItem("tipo_perfil");
    return (
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-5">
                <label htmlFor="dre">Diretoria Regional de Educação</label>
                <Field
                  component={Select}
                  name="dre"
                  options={diretoriasRegionais}
                  disabled={
                    loading ||
                    tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                    tipoUsuario === TIPO_PERFIL.ESCOLA
                  }
                  onChange={() => change("escola", "")}
                  naoDesabilitarPrimeiraOpcao
                />
              </div>
              <div className="col-7">
                <label htmlFor="escola">Unidade Escolar</label>
                <Field
                  component={Select}
                  name="escola"
                  options={escolasFiltrado}
                  disabled={loading || tipoUsuario === TIPO_PERFIL.ESCOLA}
                  naoDesabilitarPrimeiraOpcao
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="codigo_eol">Cód. EOL do Aluno</label>
                <Field
                  component={InputText}
                  name="codigo_eol"
                  placeholder="Insira o Código"
                  disabled={loading || loadingNomeAluno}
                  onBlur={this.onEolBlur}
                />
              </div>
              <div className="col-9">
                <label htmlFor="nome_aluno">Nome Completo do Aluno</label>
                <Field
                  component={InputText}
                  name="nome_aluno"
                  placeholder="Indira o Nome do Aluno"
                  disabled={loading || loadingNomeAluno}
                />
              </div>
              <div className="col-1 botao-enviar">
                <Botao
                  style={BUTTON_STYLE.GREEN}
                  texto="Filtrar"
                  type={BUTTON_TYPE.SUBMIT}
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
let FiltrosForm = reduxForm({
  form: "autorizacao-dieta-especial",
  enableReinitialize: true
})(Filtros);

const selector = formValueSelector("autorizacao-dieta-especial");

const mapStateToProps = state => {
  return {
    dre: selector(state, "dre")
  };
};

export default connect(mapStateToProps)(FiltrosForm);
