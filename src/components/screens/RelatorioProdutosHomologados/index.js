import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Modal } from "react-bootstrap";
import { getProdutosPorParametros } from "services/produto.service";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import FormBuscaProduto from "components/Shareable/FormBuscaProduto";
import "./style.scss";

const TabelaProdutosHomologados = ({ produtos }) => {
  if (!produtos) return false;
  return (
    <section>
      <section>
        <div className="tabela-produtos-homologados tabela-header-produtos-homologados">
          <div>Terceirizada</div>
          <div>Nome do Produto</div>
          <div>Marca</div>
          <div>Dieta Especial</div>
          <div>Aditivos Alergênicos</div>
          <div>Data de Homologação</div>
          <div>Data de Cadastro</div>
        </div>
      </section>
      {produtos.map((produto, index) => {
        return (
          <div key={index}>
            <div className="tabela-produtos-homologados tabela-body-produtos-homologados item-produtos-homologados">
              <div>
                {produto.ultima_homologacao.rastro_terceirizada.nome_fantasia}
              </div>
              <div>{produto.nome}</div>
              <div>{produto.marca.nome}</div>
              <div>{produto.eh_para_alunos_com_dieta ? "Sim" : "Não"}</div>
              <div>{produto.tem_aditivos_alergenicos ? "Sim" : "Não"}</div>
              <div>{produto.ultima_homologacao.criado_em}</div>
              <div>{produto.criado_em}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const RelatorioProdutosHomologados = () => {
  const [produtos, setProdutos] = useState(null);
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
      <div className="card mt-3 page-relatorio-produtos-homologados">
        <div className="card-body">
          <h3 className="font-weight-bold">
            Relatório de Produtos Homologados
          </h3>
          <FormBuscaProduto
            onSubmit={onSubmitForm}
            onAtualizaProdutos={() => {}}
          />
        </div>
      </div>

      {produtos && !produtos.length && (
        <div className="text-center mt-5">
          A consulta retornou 0 resultados.
        </div>
      )}

      <Modal
        dialogClassName="modal-90w"
        show={Boolean(produtos && produtos.length)}
        onHide={() => {}}
      >
        <section className="m-3">
          <h4 className="font-weight-normal text-secondary">
            Relatório de Produto
          </h4>
          <p className="text-black font-weight-bold mb-1">
            {`Resultados da busca${
              filtros && (filtros.data_inicial || filtros.data_final)
                ? `(período: ${filtros.data_inicial ||
                    "-"} a ${filtros.data_final || "-"})`
                : ""
            } :`}
          </p>
          <TabelaProdutosHomologados produtos={produtos} />
        </section>

        <section className="m-3">
          <Botao
            texto="voltar"
            titulo="voltar"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            icon={BUTTON_ICON.ARROW_LEFT}
            onClick={() => {
              setFiltros(null);
              setProdutos(null);
            }}
            className="float-right"
          />
        </section>
      </Modal>
    </Spin>
  );
};

export default RelatorioProdutosHomologados;
