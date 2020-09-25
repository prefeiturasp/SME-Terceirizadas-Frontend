import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { gerarParametrosConsulta } from "helpers/utilities";

import { getProdutosReclamacoes } from "services/produto.service";

import FormBuscaProduto from "./components/FormBuscaProduto";
import ModalRelatorioReclamacao from "./components/ModalRelatorioReclamacao";
import { getStatusHomologacao } from "./helpers";

import "./styles.scss";
import "antd/dist/antd.css";

const RelatorioReclamacaoProduto = () => {
  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState(null);
  const [exibirModal, setExibirModal] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [produtosCount, setProdutosCount] = useState(0);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      setProdutos(null);
      const params = gerarParametrosConsulta({
        ...filtros,
        status: getStatusHomologacao(),
        page: page,
        page_size: PAGE_SIZE
      });
      const response = await getProdutosReclamacoes(params);
      setProdutos(response.data.results);
      setProdutosCount(response.data.count);
      if (response.data.count > 0) setExibirModal(true);
      setCarregando(false);
    }
    fetchData();
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card card-relatorio-reclamacao mt-3">
        <div className="card-body ">
          <FormBuscaProduto
            onAtualizaProdutos={() => {}}
            exibirBotaoVoltar
            exibirStatus={false}
            setFiltros={setFiltros}
            setPage={setPage}
          />

          {produtos && !produtos.length && (
            <div className="text-center mt-5">
              Não existem dados para filtragem informada
            </div>
          )}
          {produtos && (
            <ModalRelatorioReclamacao
              showModal={exibirModal}
              closeModal={() => setExibirModal(null)}
              produtos={produtos}
              produtosCount={produtosCount}
              setProdutos={setProdutos}
              filtros={filtros}
              pageSize={PAGE_SIZE}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </Spin>
  );
};

export default RelatorioReclamacaoProduto;
