import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

import Select from "../../../Shareable/Select";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import InputText from "../../../Shareable/Input/InputText";
import { toastError } from "../../../Shareable/Toast/dialogs";

import { getDiretoriaregionalSimplissima } from "../../../../services/diretoriaRegional.service";
import { getEscolasSimplissimaComDRE } from "../../../../services/escola.service";
import { obtemDadosAlunoPeloEOL } from "../../../../services/perfil.service";

import "./FormFiltros.scss";

class Filtros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diretoriasRegionais: [{ uuid: "", nome: "Carregando..." }],
      escolas: [{ uuid: "", nome: "Carregando..." }],
      loading: true,
      loadingNomeAluno: false
    };
    this.onEolBlur = this.onEolBlur.bind(this);
  }

  componentDidMount = async () => {
    const resposta = await getDiretoriaregionalSimplissima();
    const diretoriasRegionais = [{ uuid: "", nome: "Selecione..." }].concat(
      resposta.data.results
    );
    const resposta2 = await getEscolasSimplissimaComDRE();
    const escolas = [{ uuid: "", nome: "Selecione..." }].concat(
      resposta2.results
    );
    this.setState({ diretoriasRegionais, escolas, loading: false });
  };

  onEolBlur = async event => {
    const { change } = this.props;
    change("nomealuno", "Buscando...");
    this.setState({ loadingNomeAluno: true });
    const resposta = await obtemDadosAlunoPeloEOL(event.target.value);
    if (!resposta) return;
    if (resposta.status === 400) {
      toastError("Aluno não encontrado no EOL.");
      change("nomealuno", "");
    } else {
      change("nomealuno", resposta.detail.nm_aluno);
    }
    this.setState({ loadingNomeAluno: false });
  };

  render() {
    const {
      diretoriasRegionais,
      escolas,
      loading,
      loadingNomeAluno
    } = this.state;
    const { change, dre } = this.props;
    const escolasFiltrado = dre
      ? escolas.filter(e => e.uuid === "" || e.diretoria_regional.uuid === dre)
      : escolas;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-5">
                <label htmlFor="dre">Diretoria Regional de Educação</label>
                <Field
                  component={Select}
                  name="dre"
                  options={diretoriasRegionais}
                  disabled={loading}
                  onChange={() => change("escola", "")}
                />
              </div>
              <div className="col-7">
                <label htmlFor="escola">Unidade Escolar</label>
                <Field
                  component={Select}
                  name="escola"
                  options={escolasFiltrado}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="codeol">Cód. EOL do Aluno</label>
                <Field
                  component={InputText}
                  name="codeol"
                  placeholder="Insira o Código"
                  disabled={loading || loadingNomeAluno}
                  onBlur={this.onEolBlur}
                />
              </div>
              <div className="col-9">
                <label htmlFor="nomealuno">Nome Completo do Aluno</label>
                <Field
                  component={InputText}
                  name="nomealuno"
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
