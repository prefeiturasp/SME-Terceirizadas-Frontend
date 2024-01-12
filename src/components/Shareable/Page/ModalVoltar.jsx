import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";

const ModalVoltar = ({ modalVoltar, setModalVoltar, textoModalVoltar }) => {
  const navigate = useNavigate();
  return (
    <Modal
      className="modal-botao-voltar"
      show={modalVoltar}
      onHide={() => {
        setModalVoltar(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <b>Voltar a tela anterior</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {textoModalVoltar ? (
          <p> {textoModalVoltar} </p>
        ) : (
          <p>
            Existem informações não salvas. Ao voltar à tela anterior, as
            informações inseridas serão perdidas.
          </p>
        )}

        <p>Deseja retornar a tela anterior?</p>
      </Modal.Body>
      <Modal.Footer>
        <Botao
          texto="Voltar sem Salvar"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            navigate(-1);
          }}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className="ms-3"
        />
        <Botao
          texto="Permanecer"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            setModalVoltar(false);
          }}
          style={BUTTON_STYLE.GREEN}
          className="ms-3"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVoltar;
