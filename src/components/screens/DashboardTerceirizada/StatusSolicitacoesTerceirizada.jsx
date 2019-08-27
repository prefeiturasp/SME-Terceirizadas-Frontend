import React, { Component } from "react";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../Shareable/InputSearch";
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

export default class StatusSolicitacoesTerceirizada extends Component {
  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="pr-3">
            <InputSearch voltarLink="/terceirizada/painel-de-controle" />
          </div>
          <div className="pb-3" />
          <CardStatusDeSolicitacaoLargo
            titulo={"Aprovadas"}
            solicitacoes={solicitacoes}
            tipo={"card-authorized"}
            icone={"fa-check"}
          />
          <CardStatusDeSolicitacaoLargo
            titulo={"Pendente Aprovação"}
            solicitacoes={solicitacoes}
            tipo={"card-pending"}
            icone={"fa-exclamation-triangle"}
          />
          <CardStatusDeSolicitacaoLargo
            titulo={"Recusadas"}
            solicitacoes={solicitacoes}
            tipo={"card-denied"}
            icone={"fa-check"}
          />
          <CardStatusDeSolicitacaoLargo
            titulo={"Canceladas"}
            solicitacoes={solicitacoes}
            tipo={"card-cancelled"}
            icone={"fa-times-circle"}
          />
        </div>
      </div>
    );
  }
}
