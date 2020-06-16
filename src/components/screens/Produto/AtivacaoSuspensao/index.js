import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { getProdutosPorParametros } from "services/produto.service";
import Botao from "components/Shareable/Botao";
import { BUTTON_STYLE } from "components/Shareable/Botao/constants";
import FormBuscaProduto from "./FormBuscaProduto";
import "./style.scss";

// FIXME: remove test data
const testData = [
  {
    nome: "Suco de Laranja",
    marca: { nome: "Teste" },
    fabricante: { nome: "Teste" },
    status: "Ativo"
  },
  {
    nome: "Suco de Uva",
    marca: { nome: "Teste" },
    fabricante: { nome: "Teste" },
    status: "Ativo"
  }
];

const TabelaProdutos = ({ produtos }) => {
  if (!produtos) return false;
  return (
    <section>
      <section>
        <div className="tabela-ativacao-suspensao-produto tabela-header-ativacao-suspensao-produto">
          <div>Nome do Produto</div>
          <div>Marca</div>
          <div>Fabricante</div>
          <div>Status</div>
          <div />
        </div>
      </section>
      {produtos.map((produto, index) => {
        return (
          <div key={index}>
            <div className="tabela-ativacao-suspensao-produto tabela-body-ativacao-suspensao-produto item-ativacao-suspensao-produto">
              <div>{produto.nome}</div>
              <div>{produto.marca.nome}</div>
              <div>{produto.fabricante.nome}</div>
              <div>{produto.status}</div>
              <div>
                {" "}
                <Botao
                  texto="Visualizar"
                  icon={undefined}
                  style={BUTTON_STYLE.GREEN}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const AtivacaoSuspencaoProduto = () => {
  const [produtos, setProdutos] = useState(testData);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosPorParametros(filtros);
      setCarregando(false);
      setProdutos(response.data.results);
    }
    fetchData();
  }, [filtros, setProdutos]);

  const onSubmitForm = formValues => {
    setFiltros(formValues);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 screen-ativacao-suspensao-produto">
        <div className="card-body">
          <h3 className="font-weight-bold">Ativar/suspender produto</h3>
          <FormBuscaProduto
            onSubmit={onSubmitForm}
            onAtualizaProdutos={() => {}}
            exibirBotaoVoltar
          />
        </div>
        {produtos && !produtos.length && (
          <div className="text-center mt-5">
            A consulta retornou 0 resultados.
          </div>
        )}

        {produtos && produtos.length && (
          <div className="container-tabela">
            <TabelaProdutos produtos={produtos} />
          </div>
        )}
      </div>
    </Spin>
  );
};

export default AtivacaoSuspencaoProduto;
