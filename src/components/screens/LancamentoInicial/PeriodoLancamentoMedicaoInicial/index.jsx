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
import { deepCopy, deepEqual } from "helpers/utilities";
import {
  botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada,
  botaoAdicionarObrigatorio,
  botaoAdicionarObrigatorioTabelaAlimentacao,
  validacoesTabelaAlimentacao,
  validacoesTabelasDietas,
  validarFormulario
} from "./validacoes";
import {
  deveExistirObservacao,
  formatarPayloadPeriodoLancamento
} from "./helper";
import {
  getCategoriasDeMedicao,
  getDiasCalendario,
  getMatriculadosPeriodo,
  getLogDietasAutorizadasPeriodo,
  getValoresPeriodosLancamentos,
  setPeriodoLancamento,
  updateValoresPeriodosLancamentos,
  getSolicitacoesInclusoesAutorizadasEscola
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import * as perfilService from "services/perfil.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { getSolicitacoesAutorizadasEscola } from "services/painelEscola.service";
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
  const [categoriasDeMedicao, setCategoriasDeMedicao] = useState([]);
  const [solicitacoesAutorizadas, setSolicitacoesAutorizadas] = useState([]);
  const [inclusoesAutorizadas, setInclusoesAutorizadas] = useState(null);
  const [
    dadosValoresInclusoesAutorizadasState,
    setDadosValoresInclusoesAutorizadasState
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

  const location = useLocation();
  let mesAnoDefault = new Date();

  const { TabPane } = Tabs;

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

  const getSolicitacoesInclusaoAutorizadasAsync = async (
    escolaUuuid,
    mes,
    ano,
    nome_periodo_escolar
  ) => {
    const params = {};
    params["escola_uuid"] = escolaUuuid;
    params["tipo_solicitacao"] = "Inclusão de";
    params["mes"] = mes;
    params["ano"] = ano;
    params["nome_periodo_escolar"] = nome_periodo_escolar;
    if (
      location.state.grupo &&
      location.state.grupo.includes("Programas e Projetos")
    ) {
      params["tipo_doc"] = "INC_ALIMENTA_CONTINUA";
    } else {
      params["excluir_inclusoes_continuas"] = true;
    }
    const responseAutorizadas = await getSolicitacoesInclusoesAutorizadasEscola(
      params
    );
    if (responseAutorizadas.status === HTTP_STATUS.OK) {
      return responseAutorizadas.data.results;
    } else {
      toastError("Erro ao carregar Inclusões Autorizadas");
      return [];
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

      const response_categorias_medicao = await getCategoriasDeMedicao();
      setCategoriasDeMedicao(response_categorias_medicao.data);

      const params = {
        nome_periodo_escolar: periodo.periodo_escolar.nome,
        uuid_solicitacao_medicao: uuid,
        nome_grupo: location.state.grupo
      };
      const response_valores_periodos = await getValoresPeriodosLancamentos(
        params
      );
      setValoresPeriodosLancamentos(response_valores_periodos.data);

      const mes = format(mesAnoSelecionado, "MM");
      const ano = getYear(mesAnoSelecionado);
      const params_matriculados = {
        escola_uuid: escola.uuid,
        mes: mes,
        ano: ano,
        tipo_turma: "REGULAR",
        periodo_escolar: periodo.periodo_escolar.uuid
      };
      const response_matriculados = await getMatriculadosPeriodo(
        params_matriculados
      );
      setValoresMatriculados(response_matriculados.data);

      const params_dietas_autorizadas = {
        escola_uuid: escola.uuid,
        mes: mes,
        ano: ano
      };
      const response_log_dietas_autorizadas = await getLogDietasAutorizadasPeriodo(
        params_dietas_autorizadas
      );
      setLogQtdDietasAutorizadas(response_log_dietas_autorizadas.data);

      const params_dias_calendario = {
        escola_uuid: escola.uuid,
        mes: mes,
        ano: ano
      };
      const response_dias_calendario = await getDiasCalendario(
        params_dias_calendario
      );
      setCalendarioMesConsiderado(response_dias_calendario.data);

      const solicitacoesAutorizadasEscola = await getSolicitacoesAutorizadasEscola(
        escola.uuid
      );
      setSolicitacoesAutorizadas(solicitacoesAutorizadasEscola.data.results);

      const response_inclusoes_autorizadas = await getSolicitacoesInclusaoAutorizadasAsync(
        escola.uuid,
        mes,
        ano,
        periodo.periodo_escolar.nome
      );
      setInclusoesAutorizadas(response_inclusoes_autorizadas);

      await formatarDadosValoresMedicao(
        mesAnoFormatado,
        response_valores_periodos.data,
        response_categorias_medicao.data,
        tiposAlimentacaoFormatadas,
        response_matriculados.data,
        rowsDietas,
        response_log_dietas_autorizadas.data,
        response_inclusoes_autorizadas,
        mesAnoSelecionado
      );
      setLoading(false);
    };
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatarDadosValoresMedicao = async (
    mesAnoFormatado,
    valoresMedicao,
    categoriasMedicao,
    tiposAlimentacaoFormatadas,
    matriculados,
    rowsDietas,
    logQtdDietasAutorizadas,
    solInclusaoAutorizadas,
    mesAno
  ) => {
    let dadosValoresMedicoes = {};
    let dadosValoresMatriculados = {};
    let dadosValoresDietasAutorizadas = {};
    let dadosValoresForaDoMes = {};
    const dadosMesPeriodo = {
      mes_lancamento: mesAnoFormatado,
      periodo_escolar: location.state
        ? `${location.state.grupo ? `${location.state.grupo} - ` : ""}${
            location.state.periodo
          }`
        : "MANHA"
    };
    let dadosValoresInclusoesAutorizadas = {};

    categoriasMedicao &&
      categoriasMedicao.forEach(categoria => {
        matriculados &&
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

        tiposAlimentacaoFormatadas &&
          tiposAlimentacaoFormatadas.forEach(alimentacao => {
            if (
              categoria.nome.includes("ALIMENTAÇÃO") &&
              solInclusaoAutorizadas
            ) {
              const inclusoesFiltradas = solInclusaoAutorizadas.filter(
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
          rowsDietas &&
          [tiposAlimentacaoFormatadas, rowsDietas].forEach(
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
        mesAnoConsiderado
      );
    };
    semanaSelecionada && formatar();

    valoresPeriodosLancamentos.findIndex(
      valor => valor.nome_campo !== "observacoes"
    ) !== -1 && setDisableBotaoSalvarLancamentos(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          key.includes("repeticao") ||
          key.includes("emergencial")) &&
        delete valuesMesmoDiaDaObservacao[key]
      );
    });
    let qtdCamposComErro = 0;
    Object.entries(valuesMesmoDiaDaObservacao).forEach(([key, value]) => {
      if (
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
        tipo_alimentacao: tipoAlimentacao.uuid || ""
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
    } else {
      payload["periodo_escolar"] = values["periodo_escolar"];
    }
    let valores_medicao_response = [];
    if (valoresPeriodosLancamentos.length) {
      setLoading(true);
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
      setLoading(true);
      const response = await setPeriodoLancamento(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Observação salva com sucesso");
        valores_medicao_response = response.data.valores_medicao;
      } else {
        return toastError("Erro ao salvar observação.");
      }
    }
    setValoresPeriodosLancamentos(valores_medicao_response);
    await formatarDadosValoresMedicao(
      mesAnoFormatadoState,
      valores_medicao_response,
      categoriasDeMedicao,
      tabelaAlimentacaoRows,
      valoresMatriculados,
      tabelaDietaRows,
      logQtdDietasAutorizadas,
      inclusoesAutorizadas,
      mesAnoConsiderado
    );
    setLoading(false);
    setDisableBotaoSalvarLancamentos(true);
  };

  const onSubmit = async (
    values,
    dadosValoresInclusoesAutorizadasState,
    ehSalvamentoAutomático = false
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
    let dadosIniciaisClone = deepCopy(values);
    valuesClone.solicitacao_medicao_inicial = uuid;
    Object.entries(valuesClone).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          key.includes("matriculados") ||
          key.includes("dietas_autorizadas")) &&
        delete valuesClone[key]
      );
    });
    Object.entries(dadosIniciaisClone).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          key.includes("matriculados") ||
          key.includes("dietas_autorizadas")) &&
        delete dadosIniciaisClone[key]
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
      diasDaSemanaSelecionada
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
    await formatarDadosValoresMedicao(
      mesAnoFormatadoState,
      valores_medicao_response,
      categoriasDeMedicao,
      tabelaAlimentacaoRows,
      valoresMatriculados,
      tabelaDietaRows,
      logQtdDietasAutorizadas,
      inclusoesAutorizadas,
      mesAnoConsiderado
    );
    setLoading(false);
    setDisableBotaoSalvarLancamentos(true);
  };

  const onChangeSemana = (values, key) => {
    if (disableBotaoSalvarLancamentos && exibirTooltip) {
      setShowModalErro(true);
    } else {
      setSemanaSelecionada(key);
      onSubmit(
        formValuesAtualizados,
        dadosValoresInclusoesAutorizadasState,
        true
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

  const desabilitarField = (dia, rowName, categoria, values) => {
    const mesConsiderado = format(mesAnoConsiderado, "LLLL", {
      locale: ptBR
    }).toString();
    const mesAtual = format(mesAnoDefault, "LLLL", {
      locale: ptBR
    }).toString();

    if (!values[`matriculados__dia_${dia}__categoria_${categoria}`]) {
      return true;
    }
    if (
      `${rowName}__dia_${dia}__categoria_${categoria}` in
        dadosValoresInclusoesAutorizadasState &&
      !["Mês anterior", "Mês posterior"].includes(
        values[`${rowName}__dia_${dia}__categoria_${categoria}`]
      )
    ) {
      return false;
    } else if (
      `${rowName}__dia_${dia}__categoria_${categoria}` ===
        `frequencia__dia_${dia}__categoria_${categoria}` &&
      Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
        String(key).includes(`__dia_${dia}__categoria_${categoria}`)
      ) &&
      !["Mês anterior", "Mês posterior"].includes(
        values[`${rowName}__dia_${dia}__categoria_${categoria}`]
      )
    ) {
      return false;
    } else {
      return (
        !validacaoDiaLetivo(dia) ||
        validacaoSemana(dia) ||
        rowName === "matriculados" ||
        rowName === "dietas_autorizadas" ||
        !values[`matriculados__dia_${dia}__categoria_${categoria}`] ||
        Number(
          values[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`]
        ) === 0 ||
        (mesConsiderado === mesAtual &&
          Number(dia) >= format(mesAnoDefault, "dd"))
      );
    }
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

  const onChangeInput = (
    value,
    previous,
    errors,
    values,
    dia,
    categoria,
    rowName
  ) => {
    if (deepEqual(values, dadosIniciais)) {
      setDisableBotaoSalvarLancamentos(true);
    } else if (
      (value || previous) &&
      value !== previous &&
      !["Mês anterior", "Mês posterior"].includes(value) &&
      !["Mês anterior", "Mês posterior"].includes(previous)
    ) {
      setDisableBotaoSalvarLancamentos(false);
      setExibirTooltip(false);
    } else if (typeof value === "string") {
      value.match(/\d+/g) !== null && valuesInputArray.push(value);
      if (value === null) {
        valuesInputArray.length = 0;
      }
      if (value.match(/\d+/g) !== null && valuesInputArray.length > 0) {
        setDisableBotaoSalvarLancamentos(false);
      } else {
        setDisableBotaoSalvarLancamentos(true);
      }
    }

    if (
      categoria.nome.includes("ALIMENTAÇÃO") &&
      botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada(
        values,
        dia,
        categoria,
        rowName,
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

    if (deveExistirObservacao(categoria.id, values, calendarioMesConsiderado)) {
      return;
    }
  };

  const fieldValidationsTabelaAlimentacao = (rowName, dia, categoria) => (
    value,
    allValues
  ) => {
    return validacoesTabelaAlimentacao(
      mesAnoConsiderado,
      solicitacoesAutorizadas,
      rowName,
      dia,
      categoria,
      value,
      allValues,
      dadosValoresInclusoesAutorizadasState,
      validacaoDiaLetivo,
      location
    );
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
                      defaultActiveKey={semanaSelecionada}
                      onChange={key => {
                        onChangeSemana(formValuesAtualizados, key);
                      }}
                      type="card"
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
                        {categoria.nome === "ALIMENTAÇÃO" &&
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
                                                      formValuesAtualizados
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
                                                        row.name
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
                                : tabelaAlimentacaoRows &&
                                  tabelaAlimentacaoRows.map((row, index) => {
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
                                                        row.name,
                                                        dadosValoresInclusoesAutorizadasState,
                                                        validacaoDiaLetivo
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
                                                      formValuesAtualizados
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
                                                    exibeTooltipSemAlimentacaoPreAutorizadaInformada={
                                                      `${row.name}__dia_${
                                                        column.dia
                                                      }__categoria_${
                                                        categoria.id
                                                      }` in
                                                        dadosValoresInclusoesAutorizadasState &&
                                                      Number(
                                                        formValuesAtualizados[
                                                          `${row.name}__dia_${
                                                            column.dia
                                                          }__categoria_${
                                                            categoria.id
                                                          }`
                                                        ]
                                                      ) === 0 &&
                                                      !formValuesAtualizados[
                                                        `observacoes__dia_${
                                                          column.dia
                                                        }__categoria_${
                                                          categoria.id
                                                        }`
                                                      ]
                                                    }
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
                                                    exibeTooltipFrequenciaDiaNaoLetivo={
                                                      !validacaoDiaLetivo(
                                                        column.dia
                                                      ) &&
                                                      row.name ===
                                                        "frequencia" &&
                                                      Object.keys(
                                                        dadosValoresInclusoesAutorizadasState
                                                      ).some(key =>
                                                        String(key).includes(
                                                          `__dia_${
                                                            column.dia
                                                          }__categoria_${
                                                            categoria.id
                                                          }`
                                                        )
                                                      ) &&
                                                      Number(
                                                        formValuesAtualizados[
                                                          `frequencia__dia_${
                                                            column.dia
                                                          }__categoria_${
                                                            categoria.id
                                                          }`
                                                        ]
                                                      ) === 0
                                                    }
                                                    exibeTooltipErroQtdMaiorQueAutorizado={
                                                      `${row.name}__dia_${
                                                        column.dia
                                                      }__categoria_${
                                                        categoria.id
                                                      }` in
                                                        dadosValoresInclusoesAutorizadasState &&
                                                      Number(
                                                        formValuesAtualizados[
                                                          `${row.name}__dia_${
                                                            column.dia
                                                          }__categoria_${
                                                            categoria.id
                                                          }`
                                                        ]
                                                      ) >
                                                        Number(
                                                          dadosValoresInclusoesAutorizadasState[
                                                            `${row.name}__dia_${
                                                              column.dia
                                                            }__categoria_${
                                                              categoria.id
                                                            }`
                                                          ]
                                                        ) &&
                                                      !formValuesAtualizados[
                                                        `observacoes__dia_${
                                                          column.dia
                                                        }__categoria_${
                                                          categoria.id
                                                        }`
                                                      ]
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
                                                        row.name
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
                    exibirTooltip={
                      disableBotaoSalvarLancamentos && exibirTooltip
                    }
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
