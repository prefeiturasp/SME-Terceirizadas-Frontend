import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON,
} from "components/Shareable/Botao/constants";
import { Spin } from "antd";
import { useState } from "react";
import InputPassword from "../Input/InputPassword";
import { Field, Form } from "react-final-form";
import "./style.scss";

export const ModalAssinaturaUsuario = ({
  show,
  handleClose,
  handleSim,
  titulo,
  texto,
  loading,
  textoBotao = "Sim, assinar cronograma",
}) => {
  const [concordaAssinar, setConcordaAssinar] = useState(false);

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setConcordaAssinar(false);
      }}
      backdrop={"static"}
    >
      <Spin tip="Carregando..." spinning={loading}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {!concordaAssinar ? titulo : "Confirme sua senha"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!concordaAssinar ? (
            <b>{texto}</b>
          ) : (
            <div>
              <p>
                Confirme sua senha de acesso ao{" "}
                <span className="green fw-bold">SIGPAE</span> para assinar
                digitalmente o documento:
              </p>
              <div>
                <Form
                  onSubmit={() => {}}
                  render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-2">
                        <div className="col-8">
                          <Field
                            component={InputPassword}
                            esconderAsterisco
                            label="Senha"
                            name="password"
                            placeholder={"Digite sua senha"}
                            required
                          />
                        </div>
                        <div className="col-4">
                          <Botao
                            texto="Confirmar"
                            type={BUTTON_TYPE.SUBMIT}
                            style={BUTTON_STYLE.GREEN}
                            className="btn-assinar"
                            icon={BUTTON_ICON.CHECK_NORMAL}
                            onClick={() => handleSim(values.password)}
                          />
                        </div>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          )}
        </Modal.Body>

        {!concordaAssinar && (
          <>
            <Modal.Footer>
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => {
                  handleClose();
                  setConcordaAssinar(false);
                }}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ms-3"
              />
              <Botao
                texto={textoBotao}
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN}
                className="ms-3"
                onClick={() => {
                  setConcordaAssinar(true);
                }}
              />
            </Modal.Footer>
          </>
        )}
      </Spin>
    </Modal>
  );
};
