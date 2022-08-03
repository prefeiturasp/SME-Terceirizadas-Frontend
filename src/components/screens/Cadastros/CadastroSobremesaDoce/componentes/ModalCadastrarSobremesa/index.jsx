import Botao from "components/Shareable/Botao";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { getDDMMYYYfromDate } from "configs/helper";
import React from "react";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import "./style.scss";

export const ModalCadastrarSobremesa = ({ ...props }) => {
  const { tiposUnidades, event, showModal, closeModal } = props;

  const onSubmit = async () => {};

  return (
    <Modal
      dialogClassName="modal-cadastrar-sobremesa modal-50w"
      show={showModal}
      onHide={closeModal}
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Cadastrar Sobremesa Doce</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Cadastro de sobremesa doce para o dia{" "}
                <strong>{getDDMMYYYfromDate(event.start)}</strong>, selecione o
                tipo de unidade:
              </p>
              <Field
                component={StatefulMultiSelect}
                name="tipos_unidade"
                selected={values.tipos_unidade || []}
                options={tiposUnidades.map(tipoUnidade => ({
                  label: tipoUnidade.iniciais,
                  value: tipoUnidade.uuid
                }))}
                onSelectedChanged={values_ => {
                  form.change("tipos_unidade", values_);
                }}
                overrideStrings={{
                  selectSomeItems: "Selecione",
                  allItemsAreSelected:
                    "Todos os tipos de unidade estão selecionados",
                  selectAll: "Todos"
                }}
              />
            </Modal.Body>
            <div className="footer">
              <Botao
                texto="Cancelar"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ml-3"
              />
              <Botao
                texto="Cadastrar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                disabled={submitting}
                className="ml-3"
              />
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};
