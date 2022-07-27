import React from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field } from "redux-form";
import { Modal } from "react-bootstrap";
import InputText from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

export const ModalVincularEditais = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    editaisOptions,
    editais,
    onChangeEditais
  } = props;

  const renderizarLabelEditais = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione os editais vinculados";
    }
    if (selected.length === options.length) {
      return "Todos os editais estão selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} edital selecionado`;
    }
    return `${selected.length} editais selecionados`;
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Homologação do produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3">
          <div className="col-4">
            <Field
              name="nome"
              label="Nome do produto"
              component={InputText}
              disabled
            />
          </div>
          <div className="col-4">
            <Field
              name="marca"
              label="Marca do produto"
              component={InputText}
              disabled
            />
          </div>
          <div className="col-4">
            <Field
              name="fabricante"
              label="Fabricante do produto"
              component={InputText}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <Field
              name="tipo"
              label="Tipo de produto"
              component={InputText}
              disabled
            />
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label>Editais</label>
            </div>
            <Field
              component={StatefulMultiSelect}
              name="editais"
              selected={editais}
              disableSearch={true}
              options={editaisOptions.map(edital => ({
                label: edital.numero,
                value: edital.uuid
              }))}
              valueRenderer={(selected, options) =>
                renderizarLabelEditais(selected, options)
              }
              overrideStrings={{
                selectAll: "Todos os editais"
              }}
              onSelectedChanged={values => onChangeEditais(values)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row mt-4">
          <div className="col-12">
            <Botao
              texto="Voltar"
              type={BUTTON_TYPE.BUTTON}
              onClick={closeModal}
              style={BUTTON_STYLE.DARK_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Homologar"
              type={BUTTON_TYPE.SUBMIT}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
