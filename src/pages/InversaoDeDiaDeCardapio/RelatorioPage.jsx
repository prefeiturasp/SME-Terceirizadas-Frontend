import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { getMotivosDREnaoValida } from "services/relatorios";
import { Container } from "components/InversaoDeDiaDeCardapio/Container";
import Relatorio from "components/InversaoDeDiaDeCardapio/Relatorio";
import Breadcrumb from "components/Shareable/Breadcrumb";
import ModalCancelarSolicitacao from "components/Shareable/ModalCancelarSolicitacao_";
import { ModalCODAEQuestiona } from "components/Shareable/ModalCODAEQuestiona";
import { ModalNaoValidarSolicitacao } from "components/Shareable/ModalNaoValidarSolicitacaoReduxForm";
import ModalNegarSolicitacao from "components/Shareable/ModalNegarSolicitacao";
import { ModalTerceirizadaRespondeQuestionamento } from "components/Shareable/ModalTerceirizadaRespondeQuestionamento";
import Page from "components/Shareable/Page/Page";
import { CODAE, DRE, ESCOLA, TERCEIRIZADA } from "configs/constants";
import { HOME } from "constants/config";
import {
  CODAEAutorizaPedidoDRE,
  CODAENegaInversaoDeDiaDeCardapio,
  CODAEQuestionaInversaoDeDiaDeCardapio,
  DRENegaInversaoDeDiaDeCardapio,
  dreValidaPedidoEscola,
  escolaCancelaInversaoDiaCardapio,
  TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio,
  terceirizadaTomaCiencia,
} from "services/inversaoDeDiaDeCardapio.service";
import { ModalAprovarGenericoSimOpcional } from "components/Shareable/ModalAprovarGenericoSimOpcional";

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

  const atual = {
    href: "#",
    titulo: "Relatório",
  };

  return (
    <Page botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} />
      <Relatorio motivosDREnaoValida={motivosDREnaoValida} {...props} />
    </Page>
  );
};

export class InversaoDeDiaDeCardapioPage extends React.Component {
  render() {
    const atual = {
      href: "/escola/inversao-de-dia-de-cardapio",
      titulo: "Inversão de dia de Cardápio",
    };
    return (
      <Page titulo={atual.titulo} botaoVoltar>
        <Breadcrumb home={HOME} atual={atual} />
        <Container />
      </Page>
    );
  }
}

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalCancelarSolicitacao}
    toastNaoAprovaMensagem={
      "Inversão de dia de Cardápio cancelada com sucesso!"
    }
    endpointNaoAprovaSolicitacao={escolaCancelaInversaoDiaCardapio}
    textoBotaoNaoAprova="Cancelar"
  />
);
// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    visao={DRE}
    endpointAprovaSolicitacao={dreValidaPedidoEscola}
    endpointNaoAprovaSolicitacao={DRENegaInversaoDeDiaDeCardapio}
    ModalNaoAprova={ModalNaoValidarSolicitacao}
    toastAprovaMensagem={"Inversão de dia de Cardápio validada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao validar a Inversão de dia de Cardápio"
    }
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);

export const RelatorioCODAE = () => (
  <RelatorioBase
    visao={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    ModalCodaeAutoriza={ModalAprovarGenericoSimOpcional}
    HandleAprovaPedido={CODAEAutorizaPedidoDRE}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={"Inversão de dia de Cardápio autorizada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Inversão de dia de Cardápio"
    }
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
    endpointNaoAprovaSolicitacao={CODAENegaInversaoDeDiaDeCardapio}
    endpointAprovaSolicitacao={CODAEAutorizaPedidoDRE}
    endpointQuestionamento={CODAEQuestionaInversaoDeDiaDeCardapio}
  />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    visao={TERCEIRIZADA}
    ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
    ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
    endpointQuestionamento={
      TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio
    }
    toastAprovaMensagem={
      "Ciência de Inversão de dia de Cardápio enviado com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência da Inversão de dia de Cardápio"
    }
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
    endpointAprovaSolicitacao={terceirizadaTomaCiencia}
    endpointNaoAprovaSolicitacao={
      TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio
    }
  />
);
