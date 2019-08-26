import React, { Component } from "react";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../DashboardEscola/InputSearch";
import {
  getSolicitacoesAutorizadasPelaDRE,
  getSolicitacoesPendentesParaDRE
} from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";

export default class StatusSolicitacoes extends Component {
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
  }

  async componentDidMount() {

    const meusDados = await getMeusDados();

    const autorizadas = !this.state.showAutorizadas ? [] : await getSolicitacoesAutorizadasPelaDRE(meusDados.diretorias_regionais[0].uuid);

    const pendentes = !this.state.showPendentes ? [] : await getSolicitacoesPendentesParaDRE(meusDados.diretorias_regionais[0].uuid);

    this.setState({
      autorizadasList: autorizadas.results,
      autorizadasListFiltered: autorizadas.results,
      pendentesList: pendentes.results,
      pendentesListFiltered: pendentes.results
    });
  }

  filterList(event) {
    const {showAutorizadas, showPendentes} = this.state
    if (event === undefined) event = { target: { value: "" } };

    if (showAutorizadas) {
      let autorizadasListFiltered = this.state.autorizadasList;
      autorizadasListFiltered = autorizadasListFiltered.filter(function(item) {
        const wordToFilter = event.target.value.toLowerCase();
        return (
          item.text.toLowerCase().search(wordToFilter) !== -1
        );
      });
      this.setState({ autorizadasListFiltered });
    }

    if (showPendentes) {
      let pendentesListFiltered = this.state.pendentesList;
      pendentesListFiltered = pendentesListFiltered.filter(function(item) {
        const wordToFilter = event.target.value.toLowerCase();
        return (
          item.text.toLowerCase().search(wordToFilter) !== -1
        );
      });
      this.setState({ pendentesListFiltered });
    }
  }

  render() {
    const {autorizadasListFiltered, pendentesListFiltered, recusadasList, canceladasList,} = this.state;

    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="mr-4">
            <InputSearch
              voltarLink="/dre/painel-de-controle"
              filterList={this.filterList}
            />
          </div>
          <div className="pb-3" />
          {autorizadasListFiltered && autorizadasListFiltered.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Aprovadas"}
              solicitacoes={autorizadasListFiltered}
              tipo={"card-authorized"}
              icone={"fa-check"}
            />
          )}

          {pendentesListFiltered && pendentesListFiltered.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Pendente Aprovação"}
              solicitacoes={pendentesListFiltered}
              tipo={"card-pending"}
              icone={"fa-exclamation-triangle"}
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
