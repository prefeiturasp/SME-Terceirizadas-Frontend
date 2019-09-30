import React, { Component } from "react";
import { DRE, PAINEL_CONTROLE } from "../../../configs/constants";
import {
  getSolicitacoesAutorizadasDRE,
  getSolicitacoesCanceladasDRE,
  getSolicitacoesPendentesDRE,
  getSolicitacoesRecusadasDRE
} from "../../../services/painelDRE.service";
import { meusDados } from "../../../services/perfil.service";
import CardLegendas from "../../Shareable/CardLegendas";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
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
      solicitacoesFiltrados: [
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

    this.onPesquisarChanged = this.onPesquisarChanged.bind(this);
  }

  onPesquisarChanged(event) {
    let solicitacoesFiltrados = this.state.solicitacoes;
    solicitacoesFiltrados = this.filtrarNome(solicitacoesFiltrados, event);
    this.setState({ solicitacoesFiltrados });
  }

  filtrarNome(listaFiltro, event) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
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
        icone = <ICON_CARD_TYPE_ENUM className="APROVADO" />;
        titulo = "Autorizadas";
        solicitacoes = await getSolicitacoesAutorizadasDRE(dreUuid);
        break;

      case STATUS.PENDENTES:
        tipoCard = CARD_TYPE_ENUM.PENDENTE;
        icone = ICON_CARD_TYPE_ENUM.PENDENTE;
        titulo = "Pendentes";
        solicitacoes = await getSolicitacoesPendentesDRE(dreUuid);
        break;

      case STATUS.CANCELADAS:
        tipoCard = CARD_TYPE_ENUM.CANCELADO;
        icone = ICON_CARD_TYPE_ENUM.CANCELADO;
        titulo = "Canceladas";
        solicitacoes = await getSolicitacoesCanceladasDRE(dreUuid);
        break;

      case STATUS.RECUSADAS:
        tipoCard = CARD_TYPE_ENUM.NEGADO;
        icone = ICON_CARD_TYPE_ENUM.NEGADO;
        titulo = "Recusadas";
        solicitacoes = await getSolicitacoesRecusadasDRE(dreUuid);
        break;
      default:
        break;
    }

    solicitacoes = ajustarFormatoLog(solicitacoes.results, LOG_PARA.DRE);
    this.setState({
      solicitacoes,
      tipoCard,
      icone,
      titulo,
      solicitacoesFiltrados: solicitacoes
    });
  }

  render() {
    const { solicitacoesFiltrados, titulo, tipoCard, icone } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="pr-3">
            <InputSearch
              voltarLink={`/${DRE}/${PAINEL_CONTROLE}`}
              filterList={this.onPesquisarChanged}
            />
          </div>
          <div className="pb-3" />
          <CardStatusDeSolicitacaoLargo
            titulo={titulo}
            solicitacoes={solicitacoesFiltrados}
            tipo={tipoCard}
            icone={icone}
          />
          <CardLegendas />
        </div>
      </div>
    );
  }
}
