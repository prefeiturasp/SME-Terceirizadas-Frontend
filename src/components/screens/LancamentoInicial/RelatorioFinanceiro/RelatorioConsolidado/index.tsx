import React from "react";
import { Form } from "react-final-form";

import { Spin } from "antd";
import { FormFields } from "../components/FormFields";

import useView from "../view";

export function RelatorioConsolidado() {
  const view = useView({});

  return (
    <div className="relatorio-consolidado">
      <Spin tip="Carregando..." spinning={view.carregando}>
        <div className="card mt-3">
          <div className="card-body">
            <Form onSubmit={() => {}} initialValues={view.valoresIniciais}>
              {() => (
                <form>
                  <FormFields
                    lotes={view.lotes}
                    gruposUnidadeEscolar={view.gruposUnidadeEscolar}
                    mesesAnos={view.mesesAnos}
                  />
                </form>
              )}
            </Form>
          </div>
        </div>
      </Spin>
    </div>
  );
}
