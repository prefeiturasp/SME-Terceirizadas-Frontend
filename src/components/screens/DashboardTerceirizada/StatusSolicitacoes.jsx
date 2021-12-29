import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { meusDados } from "../../../services/perfil.service";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import { ordenaPorDate, extrairStatusDaSolicitacaoURL } from "./helper";
import { getMeusLotes } from "services/lote.service";

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
      icone: "...",
      selecionarTodos: false,
      listaLotes: null
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

  onPesquisarChanged(values) {
    let solicitacoesFiltrados = this.state.solicitacoes;
    if (values.lote && values.lote.length > 0) {
      solicitacoesFiltrados = this.filtrarLote(
        solicitacoesFiltrados,
        values.lote
      );
    }
    if (values.status && values.status.length > 0) {
      solicitacoesFiltrados = this.filtrarStatus(
        solicitacoesFiltrados,
        values.status
      );
    }
    if (values.titulo && values.titulo.length > 0) {
      solicitacoesFiltrados = this.filtrarNome(
        solicitacoesFiltrados,
        values.titulo
      );
    }
    this.setState({ solicitacoesFiltrados });
  }

  filtrarNome(listaFiltro, value) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  filtrarStatus(listaFiltro, value) {
    if (value === "1") {
      listaFiltro = listaFiltro.filter(item => item.conferido === true);
    }
    if (value === "0") {
      listaFiltro = listaFiltro.filter(item => item.conferido === false);
    }
    return listaFiltro;
  }

  filtrarLote(listaFiltro, value) {
    listaFiltro = listaFiltro.filter(item => item.lote_uuid === value);
    return listaFiltro;
  }

  async componentDidMount() {
    const {
      endpointGetSolicitacoes,
      formatarDadosSolicitacao,
      status
    } = this.props;
    const url = window.location.href;
    let tipoSolicitacao = extrairStatusDaSolicitacaoURL(url);
    this.setState({ tipoSolicitacao });
    const listaStatus = Array.isArray(status) ? status : [status];
    const dadosMeus = await meusDados();
    const terceirizadaUUID = dadosMeus.vinculo_atual.instituicao.uuid;
    const promises = listaStatus.map(status =>
      endpointGetSolicitacoes(status || terceirizadaUUID)
    );
    const retornos = await Promise.all(promises);
    let solicitacoes = [];
    retornos.forEach(
      retorno =>
        (solicitacoes = solicitacoes.concat(
          formatarDadosSolicitacao(
            retorno.data ? retorno.data.results : retorno.results
          )
        ))
    );
    solicitacoes = solicitacoes.sort(ordenaPorDate);
    await getMeusLotes().then(response => {
      this.setState({
        listaLotes: [{ nome: "Selecione um lote", uuid: "" }].concat(
          response.results
        )
      });
    });
    this.setState({
      solicitacoes,
      solicitacoesFiltrados: solicitacoes
    });
  }

  render() {
    const { solicitacoesFiltrados, tipoSolicitacao, listaLotes } = this.state;
    const { titulo, tipoCard, icone } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="card mt-3">
          <div className="card-body">
            <div className="pr-3">
              <InputSearchPendencias
                voltarLink={`/`}
                filterList={this.onPesquisarChanged}
                tipoSolicitacao={tipoSolicitacao}
                listaLotes={listaLotes}
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
      </form>
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
