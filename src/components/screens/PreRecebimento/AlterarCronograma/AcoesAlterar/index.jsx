import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { fornecedorConfirma } from "services/cronograma.service";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";

export default ({ cronograma, handleSubmit }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = () => {
    handleSubmit();
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.goBack();
  };

  return (
    <>
      <Botao
        texto="Enviar Solicitação"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN}
        className="float-right ml-3"
        onClick={() => handleShow()}
      />
      <Botao
        texto="Cancelar"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN_OUTLINE}
        className="float-right ml-3"
        onClick={() => handleBack()}
      />

      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title> Confirmar Cronograma </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Você confirma a entrega dos alimentos nas datas e quantidades
            descritas no cronograma de entrega: {cronograma.numero}?
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="Não"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => handleClose()}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Sim"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              onClick={() => handleSim()}
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </>
  );
};
