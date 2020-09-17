import moment from "moment";
import React, { useState, useEffect } from "react";
import { Field, Form, FormSpy, useForm } from "react-final-form";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import SSelect from "components/Shareable/Select";
import MultiSelect from "components/Shareable/FinalForm/MultiSelect";

import { TIPO_PERFIL } from "constants/shared";

import {
  formFiltrosObtemDreEEscolasNovo,
  getDadosIniciais
} from "helpers/dietaEspecial";

import { InputComData } from "components/Shareable/DatePicker";

import "./styles.scss";
import { required, requiredMultiselectKhan } from "helpers/fieldValidators";

export default ({ onSubmit, loading, setLoading }) => {
  const [diretoriasRegionais, setDiretoriasRegionais] = useState([
    { value: "", label: "Carregando..." }
  ]);
  const [escolas, setEscolas] = useState([
    { value: "", label: "Carregando...", dre: { uuid: "" } }
  ]);
  const [escolasFiltrado, setEscolasFiltrado] = useState(escolas);
  const [dadosIniciais, setDadosIniciais] = useState({});
  const [formApi, setFormApi] = useState()

  const tipoUsuario = localStorage.getItem("tipo_perfil");

  console.log({ onSubmit, loading, setLoading });

  useEffect(() => {
    async function effect() {
      await formFiltrosObtemDreEEscolasNovo(setEscolas, setDiretoriasRegionais);
      setDadosIniciais(await getDadosIniciais());
      setLoading(false);
    }
    effect();
  }, []);

  const mudaEscolasFiltrado = ({ dre }, change) => {
    console.log("mudaEscolasFiltrado", { dre });
    if (
      tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
      tipoUsuario === TIPO_PERFIL.ESCOLA
    ) {
      setEscolasFiltrado(escolas);
    } else if (dre) {
      if (dre.length === 0) {
        setEscolasFiltrado(escolas);
        change("escola", "");
      } else {
        const dadosEscolasFiltrado = escolas.filter(e =>
          dre.includes(e.dre.uuid)
        );
        setEscolasFiltrado(dadosEscolasFiltrado);
        change("escola", dadosEscolasFiltrado.map(e => e.value));
      }
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      //initialValues={dadosIniciais}
      render={({ form, handleSubmit, submitting, values }) => {
        const { data_inicial, data_final } = values;
        if (formApi === undefined) {
          console.log('setting formApi!')
          setFormApi(useForm())
        }
        return (
          <form
            onSubmit={handleSubmit}
            className="form-filtros-rel-quant-solic-dieta-esp"
          >
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <Field component={InputComData} label="&nbsp;" name="data_final" />
            {/* <FormSpy subscription={{
              dre: true
            }}
            onChange={props => mudaEscolasFiltrado(props, form.change)}/> */}
            <div className="row">
              <div className="col-5">
                <Field
                  label="Diretoria Regional de Educação"
                  component={MultiSelect}
                  showSearch
                  name="dre"
                  multiple
                  disabled={
                    loading ||
                    tipoUsuario === TIPO_PERFIL.DIRETORIA_REGIONAL ||
                    tipoUsuario === TIPO_PERFIL.ESCOLA
                  }
                  isLoading={loading}
                  options={diretoriasRegionais}
                  nomeDoItemNoPlural="diretorias regionais"
                  pluralFeminino
                  required
                  validate={requiredMultiselectKhan}
                />
              </div>
              <div className="col-7">
                <Field
                  label="Unidade Escolar"
                  component={MultiSelect}
                  showSearch
                  name="escola"
                  multiple
                  disabled={
                    loading ||
                    tipoUsuario === TIPO_PERFIL.ESCOLA ||
                    (values.dre && values.dre.length > 1)
                  }
                  isLoading={loading}
                  options={escolasFiltrado}
                  nomeDoItemNoPlural="escolas"
                  pluralFeminino
                />
              </div>
            </div>
            <div className="row">
              {/* <div className="col-2">
                <Field
                  label="Status"
                  component={SSelect}
                  name="status"
                  options={[
                    { uuid: "", nome: "Todos" },
                    { uuid: "ativas", nome: "Ativas" },
                    { uuid: "inativas", nome: "Inativas" },
                    { uuid: "pendentes", nome: "Pendentes" }
                  ]}
                  naoDesabilitarPrimeiraOpcao
                />
              </div> */}
              {/* <div className="col-3">
                <Field
                  component={InputComData}
                  label="Período"
                  name="data_inicial"
                  className="data-inicial"
                  labelClassName="datepicker-fixed-padding"
                  placeholder="De"
                  minDate={null}
                  maxDate={
                    data_final
                      ? moment(data_final, "DD/MM/YYYY")._d
                      : moment()._d
                  }
                  required
                  validate={required}
                />
              </div> */}
              {/* <div className="col-3">
                <Field
                  component={InputComData}
                  label="&nbsp;"
                  name="data_final"
                  labelClassName="datepicker-fixed-padding"
                  popperPlacement="bottom-end"
                  placeholder="Até"
                  minDate={
                    data_inicial ? moment(data_inicial, "DD/MM/YYYY")._d : null
                  }
                  maxDate={moment()._d}
                  validate={required}
                />
              </div> */}
              <div className="col-4 botoes-envio">
                <Botao
                  texto="Limpar Filtros"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  disabled={submitting}
                  onClick={form.reset()}
                />
                <Botao
                  style={BUTTON_STYLE.GREEN}
                  texto="Consultar"
                  className="ml-3"
                  type={BUTTON_TYPE.SUBMIT}
                  disabled={loading || submitting}
                />
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};
