import React from "react";
import Relatorio from "../../components/screens/DietaEspecial/Relatorio";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { ESCOLA, CODAE } from "../../configs/constants";
import { HOME } from "../Escola/constants";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao_";
import ModalNegarSolicitacao from "../../components/screens/DietaEspecial/Relatorio/componentes/ModalNegaDietaEspecial";
import { ModalCODAEQuestiona } from "../../components/Shareable/ModalCODAEQuestiona";
import {
  CODAENegaDietaEspecial,
  CODAEAutorizaDietaEspecial
} from "../../services/dietaEspecial.service";

class RelatorioBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/`,
        titulo: ""
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <Relatorio {...this.props} />
      </Page>
    );
  }
}

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalCancelarSolicitacao}
    toastNaoAprovaMensagem={"Dieta Especial cancelada com sucesso!"}
    textoBotaoNaoAprova="Cancelar"
  />
);

// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    visao={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={"Autorização de dieta especial realizada com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao autorizar a Dieta Especial"}
    endpointNaoAprovaSolicitacao={CODAENegaDietaEspecial}
    endpointAprovaSolicitacao={CODAEAutorizaDietaEspecial}
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
  />
);
