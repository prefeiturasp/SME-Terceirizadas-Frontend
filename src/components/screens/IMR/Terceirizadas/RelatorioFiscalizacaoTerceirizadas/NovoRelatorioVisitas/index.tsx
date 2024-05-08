import React from "react";
import { Form } from "react-final-form";
import { Cabecalho } from "./components/Cabecalho";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import "./styles.scss";

export const NovoRelatorioVisitas = () => {
  const onSubmit = () => {};

  return (
    <div className="card novo-relatorio-visitas mt-3">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, values, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Cabecalho values={form.getState().values} form={form} />
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>
              <div className="row float-end mt-4">
                <div className="col-12">
                  <Botao
                    texto="Cancelar"
                    onClick={() => {
                      form.reset();
                    }}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto={
                      values.uuid ? "Atualizar rascunho" : "Salvar rascunho"
                    }
                    className="ms-3"
                    disabled={submitting}
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
