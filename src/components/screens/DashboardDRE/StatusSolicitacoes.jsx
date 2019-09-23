import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { DRE, PAINEL_CONTROLE } from "../../../configs/constants";
import {
  getSolicitacoesAutorizadasDRE,
  getSolicitacoesPendentesDRE
} from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
import { CardListarSolicitacoes } from "../../Shareable/CardListarSolicitacoes";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../Shareable/InputSearch";
import { ajustarFormatoLog, LOG_PARA } from "../helper";

export class StatusSolicitacoes extends Component {
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
    const dreUuid = meusDados.diretorias_regionais[0].uuid;

    let autorizadas = await getSolicitacoesAutorizadasDRE(dreUuid);
    let pendentes = await getSolicitacoesPendentesDRE(dreUuid);

    autorizadas = ajustarFormatoLog(autorizadas.results, LOG_PARA.DRE);
    pendentes = ajustarFormatoLog(pendentes.results, LOG_PARA.DRE);

    this.setState({
      autorizadasList: autorizadas,
      autorizadasListFiltered: autorizadas,
      pendentesList: pendentes,
      pendentesListFiltered: pendentes
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
              voltarLink={`/${DRE}/${PAINEL_CONTROLE}`}
              filterList={this.filterList}
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
            <CardListarSolicitacoes
              titulo={"Pendente Aprovação"}
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
})(StatusSolicitacoes);

const selector = formValueSelector("statusSolicitacoesForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(StatusSolicitacoesForm);
