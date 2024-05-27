import React from "react";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import RenderComponentByParametrizacao from "./RenderComponentByParametrizacao";
import { FormApi } from "final-form";

type OcorrenciaType = {
  tipoOcorrencia: TipoOcorrenciaInterface;
  form: FormApi<any, Partial<any>>;
};

export const Ocorrencia = ({ ...props }: OcorrenciaType) => {
  const { tipoOcorrencia, form } = props;

  return tipoOcorrencia.parametrizacoes.length ? (
    <tr className="tipo-ocorrencia-parametrizacao">
      <td colSpan={2} className="py-3">
        {tipoOcorrencia.parametrizacoes.map((parametrizacao, index) => {
          return (
            <div
              key={index}
              className="row d-flex align-items-center py-1 px-3"
            >
              <RenderComponentByParametrizacao
                index={index}
                parametrizacao={parametrizacao}
                tipoOcorrencia={tipoOcorrencia}
                form={form}
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
