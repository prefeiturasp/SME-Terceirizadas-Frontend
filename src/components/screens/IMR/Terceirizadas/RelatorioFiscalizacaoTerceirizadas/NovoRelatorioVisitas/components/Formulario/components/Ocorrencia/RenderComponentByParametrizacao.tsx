import React from "react";
import { FormApi } from "final-form";
import { CampoTextoLongo } from "./Inputs/CampoTextoLongo";
import { CampodeTextoSimples } from "./Inputs/CampodeTextoSimples";
import { CampoNumerico } from "./Inputs/CampoNumerico";
import { OpçoesSimNao } from "./Inputs/OpçoesSimNao";
import { SeletorDeDatas } from "./Inputs/SeletorDeDatas";
import {
  TipoOcorrenciaInterface,
  ParametrizacoesInterface,
} from "interfaces/imr.interface";

const componentMap = {
  "Campo de Texto Longo": CampoTextoLongo,
  "Campo de Texto Simples": CampodeTextoSimples,
  "Campo Numérico": CampoNumerico,
  "Opções Sim/Não": OpçoesSimNao,
  "Seletor de Datas": SeletorDeDatas,
};

type RenderComponentByParametrizacaoType = {
  form: FormApi<any, Partial<any>>;
  tipoOcorrencia: TipoOcorrenciaInterface;
  parametrizacao: ParametrizacoesInterface;
  index: number;
};

const RenderComponentByParametrizacao = ({
  ...props
}: RenderComponentByParametrizacaoType) => {
  const { form, tipoOcorrencia, parametrizacao, index } = props;
  const ComponentToRender = componentMap[parametrizacao.tipo_pergunta.nome];

  if (!ComponentToRender) {
    return null;
  }

  return (
    <ComponentToRender
      titulo={parametrizacao.titulo}
      name={`${index}_resposta_${tipoOcorrencia.uuid}_parametrizacao_${parametrizacao.uuid}`}
      form={form}
    />
  );
};

export default RenderComponentByParametrizacao;
