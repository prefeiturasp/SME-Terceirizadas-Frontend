import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";

const ProtocoloLeitura = ({ protocolo }) => {
  return (
    <div className="row">
      <div className="col-12">
        <Field
          component={InputText}
          className={"select-form-produto"}
          label="Nome do Protocolo Padrão de Dieta Especial"
          name="nome_protocolo_padrao"
          defaultValue={protocolo !== undefined ? protocolo : ""}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default ProtocoloLeitura;
