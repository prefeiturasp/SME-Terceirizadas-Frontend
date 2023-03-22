import React from "react";
import "./styles.scss";
import { Field } from "react-final-form";
import { InputComData } from "components/Shareable/DatePicker";
import InputText from "components/Shareable/Input/InputText";
import { useEffect } from "react";
import { OnChange } from "react-final-form-listeners";
import { calculaRestante } from "../../helpers";
import { required } from "helpers/fieldValidators";

export default ({
  etapas,
  motivos,
  cronograma,
  values,
  restante,
  setRestante,
  setpodeSubmeter,
  solicitacaoAlteracaoCronograma,
  verificarQuantidadesPreenchidas
}) => {
  useEffect(() => {
    setRestante(restante);
    // eslint-disable-next-line
  }, [cronograma]);

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

  const verificarDatasEtapas = () => {
    if (motivos.includes("ALTERAR_DATA_ENTREGA")) {
      return etapas.every(
        etapa =>
          values[`data_programada_${etapa.uuid}`] !== undefined &&
          values[`data_programada_${etapa.uuid}`] !== null
      );
    }
    return true;
  };

  const verificarQuantidade = () => {
    if (motivos.includes("ALTERAR_QTD_ALIMENTO")) {
      return restante === 0;
    }

    return true;
  };

  return (
    etapas && (
      <div className="grid-cronograma mt-4">
        <div className="grid-cronograma-header">
          <div>
            <div className="title head-crono">Data Programada</div>
          </div>
          <div>
            <div className="title head-crono">Etapa</div>
          </div>
          <div>
            <div className="title head-crono">Parte</div>
          </div>
          {motivos.includes("ALTERAR_DATA_ENTREGA") && (
            <div className="crono-header-green">
              <div className="title">Informar Nova Data</div>
            </div>
          )}

          {motivos.includes("ALTERAR_QTD_ALIMENTO") && (
            <>
              <div>
                <div className="title head-crono">Quantidade</div>
              </div>
              <div className="title crono-header-green">
                <div>Informar Nova Quantidade</div>
              </div>
            </>
          )}
        </div>
        {etapas.map(etapa => (
          <>
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
                      disabled={solicitacaoAlteracaoCronograma}
                      writable
                      validate={required}
                    />

                    <OnChange name={`data_programada_${etapa.uuid}`}>
                      {async value => {
                        if (value) {
                          if (values.motivos && values.justificativa) {
                            let podeSubmeter =
                              verificarDatasEtapas() &&
                              verificarQuantidade() &&
                              verificarQuantidadesPreenchidas(values);
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
                        type="number"
                        name={`quantidade_total_${etapa.uuid}`}
                        placeholder="Quantidade"
                        disabled={solicitacaoAlteracaoCronograma}
                        className="input-busca-produto"
                        required
                        validate={required}
                      />
                      <OnChange name={`quantidade_total_${etapa.uuid}`}>
                        {async value => {
                          const resto = calculaRestante(values, cronograma);
                          if (value) {
                            setRestante(resto);
                            const temMotivosEJustificativa =
                              values.motivos && values.justificativa;
                            const podeSubmeter =
                              temMotivosEJustificativa &&
                              resto === 0 &&
                              verificarDatasEtapas() &&
                              verificarQuantidadesPreenchidas(values);
                            setpodeSubmeter(podeSubmeter);
                          } else {
                            setpodeSubmeter(false);
                            setRestante(resto);
                          }
                        }}
                      </OnChange>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ))}

        {motivos.includes("ALTERAR_QTD_ALIMENTO") &&
          !solicitacaoAlteracaoCronograma && (
            <div className="grid-cronograma-body">
              <div />
              <div />
              {motivos.includes("ALTERAR_DATA_ENTREGA") && <div />}
              <div />
              <div />
              <div>{textoFaltante(values)}</div>
            </div>
          )}
        <div />
      </div>
    )
  );
};
