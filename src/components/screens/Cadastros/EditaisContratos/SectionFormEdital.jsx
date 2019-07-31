import React from "react";
import { LabelAndInput, LabelAndTextAreaCustom } from "../../../Shareable/labelAndInput/labelAndInput";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";

export const SectionFormEdital = props => {
  return (
    <article className="card-body dados-editais">
      <div className="input-duplo">
        <div>
          <label className="label">
            <span>* </span>Tipos de contratação
          </label>
          <Field
            component={LabelAndInput}
            className="form-control"
            name="tipo_contratacao"
            validate={required}
          />
        </div>
        <div>
          <label className="label">
            <span>* </span>Edital n°
          </label>
          <Field
            component={LabelAndInput}
            className="form-control"
            name="edital_numero"
            validate={required}
          />
        </div>
      </div>
      <div className="input-duplo">
        <div>
          <label className="label">
            <span>* </span>Processo administrativo do contrato
          </label>
          <Field
            component={LabelAndInput}
            className="form-control"
            name="processo_administrativo"
            validate={required}
          />
        </div>
      </div>
      <div className="input-unico">
        <div className="text-area">
          <label className="label">
            <span>* </span>Objeto resumido
          </label>
          <Field
            component={LabelAndTextAreaCustom}
            className="form-control"
            name="resumo_objeto"
            validate={required}
          />
        </div>
      </div>
    </article>
  );
};

