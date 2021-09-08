import React from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { ehSolicitacaoDeCancelamento } from "../../helpers";
import JustificativaCancelamento from "./JustificativaCancelamento";
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

  const dietaCancelada = ehSolicitacaoDeCancelamento(
    dietaEspecial.status_solicitacao
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={dietaEspecial}
      mutators={{ ...arrayMutators }}
      render={({ values }) => (
        <form>
          {dietaCancelada && [
            <JustificativaCancelamento key={1} dietaEspecial={dietaEspecial} />,
            <hr key={2} />
          ]}
          <InformacoesAluno />
          <hr />
          {dietaEspecial.tipo_solicitacao === "ALTERACAO_UE" &&
            dietaEspecial.status_solicitacao === "CODAE_A_AUTORIZAR" && (
              <>
                <DadosEscolaDestino />
                <hr />
              </>
            )}
          <FluxoDeStatusDieta logs={dietaEspecial.logs} />
          <hr />
          <DadosEscolaSolicitante />
          <hr />
          <DadosDietaEspecial values={values} dietaEspecial={dietaEspecial} />
        </form>
      )}
    />
  );
};

export default CorpoRelatorio;
