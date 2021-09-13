import React from "react";
import { Field } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { formataJustificativa } from "../../helpers";

const JustificativaCancelamento = ({ dietaEspecial }) => {
  const justificativa = formataJustificativa(dietaEspecial);

  return (
    <div className="row mt-3 mb-3">
      <div className="col-12 mb-3">
        <label className="sectionName">Justificativa do Cancelamento</label>
      </div>
      {dietaEspecial.status_solicitacao === "ESCOLA_CANCELOU" ? (
        <div className="col-12">
          <div
            className="orientacoes"
            dangerouslySetInnerHTML={{
              __html: justificativa
            }}
          />
        </div>
      ) : (
        <div className="col-12">
          <Field
            component={TextArea}
            name="log_cancelamento"
            disabled={true}
            defaultValue={justificativa}
          />
        </div>
      )}
    </div>
  );
};

export default JustificativaCancelamento;
