import React from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { Field } from "redux-form";
import { required } from "../../../../../helpers/fieldValidators";
import InputText from "../../../../Shareable/Input/InputText";
import "./style.scss";

export default class ModalFabricante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFabricante: null
    };
  }

  enviarFabricante = () => {
    const { inputFabricante } = this.state;
    const data = {
      nome: inputFabricante
    };
    this.props.onSubmit(data);
  };

  setaFabricante = value => {
    this.setState({
      inputFabricante: value
    });
  };

  render() {
    const { visible, loading } = this.props;
    return (
      <Modal
        visible={visible}
        title="Cadastrar novo Fabricante"
        onOk={this.enviarFabricante}
        onCancel={this.props.closeModal}
        footer={[
          <Button key="back" onClick={this.props.closeModal}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.enviarFabricante}
          >
            Salvar
          </Button>
        ]}
      >
        <div className="field-modal-produto">
          <Field
            component={InputText}
            label="Nome do fabricante"
            name="nome_fabricante"
            type="text"
            required
            validate={required}
            onChange={event => {
              this.setaFabricante(event.target.value);
            }}
          />
        </div>
      </Modal>
    );
  }
}
