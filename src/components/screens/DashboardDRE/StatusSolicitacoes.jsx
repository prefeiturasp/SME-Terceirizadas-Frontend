import React, { Component } from "react";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../DashboardEscola/InputSearch";
import {
  getSolicitacoesAutorizadasPelaDRE,
  getSolicitacoesPendentesParaDRE
} from "../../../services/painelDRE.service";
import { meusDados as getMeusDados } from "../../../services/perfil.service";
const solicitacoes = [
  {
    text: "12083 - 7A IP I - Solicitação Unificada",
    date: "11:19"
  },
  {
    text: "12083 - 7A IP I - Solicitação de Kit Lanche",
    date: "Qua 11:07"
  },
  {
    text: "12083 - 7A IP I - Solicitação Unificada",
    date: "Qua 10:07"
  },
  {
    text: "12083 - 7A IP I - Solicitação Unificada",
    date: "Qua 10:07"
  },
  {
    text: "12083 - 7A IP I - Solicitação Unificada",
    date: "Qua 10:07"
  },
  {
    text: "12083 - 7A IP I - Solicitação Unificada",
    date: "Qua 10:07"
  },
  {
    text: "12083 - 7A IP I - Solicitação Unificada",
    date: "Qua 10:07"
  }
];

export default class StatusSolicitacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasList: [],
      pendentesList: [],
      recusadasList: [],
      canceladasList: [],
      showAutorizadas: this.props.showAutorizadas,
      showPendentes: this.props.showPendentes
    };
  }

  async componentDidMount() {

    const meusDados = await getMeusDados();

    const autorizadas = !this.state.showAutorizadas ? [] : await getSolicitacoesAutorizadasPelaDRE(meusDados.diretorias_regionais[0].uuid);

    const pendentes = !this.state.showPendentes ? [] : await getSolicitacoesPendentesParaDRE(meusDados.diretorias_regionais[0].uuid);

    this.setState({
      autorizadasList: autorizadas.results,
      pendentesList: pendentes.results
    });
  }

  render() {
    const {autorizadasList, pendentesList, recusadasList, canceladasList,} = this.state;

    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="mr-4">
            <InputSearch voltarLink="/dre/painel-de-controle" />
          </div>
          <div className="pb-3" />
          {autorizadasList && autorizadasList.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Aprovadas"}
              solicitacoes={autorizadasList}
              tipo={"card-authorized"}
              icone={"fa-check"}
            />
          )}

          {pendentesList && pendentesList.length > 0 && (
            <CardStatusDeSolicitacaoLargo
              titulo={"Pendente Aprovação"}
              solicitacoes={pendentesList}
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
