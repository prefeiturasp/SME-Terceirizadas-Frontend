import React from "react";
import { TextArea } from "../../../Shareable/TextArea/TextArea";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";
import { InputText } from "../../../Shareable/Input/InputText";

export const SectionFormEdital = props => {
  const { adicionaFieldsFormEdital } = props;
  return (
    <article className="card-body dados-editais">
      <div className="input-duplo">
        <div>
          <Field
            component={InputText}
            label="Tipos de contratação"
            name="tipo_contratacao"
            required
            validate={required}
            onChange={event =>
              adicionaFieldsFormEdital(`tipo_contratacao`, event.target.value)
            }
            max={50}
          />
        </div>
        <div>
          <Field
            component={InputText}
            className="form-control"
            label="N° do edital"
            name="edital_numero"
            required
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
          <Field
            component={InputText}
            label="Nº do processo administrativo"
            name="processo_administrativo"
            required
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
