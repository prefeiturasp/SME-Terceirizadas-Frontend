import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getGuiasEscola } from "../../../../services/logistica.service.js";
import ListagemGuias from "./components/ListagemGuias";
import Filtros from "./components/Filtros";
import "./styles.scss";
import { gerarParametrosConsulta } from "helpers/utilities";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [guias, setGuias] = useState();
  const [filtros, setFiltros] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [initialValues, setInitialValues] = useState();

  const buscarGuias = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getGuiasEscola(params);
    if (response.data.count) {
      setGuias(response.data.results);
      setTotal(response.data.count);
    } else {
      setTotal(response.data.count);
      setGuias();
    }
    setAtivos([]);
    setCarregando(false);
  };

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(window.location.search);
      const codigo = urlParams.get("numero_guia");
      const filtro = {
        numero_guia: codigo
      };
      setFiltros({ ...filtro });
      setInitialValues({ ...filtro });
    } else {
      const filtro = {
        status: ["PENDENTE_DE_CONFERENCIA"]
      };
      setFiltros({ ...filtro });
    }
  }, []);

  useEffect(() => {
    if (filtros) {
      buscarGuias(1);
      setPage(1);
    }
  }, [filtros]);

  const nextPage = page => {
    buscarGuias(page);
    setPage(page);
  };

  const updatePage = () => {
    buscarGuias(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-conferir-entrega">
        <div className="card-body conferir-entrega">
          <Filtros setFiltros={setFiltros} initialValuesProp={initialValues} />
          {guias && (
            <>
              <br /> <hr /> <br />
              <ListagemGuias
                guias={guias}
                ativos={ativos}
                setAtivos={setAtivos}
                updatePage={updatePage}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {total === 0 && (
            <div className="text-center mt-5">
              Não existe informação para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
