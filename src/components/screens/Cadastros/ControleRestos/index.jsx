import React, { useState, useEffect } from "react";

import FormFiltros from "./components/FormFiltros";
import TabelaResultados from "./components/TabelaResultados";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Spin } from "antd";

import {
  setDadosResultados,
  setExibirResultados,
  setTotalResultados,
  setFiltros,
  setPage,
  setMeusDados,
  reset,
} from "reducers/controleRestosReducer";
import { toastError } from "components/Shareable/Toast/dialogs";
import { TIPO_PERFIL } from "constants/shared";
import { Paginacao } from "components/Shareable/Paginacao";
import { consultaControleRestos } from "services/controleRestos.service";

const ControleRestos = ({
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
  setMeusDados,
  reset,
}) => {
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      reset();
      setFirstLoad(false);
    } else if (filtros) fetchData({ ...filtros, page: 1 });
  }, [filtros]);

  const fetchData = async (filtros) => {
    setLoading(true);
    setExibirResultados(false);
    const escolas = filtros.escolas;
    if (filtros.escola) {
      let escola_ = filtros.escola;
      if (localStorage.getItem("tipo_perfil") === TIPO_PERFIL.ESCOLA) {
        escola_ = escola_[0];
      }
      filtros.escola = escolas.find(
        (escola) =>
          escola.label === escola_.substring(escola_.indexOf("- ") + 2)
      ).value;
    }
    delete filtros.escolas;
    try {
      const response = await consultaControleRestos({ ...filtros });
      setDadosResultados(response.data);
      if (response.data.count) {
        setTotalResultados(response.data.count);
        setExibirResultados(true);
      }
      setLoading(false);
    } catch (error) {
      toastError("Houve um erro ao consultar as dietas");
      setLoading(false);
    }
  };

  const nextPage = (page) => {
    fetchData({ ...filtros, page: page });
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={loading}>
      <div className="card mt-3 form-filtros-ativas-inativas">
        <div className="card-body">
          <FormFiltros
            setLoading={setLoading}
            setFiltros={setFiltros}
            setDadosUsuario={setMeusDados}
            nextPage={() => nextPage(page)}
          />

          {dadosResultados && !dadosResultados.results.length && (
            <div className="text-center mt-5">
              Não existem dados para filtragem informada.
            </div>
          )}
        </div>
      </div>
      {exibirResultados && (
        <div className="card mt-3">
          <div className="card-body">
            <TabelaResultados
              list={dadosResultados.results}
              nextPage={() => nextPage(page)}
            />
            <hr />
            <Paginacao
              className="mt-3 mb-3"
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

const mapStateToProps = (state) => {
  return {
    dadosResultados: state.controleRestos.dadosResultados,
    exibirResultados: state.controleRestos.exibirResultados,
    totalResultados: state.controleRestos.totalResultados,
    filtros: state.controleRestos.filtros,
    page: state.controleRestos.page,
    meusDados: state.controleRestos.meusDados,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDadosResultados,
      setFiltros,
      setPage,
      setExibirResultados,
      setTotalResultados,
      setMeusDados,
      reset,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ControleRestos);
