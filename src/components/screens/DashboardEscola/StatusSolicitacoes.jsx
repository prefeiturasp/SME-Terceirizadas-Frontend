import React, { Component } from "react";
import { ESCOLA, PAINEL_CONTROLE } from "../../../configs/constants";
import { getSolicitacoesAutorizadasEscola } from "../../../services/painelEscola.service";
import CardLegendas from "../../Shareable/CardLegendas";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../Shareable/InputSearch";
import { ajustarFormatoLog } from "../helper";
import { STATUS } from "./const";

export default class StatusSolicitacoes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      solicitacoes: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ]
    };
  }

  async componentDidMount() {
    let solicitacoes = "";
    if (this.props.tipoStatus === STATUS.AUTORIZADAS) {
      solicitacoes = await getSolicitacoesAutorizadasEscola(
        "b9a36370-2fdd-44ab-8a33-a22b6921236f"
      );
    }
    solicitacoes = ajustarFormatoLog(solicitacoes.results);
    this.setState({ solicitacoes });
  }

  render() {
    const { solicitacoes } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="pr-3">
            <InputSearch voltarLink={`/${ESCOLA}/${PAINEL_CONTROLE}`} />
          </div>
          <div className="pb-3" />
          <CardStatusDeSolicitacaoLargo
            titulo={"Autorizadas"}
            solicitacoes={solicitacoes}
            tipo={"card-authorized"}
            icone={"fa-check"}
          />
          <CardLegendas />
        </div>
      </div>
    );
  }
}
