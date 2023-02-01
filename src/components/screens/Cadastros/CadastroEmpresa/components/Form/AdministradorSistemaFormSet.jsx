import React from "react";
import { Field } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";

export const AdministradorSistemaFormSet = ({ ehDistribuidor }) => {
  return (
    <>
      {!ehDistribuidor && (
        <>
          <hr className="linha-form my-3" />
          <div>
            <div className="card-title font-weight-bold">
              Principal administrador do sistema
            </div>
            <div className="row">
              <div className="col">
                <Field
                  name={`email`}
                  component={InputText}
                  label="E-mail"
                  type="email"
                  required
                  validate={required}
                  maxlength="140"
                />
              </div>
              <div className="col">
                <Field
                  name={`nome`}
                  component={InputText}
                  label={"Nome"}
                  validate={required}
                  required
                  maxlength="140"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Field
                  name={`cpf`}
                  component={InputText}
                  label="CPF"
                  required
                  validate={required}
                />
              </div>
              <div className="col">
                <Field
                  name={`telefone`}
                  component={InputText}
                  label={"Telefone"}
                  validate={required}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  name={`cargo`}
                  component={InputText}
                  label="Cargo"
                  required
                  validate={required}
                  maxlength="50"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
