import React, { useState } from "react";
import { useEffect } from "react";
import { getCronograma } from "services/cronograma.service";
import "./styles.scss";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import DadosCronograma from "../CronogramaEntrega/components/DadosCronograma";
import TabelaEditarCronograma from "./TabelaEditarCronograma";
import TextArea from "antd/lib/input/TextArea";
import "./styles.scss";
import { usuarioEhFornecedor } from "helpers/utilities";
import AcoesAlterar from "./AcoesAlterar";

const opcoesMotivos = [
  { value: "data_entrega", label: "Data de Entrega" },
  { value: "quantidade_programada", label: "Quantidade Programada" },
  { value: "outros", label: "Outros" }
];

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");
  const [cronograma, setCronograma] = useState(null);

  const getDetalhes = async () => {
    if (uuid) {
      const responseCronograma = await getCronograma(uuid);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        setCronograma(responseCronograma.data);
      }
    }
  };

  useEffect(() => {
    getDetalhes();
  }, []);
  return (
    <div className="card mt-3">
      <div className="card-body">
        {cronograma && (
          <>
            <DadosCronograma
              cronograma={cronograma}
              esconderInformacoesAdicionais={true}
            />
            <Form
              onSubmit={() => {}}
              initialValues={{}}
              render={({ handleSubmit, form, values }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="label font-weight-normal">
                      <span>* </span>Motivo da solicitação de alteração
                    </label>
                    <Field
                      component={StatefulMultiSelect}
                      name="motivos"
                      disableSearch={true}
                      hasSelectAll={false}
                      options={opcoesMotivos}
                      selected={values.motivos || []}
                      onSelectedChanged={values_ => {
                        if (
                          values.motivos &&
                          values.motivos.includes("outros") &&
                          (values_.includes("quantidade_programada") ||
                            values_.includes("data_entrega"))
                        ) {
                          values_ = values_.filter(
                            value_ => value_ !== "outros"
                          );
                        }
                        if (values_.includes("outros")) {
                          form.change("motivos", ["outros"]);
                          return;
                        }
                        form.change("motivos", values_);
                      }}
                      overrideStrings={{
                        search: "Busca",
                        selectSomeItems: "Selecione",
                        allItemsAreSelected:
                          "Todos os itens estão selecionados",
                        selectAll: "Todos"
                      }}
                    />
                  </div>
                  {values.motivos &&
                  (values.motivos.includes("data_entrega") ||
                    values.motivos.includes("quantidade_programada")) ? (
                    <div>
                      <TabelaEditarCronograma
                        cronograma={cronograma}
                        motivos={values.motivos}
                      />
                    </div>
                  ) : null}
                  <div className="mt-4">
                    <label className="label font-weight-normal">
                      <span>* </span>Justificativa
                    </label>
                    <Field
                      component={TextArea}
                      name="quantidade_total"
                      placeholder="Escreva as alterações necessárias..."
                      className="input-busca-produto"
                      required
                    />
                  </div>
                  {usuarioEhFornecedor() && (
                    <div className="mt-4 mb-4">
                      <AcoesAlterar cronograma={cronograma} />
                    </div>
                  )}
                </form>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};
