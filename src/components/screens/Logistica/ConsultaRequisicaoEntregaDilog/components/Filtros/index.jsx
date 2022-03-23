import moment from "moment";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputComData } from "components/Shareable/DatePicker";
import Select from "components/Shareable/Select";
import { InputText } from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";
import { getNomesUnidadesEscolares } from "services/logistica.service.js";
import { debounce } from "lodash";

const FORM_NAME = "buscaRequisicoesDilog";

export default ({
  setFiltros,
  setSolicitacoes,
  initialValues,
  setInitialValues
}) => {
  const [desabilitarAluno, setDesabilitarAluno] = useState(false);

  const onSubmit = async values => {
    const filtros = { ...values };
    if (values.data_inicial)
      filtros.data_inicial = moment(values.data_inicial).format("DD/MM/YYYY");
    else delete filtros.data_inicial;
    if (values.data_final)
      filtros.data_final = moment(values.data_final).format("DD/MM/YYYY");
    else delete filtros.data_final;
    if (filtros.status === "Todos") delete filtros.status;
    setFiltros({ ...filtros });
  };

  const getNomeUnidadeEscola = async (codigo, formValues) => {
    const values = { ...formValues };
    if (codigo.length === 0) {
      delete values.nome_unidade;
      setInitialValues({ ...values });
      setDesabilitarAluno(false);
    } else {
      const response = await getNomesUnidadesEscolares({
        codigo_unidade: codigo
      });
      if (response.status === 200) {
        if (response.data.results.length) {
          setInitialValues({
            ...values,
            nome_unidade: response.data.results[0].nome_unidade
          });
          setDesabilitarAluno(true);
        } else {
          delete values.nome_unidade;
          setInitialValues({ ...values });
          setDesabilitarAluno(false);
        }
      } else {
        delete values.nome_unidade;
        setInitialValues({ ...values });
        setDesabilitarAluno(false);
      }
    }
  };

  const getNomeUnidadeEscolaDebounced = debounce(getNomeUnidadeEscola, 1000);

  return (
    <div className="filtros-requisicoes-dilog">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ form, handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-3">
                <Field
                  component={InputText}
                  label="N° da Requisição de Entrega"
                  name="numero_requisicao"
                  placeholder="Digite o número da requisição"
                  className="input-busca-produto"
                />
              </div>
              <div className="col-3">
                <Field
                  component={InputText}
                  label="Nº da guia de remessa"
                  name="numero_guia"
                  placeholder="Digite o número da guia"
                  className="input-busca-produto"
                />
              </div>
              <div className="col-6">
                <Field
                  component={Select}
                  label="Status"
                  name="status"
                  placeholder="Status"
                  options={[
                    { uuid: "", nome: "Selecione" },
                    { uuid: undefined, nome: "Todos" },
                    { uuid: "AGUARDANDO_ENVIO", nome: "Aguardando envio" },
                    {
                      uuid: "AGUARDANDO_CANCELAMENTO",
                      nome: "Aguardando cancelamento"
                    },
                    { uuid: "DILOG_ENVIA", nome: "Enviada" },
                    { uuid: "CANCELADA", nome: "Cancelada" },
                    { uuid: "DISTRIBUIDOR_CONFIRMA", nome: "Confirmada" },
                    { uuid: "DILOG_ACEITA_ALTERACAO", nome: "Alterada" },
                    {
                      uuid: "DISTRIBUIDOR_SOLICITA_ALTERACAO",
                      nome: "Em análise"
                    }
                  ]}
                  className="input-busca-produto"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Field
                  component={InputText}
                  label="Nome do Alimento"
                  name="nome_produto"
                  placeholder="Digite o nome do alimento"
                  className="input-busca-produto"
                />
              </div>
              <div className="col">
                <Field
                  component={InputText}
                  label="Nome do Distribuidor"
                  name="nome_distribuidor"
                  placeholder="Digite o nome do distribuidor"
                  className="input-busca-produto"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <Field
                  component={InputComData}
                  label="Período de Entrega"
                  name="data_inicial"
                  className="data-inicial"
                  placeholder="De"
                  minDate={null}
                  maxDate={
                    values.data_final
                      ? moment(values.data_final, "DD/MM/YYYY")._d
                      : null
                  }
                  writable
                />
              </div>
              <div className="col-2">
                <Field
                  component={InputComData}
                  label="&nbsp;"
                  name="data_final"
                  popperPlacement="bottom-end"
                  placeholder="Até"
                  minDate={
                    values.data_inicial
                      ? moment(values.data_inicial, "DD/MM/YYYY")._d
                      : null
                  }
                  maxDate={null}
                  writable
                />
              </div>
              <div className="col-2">
                <Field
                  component={InputText}
                  label="Cód. CODAE da U.E"
                  name="codigo_unidade"
                  placeholder="Digite o código"
                  className="input-busca-produto"
                />

                <OnChange name="codigo_unidade">
                  {value => {
                    getNomeUnidadeEscolaDebounced(value, values);
                  }}
                </OnChange>
              </div>
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Nome da Unidade Educacional"
                  name="nome_unidade"
                  placeholder="Digite o nome da Unidade Educacional"
                  className="input-busca-produto"
                  disabled={desabilitarAluno}
                />
              </div>
            </div>

            <div className="mt-4 mb-4">
              <Botao
                texto="Consultar"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="float-right ml-3"
                disabled={submitting}
              />

              <Botao
                texto="Limpar Filtros"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right ml-3"
                onClick={() => {
                  form.reset({});
                  setSolicitacoes(undefined);
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
