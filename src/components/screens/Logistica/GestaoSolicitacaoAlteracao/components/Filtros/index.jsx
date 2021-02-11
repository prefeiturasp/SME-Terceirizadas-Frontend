import moment from "moment";
import React from "react";
import { Form, Field } from "react-final-form";
import FinalFormToRedux from "components/Shareable/FinalFormToRedux";
import { InputComData } from "components/Shareable/DatePicker";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";
import { InputText } from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./style.scss";

const FORM_NAME = "buscaSolicitacaoAlteracao";

export default ({ setFiltros, setSolicitacoes, setTotal }) => {
  const onSubmit = async values => {
    const filtros = { ...values };
    setFiltros({ ...filtros });
  };

  return (
    <div className="filtros-solicitacao-alteracao">
      <Form
        onSubmit={onSubmit}
        render={({ form, handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <FinalFormToRedux form={FORM_NAME} />
            <div className="row">
              <div className="col-6">
                <Field
                  component={InputText}
                  label="Nº da Solicitação de Alteração"
                  name="numero_solicitacao"
                  placeholder="Digite o número da solicitação"
                  className="input-busca-produto"
                />
              </div>
              <div className="col-3">
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
                />
              </div>
              <div className="col-3">
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
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Field
                  component={InputText}
                  label="Nome do distribuidor"
                  name="nome_distribuidor"
                  placeholder="Digite o nome do distribuidor"
                  className="input-busca-produto"
                />
              </div>
              <div className="col">
                <Field
                  label="Motivo de alteração"
                  component={MultiSelect}
                  disableSearch
                  name="motivos"
                  multiple
                  nomeDoItemNoPlural="classificações"
                  pluralFeminino
                  options={[
                    {
                      value: "ALTERAR_DATA_ENTREGA",
                      label: "Alterar data de entrega"
                    },
                    {
                      value: "ALTERAR_QTD_ALIMENTO",
                      label: "Alterar quantidade de alimento"
                    },
                    {
                      value: "ALTERAR_ALIMENTO",
                      label: "Alterar alimento"
                    },
                    { value: "OUTROS", label: "Outros" }
                  ]}
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
                  setTotal(undefined);
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
