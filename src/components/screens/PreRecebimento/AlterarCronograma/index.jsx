import React, { useState } from "react";
import { useEffect } from "react";
import {
  cadastraSolicitacaoAlteracaoCronograma,
  getCronograma,
  getSolicitacaoAlteracaoCronograma
} from "services/cronograma.service";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import DadosCronograma from "../CronogramaEntrega/components/DadosCronograma";
import TabelaEditarCronograma from "./components/TabelaEditarCronograma";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import "./styles.scss";
import AcoesAlterar from "./components/AcoesAlterar";
import { prepararPayloadCronograma } from "./helpers";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";
import { useHistory } from "react-router-dom";
import { OnChange } from "react-final-form-listeners";

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
  const [uuid, setUuid] = useState(urlParams.get("uuid"));
  const [restante, setRestante] = useState(undefined);
  const [etapas, setEtapas] = useState([{}]);
  const [cronograma, setCronograma] = useState(null);
  const [
    solicitacaoAlteracaoCronograma,
    setSolicitacaoAlteracaoCronograma
  ] = useState(null);
  const [podeSubmeter, setpodeSubmeter] = useState(false);
  const history = useHistory();

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
    if (analiseSolicitacao) {
      const responseSolicitacaoCronograma = await getSolicitacaoAlteracaoCronograma(
        uuid
      );
      const responseCronograma = responseSolicitacaoCronograma.data.cronograma;
      setSolicitacaoAlteracaoCronograma(responseSolicitacaoCronograma.data);
      setCronograma(responseCronograma);
      setEtapas(responseCronograma.etapas);
      setRestante(responseCronograma.qtd_total_programada);
    } else {
      if (uuid) {
        const responseCronograma = await getCronograma(uuid);
        if (responseCronograma.status === HTTP_STATUS.OK) {
          setCronograma(responseCronograma.data);
          setEtapas(responseCronograma.data.etapas);
          setRestante(responseCronograma.data.qtd_total_programada);
        }
      }
    }
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

  useEffect(() => {
    getDetalhes();
    // eslint-disable-next-line
  }, [uuid]);

  return (
    <div className="card mt-3">
      <div className="card-body">
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
                solicitacaoAlteracaoCronograma={solicitacaoAlteracaoCronograma}
                esconderInformacoesAdicionais={false}
              />
            )}
            <Form
              onSubmit={async values => {
                const payload = prepararPayloadCronograma(cronograma, values);
                await cadastraSolicitacaoAlteracaoCronograma(payload)
                  .then(() => {
                    toastSuccess("Solicitação de alteração salva com sucesso!");
                    history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
                  })
                  .catch(() => {
                    toastError("Ocorreu um erro ao salvar o Cronograma");
                  });
              }}
              initialValues={values => {
                if (solicitacaoAlteracaoCronograma) {
                  let dados_iniciais = {
                    motivos: solicitacaoAlteracaoCronograma
                      ? solicitacaoAlteracaoCronograma.motivo
                      : undefined,
                    justificativa: solicitacaoAlteracaoCronograma.justificativa
                  };
                  solicitacaoAlteracaoCronograma.etapas.map(e => {
                    dados_iniciais[`quantidade_total_${e.etapa}`] =
                      e.nova_quantidade;
                    dados_iniciais[`data_programada_${e.etapa}`] =
                      e.nova_data_programada;
                  });
                  return dados_iniciais;
                }
                return values;
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
                        disabled={solicitacaoAlteracaoCronograma}
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
                      disabled={solicitacaoAlteracaoCronograma}
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
                  <div className="mt-4 mb-4">
                    <AcoesAlterar
                      cronograma={cronograma}
                      handleSubmit={handleSubmit}
                      podeSubmeter={podeSubmeter}
                    />
                  </div>
                </form>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};
