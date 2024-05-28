import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import { TipoOcorrenciaInterface } from "interfaces/imr.interface";
import { ResponseFormularioSupervisaoTiposOcorrenciasInterface } from "interfaces/responses.interface";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { Location, useLocation } from "react-router-dom";
import { getTiposOcorrenciaPorEditalDiretor } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import "./style.scss";
import { SeletorDeDatas } from "../Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/components/Formulario/components/Ocorrencia/Inputs/SeletorDeDatas";
import RenderComponentByParametrizacao from "../Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/components/Formulario/components/Ocorrencia/RenderComponentByParametrizacao";
import { SeletorCategoria } from "./components/SeletorCategoria";
import { SeletorTipoOcorrencia } from "./components/SeletorTIpoOcorrencia";

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
  const [tipoOcorrencia, setTipoOcorrencia] =
    useState<TipoOcorrenciaInterface>();

  const location: Location<any> = useLocation();

  const getTiposOcorrenciaPorEditalNutrisupervisaoAsync =
    async (): Promise<void> => {
      setLoadingTiposOcorrencia(true);
      const response: ResponseFormularioSupervisaoTiposOcorrenciasInterface =
        await getTiposOcorrenciaPorEditalDiretor({
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
    getTiposOcorrenciaPorEditalNutrisupervisaoAsync();
  }, []);

  const onSubmit = () => {};

  return (
    <div className="card registrar-nova-ocorrencia mt-3">
      <div className="card-body">
        {!erroAPI && (
          <Spin spinning={loadingTiposOcorrencia}>
            {tiposOcorrencia && (
              <Form onSubmit={onSubmit}>
                {({ handleSubmit, form }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-6">
                        <SeletorCategoria
                          categorias={categorias}
                          setTiposOcorrenciaDaCategoria={
                            setTiposOcorrenciaDaCategoria
                          }
                          tiposOcorrencia={tiposOcorrencia}
                        />
                      </div>
                      <div className="col-6">
                        <SeletorTipoOcorrencia
                          setTipoOcorrencia={setTipoOcorrencia}
                          tiposOcorrenciaDaCategoria={
                            tiposOcorrenciaDaCategoria
                          }
                          tiposOcorrencia={tiposOcorrencia}
                          values={form.getState().values}
                        />
                      </div>
                    </div>
                    {tipoOcorrencia && (
                      <section className="tipo-ocorrencia">
                        <div className="row">
                          <div className="col-12">
                            <div className="title-label mt-3 mb-1">
                              Descrição do Tipo de Ocorrência e Penalidades:
                            </div>
                            <div className="box-descricao">
                              <div>
                                <b>{tipoOcorrencia.titulo}:</b>{" "}
                                {tipoOcorrencia.descricao}
                              </div>
                              <div>
                                <b>
                                  Penalidade:{" "}
                                  {tipoOcorrencia.penalidade.numero_clausula}{" "}
                                  Obrigação:{" "}
                                  {tipoOcorrencia.penalidade.obrigacoes.toString()}
                                </b>
                              </div>
                            </div>
                            {tipoOcorrencia.parametrizacoes.length > 0 && (
                              <h2 className="mt-3 mb-3">
                                Detalhe a ocorrência nos itens abaixo:
                              </h2>
                            )}
                          </div>
                        </div>
                        {tipoOcorrencia.parametrizacoes.length > 0 && (
                          <div className="row">
                            <SeletorDeDatas
                              titulo="Data da Ocorrência"
                              name="datas"
                              form={form}
                            />
                          </div>
                        )}
                        {tipoOcorrencia.parametrizacoes.length ? (
                          tipoOcorrencia.parametrizacoes.map(
                            (parametrizacao, index) => {
                              return (
                                <div key={index} className="row">
                                  <div className="col-12">
                                    <RenderComponentByParametrizacao
                                      index={index}
                                      parametrizacao={parametrizacao}
                                      tipoOcorrencia={tipoOcorrencia}
                                      form={form}
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <div className="row mt-3">
                            <div className="col-12">
                              Não há parametrização para esse item.
                            </div>
                          </div>
                        )}
                      </section>
                    )}
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
