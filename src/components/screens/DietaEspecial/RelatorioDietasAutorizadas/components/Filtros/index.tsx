import React from "react";
import { Select as SelectAntd } from "antd";
import { Field } from "react-final-form";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import { ASelect } from "components/Shareable/MakeField";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import "./styles.scss";

type FiltrosProps = {
  onSubmit: (_values: any) => void;
  onClear: () => void;
  dres: {
    id: number;
    dre: string;
  }[];
  escolas: {
    id: number;
    unidade_educacional: string;
  }[];
  tiposGestao: {
    id: number;
    tipo_gestao: string;
  }[];
  tiposUnidade: {
    id: number;
    tipo_unidade: string;
  }[];
};

export function Filtros({
  onSubmit,
  onClear,
  dres,
  escolas,
  tiposGestao,
  tiposUnidade,
}: FiltrosProps) {
  const filtrarOpcoes = (value, option) => {
    return option.children
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase());
  };

  return (
    <CollapseFiltros
      onSubmit={onSubmit}
      onClear={onClear}
      titulo="Filtrar Resultados"
    >
      {(values, form) => (
        <div className="row">
          <div className="col-4">
            <Field
              name="tipo_gestao"
              label="Tipo de Gestão"
              component={ASelect}
              showSearch
              filterOption={filtrarOpcoes}
            >
              <SelectAntd.Option value="">
                Selecione o tipo de gestão
              </SelectAntd.Option>

              {tiposGestao.map((tipo) => (
                <SelectAntd.Option key={tipo.id}>
                  {tipo.tipo_gestao}
                </SelectAntd.Option>
              ))}
            </Field>
          </div>

          <div className="col-4">
            <label className="label fw-bold">Tipo de Unidade:</label>
            <Field
              name="tipo_unidade"
              component={StatefulMultiSelect}
              selected={values.tipo_unidade || []}
              options={tiposUnidade.map((tipo) => ({
                label: tipo.tipo_unidade,
                value: tipo.id,
              }))}
              onSelectedChanged={(value) => {
                form.change("tipo_unidade", value);
              }}
              overrideStrings={{
                selectSomeItems: "Selecione o tipo de unidade",
                allItemsAreSelected:
                  "Todos os tipos de unidade estão selecionados",
                selectAll: "Todos",
              }}
            />
          </div>

          <div className="col-4">
            <Field
              name="dre"
              label="DRE"
              component={ASelect}
              showSearch
              filterOption={filtrarOpcoes}
            >
              <SelectAntd.Option value="">Selecione a DRE</SelectAntd.Option>

              {dres.map((data) => (
                <SelectAntd.Option key={data.id}>{data.dre}</SelectAntd.Option>
              ))}
            </Field>
          </div>

          <div className="col-4">
            <Field
              name="unidade_educacional"
              label="Unidade Educacional"
              component={ASelect}
              showSearch
              filterOption={filtrarOpcoes}
            >
              <SelectAntd.Option value="">
                Selecione a unidade
              </SelectAntd.Option>

              {escolas.map((data) => (
                <SelectAntd.Option key={data.id}>
                  {data.unidade_educacional}
                </SelectAntd.Option>
              ))}
            </Field>
          </div>
        </div>
      )}
    </CollapseFiltros>
  );
}
