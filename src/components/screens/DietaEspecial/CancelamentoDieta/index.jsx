import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import FormFiltros from "./components/FormFiltros";
import { getSolicitacaoDietaEspecialListagem } from "services/dietaEspecial.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import ListagemDietas from "./components/ListagemDietas";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState();
  const [dietas, setDietas] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const buscarDietas = async filtros => {
    setCarregando(true);
    setAtivos([]);
    const params = gerarParametrosConsulta({
      ...filtros,
      ativo: true,
      dre: filtros.dre[0],
      escola: filtros.escola[0],
      page: filtros.page,
      status: ["CODAE_AUTORIZADO", "TERCEIRIZADA_TOMOU_CIENCIA"]
    });

    const dietasResponse = await getSolicitacaoDietaEspecialListagem(
      {},
      params
    );
    setDietas(dietasResponse.data.results);
    setTotal(dietasResponse.data.count);
    setCarregando(false);
  };

  useEffect(() => {
    if (filtros) {
      buscarDietas({ ...filtros, page: 1 });
    }
  }, [filtros]);

  const nextPage = page => {
    buscarDietas({ ...filtros, page: page });
    setPage(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card card-dieta-alteracao-ue mt-3">
        <div className="card-body ">
          <FormFiltros setLoading={setCarregando} setFiltros={setFiltros} />

          {dietas && !dietas.length && (
            <div className="text-center mt-5">
              Não existem dados para filtragem informada.
            </div>
          )}

          {dietas && !!dietas.length && (
            <>
              <ListagemDietas
                dietas={dietas}
                ativos={ativos}
                setAtivos={setAtivos}
                filtros={filtros}
                setFiltros={setFiltros}
              />
              <Pagination
                current={page || 1}
                total={total}
                showSizeChanger={false}
                onChange={page => {
                  nextPage(page);
                }}
                pageSize={10}
              />
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
