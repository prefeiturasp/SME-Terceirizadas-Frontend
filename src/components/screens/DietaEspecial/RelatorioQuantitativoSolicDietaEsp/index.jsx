import { Spin } from "antd";
import React, { useState } from "react";

import { Paginacao } from "components/Shareable/Paginacao";

import { getDietasAtivasInativasPorAluno, getRelatorioQuantitativoSolicDietaEsp } from "services/dietaEspecial.service";

import FormFiltros from "./components/FormFiltros";

import "./styles.scss";

const AtivasInativasContainer = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dadosRelatorio, setDadosRelatorio] = useState([]);

  const atualizaDados = async params => {
    console.log('params', params);
    setLoading(true);
    const response = await getRelatorioQuantitativoSolicDietaEsp(params);
    console.log(response)
    setTimeout(() => setLoading(false), 2000);
    //setDadosRelatorio(response.data);
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
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <div>
              <Paginacao
                total={pagTotal}
                onChange={onPaginationChange}
                current={page}
              />
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default AtivasInativasContainer;
