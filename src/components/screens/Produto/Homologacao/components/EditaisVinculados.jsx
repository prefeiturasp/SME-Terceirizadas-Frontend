import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";

export const EditaisVinculados = () => {
  return (
    <div className="row">
      <div className="col-12">
        <p className="titulo-section">Editais Vinculados</p>
      </div>
      <div className="col-12">
        <Field
          component={InputText}
          label="Editais Vinculados ao Produto"
          name="produto.editais"
          disabled={true}
        />
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default EditaisVinculados;
