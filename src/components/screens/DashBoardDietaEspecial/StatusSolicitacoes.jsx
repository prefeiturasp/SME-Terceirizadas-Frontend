import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { meusDados } from "../../../services/perfil.service";
import {
  getPaginacaoSolicitacoesDietaEspecial,
  getPaginacaoSolicitacoesDietaEspecialCODAE
} from "../../../services/dashBoardDietaEspecial.service";
import { extrairStatusDaSolicitacaoURL } from "./helpers";
import {
  CODAE,
  TERCEIRIZADA,
  ESCOLA,
  DRE,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
  AUTORIZADOS_DIETA,
  AUTORIZADAS_TEMPORARIAMENTE_DIETA,
  CANCELADOS_DIETA,
  PENDENTES_DIETA,
  NEGADOS_DIETA,
  DIETA_ESPECIAL_SOLICITACOES,
  SOLICITACOES_AUTORIZADAS_TEMPORARIAMENTE,
  SOLICITACOES_INATIVAS_TEMPORARIAMENTE,
  SOLICITACOES_AGUARDANDO_INICIO_VIGENCIA,
  INATIVAS_TEMPORARIAMENTE_DIETA,
  SOLICITACOES_INATIVAS,
  INATIVAS_DIETA,
  AGUARDANDO_VIGENCIA_DIETA
} from "../../../configs/constants";
import {
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { ajustarFormatoLog } from "../helper";
import { InputSearchPendencias } from "../../Shareable/InputSearchPendencias";
import CardListarSolicitacoes from "../../Shareable/CardListarSolicitacoes";
import { Paginacao } from "../../Shareable/Paginacao";
import { getNomeCardAguardandoAutorizacao } from "helpers/dietaEspecial";
import { getMeusLotes } from "services/lote.service";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import { Spin } from "antd";
import { resetCamposDieta } from "../../../reducers/filtersDietaReducer";

function StatusSolicitacoes(props) {
  const [instituicao, setInstituicao] = useState(null);
  const [count, setCount] = useState(0);
  const [tipoSolicitacao, setTipoSolicitacao] = useState(null);
  const [solicitacoes, setSolicitacoes] = useState(null);
  const [listaSolicitacoesSemFiltro, setListaSolicitacoesSemFiltro] = useState(
    null
  );
  const [originalCount, setOriginalCount] = useState(null);
  const [tipoCard, setTipoCard] = useState(null);
  const [icone, setIcone] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [solicitacoesFiltrados, setSolicitacoesFiltrados] = useState(null);
  const [urlPaginacao, setUrlPaginacao] = useState(null);
  const [selecionarTodos, setSelecionarTodos] = useState(false);
  const [listaLotes, setListaLotes] = useState(null);
  const [filtrouInicial, setFiltroInicial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propsDietaRedux, setPropsDietaRedux] = useState({});

  const selectTodos = solicitacoes => {
    const novoEstadoSelecionarTodos = !selecionarTodos;
    solicitacoes.forEach((_, key) => {
      props.change(`check_${key}`, novoEstadoSelecionarTodos);
    });
    props.change("selecionar_todos", novoEstadoSelecionarTodos);
    setSelecionarTodos(novoEstadoSelecionarTodos);
    return novoEstadoSelecionarTodos;
  };
  const onCheckClicked = (solicitacoes, key, props) => {
    solicitacoes[key].checked = !solicitacoes[key].checked;
    props.change(`check_${key}`, solicitacoes[key].checked);
  };

  const onPesquisarChanged = values => {
    let filtrados = listaSolicitacoesSemFiltro;

    if (values.titulo === undefined) values.titulo = "";

    if (values.lote && values.lote.length > 0) {
      filtrados = filtrarLote(filtrados, values.lote);
    }

    if (values.status && values.status.length > 0) {
      filtrados = filtrarStatus(filtrados, values.status);
    }

    if (values.titulo && values.titulo.length > 0) {
      filtrados = filtrarNome(filtrados, values.titulo);
    }

    filtrados && setCount(filtrados.length);

    if (values.titulo === "") {
      setCount(originalCount);
    }

    setSolicitacoesFiltrados(filtrados);
  };

  const filtragemInicial = () => {
    const propsDieta = {
      tituloDieta: props.tituloDieta,
      loteDieta: props.loteDieta,
      statusDieta: props.statusDieta
    };
    setPropsDietaRedux(propsDieta);
    const values = {
      titulo: propsDieta.tituloDieta || "",
      lote: propsDieta.loteDieta || "",
      status: propsDieta.statusDieta || ""
    };
    props.resetCamposDieta();
    onPesquisarChanged(values);
  };

  const {
    visao,
    getDietaEspecialPendenteAutorizacao,
    getDietaEspecialNegadas,
    getDietaEspecialAutorizadas,
    getDietaEspecialCanceladas,
    getDietaEspecialAutorizadasTemporariamente,
    getDietaEspecialAguardandoVigencia,
    getDietaEspecialInativasTemporariamente,
    getDietaEspecialInativas
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      let tipoSolicitacao = extrairStatusDaSolicitacaoURL(url);
      setTipoSolicitacao(tipoSolicitacao);
      meusDados().then(response => {
        setInstituicao(response.vinculo_atual.instituicao);
      });
      if (usuarioEhEmpresaTerceirizada()) {
        const response = await getMeusLotes();
        setListaLotes(
          [{ nome: "Selecione um lote", uuid: "" }].concat(
            response.data.results
          )
        );
      }
    };
    fetchData();
  }, []);

  const updateSolicitacoesState = (response, tipo, titulo, urlPaginacao) => {
    setSolicitacoes(ajustarFormatoLog(response.data.results, tipo));
    setCount(response.count);
    setOriginalCount(response.count);
    setTipoCard(CARD_TYPE_ENUM[tipo.toUpperCase()]);
    setIcone(ICON_CARD_TYPE_ENUM[tipo.toUpperCase()]);
    setTitulo(titulo);
    setUrlPaginacao(urlPaginacao);
  };

  const updateSolicitacoesSemFiltro = (response, tipo) => {
    setListaSolicitacoesSemFiltro(
      ajustarFormatoLog(response.data.results, tipo)
    );
  };

  const getSolicitacoesAutorizadas = async () => {
    const response = await getDietaEspecialAutorizadas(instituicao.uuid);
    updateSolicitacoesState(
      response,
      "autorizado",
      "Autorizadas",
      retornaUrlPaginacao(visao, AUTORIZADOS_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialAutorizadas(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado, "autorizadas");
  };

  const getSolicitacoesNegadas = async () => {
    const response = await getDietaEspecialNegadas(instituicao.uuid);
    updateSolicitacoesState(
      response,
      "negado",
      "Negadas",
      retornaUrlPaginacao(visao, NEGADOS_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialNegadas(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado, "negadas");
  };

  const getSolicitacoesPendentesAutorizacao = async () => {
    const response = await getDietaEspecialPendenteAutorizacao(
      instituicao.uuid
    );
    updateSolicitacoesState(
      response,
      "pendente",
      getNomeCardAguardandoAutorizacao(),
      retornaUrlPaginacao(visao, PENDENTES_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialPendenteAutorizacao(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado, "pendentes-aut");
  };

  const getSolicitacoesCanceladas = async () => {
    const response = await getDietaEspecialCanceladas(instituicao.uuid);
    updateSolicitacoesState(
      response,
      "cancelado",
      "Canceladas",
      retornaUrlPaginacao(visao, CANCELADOS_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialCanceladas(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado, "canceladas");
  };

  const getSolicitacoesAutorizadasTemporariamente = async () => {
    const response = await getDietaEspecialAutorizadasTemporariamente(
      instituicao.uuid
    );
    updateSolicitacoesState(
      response.data,
      "autorizado",
      "Autorizadas Temporariamente",
      retornaUrlPaginacao(visao, AUTORIZADAS_TEMPORARIAMENTE_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialAutorizadasTemporariamente(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado.data, "autorizadas-temp");
  };

  const getSolicitacoesAguardandoInicioVigencia = async () => {
    const response = await getDietaEspecialAguardandoVigencia(instituicao.uuid);
    updateSolicitacoesState(
      response.data,
      "aguardando_analise_reclamacao",
      "Aguardando início da vigência",
      retornaUrlPaginacao(visao, AGUARDANDO_VIGENCIA_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialAguardandoVigencia(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(
      responseNaoPaginado.data,
      "aguardando-inicio-vigencia"
    );
  };

  const getSolicitacoesInativasTemporariamente = async () => {
    const response = await getDietaEspecialInativasTemporariamente(
      instituicao.uuid
    );
    updateSolicitacoesState(
      response.data,
      "aguardando_analise_reclamacao",
      "Inativas Temporariamente",
      retornaUrlPaginacao(visao, INATIVAS_TEMPORARIAMENTE_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialInativasTemporariamente(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado.data, "inativas-temp");
  };

  const getSolicitacoesInativas = async () => {
    const response = await getDietaEspecialInativas(instituicao.uuid);
    updateSolicitacoesState(
      response.data,
      "cancelado",
      "Inativas",
      retornaUrlPaginacao(visao, INATIVAS_DIETA)
    );
    const responseNaoPaginado = await getDietaEspecialInativas(
      instituicao.uuid,
      { sem_paginacao: true }
    );
    updateSolicitacoesSemFiltro(responseNaoPaginado.data, "inativas");
  };

  const solicitacaoHandlers = {
    [SOLICITACOES_PENDENTES]: getSolicitacoesPendentesAutorizacao,
    [SOLICITACOES_NEGADAS]: getSolicitacoesNegadas,
    [SOLICITACOES_AUTORIZADAS]: getSolicitacoesAutorizadas,
    [SOLICITACOES_CANCELADAS]: getSolicitacoesCanceladas,
    [SOLICITACOES_AUTORIZADAS_TEMPORARIAMENTE]: getSolicitacoesAutorizadasTemporariamente,
    [SOLICITACOES_AGUARDANDO_INICIO_VIGENCIA]: getSolicitacoesAguardandoInicioVigencia,
    [SOLICITACOES_INATIVAS_TEMPORARIAMENTE]: getSolicitacoesInativasTemporariamente,
    [SOLICITACOES_INATIVAS]: getSolicitacoesInativas
  };

  const getSolicitacoesAsync = async () => {
    const handler = solicitacaoHandlers[tipoSolicitacao];
    if (handler) {
      handler();
    }
  };

  useEffect(() => {
    if (tipoSolicitacao && instituicao) {
      getSolicitacoesAsync();
    }
  }, [tipoSolicitacao, instituicao]);

  useEffect(() => {
    if (solicitacoes && listaSolicitacoesSemFiltro) {
      setSolicitacoesFiltrados(solicitacoes);
    }
  }, [solicitacoes, listaSolicitacoesSemFiltro]);

  useEffect(() => {
    if (solicitacoesFiltrados && !filtrouInicial) {
      setFiltroInicial(true);
      filtragemInicial();
    }
  }, [solicitacoesFiltrados, filtrouInicial]);

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

  const filtrarNome = (listaFiltro, value) => {
    listaFiltro = listaFiltro.filter(item => {
      const wordToFilter = value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
  };

  const retornaUrlPaginacao = (visao, statusDieta) => {
    switch (visao) {
      case ESCOLA:
        return `${DIETA_ESPECIAL_SOLICITACOES.ESCOLA}/${statusDieta}`;
      case TERCEIRIZADA:
        return `${DIETA_ESPECIAL_SOLICITACOES.TERCEIRIZADA}/${statusDieta}`;
      case CODAE:
        return `${DIETA_ESPECIAL_SOLICITACOES.CODAE}/${statusDieta}`;
      case DRE:
        return `${DIETA_ESPECIAL_SOLICITACOES.DRE}/${statusDieta}`;
      default:
        break;
    }
  };

  const navegacaoPage = (multiploQuantidade, quantidadePorPagina) => {
    setLoading(true);
    const offSet = quantidadePorPagina * (multiploQuantidade - 1);
    const handleResponse = response => {
      setSolicitacoesFiltrados(ajustarFormatoLog(response.data.results));
      setSolicitacoes(ajustarFormatoLog(response.data.results));
      setLoading(false);
    };

    if (visao === CODAE) {
      getPaginacaoSolicitacoesDietaEspecialCODAE(urlPaginacao, offSet).then(
        handleResponse
      );
    } else {
      getPaginacaoSolicitacoesDietaEspecial(
        urlPaginacao,
        instituicao.uuid,
        offSet
      ).then(handleResponse);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="pr-3">
          <InputSearchPendencias
            voltarLink={`/`}
            filterList={onPesquisarChanged}
            tipoSolicitacao={tipoSolicitacao}
            listaLotes={listaLotes}
            propsDieta={propsDietaRedux}
          />
        </div>
        <div className="pb-3" />
        <Spin tip="Carregando..." spinning={!solicitacoesFiltrados || loading}>
          {solicitacoesFiltrados && (
            <CardListarSolicitacoes
              titulo={titulo}
              solicitacoes={solicitacoesFiltrados}
              tipo={tipoCard}
              icone={icone}
              selecionarTodos={selectTodos}
              onCheckClicked={onCheckClicked}
            />
          )}
          <Paginacao onChange={navegacaoPage} total={count} />
        </Spin>
      </div>
    </div>
  );
}

const StatusSolicitacoesDietaEspecialForm = reduxForm({
  form: "statusSolicitacoesDietaEspecial",
  enableReinitialize: true
})(StatusSolicitacoes);

const selector = formValueSelector("statusSolicitacoesDietaEspecialForm");
const mapStateToProps = state => {
  const statusDieta = state.filtersDieta.statusDieta;
  const loteDieta = state.filtersDieta.loteDieta;
  const tituloDieta = state.filtersDieta.tituloDieta;
  return {
    selecionar_todos: selector(state, "selecionar_todos"),
    statusDieta: statusDieta,
    loteDieta: loteDieta,
    tituloDieta: tituloDieta
  };
};

const mapDispatchToProps = dispatch => ({
  resetCamposDieta: () => dispatch(resetCamposDieta())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusSolicitacoesDietaEspecialForm);
