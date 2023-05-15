import React, { useEffect, useState, Fragment } from "react";
import { OnChange } from "react-final-form-listeners";
import { Field } from "react-final-form";
import { Modal } from "react-bootstrap";
import { Spin, Tabs } from "antd";
import {
  addDays,
  format,
  getDay,
  getWeeksInMonth,
  isSunday,
  lastDayOfMonth,
  startOfMonth,
  subDays
} from "date-fns";
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Shareable/Botao";
import InputValueMedicao from "components/Shareable/Input/InputValueMedicao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import {
  defaultValue,
  formatarLinhasTabelaAlimentacao,
  formatarLinhasTabelaDietaEnteral,
  formatarLinhasTabelasDietas,
  formatarLinhasTabelaSolicitacoesAlimentacao,
  formatarLinhasTabelaEtecAlimentacao,
  validacaoSemana
} from "components/screens/LancamentoInicial/PeriodoLancamentoMedicaoInicial/helper";
import InputText from "components/Shareable/Input/InputText";
import CKEditorField from "components/Shareable/CKEditorField";
import {
  toastError,
  toastSuccess,
  toastWarn
} from "components/Shareable/Toast/dialogs";
import {
  diasSemana,
  initialStateWeekColumns,
  PERIODO_STATUS_DE_PROGRESSO
} from "../../constants";
import { deepCopy } from "helpers/utilities";
import { ModalAprovarPeriodo } from "../ModalAprovarPeriodo";
import { ModalCancelarCorrecao } from "../ModalCancelarCorrecao";
import { ModalSalvarCorrecao } from "../ModalSalvarCorrecao";
import { formatarNomePeriodo } from "../../helper";
import {
  getCategoriasDeMedicao,
  getValoresPeriodosLancamentos
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import { drePedeCorrecaMedicao } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";

export const TabelaLancamentosPeriodo = ({ ...props }) => {
  const {
    key,
    periodoGrupo,
    periodosSimples,
    mesSolicitacao,
    anoSolicitacao,
    form,
    aprovarPeriodo,
    values,
    getPeriodosGruposMedicaoAsync,
    setOcorrenciaExpandida
  } = props;

  const [weekColumns, setWeekColumns] = useState(initialStateWeekColumns);
  const [
    showTabelaLancamentosPeriodo,
    setShowTabelaLancamentosPeriodo
  ] = useState(false);
  const [semanaSelecionada, setSemanaSelecionada] = useState(1);
  const [data, setData] = useState(null);
  const [tabItems, setTabItems] = useState(null);
  const [categoriasDeMedicao, setCategoriasDeMedicao] = useState(null);
  const [periodoEscolar, setPeriodoEscolar] = useState(null);
  const [tabelaAlimentacaoRows, setTabelaAlimentacaoRows] = useState(null);
  const [tabelaDietaRows, setTabelaDietaRows] = useState(null);
  const [tabelaDietaEnteralRows, setTabelaDietaEnteralRows] = useState(null);
  const [
    tabelaSolicitacoesAlimentacaoRows,
    setTabelaSolicitacoesAlimentacaoRows
  ] = useState(null);
  const [tabelaEtecAlimentacaoRows, setTabelaEtecAlimentacaoRows] = useState(
    null
  );
  const [valoresLancamentos, setValoresLancamentos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modoCorrecao, setModoCorrecao] = useState(false);
  const [valoresParaCorrecao, setValoresParaCorrecao] = useState({});
  const [showModalObservacaoDiaria, setShowModalObservacaoDiaria] = useState(
    false
  );
  const [showModalAprovarPeriodo, setShowModalAprovarPeriodo] = useState(false);
  const [
    showModalCancelarSolicitacao,
    setShowModalCancelarSolicitacao
  ] = useState(false);
  const [showModalSalvarSolicitacao, setShowModalSalvarSolicitacao] = useState(
    false
  );

  const statusPermitidosParaAprovacao = [
    "MEDICAO_ENVIADA_PELA_UE",
    "MEDICAO_CORRIGIDA_PELA_UE"
  ];
  const logPeriodoAprovado = periodoGrupo.logs.find(
    log => log.status_evento_explicacao === "Aprovado pela DRE"
  );

  useEffect(() => {
    if (showTabelaLancamentosPeriodo) {
      const getCategoriasDeMedicaoAsync = async () => {
        if (!categoriasDeMedicao) {
          let response_categorias_medicao = await getCategoriasDeMedicao();
          if (periodoGrupo.nome_periodo_grupo.includes("Solicitações")) {
            setCategoriasDeMedicao(
              response_categorias_medicao.data.filter(cat =>
                cat.nome.includes("SOLICITAÇÕES")
              )
            );
          } else if (periodoGrupo.nome_periodo_grupo === "ETEC") {
            setCategoriasDeMedicao(
              response_categorias_medicao.data.filter(
                cat => cat.nome === "ALIMENTAÇÃO"
              )
            );
          } else {
            setCategoriasDeMedicao(
              response_categorias_medicao.data.filter(
                cat => !cat.nome.includes("SOLICITAÇÕES")
              )
            );
          }
        }
      };
      getCategoriasDeMedicaoAsync();

      let items = [];
      Array.apply(null, {
        length: isSunday(lastDayOfMonth(data))
          ? getWeeksInMonth(data) - 1
          : getDay(startOfMonth(data)) === 0
          ? getWeeksInMonth(data) + 1
          : getWeeksInMonth(data)
      }).map((e, i) =>
        items.push({
          key: `${i + 1}`,
          label: `Semana ${i + 1}`
        })
      );
      setTabItems(items);

      if (periodoGrupo.nome_periodo_grupo === "ETEC") {
        const linhasTabelaEtecAlimentacao = formatarLinhasTabelaEtecAlimentacao();
        setTabelaEtecAlimentacaoRows(linhasTabelaEtecAlimentacao);
      } else if (!periodoGrupo.nome_periodo_grupo.includes("Solicitações")) {
        const periodo = periodosSimples.find(
          periodo => periodo.periodo_escolar.nome === periodoEscolar
        );
        const tipos_alimentacao = periodo.tipos_alimentacao;
        const tiposAlimentacaoFormatadas = formatarLinhasTabelaAlimentacao(
          tipos_alimentacao,
          periodoGrupo
        );
        setTabelaAlimentacaoRows(tiposAlimentacaoFormatadas);
        const linhasTabelasDietas = formatarLinhasTabelasDietas(
          tipos_alimentacao
        );
        setTabelaDietaRows(linhasTabelasDietas);
        const cloneLinhasTabelasDietas = deepCopy(linhasTabelasDietas);
        const linhasTabelaDietaEnteral = formatarLinhasTabelaDietaEnteral(
          tipos_alimentacao,
          cloneLinhasTabelasDietas
        );
        setTabelaDietaEnteralRows(linhasTabelaDietaEnteral);
      } else {
        const linhasTabelaSolicitacoesAlimentacao = formatarLinhasTabelaSolicitacoesAlimentacao();
        setTabelaSolicitacoesAlimentacaoRows(
          linhasTabelaSolicitacoesAlimentacao
        );
      }
    }

    setData(new Date(`${mesSolicitacao}/01/${anoSolicitacao}`));
  }, [showTabelaLancamentosPeriodo]);

  useEffect(() => {
    let diasSemana = [];
    let diaDaSemanaNumerico = getDay(startOfMonth(data)); // 0 representa Domingo
    let week = [];

    if (diaDaSemanaNumerico === 0) {
      diaDaSemanaNumerico = 7;
    }
    if (data && Number(semanaSelecionada) === 1) {
      diasSemana.unshift(format(startOfMonth(data), "dd"));
      for (let i = 1; i < diaDaSemanaNumerico; i++) {
        diasSemana.unshift(format(subDays(startOfMonth(data), i), "dd"));
      }
      for (let i = diaDaSemanaNumerico; i < 7; i++) {
        diasSemana.push(
          format(addDays(startOfMonth(data), i + 1 - diaDaSemanaNumerico), "dd")
        );
      }
      week = weekColumns.map(column => {
        return { ...column, dia: diasSemana[column["position"]] };
      });
      setWeekColumns(week);
    }
    if (data && Number(semanaSelecionada) !== 1) {
      let dia = addDays(
        startOfMonth(data),
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
      week = weekColumns.map(column => {
        return { ...column, dia: diasSemana[column["position"]] };
      });
      setWeekColumns(week);
    }
  }, [data, semanaSelecionada]);

  const onClickVisualizarFechar = async periodoGrupo => {
    setLoading(true);
    setShowTabelaLancamentosPeriodo(!showTabelaLancamentosPeriodo);
    setPeriodoEscolar(periodoGrupo.periodo_escolar);
    if (!showTabelaLancamentosPeriodo) {
      setOcorrenciaExpandida();
      const params = {
        uuid_medicao_periodo_grupo: periodoGrupo.uuid_medicao_periodo_grupo
      };
      const response_valores_periodos = await getValoresPeriodosLancamentos(
        params
      );
      setValoresLancamentos(response_valores_periodos.data);
    }
    setLoading(false);
  };

  const escolherTabela = categoria => {
    if (
      categoria.nome.includes("DIETA") &&
      categoria.nome.includes("ENTERAL")
    ) {
      return tabelaDietaEnteralRows;
    } else if (categoria.nome.includes("DIETA")) {
      return tabelaDietaRows;
    } else if (categoria.nome.includes("SOLICITAÇÕES")) {
      return tabelaSolicitacoesAlimentacaoRows;
    } else if (
      periodoGrupo.nome_periodo_grupo === "ETEC" &&
      categoria.nome === "ALIMENTAÇÃO"
    ) {
      return tabelaEtecAlimentacaoRows;
    } else {
      return tabelaAlimentacaoRows;
    }
  };

  const onClickBotaoObservacao = (dia, categoriaId) => {
    const observacao = valoresLancamentos.find(
      valor =>
        valor.nome_campo === "observacoes" &&
        Number(valor.dia) === Number(dia) &&
        Number(valor.categoria_medicao) === Number(categoriaId)
    );
    let valorObservacao = null;
    if (observacao) {
      valorObservacao = observacao.valor;
    }
    setShowModalObservacaoDiaria(true);
    form.change(
      "data_lancamento",
      `${dia}/${mesSolicitacao}/${anoSolicitacao}`
    );
    form.change("observacao_modal", valorObservacao);
  };

  const onChangeSemana = key => {
    setSemanaSelecionada(key);
  };

  const ehInputParaCorrecao = inputNameMedicao => {
    return (
      Object.keys(values).filter(
        key =>
          key.includes(`ckbox_dias_semana__${inputNameMedicao}`) &&
          values[`ckbox_dias_semana__${inputNameMedicao}`]
      ).length > 0
    );
  };

  const resetValuesCorrecao = uuidMedicaoPeriodoGrupo => {
    setShowTabelaLancamentosPeriodo(false);
    setModoCorrecao(false);
    form.change(
      `descricao_correcao__periodo_grupo_${uuidMedicaoPeriodoGrupo.slice(
        0,
        5
      )}`,
      ""
    );
    Object.keys(values).forEach(key => {
      if (
        key.includes("ckbox_dias_semana") &&
        key.includes(
          `uuid_medicao_periodo_grupo_${uuidMedicaoPeriodoGrupo.slice(0, 5)}`
        )
      ) {
        form.change(key, false);
      }
    });
  };

  const salvarCorrecao = async uuidMedicaoPeriodoGrupo => {
    let uuidsValoresMedicaoParaCorrecao = [];
    Object.keys(valoresParaCorrecao).forEach(key => {
      const keySplitted = key.split("__");
      const nome_campo = keySplitted[0];
      const dia = keySplitted[1].match(/\d/g).join("");
      const idCategoria = keySplitted[2].match(/\d/g).join("");
      const lancamento = valoresLancamentos.find(
        valor =>
          valor.nome_campo === nome_campo &&
          Number(valor.dia) === Number(dia) &&
          Number(valor.categoria_medicao) === Number(idCategoria)
      );

      const uuidValorMedicao = lancamento.uuid;
      uuidsValoresMedicaoParaCorrecao.push(uuidValorMedicao);
    });

    if (uuidsValoresMedicaoParaCorrecao.length === 0) {
      toastWarn("Não existem valores para correção");
      return;
    }

    const descricao_correcao =
      values[
        `descricao_correcao__periodo_grupo_${uuidMedicaoPeriodoGrupo.slice(
          0,
          5
        )}`
      ];
    const payload = {
      uuids_valores_medicao_para_correcao: uuidsValoresMedicaoParaCorrecao,
      justificativa: descricao_correcao
    };

    const response = await drePedeCorrecaMedicao(
      uuidMedicaoPeriodoGrupo,
      payload
    );
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Solicitação de correção salva com sucesso");
    } else {
      toastError("Houve um erro ao salvar solicitação de correção");
    }

    setValoresParaCorrecao({});
    getPeriodosGruposMedicaoAsync();
    setModoCorrecao(false);
    resetValuesCorrecao(uuidMedicaoPeriodoGrupo);
  };

  const cancelarCorrecao = uuidMedicaoPeriodoGrupo => {
    resetValuesCorrecao(uuidMedicaoPeriodoGrupo);
    toastWarn("Solicitação de correção cancelada");
  };

  const onChangeCheckBox = (column, categoria, periodoGrupo) => {
    const keys = Object.keys(values).filter(key =>
      key.includes(
        `dia_${column.dia}__categoria_${
          categoria.id
        }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
          0,
          5
        )}`
      )
    );
    const valuesParaCorrecao = Object.keys(values)
      .filter(
        key =>
          keys.includes(key) &&
          !key.includes("ckbox_dias_semana") &&
          values[key] &&
          values[
            `ckbox_dias_semana__dia_${column.dia}__categoria_${
              categoria.id
            }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
              0,
              5
            )}`
          ]
      )
      .reduce((object, key) => {
        return Object.assign(object, {
          [key]: values[key]
        });
      }, {});
    setValoresParaCorrecao(
      Object.assign(valoresParaCorrecao, valuesParaCorrecao)
    );
  };

  return (
    <div key={key}>
      <div className="content-section-acompanhamento-lancamento mb-3">
        <p className="mb-0">
          <b>{periodoGrupo.nome_periodo_grupo}</b>
        </p>
        <div className="content-section-acompanhamento-lancamento-right">
          <div
            className={`acompanhamento-status-lancamento mr-3 ${
              periodoGrupo.status === "MEDICAO_CORRECAO_SOLICITADA" ? "red" : ""
            }`}
          >
            {PERIODO_STATUS_DE_PROGRESSO[periodoGrupo.status] &&
              PERIODO_STATUS_DE_PROGRESSO[periodoGrupo.status].nome}
          </div>
          <p
            className="visualizar-lancamento mb-0"
            onClick={() => onClickVisualizarFechar(periodoGrupo)}
          >
            <b>{showTabelaLancamentosPeriodo ? "FECHAR" : "VISUALIZAR"}</b>
          </p>
        </div>
      </div>
      {showTabelaLancamentosPeriodo &&
      ((tabelaAlimentacaoRows && tabelaDietaRows && tabelaDietaEnteralRows) ||
        tabelaSolicitacoesAlimentacaoRows ||
        tabelaEtecAlimentacaoRows) &&
      valoresLancamentos ? (
        <>
          <p className="section-title-conf-lancamentos">Lançamentos da UE</p>
          <div className="weeks-tabs mb-2">
            <Tabs
              activeKey={semanaSelecionada}
              onChange={key => onChangeSemana(key)}
              type="card"
              className={`${
                semanaSelecionada === 1 ? "default-color-first-semana" : ""
              }`}
              items={tabItems}
            />
            {categoriasDeMedicao &&
              categoriasDeMedicao.length > 0 &&
              categoriasDeMedicao.map(categoria => (
                <div key={categoria.id}>
                  <b className="pb-2 section-title">{categoria.nome}</b>
                  <section className="tabela-tipos-alimentacao">
                    <article>
                      <div
                        className={"grid-table-tipos-alimentacao header-table"}
                      >
                        <div />
                        {weekColumns.map(column => {
                          return modoCorrecao &&
                            !validacaoSemana(column.dia, semanaSelecionada) ? (
                            <div
                              className="dias-semana-tabela"
                              key={column.dia}
                            >
                              <Field
                                className="input-dias-semana-tabela"
                                component={"input"}
                                type="checkbox"
                                name={`ckbox_dias_semana__dia_${
                                  column.dia
                                }__categoria_${
                                  categoria.id
                                }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                                  0,
                                  5
                                )}`}
                              />
                              <div
                                key={column.dia}
                                className="label-dias-semana-tabela"
                              >
                                {column.dia}
                              </div>
                              <OnChange
                                name={`ckbox_dias_semana__dia_${
                                  column.dia
                                }__categoria_${
                                  categoria.id
                                }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                                  0,
                                  5
                                )}`}
                              >
                                {() =>
                                  onChangeCheckBox(
                                    column,
                                    categoria,
                                    periodoGrupo
                                  )
                                }
                              </OnChange>
                            </div>
                          ) : (
                            <div key={column.dia}>{column.dia}</div>
                          );
                        })}
                      </div>
                      <div
                        className={"grid-table-tipos-alimentacao header-table"}
                      >
                        <div />
                        {diasSemana.map((dia, index) => (
                          <div key={index}>{dia}</div>
                        ))}
                      </div>
                      {escolherTabela(categoria).map((row, index) => {
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
                                    validacaoSemana(
                                      column.dia,
                                      semanaSelecionada
                                    )
                                      ? "input-desabilitado"
                                      : row.name === "observacoes"
                                      ? "input-habilitado-observacoes"
                                      : "input-habilitado"
                                  }`}
                                >
                                  {row.name === "observacoes" ? (
                                    !validacaoSemana(
                                      column.dia,
                                      semanaSelecionada
                                    ) && (
                                      <Botao
                                        texto={"Visualizar"}
                                        type={BUTTON_TYPE.BUTTON}
                                        style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                                        onClick={() =>
                                          onClickBotaoObservacao(
                                            column.dia,
                                            categoria.id
                                          )
                                        }
                                        disabled={
                                          !valoresLancamentos.find(
                                            valor =>
                                              valor.nome_campo ===
                                                "observacoes" &&
                                              Number(valor.dia) ===
                                                Number(column.dia) &&
                                              Number(
                                                valor.categoria_medicao
                                              ) === Number(categoria.id)
                                          )
                                        }
                                      />
                                    )
                                  ) : (
                                    <div
                                      className={`field-values-input${
                                        ehInputParaCorrecao(
                                          `dia_${column.dia}__categoria_${
                                            categoria.id
                                          }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                                            0,
                                            5
                                          )}`
                                        ) && modoCorrecao
                                          ? " input-para-correcao"
                                          : ""
                                      }`}
                                    >
                                      <Field
                                        className={`m-2`}
                                        component={InputValueMedicao}
                                        apenasNumeros
                                        name={`${row.name}__dia_${
                                          column.dia
                                        }__categoria_${
                                          categoria.id
                                        }__uuid_medicao_periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                                          0,
                                          5
                                        )}`}
                                        disabled={true}
                                        defaultValue={defaultValue(
                                          column,
                                          row,
                                          semanaSelecionada,
                                          valoresLancamentos,
                                          categoria
                                        )}
                                      />
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
            {logPeriodoAprovado && (
              <div className="row">
                <div className="col-12">
                  <p className="periodo-aprovado text-rigth">{`Período ${formatarNomePeriodo(
                    periodoGrupo.nome_periodo_grupo
                  )}  aprovado em ${logPeriodoAprovado.criado_em}`}</p>
                </div>
              </div>
            )}
            {modoCorrecao && (
              <>
                <div className="red">
                  Selecione
                  <b>
                    {" "}
                    nas tabelas acima os dias em que a unidade deve realizar as
                    correções{" "}
                  </b>
                  e informe no campo abaixo todas as correções a serem
                  realizadas.
                </div>
                <div className="mt-3">
                  <p className="mb-0">
                    Descrição da Correção <span className="red">*</span>
                  </p>
                  <Field
                    component={CKEditorField}
                    name={`descricao_correcao__periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                      0,
                      5
                    )}`}
                    placeholder="Informe quais os pontos necessários de correção da Medição Inicial"
                    required
                  />
                </div>
              </>
            )}
            {!logPeriodoAprovado && (
              <div className="periodo-final-tabela-lancamento mb-4">
                <div className={`col-${modoCorrecao ? 6 : 8} pl-0 pr-4`}>
                  <p className="section-title-conf-lancamentos periodo mb-0">
                    {periodoGrupo.nome_periodo_grupo}
                  </p>
                  <hr className="my-0" />
                </div>
                {modoCorrecao ? (
                  <div className="botoes col-6 px-0">
                    <Botao
                      texto="Cancelar"
                      style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                      className="col-3 mr-4"
                      onClick={() => setShowModalCancelarSolicitacao(true)}
                    />
                    <Botao
                      texto="Salvar Solicitação de Correção para UE"
                      style={BUTTON_STYLE.GREEN}
                      className="col-8"
                      disabled={
                        !values[
                          `descricao_correcao__periodo_grupo_${periodoGrupo.uuid_medicao_periodo_grupo.slice(
                            0,
                            5
                          )}`
                        ]
                      }
                      onClick={() => setShowModalSalvarSolicitacao(true)}
                    />
                  </div>
                ) : (
                  <div className="botoes col-4 px-0">
                    <Botao
                      texto="Solicitar Correção"
                      style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                      className="col-6 mr-3"
                      onClick={() => setModoCorrecao(true)}
                      disabled={[
                        "MEDICAO_APROVADA_PELA_DRE",
                        "MEDICAO_CORRECAO_SOLICITADA"
                      ].includes(periodoGrupo.status)}
                    />
                    <Botao
                      texto="Aprovar Período"
                      style={BUTTON_STYLE.GREEN}
                      className="col-5"
                      onClick={() => setShowModalAprovarPeriodo(true)}
                      disabled={
                        !statusPermitidosParaAprovacao.includes(
                          periodoGrupo.status
                        )
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <ModalAprovarPeriodo
            showModal={showModalAprovarPeriodo}
            setShowModal={value => setShowModalAprovarPeriodo(value)}
            periodoGrupo={periodoGrupo}
            aprovarPeriodo={nomePeridoFormatado => {
              setShowTabelaLancamentosPeriodo(!showTabelaLancamentosPeriodo);
              aprovarPeriodo(periodoGrupo, nomePeridoFormatado);
            }}
          />
          <ModalCancelarCorrecao
            showModal={showModalCancelarSolicitacao}
            setShowModal={value => setShowModalCancelarSolicitacao(value)}
            cancelarCorrecao={() =>
              cancelarCorrecao(periodoGrupo.uuid_medicao_periodo_grupo)
            }
          />
          <ModalSalvarCorrecao
            showModal={showModalSalvarSolicitacao}
            setShowModal={value => setShowModalSalvarSolicitacao(value)}
            periodoGrupo={periodoGrupo}
            salvarCorrecao={() =>
              salvarCorrecao(periodoGrupo.uuid_medicao_periodo_grupo)
            }
          />
          <Modal
            dialogClassName="modal-50w"
            show={showModalObservacaoDiaria}
            onHide={() => setShowModalObservacaoDiaria(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Observação Diária</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-4 mt-0">
                <label className="font-weight-bold">Data do Lançamento</label>
                <Field
                  className="data_lancamento_modal"
                  component={InputText}
                  name="data_lancamento"
                  disabled
                />
              </div>
              <div className="col-12 mt-3">
                <label className="font-weight-bold">Observação</label>
                <Field
                  component={CKEditorField}
                  name="observacao_modal"
                  disabled
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="col-12">
                <Botao
                  className="float-right"
                  texto="Voltar"
                  type={BUTTON_TYPE.BUTTON}
                  onClick={() => setShowModalObservacaoDiaria(false)}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                />
              </div>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        loading && (
          <div className="carregando-conteudo">
            <Spin tip="Carregando..." />
          </div>
        )
      )}
    </div>
  );
};
