import React from "react";
import { Form } from "react-final-form";

import { Spin } from "antd";
import { FormFields } from "../components/FormFields";

import useView from "../view";
import { TabelaAlimentacaoCEI } from "../components/TabelaAlimentacaoCEI";
import "./styles.scss";

export function RelatorioConsolidado() {
  const view = useView({});

  const exibeTabelasCEI = view.relatorioConsolidado?.tipos_unidades.find(
    (tipoUnidade) => ["CEI", "CEI CEU", "CCI"].includes(tipoUnidade.iniciais)
  );

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

            {!view.carregando && view.relatorioConsolidado ? (
              <div className="tabelas-relatorio-consolidado mt-4 mb-4">
                {exibeTabelasCEI ? (
                  <TabelaAlimentacaoCEI
                    tabelas={view.relatorioConsolidado.tabelas}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Spin>
    </div>
  );
}
