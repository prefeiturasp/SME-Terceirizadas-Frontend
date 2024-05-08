import React from "react";
import { Form } from "react-final-form";
import { Cabecalho } from "./components/Cabecalho";
import "./styles.scss";

export const NovoRelatorioVisitas = () => {
  const onSubmit = () => {};

  return (
    <div className="card novo-relatorio-visitas mt-3">
      <div className="card-body">
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Cabecalho values={form.getState().values} form={form} />
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
