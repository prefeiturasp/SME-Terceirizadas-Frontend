import React from "react";
import { Field } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { required } from "helpers/fieldValidators";
import { OnChange } from "react-final-form-listeners";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";
import { cpfMask, telefoneMask } from "constants/shared";

export const AdministradorSistemaFormSet = ({
  ehDistribuidor,
  superUser,
  setSuperUser
}) => {
  return (
    <>
      {!ehDistribuidor && (
        <>
          <hr className="linha-form" />
          <div>
            <div className="card-body">
              <div className="card-title green font-weight-bold">
                Principal administrador do sistema
              </div>
              <div className="row">
                <div className="col">
                  <Field
                    name="superuser_email"
                    component={InputText}
                    label="E-mail"
                    type="email"
                    required
                    validate={required}
                    maxlength="140"
                  />
                  <OnChange name="superuser_email">
                    {value => setSuperUser({ ...superUser, email: value })}
                  </OnChange>
                </div>
                <div className="col">
                  <Field
                    name="superuser_nome"
                    component={InputText}
                    label={"Nome"}
                    validate={required}
                    required
                    maxlength="140"
                  />
                  <OnChange name="superuser_nome">
                    {value => setSuperUser({ ...superUser, nome: value })}
                  </OnChange>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <Field
                    name="superuser_cpf"
                    component={MaskedInputText}
                    mask={cpfMask}
                    label="CPF"
                    required
                    validate={required}
                  />
                  <OnChange name="superuser_cpf">
                    {value => setSuperUser({ ...superUser, cpf: value })}
                  </OnChange>
                </div>
                <div className="col">
                  <Field
                    name="superuser_telefone"
                    component={MaskedInputText}
                    mask={telefoneMask}
                    label={"Telefone"}
                    validate={required}
                    required
                  />
                  <OnChange name="superuser_telefone">
                    {value => setSuperUser({ ...superUser, telefone: value })}
                  </OnChange>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="superuser_cargo"
                    component={InputText}
                    label="Cargo"
                    required
                    validate={required}
                    maxlength="50"
                  />
                  <OnChange name="superuser_cargo">
                    {value => setSuperUser({ ...superUser, cargo: value })}
                  </OnChange>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
