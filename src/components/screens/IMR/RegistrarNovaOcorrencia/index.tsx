import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import MeusDadosContext from "context/MeusDadosContext";
import HTTP_STATUS from "http-status-codes";
import {
  EscolaLabelInterface,
  TipoOcorrenciaInterface,
} from "interfaces/imr.interface";
import { ResponseFormularioSupervisaoTiposOcorrenciasInterface } from "interfaces/responses.interface";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-final-form";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  createFormularioDiretor,
  getTiposOcorrenciaPorEditalDiretor,
} from "services/imr/relatorioFiscalizacaoTerceirizadas";
import RenderComponentByParametrizacao from "../Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/components/Formulario/components/Ocorrencia/RenderComponentByParametrizacao";
import { SeletorDeDatas } from "../Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/components/Formulario/components/Ocorrencia/Seletores/SeletorDeDatas";
import { ModalCancelaPreenchimento } from "../Terceirizadas/RelatorioFiscalizacaoTerceirizadas/NovoRelatorioVisitas/components/ModalCancelaPreenchimento";
import { ModalSalvar } from "./components/ModalSalvar";
import { SeletorCategoria } from "./components/SeletorCategoria";
import { SeletorTipoOcorrencia } from "./components/SeletorTipoOcorrencia";
import { formataPayload } from "./helpers";
import { RegistrarNovaOcorrenciaFormInterface } from "./interfaces";
import "./style.scss";

export const RegistrarNovaOcorrencia = () => {
  const [tiposOcorrencia, setTiposOcorrencia] =
    useState<Array<TipoOcorrenciaInterface>>();
  const [loadingTiposOcorrencia, setLoadingTiposOcorrencia] = useState(false);
  const [categorias, setCategorias] =
    useState<Array<{ nome: string; uuid: string }>>();
  const [tiposOcorrenciaDaCategoria, setTiposOcorrenciaDaCategoria] = useState<
    Array<TipoOcorrenciaInterface>
  >([]);
  const [tipoOcorrencia, setTipoOcorrencia] =
    useState<TipoOcorrenciaInterface>();
  const [escolaSelecionada, setEscolaSelecionada] =
    useState<EscolaLabelInterface>();

  const [showModalCancelaPreenchimento, setShowModalCancelaPreenchimento] =
    useState(false);
  const [showModalSalvar, setShowModalSalvar] = useState(false);
  const [erroAPI, setErroAPI] = useState<string>("");

  // @ts-ignore
  const { meusDados } = useContext(MeusDadosContext);
  const location: Location<any> = useLocation();
  const navigate: NavigateFunction = useNavigate();

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
                  (tipoOcorrencia) =>
                    tipoOcorrencia.nome === value.nome &&
                    tipoOcorrencia.uuid === value.uuid
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
    setEscolaSelecionada({
      label: "",
      value: "",
      lote_nome: "",
      terceirizada: "",
      edital: location.state?.editalUuid,
      uuid: meusDados.vinculo_atual.instituicao.uuid,
    });
  }, []);

  const onSubmit = async (
    values: RegistrarNovaOcorrenciaFormInterface
  ): Promise<void> => {
    if (!showModalSalvar) {
      setShowModalSalvar(true);
      return;
    }

    const response = await createFormularioDiretor(
      formataPayload(values, location.state?.solicitacaoMedicaoInicialUuid)
    );
    if (response.status === HTTP_STATUS.CREATED) {
      toastSuccess("Rascunho do Relatório de Fiscalização salvo com sucesso!");
      navigate(-1);
    } else {
      toastError(
        "Erro ao criar rascunho do Relatório de Fiscalização. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className="card registrar-nova-ocorrencia mt-3">
      <div className="card-body">
        {!erroAPI && (
          <Spin spinning={loadingTiposOcorrencia}>
            {tiposOcorrencia && (
              <Form destroyOnUnregister onSubmit={onSubmit}>
                {({ handleSubmit, form, submitting }) => (
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
                                  <RenderComponentByParametrizacao
                                    index={index}
                                    parametrizacao={parametrizacao}
                                    tipoOcorrencia={tipoOcorrencia}
                                    form={form}
                                    key={index}
                                    escolaSelecionada={escolaSelecionada}
                                  />
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
                        <div className="row float-end mt-4">
                          <div className="col-12">
                            <Botao
                              texto="Cancelar"
                              onClick={() => {
                                setShowModalCancelaPreenchimento(true);
                              }}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                            />
                            <Botao
                              texto="Salvar"
                              className="ms-3"
                              disabled={submitting}
                              type={BUTTON_TYPE.SUBMIT}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                            />
                          </div>
                        </div>
                        <ModalCancelaPreenchimento
                          show={showModalCancelaPreenchimento}
                          handleClose={() =>
                            setShowModalCancelaPreenchimento(false)
                          }
                          form={form}
                          navigate={navigate}
                        />
                        <ModalSalvar
                          show={showModalSalvar}
                          handleClose={() => setShowModalSalvar(false)}
                          values={form.getState().values}
                          salvar={onSubmit}
                        />
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
