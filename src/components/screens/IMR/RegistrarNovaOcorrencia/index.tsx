import { Spin } from "antd";
import { Select } from "components/Shareable/Select";
import HTTP_STATUS from "http-status-codes";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import { ResponseFormularioSupervisaoTiposOcorrenciasInterface } from "interfaces/responses.interface";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { Location, useLocation } from "react-router-dom";
import { getTiposOcorrenciaPorEdital } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { required } from "helpers/fieldValidators";

export const RegistrarNovaOcorrencia = () => {
  const [tiposOcorrencia, setTiposOcorrencia] =
    useState<Array<TipoOcorrenciaInterface>>();
  const [loadingTiposOcorrencia, setLoadingTiposOcorrencia] = useState(false);
  const [erroAPI, setErroAPI] = useState<string>("");
  const [categorias, setCategorias] =
    useState<Array<{ nome: string; uuid: string }>>();
  const [tiposOcorrenciaDaCategoria, setTiposOcorrenciaDaCategoria] = useState<
    Array<TipoOcorrenciaInterface>
  >([]);

  const location: Location<any> = useLocation();

  const getTiposOcorrenciaPorEditalAsync = async (): Promise<void> => {
    setLoadingTiposOcorrencia(true);
    const response: ResponseFormularioSupervisaoTiposOcorrenciasInterface =
      await getTiposOcorrenciaPorEdital({
        edital_uuid: location.state?.editalUuid,
      });
    if (response.status === HTTP_STATUS.OK) {
      setTiposOcorrencia(response.data);
      setCategorias(
        response.data
          .map((tipoOcorrencia) => {
            return {
              nome: tipoOcorrencia.categoria.nome,
              uuid: tipoOcorrencia.categoria.uuid,
            };
          })
          .filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.nome === value.nome && t.uuid === value.uuid
              )
          )
      );
    } else {
      setErroAPI(
        "Erro ao carregar tipos de ocorrência do edital da unidade educacional. Tente novamente mais tarde."
      );
    }
    setLoadingTiposOcorrencia(false);
  };

  useEffect(() => {
    getTiposOcorrenciaPorEditalAsync();
  }, []);

  const onSubmit = () => {};

  return (
    <div className="card mt-3">
      <div className="card-body">
        {!erroAPI && (
          <Spin spinning={loadingTiposOcorrencia}>
            {tiposOcorrencia && (
              <Form onSubmit={onSubmit}>
                {({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-6">
                        <Field
                          component={Select}
                          name="categoria"
                          label="Categoria da Ocorrência"
                          options={[
                            { nome: "Selecione uma categoria", uuid: "" },
                            ...categorias,
                          ]}
                          onChangeEffect={(
                            e: ChangeEvent<HTMLInputElement>
                          ) => {
                            const value = e.target.value;
                            setTiposOcorrenciaDaCategoria(
                              tiposOcorrencia
                                .filter(
                                  (tipoOcorrencia) =>
                                    tipoOcorrencia.categoria.uuid === value
                                )
                                .map((tipoOcorrencia) => {
                                  return {
                                    nome: tipoOcorrencia.titulo,
                                    ...tipoOcorrencia,
                                  };
                                })
                            );
                          }}
                          required
                          validate={required}
                        />
                      </div>
                      <div className="col-6">
                        <Field
                          component={Select}
                          name="tipo_ocorrencia"
                          label="Tipos de Ocorrência"
                          options={[
                            {
                              nome: "Selecione um tipo de ocorrência",
                              uuid: "",
                            },
                            ...tiposOcorrenciaDaCategoria,
                          ]}
                          required
                          validate={required}
                          disabled={!values.categoria}
                          naoDesabilitarPrimeiraOpcao
                        />
                      </div>
                    </div>
                  </form>
                )}
              </Form>
            )}
          </Spin>
        )}
      </div>
    </div>
  );
};
