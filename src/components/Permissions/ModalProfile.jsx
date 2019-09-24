import React from "react";
import { Modal, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

export default props => {
  return (
    <Modal show={props.show}>
      <form>
        <ModalHeader closeButton onHide={props.close}>
          <ModalTitle>Criar Novo Perfil {props.role}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <input type="hidden" name="id_institution" value={props._id} />

          <div className="form-group">
            <label>Nome do Perfil</label>
            <input
              type="text"
              name="profile"
              className="form-control"
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-primary">
            Adicionar Perfil
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
