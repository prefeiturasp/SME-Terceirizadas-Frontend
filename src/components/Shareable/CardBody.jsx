import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import { usuarioEhTerceirizada } from "helpers/utilities";

const CardBody = props => {
  const ehTerceirizada = usuarioEhTerceirizada();

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="card-title font-weight-bold dashboard-card-title">
          <Form
            onSubmit={() => {}}
            initialValues={{}}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div
                    className={`${
                      ehTerceirizada && props.listaStatus && props.listaLotes
                        ? "col-3"
                        : "col-6"
                    }`}
                  >
                    <span>{props.titulo}</span>
                    <p className="current-date">
                      Data: <span>{props.dataAtual}</span>
                    </p>
                  </div>
                  <div
                    className={`${
                      ehTerceirizada && props.listaStatus && props.listaLotes
                        ? "col-3"
                        : "offset-3 col-3"
                    }`}
                  >
                    <Field
                      component={InputText}
                      name="titulo"
                      placeholder="Pesquisar"
                    />
                    <OnChange name="titulo">
                      {() => {
                        props.onChange(values);
                      }}
                    </OnChange>
                  </div>
                  {ehTerceirizada && (
                    <>
                      {props.listaStatus && (
                        <div className="col-3">
                          <Field
                            component={Select}
                            options={props.listaStatus}
                            name="status"
                            placeholder="Conferência Status"
                            naoDesabilitarPrimeiraOpcao
                          />
                          <OnChange name="status">
                            {() => {
                              props.onChange(values);
                            }}
                          </OnChange>
                        </div>
                      )}
                      {props.listaLotes && (
                        <div className="col-3">
                          <Field
                            component={Select}
                            options={props.listaLotes}
                            name="lote"
                            placeholder="Selecione um Lote"
                            naoDesabilitarPrimeiraOpcao
                          />
                          <OnChange name="lote">
                            {() => {
                              props.onChange(values);
                            }}
                          </OnChange>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </form>
            )}
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default CardBody;
