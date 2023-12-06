import React from "react";
//import "./styles.scss";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";
import InputText from "components/Shareable/Input/InputText";

interface Props {
  values: Record<string, any>;
}

const FormNaoPereciveis: React.FC<Props> = ({ values }) => {
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <Field
            component={InputText}
            label="Prazo de Validade"
            name={`prazo_validade`}
            placeholder="Informe o Prazo de Validade"
            className="input-ficha-tecnica"
            required
            validate={required}
            tooltipText={
              "Deve ser declarado do prazo real em dias, meses ou anos a partir da data de fabricação."
            }
          />
        </div>
        <div className="col-8">
          <Field
            component={InputText}
            label="Componentes do Produto"
            name={`componentes_produto`}
            placeholder="Digite o Número do Registro do Órgão Competente"
            className="input-ficha-tecnica"
            required
            validate={required}
            tooltipText={
              "Caso utilizado aditivos alimentares, deverá ser declarada a função principal, nome completo e número INS de todos."
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="label-radio">
            <span className="required-asterisk">*</span>O Produto contém ou pode
            conter ingredientes/aditivos alergênicos?
          </p>
          <label className="container-radio">
            Não
            <Field
              component="input"
              type="radio"
              value="0"
              name={`alergenicos`}
              validate={required}
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            Sim
            <Field
              component="input"
              type="radio"
              value="1"
              name={`alergenicos`}
              validate={required}
            />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      {values.alergenicos === "1" && (
        <div className="row">
          <div className="col-12">
            <Field
              component={InputText}
              label="Quais ingredientes/aditivos alergênicos? Indicar conforme a RDC Nº727/22, Anvisa."
              name={`ingredientes_alergenicos`}
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <p className="label-radio">
            <span className="required-asterisk">*</span>O Produto contém glúten?
            Indicar conforme Lei Federal Nº 10.674/03, Anvisa.
          </p>
          <label className="container-radio">
            Não contém glúten
            <Field
              component="input"
              type="radio"
              value="0"
              name={`gluten`}
              validate={required}
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            Contém glúten
            <Field
              component="input"
              type="radio"
              value="1"
              name={`gluten`}
              validate={required}
            />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="label-radio">
            <span className="required-asterisk">*</span>O Produto contém
            lactose?
          </p>
          <label className="container-radio">
            Não
            <Field
              component="input"
              type="radio"
              value="0"
              name={`lactose`}
              validate={required}
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            Sim
            <Field
              component="input"
              type="radio"
              value="1"
              name={`lactose`}
              validate={required}
            />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      {values.lactose === "1" && (
        <div className="row">
          <div className="col-12">
            <Field
              component={InputText}
              label="Detalhar: Indicar conforme a RDC Nº 727/22, Anvisa."
              name={`lactose_detalhe`}
              className="input-ficha-tecnica"
              required
              validate={required}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormNaoPereciveis;
