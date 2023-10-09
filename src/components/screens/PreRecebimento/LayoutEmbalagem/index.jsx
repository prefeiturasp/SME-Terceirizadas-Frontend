import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { gerarParametrosConsulta } from "../../../../helpers/utilities";
import { listarLayoutsEmbalagens } from "../../../../services/layoutEmbalagem.service";
import Filtros from "./components/Filtros";
import Listagem from "./components/Listagem";
import { Paginacao } from "../../../Shareable/Paginacao";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState({});
  const [page, setPage] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [consultaRealizada, setConsultaRealizada] = useState(false);

  const [layoutsEmbalagens, setLayoutsEmbalagens] = useState([]);

  const perfilFornecedor =
    JSON.parse(localStorage.getItem("perfil")) === "ADMINISTRADOR_EMPRESA";

  const buscarResultados = async (pageNumber) => {
    setCarregando(true);

    const params = gerarParametrosConsulta({ page: pageNumber, ...filtros });
    const response = await listarLayoutsEmbalagens(params);

    setLayoutsEmbalagens(response.data.results);
    setTotalResultados(response.data.count);
    setConsultaRealizada(true);

    setCarregando(false);
  };

  const nextPage = (page) => {
    buscarResultados(page);
    setPage(page);
  };

  useEffect(() => {
    buscarResultados(1);
    setPage(1);
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-layout-embalagem">
        <div className="card-body layout-embalagem">
          <Filtros
            setFiltros={setFiltros}
            setLayoutsEmbalagens={setLayoutsEmbalagens}
            setConsultaRealizada={setConsultaRealizada}
          />
          {consultaRealizada &&
            (layoutsEmbalagens.length === 0 ? (
              <div className="text-center mt-4 mb-4">
                Nenhum resultado encontrado
              </div>
            ) : (
              <>
                <Listagem
                  objetos={layoutsEmbalagens}
                  perfilFornecedor={perfilFornecedor}
                />
                <div className="row">
                  <div className="col">
                    <Paginacao
                      current={page}
                      total={totalResultados}
                      onChange={nextPage}
                    />
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </Spin>
  );
};
