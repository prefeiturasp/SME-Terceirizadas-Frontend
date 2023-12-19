import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { InputComData } from "components/Shareable/DatePicker";
import Select from "components/Shareable/Select";
import { toastError } from "components/Shareable/Toast/dialogs";
import { OPTIONS_STATUS_DIETA } from "constants/shared";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React from "react";
import { OnChange } from "react-final-form-listeners";
import {
  getFiltrosRelatorioDietasEspeciais,
  getUnidadesEducacionaisTercTotal,
} from "services/dietaEspecial.service";
import "./styles.scss";
import { Field } from "react-final-form";

export const Filtros = ({ ...props }) => {
  const {
    erroAPI,
    filtros,
    form,
    meusDados,
    setDietasEspeciais,
    setErroAPI,
    setFiltros,
    setUnidadesEducacionais,
    unidadesEducacionais,
    values,
  } = props;

  const getUnidadesEducacionaisAsync = async (values) => {
    setUnidadesEducacionais([]);
    let data = { lotes: values };
    const response = await getUnidadesEducacionaisTercTotal(data);
    if (response.status === HTTP_STATUS.OK) {
      setUnidadesEducacionais(
        response.data.map((unidade) => ({
          label: unidade.codigo_eol_escola,
          value: unidade.codigo_eol,
        }))
      );
    } else {
      toastError("Erro ao buscar unidades educacionais");
    }
  };

  const getFiltrosRelatorioDietasEspeciaisAsync = async (values) => {
    setFiltros(null);
    const response = await getFiltrosRelatorioDietasEspeciais(values);
    if (response.status === HTTP_STATUS.OK) {
      setFiltros(response.data);
    } else {
      setErroAPI("Erro ao carregar filtros. Tente novamente mais tarde.");
    }
  };

  const LOADING = !filtros || !meusDados || erroAPI;

  return (
    <>
      <div className="sub-titulo">Filtrar dietas</div>
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
            {(value) => {
              const params = {
                status_selecionado: value,
              };
              if (usuarioEhEmpresaTerceirizada()) {
                params["terceirizada"] =
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
                minDate={moment(values.data_inicial, "DD/MM/YYYY")._d}
                maxDate={new Date()}
              />
            </div>
          </>
        )}
      </div>
      {values.status_selecionado && (
        <>
          <Spin tip="Carregando filtros..." spinning={LOADING}>
            {filtros && (
              <>
                <div className="row">
                  <div className="col-4">
                    <label className="label fw-normal pb-2 pt-2">Lote</label>
                    <Field
                      component={StatefulMultiSelect}
                      name="lotes"
                      options={filtros.lotes.map((lote) => ({
                        label: lote.nome,
                        value: lote.uuid,
                      }))}
                      selected={values.lotes_selecionados || []}
                      onSelectedChanged={(value) =>
                        form.change("lotes_selecionados", value)
                      }
                      overrideStrings={{
                        search: "Busca",
                        selectSomeItems: "Selecione lotes",
                        allItemsAreSelected:
                          "Todos os lotes estão selecionados",
                        selectAll: "Todos",
                      }}
                    />
                    <OnChange name="lotes_selecionados">
                      {(value) => {
                        if (value && value.length === 0) {
                          setUnidadesEducacionais([]);
                          form.change(
                            "unidades_educacionais_selecionadas",
                            undefined
                          );
                        } else {
                          getUnidadesEducacionaisAsync(value);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-4">
                    <label className="label fw-normal pb-2 pt-2">
                      Classificação da dieta
                    </label>
                    <Field
                      component={StatefulMultiSelect}
                      name="classificacoes"
                      options={filtros.classificacoes.map((classificacao) => ({
                        label: classificacao.nome,
                        value: classificacao.id,
                      }))}
                      selected={values.classificacoes_selecionadas || []}
                      onSelectedChanged={(value) =>
                        form.change("classificacoes_selecionadas", value)
                      }
                      overrideStrings={{
                        search: "Busca",
                        selectSomeItems: "Selecione classificações de dieta",
                        allItemsAreSelected:
                          "Todos as classificações estão selecionadas",
                        selectAll: "Todas",
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  {!usuarioEhEmpresaTerceirizada() && (
                    <div className="col-4">
                      <label className="label fw-normal pb-2 pt-2">
                        Relação por Diagnóstico
                      </label>
                      <Field
                        component={StatefulMultiSelect}
                        name="alergias_intolerancias"
                        options={filtros.alergias_intolerancias.map(
                          (alergia_intolerancia) => ({
                            label: alergia_intolerancia.nome,
                            value: alergia_intolerancia.id,
                          })
                        )}
                        selected={
                          values.alergias_intolerancias_selecionadas || []
                        }
                        onSelectedChanged={(value) =>
                          form.change(
                            "alergias_intolerancias_selecionadas",
                            value
                          )
                        }
                        overrideStrings={{
                          search: "Busca",
                          selectSomeItems: "Selecione diagnósticos",
                          allItemsAreSelected:
                            "Todos os diagnósticos estão selecionados",
                          selectAll: "Todos",
                        }}
                      />
                    </div>
                  )}
                  {usuarioEhEmpresaTerceirizada() && (
                    <div className="col-4">
                      <label className="label fw-normal pb-2 pt-2">
                        Protocolo padrão
                      </label>
                      <Field
                        component={StatefulMultiSelect}
                        name="protocolos_padrao"
                        options={filtros.protocolos_padrao.map(
                          (protocolo_padrao) => ({
                            label: protocolo_padrao.nome,
                            value: protocolo_padrao.uuid,
                          })
                        )}
                        selected={values.protocolos_padrao_selecionados || []}
                        onSelectedChanged={(value) =>
                          form.change("protocolos_padrao_selecionados", value)
                        }
                        overrideStrings={{
                          search: "Busca",
                          selectSomeItems: "Selecione protocolos padrão",
                          allItemsAreSelected:
                            "Todos os protocolos padrão estão selecionados",
                          selectAll: "Todos",
                        }}
                      />
                    </div>
                  )}
                  <div className="col-6">
                    <label className="label fw-normal pb-2 pt-2">
                      Unidades Educacionais
                    </label>
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
                          values.unidades_educacionais_selecionadas || []
                        }
                        onSelectedChanged={(value) => {
                          form.change(
                            "unidades_educacionais_selecionadas",
                            value
                          );
                        }}
                        overrideStrings={{
                          search: "Busca",
                          selectSomeItems: "Selecione unidades educacionais",
                          allItemsAreSelected:
                            "Todos as unidades estão selecionadas",
                          selectAll: "Todas",
                        }}
                        disabled={!values.lotes_selecionados}
                      />
                    </Spin>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 text-end">
                    <Botao
                      texto="Limpar Filtros"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      type={BUTTON_TYPE.BUTTON}
                      icon={BUTTON_ICON.TIMES}
                      onClick={() => {
                        form.reset();
                        setDietasEspeciais(null);
                      }}
                    />
                    <Botao
                      texto="Filtrar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      icon={BUTTON_ICON.FILTER}
                      className="ms-3"
                    />
                  </div>
                </div>
              </>
            )}
          </Spin>
        </>
      )}
    </>
  );
};
