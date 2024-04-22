import React from "react";

import { TabelaAlimentacaoCEI } from "./TabelaAlimentacaoCEI";
import TabelaAlimentacao from "./TabelaAlimentacao";
import TabelaDietaTipoA from "./TabelaDietaTipoA";
import TabelaDietaTipoB from "./TabelaDietaTipoB";
import TabelaDietasCEI from "./TabelaDietasCEI";

import { FormApi } from "final-form";

type Props = {
  form: FormApi<any, any>;
  faixasEtarias: Array<any>;
  tiposAlimentacao: Array<any>;
  grupoSelecionado: string;
};

export default ({
  form,
  faixasEtarias,
  tiposAlimentacao,
  grupoSelecionado,
}: Props) => {
  return (
    <div className="container-tabelas-cei">
      <TabelaAlimentacaoCEI
        faixasEtarias={faixasEtarias}
        grupoSelecionado={grupoSelecionado}
        periodo="Integral"
      />
      <TabelaAlimentacaoCEI
        faixasEtarias={faixasEtarias}
        grupoSelecionado={grupoSelecionado}
        periodo="Parcial"
      />

      <TabelaAlimentacao
        tiposAlimentacao={tiposAlimentacao}
        grupoSelecionado={grupoSelecionado}
      />
      <div className="d-flex flex-column gap-4">
        <TabelaDietaTipoA
          form={form}
          tiposAlimentacao={tiposAlimentacao}
          grupoSelecionado={grupoSelecionado}
          nomeTabela="Dietas Tipo A"
        />
        <TabelaDietaTipoA
          form={form}
          tiposAlimentacao={tiposAlimentacao}
          grupoSelecionado={grupoSelecionado}
          nomeTabela="Dietas Tipo A Enteral"
        />
        <TabelaDietaTipoB
          form={form}
          tiposAlimentacao={tiposAlimentacao}
          grupoSelecionado={grupoSelecionado}
        />
      </div>

      <TabelaDietasCEI
        form={form}
        faixasEtarias={faixasEtarias}
        nomeTabela="Dietas Tipo A e Tipo A Enteral"
        periodo="Integral"
        grupoSelecionado={grupoSelecionado}
      />
      <TabelaDietasCEI
        form={form}
        faixasEtarias={faixasEtarias}
        grupoSelecionado={grupoSelecionado}
        nomeTabela="Dietas Tipo B"
        periodo="Integral"
      />

      <TabelaDietasCEI
        form={form}
        faixasEtarias={faixasEtarias}
        grupoSelecionado={grupoSelecionado}
        nomeTabela="Dietas Tipo A e Tipo A Enteral"
        periodo="Parcial"
      />
      <TabelaDietasCEI
        form={form}
        faixasEtarias={faixasEtarias}
        grupoSelecionado={grupoSelecionado}
        nomeTabela="Dietas Tipo B"
        periodo="Parcial"
      />
    </div>
  );
};
