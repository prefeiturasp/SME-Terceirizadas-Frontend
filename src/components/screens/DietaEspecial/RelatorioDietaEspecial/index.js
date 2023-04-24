import StatefulMultiSelect from "@khanacademy/react-multi-select";
import React, { useContext, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, Form } from "react-final-form";
import Select from "components/Shareable/Select";
import { OPTIONS_STATUS_DIETA } from "constants/shared";
import { InputComData } from "components/Shareable/DatePicker";
import moment from "moment";
import {
  getFiltrosRelatorioDietasEspeciais,
  getUnidadesEducacionaisTercTotal,
  getSolicitacoesRelatorioDietasEspeciais
} from "services/dietaEspecial.service";
import "./styles.scss";
import { OnChange } from "react-final-form-listeners";
import MeusDadosContext from "context/MeusDadosContext";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

export const RelatorioDietaEspecial = () => {
  const { meusDados } = useContext(MeusDadosContext);

  const [filtros, setFiltros] = useState(null);
  const [unidadesEducacionais, setUnidadesEducacionais] = useState([]);
  const [dietasEspeciais, setDietasEspeciais] = useState(null);

  const [erroAPI, setErroAPI] = useState("");

  const getFiltrosRelatorioDietasEspeciaisAsync = async values => {
    setFiltros(null);
    const response = await getFiltrosRelatorioDietasEspeciais(values);
    if (response.status === HTTP_STATUS.OK) {
      setFiltros(response.data);
    } else {
      setErroAPI("Erro ao carregar filtros. Tente novamente mais tarde.");
    }
  };

  const getUnidadesEducacionaisAsync = async values => {
    setUnidadesEducacionais([]);
    let data = { lotes: values };
    const response = await getUnidadesEducacionaisTercTotal(data);
    if (response.status === HTTP_STATUS.OK) {
      setUnidadesEducacionais(
        response.data.map(unidade => ({
          label: unidade.codigo_eol_escola,
          value: unidade.codigo_eol
        }))
      );
    } else {
      toastError("Erro ao buscar unidades educacionais");
    }
  };

  const PARAMS = { limit: 10, offset: 0 };

  const onSubmit = async values => {
    const response = await getSolicitacoesRelatorioDietasEspeciais({
      ...PARAMS,
      ...values
    });
    if (response.status === HTTP_STATUS.OK) {
      setDietasEspeciais(response.data.results);
    } else {
      toastError(
        "Erro ao carregar dados das dietas especiais. Tente novamente mais tarde."
      );
    }
  };

  const LOADING = !filtros || !meusDados || erroAPI;

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erroAPI && <div>{erroAPI}</div>}
        {!erroAPI && meusDados && (
          <>
            <div className="sub-titulo">Filtrar dietas</div>
            <Form onSubmit={onSubmit}>
              {({ handleSubmit, values, form }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-4">
                      <Field
                        label="Status"
                        component={Select}
                        placeholder="Selecione o Status"
                        name="status_selecionado"
                        options={OPTIONS_STATUS_DIETA}
                      />
                      <OnChange name="status_selecionado">
                        {value => {
                          const params = {
                            status_selecionado: value
                          };
                          if (usuarioEhEmpresaTerceirizada) {
                            params["terceirizada_uuid"] =
                              meusDados.vinculo_atual.instituicao.uuid;
                          }
                          getFiltrosRelatorioDietasEspeciaisAsync(params);
                        }}
                      </OnChange>
                    </div>
                    {values.status_selecionado === "CANCELADAS" && (
                      <>
                        <div className="col-4">
                          <Field
                            component={InputComData}
                            label="Período de:"
                            name="data_inicial"
                            placeholder="Selecione"
                            maxDate={moment(values.data_final, "DD/MM/YYYY")._d}
                            minDate={null}
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputComData}
                            label="Até:"
                            name="data_final"
                            placeholder="Selecione"
                            minDate={
                              moment(values.data_inicial, "DD/MM/YYYY")._d
                            }
                            maxDate={new Date()}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {values.status_selecionado && (
                    <Spin tip="Carregando filtros..." spinning={LOADING}>
                      {filtros && (
                        <>
                          <div className="row">
                            <div className="col-4">
                              <label className="label font-weight-normal pb-2 pt-2">
                                Lote
                              </label>
                              <Field
                                component={StatefulMultiSelect}
                                name="lotes"
                                options={filtros.lotes.map(lote => ({
                                  label: lote.nome,
                                  value: lote.uuid
                                }))}
                                selected={values.lotes_selecionados || []}
                                onSelectedChanged={value =>
                                  form.change("lotes_selecionados", value)
                                }
                                overrideStrings={{
                                  search: "Busca",
                                  selectSomeItems: "Selecione lotes",
                                  allItemsAreSelected:
                                    "Todos os lotes estão selecionados",
                                  selectAll: "Todos"
                                }}
                              />
                              <OnChange name="lotes_selecionados">
                                {value => {
                                  if (value && value.length === 0) {
                                    setUnidadesEducacionais([]);
                                  } else {
                                    getUnidadesEducacionaisAsync(value);
                                  }
                                }}
                              </OnChange>
                            </div>
                            <div className="col-4">
                              <label className="label font-weight-normal pb-2 pt-2">
                                Classificação da dieta
                              </label>
                              <Field
                                component={StatefulMultiSelect}
                                name="classificacoes"
                                options={filtros.classificacoes.map(
                                  classificacao => ({
                                    label: classificacao.nome,
                                    value: classificacao.id
                                  })
                                )}
                                selected={
                                  values.classificacoes_selecionadas || []
                                }
                                onSelectedChanged={value =>
                                  form.change(
                                    "classificacoes_selecionadas",
                                    value
                                  )
                                }
                                overrideStrings={{
                                  search: "Busca",
                                  selectSomeItems:
                                    "Selecione classificações de dieta",
                                  allItemsAreSelected:
                                    "Todos as classificações estão selecionadas",
                                  selectAll: "Todas"
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            {!usuarioEhEmpresaTerceirizada() && (
                              <div className="col-4">
                                <label className="label font-weight-normal pb-2 pt-2">
                                  Relação por Diagnóstico
                                </label>
                                <Field
                                  component={StatefulMultiSelect}
                                  name="alergias_intolerancias"
                                  options={filtros.alergias_intolerancias.map(
                                    alergia_intolerancia => ({
                                      label: alergia_intolerancia.nome,
                                      value: alergia_intolerancia.id
                                    })
                                  )}
                                  selected={
                                    values.alergias_intolerancias_selecionados ||
                                    []
                                  }
                                  onSelectedChanged={value =>
                                    form.change(
                                      "alergias_intolerancias_selecionados",
                                      value
                                    )
                                  }
                                  overrideStrings={{
                                    search: "Busca",
                                    selectSomeItems: "Selecione diagnósticos",
                                    allItemsAreSelected:
                                      "Todos os diagnósticos estão selecionados",
                                    selectAll: "Todos"
                                  }}
                                />
                              </div>
                            )}
                            {usuarioEhEmpresaTerceirizada() && (
                              <div className="col-4">
                                <label className="label font-weight-normal pb-2 pt-2">
                                  Protocolo padrão
                                </label>
                                <Field
                                  component={StatefulMultiSelect}
                                  name="protocolos_padrao"
                                  options={filtros.protocolos_padrao.map(
                                    protocolo_padrao => ({
                                      label: protocolo_padrao.nome,
                                      value: protocolo_padrao.uuid
                                    })
                                  )}
                                  selected={
                                    values.protocolos_padrao_selecionados || []
                                  }
                                  onSelectedChanged={value =>
                                    form.change(
                                      "protocolos_padrao_selecionados",
                                      value
                                    )
                                  }
                                  overrideStrings={{
                                    search: "Busca",
                                    selectSomeItems:
                                      "Selecione protocolos padrão",
                                    allItemsAreSelected:
                                      "Todos os protocolos padrão estão selecionados",
                                    selectAll: "Todos"
                                  }}
                                />
                              </div>
                            )}
                            <div className="col-6">
                              <label className="label font-weight-normal pb-2 pt-2">
                                Unidades Educacionais
                              </label>
                              {console.log(
                                values.lotes_selecionados &&
                                  values.lotes_selecionados.length > 0 &&
                                  unidadesEducacionais.length === 0
                              )}
                              <Spin
                                tip="Carregando unidades educacionais..."
                                spinning={
                                  values.lotes_selecionados !== undefined &&
                                  values.lotes_selecionados.length > 0 &&
                                  unidadesEducacionais.length === 0
                                }
                              >
                                <Field
                                  component={StatefulMultiSelect}
                                  name="unidades_educacionais"
                                  options={unidadesEducacionais}
                                  selected={
                                    values.unidades_educacionais_selecionadas ||
                                    []
                                  }
                                  onSelectedChanged={value => {
                                    form.change(
                                      "unidades_educacionais_selecionadas",
                                      value
                                    );
                                  }}
                                  overrideStrings={{
                                    search: "Busca",
                                    selectSomeItems:
                                      "Selecione unidades educacionais",
                                    allItemsAreSelected:
                                      "Todos as unidades estão selecionadas",
                                    selectAll: "Todas"
                                  }}
                                  disabled={!values.lotes_selecionados}
                                />
                              </Spin>
                            </div>
                          </div>
                          <div
                            className={
                              dietasEspeciais && dietasEspeciais.length < 0
                                ? "mt-4"
                                : "botoes"
                            }
                          >
                            <Botao
                              texto="Filtrar"
                              type={BUTTON_TYPE.SUBMIT}
                              style={BUTTON_STYLE.GREEN}
                              icon={BUTTON_ICON.FILTER}
                              className="float-right ml-3"
                            />
                            <Botao
                              texto="Limpar Filtros"
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                              type={BUTTON_TYPE.BUTTON}
                              icon={BUTTON_ICON.TIMES}
                              className="float-right ml-3"
                              onClick={() => form.reset()}
                            />
                          </div>
                        </>
                      )}
                    </Spin>
                  )}
                </form>
              )}
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
