import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import { getProdutosListagem } from "services/produto.service";
import FormBuscaProduto from "./components/FormBuscaProduto";
import ListagemProdutos from "./components/ListagemProdutos";
import "./style.scss";
import { ordenaProdutos } from "./helpers";
import "antd/dist/antd.css";
import "./style.scss";
import "antd/dist/antd.css";

const BuscaAvancada = () => {
  const [produtos, setProdutos] = useState(null);
  const [produtosCount, setProdutosCount] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosListagem({ ...filtros, page: page });
      setProdutos(ordenaProdutos(response.data.results));
      setProdutosCount(response.data.count);
      setCarregando(false);
    }
    fetchData();
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
              <ListagemProdutos produtos={produtos} />

              <Pagination
                defaultCurrent={1}
                current={page}
                total={produtosCount}
                showSizeChanger={false}
                onChange={page => {
                  setPage(page);
                }}
              />
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default BuscaAvancada;
