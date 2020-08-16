import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getProdutosRelatorioAnaliseSensorial } from "services/produto.service";
import FormBuscaProduto from "./components/FormBuscaProduto";
import ModalRelatorioAnaliseSensorial from "./components/ModalRelatorioAnaliseSensorial";
import "./styles.scss";

const BuscaAvancadaProdutoAnaliseSensorial = () => {
  const [produtos, setProdutos] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState(null);
  const [exibirModal, setExibirModal] = useState(null);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      setProdutos(null);
      const response = await getProdutosRelatorioAnaliseSensorial(filtros);
      setProdutos(response.data.results);
      if (response.data.results.length > 0) setExibirModal(true);
      setCarregando(false);
    }
    fetchData();
  }, [filtros]);

  const onSubmitForm = formValues => {
    setFiltros({ ...formValues });
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 margem-da-pagina">
        <div className="card-body ">
          <label className="card-title">
            Consulte por empresas, período ou produtos no sistema
          </label>
          <FormBuscaProduto
            onSubmit={onSubmitForm}
            onAtualizaProdutos={() => {}}
            exibirBotaoVoltar
            exibirStatus={false}
          />
        </div>
        {produtos && !produtos.length && (
          <div className="text-center mt-5">
            A consulta retornou 0 resultados.
          </div>
        )}
        <ModalRelatorioAnaliseSensorial
          showModal={exibirModal}
          closeModal={() => setExibirModal(null)}
          produtos={produtos}
          filtros={filtros}
        />
      </div>
    </Spin>
  );
};

export default BuscaAvancadaProdutoAnaliseSensorial;
