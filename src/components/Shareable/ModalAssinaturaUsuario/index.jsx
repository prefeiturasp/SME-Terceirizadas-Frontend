import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { Spin } from "antd";
import { useState } from "react";
import InputPassword from "../Input/InputPassword";
import { Field, Form } from "react-final-form";
import "./style.scss";

export const ModalAssinaturaUsuario = props => {
  const [concordaAssinar, setConcordaAssinar] = useState(false);

  const { show, handleClose, handleSim, titulo, texto, loading } = props;

  return (
    <Modal show={show} onHide={handleClose} backdrop={"static"}>
      <Spin tip="Carregando..." spinning={loading}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {!concordaAssinar ? titulo : "Confirme sua senha"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!concordaAssinar ? (
            <>{texto}</>
          ) : (
            <div>
              <p>
                Confirme sua senha de acesso ao{" "}
                <span className="green">SIGPAE</span> para assinar digitalmente
                o documento:
              </p>
              <div>
                <Form
                  onSubmit={handleSim}
                  render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
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
        <Modal.Footer>
          {!concordaAssinar && (
            <>
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => handleClose()}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ml-3"
              />
              <Botao
                texto="Sim, assinar cronograma"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN}
                className="ml-3"
                onClick={() => {
                  setConcordaAssinar(true);
                }}
              />
            </>
          )}
        </Modal.Footer>
      </Spin>
    </Modal>
  );
};
