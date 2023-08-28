import React from "react";
import * as R from "ramda";

export const MotivoCorrecaoHomologacao = ({ logs }) => {
  const getCorrecao = (logs) => {
    const arr = R.filter(
      R.propEq("status_evento_explicacao", "Questionamento pela CODAE"),
      logs
    );
    const lastLogQuestionamento = arr.pop();
    return lastLogQuestionamento;
  };

  const correcao = getCorrecao(logs);

  return (
    <div className="row">
      <div className="col-12">
        <label className="col-form-label ">{`Motivo da solicitação de correção do produto (Data: ${
          correcao.criado_em.split(" ")[0]
        }): `}</label>
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
export default MotivoCorrecaoHomologacao;
