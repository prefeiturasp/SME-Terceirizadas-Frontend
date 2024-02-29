import React from "react";
import * as R from "ramda";

export const MotivoSuspensao = ({ logs }) => {
  const getSuspensao = (logs) => {
    const arr = R.filter(
      R.propEq("status_evento_explicacao", "CODAE suspendeu o produto"),
      logs
    );
    return arr[0];
  };

  const suspensao = getSuspensao(logs);
  if (!suspensao) return false;

  return (
    <div className="row">
      <div className="col-12">
        <label className="col-form-label ">{`Motivo da suspensão (Data: ${
          suspensao.criado_em.split(" ")[0]
        })`}</label>
      </div>
      <div className="col-12">
        <p
          className="justificativa-ficha-produto no-margin"
          dangerouslySetInnerHTML={{
            __html: suspensao.justificativa,
          }}
        />
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default MotivoSuspensao;
