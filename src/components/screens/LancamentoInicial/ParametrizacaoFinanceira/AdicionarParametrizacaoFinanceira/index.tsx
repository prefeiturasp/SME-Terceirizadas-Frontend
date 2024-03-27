import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";

import { Botao } from "components/Shareable/Botao";

import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

import "./style.scss";
import TabelaAlimentacao from "./components/TabelaAlimentacao";
import Filtros from "./components/Filtros";

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
                <TabelaAlimentacao
                  form={form}
                  tiposAlimentacao={tiposAlimentacao}
                  tiposUnidades={tiposUnidades}
                />
              )}
              <div className="d-flex justify-content-end gap-3">
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
