import React from "react";
import { Field } from "react-final-form";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";

type OcorrenciaNaoSeAplicaType = {
  tipoOcorrencia: TipoOcorrenciaInterface;
};

export const OcorrenciaNaoSeAplica = ({
  ...props
}: OcorrenciaNaoSeAplicaType) => {
  const { tipoOcorrencia } = props;
  return (
    <tr>
      <td className="p-3" colSpan={2}>
        <Field
          component={TextArea}
          label="Descrição"
          name={`descricao_${tipoOcorrencia.uuid}`}
          placeholder="Descreva as observações"
          height="100"
        />
      </td>
    </tr>
  );
};
