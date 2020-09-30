import moment from "moment";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Botao } from "components/Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import DietaConvencional from "./TabelaLancamento/DietaConvencional";
import DietaConvencionalFrequencia from "./TabelaLancamento/DietaConvencionalFrequencia";
import ObservacoesDiarias from "./TabelaLancamento/ObservacoesDiarias";
import DietaEspecial from "./TabelaLancamento/DietaEspecial";

import "./styles.scss";

function deveDesabilitarObservacoesDiarias(values) {
  console.log('deveDesabilitar', values)
  if (values.lanche_4h) {
    if (parseInt(values.lanche_4h) < parseInt(values.frequencia) / 2) {
      return true;
    }
  }
  return false;
}

export default ({
  textoCabecalho,
  cor,
  totalAlimentacoes,
  alimentacoesConvencionais,
  alimentacoesDietaA,
  alimentacoesDietaB
}) => {
  const [lancamentoAberto, setLancamentoAberto] = useState(true);
  const abreFechaLancamento = () => {
    setLancamentoAberto(!lancamentoAberto);
  };
  return (
    <div className="lancamento-por-periodo-card mt-3" style={{ color: cor }}>
      <div className="row">
        <div className="col-10 periodo-cabecalho">{textoCabecalho}</div>
        <div className="col-2 link-abrir">
          <p onClick={abreFechaLancamento}>
            {lancamentoAberto ? "Fechar" : "Abrir"}
          </p>
        </div>
      </div>
      <div className="row">
        <div
          className="col-2 total-alimentacoes"
          style={{ backgroundColor: cor }}
        >
          <span>{totalAlimentacoes || "0000"}</span>
          <span>TOTAL ALIMENTAÇÕES</span>
        </div>
        <div className="col-10 alimentacoes-por-tipo">
          <span>
            {alimentacoesConvencionais || "000"} alimentações convencionais
          </span>
          <span>
            {alimentacoesDietaA || "00"} alimentações para dieta especial A
          </span>
          <span>
            {alimentacoesDietaB || "00"} alimentações para dieta especial B
          </span>
        </div>
      </div>
      {lancamentoAberto && (
        <Form
          onSubmit={() => {}}
          initialValues={{
            frequencia: 420
          }}
          validate={formValues => {
            console.log('validate.formValues', formValues)
            if (formValues.lanche_4h && (parseInt(formValues.lanche_4h) < parseInt(formValues.frequencia) / 2) && formValues.obs_diarias_1 === undefined) {
                return {
                  FORM_ERROR: "Deve preencher observações diárias",
                  obs_diarias_1: "Deve preencher observações diárias"
                };
            }
          }}
          render={({ values, pristine, submitting, errors, error }) => (
            <>
              <div className="row">
                <pre>{JSON.stringify(errors, null, 4)}</pre>
              </div>
              <div className="row">
                <pre>{JSON.stringify(values, null, 4)}</pre>
              </div>
              <div className="row">
                <div className="col report-label-value">
                  <p className="value">Inserir novo lançamento</p>
                </div>
              </div>
              <div className="row">
                <div className="col-3 data-lancamento-container">
                  <form>
                    <OnChange name="data_lancamento">
                      {value => {
                        // eslint-disable-next-line no-console
                        console.log("OnChange", value);
                      }}
                    </OnChange>
                    <Field
                      component={InputComData}
                      name="data_lancamento"
                      label="Data do lançamento"
                      required
                      minDate={null}
                      maxDate={
                        values.data_final
                          ? moment(values.data_final, "DD/MM/YYYY")._d
                          : moment()._d
                      }
                    />
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="col-form-label">Dieta convencional</label>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <DietaConvencional formValues={values} />
                </div>
                <div className="col-8">
                  <DietaConvencionalFrequencia />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="col-form-label">
                    Dieta convencional <span>Grupo A</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <DietaEspecial formValues={values} />
                </div>
                <div className="col-2">
                  <ObservacoesDiarias
                    label="Refeição (somente dieta enteral)"
                    name="refeicao_enteral"
                  />
                </div>
                <div className="col-6">
                  <ObservacoesDiarias
                    label="Observações diárias"
                    name="obs_diarias_1"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="col-form-label">
                    Dieta convencional <span>Grupo B</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <DietaEspecial formValues={values} />
                </div>
                <div className="col-8">
                  <ObservacoesDiarias
                    label="Observações diárias"
                    name="obs_diarias_2"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-7 erros-formulario">
                  {errors.FORM_ERROR}
                </div>
                <div className="col-5 botoes-envio">
                  <Botao
                    texto="Solicitar liberação período"
                    disabled={pristine || submitting}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto="Lançar"
                    className="ml-3"
                    type={BUTTON_TYPE.SUBMIT}
                    disabled={pristine || submitting}
                    style={BUTTON_STYLE.GREEN}
                  />
                </div>
              </div>
            </>
          )}
        />
      )}
    </div>
  );
};
