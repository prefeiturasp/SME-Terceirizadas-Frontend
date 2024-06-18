import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { FormApi } from "final-form";
import {
  EscolaLabelInterface,
  RespostaOcorrenciaInterface,
  TipoOcorrenciaInterface,
} from "interfaces/imr.interface";
import React from "react";
import RenderComponentByParametrizacao from "./RenderComponentByParametrizacao";

type OcorrenciaType = {
  tipoOcorrencia: TipoOcorrenciaInterface;
  form: FormApi<any, Partial<any>>;
  escolaSelecionada: EscolaLabelInterface;
  name_grupos: string;
  indexFieldArray: number;
  respostasOcorrencias?: Array<RespostaOcorrenciaInterface>;
};

export const Ocorrencia = ({ ...props }: OcorrenciaType) => {
  const {
    tipoOcorrencia,
    form,
    escolaSelecionada,
    name_grupos,
    indexFieldArray,
    respostasOcorrencias,
  } = props;

  const excluiGrupoDeResposta = (): void => {
    const grupos = [...form.getState().values[`grupos_${tipoOcorrencia.uuid}`]];
    const currentDeletedGrupos =
      form.getState().values[`grupos_${tipoOcorrencia.uuid}_deleted`];

    const deletedGrupo = grupos.splice(indexFieldArray, 1);
    form.change(`grupos_${tipoOcorrencia.uuid}_deleted`, [
      ...(currentDeletedGrupos ? currentDeletedGrupos : []),
      ...deletedGrupo,
    ]);
    form.change(`grupos_${tipoOcorrencia.uuid}`, grupos);
  };

  const getUUIDRespostaParametrizacao = (parametrizacao) => {
    let UUIDResposta = "";
    const _resposta = respostasOcorrencias.find(
      (_resposta) =>
        _resposta.parametrizacao.uuid === parametrizacao.uuid &&
        _resposta.grupo === indexFieldArray + 1
    );
    UUIDResposta = _resposta && _resposta.uuid ? _resposta.uuid : "";

    return UUIDResposta;
  };

  return tipoOcorrencia.parametrizacoes.length ? (
    <tr className="tipo-ocorrencia-parametrizacao">
      <td colSpan={2} className="py-3">
        {indexFieldArray > 0 && (
          <Botao
            titulo="Excluir"
            className="no-border float-end"
            onClick={() => excluiGrupoDeResposta()}
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            icon={BUTTON_ICON.TRASH}
          />
        )}
        {tipoOcorrencia.parametrizacoes.map((parametrizacao, index) => {
          let UUID = "";
          if (respostasOcorrencias.length > 0) {
            UUID = getUUIDRespostaParametrizacao(parametrizacao);
          }

          return (
            <div
              key={index}
              className="row d-flex align-items-center py-1 px-3"
            >
              <RenderComponentByParametrizacao
                parametrizacao={parametrizacao}
                tipoOcorrencia={tipoOcorrencia}
                name_grupos={name_grupos}
                form={form}
                escolaSelecionada={escolaSelecionada}
                UUIDResposta={UUID}
              />
            </div>
          );
        })}
      </td>
    </tr>
  ) : (
    <tr className="tipo-ocorrencia-nao-ha-parametrizacao">
      <td className="p-3" colSpan={3}>
        <div className="d-flex justify-content-center align-items-center">
          <p className="m-0">Não há parametrização para esse item.</p>
        </div>
      </td>
    </tr>
  );
};
