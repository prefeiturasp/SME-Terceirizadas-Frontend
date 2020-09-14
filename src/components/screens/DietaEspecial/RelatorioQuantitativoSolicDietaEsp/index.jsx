import { Spin } from "antd";
import React, { useState } from "react";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Paginacao } from "components/Shareable/Paginacao";

import {
  getDietasAtivasInativasPorAluno,
  getRelatorioQuantitativoSolicDietaEsp
} from "services/dietaEspecial.service";

import FormFiltros from "./components/FormFiltros";

import "./styles.scss";
import TabelaRelatorio from "./components/TabelaRelatorio";

const AtivasInativasContainer = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dadosRelatorio, setDadosRelatorio] = useState();

  const atualizaDados = async params => {
    console.log("params", params);
    setLoading(true);
    const response = await getRelatorioQuantitativoSolicDietaEsp(params);
    console.log(response);
    setLoading(false);
    setDadosRelatorio(response.data);
  };

  const submit = async formValues => {
    atualizaDados(formValues);
  };

  const onPaginationChange = async page => {
    atualizaDados({
      page,
      ...this.state.formValues
    });
    setPage(page);
  };

  const pagTotal = dadosRelatorio ? dadosRelatorio.length : 0;

  console.log('dadosRelatorio', dadosRelatorio)

  return (
    <Spin tip="Carregando..." spinning={loading}>
      <pre>loading = {loading ? "true" : "false"}</pre>
      <div className="card mt-3 relatorio-quantitativo-solic-dieta-esp">
        <div className="card-body">
          <FormFiltros
            onSubmit={submit}
            loading={loading}
            setLoading={setLoading}
          />
          {!loading && dadosRelatorio && dadosRelatorio.length === 0 && (<div>Nâo há dados para o filtro utilizado</div>)}
          {!loading && dadosRelatorio && dadosRelatorio.length !== 0 && (
            <>
              <div className="row row-botao-imprimir">
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  texto="Imprimir"
                  style={BUTTON_STYLE.BLUE}
                  icon={BUTTON_ICON.PRINT}
                  className="float-right"
                />
              </div>
              <TabelaRelatorio dadosRelatorio={dadosRelatorio} />
              <Paginacao
                total={pagTotal}
                onChange={onPaginationChange}
                current={page}
              />
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default AtivasInativasContainer;
