import { Spin } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormBuscaProduto from "components/screens/Produto/Reclamacao/components/FormBuscaProduto";
import TabelaProdutos from "./components/TabelaProdutos";

import { deepCopy } from "helpers/utilities";
import { formatarValues } from "./helpers";

import {
  reset,
  setProdutos,
  setIndiceProdutoAtivo
} from "reducers/avaliarReclamacaoProduto";

import { getProdutosPorFiltro, getHomologacao } from "services/produto.service";
import "./style.scss";

export const AvaliarReclamacaoProduto = ({
  setPropsPageProduto,
  history,
  reset,
  produtos,
  setProdutos,
  indiceProdutoAtivo,
  setIndiceProdutoAtivo
}) => {
  const [loading, setLoading] = useState(true);
  const [erroNaAPI, setErroNaAPI] = useState(false);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (history && history.action === "PUSH") {
      reset();
    }
    if (uuid) {
      getHomologacao(uuid)
        .then(response => {
          setLoading(false);
          setPropsPageProduto(response.data.produto);
          setProdutos([response.data.produto]);
          setIndiceProdutoAtivo(0);
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
      setIndiceProdutoAtivo(undefined);
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
              {produtos && produtos.length > 0 && (
                <Fragment>
                  <div className="label-resultados-busca">
                    {formValues && formValues.nome_produto
                      ? `Veja os resultados para: "${formValues.nome_produto}"`
                      : "Veja os resultados para a busca:"}
                  </div>
                  <TabelaProdutos
                    listaProdutos={produtos}
                    atualizar={() => onSubmit(formValues)}
                    indiceProdutoAtivo={indiceProdutoAtivo}
                    setIndiceProdutoAtivo={setIndiceProdutoAtivo}
                  />
                </Fragment>
              )}
              {produtos && produtos.length === 0 && formValues !== null && (
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

const mapStateToProps = state => {
  return {
    indiceProdutoAtivo: state.avaliarReclamacaoProduto.indiceProdutoAtivo,
    produtos: state.avaliarReclamacaoProduto.produtos
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIndiceProdutoAtivo,
      setProdutos,
      reset
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AvaliarReclamacaoProduto)
);
