import React from "react";
import { Field } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";

export const EditaisVinculados = ({ ehCardSuspensos }) => {
  return (
    <div className="row">
      <div className="col-12">
        <p className="titulo-section">
          {ehCardSuspensos
            ? "Produto Suspenso nos Editais"
            : "Editais Vinculados"}
        </p>
      </div>
      <div className="col-12">
        <Field
          component={TextArea}
          label={
            ehCardSuspensos
              ? "Produto Suspenso nos Editais"
              : "Editais Vinculados ao Produto"
          }
          className="editais-vinculados-textarea"
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
