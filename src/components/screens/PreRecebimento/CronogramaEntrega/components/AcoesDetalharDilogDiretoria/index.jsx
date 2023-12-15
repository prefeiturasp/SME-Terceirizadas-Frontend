import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { codaeAssinaCronograma } from "services/cronograma.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  CRONOGRAMA_ENTREGA,
  PRE_RECEBIMENTO,
} from "../../../../../../configs/constants";
import { ModalAssinaturaUsuario } from "components/Shareable/ModalAssinaturaUsuario";
import { MSG_SENHA_INVALIDA } from "components/screens/helper";

export default ({ cronograma }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = (password) => {
    setLoading(true);
    codaeAssinaCronograma(cronograma.uuid, password)
      .then((response) => {
        if (response.status === 200) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setShow(false);
          setLoading(false);
          if (!history.goBack()) {
            history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
          }
          toastSuccess("Cronograma assinado com sucesso!");
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          toastError(MSG_SENHA_INVALIDA);
        } else {
          toastError(e.response.data.detail);
        }
        setLoading(false);
      });
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.goBack();
  };

  return (
    <>
      {cronograma.status === "Assinado Dinutre" && (
        <Botao
          texto="Assinar Cronograma"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="float-end ms-3"
          onClick={() => handleShow()}
        />
      )}

      <Botao
        texto="Voltar"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN_OUTLINE}
        className="float-end ms-3"
        onClick={() => handleBack()}
      />

      <ModalAssinaturaUsuario
        titulo="Assinar Cronograma"
        texto={`Você confirma a assinatura digital do cronograma de entrega ${cronograma.numero}?`}
        show={show}
        loading={loading}
        handleClose={handleClose}
        handleSim={handleSim}
      />
    </>
  );
};
