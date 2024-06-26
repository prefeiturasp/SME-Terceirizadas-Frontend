import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  PAINEL_RELATORIOS_FISCALIZACAO,
  SUPERVISAO,
  TERCEIRIZADAS,
} from "configs/constants";
import { FormApi } from "final-form";
import arrayMutators from "final-form-arrays";
import HTTP_STATUS from "http-status-codes";
import {
  ArquivoInterface,
  EscolaLabelInterface,
  NovoRelatorioVisitasFormInterface,
  TipoOcorrenciaInterface,
} from "interfaces/imr.interface";
import { ResponseFormularioSupervisaoTiposOcorrenciasInterface } from "interfaces/responses.interface";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import {
  createFormularioSupervisao,
  createRascunhoFormularioSupervisao,
  updateRascunhoFormularioSupervisao,
  updateFormularioSupervisao,
  getTiposOcorrenciaPorEditalNutrisupervisao,
  getFormularioSupervisao,
  getRespostasFormularioSupervisao,
  getRespostasNaoSeAplicaFormularioSupervisao,
} from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { Anexos } from "./components/Anexos";
import { Cabecalho } from "./components/Cabecalho";
import { Formulario } from "./components/Formulario";
import { ModalCancelaPreenchimento } from "./components/ModalCancelaPreenchimento";
import { ModalSalvar } from "./components/ModalSalvar";
import { ModalSalvarRascunho } from "./components/ModalSalvarRascunho";
import {
  formataPayload,
  formataPayloadUpdate,
  validarFormulariosTiposOcorrencia,
} from "./helpers";
import "./styles.scss";

export const NovoRelatorioVisitas = () => {
  const [showModalCancelaPreenchimento, setShowModalCancelaPreenchimento] =
    useState(false);
  const [showModalSalvarRascunho, setShowModalSalvarRascunho] = useState(false);
  const [showModalSalvar, setShowModalSalvar] = useState(false);

  const [escolaSelecionada, setEscolaSelecionada] =
    useState<EscolaLabelInterface>();
  const [tiposOcorrencia, setTiposOcorrencia] =
    useState<Array<TipoOcorrenciaInterface>>();
  const [loadingTiposOcorrencia, setLoadingTiposOcorrencia] = useState(false);
  const [erroAPI, setErroAPI] = useState<string>("");
  const [anexos, setAnexos] = useState<ArquivoInterface[]>([]);
  const [anexosIniciais, setAnexosIniciais] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState();
  const [respostasOcorrencias, setRespostasOcorrencias] = useState([]);
  const [respostasOcorrenciaNaoSeAplica, setRespostasOcorrenciaNaoSeAplica] =
    useState([]);

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isEditing) getDadosFormularioSupervisao();
  }, []);

  const isEditing = useMemo(() => {
    const uuid = location.pathname.split("/")[5];
    return uuid ? true : false;
  }, [location]);

  const getDadosFormularioSupervisao = async () => {
    const uuid = location.pathname.split("/")[5];
    if (uuid) {
      try {
        const formularioResponse = await getFormularioSupervisao(uuid);
        setAnexosIniciais(formularioResponse.data.anexos);
        setInitialValues({
          ...formularioResponse.data,
          acompanhou_visita: formularioResponse.data.acompanhou_visita
            ? "sim"
            : "nao",
          anexos: null,
        });

        const [respostasResponse, respostasNaoSeAplica] = await Promise.all([
          getRespostasFormularioSupervisao(uuid),
          getRespostasNaoSeAplicaFormularioSupervisao(uuid),
        ]);

        setRespostasOcorrencias(respostasResponse.data);
        setRespostasOcorrenciaNaoSeAplica(respostasNaoSeAplica.data);
      } catch (error) {
        // Handle errors
      }
    }
  };

  const salvarRascunho = async (
    values: NovoRelatorioVisitasFormInterface
  ): Promise<void> => {
    if (!values.escola || !values.data) {
      toastError(
        "Os campos unidade educacional e data da visita são obrigatórios para salvar um rascunho."
      );
      return;
    }
    if (!showModalSalvarRascunho) {
      setShowModalSalvarRascunho(true);
      return;
    }
    if (values.uuid) {
      const response = await updateRascunhoFormularioSupervisao(
        formataPayloadUpdate(
          values,
          escolaSelecionada,
          anexos,
          respostasOcorrenciaNaoSeAplica
        )
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess(
          "Rascunho do Relatório de Fiscalização salvo com sucesso!"
        );
        navigate(
          `/${SUPERVISAO}/${TERCEIRIZADAS}/${PAINEL_RELATORIOS_FISCALIZACAO}`
        );
      } else {
        toastError(
          "Erro ao atualizar rascunho do Relatório de Fiscalização. Tente novamente mais tarde."
        );
      }
    } else {
      const response = await createRascunhoFormularioSupervisao(
        formataPayload(values, escolaSelecionada, anexos)
      );
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess(
          "Rascunho do Relatório de Fiscalização salvo com sucesso!"
        );
        navigate(
          `/${SUPERVISAO}/${TERCEIRIZADAS}/${PAINEL_RELATORIOS_FISCALIZACAO}`
        );
      } else {
        toastError(
          "Erro ao criar rascunho do Relatório de Fiscalização. Tente novamente mais tarde."
        );
      }
    }
  };

  const salvar = async (
    values: NovoRelatorioVisitasFormInterface
  ): Promise<void> => {
    if (!showModalSalvar) {
      setShowModalSalvar(true);
      return;
    }

    if (values.uuid) {
      const response = await updateFormularioSupervisao(
        formataPayloadUpdate(
          values,
          escolaSelecionada,
          anexos,
          respostasOcorrenciaNaoSeAplica
        )
      );
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Relatório de Fiscalização enviado com sucesso!");
        navigate(
          `/${SUPERVISAO}/${TERCEIRIZADAS}/${PAINEL_RELATORIOS_FISCALIZACAO}`
        );
      } else {
        toastError(
          "Erro ao enviar Relatório de Fiscalização. Tente novamente mais tarde."
        );
      }
    } else {
      const response = await createFormularioSupervisao(
        formataPayload(values, escolaSelecionada, anexos)
      );
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Relatório de Fiscalização enviado com sucesso!");
        navigate(
          `/${SUPERVISAO}/${TERCEIRIZADAS}/${PAINEL_RELATORIOS_FISCALIZACAO}`
        );
      } else {
        toastError(
          "Erro ao enviar Relatório de Fiscalização. Tente novamente mais tarde."
        );
      }
    }
  };

  const getTiposOcorrenciaPorEditalNutrisupervisaoAsync = async (
    form: FormApi<any, Partial<any>>,
    _escola: EscolaLabelInterface
  ): Promise<void> => {
    setLoadingTiposOcorrencia(true);
    const response: ResponseFormularioSupervisaoTiposOcorrenciasInterface =
      await getTiposOcorrenciaPorEditalNutrisupervisao({
        edital_uuid: _escola.edital,
        escola_uuid: _escola.uuid,
      });
    if (response.status === HTTP_STATUS.OK) {
      setTiposOcorrencia(response.data);
      response.data.forEach((tipoOcorrencia) => {
        form.change(`grupos_${tipoOcorrencia.uuid}`, [{}]);
      });
      setErroAPI("");
    } else {
      setErroAPI(
        "Erro ao carregar tipos de ocorrência do edital da unidade educacional. Tente novamente mais tarde."
      );
    }
    setLoadingTiposOcorrencia(false);
  };

  useEffect(() => {
    if (!escolaSelecionada) {
      setTiposOcorrencia(undefined);
    }
  }, [escolaSelecionada]);

  const onSubmit = async (
    values: NovoRelatorioVisitasFormInterface
  ): Promise<void> => {
    values;
  };

  const formularioValido = (form: FormApi<any, Partial<any>>) => {
    const _validarFormulariosTiposOcorrencia =
      validarFormulariosTiposOcorrencia(
        form.getState().values,
        tiposOcorrencia
      );
    return (
      !form.getState().hasValidationErrors &&
      _validarFormulariosTiposOcorrencia.formulariosValidos &&
      ((_validarFormulariosTiposOcorrencia.listaValidacaoPorTipoOcorrencia
        .length > 0 &&
        anexos.length > 0) ||
        _validarFormulariosTiposOcorrencia.listaValidacaoPorTipoOcorrencia
          .length === 0)
    );
  };

  return (
    <div className="card novo-relatorio-visitas mt-3">
      <div className="card-body">
        <Form
          initialValues={initialValues}
          keepDirtyOnReinitialize
          mutators={{
            ...arrayMutators,
          }}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit,
            values,
            form,
            form: {
              mutators: { push },
            },
            submitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Cabecalho
                values={form.getState().values}
                form={form}
                setEscolaSelecionada={setEscolaSelecionada}
                escolaSelecionada={escolaSelecionada}
                getTiposOcorrenciaPorEditalNutrisupervisaoAsync={
                  getTiposOcorrenciaPorEditalNutrisupervisaoAsync
                }
                setTiposOcorrencia={setTiposOcorrencia}
              />
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>
              {!erroAPI && (
                <Spin spinning={loadingTiposOcorrencia}>
                  {tiposOcorrencia && escolaSelecionada && (
                    <Formulario
                      respostasOcorrencias={respostasOcorrencias}
                      respostasOcorrenciaNaoSeAplica={
                        respostasOcorrenciaNaoSeAplica
                      }
                      form={form}
                      tiposOcorrencia={tiposOcorrencia}
                      values={form.getState().values}
                      escolaSelecionada={escolaSelecionada}
                      push={push}
                    />
                  )}
                </Spin>
              )}
              {tiposOcorrencia &&
                validarFormulariosTiposOcorrencia(
                  form.getState().values,
                  tiposOcorrencia
                ).listaValidacaoPorTipoOcorrencia.length !== 0 && (
                  <Anexos
                    setAnexos={setAnexos}
                    anexos={anexos}
                    anexosIniciais={anexosIniciais}
                  />
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
                    texto="Salvar rascunho"
                    className="ms-3"
                    disabled={submitting}
                    onClick={() => salvarRascunho(values)}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  {tiposOcorrencia && (
                    <Botao
                      texto="Enviar Formulário"
                      className="ms-3"
                      disabled={submitting || !formularioValido(form)}
                      onClick={() => salvar(values)}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN}
                    />
                  )}
                </div>
              </div>
              <ModalCancelaPreenchimento
                show={showModalCancelaPreenchimento}
                handleClose={() => setShowModalCancelaPreenchimento(false)}
                form={form}
                navigate={navigate}
              />
              <ModalSalvarRascunho
                show={showModalSalvarRascunho}
                handleClose={() => setShowModalSalvarRascunho(false)}
                values={form.getState().values}
                salvarRascunho={salvarRascunho}
                escolaSelecionada={escolaSelecionada}
              />
              <ModalSalvar
                show={showModalSalvar}
                handleClose={() => setShowModalSalvar(false)}
                values={form.getState().values}
                salvar={salvar}
                escolaSelecionada={escolaSelecionada}
              />
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
