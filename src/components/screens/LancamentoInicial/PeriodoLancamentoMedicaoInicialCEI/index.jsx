import React, { Fragment, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { useHistory, useLocation } from "react-router-dom";
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
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import ModalObservacaoDiaria from "./components/ModalObservacaoDiaria";
import ModalErro from "./components/ModalErro";
import ModalSalvarCorrecoes from "./components/ModalSalvarCorrecoes";
import { ModalVoltarPeriodoLancamento } from "./components/ModalVoltarPeriodoLancamento";
import CKEditorField from "components/Shareable/CKEditorField";
import { deepCopy, deepEqual } from "helpers/utilities";
import {
  botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada,
  botaoAdicionarObrigatorioTabelaAlimentacao,
  validacoesTabelaAlimentacaoCEI,
  validarFormulario
} from "./validacoes";
import {
  desabilitarBotaoColunaObservacoes,
  desabilitarField,
  deveExistirObservacao,
  formatarPayloadParaCorrecao,
  formatarPayloadPeriodoLancamento,
  textoBotaoObservacao
} from "./helper";
import {
  getCategoriasDeMedicao,
  getDiasCalendario,
  getValoresPeriodosLancamentos,
  setPeriodoLancamento,
  updateValoresPeriodosLancamentos,
  getFeriadosNoMes,
  getLogMatriculadosPorFaixaEtariaDia
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import * as perfilService from "services/perfil.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { escolaCorrigeMedicao } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";
import { DETALHAMENTO_DO_LANCAMENTO, MEDICAO_INICIAL } from "configs/constants";
import "./styles.scss";

export const PeriodoLancamentoMedicaoInicialCEI = () => {
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
  const [tabelaAlimentacaoCEIRows, setTabelaAlimentacaoCEIRows] = useState([]);
  const [tabelaDietaRows, setTabelaDietaRows] = useState([]);
  const [categoriasDeMedicao, setCategoriasDeMedicao] = useState([]);
  const [
    valoresMatriculadosFaixaEtariaDia,
    setValoresMatriculadosFaixaEtariaDia
  ] = useState([]);
  const [
    dadosValoresInclusoesAutorizadasState,
    setDadosValoresInclusoesAutorizadasState
  ] = useState(null);
  const [valoresPeriodosLancamentos, setValoresPeriodosLancamentos] = useState(
    []
  );
  const [calendarioMesConsiderado, setCalendarioMesConsiderado] = useState(
    null
  );
  const [feriadosNoMes, setFeriadosNoMes] = useState(null);
  const [showModalObservacaoDiaria, setShowModalObservacaoDiaria] = useState(
    false
  );
  const [showModalSalvarCorrecoes, setShowModalSalvarCorrecoes] = useState(
    false
  );
  const [
    showModalVoltarPeriodoLancamento,
    setShowModalVoltarPeriodoLancamento
  ] = useState(false);
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
  const [periodoGrupo, setPeriodoGrupo] = useState(null);
  const [tabItems, setTabItems] = useState(null);

  const history = useHistory();
  const location = useLocation();
  let mesAnoDefault = new Date();

  const grupoLocation = location && location.state && location.state.grupo;

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
      const periodos_escolares = response_vinculos.data.results;
      const periodo =
        periodos_escolares.find(
          periodo =>
            periodo.periodo_escolar.nome ===
            (location.state ? location.state.periodo : "MANHA")
        ) || periodos_escolares[0];

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

      rowsDietas.push({
        nome: "Observações",
        name: "observacoes",
        uuid: null
      });
      setTabelaDietaRows(rowsDietas);

      const mes = format(mesAnoSelecionado, "MM");
      const ano = getYear(mesAnoSelecionado);
      let response_log_matriculados_por_faixa_etaria_dia = [];
      let faixas_etarias = [];
      let faixas_etarias_objs = [];

      let response_categorias_medicao = await getCategoriasDeMedicao();

      const params_matriculados_por_faixa_etaria_dia = {
        escola_uuid: escola.uuid,
        nome_periodo_escolar: periodo.periodo_escolar.nome,
        mes: mes,
        ano: ano
      };
      response_log_matriculados_por_faixa_etaria_dia = await getLogMatriculadosPorFaixaEtariaDia(
        params_matriculados_por_faixa_etaria_dia
      );
      setValoresMatriculadosFaixaEtariaDia(
        response_log_matriculados_por_faixa_etaria_dia.data
      );
      response_log_matriculados_por_faixa_etaria_dia.data.forEach(log => {
        !faixas_etarias.find(faixa => faixa === log.faixa_etaria.__str__) &&
          faixas_etarias.push(log.faixa_etaria.__str__);
      });

      faixas_etarias.forEach(faixa => {
        const log = response_log_matriculados_por_faixa_etaria_dia.data.find(
          log => log.faixa_etaria.__str__ === faixa
        );
        log &&
          faixas_etarias_objs.push({
            inicio: log.faixa_etaria.inicio,
            __str__: log.faixa_etaria.__str__,
            uuid: log.faixa_etaria.uuid
          });
      });

      let linhasTabelaAlimentacaoCEI = [];

      faixas_etarias_objs
        .sort((a, b) => a.inicio - b.inicio)
        .forEach(faixa_obj => {
          linhasTabelaAlimentacaoCEI.push(
            {
              nome: "Matriculados",
              name: "matriculados",
              uuid: faixa_obj.uuid,
              faixa_etaria: faixa_obj.__str__
            },
            {
              nome: "Frequência",
              name: "frequencia",
              uuid: faixa_obj.uuid,
              faixa_etaria: faixa_obj.__str__
            }
          );
        });
      linhasTabelaAlimentacaoCEI.push({
        nome: "Observações",
        name: "observacoes",
        uuid: null,
        faixa_etaria: null
      });

      setTabelaAlimentacaoCEIRows(linhasTabelaAlimentacaoCEI);

      response_categorias_medicao = response_categorias_medicao.data.filter(
        categoria => {
          return !categoria.nome.includes("SOLICITAÇÕES");
        }
      );
      response_categorias_medicao = response_categorias_medicao.filter(
        categoria => {
          return !categoria.nome.includes("DIETA");
        }
      );
      setCategoriasDeMedicao(response_categorias_medicao);

      let params = {
        uuid_solicitacao_medicao: uuid,
        nome_grupo: location.state.grupo
      };
      params = {
        ...params,
        nome_periodo_escolar: periodo.periodo_escolar.nome
      };
      const response_valores_periodos = await getValoresPeriodosLancamentos(
        params
      );
      setValoresPeriodosLancamentos(response_valores_periodos.data);

      const params_dias_calendario = {
        escola_uuid: escola.uuid,
        mes: mes,
        ano: ano
      };
      const response_dias_calendario = await getDiasCalendario(
        params_dias_calendario
      );
      setCalendarioMesConsiderado(response_dias_calendario.data);

      const params_feriados_no_mes = {
        mes: mes,
        ano: ano
      };
      const response_feriados_no_mes = await getFeriadosNoMes(
        params_feriados_no_mes
      );
      setFeriadosNoMes(response_feriados_no_mes.data.results);

      await formatarDadosValoresMedicao(
        mesAnoFormatado,
        response_valores_periodos.data,
        response_categorias_medicao,
        linhasTabelaAlimentacaoCEI,
        mesAnoSelecionado,
        response_log_matriculados_por_faixa_etaria_dia.data
      );

      let items = [];
      Array.apply(null, {
        length: isSunday(lastDayOfMonth(mesAnoSelecionado))
          ? getWeeksInMonth(mesAnoSelecionado) - 1
          : getDay(startOfMonth(mesAnoSelecionado)) === 0
          ? getWeeksInMonth(mesAnoSelecionado) + 1
          : getWeeksInMonth(mesAnoSelecionado)
      }).map((e, i) =>
        items.push({
          key: `${i + 1}`,
          label: `Semana ${i + 1}`
        })
      );
      setTabItems(items);

      setLoading(false);
    };
    fetch();
  }, []);

  const formatarDadosValoresMedicao = async (
    mesAnoFormatado,
    valoresMedicao,
    categoriasMedicao,
    tabelaAlimentacaoCEIRows,
    mesAno,
    matriculadosFaixaEtariaDia
  ) => {
    let dadosValoresMedicoes = {};
    let dadosValoresMatriculadosFaixaEtariaDia = {};
    let dadosValoresDietasAutorizadas = {};
    let dadosValoresForaDoMes = {};
    let periodoEscolar = "MANHA";
    let justificativaPeriodo = "";
    if (location.state) {
      justificativaPeriodo = location.state.justificativa_periodo;
      if (location.state.grupo && location.state.periodo) {
        periodoEscolar = `${location.state.grupo} - ${location.state.periodo}`;
      } else if (location.state.grupo) {
        periodoEscolar = `${location.state.grupo}`;
      } else {
        periodoEscolar = `${location.state.periodo}`;
      }
    }
    setPeriodoGrupo(periodoEscolar);
    const dadosMesPeriodo = {
      mes_lancamento: mesAnoFormatado,
      periodo_escolar: periodoEscolar,
      justificativa_periodo: justificativaPeriodo
    };
    let dadosValoresInclusoesAutorizadas = {};

    setDadosValoresInclusoesAutorizadasState(dadosValoresInclusoesAutorizadas);

    categoriasMedicao &&
      categoriasMedicao.forEach(categoria => {
        matriculadosFaixaEtariaDia &&
          matriculadosFaixaEtariaDia.forEach(obj => {
            dadosValoresMatriculadosFaixaEtariaDia[
              `matriculados__faixa_${obj.faixa_etaria.uuid}__dia_${
                obj.dia
              }__categoria_${categoria.id}`
            ] = obj.quantidade ? `${obj.quantidade}` : null;
          });

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

        tabelaAlimentacaoCEIRows &&
          [tabelaAlimentacaoCEIRows].forEach(
            each =>
              each &&
              each.forEach(row => {
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
                      `${row.name}__faixa_${row.uuid}__dia_${dia}__categoria_${
                        categoria.id
                      }`
                    ] = result;
                  }
                  if (
                    [4, 5, 6].includes(Number(semanaSelecionada)) &&
                    Number(dia) < 10 &&
                    diasSemana.includes(dia)
                  ) {
                    result = "Mês posterior";
                    dadosValoresForaDoMes[
                      `${row.name}__faixa_${row.uuid}__dia_${dia}__categoria_${
                        categoria.id
                      }`
                    ] = result;
                  }
                }
              })
          );

        valoresMedicao &&
          valoresMedicao.forEach(valor_medicao => {
            if (valor_medicao.nome_campo === "observacoes") {
              dadosValoresMedicoes[
                `${valor_medicao.nome_campo}__dia_${
                  valor_medicao.dia
                }__categoria_${valor_medicao.categoria_medicao}`
              ] = valor_medicao.valor ? `${valor_medicao.valor}` : null;
            } else {
              dadosValoresMedicoes[
                `${valor_medicao.nome_campo}__faixa_${
                  valor_medicao.faixa_etaria
                }__dia_${valor_medicao.dia}__categoria_${
                  valor_medicao.categoria_medicao
                }`
              ] = valor_medicao.valor ? `${valor_medicao.valor}` : null;
            }
          });
      });

    valoresMedicao &&
      valoresMedicao.length > 0 &&
      setUltimaAtualizacaoMedicao(valoresMedicao[0].medicao_alterado_em);

    setDadosIniciais({
      ...dadosMesPeriodo,
      ...dadosValoresMedicoes,
      ...dadosValoresMatriculadosFaixaEtariaDia,
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
        tabelaAlimentacaoCEIRows,
        mesAnoConsiderado,
        valoresMatriculadosFaixaEtariaDia
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
    tabelaAlimentacaoCEIRows,
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

  const onSubmitObservacao = async (values, dia, categoria, errors) => {
    let valoresMedicao = [];
    const valuesMesmoDiaDaObservacao = Object.fromEntries(
      Object.entries(values).filter(([key]) => key.includes(dia))
    );
    Object.entries(valuesMesmoDiaDaObservacao).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          key.includes("dietas_autorizadas")) &&
        delete valuesMesmoDiaDaObservacao[key]
      );
    });
    let qtdCamposComErro = 0;

    if (
      Object.entries(errors).filter(([key]) =>
        key.includes(`__dia_${dia}__categoria_${categoria}`)
      ).length
    ) {
      toastError(`Existe(m) erro(s) na coluna do dia ${dia}.`);
      return;
    }
    Object.entries(valuesMesmoDiaDaObservacao)
      .filter(([key]) => key.includes(`categoria_${categoria}`))
      .forEach(([key, value]) => {
        const keySplitted = key.split("__");
        const uuid_faixa_etaria = keySplitted[1].replace("faixa_", "");
        if (
          !(key.includes("observacoes") || key.includes("matriculados")) &&
          Number(value) >
            Number(
              valuesMesmoDiaDaObservacao[
                `matriculados__faixa_${uuid_faixa_etaria}__dia_${dia}__categoria_${categoria}`
              ]
            )
        ) {
          qtdCamposComErro++;
        }
      });
    if (qtdCamposComErro) {
      toastError(
        `Existe(m) ${qtdCamposComErro} campo(s) com valor maior que matriculados. Necessário corrigir.`
      );
      return;
    }
    Object.entries(valuesMesmoDiaDaObservacao).map(v => {
      const keySplitted = v[0].split("__");
      const categoria = keySplitted.pop();
      const idCategoria = categoria.match(/\d/g).join("");
      const dia = keySplitted[v[0].includes("observacoes") ? 1 : 2]
        .match(/\d/g)
        .join("");
      const nome_campo = keySplitted[0];
      const uuid_faixa_etaria = v[0].includes("observacoes")
        ? ""
        : keySplitted[1].replace("faixa_", "");

      return valoresMedicao.push({
        dia: dia,
        valor: ["<p></p>\n", ""].includes(v[1]) ? 0 : v[1],
        nome_campo: nome_campo,
        categoria_medicao: idCategoria,
        faixa_etaria: uuid_faixa_etaria
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
    if (
      values["periodo_escolar"].includes("Solicitações") ||
      values["periodo_escolar"] === "ETEC" ||
      values["periodo_escolar"] === "Programas e Projetos"
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
    setExibirTooltip(false);
  };

  const onSubmit = async (
    values,
    dadosValoresInclusoesAutorizadasState,
    ehSalvamentoAutomático = false,
    chamarFuncaoFormatar = true,
    ehCorrecao = false
  ) => {
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
      tabelaAlimentacaoCEIRows,
      dadosIniciaisFiltered,
      diasDaSemanaSelecionada,
      grupoLocation
    );
    if (payload.valores_medicao.length === 0)
      return (
        !ehSalvamentoAutomático && toastWarn("Não há valores para serem salvos")
      );

    if (ehCorrecao) {
      const payloadParaCorrecao = formatarPayloadParaCorrecao(
        valoresPeriodosLancamentos,
        payload
      );
      const response = await escolaCorrigeMedicao(
        valoresPeriodosLancamentos[0].medicao_uuid,
        payloadParaCorrecao
      );
      if (response.status === HTTP_STATUS.OK) {
        let mes = new Date(location.state.mesAnoSelecionado).getMonth() + 1;
        const ano = new Date(location.state.mesAnoSelecionado).getFullYear();
        mes = String(mes).length === 1 ? "0" + String(mes) : String(mes);
        history.push(
          `/${MEDICAO_INICIAL}/${DETALHAMENTO_DO_LANCAMENTO}?mes=${mes}&ano=${ano}`
        );
        return toastSuccess("Correções salvas com sucesso!");
      } else {
        return toastError("Erro ao salvar correções.");
      }
    }

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
        tabelaAlimentacaoCEIRows,
        mesAnoConsiderado,
        valoresMatriculadosFaixaEtariaDia
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
        false,
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

  const onClickBotaoObservacao = (dia, categoria) => {
    openModalObservacaoDiaria(dia, categoria);
  };

  let valuesInputArray = [];

  const desabilitaTooltip = values => {
    const erro = validarFormulario(
      values,
      location,
      categoriasDeMedicao,
      dadosValoresInclusoesAutorizadasState,
      weekColumns,
      feriadosNoMes
    );
    if (erro) {
      setDisableBotaoSalvarLancamentos(true);
      setExibirTooltip(true);
    }
  };

  const onChangeInput = (value, previous, errors, values, dia, categoria) => {
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
    desabilitaTooltip(values);

    if (deveExistirObservacao(categoria.id, values, calendarioMesConsiderado)) {
      return;
    }
  };

  const fieldValidationsTabelaAlimentacaoCEI = (
    rowName,
    dia,
    idCategoria,
    nomeCategoria,
    uuidFaixaEtaria
  ) => (value, allValues) => {
    if (nomeCategoria === "ALIMENTAÇÃO") {
      return validacoesTabelaAlimentacaoCEI(
        rowName,
        dia,
        idCategoria,
        value,
        allValues,
        dadosValoresInclusoesAutorizadasState,
        validacaoDiaLetivo,
        location,
        feriadosNoMes,
        uuidFaixaEtaria
      );
    }
  };

  const classNameFieldTabelaAlimentacao = (row, column, categoria) => {
    if (
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

  const onClickBotaoVoltar = () => {
    disableBotaoSalvarLancamentos
      ? history.goBack()
      : setShowModalVoltarPeriodoLancamento(true);
  };

  const getClassNameToNextInput = (row, column, categoria, index) => {
    if (
      row.name !== "observacoes" &&
      column &&
      index + 1 < tabelaAlimentacaoCEIRows.length - 1
    ) {
      return `${tabelaAlimentacaoCEIRows[index + 1].name}__faixa_${
        row.uuid
      }__dia_${column.dia}__categoria_${categoria.id}`;
    }
    return undefined;
  };

  const getClassNameToPrevInput = (row, column, categoria, index) => {
    if (
      row.name !== "frequencia" &&
      column &&
      tabelaAlimentacaoCEIRows[index - 1]
    ) {
      return `${tabelaAlimentacaoCEIRows[index - 1].name}__faixa_${
        row.uuid
      }__dia_${column.dia}__categoria_${categoria.id}`;
    }
    return undefined;
  };

  return (
    <>
      <div className="text-right botao-voltar-lancamento-medicao">
        <Botao
          type={BUTTON_TYPE.BUTTON}
          texto={"Voltar"}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={() => onClickBotaoVoltar()}
        />
      </div>
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
                      <div className="col-4">
                        <b className="pb-2">Período de Lançamento</b>
                        <Field
                          component={InputText}
                          name="periodo_escolar"
                          disabled={true}
                        />
                      </div>
                      <div className="col-5">
                        <div className="legenda-tooltips">
                          <div>
                            <b className="pb-2">Legenda das Informações:</b>
                          </div>
                          <div>
                            <i className="fas fa-info icone-legenda-error" />
                            <p>
                              Há erros no lançamento. Corrija para conseguir
                              salvar.
                            </p>
                          </div>
                          <div>
                            <i className="fas fa-info icone-legenda-warning" />
                            <p>
                              Há divergências no lançamento. Adicione uma
                              observação.
                            </p>
                          </div>
                          <div>
                            <i className="fas fa-info icone-legenda-success" />
                            <p>
                              Atenção! Verifique se está correto e prossiga os
                              apontamentos.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {location.state && location.state.justificativa_periodo && (
                      <div className="row pt-4 pb-2 mt-legenda">
                        <div className="col">
                          <b className="pb-2 mb-2">
                            Correções solicitadas pela{" "}
                            {location.state.status_periodo ===
                            "MEDICAO_CORRECAO_SOLICITADA_CODAE"
                              ? "CODAE"
                              : "DRE"}
                            :
                          </b>
                          <Field
                            component={CKEditorField}
                            name="justificativa_periodo"
                            disabled={true}
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className={`row pb-2 pt-4 ${!(
                        location.state && location.state.justificativa_periodo
                      ) && "mt-legenda"}`}
                    >
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
                          calendarioMesConsiderado &&
                            feriadosNoMes &&
                            onChangeSemana(formValuesAtualizados, key);
                        }}
                        type="card"
                        className={`${
                          semanaSelecionada === 1
                            ? "default-color-first-semana"
                            : ""
                        }`}
                        items={tabItems}
                      />
                    </div>
                    {categoriasDeMedicao.length > 0 &&
                      !loading &&
                      categoriasDeMedicao.map(categoria => (
                        <div key={categoria.uuid}>
                          <b className="pb-2 section-title">{categoria.nome}</b>
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
                                feriadosNoMes &&
                                tabelaDietaRows &&
                                tabelaAlimentacaoCEIRows.map((row, index) => {
                                  return (
                                    <Fragment key={index}>
                                      <div
                                        className={`grid-table-tipos-alimentacao body-table-alimentacao`}
                                      >
                                        <div className="linha-cei">
                                          <b
                                            className={`nome-linha-cei pl-2 ${row.name ===
                                              "observacoes" && "mt-2"}`}
                                          >
                                            {row.nome}
                                          </b>
                                          {row.name !== "observacoes" && (
                                            <b className="faixa-etaria pl-2">
                                              {row.faixa_etaria}
                                            </b>
                                          )}
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
                                              !validacaoSemana(column.dia) && (
                                                <Botao
                                                  texto={textoBotaoObservacao(
                                                    formValuesAtualizados[
                                                      `${row.name}__dia_${
                                                        column.dia
                                                      }__categoria_${
                                                        categoria.id
                                                      }`
                                                    ],
                                                    valoresObservacoes,
                                                    column.dia,
                                                    categoria.id
                                                  )}
                                                  disabled={desabilitarBotaoColunaObservacoes(
                                                    location,
                                                    valoresPeriodosLancamentos,
                                                    column,
                                                    categoria,
                                                    formValuesAtualizados,
                                                    row,
                                                    valoresObservacoes,
                                                    column.dia
                                                  )}
                                                  type={BUTTON_TYPE.BUTTON}
                                                  style={
                                                    botaoAdicionarObrigatorioTabelaAlimentacao()
                                                      ? textoBotaoObservacao(
                                                          formValuesAtualizados[
                                                            `${row.name}__dia_${
                                                              column.dia
                                                            }__categoria_${
                                                              categoria.id
                                                            }`
                                                          ],
                                                          valoresObservacoes,
                                                          column.dia,
                                                          categoria.id
                                                        ) === "Visualizar"
                                                        ? BUTTON_STYLE.RED
                                                        : BUTTON_STYLE.RED_OUTLINE
                                                      : textoBotaoObservacao(
                                                          formValuesAtualizados[
                                                            `${row.name}__dia_${
                                                              column.dia
                                                            }__categoria_${
                                                              categoria.id
                                                            }`
                                                          ],
                                                          valoresObservacoes,
                                                          column.dia,
                                                          categoria.id
                                                        ) === "Visualizar"
                                                      ? BUTTON_STYLE.GREEN
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
                                                  component={InputValueMedicao}
                                                  classNameToNextInput={getClassNameToNextInput(
                                                    row,
                                                    column,
                                                    categoria,
                                                    index
                                                  )}
                                                  classNameToPrevInput={getClassNameToPrevInput(
                                                    row,
                                                    column,
                                                    categoria,
                                                    index
                                                  )}
                                                  apenasNumeros
                                                  name={`${row.name}__faixa_${
                                                    row.uuid
                                                  }__dia_${
                                                    column.dia
                                                  }__categoria_${categoria.id}`}
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
                                                    location,
                                                    grupoLocation,
                                                    valoresPeriodosLancamentos,
                                                    feriadosNoMes,
                                                    row.uuid
                                                  )}
                                                  defaultValue={defaultValue(
                                                    column,
                                                    row
                                                  )}
                                                  validate={fieldValidationsTabelaAlimentacaoCEI(
                                                    row.name,
                                                    column.dia,
                                                    categoria.id,
                                                    categoria.nome,
                                                    row.uuid
                                                  )}
                                                />
                                                <OnChange
                                                  name={`${row.name}__faixa_${
                                                    row.uuid
                                                  }__dia_${
                                                    column.dia
                                                  }__categoria_${categoria.id}`}
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
                                })}
                            </article>
                          </section>
                        </div>
                      ))}
                    {ultimaAtualizacaoMedicao && (
                      <p className="ultimo-salvamento mb-0">
                        Lançamento do período {periodoGrupo} salvo em{" "}
                        {ultimaAtualizacaoMedicao}
                      </p>
                    )}
                    {[
                      "MEDICAO_CORRECAO_SOLICITADA",
                      "MEDICAO_CORRECAO_SOLICITADA_CODAE",
                      "MEDICAO_CORRIGIDA_PELA_UE",
                      "MEDICAO_CORRIGIDA_PARA_CODAE"
                    ].includes(location.state.status_periodo) &&
                    [
                      "MEDICAO_CORRECAO_SOLICITADA",
                      "MEDICAO_CORRECAO_SOLICITADA_CODAE"
                    ].includes(location.state.status_solicitacao) ? (
                      <Botao
                        className="float-right"
                        texto="Salvar Correções"
                        type={BUTTON_TYPE.BUTTON}
                        style={`${BUTTON_STYLE.GREEN}`}
                        onClick={() => setShowModalSalvarCorrecoes(true)}
                        disabled={!calendarioMesConsiderado}
                      />
                    ) : (
                      <Botao
                        className="float-right"
                        texto="Salvar Lançamentos"
                        type={BUTTON_TYPE.BUTTON}
                        style={`${BUTTON_STYLE.GREEN}`}
                        onClick={() =>
                          onSubmit(
                            formValuesAtualizados,
                            dadosValoresInclusoesAutorizadasState,
                            false,
                            true,
                            false
                          )
                        }
                        disabled={
                          (location.state &&
                            location.state.status_periodo ===
                              "MEDICAO_APROVADA_PELA_DRE") ||
                          disableBotaoSalvarLancamentos ||
                          !calendarioMesConsiderado
                        }
                        exibirTooltip={exibirTooltip}
                        tooltipTitulo="Existem campos a serem corrigidos. Realize as correções para salvar."
                        classTooltip="icone-info-invalid"
                      />
                    )}
                  </div>
                  {mesAnoConsiderado && (
                    <ModalObservacaoDiaria
                      closeModal={() => setShowModalObservacaoDiaria(false)}
                      categoria={showCategoriaObservacaoDiaria}
                      showModal={showModalObservacaoDiaria}
                      dia={showDiaObservacaoDiaria}
                      mesAnoConsiderado={mesAnoConsiderado}
                      calendarioMesConsiderado={calendarioMesConsiderado}
                      form={form}
                      location={location}
                      values={formValuesAtualizados}
                      rowName={"observacoes"}
                      valoresPeriodosLancamentos={valoresPeriodosLancamentos}
                      onSubmit={() =>
                        onSubmitObservacao(
                          formValuesAtualizados,
                          showDiaObservacaoDiaria,
                          showCategoriaObservacaoDiaria,
                          errors
                        )
                      }
                      dadosIniciais={dadosIniciais}
                      setExibirTooltip={value => setExibirTooltip(value)}
                      errors={errors}
                      valoresObservacoes={valoresObservacoes}
                      setFormValuesAtualizados={setFormValuesAtualizados}
                      setValoresObservacoes={setValoresObservacoes}
                    />
                  )}
                  <ModalErro
                    showModalErro={showModalErro}
                    setShowModalErro={setShowModalErro}
                  />
                  <ModalSalvarCorrecoes
                    closeModal={() => setShowModalSalvarCorrecoes(false)}
                    showModal={showModalSalvarCorrecoes}
                    periodoGrupo={periodoGrupo}
                    onSubmit={() =>
                      onSubmit(
                        formValuesAtualizados,
                        dadosValoresInclusoesAutorizadasState,
                        false,
                        true,
                        true
                      )
                    }
                  />
                </div>
              </form>
            )}
          />
        )}
      </Spin>
      <ModalVoltarPeriodoLancamento
        closeModal={() => setShowModalVoltarPeriodoLancamento(false)}
        showModal={showModalVoltarPeriodoLancamento}
        history={history}
      />
    </>
  );
};
