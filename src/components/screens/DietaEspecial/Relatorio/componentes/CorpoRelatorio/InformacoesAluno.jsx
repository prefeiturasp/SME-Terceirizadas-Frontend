import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";

const InformacoesAluno = () => {
  return (
    <div className="row mb-3">
      <div className="col-12 mb-3">
        <label className="sectionName">Dados do aluno</label>
      </div>
      <div className="col-3">
        <Field
          component={InputText}
          name="aluno.codigo_eol"
          label="Código EOL do Aluno"
          disabled={true}
        />
      </div>
      <div className="col-3">
        <Field
          component={InputText}
          name="aluno.data_nascimento"
          label="Data de Nascimento"
          disabled={true}
        />
      </div>
      <div className="col-6">
        <Field
          component={InputText}
          name="aluno.nome"
          label="Nome Completo do Aluno"
          disabled={true}
        />
      </div>
    </div>
  );
};

export default InformacoesAluno;
