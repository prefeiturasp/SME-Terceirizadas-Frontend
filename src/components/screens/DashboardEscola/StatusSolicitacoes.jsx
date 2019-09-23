import React, { Component } from "react";
import { ESCOLA, PAINEL_CONTROLE } from "../../../configs/constants";
import { getSolicitacoesAutorizadasEscola, getSolicitacoesPendentesEscola } from "../../../services/painelEscola.service";
import { meusDados } from "../../../services/perfil.service";
import CardLegendas from "../../Shareable/CardLegendas";
import { CARD_TYPE_ENUM } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
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
      ],
      titulo: "...",
      tipoCard: "...",
      icone: "..."
    };
  }

  async componentDidMount() {
    let solicitacoes = "";
    let tipoCard = "";
    let icone = "";
    let titulo = "";
    const dadosMeus = await meusDados();
    //TODO aguardando definicao de perfil
    const minhaEscolaUUID = dadosMeus.escolas[0].uuid;

    switch (this.props.tipoStatus) {
      case STATUS.AUTORIZADAS:
        tipoCard = CARD_TYPE_ENUM.APROVADO;
        icone = "fa-check";
        titulo = "Autorizadas";
        solicitacoes = await getSolicitacoesAutorizadasEscola(minhaEscolaUUID);
        break;

      case STATUS.PENDENTES:
        tipoCard = CARD_TYPE_ENUM.PENDENTE;
        icone = "fa-exclamation-triangle";
        titulo = "Pendentes";
        solicitacoes = await getSolicitacoesPendentesEscola(minhaEscolaUUID);
        break;

      default:
        break;
    }

    solicitacoes = ajustarFormatoLog(solicitacoes.results);
    this.setState({ solicitacoes, tipoCard, icone, titulo });
  }

  render() {
    const { solicitacoes, titulo, tipoCard, icone } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="pr-3">
            <InputSearch voltarLink={`/${ESCOLA}/${PAINEL_CONTROLE}`} />
          </div>
          <div className="pb-3" />
          <CardStatusDeSolicitacaoLargo
            titulo={titulo}
            solicitacoes={solicitacoes}
            tipo={tipoCard}
            icone={icone}
          />
          <CardLegendas />
        </div>
      </div>
    );
  }
}
