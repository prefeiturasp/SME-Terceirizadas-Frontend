import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { CardStatusDeSolicitacaoLargo } from "../../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../../Shareable/InputSearch";
import {
  getSolicitacoesPendentesDRE,
  getSolicitacoesAutorizadasDRE,
  getSolicitacoesRecusadasDRE,
  getSolicitacoesCanceladasDRE
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
      recusadasListFiltered: [],
      canceladasList: [],
      canceladasListFiltered: []
    };
    this.filterList = this.filterList.bind(this);
    this.selecionarTodos = this.selecionarTodos.bind(this);
    this.onCheckClicked = this.onCheckClicked.bind(this);
  }

  async componentDidMount() {
    const meusDados = await getMeusDados();
    const dreUUid = meusDados.vinculo_atual.instituicao.uuid;
    const autorizadas = await getSolicitacoesAutorizadasDRE(dreUUid);
    const pendentes = await getSolicitacoesPendentesDRE(dreUUid);
    const recusadas = await getSolicitacoesRecusadasDRE(dreUUid);
    const canceladas = await getSolicitacoesCanceladasDRE(dreUUid);

    this.setState({
      autorizadasList: autorizadas.results,
      autorizadasListFiltered: autorizadas.results,
      pendentesList: pendentes.results,
      pendentesListFiltered: pendentes.results,
      recusadasList: recusadas.results,
      recusadasListFiltered: recusadas.results,
      canceladasList: canceladas.results,
      canceladasListFiltered: canceladas.results
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

  filtrar(lista, event) {
    lista = lista.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.descricao.toLowerCase().search(wordToFilter) !== -1;
    });
    return lista;
  }

  filterList(event) {
    if (event === undefined) event = { target: { value: "" } };

    let autorizadasListFiltered = this.state.autorizadasList;
    autorizadasListFiltered = this.filtrar(autorizadasListFiltered, event);
    this.setState({ autorizadasListFiltered });

    let pendentesListFiltered = this.state.pendentesList;
    pendentesListFiltered = this.filtrar(pendentesListFiltered, event);
    this.setState({ pendentesListFiltered });

    let recusadasListFiltered = this.state.recusadasList;
    recusadasListFiltered = this.filtrar(recusadasListFiltered, event);
    this.setState({ recusadasListFiltered });

    let canceladasListFiltered = this.state.canceladasList;
    canceladasListFiltered = this.filtrar(canceladasListFiltered, event);
    this.setState({ canceladasListFiltered });
  }

  render() {
    const {
      autorizadasListFiltered,
      pendentesListFiltered,
      recusadasListFiltered,
      canceladasListFiltered
    } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="mr-4">
            <InputSearch
              voltarLink="/"
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
              titulo={"Aguardando Autorização"}
              solicitacoes={pendentesListFiltered}
              tipo={"card-pending"}
              icone={"fa-exclamation-triangle"}
              selecionarTodos={this.selecionarTodos}
              onCheckClicked={this.onCheckClicked}
            />
          )}

          {recusadasListFiltered && recusadasListFiltered.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Recusadas"}
              solicitacoes={recusadasListFiltered}
              tipo={"card-denied"}
              icone={"fa-check"}
            />
          )}

          {canceladasListFiltered && canceladasListFiltered.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Canceladas"}
              solicitacoes={canceladasListFiltered}
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
