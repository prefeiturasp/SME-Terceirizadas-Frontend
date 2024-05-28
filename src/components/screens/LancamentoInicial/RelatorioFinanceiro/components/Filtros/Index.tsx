import React from "react";
import { Field } from "react-final-form";

import CollapseFiltros from "components/Shareable/CollapseFiltros";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import { Select } from "components/Shareable/Select";

type FiltrosProps = {
  onSubmit: (_values: any) => void;
  onClear: () => void;
  lotes: {
    value: string;
    label: string;
  }[];
  gruposUnidadeEscolar: {
    uuid: string;
    nome: string;
  }[];
  mesesAnos: {
    uuid: string;
    nome: string;
  }[];
};

export function Filtros({
  onSubmit,
  onClear,
  lotes,
  gruposUnidadeEscolar,
  mesesAnos,
}: FiltrosProps) {
  return (
    <div className="filtros-relatorio-financeiro">
      <CollapseFiltros
        onSubmit={onSubmit}
        onClear={onClear}
        titulo="Filtrar Resultados"
      >
        {() => (
          <div className="row">
            <div className="col-8">
              <Field
                component={MultiSelect}
                name="lote"
                label="Lote e DRE"
                placeholder="Selecione um lote e uma DRE"
                nomeDoItemNoPlural="lotes"
                naoDesabilitarPrimeiraOpcao
                options={lotes}
              />
            </div>

            <div className="col-4">
              <Field
                component={Select}
                name="grupo_unidade_escolar"
                label="Tipo de UE"
                naoDesabilitarPrimeiraOpcao
                options={gruposUnidadeEscolar}
              />
            </div>

            <div className="col-4">
              <Field
                component={Select}
                name="mes_ano"
                label="Mês de Referência"
                naoDesabilitarPrimeiraOpcao
                options={mesesAnos}
              />
            </div>
          </div>
        )}
      </CollapseFiltros>
    </div>
  );
}
