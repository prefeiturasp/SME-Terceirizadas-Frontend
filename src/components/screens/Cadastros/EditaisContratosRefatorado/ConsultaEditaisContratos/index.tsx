import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { ToggleExpandir } from "components/Shareable/ToggleExpandir";
import { deepCopy } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import { ResponseEditalCotratoInterface } from "interfaces/responses.interface";
import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { getEditaisContratos } from "services/edital.service.js";
import {
  EditalContratoInterface,
  EditalContratoListadoInterface,
} from "../interfaces";
import { Paginacao } from "components/Shareable/Paginacao";
import "./style.scss";
import { Tooltip } from "antd";
import { VIGENCIA_STATUS } from "./constants";
import InputText from "components/Shareable/Input/InputText";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

export const ConsultaEditaisContratos = () => {
  const [editaisContratos, setEditaisContratos] =
    useState<Array<EditalContratoListadoInterface>>(undefined);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");

  const PARAMS = { page };

  let typingTimeout = null;

  const getEditaisContratosAsync = async (params = null): Promise<void> => {
    const response = await getEditaisContratos<ResponseEditalCotratoInterface>(
      params
    );
    if (response.status === HTTP_STATUS.OK) {
      setEditaisContratos(
        response.data.results.map((edital: EditalContratoListadoInterface) => {
          return {
            ativo: false,
            ...edital,
          };
        })
      );
      setCount(response.data.count);
    } else {
      setErro(
        "Erro ao carregar editais e contratos. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    requisicoesPreRender();
  }, []);

  const requisicoesPreRender = async (): Promise<void> => {
    await Promise.all([getEditaisContratosAsync()]).then(() => {
      setLoading(false);
    });
  };

  const ativaContratoEdital = (index: number): void => {
    const editaisContratos_ = deepCopy(editaisContratos);
    editaisContratos_[index].ativo = !editaisContratos_[index].ativo;
    setEditaisContratos(editaisContratos_);
  };

  const nextPage = async ({
    page,
    values,
  }: {
    page: number;
    values: { buscar?: string };
  }): Promise<void> => {
    setPage(page);
    setLoading(true);
    await getEditaisContratosAsync({ page: page, buscar: values.buscar });
    setLoading(false);
  };

  const getStatusContrato = (
    editalContrato: EditalContratoInterface
  ): string => {
    let status = "";
    editalContrato.contratos.forEach((contrato) => {
      const vigencia = contrato.vigencias[contrato.vigencias.length - 1];
      if (vigencia.status === VIGENCIA_STATUS.VENCIDO) status = vigencia.status;
      if (status !== "vencido" && vigencia.status === "proximo_ao_vencimento")
        status = vigencia.status;
    });
    return status;
  };

  const onSubmit = () => {};

  const REQUISICOES_FINALIZADAS = !loading && editaisContratos;

  return (
    <div className="consulta-editais-contratos mt-3">
      <Spin tip="Carregando..." spinning={!REQUISICOES_FINALIZADAS}>
        {erro && <div className="mt-3">{erro}</div>}
        {!erro && editaisContratos && (
          <Form keepDirtyOnReinitialize onSubmit={onSubmit}>
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className={`row p-2 pt-3`}>
                    <div className="col-3 title">Tipos de contratação</div>
                    <div className="col-3 title">Nº do edital</div>
                    <div className="col-3 title">
                      Nº do processo administrativo
                    </div>
                    <div className="col-3 title">
                      <Field
                        component={InputText}
                        name="buscar"
                        placeholder="Pesquisar"
                        className={`${BUTTON_STYLE.GRAY}`}
                        icone={`${BUTTON_ICON.SEARCH} fa-lg`}
                      />
                      <OnChange name="buscar">
                        {async (value) => {
                          clearTimeout(typingTimeout);
                          typingTimeout = setTimeout(async () => {
                            setLoading(true);
                            await getEditaisContratosAsync({
                              busca: value,
                              ...PARAMS,
                            });
                            setLoading(false);
                            setPage(1);
                          }, 1000);
                        }}
                      </OnChange>
                    </div>
                  </div>
                  <hr className="header" />
                  {editaisContratos.map((editalContrato, index) => {
                    return (
                      <div key={index} className="p-1">
                        <div
                          className={`row ${
                            getStatusContrato(editalContrato) ===
                            VIGENCIA_STATUS.PROXIMO_AO_VENCIMENTO
                              ? VIGENCIA_STATUS.PROXIMO_AO_VENCIMENTO
                              : ""
                          }${
                            getStatusContrato(editalContrato) ===
                            VIGENCIA_STATUS.VENCIDO
                              ? VIGENCIA_STATUS.VENCIDO
                              : ""
                          }`}
                        >
                          <div className="col-3">
                            {editalContrato.tipo_contratacao}
                          </div>
                          <div className="col-3">{editalContrato.numero}</div>
                          <div className="col-3">{editalContrato.processo}</div>
                          <div className="col-3 d-flex my-auto">
                            {getStatusContrato(editalContrato) ===
                              VIGENCIA_STATUS.PROXIMO_AO_VENCIMENTO && (
                              <Tooltip
                                title={
                                  "Data de vigência do contrato próxima ao vencimento, verifique se o contrato permanece ativo e adie a vigência"
                                }
                              >
                                <div className="icon me-4 mt-1">
                                  <span className="fas fa-exclamation" />
                                </div>
                              </Tooltip>
                            )}
                            {getStatusContrato(editalContrato) ===
                              VIGENCIA_STATUS.VENCIDO && (
                              <Tooltip
                                title={
                                  "Data de vigência do contrato expirada, verifique se o contrato permanece ativo e adie a vigência"
                                }
                              >
                                <div className="icon orange me-4 mt-1">
                                  <span className="fas fa-exclamation" />
                                </div>
                              </Tooltip>
                            )}
                            <ToggleExpandir
                              onClick={() => ativaContratoEdital(index)}
                              ativo={editalContrato.ativo}
                              className="me-3"
                            />
                            <Botao
                              type={BUTTON_TYPE.BUTTON}
                              style={`${BUTTON_STYLE.GREEN_OUTLINE} no-border`}
                              icon={BUTTON_ICON.EDIT}
                            />
                          </div>
                        </div>
                        <hr />
                        <Collapse isOpened={editalContrato.ativo}>
                          <div className="row">
                            <div className="col-2 title">Objeto resumido:</div>
                            <div className="col-10">
                              {editalContrato.objeto}
                            </div>
                          </div>
                          {editalContrato.contratos.map(
                            (contrato, indexContrato) => {
                              return (
                                <div key={indexContrato}>
                                  <div className="row pt-3">
                                    <div className="col-12">
                                      <div className="label">
                                        <span className="com-linha">
                                          Contratos Relacionados
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row pt-2">
                                    <div className="col-6 d-flex">
                                      <div className="title pe-2">
                                        Contrato nº:
                                      </div>
                                      {contrato.numero}
                                    </div>
                                    <div className="col-6">
                                      {contrato.vigencias.map(
                                        (vigencia, indexVigencia) => {
                                          return (
                                            <div key={indexVigencia}>
                                              {indexVigencia === 0 && (
                                                <span className="title pe-2">
                                                  Vigência:
                                                </span>
                                              )}
                                              <span
                                                className={`${
                                                  indexVigencia ===
                                                  contrato.vigencias.length - 1
                                                    ? vigencia.status
                                                    : ""
                                                }`}
                                                style={{
                                                  paddingLeft: `${
                                                    indexVigencia > 0
                                                      ? "4.7em"
                                                      : 0
                                                  }`,
                                                }}
                                              >
                                                {vigencia.data_inicial} até{" "}
                                                {vigencia.data_final}
                                              </span>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                  <div className="row pt-2">
                                    <div className="col-6 d-flex">
                                      <div className="title pe-2">
                                        Processo administrativo do contrato:
                                      </div>
                                      {contrato.processo}
                                    </div>
                                    <div className="col-6 d-flex">
                                      <div className="title pe-2">
                                        Data da proposta:
                                      </div>
                                      {contrato.data_proposta}
                                    </div>
                                  </div>
                                  <div className="row pt-2">
                                    <div className="col-6">
                                      <div className="title">Lotes:</div>
                                      {contrato.lotes
                                        .map((lote) => lote.nome)
                                        .join(" | ")}
                                    </div>
                                    <div className="col-6">
                                      <div className="title">DREs:</div>
                                      {contrato.diretorias_regionais.map(
                                        (dre, indexDRE) => {
                                          return (
                                            <div key={indexDRE}>{dre.nome}</div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                  <div className="row pt-2">
                                    <div className="col-12">
                                      <div className="title">Empresa:</div>
                                      {contrato.terceirizada.nome_fantasia}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </Collapse>
                      </div>
                    );
                  })}
                  <Paginacao
                    className="mt-3 mb-3"
                    current={page}
                    total={count}
                    showSizeChanger={false}
                    onChange={(page: number) => {
                      nextPage({ page, values });
                    }}
                    pageSize={10}
                  />
                </div>
              </form>
            )}
          </Form>
        )}
      </Spin>
    </div>
  );
};
