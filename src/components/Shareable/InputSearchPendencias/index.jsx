import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import { usuarioEhTerceirizada } from "helpers/utilities";
import {
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS
} from "configs/constants";
import "./style.scss";

export const InputSearchPendencias = props => {
  const ehTerceirizada = usuarioEhTerceirizada();
  const listaStatus = [
    { nome: "Conferência Status", uuid: "" },
    { nome: "Conferida", uuid: "1" },
    { nome: "Não Conferida", uuid: "0" }
  ];

  const defineColunas = () => {
    let classTitulo = "offset-9 col-3";
    if (
      ehTerceirizada &&
      window.location.pathname.includes("solicitacoes-dieta-especial")
    ) {
      classTitulo = "offset-6 col-3";
      if (
        [SOLICITACOES_AUTORIZADAS, SOLICITACOES_CANCELADAS].includes(
          props.tipoSolicitacao
        )
      ) {
        classTitulo = "offset-3 col-3";
      }
    }
    return classTitulo;
  };

  const classTitulo = defineColunas();

  return (
    <Form
      onSubmit={() => {}}
      initialValues={{}}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className={`${classTitulo}`}>
              <Field
                component={InputText}
                name="titulo"
                placeholder="Pesquisar"
              />
              <OnChange name="titulo">
                {() => {
                  props.filterList(values);
                }}
              </OnChange>
            </div>
            {ehTerceirizada && (
              <>
                {listaStatus &&
                  [SOLICITACOES_AUTORIZADAS, SOLICITACOES_CANCELADAS].includes(
                    props.tipoSolicitacao
                  ) && (
                    <div className="col-3">
                      <Field
                        component={Select}
                        options={listaStatus}
                        name="status"
                        placeholder="Conferência Status"
                        naoDesabilitarPrimeiraOpcao
                      />
                      <OnChange name="status">
                        {() => {
                          props.filterList(values);
                        }}
                      </OnChange>
                    </div>
                  )}
                {props.listaLotes &&
                  window.location.pathname.includes(
                    "solicitacoes-dieta-especial"
                  ) && (
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
                          props.filterList(values);
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
  );
};
