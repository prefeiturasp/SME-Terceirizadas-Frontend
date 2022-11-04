import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getMotivosDREnaoValida } from "services/relatorios";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { HOME } from "constants/config";
import { RelatorioInclusaoDeAlimentacaoCEMEI } from "components/InclusaoDeAlimentacaoCEMEI/Relatorio";
import { ESCOLA } from "configs/constants";
import { ModalCancelarInclusaoAlimentacao } from "components/Shareable/ModalCancelarInclusaoAlimentacao";
import { escolaCancelarSolicitacaoDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { TIPO_SOLICITACAO } from "constants/shared";

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

  const anteriores = [
    {
      href: `/painel-gestao-alimentacao`,
      titulo: "Gestão de Alimentação"
    },
    {
      href: `/painel-gestao-alimentacao`,
      titulo: "Painel de Solicitações"
    }
  ];

  const atual = {
    href: "#",
    titulo: "Relatório"
  };

  return (
    <Page botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
      <RelatorioInclusaoDeAlimentacaoCEMEI
        motivosDREnaoValida={motivosDREnaoValida}
        {...props}
      />
    </Page>
  );
};

// Escola
export const RelatorioEscola = () => {
  return (
    <RelatorioBase
      visao={ESCOLA}
      ModalNaoAprova={ModalCancelarInclusaoAlimentacao}
      toastNaoAprovaMensagem={"Inclusão de Alimentação cancelada com sucesso!"}
      endpointNaoAprovaSolicitacao={
        escolaCancelarSolicitacaoDeInclusaoDeAlimentacao
      }
      textoBotaoNaoAprova="Cancelar"
      tipoSolicitacao={TIPO_SOLICITACAO.SOLICITACAO_CEMEI}
    />
  );
};
