import React, { ReactNode } from "react";
import { Spin } from "antd";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";

interface Props {
  show: boolean;
  handleClose(): void;
  loading: boolean;
  handleSim(): void;
  titulo: ReactNode;
  texto: ReactNode;
}

const ModalGenerico: React.FC<Props> = ({
  show,
  handleClose,
  loading,
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
  );
};

export default ModalGenerico;
