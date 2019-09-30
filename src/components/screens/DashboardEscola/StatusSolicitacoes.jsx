import React, { Component } from "react";
import { ESCOLA, PAINEL_CONTROLE } from "../../../configs/constants";
import {
  getSolicitacoesAutorizadasEscola,
  getSolicitacoesCanceladasEscola,
  getSolicitacoesNegadasEscola,
  getSolicitacoesPendentesEscola
} from "../../../services/painelEscola.service";
import { meusDados } from "../../../services/perfil.service";
import CardLegendas from "../../Shareable/CardLegendas";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { CardStatusDeSolicitacaoLargo } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacaoLargo";
import { InputSearch } from "../../Shareable/InputSearch";
import { STATUS } from "../const";
import { ajustarFormatoLog } from "../helper";

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
    const minhaEscolaUUID = dadosMeus.escolas[0].uuid;

    switch (this.props.tipoStatus) {
      case STATUS.RECUSADAS:
        tipoCard = CARD_TYPE_ENUM.NEGADO;
        icone = ICON_CARD_TYPE_ENUM.NEGADO;
        titulo = "Recusadas";
        solicitacoes = await getSolicitacoesNegadasEscola(minhaEscolaUUID);
        break;

      case STATUS.CANCELADAS:
        tipoCard = CARD_TYPE_ENUM.CANCELADO;
        icone = ICON_CARD_TYPE_ENUM.CANCELADO;
        titulo = "Canceladas";
        solicitacoes = await getSolicitacoesCanceladasEscola(minhaEscolaUUID);
        break;

      case STATUS.AUTORIZADAS:
        tipoCard = CARD_TYPE_ENUM.APROVADO;
        icone = ICON_CARD_TYPE_ENUM.APROVADO;
        titulo = "Autorizadas";
        solicitacoes = await getSolicitacoesAutorizadasEscola(minhaEscolaUUID);
        break;

      case STATUS.PENDENTES:
        tipoCard = CARD_TYPE_ENUM.PENDENTE;
        icone = ICON_CARD_TYPE_ENUM.PENDENTE;
        titulo = "Pendentes";
        solicitacoes = await getSolicitacoesPendentesEscola(minhaEscolaUUID);
        break;

      default:
        break;
    }

    solicitacoes = ajustarFormatoLog(solicitacoes.results);
    this.setState({
      solicitacoes,
      solicitacoesFiltrados: solicitacoes,
      tipoCard,
      icone,
      titulo
    });
  }

  render() {
    const { solicitacoesFiltrados, titulo, tipoCard, icone } = this.state;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <div className="pr-3">
            <InputSearch
              voltarLink={`/${ESCOLA}/${PAINEL_CONTROLE}`}
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
