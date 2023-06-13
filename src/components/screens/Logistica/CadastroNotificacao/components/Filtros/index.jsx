import moment from "moment";
import React from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputComData } from "components/Shareable/DatePicker";
import { InputText } from "components/Shareable/Input/InputText";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";
import SelectSelecione from "components/Shareable/SelectSelecione";
import { useState } from "react";
import { getNomesDistribuidores } from "services/logistica.service";
import { useEffect } from "react";
import { TIPOS_OCORRENCIAS_OPTIONS } from "constants/shared";
import { Checkbox } from "antd";

const FORM_NAME = "guiasOcorrencias";

export default ({
  setFiltros,
  setGuias,
  travaEmpresa,
  showVinculadas,
  onChangeVinculadas
}) => {
  const [distribuidores, setDistribuidores] = useState([]);

  const initialValues = {};

  const onSubmit = async values => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };

  useEffect(() => {
    const buscaDistribuidores = async () => {
      const response = await getNomesDistribuidores();
      setDistribuidores(
        response.data.results.map(distribuidor => ({
          nome: distribuidor.nome_fantasia,
          uuid: distribuidor.uuid
        }))
      );
    };

    buscaDistribuidores();
  }, []);

  return (
    <div className="filtros-guias-ocorrencias">
      <div className="titulo-verde">Guias com Notificações para Vincular</div>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-6">
                <Field
                  component={SelectSelecione}
                  naoDesabilitarPrimeiraOpcao
                  options={distribuidores}
                  label="Empresa"
                  name="empresa"
                  required
                  placeholder={"Selecione uma Empresa"}
                  disabled={travaEmpresa}
                />
              </div>
              <div className="col-6">
                <Field
                  component={InputText}
                  apenasNumeros
                  label="Nº da Guia de Remessa"
                  name="numero_guia"
                  placeholder="Digite o Nº da Guia de Remessa"
                  className="input-numero-guia"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Field
                  label="Motivo da Ocorrência"
                  component={MultiSelect}
                  disableSearch
                  name="motivos_ocorrencia"
                  multiple
                  nomeDoItemNoPlural="ocorrências"
                  options={TIPOS_OCORRENCIAS_OPTIONS}
                  placeholder="Selecione a Ocorrência"
                />
              </div>
              <div className="col-3">
                <Field
                  component={InputComData}
                  label="Período de Entrega"
                  name="data_inicial"
                  className="data-inicial"
                  placeholder="De"
                  writable={false}
                  minDate={null}
                  maxDate={
                    values.data_final
                      ? moment(values.data_final, "DD/MM/YYYY")._d
                      : null
                  }
                />
              </div>
              <div className="col-3">
                <Field
                  component={InputComData}
                  label="&nbsp;"
                  name="data_final"
                  className="data-final"
                  popperPlacement="bottom-end"
                  placeholder="Até"
                  writable={false}
                  strictParsing
                  minDate={
                    values.data_inicial
                      ? moment(values.data_inicial, "DD/MM/YYYY")._d
                      : null
                  }
                  maxDate={null}
                />
              </div>
            </div>

            <div className="mt-4 mb-4">
              <div className="float-left">
                <Checkbox
                  checked={showVinculadas}
                  onChange={onChangeVinculadas}
                >
                  Exibir somente as guias já vinculadas
                </Checkbox>
              </div>

              <Botao
                texto="Consultar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-right ml-3"
                disabled={!values.empresa}
              />

              {!travaEmpresa && (
                <Botao
                  texto="Limpar Filtros"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  className="float-right ml-3"
                  onClick={() => {
                    form.reset({});
                    setGuias(undefined);
                  }}
                />
              )}
            </div>
          </form>
        )}
      />
    </div>
  );
};
