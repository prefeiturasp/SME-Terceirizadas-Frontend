import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { getDietasEspeciaisVigentesDeUmAluno } from "../../../../services/dietaEspecial";
import { dadosDoAluno } from "../../../../services/perfil.service";
import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import SolicitacaoVigente from "./componentes/SolicitacaoVigente";
import { formatarSolicitacoesVigentes } from "./helper";
import "./style.scss";

class solicitacaoDietaEspecial extends Component {
  constructor(props) {
    super(props);
    window.changeForm = props.change;
    window.momentjs = moment;
    this.state = { nomeAluno: "", eolAluno: "", escolaAtual: "", dreAtual: "" };
  }

  componentDidMount() {
    dadosDoAluno("642071").then(dadosAluno => {
      const dados = dadosAluno.data;
      this.setState({
        nomeAluno: dados.nome,
        eolAluno: dados.codigo_eol,
        escolaAtual: dados.nome_escola,
        dreAtual: dados.nome_dre
      });
    });
    getDietasEspeciaisVigentesDeUmAluno("642071").then(response => {
      this.setState({
        solicitacoesVigentes: formatarSolicitacoesVigentes(
          response.data.results
        )
      });
    });
  }

  // async onSubmit(payload) {
  // }

  resetForm() {
    this.props.reset("solicitacaoDietaEspecial");
    this.setState({ files: [] });
  }

  render() {
    const {
      nomeAluno,
      eolAluno,
      escolaAtual,
      dreAtual,
      solicitacoesVigentes
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form className="special-diet-aluno" onSubmit={handleSubmit}>
        <div className="row">
          <h4>Detalhe das Dietas Especiais</h4>
          <Botao
            type={BUTTON_TYPE.BUTTON}
            title={"XXX"}
            texto={"Voltar"}
            style={BUTTON_STYLE.BLUE_OUTLINE}
          />
        </div>
        <div>
          <table className="table">
            <tr>
              <th>Diretoria Regional de Educação</th>
              <th>Unidade escolar</th>
            </tr>
            <tr>
              <td>{dreAtual}</td>
              <td>{escolaAtual}</td>
            </tr>
            <tr>
              <th>Código EOL</th>
              <th>Nome Completo</th>
            </tr>
            <tr>
              <td>{eolAluno}</td>
              <td>{nomeAluno}</td>
            </tr>
          </table>
        </div>
        {solicitacoesVigentes && (
          <SolicitacaoVigente solicitacoesVigentes={solicitacoesVigentes} />
        )}
      </form>
    );
  }
}

const componentNameForm = reduxForm({
  form: "solicitacaoDietaEspecial",
  validate: ({ nome, data_nascimento }) => {
    const errors = {};
    if (nome === undefined && data_nascimento === undefined) {
      errors.codigo_eol =
        "É necessário preencher este campo com um código EOL válido";
    }
    return errors;
  }
})(solicitacaoDietaEspecial);

const selector = formValueSelector("solicitacaoDietaEspecial");
const mapStateToProps = state => {
  return {
    files: selector(state, "files")
  };
};

export default connect(mapStateToProps)(componentNameForm);
