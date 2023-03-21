import React, { Fragment } from "react";
import { Field, Form } from "react-final-form";
import { backgroundLabelPeriodo } from "components/InclusaoDeAlimentacaoDaCei/helper";
import { deepCopy } from "helpers/utilities";

export const DetalhesCEIouCEMEI = ({ ...props }) => {
  const { faixasEtarias, item } = props;
  let _periodos = deepCopy(item.periodos_escolares);
  _periodos = _periodos
    .filter(p => p.possui_alunos_regulares)
    .map(p => {
      p["checked"] = false;
      return p;
    });

  const periodosItem = backgroundLabelPeriodo(_periodos);

  return (
    <Fragment>
      <tr>
        <td colSpan={7}>
          <div className="container-fluid">
            <Form initialValues={{ periodos: _periodos }} onSubmit={() => {}}>
              {({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <div className="col-12">
                      <p>Selecione o período para visualizar as informações </p>
                    </div>
                    {periodosItem.map((periodo, index) => {
                      let faixasDoPeriodo = undefined;
                      let totalMatriculados = 0;
                      let uuids = [];
                      if (item.alunos_por_periodo_e_faixa_etaria) {
                        let peridosComMatriculados = Object.keys(
                          item.alunos_por_periodo_e_faixa_etaria
                        );
                        for (
                          let idxPeriodos = 0;
                          idxPeriodos < peridosComMatriculados.length;
                          idxPeriodos++
                        ) {
                          const comparador =
                            peridosComMatriculados[idxPeriodos] === "MANHÃ"
                              ? "MANHA"
                              : peridosComMatriculados[idxPeriodos];
                          if (comparador === periodo.nome) {
                            faixasDoPeriodo =
                              item.alunos_por_periodo_e_faixa_etaria[
                                peridosComMatriculados[idxPeriodos]
                              ];
                            const uuidsFaixas = Object.keys(faixasDoPeriodo);
                            for (
                              let idxFaixa = 0;
                              idxFaixa < uuidsFaixas.length;
                              idxFaixa++
                            ) {
                              const uuidFaixa = uuidsFaixas[idxFaixa];
                              totalMatriculados =
                                totalMatriculados + faixasDoPeriodo[uuidFaixa];
                            }
                          }
                        }
                        if (faixasDoPeriodo)
                          uuids = Object.keys(faixasDoPeriodo);
                      }
                      return (
                        <Fragment key={index}>
                          <div className="col-12 mt-3">
                            <label
                              style={{
                                background: periodo.background,
                                border: `1px solid ${periodo.borderColor}`,
                                borderRadius: "5px",
                                marginBottom: "1%",
                                width: "100%",
                                padding: "8px 15px",
                                height: "40px"
                              }}
                            >
                              <Field
                                component={"input"}
                                type="checkbox"
                                name={`periodos[${index}].checked`}
                              />
                              <span
                                className="checkbox-custom"
                                data-cy={`checkbox-${periodo.nome}`}
                              />
                              {periodo.nome}
                            </label>
                          </div>
                          {values.periodos[index].checked && (
                            <div className="col-12 mt-3">
                              <table className="table faixas-etarias-cei-alteracao">
                                <thead>
                                  <tr>
                                    <th className="col-6">Faixa Etária</th>
                                    <th className="col-6 text-center">
                                      Alunos matriculados
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {faixasEtarias.map(
                                    (faixaEtaria, faixaIndex) => {
                                      let matriculados = 0;
                                      if (
                                        uuids &&
                                        uuids.includes(faixaEtaria.uuid) &&
                                        faixasDoPeriodo
                                      ) {
                                        matriculados =
                                          faixasDoPeriodo[faixaEtaria.uuid];
                                      }
                                      return (
                                        <tr key={faixaIndex}>
                                          <td className="col-6">
                                            {faixaEtaria.__str__}
                                          </td>
                                          <td className="col-6 text-center">
                                            {matriculados}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                  <tr className="total-faixas-cei">
                                    <td className="col-8 font-weight-bold">
                                      Total
                                    </td>
                                    <td className="col-2 text-center">
                                      {totalMatriculados}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </form>
              )}
            </Form>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
