import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  getSolicitacoesAutorizadasEscola,
  getSolicitacoesCanceladasEscola,
  getSolicitacoesNegadasEscola,
  getSolicitacoesPendentesEscola
} from "../../../services/painelEscola.service";
import { meusDados } from "../../../services/perfil.service";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import { STATUS } from "../const";
import { ajustarFormatoLog } from "../helper";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";

export class StatusSolicitacoes extends Component {
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
    this.selecionarTodos = this.selecionarTodos.bind(this);
    this.onCheckClicked = this.onCheckClicked.bind(this);
  }

  selecionarTodos(solicitacoes) {
    const selecionarTodos = !this.state.selecionarTodos;
    solicitacoes.forEach((_, key) => {
      this.props.change(`check_${key}`, selecionarTodos);
    });
    this.props.change("selecionar_todos", selecionarTodos);
    this.setState({ selecionarTodos });
  }

  onCheckClicked(solicitacoes, key) {
    solicitacoes[key].checked = !solicitacoes[key].checked;
    this.props.change(`check_${key}`, solicitacoes[key].checked);
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
    const minhaEscolaUUID = dadosMeus.vinculo_atual.instituicao.uuid;

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
        tipoCard = CARD_TYPE_ENUM.AUTORIZADO;
        icone = ICON_CARD_TYPE_ENUM.AUTORIZADO;
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
            <InputSearchPendencias
              voltarLink={`/`}
              filterList={this.onPesquisarChanged}
            />
          </div>
          <div className="pb-3" />
          <CardListarSolicitacoes
            titulo={titulo}
            solicitacoes={solicitacoesFiltrados}
            tipo={tipoCard}
            icone={icone}
            selecionarTodos={this.selecionarTodos}
            onCheckClicked={this.onCheckClicked}
          />
        </div>
      </div>
    );
  }
}

const StatusSolicitacoesForm = reduxForm({
  form: "statusSolicitacoes",
  enableReinitialize: true
})(StatusSolicitacoes);

const selector = formValueSelector("statusSolicitacoesForm");
const mapStateToProps = state => {
  return {
    selecionar_todos: selector(state, "selecionar_todos")
  };
};

export default connect(mapStateToProps)(StatusSolicitacoesForm);
