import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";

import { TextArea } from "components/Shareable/TextArea/TextArea";

import { Botao } from "components/Shareable/Botao";

import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

import "./style.scss";
import TabelaAlimentacao from "./components/TabelaAlimentacao";
import Filtros from "./components/Filtros";
import TabelaDietaTipoA from "./components/TabelaDietaTipoA";
import TabelaDietaTipoB from "./components/TabelaDietaTipoB";

type FormValues = {
  edital: string;
  lote: string;
  tipos_unidades: string;
};

export default () => {
  const [tiposUnidades, setTiposUnidades] = useState([]);
  const [tiposAlimentacao, setTiposAlimentacao] = useState([]);

  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
    // eslint-disable-next-line
    console.log(values);
  };

  return (
    <div className="card">
      <div className="card-body">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            edital: "",
            lote: "",
            tipos_unidades: "",
          }}
          render={({ form, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Filtros
                tiposUnidades={tiposUnidades}
                setTiposUnidades={setTiposUnidades}
                setTiposAlimentacao={setTiposAlimentacao}
              />
              {tiposAlimentacao.length > 0 && (
                <>
                  <TabelaAlimentacao
                    form={form}
                    tiposAlimentacao={tiposAlimentacao}
                    tiposUnidades={tiposUnidades}
                  />
                  <div className="d-flex gap-4">
                    <TabelaDietaTipoA
                      form={form}
                      tiposAlimentacao={tiposAlimentacao}
                    />
                    <TabelaDietaTipoB
                      form={form}
                      tiposAlimentacao={tiposAlimentacao}
                    />
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      <Field
                        component={TextArea}
                        label="Legenda"
                        name="legenda"
                        placeholder={
                          "Insira uma Legenda para os lançamentos\n\n" +
                          "Fonte: Relatório de Medição Inicial do Serviço de Alimentação e Nutrição Escolar realizada pela direção das unidades educacionais, conforme disposto no edital Pregão 78/2016 e nas Portarias Intersecretariais SMG/SME n° 005/2006 e 001/2008."
                        }
                        maxLength={1500}
                        height="150"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="d-flex justify-content-end gap-3 mt-5">
                <Botao
                  texto="Cancelar"
                  onClick={() => {
                    navigate(-1);
                  }}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                />
                <Botao
                  texto="Salvar"
                  style={BUTTON_STYLE.GREEN}
                  type={BUTTON_TYPE.SUBMIT}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};