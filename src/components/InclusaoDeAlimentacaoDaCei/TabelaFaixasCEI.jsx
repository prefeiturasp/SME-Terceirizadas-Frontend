import React from "react";
import { Field } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { maxValue, naoPodeSerZero } from "helpers/fieldValidators";
import { composeValidators } from "helpers/utilities";
import { OnChange } from "react-final-form-listeners";

export const TabelaFaixasCEI = ({
  values,
  form,
  periodo,
  periodoIndice,
  faixasEtarias,
  alunosMatriculados,
  todasFaixas,
  vinculosAlimentacao
}) => {
  const alimentosFormatados = vinculosAlimentacao
    .find(v => v.periodo_escolar.uuid === periodo.uuid)
    .tipos_alimentacao.map(ta => ta.nome)
    .join(", ");

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="container-fluid">
            <label
              style={{
                background: periodo.background,
                border: `1px solid ${periodo.borderColor}`,
                borderRadius: "5px",
                margin: "1% 0px",
                width: "100%",
                padding: "8px 15px",
                height: "40px"
              }}
            >
              <Field
                component={"input"}
                type="checkbox"
                name={`inclusoes[${periodoIndice}][checked]`}
              />
              <OnChange name={`inclusoes[${periodoIndice}][checked]`}>
                {async () => {
                  form.change(
                    `inclusoes[${periodoIndice}][periodo_uuid]`,
                    periodo.uuid
                  );
                }}
              </OnChange>
              <span
                className="checkbox-custom"
                data-cy={`checkbox-${periodo.nome}`}
              />
              {periodo.nome}
            </label>
          </div>
        </div>
      </div>
      {values.inclusoes[periodoIndice] &&
        values.inclusoes[periodoIndice].checked &&
        faixasEtarias && (
          <div className="row mt-2">
            <div className="col-12">
              <div className="container-fluid">
                <p>
                  Tipos de Alimentação do período {periodo.nome.toLowerCase()}:{" "}
                  <b className="alimentosStyle">{alimentosFormatados}</b>
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="container-fluid">
                <table className="table faixas-etarias-cei-alteracao">
                  <thead>
                    <tr>
                      <th className="col-7">Faixa Etária</th>
                      <th className="col-3 text-center">Alunos Matriculados</th>
                      <th className="col-2 text-center">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todasFaixas &&
                      todasFaixas.map((faixa, faixaIndice) => {
                        const qtdMatriculados = faixasEtarias.find(
                          matriculados =>
                            matriculados.faixa_etaria.uuid === faixa.uuid
                        );
                        return (
                          <tr key={faixaIndice}>
                            <td>{faixa["__str__"]}</td>
                            <td className="text-center">
                              {qtdMatriculados ? qtdMatriculados.count : 0}
                            </td>
                            <td className="text-center">
                              <Field
                                component={InputText}
                                type="number"
                                step="1"
                                min="0"
                                max={parseInt(
                                  qtdMatriculados ? qtdMatriculados.count : 0
                                )}
                                name={`inclusoes[${periodoIndice}][faixas_etarias][${faixaIndice}][quantidade_alunos]`}
                                validate={composeValidators(
                                  naoPodeSerZero,
                                  maxValue(
                                    parseInt(
                                      qtdMatriculados
                                        ? qtdMatriculados.count
                                        : 0
                                    )
                                  )
                                )}
                                className="input-quantidades"
                              />
                              <OnChange
                                name={`inclusoes[${periodoIndice}][faixas_etarias][${faixaIndice}][quantidade_alunos]`}
                              >
                                {async () => {
                                  form.change(
                                    `inclusoes[${periodoIndice}][faixas_etarias][${faixaIndice}][faixa_etaria_uuid]`,
                                    faixa.uuid
                                  );
                                }}
                              </OnChange>
                            </td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td>Total</td>
                      <td className="text-center">{alunosMatriculados}</td>
                      <td className="text-center">
                        {values["inclusoes"][periodoIndice]["faixas_etarias"]
                          ? values["inclusoes"][periodoIndice][
                              "faixas_etarias"
                            ].reduce((somatorio, f) => {
                              return (
                                somatorio +
                                parseInt(
                                  f.quantidade_alunos ? f.quantidade_alunos : 0
                                )
                              );
                            }, 0)
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default TabelaFaixasCEI;
