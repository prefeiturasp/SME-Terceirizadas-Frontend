import React from "react";
import "./styles.scss";
import { Field } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";
import { useEffect } from "react";
import { OnChange } from "react-final-form-listeners";
import { calculaRestante } from "../helpers";

export default ({
  etapas,
  motivos,
  cronograma,
  values,
  restante,
  setRestante,
  setpodeSubmeter
}) => {
  useEffect(() => {
    setRestante(cronograma.qtd_total_programada);
  }, []);

  const textoFaltante = () => {
    let textoPadrao = (
      <div>
        Faltam
        <span className="font-weight-bold">
          &nbsp;
          {restante}
          &nbsp;
        </span>
        para programar
      </div>
    );

    let textoAcima = <div>Quantidade maior que a prevista em contrato</div>;

    return (
      <div className="row">
        <div
          className={`col-12 texto-alimento-faltante ${
            restante === 0 ? "verde" : "vermelho"
          }`}
        >
          {restante < 0 ? textoAcima : textoPadrao}
        </div>
      </div>
    );
  };

  return (
    etapas && (
      <div className="grid-cronograma mt-4">
        <div className="grid-cronograma-header head-crono">
          <div>
            <div>Data programada</div>
          </div>
          <div>
            <div>Etapa</div>
          </div>
          <div>
            <div>Parte</div>
          </div>
          {motivos.includes("ALTERAR_DATA_ENTREGA") && (
            <div className="crono-header-green">
              <div>Informar Nova Data</div>
            </div>
          )}

          {motivos.includes("ALTERAR_QTD_ALIMENTO") && (
            <>
              <div>
                <div>Quantidade</div>
              </div>
              <div className="crono-header-green">
                <div>Informar Nova Quantidade</div>
              </div>
            </>
          )}
        </div>
        {etapas.map(etapa => (
          <div className="grid-cronograma-body" key={etapa.uuid}>
            <div>
              <div>{etapa.data_programada}</div>
            </div>
            <div>
              <div>{etapa.etapa}</div>
            </div>
            <div>
              <div>{etapa.parte}</div>
            </div>
            {motivos.includes("ALTERAR_DATA_ENTREGA") && (
              <div>
                <div>
                  <Field
                    component={InputComData}
                    name={`data_programada_${etapa.uuid}`}
                    placeholder="Selecionar Data"
                    minDate={null}
                    maxDate={null}
                    writable
                  />

                  <OnChange name={`data_programada_${etapa.uuid}`}>
                    {async value => {
                      if (value) {
                        if (values.motivos && values.justificativa) {
                          let podeSubmeter = etapas.every(
                            etapa =>
                              values[`data_programada_${etapa.uuid}`] !==
                                undefined &&
                              values[`data_programada_${etapa.uuid}`] !== null
                          );
                          setpodeSubmeter(podeSubmeter);
                        }
                      } else {
                        setpodeSubmeter(false);
                      }
                    }}
                  </OnChange>
                </div>
              </div>
            )}

            {motivos.includes("ALTERAR_QTD_ALIMENTO") && (
              <>
                <div>
                  <div>{etapa.quantidade}</div>
                </div>
                <div>
                  <div>
                    <Field
                      component={InputText}
                      name={`quantidade_total_${etapa.uuid}`}
                      placeholder="Quantidade"
                      className="input-busca-produto"
                      required
                    />
                    <OnChange name={`quantidade_total_${etapa.uuid}`}>
                      {async value => {
                        if (value) {
                          const resto = calculaRestante(values, cronograma);
                          setRestante(resto);
                          if (
                            values.motivos &&
                            values.justificativa &&
                            resto === 0
                          ) {
                            setpodeSubmeter(true);
                          } else {
                            setpodeSubmeter(false);
                          }
                        } else {
                          setpodeSubmeter(false);
                          setRestante(cronograma.qtd_total_programada);
                        }
                      }}
                    </OnChange>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        {motivos.includes("ALTERAR_QTD_ALIMENTO") && textoFaltante(values)}
        <div />
      </div>
    )
  );
};
