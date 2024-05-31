import React from "react";
import { FormApi } from "final-form";
import { CampoTextoLongo } from "./Inputs/CampoTextoLongo";
import { CampodeTextoSimples } from "./Inputs/CampodeTextoSimples";
import { CampoNumerico } from "./Inputs/CampoNumerico";
import { OpçoesSimNao } from "./Inputs/OpçoesSimNao";
import { SeletorDeDatas } from "./Seletores/SeletorDeDatas";
import { SeletorTipoAlimentacao } from "./Seletores/SeletorTipoAlimentacao";
import {
  TipoOcorrenciaInterface,
  ParametrizacoesInterface,
  EscolaLabelInterface,
} from "interfaces/imr.interface";

const componentMap = {
  "Campo de Texto Longo": CampoTextoLongo,
  "Campo de Texto Simples": CampodeTextoSimples,
  "Campo Numérico": CampoNumerico,
  "Opções Sim/Não": OpçoesSimNao,
  "Seletor de Datas": SeletorDeDatas,
  "Seletor de Tipo de Alimentação": SeletorTipoAlimentacao,
};

type RenderComponentByParametrizacaoType = {
  form: FormApi<any, Partial<any>>;
  tipoOcorrencia: TipoOcorrenciaInterface;
  parametrizacao: ParametrizacoesInterface;
  index: number;
  escolaSelecionada: EscolaLabelInterface;
};

const RenderComponentByParametrizacao = ({
  ...props
}: RenderComponentByParametrizacaoType) => {
  const { form, tipoOcorrencia, parametrizacao, index, escolaSelecionada } =
    props;
  const ComponentToRender = componentMap[parametrizacao.tipo_pergunta.nome];

  if (!ComponentToRender) {
    return null;
  }

  return (
    <ComponentToRender
      titulo={parametrizacao.titulo}
      name={`${index}_resposta_${tipoOcorrencia.uuid}_parametrizacao_${parametrizacao.uuid}`}
      form={form}
      escolaSelecionada={escolaSelecionada}
    />
  );
};

export default RenderComponentByParametrizacao;
