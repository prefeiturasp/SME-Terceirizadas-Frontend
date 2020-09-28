import { InputComData } from "components/Shareable/DatePicker";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import DietaConvencional from "./TabelaLancamento/DietaConvencional";
import DietaConvencionalFrequencia from "./TabelaLancamento/DietaConvencionalFrequencia";
import ObservacoesDiarias from "./TabelaLancamento/ObservacoesDiarias";
import DietaEspecial from "./TabelaLancamento/DietaEspecial";

import "./styles.scss";

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
        <>
          <div className="row">
            <div className="col report-label-value">
              <p className="value">Inserir novo lançamento</p>
            </div>
          </div>
          <div className="row">
            <div className="col-3 data-lancamento-container">
              <Form
                onSubmit={() => {}}
                render={() => (
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
                    />
                  </form>
                )}
              />
            </div>
          </div>
          <div className="row">
            <div className="col report-label-value">
              <p className="value">Dieta convencional</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <DietaConvencional />
            </div>
            <div className="col-8">
              <DietaConvencionalFrequencia />
            </div>
          </div>
          <div className="row">
            <div className="col report-label-value">
              <p className="value">
                Dieta convencional <span>Grupo A</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <DietaEspecial label="Grupo A" />
            </div>
            <div className="col-2">
              <ObservacoesDiarias
                nome_campo="Refeição (somente dieta enteral)"
                valor="9999"
              />
            </div>
            <div className="col-6">
              <ObservacoesDiarias
                nome_campo="Observações diárias"
                valor="Absccflasdkgdpg DAflsdfasdfasdf"
              />
            </div>
          </div>
          <div className="row">
            <div className="col report-label-value">
              <p className="value">
                Dieta convencional <span>Grupo B</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <DietaEspecial label="Grupo B" />
            </div>
            <div className="col-8">
              <ObservacoesDiarias
                nome_campo="Observações diárias"
                valor="Absccflasdkgdpg DAflsdfasdfasdf"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
