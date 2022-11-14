import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { escolaCancelarSolicitacaoDeAlteracaoDeCardapioCEMEI } from "services/alteracaoDeCardapio";
import { getMotivosDREnaoValida } from "services/relatorios";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { Relatorio } from "components/AlteracaoDeCardapioCEMEI/Relatorio";
import Page from "components/Shareable/Page/Page";
import { ESCOLA } from "configs/constants";
import { HOME } from "constants/config";

export const RelatorioBase = ({ ...props }) => {
  const [motivosDREnaoValida, setMotivosDREnaoValida] = useState();

  useEffect(() => {
    const getMotivosDREnaoValidaData = async () => {
      const response = await getMotivosDREnaoValida();
      if (response.status === HTTP_STATUS.OK) {
        setMotivosDREnaoValida(response.data.results);
      }
    };
    getMotivosDREnaoValidaData();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const uuid = urlParams.get("uuid");

  const anteriores = [
    {
      href: `#`,
      titulo: "Gestão de Alimentação"
    },
    {
      href: `/painel-gestao-alimentacao`,
      titulo: "Painel de Solicitações"
    }
  ];

  const atual = {
    href: `/alteracao-do-tipo-de-alimentacao-cemei/relatorio?uuid=${uuid}&ehInclusaoContinua=false&tipoSolicitacao=solicitacao-cemei&card=undefined`,
    titulo: "Relatório"
  };

  return (
    <Page>
      <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
      <Relatorio motivosDREnaoValida={motivosDREnaoValida} {...props} />
    </Page>
  );
};

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    endpointNaoAprovaSolicitacao={
      escolaCancelarSolicitacaoDeAlteracaoDeCardapioCEMEI
    }
  />
);
