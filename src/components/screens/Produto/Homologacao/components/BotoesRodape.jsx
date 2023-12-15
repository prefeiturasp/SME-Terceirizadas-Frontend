import React, { useState } from "react";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON,
} from "components/Shareable/Botao/constants";
import {
  CODAECancelaAnaliseSensorialProduto,
  imprimeFichaIdentificacaoProduto,
} from "services/produto.service";
import { useHistory } from "react-router-dom";
import { usuarioEhCODAEGestaoProduto } from "helpers/utilities";
import { ModalPadrao } from "components/Shareable/ModalPadrao";
import { PAINEL_GESTAO_PRODUTO } from "configs/constants";

export const BotoesRodape = ({ homologacao, ehCardSuspensos }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const params = {
    eh_card_suspensos: ehCardSuspensos,
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
        loadSolicitacao={() => history.push(`/${PAINEL_GESTAO_PRODUTO}`)}
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
          className="float-end"
        />
        {usuarioEhCODAEGestaoProduto() &&
          homologacao.status === "CODAE_PEDIU_ANALISE_SENSORIAL" && (
            <Botao
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              texto="Cancelar Análise Sensorial"
              icon={BUTTON_ICON.TIMES_CIRCLE}
              onClick={() => setShowModal(true)}
              className="mr-2 float-end"
            />
          )}

        <Botao
          type={BUTTON_TYPE.BUTTON}
          texto="Voltar"
          style={BUTTON_STYLE.GREEN_OUTLINE}
          icon={BUTTON_ICON.ARROW_LEFT}
          onClick={() => history.goBack()}
          className="mr-2 float-end"
        />
      </div>
    </div>
  );
};
export default BotoesRodape;
