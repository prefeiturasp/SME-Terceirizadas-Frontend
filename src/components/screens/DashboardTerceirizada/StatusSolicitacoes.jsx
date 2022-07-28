import React, { Component } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
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
import { getHomologacoesDeProdutoPorStatusTitulo } from "services/produto.service";

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
      pageSize: 10,
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
      solicitacoesCardRespQuest: [
        {
          text: "...",
          date: "...",
          link: "..."
        }
      ],
      originalCount: null
    };
    this.typingTimeout = null;

    this.onPesquisarChanged = this.onPesquisarChanged.bind(this);
  }

  async onPesquisarChanged(values) {
    const { status, formatarDadosSolicitacao } = this.props;
    const data = {};
    let solicitacoes = [];
    let solicitacoesFiltrados = this.state.solicitacoesPaginaAtual;

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(async () => {
      if (values.titulo && values.titulo.length > 2) {
        const listaStatus = Array.isArray(status) ? status : [status];
        data["titulo_produto"] = values.titulo;
        this.setState({
          loading: true
        });
        const promises = listaStatus.map(status =>
          getHomologacoesDeProdutoPorStatusTitulo(status, data)
        );
        const retornos = await Promise.all(promises);
        if (retornos[0].status === HTTP_STATUS.OK) {
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
          if (
            this.props.titulo ===
            GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE
          ) {
            solicitacoesFiltrados = this.cardResponderQuestionamentosCodae(
              solicitacoes
            );
          } else {
            solicitacoesFiltrados = solicitacoes;
          }
          this.setState({
            count: 1,
            currentPage: 1,
            loading: false,
            solicitacoesFiltrados: solicitacoesFiltrados
          });
        } else {
          this.setState({
            loading: false,
            erro: true
          });
        }
      }
      if (
        values.titulo === undefined ||
        (values.titulo && values.titulo.length < 3)
      ) {
        solicitacoesFiltrados = this.state.solicitacoesPaginaAtual;
        this.setState({
          count: this.state.originalCount,
          currentPage: this.state.originalCurrentPage
        });
      }
    }, 1000);
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
    const { solicitacoesCardRespQuest, pageSize } = this.state;

    this.setState({
      originalCurrentPage: paginaAtual
    });

    const listaStatus = Array.isArray(status) ? status : [status];
    let solicitacoes = [];

    if (
      this.props.titulo ===
      GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE
    ) {
      const solicitacoesPaginaAtual = solicitacoesCardRespQuest.slice(
        paginaAtual * pageSize - pageSize,
        paginaAtual * pageSize
      );
      this.setState({
        solicitacoesPaginaAtual: solicitacoesPaginaAtual,
        solicitacoesFiltrados: solicitacoesPaginaAtual,
        currentPage: paginaAtual,
        loading: false
      });
      return;
    }

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
        originalCount: retornos[0].data.count,
        loading: false
      });
    } catch (e) {
      this.setState({
        loading: false,
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
      solicitacoes = this.cardResponderQuestionamentosCodae(solicitacoes);
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
      solicitacoesPaginaAtual: solicitacoes
    });
  }

  cardResponderQuestionamentosCodae = solicitacoes => {
    const nomeUsuario = localStorage.getItem("nome");
    const tipoPerfil = localStorage.getItem("tipo_perfil");
    if (tipoPerfil === TIPO_PERFIL.TERCEIRIZADA) {
      return solicitacoes
        .filter(
          solicitacao =>
            ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_PEDIU_ANALISE_RECLAMACAO.toUpperCase() ===
            solicitacao.status
        )
        .sort(ordenaPorDate);
    } else if (tipoPerfil === TIPO_PERFIL.ESCOLA) {
      return solicitacoes
        .filter(
          solicitacao =>
            nomeUsuario === `"${solicitacao.nome_usuario_log_de_reclamacao}"` &&
            ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONOU_UE.toUpperCase() ===
              solicitacao.status
        )
        .sort(ordenaPorDate);
    } else if (tipoPerfil === TIPO_PERFIL.SUPERVISAO_NUTRICAO) {
      return solicitacoes
        .filter(
          solicitacao =>
            ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS.CODAE_QUESTIONOU_NUTRISUPERVISOR.toUpperCase() ===
            solicitacao.status
        )
        .sort(ordenaPorDate);
    }
  };

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
            {!erro ? (
              <Spin tip="Carregando..." spinning={loading}>
                <div className="pr-3">
                  <InputSearchPendencias
                    voltarLink={`/`}
                    filterList={this.onPesquisarChanged}
                    tipoSolicitacao={tipoSolicitacao}
                    listaLotes={listaLotes}
                    disabled={loading}
                  />
                </div>
                <div className="pb-3" />
                <CardListarSolicitacoes
                  titulo={titulo}
                  solicitacoes={solicitacoesFiltrados}
                  tipo={tipoCard}
                  icone={icone}
                />
                {!loading && solicitacoesFiltrados.length === 0 && (
                  <div>Não há solicitações neste status</div>
                )}
                <Paginacao
                  onChange={this.navegacaoPage}
                  total={count}
                  pageSize={pageSize}
                  current={currentPage}
                />
              </Spin>
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
