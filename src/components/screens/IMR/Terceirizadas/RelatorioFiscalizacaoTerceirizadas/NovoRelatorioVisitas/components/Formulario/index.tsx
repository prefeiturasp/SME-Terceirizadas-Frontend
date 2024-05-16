import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import { FormApi } from "final-form";
import { NovoRelatorioVisitasFormInterface } from "../../interfaces";
import { OcorrenciaNaoSeAplica } from "./components/OcorrenciaNaoSeAplica";

type FormularioType = {
  tiposOcorrencia: Array<TipoOcorrenciaInterface>;
  form: FormApi<any, Partial<any>>;
  values: NovoRelatorioVisitasFormInterface;
};

export const Formulario = ({ ...props }: FormularioType) => {
  const { tiposOcorrencia, form, values } = props;

  useEffect(() => {
    tiposOcorrencia.forEach((tipoOcorrencia) => {
      form.change(`ocorrencia_${tipoOcorrencia.uuid}`, "sim");
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
                    <tr className="categoria">
                      <th className="pb-3" colSpan={3}>
                        {tipoOcorrencia.categoria.nome}
                      </th>
                    </tr>
                  )}
                  <tr className="tipo-ocorrencia">
                    <td
                      rowSpan={
                        values[`ocorrencia_${tipoOcorrencia.uuid}`] ===
                        "nao_se_aplica"
                          ? 2
                          : 1
                      }
                      className="fw-bold text-center"
                    >
                      {index + 1}
                    </td>
                    <td className="p-3">
                      <div>
                        <b>{tipoOcorrencia.titulo}:</b>{" "}
                        {tipoOcorrencia.descricao}
                      </div>
                      <div>
                        <b>
                          Penalidade:{" "}
                          {tipoOcorrencia.penalidade.numero_clausula} Obrigação:{" "}
                          {tipoOcorrencia.penalidade.obrigacoes.toString()}
                        </b>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <Field
                          name={`ocorrencia_${tipoOcorrencia.uuid}`}
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
                        <div className="mt-2">
                          <Field
                            name={`ocorrencia_${tipoOcorrencia.uuid}`}
                            component="input"
                            type="radio"
                            value="nao_se_aplica"
                            id="nao_se_aplica"
                            required
                            validate={required}
                          />
                          <label className="ms-2" htmlFor="nao_se_aplica">
                            Não se aplica
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {values[`ocorrencia_${tipoOcorrencia.uuid}`] ===
                    "nao_se_aplica" && (
                    <OcorrenciaNaoSeAplica tipoOcorrencia={tipoOcorrencia} />
                  )}
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
