import React, { Fragment, useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
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
import { Tabs } from "antd";

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
import ModalSalvarLancamento from "./components/ModalSalvarLancamento";
import { composeValidators, deepCopy } from "helpers/utilities";
import {
  deveExistirObservacao,
  formatarPayloadPeriodoLancamento
} from "./helper";
import {
  maxValueFrequencia,
  maxValueLancheRefeicaoSobremesa1Oferta
} from "helpers/fieldValidators";
import {
  getCategoriasDeMedicao,
  getDiasCalendario,
  getMatriculadosPeriodo,
  getValoresPeriodosLancamentos,
  setPeriodoLancamento,
  updateValoresPeriodosLancamentos
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import * as perfilService from "services/perfil.service";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";
import { getSolicitacoesAutorizadasEscola } from "services/painelEscola.service";
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
  const [tableAlimentacaoRows, setTableAlimentacaoRows] = useState([]);
  const [categoriasDeMedicao, setCategoriasDeMedicao] = useState([]);
  const [solicitacoesAutorizadas, setSolicitacoesAutorizadas] = useState([]);
  const [valoresPeriodosLancamentos, setValoresPeriodosLancamentos] = useState(
    []
  );
  const [valoresMatriculados, setValoresMatriculados] = useState([]);
  const [calendarioMesConsiderado, setCalendarioMesConsiderado] = useState(
    null
  );
  const [showModalObservacaoDiaria, setShowModalObservacaoDiaria] = useState(
    false
  );
  const [showModalSalvarLancamento, setShowModalSalvarLancamento] = useState(
    false
  );
  const [
    disableBotaoSalvarLancamentos,
    setDisableBotaoSalvarLancamentos
  ] = useState(true);
  const [showDiaObservacaoDiaria, setDiaObservacaoDiaria] = useState(null);
  const [
    showCategoriaObservacaoDiaria,
    setCategoriaObservacaoDiaria
  ] = useState(null);

  const location = useLocation();
  let mesAnoDefault = new Date();

  const { TabPane } = Tabs;

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
      setTableAlimentacaoRows(tiposAlimentacaoFormatadas);

      const response_categorias_medicao = await getCategoriasDeMedicao();
      setCategoriasDeMedicao(response_categorias_medicao.data);

      const params = {
        nome_periodo_escolar: periodo.periodo_escolar.nome,
        uuid_solicitacao_medicao: uuid
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
      setSolicitacoesAutorizadas(solicitacoesAutorizadasEscola.results);

      formatarDadosValoresMedicao(
        mesAnoFormatado,
        response_valores_periodos.data,
        response_categorias_medicao.data,
        tiposAlimentacaoFormatadas,
        response_matriculados.data
      );
    };
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatarDadosValoresMedicao = (
    mesAnoFormatado,
    valoresMedicao,
    categoriasMedicao,
    tiposAlimentacaoFormatadas,
    matriculados
  ) => {
    let dadosValoresMedicoes = {};
    let dadosValoresMatriculados = {};
    let dadosValoresForaDoMes = {};
    const dadosMesPeriodo = {
      mes_lancamento: mesAnoFormatado,
      periodo_escolar: location.state ? location.state.periodo : "MANHA"
    };

    categoriasMedicao &&
      categoriasMedicao.forEach(categoria => {
        matriculados &&
          matriculados.forEach(obj => {
            dadosValoresMatriculados[
              `matriculados__dia_${obj.dia}__categoria_${categoria.id}`
            ] = obj.quantidade_alunos ? `${obj.quantidade_alunos}` : null;
          });

        tiposAlimentacaoFormatadas &&
          tiposAlimentacaoFormatadas.forEach(tipo => {
            for (let i = 1; i <= 31; i++) {
              const dia = String(i).length === 1 ? "0" + String(i) : String(i);
              let result = null;
              if (Number(semanaSelecionada) === 1 && Number(dia) > 20) {
                result = "Mês anterior";
                dadosValoresForaDoMes[
                  `${tipo.name}__dia_${dia}__categoria_${categoria.id}`
                ] = result;
              }
              if (
                [4, 5, 6].includes(Number(semanaSelecionada)) &&
                Number(dia) < 10
              ) {
                result = "Mês posterior";
                dadosValoresForaDoMes[
                  `${tipo.name}__dia_${dia}__categoria_${categoria.id}`
                ] = result;
              }
            }
          });

        valoresMedicao &&
          valoresMedicao.forEach(valor_medicao => {
            dadosValoresMedicoes[
              `${valor_medicao.nome_campo}__dia_${
                valor_medicao.dia
              }__categoria_${valor_medicao.categoria_medicao}`
            ] = valor_medicao.valor ? `${valor_medicao.valor}` : null;
          });
      });

    setDadosIniciais({
      ...dadosMesPeriodo,
      ...dadosValoresMedicoes,
      ...dadosValoresMatriculados,
      ...dadosValoresForaDoMes
    });
  };

  useEffect(() => {
    let diasSemana = [];
    let diaDaSemanaNumerico = getDay(startOfMonth(mesAnoConsiderado)); // 0 representa Domingo

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

      setWeekColumns(
        weekColumns.map(column => {
          return { ...column, dia: diasSemana[column["position"]] };
        })
      );
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

      setWeekColumns(
        weekColumns.map(column => {
          return { ...column, dia: diasSemana[column["position"]] };
        })
      );
    }

    const formatar = async () => {
      formatarDadosValoresMedicao(
        mesAnoFormatadoState,
        valoresPeriodosLancamentos,
        categoriasDeMedicao,
        tableAlimentacaoRows,
        valoresMatriculados
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
    tableAlimentacaoRows,
    valoresPeriodosLancamentos
  ]);

  const onSubmit = async (values, ehObservacao) => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    let valuesClone = deepCopy(values);
    let dadosIniciaisClone = deepCopy(values);
    valuesClone.solicitacao_medicao_inicial = uuid;
    Object.entries(valuesClone).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          key.includes("matriculados")) &&
        delete valuesClone[key]
      );
    });
    Object.entries(dadosIniciaisClone).forEach(([key, value]) => {
      return (
        (["Mês anterior", "Mês posterior", null].includes(value) ||
          key.includes("matriculados")) &&
        delete dadosIniciaisClone[key]
      );
    });

    const dadosIniciaisFiltered = Object.entries(dadosIniciais)
      .filter(([key]) => !key.includes("matriculados"))
      .filter(
        ([, value]) => !["Mês anterior", "Mês posterior", null].includes(value)
      )
      .filter(([key]) => key.includes("categoria"));

    const payload = formatarPayloadPeriodoLancamento(
      valuesClone,
      tableAlimentacaoRows,
      dadosIniciaisFiltered,
      valoresPeriodosLancamentos
    );
    if (payload.valores_medicao.length === 0)
      return toastWarn("Não há valores para serem salvos");
    let valores_medicao_response = [];
    if (valoresPeriodosLancamentos.length) {
      const response = await updateValoresPeriodosLancamentos(
        valoresPeriodosLancamentos[0].medicao_uuid,
        payload
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess(
          ehObservacao
            ? "Observação salva com sucesso"
            : "Lançamentos salvos com sucesso"
        );
        valores_medicao_response = response.data.valores_medicao;
      } else {
        const errorMessage = Object.values(response.data).join("; ");
        toastError(`Erro: ${errorMessage}`);
      }
    } else {
      const response = await setPeriodoLancamento(payload);
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess(
          ehObservacao
            ? "Observação salva com sucesso"
            : "Lançamentos salvos com sucesso"
        );
        valores_medicao_response = response.data.valores_medicao;
      } else {
        const errorMessage = Object.values(response.data).join("; ");
        toastError(`Erro: ${errorMessage}`);
      }
    }
    setValoresPeriodosLancamentos(valores_medicao_response);
    formatarDadosValoresMedicao(
      mesAnoFormatadoState,
      valores_medicao_response,
      categoriasDeMedicao,
      tableAlimentacaoRows,
      valoresMatriculados
    );
  };

  const onChangeSemana = (values, key) => {
    Object.entries(values).forEach(([key]) => {
      return (
        !["mes_lancamento", "periodo_escolar", "week"].includes(key) &&
        delete values[key]
      );
    });
    setSemanaSelecionada(key);
    return (values["week"] = Number(key));
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

    return (
      !validacaoDiaLetivo(dia) ||
      validacaoSemana(dia) ||
      rowName === "matriculados" ||
      !values[`matriculados__dia_${dia}__categoria_${categoria}`] ||
      (mesConsiderado === mesAtual &&
        Number(dia) >= format(mesAnoDefault, "dd"))
    );
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

  const onChangeInput = (value, errors, values, dia, categoria) => {
    if (typeof value === "string") {
      value.match(/\d+/g) !== null && valuesInputArray.push(value);
      if (value === null) {
        valuesInputArray.length = 0;
      }
      value.match(/\d+/g) !== null && valuesInputArray.length > 0
        ? setDisableBotaoSalvarLancamentos(false)
        : setDisableBotaoSalvarLancamentos(true);
    }

    if (Object.keys(errors).length > 0) {
      return setDisableBotaoSalvarLancamentos(true);
    }
    if (deveExistirObservacao(categoria, values, calendarioMesConsiderado)) {
      return;
    }
  };

  const fieldValidations = (rowName, dia, categoria, values) => {
    return composeValidators(
      maxValueFrequencia(
        Number(values[`matriculados__dia_${dia}__categoria_${categoria}`]),
        `${rowName}__dia_${dia}__categoria_${categoria}`
      ),
      maxValueLancheRefeicaoSobremesa1Oferta(
        Number(values[`frequencia__dia_${dia}__categoria_${categoria}`]),
        `${rowName}__dia_${dia}__categoria_${categoria}`,
        solicitacoesAutorizadas,
        mesAnoConsiderado,
        dia
      )
    );
  };

  // const textoTooltipBotaoObservacao = (dia) => {
  //   const data = `${dia}/${format(mesAnoConsiderado, "MM")}/${getYear(mesAnoConsiderado)}`
  //   const existeSolicGAAutorizada = solicitacoesAutorizadas.filter(
  //     solicitacao => solicitacao.data_evento === data).length > 0
  //   return existeSolicGAAutorizada ?
  //     "Obrigatório confirmar a quantidade de lançamentos neste dia nas observação." :
  //     "Obrigatório adicionar observação para lançamentos neste dia."
  // }

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      initialValues={dadosIniciais}
      render={({ handleSubmit, values, form, errors }) => (
        <form onSubmit={handleSubmit}>
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
                <Tabs onChange={key => onChangeSemana(values, key)} type="card">
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
                          tableAlimentacaoRows &&
                          tableAlimentacaoRows.map((row, index) => {
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
                                        !validacaoSemana(column.dia) && (
                                          <Botao
                                            texto={textoBotaoObservacao(
                                              values[
                                                `${row.name}__dia_${
                                                  column.dia
                                                }__categoria_${categoria.id}`
                                              ]
                                            )}
                                            type={BUTTON_TYPE.BUTTON}
                                            style={`${
                                              BUTTON_STYLE.GREEN_OUTLINE_WHITE
                                            }`}
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
                                              !validacaoDiaLetivo(column.dia)
                                                ? "nao-eh-dia-letivo"
                                                : ""
                                            }`}
                                            component={InputValueMedicao}
                                            apenasNumeros
                                            name={`${row.name}__dia_${
                                              column.dia
                                            }__categoria_${categoria.id}`}
                                            disabled={desabilitarField(
                                              column.dia,
                                              row.name,
                                              categoria.id,
                                              values
                                            )}
                                            defaultValue={defaultValue(
                                              column,
                                              row
                                            )}
                                            validate={
                                              solicitacoesAutorizadas &&
                                              mesAnoConsiderado &&
                                              fieldValidations(
                                                row.name,
                                                column.dia,
                                                categoria.id,
                                                values
                                              )
                                            }
                                          />
                                          <OnChange
                                            name={`${row.name}__dia_${
                                              column.dia
                                            }__categoria_${categoria.id}`}
                                          >
                                            {value => {
                                              onChangeInput(
                                                value,
                                                errors,
                                                values,
                                                column.dia,
                                                categoria.id
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
              {mesAnoConsiderado && (
                <ModalObservacaoDiaria
                  closeModal={() => setShowModalObservacaoDiaria(false)}
                  categoria={showCategoriaObservacaoDiaria}
                  showModal={showModalObservacaoDiaria}
                  dia={showDiaObservacaoDiaria}
                  mesAnoConsiderado={mesAnoConsiderado}
                  calendarioMesConsiderado={calendarioMesConsiderado}
                  form={form}
                  values={values}
                  rowName={"observacoes"}
                  valoresPeriodosLancamentos={valoresPeriodosLancamentos}
                  onSubmit={() => onSubmit(values, true)}
                />
              )}
              <Botao
                className="float-right"
                texto="Salvar Lançamentos"
                type={BUTTON_TYPE.BUTTON}
                style={`${BUTTON_STYLE.GREEN}`}
                onClick={() => setShowModalSalvarLancamento(true)}
                disabled={disableBotaoSalvarLancamentos}
              />
              <ModalSalvarLancamento
                closeModal={() => setShowModalSalvarLancamento(false)}
                showModal={showModalSalvarLancamento}
                onSubmit={() => onSubmit(values)}
              />
            </div>
          </div>
        </form>
      )}
    />
  );
};
