import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  usuarioEhCronograma,
  usuarioEhEmpresaFornecedor
} from "helpers/utilities";
import ModalEnviarSolicitacao from "../Modals/ModalEnviarSolicitacao";
import ModalAnalise from "../Modals/ModalAnalise";
import { dilogCienteSolicitacaoAlteracaoCronograma } from "services/cronograma.service";
import {
  PRE_RECEBIMENTO,
  SOLICITACAO_ALTERACAO_CRONOGRAMA
} from "configs/constants";

export default ({
  handleSubmit,
  podeSubmeter,
  solicitacaoAlteracaoCronograma
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = async () => {
    setLoading(true);
    handleSubmit();
    setLoading(false);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.goBack();
  };

  return (
    <>
      {usuarioEhEmpresaFornecedor() && (
        <Botao
          texto="Enviar Solicitação"
          type={BUTTON_TYPE.BUTTON}
          disabled={!podeSubmeter}
          style={BUTTON_STYLE.GREEN}
          className="float-right ml-3"
          onClick={() => {
            if (!podeSubmeter) {
              toastError("Selecione os campos obrigatórios");
              return;
            }
            handleShow();
          }}
        />
      )}
      {usuarioEhCronograma() &&
        solicitacaoAlteracaoCronograma.status === "Em análise" && (
          <Botao
            texto="Enviar DINUTRE"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            className="float-right ml-3"
            onClick={() => handleShow()}
          />
        )}
      <Botao
        texto="Voltar"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN_OUTLINE}
        className="float-right ml-3"
        onClick={() => handleBack()}
      />

      {usuarioEhEmpresaFornecedor() && (
        <ModalEnviarSolicitacao
          show={show}
          handleClose={handleClose}
          loading={loading}
          handleSim={handleSim}
        />
      )}
      {usuarioEhCronograma() && (
        <ModalAnalise
          show={show}
          handleClose={handleClose}
          loading={loading}
          handleSim={async values => {
            setLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const uuid = urlParams.get("uuid");
            const payload = {
              justificativa_cronograma: values["justificativa_cronograma"]
            };
            await dilogCienteSolicitacaoAlteracaoCronograma(uuid, payload)
              .then(() => {
                toastSuccess("Análise da alteração enviada com sucesso!");
                history.push(
                  `/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA}`
                );
              })
              .catch(() => {
                toastError("Ocorreu um erro ao salvar o Cronograma");
              });
            setLoading(false);
          }}
        />
      )}
    </>
  );
};
