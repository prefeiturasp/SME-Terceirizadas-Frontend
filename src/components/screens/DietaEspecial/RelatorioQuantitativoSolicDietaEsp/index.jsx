import { Spin } from "antd";
import React, { useState } from "react";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Paginacao } from "components/Shareable/Paginacao";

import { getRelatorioQuantitativoSolicDietaEsp } from "services/dietaEspecial.service";

import { imprimeRelatorioQuantitativoSolicDietaEsp } from "services/relatorios";

import FormFiltros from "./components/FormFiltros";

import "./styles.scss";
import TabelaRelatorio from "./components/TabelaRelatorio";

const AtivasInativasContainer = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagTotal, setPagTotal] = useState(0);
  const [dadosRelatorio, setDadosRelatorio] = useState();
  const [formValues, setFormValues] = useState();

  const atualizaDados = async (params, page) => {
    setLoading(true);
    const response = await getRelatorioQuantitativoSolicDietaEsp(params, page);
    setLoading(false);
    setPagTotal(response.data.count);
    setDadosRelatorio(response.data.results);
  };

  const submit = async formValuesSubmit => {
    atualizaDados(formValuesSubmit);
    setFormValues(formValuesSubmit);
  };

  const onPaginationChange = async page => {
    atualizaDados(formValues, page);
    setPage(page);
  };

  const imprimeRelatorio = () => {
    imprimeRelatorioQuantitativoSolicDietaEsp(formValues);
  };

  return (
    <Spin tip="Carregando..." spinning={loading}>
      <div className="card mt-3 relatorio-quantitativo-solic-dieta-esp">
        <div className="card-body">
          <FormFiltros
            onSubmit={submit}
            loading={loading}
            setLoading={setLoading}
          />
          {!loading && dadosRelatorio && dadosRelatorio.length === 0 && (
            <div>Nâo há dados para o filtro utilizado</div>
          )}
          {!loading && dadosRelatorio && dadosRelatorio.length !== 0 && (
            <>
              <div className="row row-botao-imprimir">
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  texto="Imprimir"
                  style={BUTTON_STYLE.BLUE}
                  icon={BUTTON_ICON.PRINT}
                  className="float-right"
                  onClick={imprimeRelatorio}
                />
              </div>
              <TabelaRelatorio
                dadosRelatorio={dadosRelatorio}
                filtros={formValues}
              />
              <Paginacao
                total={pagTotal}
                onChange={onPaginationChange}
                current={page}
                pageSize={10}
              />
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default AtivasInativasContainer;
