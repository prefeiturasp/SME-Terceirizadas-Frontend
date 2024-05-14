import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import { FormApi } from "final-form";

type FormularioType = {
  tiposOcorrencia: Array<TipoOcorrenciaInterface>;
  form: FormApi<any, Partial<any>>;
};

export const Formulario = ({ ...props }: FormularioType) => {
  const { tiposOcorrencia, form } = props;

  useEffect(() => {
    tiposOcorrencia.forEach((tipoOcorrencia) => {
      form.change(`resposta_${tipoOcorrencia.uuid}`, "sim");
    });
  }, []);

  return (
    <div className="formulario">
      <div className="row mt-3 mb-3">
        <div className="col-12 text-center">
          <h2>
            ITENS AVALIADOS NA VISITA E DE RESPONSABILIDADE DA EMPRESA
            PRESTADORA DE SERVIÇO
          </h2>
          <div className="subtitle">
            Caso a prestação de serviços tenha apresentado ocorrências sinalize
            nos itens correspondentes abaixo
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table>
            {tiposOcorrencia.map((tipoOcorrencia, index) => {
              return (
                <>
                  {(index === 0 ||
                    tipoOcorrencia.categoria.nome !==
                      tiposOcorrencia[index - 1].categoria.nome) && (
                    <tr className="row categoria">
                      <th className="col-12" colSpan={3}>
                        {tipoOcorrencia.categoria.nome}
                      </th>
                    </tr>
                  )}
                  <tr className="row tipo-ocorrencia">
                    <td className="col-1 fw-bold text-center pb-3">
                      {index + 1}
                    </td>
                    <td className="col-9">{tipoOcorrencia.descricao}</td>
                    <td className="col-2">
                      <div className="row ms-3">
                        <div className="col-12">
                          <Field
                            name={`resposta_${tipoOcorrencia.uuid}`}
                            component="input"
                            type="radio"
                            value="sim"
                            id="sim"
                            required
                            validate={required}
                          />
                          <label className="ms-2" htmlFor="sim">
                            Sim
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
