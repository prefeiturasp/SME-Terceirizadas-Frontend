import { Spin, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import {
  reset,
  setProdutos,
  setProdutosCount,
  setAtivos,
  setFiltros,
  setPage
} from "reducers/buscaAvancadaProduto";

import { getProdutosListagem } from "services/produto.service";

import FormBuscaProduto from "./components/FormBuscaProduto";
import ListagemProdutos from "./components/ListagemProdutos";

import { ordenaProdutos } from "./helpers";

import "./style.scss";
import "antd/dist/antd.css";

const BuscaAvancada = ({
  produtos,
  setProdutos,
  produtosCount,
  setProdutosCount,
  page,
  setPage,
  ativos,
  setAtivos,
  filtros,
  setFiltros,
  history,
  reset
}) => {
  const [carregando, setCarregando] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const PAGE_SIZE = 10;

  const fetchData = async () => {
    setCarregando(true);
    const params = { ...filtros, page: page, page_size: PAGE_SIZE };
    const response = await getProdutosListagem(params);
    setProdutos(ordenaProdutos(response.data.results));
    setProdutosCount(response.data.count);
    setCarregando(false);
  };

  useEffect(() => {
    if (firstLoad) {
      if (history && history.action === "PUSH") reset();
      setFirstLoad(false);
    } else if (filtros) fetchData();
  }, [filtros, page]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3">
        <div className="card-body ">
          <FormBuscaProduto
            onAtualizaProdutos={() => {}}
            exibirBotaoVoltar
            exibirStatus={false}
            setFiltros={setFiltros}
            setPage={setPage}
          />

          {produtos && !produtos.length && (
            <section className="resultado-busca-produto-avancada">
              <header>Nenhum resultado encontrado</header>
            </section>
          )}
          {produtos && !!produtos.length && (
            <>
              <ListagemProdutos
                produtos={produtos}
                ativos={ativos}
                setAtivos={setAtivos}
              />

              <Pagination
                current={page || 1}
                total={produtosCount}
                showSizeChanger={false}
                onChange={page => {
                  setPage(page);
                }}
                pageSize={PAGE_SIZE}
              />
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = state => {
  return {
    ativos: state.buscaAvancadaProduto.ativos,
    filtros: state.buscaAvancadaProduto.filtros,
    produtos: state.buscaAvancadaProduto.produtos,
    produtosCount: state.buscaAvancadaProduto.produtosCount,
    page: state.buscaAvancadaProduto.page
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAtivos,
      setFiltros,
      setPage,
      setProdutos,
      setProdutosCount,
      reset
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BuscaAvancada)
);
