import React from "react";

import { TabelaAlimentacaoCEI } from "./TabelaAlimentacaoCEI";
import TabelaDietasCEI from "./TabelaDietasCEI";

import { FormApi } from "final-form";

type Props = {
  form: FormApi<any, any>;
  faixasEtarias: Array<any>;
  grupoSelecionado: string;
};

export default ({ form, faixasEtarias, grupoSelecionado }: Props) => {
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

      <TabelaDietasCEI
        form={form}
        faixasEtarias={faixasEtarias}
        grupoSelecionado={grupoSelecionado}
        nomeTabela="Dietas Tipo A e Tipo A Enteral"
        periodo="Integral"
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
