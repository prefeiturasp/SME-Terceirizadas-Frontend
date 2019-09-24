import React from "react";
import { LabelAndInput } from "../../../Shareable/labelAndInput/labelAndInput";
import { TextArea } from "../../../Shareable/TextArea/TextArea";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";

export const SectionFormEdital = props => {
  const { adicionaFieldsFormEdital } = props;
  return (
    <article className="card-body dados-editais">
      <div className="input-duplo">
        <div>
          <label className="label">
            <span>* </span>Tipos de contratação
          </label>
          <Field
            component={LabelAndInput}
            name="tipo_contratacao"
            validate={required}
            onChange={event =>
              adicionaFieldsFormEdital(`tipo_contratacao`, event.target.value)
            }
            max={50}
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
            onChange={event =>
              adicionaFieldsFormEdital(`numero`, event.target.value)
            }
            max={50}
          />
        </div>
      </div>
      <div className="input-duplo">
        <div>
          <label className="label">
            <span>* </span>Processo administrativo n°
          </label>
          <Field
            component={LabelAndInput}
            name="processo_administrativo"
            validate={required}
            onChange={event =>
              adicionaFieldsFormEdital(`numero_processo`, event.target.value)
            }
            max={50}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 pb-5">
          <Field
            component={TextArea}
            label={"Objeto resumido"}
            name="resumo_objeto"
            required
            validate={required}
            onChange={event =>
              adicionaFieldsFormEdital(`resumo`, event.target.value)
            }
          />
        </div>
      </div>
    </article>
  );
};
