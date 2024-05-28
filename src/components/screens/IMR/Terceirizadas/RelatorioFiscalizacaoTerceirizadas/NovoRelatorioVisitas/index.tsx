import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form } from "react-final-form";
import { Cabecalho } from "./components/Cabecalho";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { ModalCancelaPreenchimento } from "./components/ModalCancelaPreenchimento";
import { ModalSalvarRascunho } from "./components/ModalSalvarRascunho";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  createFormularioSupervisao,
  getTiposOcorrenciaPorEdital,
} from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { Formulario } from "./components/Formulario";
import { ResponseFormularioSupervisaoTiposOcorrenciasInterface } from "interfaces/responses.interface";
import {
  ArquivoInterface,
  TipoOcorrenciaInterface,
  EscolaLabelInterface,
  NovoRelatorioVisitasFormInterface,
} from "interfaces/imr.interface";
import { Spin } from "antd";
import { formataPayload, validarFormulariosTiposOcorrencia } from "./helpers";
import { Anexos } from "./components/Anexos";

export const NovoRelatorioVisitas = () => {
  const [showModalCancelaPreenchimento, setShowModalCancelaPreenchimento] =
    useState(false);
  const [showModalSalvarRascunho, setShowModalSalvarRascunho] = useState(false);

  const [escolaSelecionada, setEscolaSelecionada] =
    useState<EscolaLabelInterface>();
  const [tiposOcorrencia, setTiposOcorrencia] =
    useState<Array<TipoOcorrenciaInterface>>();
  const [loadingTiposOcorrencia, setLoadingTiposOcorrencia] = useState(false);
  const [erroAPI, setErroAPI] = useState<string>("");
  const [anexos, setAnexos] = useState<ArquivoInterface[]>([]);

  const navigate: NavigateFunction = useNavigate();

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

    const response = await createFormularioSupervisao(
      formataPayload(values, escolaSelecionada, anexos)
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

  const getTiposOcorrenciaPorEditalAsync = async (): Promise<void> => {
    setLoadingTiposOcorrencia(true);
    const response: ResponseFormularioSupervisaoTiposOcorrenciasInterface =
      await getTiposOcorrenciaPorEdital({
        edital_uuid: escolaSelecionada.edital,
      });
    if (response.status === HTTP_STATUS.OK) {
      setTiposOcorrencia(response.data);
    } else {
      setErroAPI(
        "Erro ao carregar tipos de ocorrência do edital da unidade educacional. Tente novamente mais tarde."
      );
    }
    setLoadingTiposOcorrencia(false);
  };

  useEffect(() => {
    if (escolaSelecionada) {
      getTiposOcorrenciaPorEditalAsync();
    }
  }, [escolaSelecionada]);

  const onSubmit = async (
    values: NovoRelatorioVisitasFormInterface
  ): Promise<void> => {
    values;
  };

  return (
    <div className="card novo-relatorio-visitas mt-3">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, values, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Cabecalho
                values={form.getState().values}
                form={form}
                setEscolaSelecionada={setEscolaSelecionada}
                escolaSelecionada={escolaSelecionada}
              />
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>
              {!erroAPI && (
                <Spin spinning={loadingTiposOcorrencia}>
                  {tiposOcorrencia && (
                    <Formulario
                      form={form}
                      tiposOcorrencia={tiposOcorrencia}
                      values={form.getState().values}
                    />
                  )}
                </Spin>
              )}
              {tiposOcorrencia &&
                validarFormulariosTiposOcorrencia(
                  form.getState().values,
                  tiposOcorrencia
                ).length !== 0 && (
                  <Anexos setAnexos={setAnexos} anexos={anexos} />
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
                    texto={
                      values.uuid ? "Atualizar rascunho" : "Salvar rascunho"
                    }
                    className="ms-3"
                    disabled={submitting}
                    onClick={() => salvarRascunho(values)}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
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
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
