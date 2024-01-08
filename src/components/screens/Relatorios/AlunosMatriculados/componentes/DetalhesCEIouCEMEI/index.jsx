import React, { Fragment } from "react";

export const DetalhesCEIouCEMEI = ({ ...props }) => {
  const { faixasEtarias, item, totalMatriculados } = props;

  return (
    <Fragment>
      <tr>
        <td colSpan={8}>
          <div className="container-fluid">
            <div className="row mt-3">
              <div className="col-12 mt-3">
                <table className="table faixas-etarias-cei-alteracao">
                  <thead>
                    <tr>
                      <th className="col-6">Faixa Etária</th>
                      <th className="col-6 text-center">Alunos matriculados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faixasEtarias.map((faixaEtaria, faixaIndex) => {
                      return (
                        <tr key={faixaIndex}>
                          <td className="col-6">{faixaEtaria.__str__}</td>
                          <td className="col-6 text-center">
                            {item.alunos_por_faixa_etaria[faixaEtaria.uuid] ||
                              0}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="total-faixas-cei">
                      <td className="col-8 fw-bold">Total</td>
                      <td className="col-2 text-center">{totalMatriculados}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
