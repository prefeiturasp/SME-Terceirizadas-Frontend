import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { CardStatusDeSolicitacaoLargo } from "../../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../../Shareable/InputSearch";
import {
  getSolicitacoesPendentesDRE,
  getSolicitacoesAutorizadasDRE
} from "../../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../../services/perfil.service";

export class StatusSolicitacoesTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasList: [],
      autorizadasListFiltered: [],
      pendentesList: [],
      pendentesListFiltered: [],
      recusadasList: [],
      canceladasList: [],
      showAutorizadas: this.props.showAutorizadas,
      showPendentes: this.props.showPendentes
    };
    this.filterList = this.filterList.bind(this);
    this.selecionarTodos = this.selecionarTodos.bind(this);
    this.onCheckClicked = this.onCheckClicked.bind(this);
  }

  async componentDidMount() {
    const meusDados = await getMeusDados();
    const dreUUid = meusDados.diretorias_regionais[0].uuid;
    const autorizadas = !this.state.showAutorizadas
      ? []
      : await getSolicitacoesAutorizadasDRE(dreUUid);

    const pendentes = !this.state.showPendentes
      ? []
      : await getSolicitacoesPendentesDRE(dreUUid);

    this.setState({
      autorizadasList: autorizadas.results,
      autorizadasListFiltered: autorizadas.results,
      pendentesList: pendentes.results,
      pendentesListFiltered: pendentes.results
    });
  }

  selecionarTodos(solicitacoes) {
    solicitacoes.forEach((_, key) => {
      this.props.change(`check_${key}`, !this.props.selecionar_todos);
    });
    this.props.change("selecionar_todos", !this.props.selecionar_todos);
  }

  onCheckClicked(solicitacoes, key) {
    solicitacoes[key].checked = !solicitacoes[key].checked;
    this.props.change(`check_${key}`, solicitacoes[key].checked);
    //this.setState({ solicitacoes });
  }

  filterList(event) {
    const { showAutorizadas, showPendentes } = this.state;
    if (event === undefined) event = { target: { value: "" } };

    if (showAutorizadas) {
      let autorizadasListFiltered = this.state.autorizadasList;
      autorizadasListFiltered = autorizadasListFiltered.filter(function(item) {
        const wordToFilter = event.target.value.toLowerCase();
        return item.text.toLowerCase().search(wordToFilter) !== -1;
      });
      this.setState({ autorizadasListFiltered });
    }

    if (showPendentes) {
      let pendentesListFiltered = this.state.pendentesList;
      pendentesListFiltered = pendentesListFiltered.filter(function(item) {
        const wordToFilter = event.target.value.toLowerCase();
        return item.text.toLowerCase().search(wordToFilter) !== -1;
      });
      this.setState({ pendentesListFiltered });
    }
  }

  render() {
    const {
      autorizadasListFiltered,
      pendentesListFiltered,
      recusadasList,
      canceladasList
    } = this.state;

    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="mr-4">
            <InputSearch
              voltarLink="/dre/painel-de-controle"
              filterList={this.filterList}
              esconderImprimir
            />
          </div>
          <div className="pb-3" />
          {autorizadasListFiltered && autorizadasListFiltered.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Autorizadas"}
              solicitacoes={autorizadasListFiltered}
              tipo={"card-authorized"}
              icone={"fa-check"}
              selecionarTodos={this.selecionarTodos}
              onCheckClicked={this.onCheckClicked}
            />
          )}

          {pendentesListFiltered && pendentesListFiltered.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Aguardando Aprovação"}
              solicitacoes={pendentesListFiltered}
              tipo={"card-pending"}
              icone={"fa-exclamation-triangle"}
              selecionarTodos={this.selecionarTodos}
              onCheckClicked={this.onCheckClicked}
            />
          )}

          {recusadasList && recusadasList.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Recusadas"}
              solicitacoes={recusadasList}
              tipo={"card-denied"}
              icone={"fa-check"}
            />
          )}

          {canceladasList && canceladasList.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Canceladas"}
              solicitacoes={canceladasList}
              tipo={"card-cancelled"}
              icone={"fa-times-circle"}
            />
          )}
        </div>
      </div>
    );
  }
}

const StatusSolicitacoesForm = reduxForm({
  form: "statusSolicitacoesForm",
  enableReinitialize: true
})(StatusSolicitacoesTodos);

const selector = formValueSelector("statusSolicitacoesForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(StatusSolicitacoesForm);
