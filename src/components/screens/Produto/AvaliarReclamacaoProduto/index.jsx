import React, { Fragment, useState, useEffect } from "react";
import FormBuscaProduto from "components/screens/Produto/Reclamacao/components/FormBuscaProduto";
import { getProdutosPorFiltro, getHomologacao } from "services/produto.service";
import TabelaProdutos from "./components/TabelaProdutos";
import { deepCopy } from "helpers/utilities";
import { formatarValues } from "./helpers";
import { VerProduto } from "./components/VerProduto";
import ModalProsseguirReclamacao from "./components/Modal";
import { Spin } from "antd";
import "./style.scss";

export const AvaliarReclamacaoProduto = ({ setPropsPageProduto }) => {
  const [tituloModal, setTituloModal] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [verProduto, setVerProduto] = useState(null);
  const [produtoAAtualizar, setProdutoAAtualizar] = useState(null);
  const [exibirModal, setExibirModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erroNaAPI, setErroNaAPI] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [nomeDoProduto, setNomeDoProduto] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getHomologacao(uuid)
        .then(response => {
          setLoading(false);
          setPropsPageProduto(response.data.produto);
          setVerProduto(response.data.produto);
        })
        .catch(() => {
          setLoading(false);
          setErroNaAPI(true);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const setModal = modal => {
    setTituloModal(modal);
    setExibirModal(!exibirModal);
  };

  const onSubmit = values => {
    setLoading(true);
    setFormValues(values)
    if (
      values.nome_produto &&
      !values.nome_fabricante &&
      !values.nome_marca &&
      !values.status
    )
      setNomeDoProduto(values.nome_produto);
    else setNomeDoProduto(null);
    const values_ = deepCopy(values);
    getProdutosPorFiltro(formatarValues(values_)).then(response => {
      setProdutos(response.data.results);
      setLoading(false);
    });
  };

  const exibirDadosProduto = key => {
    const produtos_ = deepCopy(produtos);
    produtos_[key].exibir = !produtos_[key].exibir;
    setProdutos(produtos_);
  };

  const onAtualizarProduto = hom_produto => {
    if (produtos) {
      const index = produtos.findIndex(
        produto_ => produto_.uuid === hom_produto.produto.uuid
      );
      const produtos_ = deepCopy(produtos);
      produtos_[index].ultima_homologacao.status = hom_produto.status;
      setProdutos(produtos_);
    } else setVerProduto(hom_produto.produto);
  };
  console.log('produtos', produtos)
  return (
    <Spin tip="Carregando..." spinning={loading}>
      <div className="card avaliar-reclamacao-produto">
        <div className="card-body">
          {erroNaAPI && (
            <div>Erro ao carregar dados de Homologação de Produto</div>
          )}
          {!erroNaAPI && (
            <Fragment>
              <ModalProsseguirReclamacao
                showModal={exibirModal}
                closeModal={() => setExibirModal(!exibirModal)}
                tituloModal={tituloModal}
                produto={produtoAAtualizar}
                onAtualizarProduto={onAtualizarProduto}
              />
              {!verProduto && (
                <Fragment>
                  <h2>
                    Consulte cadastro completo de produto antes de avaliar
                    reclamação
                  </h2>
                  <FormBuscaProduto onSubmit={onSubmit} />
                  {produtos.length > 0 && (
                    <Fragment>
                      <div className="label-resultados-busca">
                        {formValues.nome_produto
                          ? `Veja os resultados para: "${
                              formValues.nome_produto
                            }"`
                          : "Veja os resultados para a busca:"}
                      </div>
                      <TabelaProdutos
                        listaProdutos={produtos}
                        atualizar={() => onSubmit(formValues)}
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
            </Fragment>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default AvaliarReclamacaoProduto;
