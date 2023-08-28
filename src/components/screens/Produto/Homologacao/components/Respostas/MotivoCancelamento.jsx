import React from "react";
import * as R from "ramda";

export const MotivoCancelamento = ({ logs }) => {
  const getCorrecao = (logs) => {
    const arr = R.filter(
      R.propEq(
        "status_evento_explicacao",
        "Terceirizada cancelou solicitação de homologação de produto"
      ),
      logs
    );
    return arr[0];
  };

  const correcao = getCorrecao(logs);

  return (
    <div className="row">
      <div className="col-12">
        <label className="col-form-label ">{`Motivo do cancelamento da homologação (Data: ${
          correcao.criado_em.split(" ")[0]
        }) `}</label>
      </div>
      <div className="col-12">
        <p
          className="justificativa-ficha-produto no-margin"
          dangerouslySetInnerHTML={{
            __html: correcao.justificativa,
          }}
        />
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default MotivoCancelamento;
