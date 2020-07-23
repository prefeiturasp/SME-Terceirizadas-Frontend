import React from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { Field } from "redux-form";
import { required } from "../../../../../helpers/fieldValidators";
import InputText from "../../../../Shareable/Input/InputText";
import "./style.scss";

export default class ModalMarca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMarca: null
    };
  }

  enviarMarca = () => {
    const { inputMarca } = this.state;
    const data = {
      nome: inputMarca
    };
    this.props.onSubmit(data);
  };

  setaMarca = value => {
    this.setState({
      inputMarca: value
    });
  };

  render() {
    const { visible, loading } = this.props;
    return (
      <Modal
        visible={visible}
        title="Cadastrar nova Marca"
        onOk={this.enviarMarca}
        onCancel={this.props.closeModal}
        footer={[
          <Button key="back" onClick={this.props.closeModal}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.enviarMarca}
          >
            Salvar
          </Button>
        ]}
      >
        <div className="field-modal-produto">
          <Field
            component={InputText}
            label="Nome do marca"
            name="nome_marca"
            type="text"
            required
            validate={required}
            onChange={event => {
              this.setaMarca(event.target.value);
            }}
          />
        </div>
      </Modal>
    );
  }
}
