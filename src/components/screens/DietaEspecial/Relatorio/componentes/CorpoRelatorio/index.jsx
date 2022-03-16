import React from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import JustificativaCancelamento from "./JustificativaCancelamento";
import InformacoesAluno from "./InformacoesAluno";
import FluxoDeStatusDieta from "./FluxoDeStatusDieta";
import DadosEscolaSolicitante from "./DadosEscolaSolicitante";
import DadosEscolaDestino from "./DadosEscoladestino";
import DadosDietaEspecial from "./DadosDietaEspecial";
import MotivoNegacao from "./MotivoNegacao";
import SolicitacaoVigente from "../../../Escola/componentes/SolicitacaoVigente";

import DiagnosticosLeitura from "../FormAutorizaDietaEspecial/componentes/Diagnosticos/DiagnosticosLeitura";
import ClassificacaoDaDietaLeitura from "../FormAutorizaDietaEspecial/componentes/ClassificacaoDaDieta/ClassificacaoDietaLeitura";
import ProtocoloLeitura from "../FormAutorizaDietaEspecial/componentes/Protocolos/ProtocoloLeitura";
import OrientacoesLeitura from "../FormAutorizaDietaEspecial/componentes/Orientacoes/OrientacoesLeitura";
import SubstituicoesTable from "../FormAutorizaDietaEspecial/componentes/SubstituicoesField/SubstituicoesTable";
import InformacoesAdicionaisLeitura from "../FormAutorizaDietaEspecial/componentes/InformacoesAdicionais/InformacoesAdicionaisLeitura";
import IdentificacaoNutricionista from "../FormAutorizaDietaEspecial/componentes/IdentificacaoNutricionista";
import PeriodoVigencia from "../FormAutorizaDietaEspecial/componentes/PeriodoVigencia";
import { formataAlergias } from "../FormAutorizaDietaEspecial/helper";

import { obtemIdentificacaoNutricionistaDieta } from "helpers/utilities";

import { ehCanceladaSegundoStep } from "../../helpers";
import "./styles.scss";
import JustificativaNegacao from "./JustificativaNegacao";

const CorpoRelatorio = ({
  dietaEspecial,
  dietaCancelada,
  card,
  solicitacaoVigenteAtiva
}) => {
  const onSubmit = () => {
    // será desenvolvido na história 41937
  };

  const canceladaSegundoStep = dietaEspecial
    ? ehCanceladaSegundoStep(dietaEspecial)
    : false;

  const montaCorpoRelatorio = () => {
    if (
      card &&
      ["inativas", "inativas-temp"].includes(card) &&
      dietaEspecial.eh_importado === false &&
      dietaEspecial.ativo === false
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        <OrientacoesLeitura
          orientacoes_gerais={dietaEspecial.orientacoes_gerais}
          key={3}
        />,
        <SubstituicoesTable
          substituicoes={dietaEspecial.substituicoes}
          key={4}
        />,
        <InformacoesAdicionaisLeitura
          informacoes_adicionais={dietaEspecial.informacoes_adicionais}
          key={5}
        />,
        <IdentificacaoNutricionista key={6} />
      ];
    } else if (
      dietaEspecial.eh_importado === false &&
      (dietaEspecial.status_solicitacao ===
        "TERMINADA_AUTOMATICAMENTE_SISTEMA" ||
        (card && ["autorizadas", "autorizadas-temp"].includes(card)))
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        <OrientacoesLeitura
          orientacoes_gerais={dietaEspecial.orientacoes_gerais}
          key={3}
        />,
        <SubstituicoesTable
          substituicoes={dietaEspecial.substituicoes}
          key={4}
        />,
        <PeriodoVigencia key={5} />,
        <InformacoesAdicionaisLeitura
          informacoes_adicionais={dietaEspecial.informacoes_adicionais}
          key={6}
        />,
        <IdentificacaoNutricionista key={7} />
      ];
    } else if (
      [
        "CANCELADO_ALUNO_MUDOU_ESCOLA",
        "CANCELADO_ALUNO_NAO_PERTENCE_REDE",
        "ESCOLA_CANCELOU"
      ].includes(dietaEspecial.status_solicitacao) &&
      !canceladaSegundoStep &&
      dietaEspecial.eh_importado === false
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        <OrientacoesLeitura
          orientacoes_gerais={dietaEspecial.orientacoes_gerais}
          key={3}
        />,
        <SubstituicoesTable
          substituicoes={dietaEspecial.substituicoes}
          key={4}
        />,
        <InformacoesAdicionaisLeitura
          informacoes_adicionais={dietaEspecial.informacoes_adicionais}
          key={5}
        />,
        <IdentificacaoNutricionista key={6} />
      ];
    } else if (
      dietaEspecial.status_solicitacao === "CODAE_NEGOU_PEDIDO" &&
      dietaEspecial.tipo_solicitacao !== "ALTERACAO_UE"
    ) {
      return <IdentificacaoNutricionista />;
    } else if (
      dietaEspecial.status_solicitacao === "CODAE_NEGOU_PEDIDO" &&
      dietaEspecial.tipo_solicitacao === "ALTERACAO_UE"
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        <OrientacoesLeitura
          orientacoes_gerais={dietaEspecial.orientacoes_gerais}
          key={3}
        />,
        <SubstituicoesTable
          substituicoes={dietaEspecial.substituicoes}
          key={4}
        />,
        <InformacoesAdicionaisLeitura
          informacoes_adicionais={dietaEspecial.informacoes_adicionais}
          key={5}
        />,
        <IdentificacaoNutricionista key={6} />
      ];
    } else if (
      dietaEspecial.eh_importado === true &&
      [
        "autorizadas",
        "autorizadas-temp",
        "pendentes-aut",
        "inativas",
        "inativas-temp",
        "canceladas",
        "aguardando-vigencia"
      ].includes(card)
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        dietaEspecial.tipo_solicitacao === "ALTERACAO_UE" && (
          <PeriodoVigencia key={3} />
        )
      ];
    } else if (
      dietaEspecial.eh_importado === false &&
      dietaEspecial.tipo_solicitacao === "ALTERACAO_UE" &&
      ["CODAE_A_AUTORIZAR", "CODAE_AUTORIZADO"].includes(
        dietaEspecial.status_solicitacao
      )
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        <OrientacoesLeitura
          orientacoes_gerais={dietaEspecial.orientacoes_gerais}
          key={3}
        />,
        <SubstituicoesTable
          substituicoes={dietaEspecial.substituicoes}
          key={4}
        />,
        <PeriodoVigencia key={5} />,
        <InformacoesAdicionaisLeitura
          informacoes_adicionais={dietaEspecial.informacoes_adicionais}
          key={6}
        />,
        <IdentificacaoNutricionista key={7} />
      ];
    } else if (
      dietaEspecial.eh_importado === false &&
      ["COMUM", "CANCELAMENTO_DIETA"].includes(
        dietaEspecial.tipo_solicitacao
      ) &&
      ["ESCOLA_SOLICITOU_INATIVACAO", "CODAE_NEGOU_CANCELAMENTO"].includes(
        dietaEspecial.status_solicitacao
      )
    ) {
      return [
        <DiagnosticosLeitura key={0} />,
        <ClassificacaoDaDietaLeitura key={1} />,
        <ProtocoloLeitura key={2} />,
        <OrientacoesLeitura
          orientacoes_gerais={dietaEspecial.orientacoes_gerais}
          key={3}
        />,
        <SubstituicoesTable
          substituicoes={dietaEspecial.substituicoes}
          key={4}
        />,
        <PeriodoVigencia key={5} />,
        <InformacoesAdicionaisLeitura
          informacoes_adicionais={dietaEspecial.informacoes_adicionais}
          key={6}
        />,
        <IdentificacaoNutricionista key={7} />
      ];
    }

    return <></>;
  };

  const initialValues = () => {
    let logs = [...dietaEspecial.logs];
    if (dietaEspecial.registro_funcional_nutricionista === "") {
      dietaEspecial.registro_funcional_nutricionista = obtemIdentificacaoNutricionistaDieta(
        logs.pop().usuario
      );
    }
    if (![undefined, null].includes(dietaEspecial.alergias_intolerancias)) {
      dietaEspecial.relacao_diagnosticos = formataAlergias(dietaEspecial)
        .map(a => a.nome)
        .join("; ");
    } else {
      dietaEspecial.relacao_diagnosticos = "";
    }
    dietaEspecial.classificacao_nome = [undefined, null].includes(
      dietaEspecial.classificacao
    )
      ? ""
      : dietaEspecial.classificacao.nome;
    dietaEspecial.nome_protocolo_padrao = [undefined, null].includes(
      dietaEspecial.nome_protocolo
    )
      ? ""
      : dietaEspecial.nome_protocolo;
    dietaEspecial.data_inicio = [undefined, null].includes(
      dietaEspecial.data_inicio
    )
      ? ""
      : dietaEspecial.data_inicio;
    dietaEspecial.data_fim = [undefined, null].includes(
      dietaEspecial.data_termino
    )
      ? ""
      : dietaEspecial.data_termino;
    return dietaEspecial;
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues()}
      mutators={{ ...arrayMutators }}
      render={({ values }) => (
        <form>
          {dietaEspecial.status_solicitacao === "CODAE_NEGOU_PEDIDO" && [
            <MotivoNegacao
              key={0}
              motivoNegacao={dietaEspecial.motivo_negacao}
            />,
            <JustificativaNegacao
              key={1}
              justificativaNegacao={dietaEspecial.justificativa_negacao}
            />
          ]}
          {card &&
            ((["pendentes-aut", "negadas"].includes(card) &&
              [
                "ESCOLA_SOLICITOU_INATIVACAO",
                "CODAE_NEGOU_CANCELAMENTO"
              ].includes(dietaEspecial.status_solicitacao)) ||
              (!["inativas", "inativas-temp"].includes(card) &&
                dietaCancelada)) && [
              <JustificativaCancelamento
                key={1}
                dietaEspecial={dietaEspecial}
              />,
              <hr key={2} />
            ]}
          <InformacoesAluno />
          {solicitacaoVigenteAtiva &&
            ["pendentes-aut"].includes(card) &&
            dietaEspecial.tipo_solicitacao === "COMUM" &&
            dietaEspecial.status_solicitacao === "CODAE_A_AUTORIZAR" && (
              <SolicitacaoVigente
                solicitacoesVigentes={solicitacaoVigenteAtiva}
              />
            )}
          <hr />
          {dietaEspecial.tipo_solicitacao === "ALTERACAO_UE" && (
            <>
              <DadosEscolaDestino />
              <hr />
            </>
          )}
          <FluxoDeStatusDieta
            logs={dietaEspecial.logs}
            eh_importado={dietaEspecial.eh_importado}
          />
          <hr />
          <DadosEscolaSolicitante />
          <hr />
          <DadosDietaEspecial
            values={values}
            dietaEspecial={dietaEspecial}
            card={card}
          />

          {dietaEspecial && montaCorpoRelatorio()}
        </form>
      )}
    />
  );
};

export default CorpoRelatorio;
