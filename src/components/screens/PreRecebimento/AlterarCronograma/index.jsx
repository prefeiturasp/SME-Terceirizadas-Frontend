import React, { useState } from "react";
import { useEffect } from "react";
import {
  analiseDilogSolicitacaoAlteracaoCronograma,
  analiseDinutreSolicitacaoAlteracaoCronograma,
  cadastraSolicitacaoAlteracaoCronograma,
  getCronograma,
  getSolicitacaoAlteracaoCronograma
} from "services/cronograma.service";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import DadosCronograma from "../CronogramaEntrega/components/DadosCronograma";
import TabelaEditarCronograma from "./components/TabelaEditarCronograma";
import AnaliseDilogDiretoria from "./components/AnaliseDilogDiretoria";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import "./styles.scss";
import AcoesAlterar from "./components/AcoesAlterar";
import { prepararPayloadCronograma } from "./helpers";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  CRONOGRAMA_ENTREGA,
  PRE_RECEBIMENTO,
  SOLICITACAO_ALTERACAO_CRONOGRAMA
} from "configs/constants";
import { useHistory } from "react-router-dom";
import { OnChange } from "react-final-form-listeners";
import {
  usuarioEhDilogDiretoria,
  usuarioEhDinutreDiretoria,
  usuarioEhEmpresaFornecedor
} from "helpers/utilities";
import { Radio, Spin } from "antd";
import { FluxoDeStatusCronograma } from "components/Shareable/FluxoDeStatusCronograma";

const opcoesMotivos = [
  { value: "ALTERAR_DATA_ENTREGA", label: "Data de Entrega" },
  { value: "ALTERAR_QTD_ALIMENTO", label: "Quantidade Programada" },
  { value: "OUTROS", label: "Outros" }
];

const manterDataEQuantidade = (values, values_) => {
  return (
    values.motivos &&
    values.motivos.includes("OUTROS") &&
    (values_.includes("ALTERAR_QTD_ALIMENTO") ||
      values_.includes("ALTERAR_DATA_ENTREGA"))
  );
};

export default ({ analiseSolicitacao }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");
  const [restante, setRestante] = useState(undefined);
  const [etapas, setEtapas] = useState([{}]);
  const [cronograma, setCronograma] = useState(null);
  const [aprovacaoDinutre, setAprovacaoDinutre] = useState(null);
  const [aprovacaoDilog, setAprovacaoDilog] = useState(null);
  const [
    solicitacaoAlteracaoCronograma,
    setSolicitacaoAlteracaoCronograma
  ] = useState(null);
  const [podeSubmeter, setpodeSubmeter] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();

  const onChangeCampos = e => {
    setAprovacaoDinutre(e.target.value);
  };

  const exibirJustificativaDinutre = () =>
    aprovacaoDinutre === false ||
    ((usuarioEhDilogDiretoria() || usuarioEhDinutreDiretoria) &&
      ["Aprovado DINUTRE", "Reprovado DINUTRE"].includes(
        solicitacaoAlteracaoCronograma.status
      ));

  const checarQuantidadeInformada = values_ => {
    return !values_.includes("ALTERAR_QTD_ALIMENTO") || restante === 0;
  };

  const checarDatasInformadas = (values_, values) => {
    if (values_.includes("ALTERAR_DATA_ENTREGA")) {
      let podeSubmeter = etapas.every(
        etapa =>
          values[`data_programada_${etapa.uuid}`] !== undefined &&
          values[`data_programada_${etapa.uuid}`] !== null
      );
      return podeSubmeter;
    }

    return true;
  };

  const handleMotivosChange = (values_, values, form) => {
    setpodeSubmeter(false);
    if (manterDataEQuantidade(values, values_)) {
      values_ = values_.filter(value_ => value_ !== "OUTROS");
    }
    if (values_.length !== 0 && values.justificativa) {
      setpodeSubmeter(
        checarQuantidadeInformada(values_) &&
          checarDatasInformadas(values_, values)
      );
    }
    if (values_.includes("OUTROS")) {
      if (values_.length !== 0 && values.justificativa) {
        setpodeSubmeter(true);
      }
      form.change("motivos", ["OUTROS"]);
      return;
    }
    form.change("motivos", values_);
  };

  const getDetalhes = async () => {
    setCarregando(true);
    if (analiseSolicitacao) {
      const responseSolicitacaoCronograma = await getSolicitacaoAlteracaoCronograma(
        uuid
      );
      const responseCronograma = responseSolicitacaoCronograma.data.cronograma;
      setSolicitacaoAlteracaoCronograma(responseSolicitacaoCronograma.data);
      setCronograma(responseCronograma);
      setEtapas(responseCronograma.etapas);
      setRestante(responseCronograma.qtd_total_programada);
      setCarregando(false);
    } else {
      if (uuid) {
        const responseCronograma = await getCronograma(uuid);
        if (responseCronograma.status === HTTP_STATUS.OK) {
          setCronograma(responseCronograma.data);
          setEtapas(responseCronograma.data.etapas);
          setRestante(responseCronograma.data.qtd_total_programada);
          setCarregando(false);
        }
      }
    }
  };

  const analisadoPelaDinutre = () => {
    return ["Aprovado DINUTRE", "Reprovado DINUTRE"].includes(
      solicitacaoAlteracaoCronograma.status
    );
  };

  const verificarQuantidadesPreenchidas = values => {
    if (values.motivos.includes("ALTERAR_QTD_ALIMENTO")) {
      return etapas.every(
        etapa =>
          values[`quantidade_total_${etapa.uuid}`] !== undefined &&
          values[`quantidade_total_${etapa.uuid}`] !== null
      );
    }
    return true;
  };

  const labelDeMotivos = motivos => {
    let motivo = " ";
    if (motivos !== undefined) {
      if (motivos.includes("ALTERAR_DATA_ENTREGA")) {
        motivo += " Alterar datas de entrega,";
      }
      if (motivos.includes("ALTERAR_QTD_ALIMENTO")) {
        motivo += " Alterar quantidade programada,";
      }
      if (motivos.includes("OUTROS")) {
        motivo += " Outros ";
      }
    }
    return motivo.slice(0, -1);
  };

  const cadastraAlteracao = async values => {
    const payload = prepararPayloadCronograma(cronograma, values);
    await cadastraSolicitacaoAlteracaoCronograma(payload)
      .then(() => {
        toastSuccess("Solicitação de alteração salva com sucesso!");
        history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
      })
      .catch(() => {
        toastError("Ocorreu um erro ao salvar o Cronograma");
      });
  };

  const analiseDilog = async (values, aprovado) => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const payload = {
      aprovado: aprovado
    };
    if (!aprovado) {
      payload.justificativa_dilog = values["justificativa_dilog"];
    }
    await analiseDilogSolicitacaoAlteracaoCronograma(uuid, payload)
      .then(() => {
        toastSuccess("Análise da alteração enviada com sucesso!");
        history.push(`/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA}`);
      })
      .catch(() => {
        toastError("Ocorreu um erro ao salvar o Cronograma");
      });
  };

  const analiseDinutre = async (values, aprovado) => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const payload = {
      aprovado: aprovado
    };
    if (!aprovado) {
      payload.justificativa_dinutre = values["justificativa_dinutre"];
    }
    await analiseDinutreSolicitacaoAlteracaoCronograma(uuid, payload)
      .then(() => {
        toastSuccess("Análise da alteração enviada com sucesso!");
        history.push(`/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA}`);
      })
      .catch(() => {
        toastError("Ocorreu um erro ao salvar o Cronograma");
      });
  };

  const disabledDinutre = values => {
    return aprovacaoDinutre !== true && !values.justificativa_dinutre;
  };

  const disabledDilog = values => {
    return aprovacaoDilog !== true && !values.justificativa_dilog;
  };

  const defineSubmit = values => {
    if (usuarioEhDinutreDiretoria()) {
      analiseDinutre(values, aprovacaoDinutre);
    } else if (usuarioEhDilogDiretoria()) {
      analiseDilog(values, aprovacaoDilog);
    } else {
      cadastraAlteracao(values);
    }
  };

  const buscaLogJustificativaCronograma = (logs, autorJustificativa) => {
    const dict_logs = {
      cronograma: ["Cronograma ciente alteração cronograma"],
      dinutre: [
        "Alteração cronograma aprovada pela DINUTRE",
        "Alteração cronograma reprovada pela DINUTRE"
      ]
    };
    let log_correto = logs.find(log => {
      return dict_logs[autorJustificativa].includes(
        log.status_evento_explicacao
      );
    });
    return log_correto ? log_correto.justificativa : "";
  };

  useEffect(() => {
    getDetalhes();
    // eslint-disable-next-line
  }, [uuid]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3">
        <div className="card-body alterar-cronograma">
          {solicitacaoAlteracaoCronograma && !usuarioEhEmpresaFornecedor() && (
            <div className="row pb-3">
              <FluxoDeStatusCronograma
                listaDeStatus={solicitacaoAlteracaoCronograma.logs}
                solicitacao={true}
              />
            </div>
          )}
          {cronograma && (
            <>
              {!solicitacaoAlteracaoCronograma ? (
                <DadosCronograma
                  cronograma={cronograma}
                  esconderInformacoesAdicionais={true}
                />
              ) : (
                <DadosCronograma
                  cronograma={cronograma}
                  solicitacaoAlteracaoCronograma={
                    solicitacaoAlteracaoCronograma
                  }
                  esconderInformacoesAdicionais={false}
                />
              )}
              <Form
                onSubmit={defineSubmit}
                initialValues={values => {
                  if (solicitacaoAlteracaoCronograma) {
                    let dados_iniciais = {
                      motivos: solicitacaoAlteracaoCronograma
                        ? solicitacaoAlteracaoCronograma.motivo
                        : undefined,
                      justificativa:
                        solicitacaoAlteracaoCronograma.justificativa,
                      justificativa_cronograma: buscaLogJustificativaCronograma(
                        solicitacaoAlteracaoCronograma.logs,
                        "cronograma"
                      ),
                      justificativa_dinutre: buscaLogJustificativaCronograma(
                        solicitacaoAlteracaoCronograma.logs,
                        "dinutre"
                      )
                    };
                    solicitacaoAlteracaoCronograma.etapas.forEach(e => {
                      dados_iniciais[`quantidade_total_${e.etapa}`] =
                        e.nova_quantidade;
                      dados_iniciais[`data_programada_${e.etapa}`] =
                        e.nova_data_programada;
                    });
                    return dados_iniciais;
                  } else {
                    return values;
                  }
                }}
                render={({ handleSubmit, form, values }) => (
                  <form onSubmit={handleSubmit}>
                    {!solicitacaoAlteracaoCronograma ? (
                      <div>
                        <label className="label font-weight-normal">
                          <span>* </span>Motivo da Solicitação de Alteração
                        </label>
                        <Field
                          component={StatefulMultiSelect}
                          name="motivos"
                          disableSearch={true}
                          hasSelectAll={false}
                          options={opcoesMotivos}
                          selected={values.motivos || []}
                          onSelectedChanged={values_ =>
                            handleMotivosChange(values_, values, form)
                          }
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione o(s) Motivo(s)",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                          required
                        />
                      </div>
                    ) : (
                      <>
                        <hr />
                        <p className="head-green">Solicitação de Alteração</p>
                        <p>
                          <span className="green">Motivo: </span>{" "}
                          {labelDeMotivos(values.motivos)}
                        </p>
                      </>
                    )}
                    {values.motivos &&
                    (values.motivos.includes("ALTERAR_DATA_ENTREGA") ||
                      values.motivos.includes("ALTERAR_QTD_ALIMENTO")) ? (
                      <div>
                        <TabelaEditarCronograma
                          etapas={etapas}
                          solicitacaoAlteracaoCronograma={
                            solicitacaoAlteracaoCronograma
                          }
                          motivos={values.motivos}
                          cronograma={cronograma}
                          values={values}
                          verificarQuantidadesPreenchidas={
                            verificarQuantidadesPreenchidas
                          }
                          setpodeSubmeter={setpodeSubmeter}
                          restante={restante}
                          setRestante={setRestante}
                        />
                      </div>
                    ) : null}
                    <div className="mt-4">
                      <label className="label font-weight-normal">
                        <span>* </span>Justificativa
                      </label>
                      <Field
                        component={TextArea}
                        name="justificativa"
                        placeholder="Escreva o motivo da solicitação de alteração"
                        className="input-busca-produto"
                        disabled={solicitacaoAlteracaoCronograma !== null}
                      />
                      <OnChange name="justificativa">
                        {value => {
                          if (value && values.motivos) {
                            setpodeSubmeter(
                              checarQuantidadeInformada(values.motivos) &&
                                checarDatasInformadas(values.motivos, values) &&
                                verificarQuantidadesPreenchidas(values)
                            );
                          } else {
                            setpodeSubmeter(false);
                          }
                        }}
                      </OnChange>
                    </div>
                    {(usuarioEhDinutreDiretoria() ||
                      (usuarioEhDilogDiretoria() &&
                        analisadoPelaDinutre())) && (
                      <>
                        <hr />
                        <p className="head-green">Análise Cronograma</p>
                        <div className="mt-4">
                          <Field
                            component={TextArea}
                            name="justificativa_cronograma"
                            className="input-busca-produto"
                            disabled={true}
                          />
                        </div>
                        <hr />
                        <p className="head-green">Análise DINUTRE</p>
                        {usuarioEhDinutreDiretoria() &&
                          solicitacaoAlteracaoCronograma.status ===
                            "Cronograma ciente" && (
                            <Radio.Group
                              size="large"
                              onChange={onChangeCampos}
                              value={aprovacaoDinutre}
                            >
                              <Radio className="radio-entrega-sim" value={true}>
                                Analise Aprovada
                              </Radio>
                              <Radio
                                className="radio-entrega-nao"
                                value={false}
                              >
                                Analise Reprovada
                              </Radio>
                            </Radio.Group>
                          )}
                        {exibirJustificativaDinutre() && (
                          <div className="mt-4">
                            {analisadoPelaDinutre() && (
                              <p>{solicitacaoAlteracaoCronograma.status}</p>
                            )}
                            {(aprovacaoDinutre === false ||
                              solicitacaoAlteracaoCronograma.status ===
                                "Reprovado DINUTRE") && (
                              <>
                                <label className="label font-weight-normal">
                                  <span>* </span>Justificativa
                                </label>
                                <Field
                                  component={TextArea}
                                  disabled={analisadoPelaDinutre()}
                                  name="justificativa_dinutre"
                                  placeholder="Escreva as alterações necessárias"
                                  className="input-busca-produto"
                                />
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    {usuarioEhDilogDiretoria() && analisadoPelaDinutre() && (
                      <AnaliseDilogDiretoria
                        aprovacaoDilog={aprovacaoDilog}
                        setAprovacaoDilog={setAprovacaoDilog}
                      />
                    )}

                    <div className="mt-4 mb-4">
                      <AcoesAlterar
                        cronograma={cronograma}
                        solicitacaoAlteracaoCronograma={
                          solicitacaoAlteracaoCronograma
                        }
                        handleSubmit={handleSubmit}
                        podeSubmeter={podeSubmeter}
                        disabledDinutre={disabledDinutre(values)}
                        disabledDilog={disabledDilog(values)}
                      />
                    </div>
                  </form>
                )}
              />
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
