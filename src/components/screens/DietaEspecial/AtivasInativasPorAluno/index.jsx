import React, { useState, useEffect } from "react";

import FormFiltros from "./components/FormFiltros";
import TabelaResultados from "./components/TabelaResultados";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import { getDietasAtivasInativasPorAluno } from "../../../../services/dietaEspecial.service";

import { Spin, Pagination } from "antd";

import {
  setDadosResultados,
  setExibirResultados,
  setTotalResultados,
  setFiltros,
  setPage,
  reset
} from "reducers/dietasAtivasInativasPorAlunoReducer";

const AtivasInativasPorAluno = ({
  dadosResultados,
  setDadosResultados,
  exibirResultados,
  setExibirResultados,
  totalResultados,
  setTotalResultados,
  filtros,
  setFiltros,
  page,
  setPage,
  reset,
  history
}) => {
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      if (history && history.action === "PUSH") reset();
      setFirstLoad(false);
    } else if (filtros) fetchData(filtros);
  }, [filtros]);

  const fetchData = async filtros => {
    setLoading(true);
    setExibirResultados(false);
    const response = await getDietasAtivasInativasPorAluno({ ...filtros });
    setDadosResultados(response.data.results);
    if (response.data.count) {
      setTotalResultados(response.data.count);
      setExibirResultados(true);
    }
    setLoading(false);
  };

  const nextPage = page => {
    fetchData({ ...filtros, page: page });
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={loading}>
      <div className="card mt-3 form-filtros-ativas-inativas">
        <div className="card-body">
          <FormFiltros setLoading={setLoading} setFiltros={setFiltros} />

          {dadosResultados && !dadosResultados.solicitacoes.length && (
            <div className="text-center mt-5">
              Não existem dados para filtragem informada.
            </div>
          )}
        </div>
      </div>
      {exibirResultados && (
        <div className="card mt-3">
          <div className="card-body">
            <TabelaResultados dadosDietaPorAluno={dadosResultados} />
            <hr />
            <Pagination
              total={totalResultados}
              onChange={nextPage}
              current={page}
              pageSize={10}
            />
          </div>
        </div>
      )}
    </Spin>
  );
};

const mapStateToProps = state => {
  return {
    dadosResultados: state.dietasAtivasInativasPorAluno.dadosResultados,
    exibirResultados: state.dietasAtivasInativasPorAluno.exibirResultados,
    totalResultados: state.dietasAtivasInativasPorAluno.totalResultados,
    filtros: state.dietasAtivasInativasPorAluno.filtros,
    page: state.dietasAtivasInativasPorAluno.page
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDadosResultados,
      setFiltros,
      setPage,
      setExibirResultados,
      setTotalResultados,
      reset
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AtivasInativasPorAluno)
);
