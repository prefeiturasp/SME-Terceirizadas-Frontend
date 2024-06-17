import { FormApi } from "final-form";
import { required } from "helpers/fieldValidators";
import {
  EscolaLabelInterface,
  NovoRelatorioVisitasFormInterface,
  TipoOcorrenciaInterface,
} from "interfaces/imr.interface";
import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { AdicionarResposta } from "./components/BotaoAdicionar";
import { Ocorrencia } from "./components/Ocorrencia";
import { OcorrenciaNaoSeAplica } from "./components/OcorrenciaNaoSeAplica";

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
      tipoOcorrencia.aceita_multiplas_respostas &&
      tipoOcorrencia.parametrizacoes.length > 0
    );
  };

  useEffect(() => {
    tiposOcorrencia.forEach((tipoOcorrencia) => {
      form.change(`ocorrencia_${tipoOcorrencia.uuid}`, "sim");
    });
  }, [escolaSelecionada]);

  let currentIndex = 0;
  let prevPosition;
  let prevCategoria;

  const getIndicePosicao = (tipoOcorrencia: TipoOcorrenciaInterface) => {
    if (
      tipoOcorrencia.categoria.uuid !== prevCategoria ||
      tipoOcorrencia.posicao !== prevPosition
    ) {
      currentIndex++;
    }

    prevCategoria = tipoOcorrencia.categoria.uuid;
    prevPosition = tipoOcorrencia.posicao;

    return currentIndex;
  };

  const getRowSpanTiposOcorrenciaMesmaPosicao = (
    tipoOcorrencia: TipoOcorrenciaInterface
  ) => {
    const tiposOcorrenciaMesmaPosicao = tiposOcorrencia.filter(
      (tipoOcorrencia_) =>
        tipoOcorrencia_.categoria.uuid === tipoOcorrencia.categoria.uuid &&
        tipoOcorrencia_.posicao === tipoOcorrencia.posicao
    );
    let rowSpan = tiposOcorrenciaMesmaPosicao.length;

    tiposOcorrenciaMesmaPosicao.forEach((tipoOcorrencia_) => {
      if (
        values[`ocorrencia_${tipoOcorrencia_.uuid}`] === "nao" ||
        values[`ocorrencia_${tipoOcorrencia_.uuid}`] === "nao_se_aplica"
      ) {
        rowSpan += 1;
        if (exibeBotaoAdicionar(tipoOcorrencia_))
          rowSpan += values[`grupos_${tipoOcorrencia_.uuid}`].length;
      }
    });

    return rowSpan;
  };

  const getRowSpan = (tipoOcorrencia: TipoOcorrenciaInterface) => {
    if (
      tiposOcorrencia.filter(
        (tipoOcorrencia_) =>
          tipoOcorrencia_.categoria.uuid === tipoOcorrencia.categoria.uuid &&
          tipoOcorrencia_.posicao === tipoOcorrencia.posicao
      ).length > 1
    ) {
      return getRowSpanTiposOcorrenciaMesmaPosicao(tipoOcorrencia);
    }
    let rowSpan = 1;
    if (
      values[`ocorrencia_${tipoOcorrencia.uuid}`] === "nao" ||
      values[`ocorrencia_${tipoOcorrencia.uuid}`] === "nao_se_aplica"
    ) {
      rowSpan = 2;
      if (exibeBotaoAdicionar(tipoOcorrencia))
        rowSpan += values[`grupos_${tipoOcorrencia.uuid}`].length;
    }
    return rowSpan;
  };

  const exibeColunaIndice = (
    tipoOcorrencia: TipoOcorrenciaInterface,
    index: number
  ) => {
    return (
      index === 0 ||
      tipoOcorrencia.categoria.uuid !==
        tiposOcorrencia[index - 1].categoria.uuid ||
      tipoOcorrencia.posicao !== tiposOcorrencia[index - 1].posicao
    );
  };

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
                <React.Fragment key={index}>
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
                    {exibeColunaIndice(tipoOcorrencia, index) && (
                      <td
                        rowSpan={getRowSpan(tipoOcorrencia)}
                        className="fw-bold text-center"
                      >
                        {getIndicePosicao(tipoOcorrencia)}
                      </td>
                    )}
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
                            <React.Fragment key={indexFieldArray}>
                              <Ocorrencia
                                key={indexFieldArray}
                                name_grupos={name}
                                tipoOcorrencia={tipoOcorrencia}
                                form={form}
                                escolaSelecionada={escolaSelecionada}
                                indexFieldArray={indexFieldArray}
                              />
                            </React.Fragment>
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
                </React.Fragment>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
