import React, { useState } from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { DashboardNutrisupervisao } from "components/screens/DashboardNutricionista/DashboardNutrisupervisao";

export default () => {
  const [filtroTipoSolicitacao] = useState([
    {
      nome: "Tipo de Solicitação",
      uuid: ""
    },
    {
      nome: "Inclusão de Autorização",
      uuid: "inclusão"
    },
    {
      nome: "Alteração do Tipo de Alimentação",
      uuid: "alteração"
    },
    {
      nome: "Kit Lanche Passeio",
      uuid: "Kit Lanche Passeio"
    },
    {
      nome: "Kit Lanche Passeio Unificado",
      uuid: "Kit Lanche Passeio Unificado"
    },
    {
      nome: "Inversão de dia de Cardápio",
      uuid: "inversão"
    },
    {
      nome: "Suspensão de Alimentação",
      uuid: "suspensão"
    }
  ]);
  return (
    <div>
      <Page>
        <Breadcrumb home={"/"} />
        <DashboardNutrisupervisao
          filtroPorSolicitacao={filtroTipoSolicitacao}
        />
      </Page>
    </div>
  );
};
