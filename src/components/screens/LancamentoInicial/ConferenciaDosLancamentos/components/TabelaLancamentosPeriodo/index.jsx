import React, { useEffect, useState, Fragment } from "react";
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
  validacaoSemana
} from "components/screens/LancamentoInicial/PeriodoLancamentoMedicaoInicial/helper";
import InputText from "components/Shareable/Input/InputText";
import CKEditorField from "components/Shareable/CKEditorField";
import {
  getCategoriasDeMedicao,
  getValoresPeriodosLancamentos
} from "services/medicaoInicial/periodoLancamentoMedicao.service";
import {
  initialStateWeekColumns,
  MEDICAO_STATUS_DE_PROGRESSO
} from "../../constants";
import { deepCopy } from "helpers/utilities";

export const TabelaLancamentosPeriodo = ({ ...props }) => {
  const {
    key,
    periodoGrupo,
    periodosSimples,
    mesSolicitacao,
    anoSolicitacao,
    form
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
  const [valoresLancamentos, setValoresLancamentos] = useState(null);
  const [showModalObservacaoDiaria, setShowModalObservacaoDiaria] = useState(
    false
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showTabelaLancamentosPeriodo) {
      const getCategoriasDeMedicaoAsync = async () => {
        if (!categoriasDeMedicao) {
          const response_categorias_medicao = await getCategoriasDeMedicao();
          setCategoriasDeMedicao(response_categorias_medicao.data);
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

      const periodo = periodosSimples.find(
        periodo => periodo.periodo_escolar.nome === periodoEscolar
      );
      const tipos_alimentacao = periodo.tipos_alimentacao;
      const tiposAlimentacaoFormatadas = formatarLinhasTabelaAlimentacao(
        tipos_alimentacao
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
    }

    setData(new Date(`${mesSolicitacao}/01/${anoSolicitacao}`));

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, semanaSelecionada]);

  const onClickVisualizarFechar = async periodoGrupo => {
    setLoading(true);
    setShowTabelaLancamentosPeriodo(!showTabelaLancamentosPeriodo);
    setPeriodoEscolar(periodoGrupo.periodo_escolar);
    if (!showTabelaLancamentosPeriodo) {
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

  return (
    <div key={key}>
      <div className="content-section-acompanhamento-lancamento mb-3">
        <p className="mb-0">
          <b>{periodoGrupo.nome_periodo_grupo}</b>
        </p>
        <div className="content-section-acompanhamento-lancamento-right">
          <div className="acompanhamento-status-lancamento mr-3">
            {MEDICAO_STATUS_DE_PROGRESSO["MEDICAO_ENVIADA_PELA_UE"].nome}
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
      tabelaAlimentacaoRows &&
      tabelaDietaRows &&
      tabelaDietaEnteralRows &&
      valoresLancamentos ? (
        <>
          <p className="section-title-conf-lancamentos">Lançamentos da UE</p>
          <div className="weeks-tabs mb-2">
            <Tabs
              activeKey={semanaSelecionada}
              onChange={key => setSemanaSelecionada(key)}
              type="card"
              className={`${
                semanaSelecionada === 1 ? "default-color-first-semana" : ""
              }`}
              items={tabItems}
            />
            {categoriasDeMedicao &&
              categoriasDeMedicao.length > 0 &&
              categoriasDeMedicao.map(categoria => (
                <div key={categoria.uuid}>
                  <b className="pb-2 section-title">{categoria.nome}</b>
                  <section className="tabela-tipos-alimentacao">
                    <article>
                      <div
                        className={"grid-table-tipos-alimentacao header-table"}
                      >
                        <div />
                        {weekColumns.map(column => (
                          <div key={column.dia}>{column.dia}</div>
                        ))}
                      </div>
                      <div
                        className={"grid-table-tipos-alimentacao header-table"}
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
                                    <div className="field-values-input">
                                      <Field
                                        className={`m-2`}
                                        component={InputValueMedicao}
                                        apenasNumeros
                                        name={`${row.name}__dia_${
                                          column.dia
                                        }__categoria_${categoria.id}`}
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
          </div>
          <div className="periodo-final-tabela-lancamento mb-4">
            <div className="col-8 pl-0 pr-4">
              <p className="section-title-conf-lancamentos periodo mb-0">
                {periodoGrupo.nome_periodo_grupo}
              </p>
              <hr className="my-0" />
            </div>
            <div className="botoes col-4 px-0">
              <Botao
                texto="Solicitar Correção"
                style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                className="col-6 mr-3"
                onClick={() => {}}
              />
              <Botao
                texto="Aprovar Período"
                style={BUTTON_STYLE.GREEN}
                className="col-5"
                onClick={() => {}}
              />
            </div>
          </div>
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
