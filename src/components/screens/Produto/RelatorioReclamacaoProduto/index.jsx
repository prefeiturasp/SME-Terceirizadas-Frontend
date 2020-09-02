import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { gerarParametrosConsulta } from "helpers/utilities";

import { getProdutosRelatorioReclamacao } from "services/produto.service";

import FormBuscaProduto from "./components/FormBuscaProduto";
import ModalRelatorioReclamacao from "./components/ModalRelatorioReclamacao";

import "./styles.scss";
import "antd/dist/antd.css";

const RelatorioReclamacaoProduto = () => {
  const [carregando, setCarregando] = useState(false);
  const [produtos, setProdutos] = useState(null);
  const [exibirModal, setExibirModal] = useState(null);
  const [filtros, setFiltros] = useState(null);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      setProdutos(null);
      const params = gerarParametrosConsulta(filtros);
      const response = await getProdutosRelatorioReclamacao(params);
      setProdutos(response.data);
      if (response.data.length > 0) setExibirModal(true);
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
          />

          {produtos && !produtos.length && (
            <div className="text-center mt-5">
              A consulta retornou 0 resultados.
            </div>
          )}
          {produtos && (
            <ModalRelatorioReclamacao
              showModal={exibirModal}
              closeModal={() => setExibirModal(null)}
              produtos={produtos}
              filtros={filtros}
            />
          )}
        </div>
      </div>
    </Spin>
  );
};

export default RelatorioReclamacaoProduto;
