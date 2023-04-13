import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import { meusDados } from "../../../services/perfil.service";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import { Paginacao } from "../../Shareable/Paginacao";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import { ordenaPorDate, extrairStatusDaSolicitacaoURL } from "./helper";
import { getMeusLotes } from "services/lote.service";
import {
  usuarioEhCogestorDRE,
  usuarioEhEmpresaTerceirizada
} from "helpers/utilities";
import {
  ENDPOINT_HOMOLOGACOES_PRODUTO_STATUS,
  TIPO_PERFIL
} from "constants/shared";
import { GESTAO_PRODUTO_CARDS } from "configs/constants";
import { getHomologacoesDeProdutoPorStatusTitulo } from "services/produto.service";

function StatusSolicitacoes(
  endpointGetSolicitacoes,
  formatarDadosSolicitacao,
  { status, typingTimeout, handleSubmit, ...props }
) {
  const [dadosMeus, setDadosMeus] = useState(null);
  const [solicitacoes, setSolicitacoes] = useState([
    {
      text: "...",
      date: "...",
      link: "..."
    }
  ]);
  const [solicitacoesFiltrados, setSolicitacoesFiltrados] = useState([
    {
      text: "...",
      date: "...",
      link: "..."
    }
  ]);
  const [tipoSolicitacao, setTipoSolicitacao] = useState(null);
  const [titulo, setTitulo] = useState("...");
  const [tipoCard, setTipoCard] = useState("...");
  const [icone, setIcone] = useState("...");
  const [listaLotes, setListaLotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalCurrentPage, setOriginalCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [solicitacoesPaginaAtual, setSolicitacoesPaginaAtual] = useState([
    {
      text: "...",
      date: "...",
      link: "..."
    }
  ]);
  const [todasSolicitacoesCardAtual, setTodasSolicitacoesCardAtual] = useState([
    {
      text: "...",
      date: "...",
      link: "..."
    }
  ]);
  const [solicitacoesCardRespQuest, setSolicitacoesCardRespQuest] = useState([
    {
      text: "...",
      date: "...",
      link: "..."
    }
  ]);
  const [originalCount, setOriginalCount] = useState(null);

  const onPesquisarChanged = async values => {
    const { status, formatarDadosSolicitacao } = props;
    const data = {};
    let solicitacoes = [];
    let solicitacoesFiltrados = solicitacoesPaginaAtual;

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(async () => {
      if (values.titulo && values.titulo.length > 2) {
        const listaStatus = Array.isArray(status) ? status : [status];
        data["titulo_produto"] = values.titulo;
        setLoading(true);
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
                  props.titulo
                )
              ))
          );
          if (
            props.titulo ===
            GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE
          ) {
            solicitacoesFiltrados = cardResponderQuestionamentosCodae(
              solicitacoes
            );
          } else {
            solicitacoesFiltrados = solicitacoes;
          }
          setCount(1);
          setCurrentPage(1);
          setLoading(false);
          setSolicitacoesFiltrados(solicitacoesFiltrados);
        } else {
          setLoading(false);
          setErro(true);
        }
      }
      if (
        values.titulo === undefined ||
        (values.titulo && values.titulo.length < 3)
      ) {
        solicitacoesFiltrados = solicitacoesPaginaAtual;
        setCount(originalCount);
        setCurrentPage(originalCurrentPage);
      }
    }, 1000);
    if (values.lote && values.lote.length > 0) {
      solicitacoesFiltrados = filtrarLote(solicitacoesFiltrados, values.lote);
    }
    if (values.status && values.status.length > 0) {
      solicitacoesFiltrados = filtrarStatus(
        solicitacoesFiltrados,
        values.status
      );
    }
    setSolicitacoesFiltrados(solicitacoesFiltrados);
  };

  const filtrarStatus = (listaFiltro, value) => {
    if (value === "1") {
      listaFiltro = listaFiltro.filter(item => item.conferido === true);
    }
    if (value === "0") {
      listaFiltro = listaFiltro.filter(item => item.conferido === false);
    }
    return listaFiltro;
  };

  const filtrarLote = (listaFiltro, value) => {
    listaFiltro = listaFiltro.filter(item => item.lote_uuid === value);
    return listaFiltro;
  };

  const navegacaoPage = async paginaAtual => {
    setOriginalCurrentPage(paginaAtual);

    const listaStatus = Array.isArray(status) ? status : [status];
    let solicitacoes = [];

    if (titulo === GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE) {
      const solicitacoesPaginaAtual = solicitacoesCardRespQuest.slice(
        paginaAtual * pageSize - pageSize,
        paginaAtual * pageSize
      );
      setSolicitacoesPaginaAtual(solicitacoesPaginaAtual);
      setSolicitacoesFiltrados(solicitacoesPaginaAtual);
      setCurrentPage(paginaAtual);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const promises = listaStatus.map(status =>
        endpointGetSolicitacoes(
          status || dadosMeus.vinculo_atual.instituicao.uuid,
          [
            "Autorizadas",
            "Negadas",
            "Canceladas",
            "Questionamentos da CODAE"
          ].includes(titulo)
            ? { limit: 100, offset: (paginaAtual - 1) * 100 }
            : paginaAtual
        )
      );
      const retornos = await Promise.all(promises);
      let solicitacoes = [];

      retornos.forEach(
        retorno =>
          (solicitacoes = solicitacoes.concat(
            formatarDadosSolicitacao(
              retorno.data ? retorno.data.results : retorno.results,
              null,
              titulo
            )
          ))
      );

      setNextPage(retornos[0].data.next);
      setPreviousPage(retornos[0].data.previous);
    } catch {
      setLoading(false);
      setErro(true);
    }

    setSolicitacoesPaginaAtual(solicitacoes);
    setSolicitacoesFiltrados(solicitacoes);
    setCurrentPage(paginaAtual);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      let tipoSolicitacao = extrairStatusDaSolicitacaoURL(url);
      setTipoSolicitacao(tipoSolicitacao);
      const listaStatus = Array.isArray(status) ? status : [status];
      const dadosMeus = await meusDados();
      setDadosMeus(dadosMeus);
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
                titulo
              )
            ))
        );

        setCount(retornos[0].data.count);
        setPageSize(retornos[0].data.page_size);
        setNextPage(retornos[0].data.next);
        setOriginalCount(retornos[0].data.count);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setErro(true);
      }

      if (solicitacoes.length > 0 && !erro && loading) {
        setLoading(false);
      }

      if (titulo === GESTAO_PRODUTO_CARDS.RESPONDER_QUESTIONAMENTOS_DA_CODAE) {
        solicitacoes = cardResponderQuestionamentosCodae(solicitacoes);
      } else {
        solicitacoes = solicitacoes.sort(ordenaPorDate);
      }

      if (usuarioEhEmpresaTerceirizada() || usuarioEhCogestorDRE()) {
        await getMeusLotes().then(response => {
          setListaLotes(
            [{ nome: "Selecione um lote", uuid: "" }].concat(response.results)
          );
        });
      }

      setSolicitacoes(solicitacoes);
      setSolicitacoesFiltrados(solicitacoes);
      setSolicitacoesPaginaAtual(solicitacoes);
    };

    fetchData();
  }, []);

  const cardResponderQuestionamentosCodae = solicitacoes => {
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="card mt-3">
        <div className="card-body">
          {!erro ? (
            <Spin tip="Carregando..." spinning={loading}>
              <div className="pr-3">
                <InputSearchPendencias
                  voltarLink={`/`}
                  filterList={onPesquisarChanged}
                  tipoSolicitacao={tipoSolicitacao}
                  listaLotes={listaLotes}
                  disabled={loading}
                  marcaProduto={marcaProduto}
                  editalProduto={editalProduto}
                  nomeProduto={nomeProduto}
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
                onChange={navegacaoPage}
                total={count}
                pageSize={
                  window.location.pathname.includes("gestao-produto")
                    ? 10
                    : pageSize
                }
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

const mapStateToProps = state => {
  const marcaProduto = state.filtersProduto.marcaProduto;
  const editalProduto = state.filtersProduto.editalProduto;
  const nomeProduto = state.filtersProduto.nomeProduto;
  return {
    marcaProduto: marcaProduto,
    editalProduto: editalProduto,
    nomeProduto: nomeProduto
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "statusSolicitacoes",
    enableReinitialize: true
  })(StatusSolicitacoes)
);
