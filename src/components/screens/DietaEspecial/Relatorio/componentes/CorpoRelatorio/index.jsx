import React from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import InformacoesAluno from "./InformacoesAluno";
import FluxoDeStatusDieta from "./FluxoDeStatusDieta";
import DadosEscolaSolicitante from "./DadosEscolaSolicitante";
import DadosEscolaDestino from "./DadosEscoladestino";
import DadosDietaEspecial from "./DadosDietaEspecial";
import "./styles.scss";

const CorpoRelatorio = ({ dietaEspecial }) => {
  const onSubmit = () => {
    // será desenvolvido na história 41937
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={dietaEspecial}
      mutators={{ ...arrayMutators }}
      render={({ values }) => (
        <form>
          <InformacoesAluno />
          <hr />
          <DadosEscolaDestino />
          <hr />
          <FluxoDeStatusDieta logs={dietaEspecial.logs} />
          <hr />
          <DadosEscolaSolicitante />
          <hr />
          <DadosDietaEspecial values={values} />
        </form>
      )}
    />
  );
};

export default CorpoRelatorio;
