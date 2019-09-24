import React, { Component } from "react";
import { DRE, PAINEL_CONTROLE } from "../../../configs/constants";
import {
  getSolicitacoesAutorizadasDRE,
  getSolicitacoesPendentesDRE
} from "../../../services/painelDRE.service";
import { meusDados } from "../../../services/perfil.service";
import CardLegendas from "../../Shareable/CardLegendas";
import { CARD_TYPE_ENUM } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../Shareable/InputSearch";
import { STATUS } from "../const";
import { ajustarFormatoLog, LOG_PARA } from "../helper";

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
    const dreUuid = dadosMeus.diretorias_regionais[0].uuid;

    switch (this.props.tipoStatus) {
      case STATUS.AUTORIZADAS:
        tipoCard = CARD_TYPE_ENUM.APROVADO;
        icone = "fa-check";
        titulo = "Autorizadas";
        solicitacoes = await getSolicitacoesAutorizadasDRE(dreUuid);
        break;

      case STATUS.PENDENTES:
        tipoCard = CARD_TYPE_ENUM.PENDENTE;
        icone = "fa-exclamation-triangle";
        titulo = "Pendentes";
        solicitacoes = await getSolicitacoesPendentesDRE(dreUuid);
        break;

      default:
        break;
    }

    solicitacoes = ajustarFormatoLog(solicitacoes.results, LOG_PARA.DRE);
    this.setState({ solicitacoes, tipoCard, icone, titulo });
  }

  render() {
    const { solicitacoes, titulo, tipoCard, icone } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="pr-3">
            <InputSearch voltarLink={`/${DRE}/${PAINEL_CONTROLE}`} />
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
