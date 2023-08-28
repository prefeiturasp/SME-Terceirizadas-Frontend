import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Select } from "components/Shareable/Select";
import InputText from "components/Shareable/Input/InputText";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import {
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
} from "configs/constants";
import "./style.scss";
import { ASelect } from "../MakeField";
import { SOLICITACOES_NEGADAS } from "configs/constants";

export const InputSearchPendencias = (props) => {
  const ehTerceirizada = usuarioEhEmpresaTerceirizada();
  const listaStatus = [
    { nome: "Conferência Status", uuid: "" },
    { nome: "Conferida", uuid: "1" },
    { nome: "Não Conferida", uuid: "0" },
  ];

  const verificaURLFiltros = () => {
    let path = window.location.pathname;
    return (
      path.includes("solicitacoes-dieta-especial") ||
      path.includes("terceirizada")
    );
  };

  const ehURLGestaoProduto = () => {
    let path = window.location.pathname;
    return path.includes("gestao-produto");
  };

  const verificaStatusFiltros = () => {
    return [
      SOLICITACOES_AUTORIZADAS,
      SOLICITACOES_CANCELADAS,
      SOLICITACOES_NEGADAS,
    ].includes(props.tipoSolicitacao);
  };

  const defineColunas = () => {
    let classTitulo = "offset-9 col-3";

    if (ehTerceirizada && verificaURLFiltros()) {
      classTitulo = "offset-6 col-3";
      if (verificaStatusFiltros()) {
        classTitulo = "offset-3 col-3";
      }
    } else if (ehURLGestaoProduto()) {
      classTitulo = "col-4";
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
            {ehURLGestaoProduto() && (
              <>
                <div className="col-4 produtos-edital">
                  <Field
                    component={ASelect}
                    showSearch
                    name="edital"
                    placeholder={"Número do Edital"}
                    initialValue={
                      props.propsProduto && props.propsProduto.editalProduto
                    }
                    options={[{ label: "Número do Edital", value: "" }].concat(
                      props.editais
                    )}
                  />
                  <OnChange name="edital">
                    {() => {
                      props.filterList(values);
                    }}
                  </OnChange>
                </div>
              </>
            )}
            <div className={`${classTitulo}`}>
              <Field
                component={InputText}
                name="titulo"
                placeholder="Pesquisar"
                disabled={props.disabled}
                initialValue={
                  (props.propsDieta && props.propsDieta.tituloDieta) ||
                  (props.propsProduto && props.propsProduto.nomeProduto)
                }
              />
              <OnChange name="titulo">
                {() => {
                  props.filterList(values);
                }}
              </OnChange>
              {ehURLGestaoProduto() && (
                <div className="warning-num-charac">
                  * mínimo de 3 caracteres
                </div>
              )}
            </div>
            {ehTerceirizada && (
              <>
                {listaStatus && verificaStatusFiltros() && (
                  <div className="col-3">
                    <Field
                      component={Select}
                      options={listaStatus}
                      name="status"
                      placeholder="Conferência Status"
                      naoDesabilitarPrimeiraOpcao
                      initialValue={
                        props.propsDieta && props.propsDieta.statusDieta
                      }
                    />
                    <OnChange name="status">
                      {() => {
                        props.filterList(values);
                      }}
                    </OnChange>
                  </div>
                )}
                {props.listaLotes && verificaURLFiltros() && (
                  <div className="col-3">
                    <Field
                      component={Select}
                      options={props.listaLotes}
                      name="lote"
                      placeholder="Selecione um Lote"
                      naoDesabilitarPrimeiraOpcao
                      initialValue={
                        props.propsDieta && props.propsDieta.loteDieta
                      }
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
            {ehURLGestaoProduto() && (
              <>
                <div className="col-4">
                  <Field
                    component={InputText}
                    name="marca"
                    placeholder="Busca da Marca"
                    initialValue={
                      props.propsProduto && props.propsProduto.marcaProduto
                    }
                  />
                  <div className="warning-num-charac">
                    * mínimo de 3 caracteres
                  </div>
                  <OnChange name="marca">
                    {() => {
                      props.filterList(values);
                    }}
                  </OnChange>
                </div>
              </>
            )}
          </div>
        </form>
      )}
    />
  );
};

export default InputSearchPendencias;
