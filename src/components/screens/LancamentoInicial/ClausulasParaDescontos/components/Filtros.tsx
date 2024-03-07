import React from "react";
import { Select as SelectAntd } from "antd";
import { Field } from "react-final-form";
import CollapseFiltros from "components/Shareable/CollapseFiltros";
import { ASelect, AInput, AInputNumber } from "components/Shareable/MakeField";

type FiltrosProps = {
  onSubmit: (_values: any) => void;
  onClear: () => void;
  editais: {
    uuid: string;
    numero: string;
  }[];
};

export function Filtros({ onSubmit, onClear, editais }: FiltrosProps) {
  const formataValor = (value: string) => {
    if (!value) return "";
    return `${value}`
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\.(?=\d{0,2}$)/g, ",");
  };

  const parserValor = (value: string) => {
    if (!value) return "";
    return Number.parseFloat(
      value.replace(/\$\s?|(\.*)/g, "").replace(/(,{1})/g, ".")
    ).toFixed(2);
  };

  return (
    <CollapseFiltros
      onSubmit={onSubmit}
      onClear={onClear}
      titulo="Filtrar Resultados"
    >
      {() => (
        <div className="row">
          <div className="col-4">
            <Field
              name="edital"
              label="Nº do Edital"
              component={ASelect}
              showSearch
              filterOption={(value: string, option: { label: string }) =>
                option!.label.toUpperCase().indexOf(value.toUpperCase()) !== -1
              }
            >
              <SelectAntd.Option value="">Selecione o edital</SelectAntd.Option>

              {editais.map((edital) => (
                <SelectAntd.Option key={edital.uuid}>
                  {edital.numero}
                </SelectAntd.Option>
              ))}
            </Field>
          </div>

          <div className="col-4">
            <Field
              name="numero_clausula"
              label="Cláusulas"
              placeholder="Digite uma cláusula"
              autoComplete="off"
              component={AInput}
            />
          </div>

          <div className="col-4">
            <Field
              name="porcentagem_desconto"
              label="% de Desconto"
              placeholder="Digite uma porcentagem"
              component={AInputNumber}
              min={0}
              formatter={(value: string) => formataValor(value)}
              parser={(value: string) => parserValor(value)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}
    </CollapseFiltros>
  );
}
