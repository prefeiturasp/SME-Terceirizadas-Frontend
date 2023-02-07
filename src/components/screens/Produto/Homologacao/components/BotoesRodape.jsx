import React, { useState } from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import {
  CODAECancelaAnaliseSensorialProduto,
  imprimeFichaIdentificacaoProduto
} from "services/produto.service";
import { useHistory } from "react-router-dom";
import { usuarioEhCODAEGestaoProduto } from "helpers/utilities";
import { ModalPadrao } from "components/Shareable/ModalPadrao";

export const BotoesRodape = ({
  homologacao,
  ehCardSuspensos,
  getHomologacaoProdutoAsync
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const params = {
    eh_card_suspensos: ehCardSuspensos
  };

  return (
    <div className="row">
      <ModalPadrao
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        toastSuccessMessage="Análise Sensorial cancelada com sucesso"
        modalTitle="Deseja cancelar a solicitação de amostra para análise sensorial deste produto?"
        labelJustificativa="Justificativa"
        uuid={homologacao.uuid}
        cancelaAnaliseSensorial={homologacao}
        endpoint={CODAECancelaAnaliseSensorialProduto}
        loadSolicitacao={() => getHomologacaoProdutoAsync()}
      />
      <div className="col-12">
        <Botao
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          texto="Imprimir"
          icon={BUTTON_ICON.PRINT}
          onClick={() =>
            imprimeFichaIdentificacaoProduto(homologacao.uuid, params)
          }
          className="float-right"
        />
        {usuarioEhCODAEGestaoProduto() &&
          homologacao.status === "CODAE_PEDIU_ANALISE_SENSORIAL" && (
            <Botao
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              texto="Cancelar Análise Sensorial"
              icon={BUTTON_ICON.TIMES_CIRCLE}
              onClick={() => setShowModal(true)}
              className="mr-2 float-right"
            />
          )}

        <Botao
          type={BUTTON_TYPE.BUTTON}
          texto="Voltar"
          style={BUTTON_STYLE.GREEN_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={() => history.goBack()}
          className="mr-2 float-right"
        />
      </div>
    </div>
  );
};
export default BotoesRodape;
