import React from "react";
import { Spin } from "antd";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { TextArea } from "components/Shareable/TextArea/TextArea";

import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { Field } from "react-final-form";
import { useState } from "react";
export default ({ show, handleClose, loading, handleSim }) => {
  const [confirmar, setConfirmar] = useState(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title> Análise da alteração </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              component={TextArea}
              label="Insira sua análise da Solicitação de Alteração"
              name="analise"
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="Voltar"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => handleClose()}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Enviar"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              onClick={() => setConfirmar(true)}
            />
          </Modal.Footer>
        </Spin>
      </Modal>

      <Modal
        show={confirmar}
        onHide={() => setConfirmar(false)}
        backdrop={"static"}
        className="mt-5"
      >
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title> Confirmar envio para DINUTRE </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              : Deseja enviar a Análise da Solicitação de Alteração de
              Cronograma para a <strong>DINUTRE</strong>?{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="Voltar"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => setConfirmar(false)}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Enviar"
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
