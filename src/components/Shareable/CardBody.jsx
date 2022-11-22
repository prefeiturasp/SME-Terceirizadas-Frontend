import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import { usuarioEhTerceirizada } from "helpers/utilities";
import { Spin } from "antd";
import { TIPOS_SOLICITACOES_OPTIONS } from "constants/shared";
import { InputComData } from "./DatePicker";

const CardBody = props => {
  const ehTerceirizada = usuarioEhTerceirizada();
  const ehDashboardGestaoProduto = props.ehDashboardGestaoProduto;
  const filtrosDesabilitados = props.filtrosDesabilitados || false;
  const loadingDietas = props.loadingDietas || false;

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
                      (ehTerceirizada &&
                        props.listaStatus &&
                        props.listaLotes) ||
                      ehDashboardGestaoProduto
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
                        ? "offset-6 col-3"
                        : "offset-3 col-3"
                    }`}
                  >
                    {loadingDietas && (
                      <div>
                        <Spin
                          className="carregando-filtro"
                          tip="Carregando Filtro..."
                        />
                      </div>
                    )}
                    <Field
                      component={InputText}
                      name="titulo"
                      placeholder={loadingDietas ? "" : "Pesquisar"}
                      disabled={loadingDietas || filtrosDesabilitados}
                    />
                    <div className="warning-num-charac">
                      * mínimo de 3 caracteres
                    </div>
                    <OnChange name="titulo">
                      {(value, previous) => {
                        props.onChange(values, previous);
                      }}
                    </OnChange>
                  </div>
                  {ehDashboardGestaoProduto && (
                    <div className="col-3">
                      <Field
                        component={InputText}
                        name="marca"
                        placeholder="Busca da Marca"
                        disabled={filtrosDesabilitados}
                      />
                      <div className="warning-num-charac">
                        * mínimo de 3 caracteres
                      </div>
                      <OnChange name="marca">
                        {() => {
                          props.onChange(values);
                        }}
                      </OnChange>
                    </div>
                  )}
                </div>
                {ehTerceirizada && (
                  <div className="row">
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
                    <div className="col-3">
                      <Field
                        component={Select}
                        options={TIPOS_SOLICITACOES_OPTIONS}
                        name="tipo_solicitacao"
                        naoDesabilitarPrimeiraOpcao
                      />
                      <OnChange name="tipo_solicitacao">
                        {() => {
                          props.onChange(values);
                        }}
                      </OnChange>
                    </div>
                    <div className="col-3">
                      <Field
                        name="data_evento"
                        component={InputComData}
                        placeholder="Data do evento"
                      />
                      <OnChange name="data_evento">
                        {() => {
                          props.onChange(values);
                        }}
                      </OnChange>
                    </div>
                  </div>
                )}
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
