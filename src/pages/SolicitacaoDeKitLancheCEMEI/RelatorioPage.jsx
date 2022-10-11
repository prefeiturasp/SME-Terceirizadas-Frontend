import React from "react";
import { ESCOLA, TERCEIRIZADA } from "configs/constants";
import {
  cancelaFluxoSolicitacaoKitLancheCEMEI,
  terceirizadaRespondeQuestionamentoKitLanche,
  terceirizadaTomaCienciaKitLanche
} from "services/kitLanche";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { Relatorio } from "components/SolicitacaoKitLancheCEMEI/Relatorio";
import { ModalKitLanche } from "components/SolicitacaoKitLancheCEMEI/Relatorio/components/ModalKitLancheCEMEI";
import { ModalTerceirizadaRespondeQuestionamento } from "components/Shareable/ModalTerceirizadaRespondeQuestionamento";

export const RelatorioBase = ({ ...props }) => {
  const atual = {
    href: "#",
    titulo: "Relatório"
  };

  return (
    <Page>
      <Breadcrumb home="/" atual={atual} />
      <Relatorio {...props} />
    </Page>
  );
};

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalKitLanche}
    toastNaoAprovaMensagem={"Kit Lanche Passeio cancelado com sucesso!"}
    endpointNaoAprovaSolicitacao={cancelaFluxoSolicitacaoKitLancheCEMEI}
    textoBotaoNaoAprova="Cancelar"
  />
);

export const RelatorioTerceirizada = () => (
  <RelatorioBase
    visao={TERCEIRIZADA}
    ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
    ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
    toastAprovaMensagem={"Ciência de Kit Lanche Passeio enviado com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência do Kit Lanche Passeio"
    }
    endpointAprovaSolicitacao={terceirizadaTomaCienciaKitLanche}
    endpointNaoAprovaSolicitacao={terceirizadaRespondeQuestionamentoKitLanche}
    endpointQuestionamento={terceirizadaRespondeQuestionamentoKitLanche}
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
