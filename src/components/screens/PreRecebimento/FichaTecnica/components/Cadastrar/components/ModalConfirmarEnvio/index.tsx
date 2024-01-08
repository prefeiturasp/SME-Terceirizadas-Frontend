import React from "react";
import { Spin } from "antd";
import { Modal } from "react-bootstrap";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";

interface Props {
  show: boolean;
  carregando: boolean;
  handleClose(): void;
  handleSim(): void;
}

const ModalConfirmarEnvio: React.FC<Props> = ({
  show,
  carregando,
  handleClose,
  handleSim,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop={"static"}>
      <Spin tip="Carregando..." spinning={carregando}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Assinar Ficha Técnica</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Você confirma o preenchimento correto de todas as informações
            solicitadas na ficha técnica?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Botao
            texto="Não"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => handleClose()}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ms-3"
          />
          <Botao
            texto="Sim"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            className="ms-3"
            onClick={() => handleSim()}
          />
        </Modal.Footer>
      </Spin>
    </Modal>
  );
};

export default ModalConfirmarEnvio;
