import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import React, { useState, useEffect } from "react";
import FormBuscaSolicitacao from "./components/FormBuscaSolicitacoes";
import ListagemProdutos from "./components/ListagemSolicitacoes";
import {
  getNomesProdutosSolicitacaoInclusao,
  getSolicitacoesCadastroProdutoDieta
} from "services/produto.service";

export default () => {
  const [ativos, setAtivos] = useState(undefined);
  const [nomesProdutos, setNomesProdutos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState(undefined);
  const onSubmit = async values => {
    const resposta = await getSolicitacoesCadastroProdutoDieta(values);
    if (resposta.status === HTTP_STATUS.OK) {
      setSolicitacoes(resposta.data.results);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const resposta = await getNomesProdutosSolicitacaoInclusao();
      if (resposta.status === HTTP_STATUS.OK) {
        setNomesProdutos(resposta.data);
      }
    };
    fetchData();
  }, []);
  return (
    <Spin tip="Carregando..." spinning={false}>
      <div className="card mt-3">
        <div className="card-body ">
          <FormBuscaSolicitacao
            nomesProdutos={nomesProdutos}
            onSubmit={onSubmit}
          />
          {solicitacoes && solicitacoes.length > 0 && (
            <ListagemProdutos
              solicitacoes={solicitacoes}
              setSolicitacoes={setSolicitacoes}
              ativos={ativos}
              setAtivos={setAtivos}
            />
          )}
          {solicitacoes && solicitacoes.length === 0 && (
            <div className="text-center mt-5">
              A consulta retornou 0 resultados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
