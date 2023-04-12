import React, { Fragment, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { useLocation } from "react-router-dom";
import { Field, Form, FormSpy } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import arrayMutators from "final-form-arrays";
import {
  addDays,
  format,
  getDay,
  getWeeksInMonth,
  getYear,
  isSunday,
  lastDayOfMonth,
  startOfMonth,
  subDays
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Spin, Tabs } from "antd";

import InputText from "components/Shareable/Input/InputText";
import InputValueMedicao from "components/Shareable/Input/InputValueMedicao";
import Botao from "components/Shareable/Botao";
import {
  toastError,
  toastSuccess,
  toastWarn
} from "components/Shareable/Toast/dialogs";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import ModalObservacaoDiaria from "./components/ModalObservacaoDiaria";
import ModalErro from "./components/ModalErro";
import { deepCopy, deepEqual, tiposAlimentacaoETEC } from "helpers/utilities";
import {
  botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada,
  botaoAdicionarObrigatorio,
  botaoAdicionarObrigatorioTabelaAlimentacao,
  campoFrequenciaValor0ESemObservacao,
  exibirTooltipLPRAutorizadas,
  exibirTooltipRPLAutorizadas,
  exibirTooltipErroQtdMaiorQueAutorizado,
  exibirTooltipFrequenciaDiaNaoLetivo,
  exibirTooltipSuspensoesAutorizadas,
  exibirTooltipQtdKitLancheDiferenteSolAlimentacoesAutorizadas,
  exibirTooltipKitLancheSolAlimentacoes,
  exibirTooltipQtdLancheEmergencialDiferenteSolAlimentacoesAutorizadas,
  exibirTooltipLancheEmergencialSolAlimentacoes,
  exibirTooltipFrequenciaZeroTabelaEtec,
  exibirTooltipLancheEmergTabelaEtec,
  validacoesTabelaAlimentacao,
  validacoesTabelasDietas,
  validarFormulario,
  campoComSuspensaoAutorizadaESemObservacao,
  campoLancheComLPRAutorizadaESemObservacao,
  campoRefeicaoComRPLAutorizadaESemObservacao,
  exibirTooltipSemAlimentacaoPreAutorizadaInformada,
  validacoesTabelaEtecAlimentacao
} from "./validacoes";
import {
  desabilitarField,
  deveExistirObservacao,
  formatarPayloadPeriodoLancamento,
  getSolicitacoesAlteracoesAlimentacaoAutorizadasAsync,
  getSolicitacoesInclusaoAutorizadasAsync,
  getSolicitacoesInclusoesEtecAutorizadasAsync,
  getSolicitacoesKitLanchesAutorizadasAsync,
  getSolicitacoesSuspensoesAutorizadasAsync,
  valorZeroFrequencia
} from "./helper";
import {
  getCategoriasDeMedicao,
  getDiasCalendario,
  getMatriculadosPeriodo,
  getLogDietasAutorizadasPeriodo,
  getValoresPeriodosLancamentos,
  setPeriodoLancamento,
  updateValoresPeriodosLancamentos
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import * as perfilService from "services/perfil.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { getListaDiasSobremesaDoce } from "services/medicaoInicial/diaSobremesaDoce.service";
import "./styles.scss";

export default () => {
  const initialStateWeekColumns = [
    { position: 0, dia: "29" },
    { position: 1, dia: "30" },
    { position: 2, dia: "01" },
    { position: 3, dia: "02" },
    { position: 4, dia: "03" },
    { position: 5, dia: "04" },
    { position: 6, dia: "05" }
  ];

  const [dadosIniciais, setDadosIniciais] = useState(null);
  const [semanaSelecionada, setSemanaSelecionada] = useState(1);
  const [mesAnoConsiderado, setMesAnoConsiderado] = useState(null);
  const [mesAnoFormatadoState, setMesAnoFormatadoState] = useState(null);
  const [weekColumns, setWeekColumns] = useState(initialStateWeekColumns);
  const [tabelaAlimentacaoRows, setTabelaAlimentacaoRows] = useState([]);
  const [tabelaDietaRows, setTabelaDietaRows] = useState([]);
  const [tabelaDietaEnteralRows, setTabelaDietaEnteralRows] = useState([]);
  const [
    tabelaSolicitacoesAlimentacaoRows,
    setTabelaSolicitacoesAlimentacaoRows
  ] = useState([]);
  const [tabelaEtecsAlimentacaoRows, setTabelaEtecAlimentacaoRows] = useState(
    []
  );
  const [categoriasDeMedicao, setCategoriasDeMedicao] = useState([]);
  const [inclusoesAutorizadas, setInclusoesAutorizadas] = useState(null);
  const [inclusoesEtecAutorizadas, setInclusoesEtecAutorizadas] = useState(
    null
  );
  const [suspensoesAutorizadas, setSuspensoesAutorizadas] = useState(null);
  const [
    alteracoesAlimentacaoAutorizadas,
    setAlteracoesAlimentacaoAutorizadas
  ] = useState(null);
  const [kitLanchesAutorizadas, setKitLanchesAutorizadas] = useState(null);
  const [
    dadosValoresInclusoesAutorizadasState,
    setDadosValoresInclusoesAutorizadasState
  ] = useState(null);
  const [
    dadosValoresInclusoesEtecAutorizadasState,
    setDadosValoresInclusoesEtecAutorizadasState
  ] = useState(null);
  const [valoresPeriodosLancamentos, setValoresPeriodosLancamentos] = useState(
    []
  );
  const [valoresMatriculados, setValoresMatriculados] = useState([]);
  const [logQtdDietasAutorizadas, setLogQtdDietasAutorizadas] = useState([]);
  const [calendarioMesConsiderado, setCalendarioMesConsiderado] = useState(
    null
  );
  const [diasSobremesaDoce, setDiasSobremesaDoce] = useState(null);
  const [showModalObservacaoDiaria, setShowModalObservacaoDiaria] = useState(
    false
  );
  const [
    disableBotaoSalvarLancamentos,
    setDisableBotaoSalvarLancamentos
  ] = useState(true);
  const [exibirTooltip, setExibirTooltip] = useState(false);
  const [showDiaObservacaoDiaria, setDiaObservacaoDiaria] = useState(null);
  const [
    showCategoriaObservacaoDiaria,
    setCategoriaObservacaoDiaria
  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValuesAtualizados, setFormValuesAtualizados] = useState(null);
  const [diasDaSemanaSelecionada, setDiasDaSemanaSelecionada] = useState(null);
  const [ultimaAtualizacaoMedicao, setUltimaAtualizacaoMedicao] = useState(
    null
  );
  const [showModalErro, setShowModalErro] = useState(false);
  const [valoresObservacoes, setValoresObservacoes] = useState([]);

  const location = useLocation();
  let mesAnoDefault = new Date();

  const { TabPane } = Tabs;

  const urlParams = new URLSearchParams(window.location.search);
  const ehGrupoSolicitacoesDeAlimentacaoUrlParam =
    urlParams.get("ehGrupoSolicitacoesDeAlimentacao") === "true" ? true : false;
  const ehGrupoETECUrlParam =
    urlParams.get("ehGrupoETEC") === "true" ? true : false;

  const getListaDiasSobremesaDoceAsync = async escola_uuid => {
    const params = {
      mes: new Date(location.state.mesAnoSelecionado).getMonth() + 1,
      ano: new Date(location.state.mesAnoSelecionado).getFullYear(),
      escola_uuid
    };
    const response = await getListaDiasSobremesaDoce(params);
    if (response.status === HTTP_STATUS.OK) {
      setDiasSobremesaDoce(response.data);
    } else {
      toastError("Erro ao carregar dias de sobremesa doce");
    }
  };

  useEffect(() => {
    const mesAnoSelecionado = location.state
      ? typeof location.state.mesAnoSelecionado === String
        ? new Date(location.state.mesAnoSelecionado.replace("'", ""))
        : new Date(location.state.mesAnoSelecionado)
      : mesAnoDefault;
    const mesString = format(mesAnoSelecionado, "LLLL", {
      locale: ptBR
    }).toString();
    const mesAnoFormatado =
      mesString.charAt(0).toUpperCase() +
      mesString.slice(1) +
      " / " +
      getYear(mesAnoSelecionado).toString();

    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    setSemanaSelecionada(1);
    setMesAnoConsiderado(mesAnoSelecionado);
    setMesAnoFormatadoState(mesAnoFormatado);

    const fetch = async () => {
      const meusDados = await perfilService.meusDados();
      const escola =
        meusDados.vinculo_atual && meusDados.vinculo_atual.instituicao;
      const response_vinculos = await getVinculosTipoAlimentacaoPorEscola(
        escola.uuid
      );
      getListaDiasSobremesaDoceAsync(escola.uuid);
      const periodos_escolares = response_vinculos.data.results;
      const periodo =
        periodos_escolares.find(
          periodo =>
            periodo.periodo_escolar.nome ===
            (location.state ? location.state.periodo : "MANHA")
        ) || periodos_escolares[0];
      const tipos_alimentacao = periodo.tipos_alimentacao;
      const cloneTiposAlimentacao = deepCopy(tipos_alimentacao);
      const tiposAlimentacaoFormatadas = cloneTiposAlimentacao.map(
        alimentacao => {
          return {
            ...alimentacao,
            name: alimentacao.nome
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .replaceAll(/ /g, "_")
          };
        }
      );

      const indexRefeicao = tiposAlimentacaoFormatadas.findIndex(
        ali => ali.nome === "Refeição"
      );
      if (indexRefeicao !== -1) {
        tiposAlimentacaoFormatadas[indexRefeicao].nome = "Refeição 1ª Oferta";
        tiposAlimentacaoFormatadas.splice(indexRefeicao + 1, 0, {
          nome: "Repet. Refeição",
          name: "repeticao_refeicao",
          uuid: null
        });
      }

      const indexSobremesa = tiposAlimentacaoFormatadas.findIndex(
        ali => ali.nome === "Sobremesa"
      );
      if (indexSobremesa !== -1) {
        tiposAlimentacaoFormatadas[indexSobremesa].nome = "Sobremesa 1ª Ofe.";
        tiposAlimentacaoFormatadas.splice(indexSobremesa + 1, 0, {
          nome: "Repet. Sobremesa",
          name: "repeticao_sobremesa",
          uuid: null
        });
      }

      const indexLancheEmergencial = tiposAlimentacaoFormatadas.findIndex(
        ali => ali.nome === "Lanche Emergencial"
      );
      if (indexLancheEmergencial !== -1) {
        tiposAlimentacaoFormatadas[indexLancheEmergencial].nome =
          "Lanche Emergenc.";
      }

      tiposAlimentacaoFormatadas.unshift(
        {
          nome: "Matriculados",
          name: "matriculados",
          uuid: null
        },
        {
          nome: "Frequência",
          name: "frequencia",
          uuid: null
        }
      );

      tiposAlimentacaoFormatadas.push({
        nome: "Observações",
        name: "observacoes",
        uuid: null
      });
      setTabelaAlimentacaoRows(tiposAlimentacaoFormatadas);

      const rowsDietas = [];
      rowsDietas.push(
        {
          nome: "Dietas Autorizadas",
          name: "dietas_autorizadas",
          uuid: null
        },
        {
          nome: "Frequência",
          name: "frequencia",
          uuid: null
        }
      );

      const indexLanche4h = cloneTiposAlimentacao.findIndex(ali =>
        ali.nome.includes("4h")
      );
      if (indexLanche4h !== -1) {
        rowsDietas.push({
          nome: cloneTiposAlimentacao[indexLanche4h].nome,
          name: cloneTiposAlimentacao[indexLanche4h].nome
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replaceAll(/ /g, "_"),
          uuid: cloneTiposAlimentacao[indexLanche4h].uuid
        });
      }

      const indexLanche = cloneTiposAlimentacao.findIndex(
        ali => ali.nome === "Lanche"
      );
      if (indexLanche !== -1) {
        rowsDietas.push({
          nome: "Lanche",
          name: "Lanche"
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replaceAll(/ /g, "_"),
          uuid: cloneTiposAlimentacao[indexLanche].uuid
        });
      }

      rowsDietas.push({
        nome: "Observações",
        name: "observacoes",
        uuid: null
      });
      setTabelaDietaRows(rowsDietas);

      const cloneRowsDietas = deepCopy(rowsDietas);
      const indexRefeicaoDieta = cloneTiposAlimentacao.findIndex(
        ali => ali.nome === "Refeição"
      );
      cloneRowsDietas.splice(cloneRowsDietas.length - 1, 0, {
        nome: "Refeição",
        name: "refeicao",
        uuid: cloneTiposAlimentacao[indexRefeicaoDieta].uuid
      });

      setTabelaDietaEnteralRows(cloneRowsDietas);

      const rowsSolicitacoesAlimentacao = [];
      rowsSolicitacoesAlimentacao.push(
        {
          nome: "Lanche Emergenc.",
          name: "lanche_emergencial",
          uuid: null
        },
        {
          nome: "Kit Lanche",
          name: "kit_lanche",
          uuid: null
        },
        {
          nome: "Observações",
          name: "observacoes",
          uuid: null
        }
      );

      setTabelaSolicitacoesAlimentacaoRows(rowsSolicitacoesAlimentacao);

      const tiposAlimentacaoEtec = tiposAlimentacaoETEC();
      const cloneTiposAlimentacaoEtec = deepCopy(tiposAlimentacaoEtec);
      const tiposAlimentacaoEtecFormatadas = cloneTiposAlimentacaoEtec.map(
        alimentacao => {
          return {
            nome: alimentacao,
            name: alimentacao
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .replaceAll(/ /g, "_"),
            uuid: null
          };
        }
      );

      const indexRefeicaoEtec = tiposAlimentacaoEtecFormatadas.findIndex(
        ali => ali.nome === "Refeição"
      );
      if (indexRefeicaoEtec !== -1) {
        tiposAlimentacaoEtecFormatadas[indexRefeicaoEtec].nome =
          "Refeição 1ª Oferta";
        tiposAlimentacaoEtecFormatadas.splice(indexRefeicaoEtec + 1, 0, {
          nome: "Repet. Refeição",
          name: "repeticao_refeicao",
          uuid: null
        });
      }

      const indexSobremesaEtec = tiposAlimentacaoEtecFormatadas.findIndex(
        ali => ali.nome === "Sobremesa"
      );
      if (indexSobremesaEtec !== -1) {
        tiposAlimentacaoEtecFormatadas[indexSobremesaEtec].nome =
          "Sobremesa 1ª Ofe.";
        tiposAlimentacaoEtecFormatadas.splice(indexSobremesaEtec + 1, 0, {
          nome: "Repet. Sobremesa",
          name: "repeticao_sobremesa",
          uuid: null
        });
      }

      const indexLancheEmergencialEtec = tiposAlimentacaoEtecFormatadas.findIndex(
        ali => ali.nome === "Lanche Emergencial"
      );
      if (indexLancheEmergencialEtec !== -1) {
        tiposAlimentacaoEtecFormatadas[indexLancheEmergencialEtec].nome =
          "Lanche Emergenc.";
      }

      tiposAlimentacaoEtecFormatadas.unshift(
        {
          nome: "Número de Alunos",
          name: "numero_de_alunos",
          uuid: null
        },
        {
          nome: "Frequência",
          name: "frequencia",
          uuid: null
        }
      );

      tiposAlimentacaoEtecFormatadas.push({
        nome: "Observações",
        name: "observacoes",
        uuid: null
      });

      setTabelaEtecAlimentacaoRows(tiposAlimentacaoEtecFormatadas);

      const response_categorias_medicao = await getCategoriasDeMedicao();
      if (ehGrupoSolicitacoesDeAlimentacaoUrlParam) {
        setCategoriasDeMedicao(
          response_categorias_medicao.data.filter(categoria => {
            return categoria.nome.includes("SOLICITAÇÕES");
          })
        );
      } else if (ehGrupoETECUrlParam) {
        setCategoriasDeMedicao(
          response_categorias_medicao.data.filter(categoria => {
            return categoria.nome === "ALIMENTAÇÃO";
          })
        );
      } else {
        setCategoriasDeMedicao(
          response_categorias_medicao.data.filter(categoria => {
            return !categoria.nome.includes("SOLICITAÇÕES");
          })
        );
      }

      let params = {
        uuid_solicitacao_medicao: uuid,
        nome_grupo: location.state.grupo
      };
      if (!ehGrupoSolicitacoesDeAlimentacaoUrlParam && !ehGrupoETECUrlParam) {
        params = {
          ...params,
          nome_periodo_escolar: periodo.periodo_escolar.nome
        };
      }
      const response_valores_periodos = await getValoresPeriodosLancamentos(
        params
      );
      setValoresPeriodosLancamentos(response_valores_periodos.data);

      const mes = format(mesAnoSelecionado, "MM");
      const ano = getYear(mesAnoSelecionado);
      let response_matriculados = [];
      let response_log_dietas_autorizadas = [];
      let response_inclusoes_autorizadas = [];
      let response_inclusoes_etec_autorizadas = [];
      let response_kit_lanches_autorizadas = [];
      let response_suspensoes_autorizadas = [];
      let response_alteracoes_alimentacao_autorizadas = [];

      if (!ehGrupoSolicitacoesDeAlimentacaoUrlParam && !ehGrupoETECUrlParam) {
        const params_matriculados = {
          escola_uuid: escola.uuid,
          mes: mes,
          ano: ano,
          tipo_turma: "REGULAR",
          periodo_escolar: periodo.periodo_escolar.uuid
        };
        response_matriculados = await getMatriculadosPeriodo(
          params_matriculados
        );
        setValoresMatriculados(response_matriculados.data);

        const params_dietas_autorizadas = {
          escola_uuid: escola.uuid,
          mes: mes,
          ano: ano
        };
        response_log_dietas_autorizadas = await getLogDietasAutorizadasPeriodo(
          params_dietas_autorizadas
        );
        setLogQtdDietasAutorizadas(response_log_dietas_autorizadas.data);

        response_inclusoes_autorizadas = await getSolicitacoesInclusaoAutorizadasAsync(
          escola.uuid,
          mes,
          ano,
          periodo.periodo_escolar.nome,
          location
        );
        setInclusoesAutorizadas(response_inclusoes_autorizadas);

        response_suspensoes_autorizadas = await getSolicitacoesSuspensoesAutorizadasAsync(
          escola.uuid,
          mes,
          ano,
          periodo.periodo_escolar.nome
        );
        setSuspensoesAutorizadas(response_suspensoes_autorizadas);

        response_alteracoes_alimentacao_autorizadas = await getSolicitacoesAlteracoesAlimentacaoAutorizadasAsync(
          escola.uuid,
          mes,
          ano,
          periodo.periodo_escolar.nome
        );
        setAlteracoesAlimentacaoAutorizadas(
          response_alteracoes_alimentacao_autorizadas
        );
      }

      if (ehGrupoSolicitacoesDeAlimentacaoUrlParam) {
        response_kit_lanches_autorizadas = await getSolicitacoesKitLanchesAutorizadasAsync(
          escola.uuid,
          mes,
          ano
        );
        setKitLanchesAutorizadas(response_kit_lanches_autorizadas);

        response_alteracoes_alimentacao_autorizadas = await getSolicitacoesAlteracoesAlimentacaoAutorizadasAsync(
          escola.uuid,
          mes,
          ano,
          periodo.periodo_escolar.nome,
          true
        );
        setAlteracoesAlimentacaoAutorizadas(
          response_alteracoes_alimentacao_autorizadas
        );
      }

      if (ehGrupoETECUrlParam) {
        response_inclusoes_etec_autorizadas = await getSolicitacoesInclusoesEtecAutorizadasAsync(
          escola.uuid,
          mes,
          ano
        );
        setInclusoesEtecAutorizadas(response_inclusoes_etec_autorizadas);
      }

      const params_dias_calendario = {
        escola_uuid: escola.uuid,
        mes: mes,
        ano: ano
      };
      const response_dias_calendario = await getDiasCalendario(
        params_dias_calendario
      );
      setCalendarioMesConsiderado(response_dias_calendario.data);

      await formatarDadosValoresMedicao(
        mesAnoFormatado,
        response_valores_periodos.data,
        response_categorias_medicao.data,
        tiposAlimentacaoFormatadas,
        response_matriculados.data,
        rowsDietas,
        response_log_dietas_autorizadas.data,
        response_inclusoes_autorizadas,
        mesAnoSelecionado,
        rowsSolicitacoesAlimentacao,
        response_kit_lanches_autorizadas,
        response_alteracoes_alimentacao_autorizadas,
        response_inclusoes_etec_autorizadas,
        tiposAlimentacaoEtecFormatadas
      );
      setLoading(false);
    };
    fetch();
  }, []);

  const formatarDadosValoresMedicao = async (
    mesAnoFormatado,
    valoresMedicao,
    categoriasMedicao,
    tiposAlimentacaoFormatadas,
    matriculados,
    rowsDietas,
    logQtdDietasAutorizadas,
    solInclusoesAutorizadas,
    mesAno,
    rowsSolicitacoesAlimentacao,
    kitLanchesAutorizadas,
    alteracoesAlimentacaoAutorizadas,
    inclusoesEtecAutorizadas,
    tiposAlimentacaoEtecFormatadas
  ) => {
    let dadosValoresMedicoes = {};
    let dadosValoresMatriculados = {};
    let dadosValoresDietasAutorizadas = {};
    let dadosValoresKitLanchesAutorizadas = {};
    let dadosValoresAlteracoesAlimentacaoAutorizadas = {};
    let dadosValoresEtecAlimentacaoAutorizadas = {};
    let dadosValoresForaDoMes = {};
    let periodoEscolar = "MANHA";
    if (location.state) {
      if (location.state.grupo && location.state.periodo) {
        periodoEscolar = `${location.state.grupo} - ${location.state.periodo}`;
      } else if (location.state.grupo) {
        periodoEscolar = `${location.state.grupo}`;
      } else {
        periodoEscolar = `${location.state.periodo}`;
      }
    }
    const dadosMesPeriodo = {
      mes_lancamento: mesAnoFormatado,
      periodo_escolar: periodoEscolar
    };
    let dadosValoresInclusoesAutorizadas = {};

    categoriasMedicao &&
      categoriasMedicao.forEach(categoria => {
        matriculados &&
          !ehGrupoSolicitacoesDeAlimentacaoUrlParam &&
          !ehGrupoETECUrlParam &&
          matriculados.forEach(obj => {
            dadosValoresMatriculados[
              `matriculados__dia_${obj.dia}__categoria_${categoria.id}`
            ] = obj.quantidade_alunos ? `${obj.quantidade_alunos}` : null;
          });

        categoria.nome.includes("ENTERAL") &&
          logQtdDietasAutorizadas &&
          logQtdDietasAutorizadas
            .filter(logDieta =>
              logDieta.classificacao.toUpperCase().includes("ENTERAL")
            )
            .forEach(
              logFiltrado =>
                (dadosValoresDietasAutorizadas[
                  `dietas_autorizadas__dia_${logFiltrado.dia}__categoria_${
                    categoria.id
                  }`
                ] = `${logFiltrado.quantidade +
                  logQtdDietasAutorizadas.find(
                    log =>
                      logFiltrado.dia === log.dia &&
                      log.classificacao.toUpperCase().includes("AMINOÁCIDOS")
                  ).quantidade}`)
            );

        logQtdDietasAutorizadas &&
          !ehGrupoSolicitacoesDeAlimentacaoUrlParam &&
          !ehGrupoETECUrlParam &&
          logQtdDietasAutorizadas.forEach(log => {
            categoria.nome === "DIETA ESPECIAL - TIPO A" &&
              log.classificacao.toUpperCase() === "TIPO A" &&
              (dadosValoresDietasAutorizadas[
                `dietas_autorizadas__dia_${log.dia}__categoria_${categoria.id}`
              ] = `${log.quantidade}`);
            categoria.nome.includes("TIPO B") &&
              log.classificacao.toUpperCase().includes("TIPO B") &&
              (dadosValoresDietasAutorizadas[
                `dietas_autorizadas__dia_${log.dia}__categoria_${categoria.id}`
              ] = `${log.quantidade}`);
          });

        kitLanchesAutorizadas &&
          ehGrupoSolicitacoesDeAlimentacaoUrlParam &&
          kitLanchesAutorizadas.forEach(kit => {
            categoria.nome.includes("SOLICITAÇÕES") &&
              (dadosValoresKitLanchesAutorizadas[
                `kit_lanche__dia_${kit.dia}__categoria_${categoria.id}`
              ] = `${kit.numero_alunos}`);
          });

        alteracoesAlimentacaoAutorizadas &&
          ehGrupoSolicitacoesDeAlimentacaoUrlParam &&
          alteracoesAlimentacaoAutorizadas.forEach(alteracao => {
            categoria.nome.includes("SOLICITAÇÕES") &&
              (dadosValoresAlteracoesAlimentacaoAutorizadas[
                `lanche_emergencial__dia_${alteracao.dia}__categoria_${
                  categoria.id
                }`
              ] = `${alteracao.numero_alunos}`);
          });

        inclusoesEtecAutorizadas &&
          ehGrupoETECUrlParam &&
          inclusoesEtecAutorizadas.forEach(inclusao => {
            categoria.nome === "ALIMENTAÇÃO" &&
              (dadosValoresEtecAlimentacaoAutorizadas[
                `numero_de_alunos__dia_${inclusao.dia}__categoria_${
                  categoria.id
                }`
              ] = `${inclusao.numero_alunos}`);
          });

        setDadosValoresInclusoesEtecAutorizadasState(
          dadosValoresEtecAlimentacaoAutorizadas
        );

        tiposAlimentacaoFormatadas &&
          tiposAlimentacaoFormatadas.forEach(alimentacao => {
            if (
              categoria.nome.includes("ALIMENTAÇÃO") &&
              solInclusoesAutorizadas
            ) {
              const inclusoesFiltradas = solInclusoesAutorizadas.filter(
                inclusao => inclusao.alimentacoes.includes(alimentacao.name)
              );
              for (let i = 1; i <= 31; i++) {
                const dia =
                  String(i).length === 1 ? "0" + String(i) : String(i);
                const incFiltradasPorDia = inclusoesFiltradas.filter(
                  each => each.dia === dia
                );
                if (
                  incFiltradasPorDia.length &&
                  !valoresMedicao[
                    `${alimentacao.name}__dia_${dia}__categoria_${categoria.id}`
                  ]
                ) {
                  dadosValoresInclusoesAutorizadas[
                    `${alimentacao.name}__dia_${dia}__categoria_${categoria.id}`
                  ] = `${incFiltradasPorDia.reduce(
                    (total, obj) => obj.numero_alunos + total,
                    0
                  )}`;
                }
              }
            }
          });

        setDadosValoresInclusoesAutorizadasState(
          dadosValoresInclusoesAutorizadas
        );

        let diasSemana = [];
        let diaDaSemanaNumerico = getDay(startOfMonth(mesAno)); // 0 representa Domingo

        if (diaDaSemanaNumerico === 0) {
          diaDaSemanaNumerico = 7;
        }
        if (Number(semanaSelecionada) === 1) {
          diasSemana.unshift(format(startOfMonth(mesAno), "dd"));
          for (let i = 1; i < diaDaSemanaNumerico; i++) {
            diasSemana.unshift(format(subDays(startOfMonth(mesAno), i), "dd"));
          }
          for (let i = diaDaSemanaNumerico; i < 7; i++) {
            diasSemana.push(
              format(
                addDays(startOfMonth(mesAno), i + 1 - diaDaSemanaNumerico),
                "dd"
              )
            );
          }
        }
        if (Number(semanaSelecionada) !== 1) {
          let dia = addDays(
            startOfMonth(mesAno),
            7 * (Number(semanaSelecionada) - 1)
          );
          diasSemana.unshift(format(dia, "dd"));
          for (let i = 1; i < diaDaSemanaNumerico; i++) {
            diasSemana.unshift(format(subDays(dia, i), "dd"));
          }
          for (let i = diaDaSemanaNumerico; i < 7; i++) {
            diasSemana.push(
              format(addDays(dia, i + 1 - diaDaSemanaNumerico), "dd")
            );
          }
        }

        tiposAlimentacaoFormatadas &&
          (rowsDietas ||
            rowsSolicitacoesAlimentacao ||
            tiposAlimentacaoEtecFormatadas) &&
          [
            tiposAlimentacaoFormatadas,
            rowsDietas,
            rowsSolicitacoesAlimentacao,
            tiposAlimentacaoEtecFormatadas
          ].forEach(
            each =>
              each &&
              each.forEach(tipo => {
                for (let i = 1; i <= 31; i++) {
                  const dia =
                    String(i).length === 1 ? "0" + String(i) : String(i);
                  let result = null;
                  if (
                    Number(semanaSelecionada) === 1 &&
                    Number(dia) > 20 &&
                    diasSemana.includes(dia)
                  ) {
                    result = "Mês anterior";
                    dadosValoresForaDoMes[
                      `${tipo.name}__dia_${dia}__categoria_${categoria.id}`
                    ] = result;
                  }
                  if (
                    [4, 5, 6].includes(Number(semanaSelecionada)) &&
                    Number(dia) < 10 &&
                    diasSemana.includes(dia)
                  ) {
                    result = "Mês posterior";
                    dadosValoresForaDoMes[
                      `${tipo.name}__dia_${dia}__categoria_${categoria.id}`
                    ] = result;
                  }
                }
              })
          );

        valoresMedicao &&
          valoresMedicao.forEach(valor_medicao => {
            dadosValoresMedicoes[
              `${valor_medicao.nome_campo}__dia_${
                valor_medicao.dia
              }__categoria_${valor_medicao.categoria_medicao}`
            ] = valor_medicao.valor ? `${valor_medicao.valor}` : null;
          });
      });

    valoresMedicao &&
      valoresMedicao.length > 0 &&
      setUltimaAtualizacaoMedicao(valoresMedicao[0].medicao_alterado_em);

    setDadosIniciais({
      ...dadosMesPeriodo,
      ...dadosValoresInclusoesAutorizadas,
      ...dadosValoresKitLanchesAutorizadas,
      ...dadosValoresAlteracoesAlimentacaoAutorizadas,
      ...dadosValoresEtecAlimentacaoAutorizadas,
      ...dadosValoresMedicoes,
      ...dadosValoresMatriculados,
      ...dadosValoresDietasAutorizadas,
      ...dadosValoresForaDoMes,
      semanaSelecionada
    });
    setLoading(false);
  };

  useEffect(() => {
    let diasSemana = [];
    let diaDaSemanaNumerico = getDay(startOfMonth(mesAnoConsiderado)); // 0 representa Domingo
    let week = [];
    setLoading(true);

    if (diaDaSemanaNumerico === 0) {
      diaDaSemanaNumerico = 7;
    }
    if (mesAnoConsiderado && Number(semanaSelecionada) === 1) {
      diasSemana.unshift(format(startOfMonth(mesAnoConsiderado), "dd"));
      for (let i = 1; i < diaDaSemanaNumerico; i++) {
        diasSemana.unshift(
          format(subDays(startOfMonth(mesAnoConsiderado), i), "dd")
        );
      }
      for (let i = diaDaSemanaNumerico; i < 7; i++) {
        diasSemana.push(
          format(
            addDays(
              startOfMonth(mesAnoConsiderado),
              i + 1 - diaDaSemanaNumerico
            ),
            "dd"
          )
        );
      }
      setDiasDaSemanaSelecionada(diasSemana.filter(dia => Number(dia) < 20));
      week = weekColumns.map(column => {
        return { ...column, dia: diasSemana[column["position"]] };
      });
      setWeekColumns(week);
    }
    if (mesAnoConsiderado && Number(semanaSelecionada) !== 1) {
      let dia = addDays(
        startOfMonth(mesAnoConsiderado),
        7 * (Number(semanaSelecionada) - 1)
      );
      diasSemana.unshift(format(dia, "dd"));
      for (let i = 1; i < diaDaSemanaNumerico; i++) {
        diasSemana.unshift(format(subDays(dia, i), "dd"));
      }
      for (let i = diaDaSemanaNumerico; i < 7; i++) {
        diasSemana.push(
          format(addDays(dia, i + 1 - diaDaSemanaNumerico), "dd")
        );
      }
      if ([4, 5, 6].includes(Number(semanaSelecionada))) {
        setDiasDaSemanaSelecionada(diasSemana.filter(dia => Number(dia) > 10));
      } else {
        setDiasDaSemanaSelecionada(diasSemana);
      }
      week = weekColumns.map(column => {
        return { ...column, dia: diasSemana[column["position"]] };
      });
      setWeekColumns(week);
    }
    const formatar = async () => {
      formatarDadosValoresMedicao(
        mesAnoFormatadoState,
        valoresPeriodosLancamentos,
        categoriasDeMedicao,
        tabelaAlimentacaoRows,
        valoresMatriculados,
        tabelaDietaRows,
        logQtdDietasAutorizadas,
        inclusoesAutorizadas,
        mesAnoConsiderado,
        tabelaSolicitacoesAlimentacaoRows,
        kitLanchesAutorizadas,
        alteracoesAlimentacaoAutorizadas,
        inclusoesEtecAutorizadas,
        tabelaEtecsAlimentacaoRows
      );
    };
    semanaSelecionada && formatar();

    valoresPeriodosLancamentos.findIndex(
      valor => valor.nome_campo !== "observacoes"
    ) !== -1 && setDisableBotaoSalvarLancamentos(false);
  }, [
    mesAnoConsiderado,
    semanaSelecionada,
    categoriasDeMedicao,
    tabelaAlimentacaoRows,
    valoresPeriodosLancamentos
  ]);

  useEffect(() => {
    const tresMinutos = 180000;
    const intervalCall = setInterval(() => {
      formValuesAtualizados &&
        !disableBotaoSalvarLancamentos &&
        onSubmit(
          formValuesAtualizados,
          dadosValoresInclusoesAutorizadasState,
          true
        );
    }, tresMinutos);
    return () => {
      clearInterval(intervalCall);
    };
  }, [
    formValuesAtualizados,
    dadosValoresInclusoesAutorizadasState,
    disableBotaoSalvarLancamentos
  ]);

  const onSubmitObservacao = async (values, dia, categoria) => {
    let valoresMedicao = [];
    const valuesMesmoDiaDaObservacao = Object.fromEntries(
      Object.entries(values).filter(([key]) => key.includes(dia))
    );
    Object.entries(valuesMesmoDiaDaObservacao).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          key.includes("matriculados") ||
          key.includes("dietas_autorizadas") ||
          (!validacaoDiaLetivo(dia) &&
            (key.includes("repeticao") || key.includes("emergencial")))) &&
        delete valuesMesmoDiaDaObservacao[key]
      );
    });
    let qtdCamposComErro = 0;
    Object.entries(valuesMesmoDiaDaObservacao).forEach(([key, value]) => {
      if (
        !ehGrupoETECUrlParam &&
        !(key.includes("observacoes") || key.includes("frequencia")) &&
        Number(value) >
          Number(
            valuesMesmoDiaDaObservacao[
              `frequencia__dia_${dia}__categoria_${categoria}`
            ]
          )
      ) {
        qtdCamposComErro++;
      }
    });
    if (qtdCamposComErro) {
      toastError(
        `Existe(m) ${qtdCamposComErro} campo(s) com valor maior que a frequência. Necessário corrigir.`
      );
      return;
    }
    Object.entries(valuesMesmoDiaDaObservacao).map(v => {
      const keySplitted = v[0].split("__");
      const categoria = keySplitted.pop();
      const idCategoria = categoria.match(/\d/g).join("");
      const dia = keySplitted[1].match(/\d/g).join("");
      const nome_campo = keySplitted[0];
      let tipoAlimentacao = tabelaAlimentacaoRows.find(
        alimentacao => alimentacao.name === nome_campo
      );
      if (!tipoAlimentacao) {
        tipoAlimentacao = tabelaDietaEnteralRows.find(
          row => row.name === nome_campo
        );
      }

      return valoresMedicao.push({
        dia: dia,
        valor: ["<p></p>\n", ""].includes(v[1]) ? 0 : v[1],
        nome_campo: nome_campo,
        categoria_medicao: idCategoria,
        tipo_alimentacao:
          !ehGrupoSolicitacoesDeAlimentacaoUrlParam && !ehGrupoETECUrlParam
            ? tipoAlimentacao.uuid
            : ""
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    const solicitacao_medicao_inicial = uuid;
    const payload = {
      solicitacao_medicao_inicial: solicitacao_medicao_inicial,
      valores_medicao: valoresMedicao,
      eh_observacao: true
    };
    if (values["periodo_escolar"].includes(" - ")) {
      payload["grupo"] = values["periodo_escolar"].split(" - ")[0];
      payload["periodo_escolar"] = values["periodo_escolar"].split(" - ")[1];
    } else if (
      values["periodo_escolar"].includes("Solicitações") ||
      values["periodo_escolar"] === "ETEC"
    ) {
      payload["grupo"] = values["periodo_escolar"];
      delete values["periodo_escolar"];
    } else {
      payload["periodo_escolar"] = values["periodo_escolar"];
    }
    let valores_medicao_response = [];
    if (valoresPeriodosLancamentos.length) {
      const response = await updateValoresPeriodosLancamentos(
        valoresPeriodosLancamentos[0].medicao_uuid,
        payload
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Observação salva com sucesso");
        valores_medicao_response = response.data.valores_medicao;
      } else {
        return toastError("Erro ao salvar observação.");
      }
    } else {
      const response = await setPeriodoLancamento(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Observação salva com sucesso");
        valores_medicao_response = response.data.valores_medicao;
      } else {
        return toastError("Erro ao salvar observação.");
      }
    }
    setValoresObservacoes(
      valores_medicao_response.filter(
        valor => valor.nome_campo === "observacoes"
      )
    );
    setDisableBotaoSalvarLancamentos(true);
    setExibirTooltip(false);
  };

  const onSubmit = async (
    values,
    dadosValoresInclusoesAutorizadasState,
    ehSalvamentoAutomático = false,
    chamarFuncaoFormatar = true
  ) => {
    const erro = validarFormulario(
      values,
      diasSobremesaDoce,
      location,
      categoriasDeMedicao,
      dadosValoresInclusoesAutorizadasState,
      weekColumns
    );
    if (erro) {
      !ehSalvamentoAutomático && toastError(erro);
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    let valuesClone = deepCopy(values);
    setDadosIniciais(values);
    const idCategoriaAlimentacao = categoriasDeMedicao.find(categoria =>
      categoria.nome.includes("ALIMENTAÇÃO")
    ).id;
    valuesClone.solicitacao_medicao_inicial = uuid;
    Object.entries(valuesClone).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          (key.includes("matriculados") &&
            !key.includes(`categoria_${idCategoriaAlimentacao}`))) &&
        delete valuesClone[key]
      );
    });

    const dadosIniciaisFiltered = Object.entries(dadosIniciais)
      .filter(([key]) => !key.includes("matriculados"))
      .filter(([key]) => !key.includes("dietas_autorizadas"))
      .filter(
        ([, value]) => !["Mês anterior", "Mês posterior", null].includes(value)
      )
      .filter(([key]) => key.includes("categoria"));

    const payload = formatarPayloadPeriodoLancamento(
      valuesClone,
      tabelaAlimentacaoRows,
      tabelaDietaEnteralRows,
      dadosIniciaisFiltered,
      diasDaSemanaSelecionada,
      ehGrupoSolicitacoesDeAlimentacaoUrlParam,
      ehGrupoETECUrlParam
    );
    if (payload.valores_medicao.length === 0)
      return (
        !ehSalvamentoAutomático && toastWarn("Não há valores para serem salvos")
      );
    let valores_medicao_response = [];
    if (valoresPeriodosLancamentos.length) {
      setLoading(true);
      const response = await updateValoresPeriodosLancamentos(
        valoresPeriodosLancamentos[0].medicao_uuid,
        payload
      );
      if (response.status === HTTP_STATUS.OK) {
        !ehSalvamentoAutomático &&
          toastSuccess("Lançamentos salvos com sucesso");
        valores_medicao_response = response.data.valores_medicao;
      } else {
        return (
          !ehSalvamentoAutomático && toastError("Erro ao salvar lançamentos.")
        );
      }
    } else {
      setLoading(true);
      const response = await setPeriodoLancamento(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        !ehSalvamentoAutomático &&
          toastSuccess("Lançamentos salvos com sucesso");
        valores_medicao_response = response.data.valores_medicao;
      } else {
        return (
          !ehSalvamentoAutomático && toastError("Erro ao salvar lançamentos.")
        );
      }
    }
    setValoresPeriodosLancamentos(valores_medicao_response);
    if (chamarFuncaoFormatar) {
      await formatarDadosValoresMedicao(
        mesAnoFormatadoState,
        valores_medicao_response,
        categoriasDeMedicao,
        tabelaAlimentacaoRows,
        valoresMatriculados,
        tabelaDietaRows,
        logQtdDietasAutorizadas,
        inclusoesAutorizadas,
        mesAnoConsiderado,
        tabelaSolicitacoesAlimentacaoRows,
        kitLanchesAutorizadas,
        alteracoesAlimentacaoAutorizadas,
        inclusoesEtecAutorizadas,
        tabelaEtecsAlimentacaoRows
      );
    }
    setLoading(false);
    setDisableBotaoSalvarLancamentos(true);
  };

  const onChangeSemana = async (values, key) => {
    if (exibirTooltip) {
      setShowModalErro(true);
    } else {
      setSemanaSelecionada(key);
      onSubmit(
        formValuesAtualizados,
        dadosValoresInclusoesAutorizadasState,
        true,
        false
      );
      return (values["week"] = Number(key));
    }
  };

  const defaultValue = (column, row) => {
    let result = null;
    if (row.name === "matriculados") {
      result = null;
    }
    if (Number(semanaSelecionada) === 1 && Number(column.dia) > 20) {
      result = "Mês anterior";
    }
    if (
      [4, 5, 6].includes(Number(semanaSelecionada)) &&
      Number(column.dia) < 10
    ) {
      result = "Mês posterior";
    }

    return result;
  };

  const validacaoSemana = dia => {
    return (
      (Number(semanaSelecionada) === 1 && Number(dia) > 20) ||
      ([4, 5, 6].includes(Number(semanaSelecionada)) && Number(dia) < 10)
    );
  };

  const validacaoDiaLetivo = dia => {
    const objDia = calendarioMesConsiderado.find(
      objDia => Number(objDia.dia) === Number(dia)
    );
    const ehDiaLetivo = objDia && objDia.dia_letivo;
    return ehDiaLetivo;
  };

  const openModalObservacaoDiaria = (dia, categoria) => {
    setShowModalObservacaoDiaria(true);
    setDiaObservacaoDiaria(dia);
    setCategoriaObservacaoDiaria(categoria);
  };

  const textoBotaoObservacao = value => {
    let text = "Adicionar";
    if (
      value &&
      !["<p></p>", "<p></p>\n", null, "", undefined].includes(value)
    ) {
      text = "Visualizar";
    }
    return text;
  };

  const onClickBotaoObservacao = (dia, categoria) => {
    openModalObservacaoDiaria(dia, categoria);
  };

  let valuesInputArray = [];

  const desabilitaTooltip = values => {
    const erro = validarFormulario(
      values,
      diasSobremesaDoce,
      location,
      categoriasDeMedicao,
      dadosValoresInclusoesAutorizadasState,
      weekColumns
    );
    if (erro) {
      setDisableBotaoSalvarLancamentos(true);
      setExibirTooltip(true);
    }
  };

  const onChangeInput = (
    value,
    previous,
    errors,
    values,
    dia,
    categoria,
    rowName,
    form,
    column,
    row
  ) => {
    const ehZeroFrequencia =
      !ehGrupoETECUrlParam &&
      valorZeroFrequencia(
        value,
        rowName,
        categoria,
        dia,
        form,
        tabelaAlimentacaoRows,
        tabelaDietaRows,
        tabelaDietaEnteralRows,
        dadosValoresInclusoesAutorizadasState,
        validacaoDiaLetivo
      );
    if (deepEqual(values, dadosIniciais)) {
      setDisableBotaoSalvarLancamentos(true);
      desabilitaTooltip(values);
    } else if (
      (value || previous) &&
      value !== previous &&
      !["Mês anterior", "Mês posterior"].includes(value) &&
      !["Mês anterior", "Mês posterior"].includes(previous)
    ) {
      setExibirTooltip(false);
      setDisableBotaoSalvarLancamentos(false);
    } else if (typeof value === "string") {
      value.match(/\d+/g) !== null && valuesInputArray.push(value);
      if (value === null) {
        valuesInputArray.length = 0;
      }
      if (value.match(/\d+/g) !== null && valuesInputArray.length > 0) {
        setDisableBotaoSalvarLancamentos(false);
      } else {
        desabilitaTooltip(values);
        setDisableBotaoSalvarLancamentos(true);
      }
    }

    if (
      categoria.nome.includes("ALIMENTAÇÃO") &&
      botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada(
        values,
        dia,
        categoria,
        dadosValoresInclusoesAutorizadasState,
        validacaoDiaLetivo
      )
    ) {
      setDisableBotaoSalvarLancamentos(true);
    }
    if (Object.keys(errors).length > 0) {
      setDisableBotaoSalvarLancamentos(true);
      setExibirTooltip(true);
    }

    const valuesFrequencia = Object.fromEntries(
      Object.entries(values).filter(([key]) => key.includes("frequencia"))
    );
    let arrayDiasComFrequenciaZero = [];
    for (const key in valuesFrequencia) {
      if (Number(valuesFrequencia[key]) === 0) {
        const keySplitted = key.split("__");
        const dia = keySplitted[1].match(/\d/g).join("");
        arrayDiasComFrequenciaZero.push(dia);
      }
    }
    arrayDiasComFrequenciaZero.forEach(dia => {
      if (
        categoria.nome.includes("ALIMENTAÇÃO") &&
        Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
          String(key).includes(dia)
        ) &&
        !validacaoDiaLetivo(Number(dia)) &&
        !values[`observacoes__dia_${dia}__categoria_${categoria.id}`]
      ) {
        setDisableBotaoSalvarLancamentos(true);
      }
    });
    desabilitaTooltip(values);

    if (
      (ehZeroFrequencia &&
        !values[`observacoes__dia_${dia}__categoria_${categoria.id}`]) ||
      campoFrequenciaValor0ESemObservacao(dia, categoria, values) ||
      campoComSuspensaoAutorizadaESemObservacao(
        formValuesAtualizados,
        column,
        categoria,
        suspensoesAutorizadas
      ) ||
      campoRefeicaoComRPLAutorizadaESemObservacao(
        formValuesAtualizados,
        column,
        categoria,
        alteracoesAlimentacaoAutorizadas
      ) ||
      campoLancheComLPRAutorizadaESemObservacao(
        formValuesAtualizados,
        column,
        categoria,
        alteracoesAlimentacaoAutorizadas
      ) ||
      (categoria.nome.includes("ALIMENTAÇÃO") &&
        (exibirTooltipSuspensoesAutorizadas(
          values,
          row,
          column,
          categoria,
          suspensoesAutorizadas
        ) ||
          exibirTooltipRPLAutorizadas(
            formValuesAtualizados,
            row,
            column,
            categoria,
            alteracoesAlimentacaoAutorizadas
          ) ||
          exibirTooltipLPRAutorizadas(
            formValuesAtualizados,
            row,
            column,
            categoria,
            alteracoesAlimentacaoAutorizadas
          ))) ||
      (categoria.nome.includes("SOLICITAÇÕES") &&
        ((exibirTooltipQtdKitLancheDiferenteSolAlimentacoesAutorizadas(
          formValuesAtualizados,
          row,
          column,
          categoria,
          kitLanchesAutorizadas
        ) ||
          exibirTooltipKitLancheSolAlimentacoes(
            formValuesAtualizados,
            row,
            column,
            categoria,
            kitLanchesAutorizadas
          ) ||
          exibirTooltipQtdLancheEmergencialDiferenteSolAlimentacoesAutorizadas(
            formValuesAtualizados,
            row,
            column,
            categoria,
            alteracoesAlimentacaoAutorizadas
          ) ||
          exibirTooltipLancheEmergencialSolAlimentacoes(
            formValuesAtualizados,
            row,
            column,
            categoria,
            alteracoesAlimentacaoAutorizadas
          )) &&
          !formValuesAtualizados[
            `observacoes__dia_${dia}__categoria_${categoria.id}`
          ])) ||
      (ehGrupoETECUrlParam &&
        categoria.nome === "ALIMENTAÇÃO" &&
        exibirTooltipLancheEmergTabelaEtec(
          formValuesAtualizados,
          row,
          column,
          categoria,
          ehGrupoETECUrlParam,
          inclusoesEtecAutorizadas
        ))
    ) {
      setDisableBotaoSalvarLancamentos(true);
      setExibirTooltip(true);
    }

    if (deveExistirObservacao(categoria.id, values, calendarioMesConsiderado)) {
      return;
    }
  };

  const fieldValidationsTabelaAlimentacao = (
    rowName,
    dia,
    idCategoria,
    nomeCategoria
  ) => (value, allValues) => {
    if (nomeCategoria.includes("SOLICITAÇÕES")) {
      return undefined;
    } else if (ehGrupoETECUrlParam && nomeCategoria === "ALIMENTAÇÃO") {
      return validacoesTabelaEtecAlimentacao(
        rowName,
        dia,
        idCategoria,
        value,
        allValues,
        validacaoDiaLetivo,
        validacaoSemana
      );
    } else {
      return validacoesTabelaAlimentacao(
        rowName,
        dia,
        idCategoria,
        value,
        allValues,
        dadosValoresInclusoesAutorizadasState,
        suspensoesAutorizadas,
        alteracoesAlimentacaoAutorizadas,
        validacaoDiaLetivo,
        location
      );
    }
  };

  const fieldValidationsTabelasDietas = (rowName, dia, categoria) => (
    value,
    allValues
  ) => {
    return validacoesTabelasDietas(
      categoriasDeMedicao,
      rowName,
      dia,
      categoria,
      value,
      allValues
    );
  };

  const classNameFieldTabelaAlimentacao = (row, column, categoria) => {
    if (
      `${row.name}__dia_${column.dia}__categoria_${categoria.id}` ===
        `frequencia__dia_${column.dia}__categoria_${categoria.id}` &&
      Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
        String(key).includes(`__dia_${column.dia}__categoria_${categoria.id}`)
      )
    ) {
      return "";
    }
    if (
      `${row.name}__dia_${column.dia}__categoria_${categoria.id}` in
      dadosValoresInclusoesAutorizadasState
    ) {
      return "";
    }
    return `${
      `${row.name}__dia_${column.dia}__categoria_${categoria.id}` in
      dadosValoresInclusoesAutorizadasState
        ? ""
        : !validacaoDiaLetivo(column.dia)
        ? "nao-eh-dia-letivo"
        : ""
    }`;
  };

  return (
    <Spin tip="Carregando..." spinning={loading}>
      {!loading && dadosIniciais && (
        <Form
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators
          }}
          initialValues={dadosIniciais}
          render={({ handleSubmit, form, errors }) => (
            <form onSubmit={handleSubmit}>
              <FormSpy
                subscription={{ values: true, active: true }}
                onChange={changes =>
                  setFormValuesAtualizados({
                    week: semanaSelecionada,
                    ...changes.values
                  })
                }
              />
              <div className="card mt-3">
                <div className="card-body">
                  <div className="row pb-2">
                    <div className="col-3">
                      <b className="pb-2 mb-2">Mês do Lançamento</b>
                      <Field
                        component={InputText}
                        name="mes_lancamento"
                        disabled={true}
                      />
                    </div>
                    <div className="col-3">
                      <b className="pb-2">Período de Lançamento</b>
                      <Field
                        component={InputText}
                        name="periodo_escolar"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row pb-2 pt-4">
                    <div className="col">
                      <b className="section-title">
                        Semanas do Período para Lançamento da Medição Inicial
                      </b>
                    </div>
                  </div>
                  <div className="weeks-tabs mb-2">
                    <Tabs
                      activeKey={semanaSelecionada}
                      onChange={key => {
                        onChangeSemana(formValuesAtualizados, key);
                      }}
                      type="card"
                      className={`${
                        semanaSelecionada === 1
                          ? "default-color-first-semana"
                          : ""
                      }`}
                    >
                      {Array.apply(null, {
                        length: isSunday(lastDayOfMonth(mesAnoConsiderado))
                          ? getWeeksInMonth(mesAnoConsiderado) - 1
                          : getDay(startOfMonth(mesAnoConsiderado)) === 0
                          ? getWeeksInMonth(mesAnoConsiderado) + 1
                          : getWeeksInMonth(mesAnoConsiderado)
                      }).map((e, i) => (
                        <TabPane tab={`Semana ${i + 1}`} key={`${i + 1}`} />
                      ))}
                    </Tabs>
                  </div>
                  {categoriasDeMedicao.length > 0 &&
                    !loading &&
                    categoriasDeMedicao.map(categoria => (
                      <div key={categoria.uuid}>
                        <b className="pb-2 section-title">{categoria.nome}</b>
                        {(categoria.nome === "ALIMENTAÇÃO" ||
                          categoria.nome.includes("SOLICITAÇÕES")) &&
                          ultimaAtualizacaoMedicao && (
                            <p className="ultimo-salvamento mb-0">
                              Último salvamento {ultimaAtualizacaoMedicao}
                            </p>
                          )}
                        <section className="tabela-tipos-alimentacao">
                          <article>
                            <div
                              className={
                                "grid-table-tipos-alimentacao header-table"
                              }
                            >
                              <div />
                              {weekColumns.map(column => (
                                <div key={column.dia}>{column.dia}</div>
                              ))}
                            </div>
                            <div
                              className={
                                "grid-table-tipos-alimentacao header-table"
                              }
                            >
                              <div />
                              <div>Seg.</div>
                              <div>Ter.</div>
                              <div>Qua.</div>
                              <div>Qui.</div>
                              <div>Sex.</div>
                              <div>Sáb.</div>
                              <div>Dom.</div>
                            </div>
                            {semanaSelecionada &&
                              calendarioMesConsiderado &&
                              (tabelaDietaRows || tabelaDietaEnteralRows) &&
                              (categoria.nome.includes("DIETA")
                                ? (categoria.nome.includes("ENTERAL")
                                    ? tabelaDietaEnteralRows
                                    : tabelaDietaRows
                                  ).map((row, index) => {
                                    return (
                                      <Fragment key={index}>
                                        <div
                                          className={`grid-table-tipos-alimentacao body-table-alimentacao`}
                                        >
                                          <div className="nome-linha">
                                            <b className="pl-2">{row.nome}</b>
                                          </div>
                                          {weekColumns.map(column => (
                                            <div
                                              key={column.dia}
                                              className={`${
                                                validacaoSemana(column.dia)
                                                  ? "input-desabilitado"
                                                  : row.name === "observacoes"
                                                  ? "input-habilitado-observacoes"
                                                  : "input-habilitado"
                                              }`}
                                            >
                                              {row.name === "observacoes" ? (
                                                !validacaoSemana(
                                                  column.dia
                                                ) && (
                                                  <Botao
                                                    texto={textoBotaoObservacao(
                                                      formValuesAtualizados[
                                                        `${row.name}__dia_${
                                                          column.dia
                                                        }__categoria_${
                                                          categoria.id
                                                        }`
                                                      ]
                                                    )}
                                                    type={BUTTON_TYPE.BUTTON}
                                                    style={
                                                      botaoAdicionarObrigatorio(
                                                        formValuesAtualizados,
                                                        column.dia,
                                                        categoria,
                                                        diasSobremesaDoce,
                                                        location,
                                                        row,
                                                        column,
                                                        dadosValoresInclusoesAutorizadasState
                                                      )
                                                        ? BUTTON_STYLE.RED_OUTLINE
                                                        : BUTTON_STYLE.GREEN_OUTLINE_WHITE
                                                    }
                                                    onClick={() =>
                                                      onClickBotaoObservacao(
                                                        column.dia,
                                                        categoria.id
                                                      )
                                                    }
                                                  />
                                                )
                                              ) : (
                                                <div className="field-values-input">
                                                  <Field
                                                    className={`m-2 ${
                                                      !validacaoDiaLetivo(
                                                        column.dia
                                                      )
                                                        ? "nao-eh-dia-letivo"
                                                        : ""
                                                    }`}
                                                    component={
                                                      InputValueMedicao
                                                    }
                                                    apenasNumeros
                                                    name={`${row.name}__dia_${
                                                      column.dia
                                                    }__categoria_${
                                                      categoria.id
                                                    }`}
                                                    disabled={desabilitarField(
                                                      column.dia,
                                                      row.name,
                                                      categoria.id,
                                                      categoria.nome,
                                                      formValuesAtualizados,
                                                      mesAnoConsiderado,
                                                      mesAnoDefault,
                                                      dadosValoresInclusoesAutorizadasState,
                                                      validacaoDiaLetivo,
                                                      validacaoSemana
                                                    )}
                                                    dia={column.dia}
                                                    defaultValue={defaultValue(
                                                      column,
                                                      row
                                                    )}
                                                    validate={fieldValidationsTabelasDietas(
                                                      row.name,
                                                      column.dia,
                                                      categoria.id
                                                    )}
                                                  />
                                                  <OnChange
                                                    name={`${row.name}__dia_${
                                                      column.dia
                                                    }__categoria_${
                                                      categoria.id
                                                    }`}
                                                  >
                                                    {(value, previous) => {
                                                      onChangeInput(
                                                        value,
                                                        previous,
                                                        errors,
                                                        formValuesAtualizados,
                                                        column.dia,
                                                        categoria,
                                                        row.name,
                                                        form,
                                                        column,
                                                        row
                                                      );
                                                    }}
                                                  </OnChange>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </Fragment>
                                    );
                                  })
                                : (categoria.nome.includes("SOLICITAÇÕES")
                                    ? tabelaSolicitacoesAlimentacaoRows
                                    : ehGrupoETECUrlParam
                                    ? tabelaEtecsAlimentacaoRows
                                    : tabelaAlimentacaoRows
                                  ).map((row, index) => {
                                    return (
                                      <Fragment key={index}>
                                        <div
                                          className={`grid-table-tipos-alimentacao body-table-alimentacao`}
                                        >
                                          <div className="nome-linha">
                                            <b className="pl-2">{row.nome}</b>
                                          </div>
                                          {weekColumns.map(column => (
                                            <div
                                              key={column.dia}
                                              className={`${
                                                validacaoSemana(column.dia)
                                                  ? "input-desabilitado"
                                                  : row.name === "observacoes"
                                                  ? "input-habilitado-observacoes"
                                                  : "input-habilitado"
                                              }`}
                                            >
                                              {row.name === "observacoes" ? (
                                                !validacaoSemana(
                                                  column.dia
                                                ) && (
                                                  <Botao
                                                    texto={textoBotaoObservacao(
                                                      formValuesAtualizados[
                                                        `${row.name}__dia_${
                                                          column.dia
                                                        }__categoria_${
                                                          categoria.id
                                                        }`
                                                      ]
                                                    )}
                                                    type={BUTTON_TYPE.BUTTON}
                                                    style={
                                                      botaoAdicionarObrigatorioTabelaAlimentacao(
                                                        formValuesAtualizados,
                                                        column.dia,
                                                        categoria,
                                                        diasSobremesaDoce,
                                                        location,
                                                        row,
                                                        dadosValoresInclusoesAutorizadasState,
                                                        validacaoDiaLetivo,
                                                        column,
                                                        suspensoesAutorizadas,
                                                        alteracoesAlimentacaoAutorizadas,
                                                        kitLanchesAutorizadas,
                                                        inclusoesEtecAutorizadas,
                                                        ehGrupoETECUrlParam
                                                      )
                                                        ? BUTTON_STYLE.RED_OUTLINE
                                                        : BUTTON_STYLE.GREEN_OUTLINE_WHITE
                                                    }
                                                    onClick={() =>
                                                      onClickBotaoObservacao(
                                                        column.dia,
                                                        categoria.id
                                                      )
                                                    }
                                                  />
                                                )
                                              ) : (
                                                <div className="field-values-input">
                                                  <Field
                                                    className={`m-2 ${classNameFieldTabelaAlimentacao(
                                                      row,
                                                      column,
                                                      categoria
                                                    )}`}
                                                    component={
                                                      InputValueMedicao
                                                    }
                                                    apenasNumeros
                                                    name={`${row.name}__dia_${
                                                      column.dia
                                                    }__categoria_${
                                                      categoria.id
                                                    }`}
                                                    disabled={desabilitarField(
                                                      column.dia,
                                                      row.name,
                                                      categoria.id,
                                                      categoria.nome,
                                                      formValuesAtualizados,
                                                      mesAnoConsiderado,
                                                      mesAnoDefault,
                                                      dadosValoresInclusoesAutorizadasState,
                                                      validacaoDiaLetivo,
                                                      validacaoSemana,
                                                      ehGrupoETECUrlParam,
                                                      dadosValoresInclusoesEtecAutorizadasState,
                                                      inclusoesEtecAutorizadas
                                                    )}
                                                    exibeTooltipDiaSobremesaDoce={
                                                      row.name ===
                                                        "repeticao_sobremesa" &&
                                                      diasSobremesaDoce.includes(
                                                        `${new Date(
                                                          location.state.mesAnoSelecionado
                                                        ).getFullYear()}-${(
                                                          new Date(
                                                            location.state.mesAnoSelecionado
                                                          ).getMonth() + 1
                                                        )
                                                          .toString()
                                                          .padStart(2, "0")}-${
                                                          column.dia
                                                        }`
                                                      )
                                                    }
                                                    exibeTooltipAlimentacoesAutorizadas={
                                                      `${row.name}__dia_${
                                                        column.dia
                                                      }__categoria_${
                                                        categoria.id
                                                      }` in
                                                      dadosValoresInclusoesAutorizadasState
                                                    }
                                                    exibeTooltipSemAlimentacaoPreAutorizadaInformada={exibirTooltipSemAlimentacaoPreAutorizadaInformada(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      dadosValoresInclusoesAutorizadasState
                                                    )}
                                                    exibeTooltipAlimentacoesAutorizadasDiaNaoLetivo={
                                                      `${row.name}__dia_${
                                                        column.dia
                                                      }__categoria_${
                                                        categoria.id
                                                      }` in
                                                        dadosValoresInclusoesAutorizadasState &&
                                                      !validacaoDiaLetivo(
                                                        column.dia
                                                      ) &&
                                                      !formValuesAtualizados[
                                                        `observacoes__dia_${
                                                          column.dia
                                                        }__categoria_${
                                                          categoria.id
                                                        }`
                                                      ]
                                                    }
                                                    exibeTooltipFrequenciaDiaNaoLetivo={exibirTooltipFrequenciaDiaNaoLetivo(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      dadosValoresInclusoesAutorizadasState,
                                                      validacaoDiaLetivo
                                                    )}
                                                    exibeTooltipErroQtdMaiorQueAutorizado={exibirTooltipErroQtdMaiorQueAutorizado(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      dadosValoresInclusoesAutorizadasState
                                                    )}
                                                    exibeTooltipSuspensoesAutorizadas={exibirTooltipSuspensoesAutorizadas(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      suspensoesAutorizadas
                                                    )}
                                                    exibeTooltipRPLAutorizadas={exibirTooltipRPLAutorizadas(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      alteracoesAlimentacaoAutorizadas
                                                    )}
                                                    exibeTooltipLPRAutorizadas={exibirTooltipLPRAutorizadas(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      alteracoesAlimentacaoAutorizadas
                                                    )}
                                                    exibeTooltipQtdKitLancheDiferenteSolAlimentacoesAutorizadas={exibirTooltipQtdKitLancheDiferenteSolAlimentacoesAutorizadas(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      kitLanchesAutorizadas
                                                    )}
                                                    exibeTooltipKitLancheSolAlimentacoes={exibirTooltipKitLancheSolAlimentacoes(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      kitLanchesAutorizadas
                                                    )}
                                                    exibeTooltipQtdLancheEmergencialDiferenteSolAlimentacoesAutorizadas={exibirTooltipQtdLancheEmergencialDiferenteSolAlimentacoesAutorizadas(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      alteracoesAlimentacaoAutorizadas
                                                    )}
                                                    exibeTooltipLancheEmergencialSolAlimentacoes={exibirTooltipLancheEmergencialSolAlimentacoes(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      alteracoesAlimentacaoAutorizadas
                                                    )}
                                                    exibeTooltipFrequenciaZeroTabelaEtec={exibirTooltipFrequenciaZeroTabelaEtec(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      ehGrupoETECUrlParam
                                                    )}
                                                    exibeTooltipLancheEmergTabelaEtec={exibirTooltipLancheEmergTabelaEtec(
                                                      formValuesAtualizados,
                                                      row,
                                                      column,
                                                      categoria,
                                                      ehGrupoETECUrlParam,
                                                      inclusoesEtecAutorizadas
                                                    )}
                                                    ehGrupoETECUrlParam={
                                                      ehGrupoETECUrlParam
                                                    }
                                                    numeroDeInclusoesAutorizadas={
                                                      dadosValoresInclusoesAutorizadasState[
                                                        `${row.name}__dia_${
                                                          column.dia
                                                        }__categoria_${
                                                          categoria.id
                                                        }`
                                                      ]
                                                    }
                                                    defaultValue={defaultValue(
                                                      column,
                                                      row
                                                    )}
                                                    validate={fieldValidationsTabelaAlimentacao(
                                                      row.name,
                                                      column.dia,
                                                      categoria.id,
                                                      categoria.nome
                                                    )}
                                                  />
                                                  <OnChange
                                                    name={`${row.name}__dia_${
                                                      column.dia
                                                    }__categoria_${
                                                      categoria.id
                                                    }`}
                                                  >
                                                    {(value, previous) => {
                                                      onChangeInput(
                                                        value,
                                                        previous,
                                                        errors,
                                                        formValuesAtualizados,
                                                        column.dia,
                                                        categoria,
                                                        row.name,
                                                        form,
                                                        column,
                                                        row
                                                      );
                                                    }}
                                                  </OnChange>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </Fragment>
                                    );
                                  }))}
                          </article>
                        </section>
                      </div>
                    ))}
                  {mesAnoConsiderado && (
                    <ModalObservacaoDiaria
                      closeModal={() => setShowModalObservacaoDiaria(false)}
                      categoria={showCategoriaObservacaoDiaria}
                      showModal={showModalObservacaoDiaria}
                      dia={showDiaObservacaoDiaria}
                      mesAnoConsiderado={mesAnoConsiderado}
                      calendarioMesConsiderado={calendarioMesConsiderado}
                      form={form}
                      values={formValuesAtualizados}
                      rowName={"observacoes"}
                      valoresPeriodosLancamentos={valoresPeriodosLancamentos}
                      onSubmit={() =>
                        onSubmitObservacao(
                          formValuesAtualizados,
                          showDiaObservacaoDiaria,
                          showCategoriaObservacaoDiaria
                        )
                      }
                      dadosIniciais={dadosIniciais}
                      setExibirTooltip={value => setExibirTooltip(value)}
                      errors={errors}
                      valoresObservacoes={valoresObservacoes}
                    />
                  )}
                  <Botao
                    className="float-right"
                    texto="Salvar Lançamentos"
                    type={BUTTON_TYPE.BUTTON}
                    style={`${BUTTON_STYLE.GREEN}`}
                    onClick={() =>
                      onSubmit(
                        formValuesAtualizados,
                        dadosValoresInclusoesAutorizadasState
                      )
                    }
                    disabled={disableBotaoSalvarLancamentos}
                    exibirTooltip={exibirTooltip}
                    tooltipTitulo="Existem campos a serem corrigidos. Realize as correções para salvar."
                    classTooltip="icone-info-invalid"
                  />
                </div>
                <ModalErro
                  showModalErro={showModalErro}
                  setShowModalErro={setShowModalErro}
                />
              </div>
            </form>
          )}
        />
      )}
    </Spin>
  );
};
