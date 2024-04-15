import React, { ReactNode } from "react";
import { Spin } from "antd";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";

export interface ModalGenericoProps {
  show: boolean;
  titulo: ReactNode;
  texto: ReactNode;
  loading?: boolean;
  handleClose: () => void;
  handleSim: () => void;
}

const ModalGenerico: React.FC<ModalGenericoProps> = ({
  show,
  handleClose,
  loading = false,
  handleSim,
  titulo,
  texto,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop={"static"}>
      <Spin tip="Carregando..." spinning={loading}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <strong>{titulo}</strong>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{texto}</p>
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

export default ModalGenerico;
