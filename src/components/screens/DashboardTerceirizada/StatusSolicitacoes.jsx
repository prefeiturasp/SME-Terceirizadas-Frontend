import React, { Component } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { meusDados } from "../../../services/perfil.service";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import { Paginacao } from "../../Shareable/Paginacao";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import { ordenaPorDate, extrairStatusDaSolicitacaoURL } from "./helper";
import { getMeusLotes } from "services/lote.service";
import {
  usuarioEhAdministradorDRE,
  usuarioEhTerceirizada
} from "helpers/utilities";
import {
  ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS,
  TIPO_PERFIL
} from "constants/shared";
import { GESTAO_PRODUTO_CARDS } from "configs/constants";

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
      listaLotes: null,
      loading: true,
      erro: false,
      currentPage: 1,
      originalCurrentPage: 1,
      count: 0,
      pageSize: 0,
      nextPage: null,
      previousPage: null,
      solicitacoesPaginaAtual: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      todasSolicitacoesCardAtual: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      originalCount: null
    };

    this.onPesquisarChanged = this.onPesquisarChanged.bind(this);
  }

  onPesquisarChanged(values) {
    let solicitacoesFiltrados = this.state.solicitacoes;
    let todasSolicitacoesCardAtual = this.state.todasSolicitacoesCardAtual;
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
        todasSolicitacoesCardAtual,
        values.titulo
      );
      this.setState({
        count: solicitacoesFiltrados.length,
        currentPage: 1
      });
    }
    if (values.titulo === undefined) {
      solicitacoesFiltrados = this.state.solicitacoesPaginaAtual;
      this.setState({
        count: this.state.originalCount,
        currentPage: this.state.originalCurrentPage
      });
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

  navegacaoPage = async paginaAtual => {
    const {
      endpointGetSolicitacoes,
      formatarDadosSolicitacao,
      status
    } = this.props;

    this.setState({
      originalCurrentPage: paginaAtual
    });

    const listaStatus = Array.isArray(status) ? status : [status];
    let solicitacoes = [];

    try {
      this.setState({
        loading: true
      });
      const promises = listaStatus.map(status =>
        endpointGetSolicitacoes(status, paginaAtual)
      );
      const retornos = await Promise.all(promises);
      retornos.forEach(
        retorno =>
          (solicitacoes = solicitacoes.concat(
            formatarDadosSolicitacao(
              retorno.data ? retorno.data.results : retorno.results,
              null,
              this.props.titulo
            )
          ))
      );

      this.setState({
        nextPage: retornos[0].data.next,
        previousPage: retornos[0].data.previous
      });
    } catch {
      this.setState({
        loading: false,
        erro: true
      });
    }
    this.setState({
      solicitacoesPaginaAtual: solicitacoes,
      solicitacoesFiltrados: solicitacoes,
      currentPage: paginaAtual,
      loading: false
    });
  };

  async componentDidMount() {
    const {
      endpointGetSolicitacoes,
      formatarDadosSolicitacao,
      status
    } = this.props;
    const { erro, loading, currentPage } = this.state;
    const nomeUsuario = localStorage.getItem("nome");
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    const url = window.location.href;
    let tipoSolicitacao = extrairStatusDaSolicitacaoURL(url);
    this.setState({ tipoSolicitacao });
    const listaStatus = Array.isArray(status) ? status : [status];
    const dadosMeus = await meusDados();
    const terceirizadaUUID = dadosMeus.vinculo_atual.instituicao.uuid;
    let solicitacoes = [];
    try {
      const promises = listaStatus.map(status =>
        endpointGetSolicitacoes(status || terceirizadaUUID, currentPage)
      );
      const retornos = await Promise.all(promises);
      retornos.forEach(
        retorno =>
          (solicitacoes = solicitacoes.concat(
            formatarDadosSolicitacao(
              retorno.data ? retorno.data.results : retorno.results,
              null,
              this.props.titulo
            )
          ))
      );
      this.setState({
        count: retornos[0].data.count,
        pageSize: retornos[0].data.page_size,
        nextPage: retornos[0].data.next,
        originalCount: retornos[0].data.count
      });
    } catch {
      this.setState({
        loading: false,
        erro: true
      });
    }
    let todasSolicitacoesCardAtual = [];
    try {
      const promises = listaStatus.map(status =>
        endpointGetSolicitacoes(status || terceirizadaUUID)
      );
      const retornos = await Promise.all(promises);
      retornos.forEach(
        retorno =>
          (todasSolicitacoesCardAtual = todasSolicitacoesCardAtual.concat(
            formatarDadosSolicitacao(
              retorno.data ? retorno.data.results : retorno.results,
              null,
              this.props.titulo
            )
          ))
      );
    } catch {
      this.setState({
        erro: true
      });
    }
    if (solicitacoes.length > 0 && !erro && loading) {
      this.setState({ loading: false });
    }
    if (
      this.props.titulo ===
      GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE
    ) {
      if (tipoPerfil === TIPO_PERFIL.TERCEIRIZADA) {
        solicitacoes = solicitacoes
          .filter(
            solicitacao =>
              ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_RECLAMACAO.toUpperCase() ===
              solicitacao.status
          )
          .sort(ordenaPorDate);
      } else if (tipoPerfil === TIPO_PERFIL.ESCOLA) {
        solicitacoes = solicitacoes
          .filter(
            solicitacao =>
              nomeUsuario ===
                `"${solicitacao.nome_usuario_log_de_reclamacao}"` &&
              ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONOU_UE.toUpperCase() ===
                solicitacao.status
          )
          .sort(ordenaPorDate);
      } else if (tipoPerfil === TIPO_PERFIL.SUPERVISAO_NUTRICAO) {
        solicitacoes = solicitacoes
          .filter(
            solicitacao =>
              ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONOU_NUTRISUPERVISOR.toUpperCase() ===
              solicitacao.status
          )
          .sort(ordenaPorDate);
      }
    } else {
      solicitacoes = solicitacoes.sort(ordenaPorDate);
    }
    if (usuarioEhTerceirizada() || usuarioEhAdministradorDRE()) {
      await getMeusLotes().then(response => {
        this.setState({
          listaLotes: [{ nome: "Selecione um lote", uuid: "" }].concat(
            response.results
          )
        });
      });
    }
    this.setState({
      solicitacoes,
      solicitacoesFiltrados: solicitacoes,
      solicitacoesPaginaAtual: solicitacoes,
      todasSolicitacoesCardAtual
    });
  }

  render() {
    const {
      solicitacoesFiltrados,
      tipoSolicitacao,
      listaLotes,
      loading,
      erro,
      count,
      pageSize,
      currentPage
    } = this.state;
    const { titulo, tipoCard, icone } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="card mt-3">
          <div className="card-body">
            {!loading && !erro ? (
              <>
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
                />
                <Paginacao
                  onChange={this.navegacaoPage}
                  total={count}
                  pageSize={pageSize}
                  current={currentPage}
                />
              </>
            ) : !erro ? (
              <div className="carregando-conteudo">
                <Spin tip="Carregando..." />
              </div>
            ) : (
              <div>Erro ao carregar as Solicitações</div>
            )}
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
