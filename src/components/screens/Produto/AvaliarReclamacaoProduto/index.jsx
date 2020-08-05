import React, { Fragment, useState, useEffect } from "react";
import FormBuscaProduto from "components/screens/Produto/Reclamacao/components/FormBuscaProduto";
import { getProdutosPorFiltro, getHomologacao } from "services/produto.service";
import TabelaProdutos from "./components/TabelaProdutos";
import { deepCopy } from "helpers/utilities";
import { formatarValues } from "./helpers";
import { Spin } from "antd";
import "./style.scss";

export const AvaliarReclamacaoProduto = ({ setPropsPageProduto }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroNaAPI, setErroNaAPI] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [uuidForncecido, setUuidFornecido] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getHomologacao(uuid)
        .then(response => {
          setLoading(false);
          setPropsPageProduto(response.data.produto);
          setProdutos([response.data.produto]);
          setUuidFornecido(true);
        })
        .catch(() => {
          setLoading(false);
          setErroNaAPI(true);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = values => {
    setLoading(true);
    setFormValues(values);
    const values_ = deepCopy(values);
    getProdutosPorFiltro(formatarValues(values_)).then(response => {
      setProdutos(response.data.results);
      setLoading(false);
      setUuidFornecido(undefined);
    });
  };

  return (
    <Spin tip="Carregando..." spinning={loading}>
      <div className="card avaliar-reclamacao-produto">
        <div className="card-body">
          {erroNaAPI && (
            <div>Erro ao carregar dados de Homologação de Produto</div>
          )}
          {!erroNaAPI && (
            <Fragment>
              <h2>
                Consulte cadastro completo de produto antes de avaliar
                reclamação
              </h2>
              <FormBuscaProduto onSubmit={onSubmit} />
              {produtos.length > 0 && (
                <Fragment>
                  <div className="label-resultados-busca">
                    {formValues && formValues.nome_produto
                      ? `Veja os resultados para: "${formValues.nome_produto}"`
                      : "Veja os resultados para a busca:"}
                  </div>
                  <TabelaProdutos
                    listaProdutos={produtos}
                    atualizar={() => onSubmit(formValues)}
                    uuidForncecido={uuidForncecido}
                  />
                </Fragment>
              )}
              {produtos.length === 0 && formValues !== null && (
                <div className="text-center mt-5">
                  A consulta retornou 0 resultados.
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default AvaliarReclamacaoProduto;
