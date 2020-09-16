import "antd/dist/antd.css";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getProdutosRelatorioSuspenso } from "services/produto.service";
import FormBuscaProduto from "./components/FormBuscaProduto";
import ModalRelatorioProdutoSuspenso from "./components/ModalRelatorioProdutoSuspenso";
import { STATUS_CODAE_SUSPENDEU } from "configs/constants";
import { gerarParametrosConsulta } from "helpers/utilities";
import "./styles.scss";

const BuscaProdutoSuspensos = () => {
  const [produtos, setProdutos] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState(null);
  const [exibirModal, setExibirModal] = useState(null);
  const [produtosCount, setProdutosCount] = useState(0);
  const PAGE_SIZE = 10;

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      setProdutos(null);
      const params = gerarParametrosConsulta({
        ...filtros,
        page: 1,
        page_size: PAGE_SIZE
      });
      const response = await getProdutosRelatorioSuspenso(params);
      setProdutos(response.data.results);
      if (response.data.results.length > 0) setExibirModal(true);
      setProdutosCount(response.data.count);
      setCarregando(false);
    }
    fetchData();
  }, [filtros]);

  const onSubmitForm = formValues => {
    setFiltros({ ...formValues, status: STATUS_CODAE_SUSPENDEU });
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 margem-da-pagina">
        <div className="card-body ">
          <FormBuscaProduto onSubmit={onSubmitForm} />
        </div>
        {produtos && !produtos.length && (
          <div className="text-center mt-5">
            Não existe dados para filtragem informada
          </div>
        )}
        <ModalRelatorioProdutoSuspenso
          showModal={exibirModal}
          closeModal={() => setExibirModal(null)}
          produtos={produtos}
          setProdutos={setProdutos}
          filtros={filtros}
          produtosCount={produtosCount}
          pageSize={PAGE_SIZE}
        />
      </div>
    </Spin>
  );
};

export default BuscaProdutoSuspensos;
