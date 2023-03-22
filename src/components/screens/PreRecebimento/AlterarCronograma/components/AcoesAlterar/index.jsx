import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import { usuarioEhCronograma, usuarioEhFornecedor } from "helpers/utilities";
import ModalEnviarSolicitacao from "../Modals/ModalEnviarSolicitacao";
import ModalAnalise from "../Modals/ModalAnalise";

export default ({ handleSubmit, podeSubmeter }) => {
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
      {usuarioEhFornecedor() && (
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
      {usuarioEhCronograma() && (
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

      {usuarioEhFornecedor() && (
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
          handleSim={handleSim}
        />
      )}
    </>
  );
};
