import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { getProdutosPorFiltro } from "services/produto.service";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import FormBuscaProduto from "./FormBuscaProduto";
import { ATIVACAO_DE_PRODUTO, GESTAO_PRODUTO } from "configs/constants";
import "./style.scss";

const checaStatus = obj =>
  obj.status === "CODAE_HOMOLOGADO" ||
  obj.status === "ESCOLA_OU_NUTRICIONISTA_RECLAMOU";

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
              <div>
                {checaStatus(produto.ultima_homologacao) ? "Ativo" : "Suspenso"}
              </div>
              <div>
                <Link
                  to={`/${GESTAO_PRODUTO}/${ATIVACAO_DE_PRODUTO}/detalhe?id=${
                    produto.ultima_homologacao.uuid
                  }`}
                >
                  <Botao
                    type={BUTTON_TYPE.BUTTON}
                    texto="Visualizar"
                    icon={undefined}
                    style={BUTTON_STYLE.GREEN}
                  />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const AtivacaoSuspencaoProduto = () => {
  const [produtos, setProdutos] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      const response = await getProdutosPorFiltro(filtros);
      setCarregando(false);
      setProdutos(response.data.results);
    }
    fetchData();
  }, [filtros, setProdutos]);

  const onSubmitForm = formValues => {
    const status = [];
    switch (formValues.status) {
      case "ativo":
        status.push("CODAE_HOMOLOGADO", "ESCOLA_OU_NUTRICIONISTA_RECLAMOU");
        break;
      case "suspenso":
        status.push("CODAE_SUSPENDEU");
        break;
      default:
        status.push(
          "CODAE_HOMOLOGADO",
          "ESCOLA_OU_NUTRICIONISTA_RECLAMOU",
          "CODAE_SUSPENDEU"
        );
    }
    setFiltros({ ...formValues, status });
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 screen-ativacao-suspensao-produto">
        <div className="card-body">
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
            <div className="texto-veja-resultados">{`Veja resultados para "${
              filtros && filtros.nome_produto ? filtros.nome_produto : ""
            }" :`}</div>
            <TabelaProdutos produtos={produtos} />
          </div>
        )}
      </div>
    </Spin>
  );
};

export default AtivacaoSuspencaoProduto;
