import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { fornecedorAssinaCronograma } from "services/cronograma.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  CRONOGRAMA_ENTREGA,
  PRE_RECEBIMENTO
} from "../../../../../../configs/constants";
import { ModalAssinaturaUsuario } from "components/Shareable/ModalAssinaturaUsuario";

export default ({ cronograma }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = password => {
    setLoading(true);
    fornecedorAssinaCronograma(cronograma.uuid, password)
      .then(response => {
        if (response.status === 200) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setShow(false);
          setLoading(false);
          history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
          toastSuccess("Cronograma assinado com sucesso!");
        }
      })
      .catch(() => {
        setShow(false);
        setLoading(false);
        toastError("Senha inválida.");
      });
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.goBack();
  };

  return (
    <>
      {cronograma.status === "Enviado ao Fornecedor" && (
        <Botao
          texto="Assinar Cronograma"
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

      <ModalAssinaturaUsuario
        titulo="Assinar Cronograma"
        texto={`Você confirma a entrega dos alimentos nas datas e quantidades
        descritas no cronograma de entrega ${cronograma.numero}?`}
        show={show}
        loading={loading}
        handleClose={handleClose}
        handleSim={handleSim}
      />
    </>
  );
};
