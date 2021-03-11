import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { Field, Form } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import ConfirmarAceite from "./ConfirmarAceite";
import "./styles.scss";

export default ({ solicitacao, updatePage }) => {
  const [show, setShow] = useState(false);
  const [showConfirmarAceite, setShowConfirmarAceite] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async () => {
    setShowConfirmarAceite(true);
  };

  return (
    <>
      <Botao
        texto="Aceitar"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN}
        onClick={handleShow}
        className="float-right ml-3"
        disabled={solicitacao.status !== "EM_ANALISE"}
      />

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title> Aceitar solicitação de alteração </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Solicitação de alteração número:{" "}
          <b>{solicitacao.numero_solicitacao}</b>.<br />
          <br />
          <Form
            onSubmit={onSubmit}
            subscription={{ submitting: true, values: true }}
            validate={values => {
              const errors = {};
              if (!values.justificativa_aceite) {
                errors.justificativa_aceite = "Campo obrigatório";
              }
              return errors;
            }}
            render={({ handleSubmit, form, values }) => {
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="filtros-alterar-req-logistica"
                  >
                    <div className="row mb-5">
                      <div className="col">
                        <Field
                          component={TextArea}
                          label="Justificativa de aceite"
                          name="justificativa_aceite"
                          required={true}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="row mb-3">
                      <div className="col">
                        <ConfirmarAceite
                          show={showConfirmarAceite}
                          setShow={setShowConfirmarAceite}
                          form={form}
                          updatePage={updatePage}
                          handleCloseAll={handleClose}
                          solicitacao={solicitacao}
                          values={values}
                        />
                        <Botao
                          texto="Voltar"
                          type={BUTTON_TYPE.BUTTON}
                          onClick={handleClose}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="float-right ml-3"
                        />
                      </div>
                    </div>
                  </form>
                </>
              );
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
