import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";
import {
  TipoOcorrenciaInterface,
  NovoRelatorioVisitasFormInterface,
  EscolaLabelInterface,
} from "interfaces/imr.interface";
import { FormApi } from "final-form";
import { OcorrenciaNaoSeAplica } from "./components/OcorrenciaNaoSeAplica";
import { Ocorrencia } from "./components/Ocorrencia";
import { FieldArray } from "react-final-form-arrays";
import { AdicionarResposta } from "./components/BotaoAdicionar";

type FormularioType = {
  tiposOcorrencia: Array<TipoOcorrenciaInterface>;
  form: FormApi<any, Partial<any>>;
  values: NovoRelatorioVisitasFormInterface;
  escolaSelecionada: EscolaLabelInterface;
  push: (_string) => {};
};

export const Formulario = ({ ...props }: FormularioType) => {
  const { tiposOcorrencia, form, values, escolaSelecionada, push } = props;

  const exibeBotaoAdicionar = (tipoOcorrencia: TipoOcorrenciaInterface) => {
    return (
      tipoOcorrencia.categoria.gera_notificacao &&
      tipoOcorrencia.parametrizacoes.length > 0
    );
  };

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
                    <>
                      <tr className="categoria">
                        <th className="pb-3" colSpan={3}>
                          {tipoOcorrencia.categoria.nome}
                        </th>
                      </tr>
                      {tipoOcorrencia.categoria.gera_notificacao && (
                        <tr className="frequencia">
                          <th className="pb-3" colSpan={3}>
                            Maior Frequência Registrada:
                            {values.maior_frequencia_no_periodo && (
                              <span className="highlight">
                                {" "}
                                {values.maior_frequencia_no_periodo} alunos
                              </span>
                            )}
                          </th>
                        </tr>
                      )}
                    </>
                  )}

                  <tr className="tipo-ocorrencia">
                    <td
                      rowSpan={
                        values[`ocorrencia_${tipoOcorrencia.uuid}`] === "nao" &&
                        exibeBotaoAdicionar(tipoOcorrencia)
                          ? 2 + values[`grupos_${tipoOcorrencia.uuid}`].length
                          : values[`ocorrencia_${tipoOcorrencia.uuid}`] ===
                              "nao_se_aplica" ||
                            values[`ocorrencia_${tipoOcorrencia.uuid}`] ===
                              "nao"
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
                      <div className="ms-3 my-3">
                        <Field
                          name={`ocorrencia_${tipoOcorrencia.uuid}`}
                          component="input"
                          type="radio"
                          value="sim"
                          id={`sim_${tipoOcorrencia.uuid}`}
                          required
                          validate={required}
                        />
                        <label
                          className="ms-2"
                          htmlFor={`sim_${tipoOcorrencia.uuid}`}
                        >
                          Sim
                        </label>
                        <div className="mt-2">
                          <Field
                            name={`ocorrencia_${tipoOcorrencia.uuid}`}
                            component="input"
                            type="radio"
                            value="nao"
                            id={`nao_${tipoOcorrencia.uuid}`}
                            required
                            validate={required}
                          />
                          <label
                            className="ms-2"
                            htmlFor={`nao_${tipoOcorrencia.uuid}`}
                          >
                            Não
                          </label>
                        </div>
                        <div className="mt-2">
                          <Field
                            name={`ocorrencia_${tipoOcorrencia.uuid}`}
                            component="input"
                            type="radio"
                            value="nao_se_aplica"
                            id={`nao_se_aplica_${tipoOcorrencia.uuid}`}
                            required
                            validate={required}
                          />
                          <label
                            className="ms-2"
                            htmlFor={`nao_se_aplica_${tipoOcorrencia.uuid}`}
                          >
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

                  {values[`ocorrencia_${tipoOcorrencia.uuid}`] === "nao" && (
                    <>
                      <FieldArray name={`grupos_${tipoOcorrencia.uuid}`}>
                        {({ fields }) =>
                          fields.map((name, indexFieldArray) => (
                            <>
                              <Ocorrencia
                                key={indexFieldArray}
                                name_grupos={name}
                                tipoOcorrencia={tipoOcorrencia}
                                form={form}
                                escolaSelecionada={escolaSelecionada}
                              />
                            </>
                          ))
                        }
                      </FieldArray>
                      {exibeBotaoAdicionar(tipoOcorrencia) && (
                        <tr className="adicionar text-center">
                          <td colSpan={2} className="py-3">
                            <AdicionarResposta
                              push={push}
                              nameFieldArray={`grupos_${tipoOcorrencia.uuid}`}
                            />
                          </td>
                        </tr>
                      )}
                    </>
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
