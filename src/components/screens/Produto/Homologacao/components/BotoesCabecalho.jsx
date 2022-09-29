import React, { useState } from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import ModalHistorico from "components/Shareable/ModalHistorico";
import { TIPO_PERFIL } from "constants/shared";
import { ModalPadrao } from "components/Shareable/ModalPadrao";
import {
  CODAEPedeAnaliseSensorialProduto,
  imprimeFichaIdentificacaoProduto
} from "services/produto.service";
import ModalAtivacaoSuspensaoProduto from "../../AtivacaoSuspensao/ModalAtivacaoSuspensaoProduto";

export const BotoesCabecalho = ({
  homologacao,
  getHomologacaoProdutoAsync,
  terceirizadas,
  protocoloAnalise
}) => {
  const ehGPCODAE =
    localStorage.getItem("tipo_perfil") === TIPO_PERFIL.GESTAO_PRODUTO;
  const [showModal, setShowModal] = useState(false);
  const [showModalAnaliseSensorial, setShowModalAnaliseSensorial] = useState(
    false
  );
  const [showModalSuspender, setShowModalSuspender] = useState(false);

  const checaStatus = status => {
    return ["CODAE_HOMOLOGADO", "ESCOLA_OU_NUTRICIONISTA_RECLAMOU"].includes(
      status
    );
  };

  const getHistorico = () => {
    getHomologacaoProdutoAsync();
    return homologacao.logs;
  };

  return (
    <div className="row">
      <ModalHistorico
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        logs={homologacao.logs}
        getHistorico={() => getHistorico}
      />
      <ModalPadrao
        showModal={showModalAnaliseSensorial}
        closeModal={() => setShowModalAnaliseSensorial(false)}
        toastSuccessMessage="Solicitação de análise sensorial enviada com sucesso"
        modalTitle="Deseja solicitar a análise sensorial do produto?"
        endpoint={CODAEPedeAnaliseSensorialProduto}
        uuid={homologacao.uuid}
        protocoloAnalise={protocoloAnalise}
        loadSolicitacao={() => getHomologacaoProdutoAsync()}
        justificativa={homologacao.justificativa}
        labelJustificativa="Informações Adicionais"
        helpText="Solicitamos que seja informado a quantidade e descrição para análise sensorial"
        eAnalise={true}
        terceirizadas={terceirizadas}
        status={homologacao.status}
        terceirizada={homologacao.rastro_terceirizada}
        tipoModal="analise"
      />
      <ModalAtivacaoSuspensaoProduto
        showModal={showModalSuspender}
        closeModal={() => setShowModalSuspender(false)}
        acao="suspensão"
        produto={homologacao.produto}
        idHomologacao={homologacao.uuid}
        atualizarDados={() => getHomologacaoProdutoAsync()}
      />
      <div className="col-12">
        <Botao
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          icon={BUTTON_ICON.PRINT}
          onClick={() => imprimeFichaIdentificacaoProduto(homologacao.uuid)}
          className="float-right"
        />
        <Botao
          type={BUTTON_TYPE.BUTTON}
          texto="Histórico"
          style={BUTTON_STYLE.GREEN_OUTLINE}
          onClick={() => setShowModal(true)}
          className="mr-2 float-right"
        />
        {checaStatus(homologacao.status) && ehGPCODAE && (
          <Botao
            texto="Suspender"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            onClick={() => setShowModalSuspender(true)}
            className="mr-2 float-right"
          />
        )}
        {homologacao.status === "CODAE_HOMOLOGADO" && ehGPCODAE && (
          <Botao
            texto="Solicitar análise sensorial"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => setShowModalAnaliseSensorial(true)}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="mr-2 float-right"
          />
        )}
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default BotoesCabecalho;
