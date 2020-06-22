import React, { useEffect, useState, Fragment } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { getProdutosPorFiltro } from "services/produto.service";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import FormBuscaProduto from "../AtivacaoSuspensao/FormBuscaProduto";
import { ATIVACAO_DE_PRODUTO, GESTAO_PRODUTO } from "configs/constants";
import "./style.scss";


const produtos1 = [{
  nome: "SUCO DE UVA",
  marca: { nome: "Maguari"},
  fabricante: { nome: "Unilever"},
  ultima_homologacao: {
    rastro_terceirizada: {
      nome_fantasia: "Fabrica SSS",
      contatos: [{
        telefone: "33 333 333",
        email: "test@test.com"
      },
      {
        telefone: "33 4444444",
        email: "admin@admin.com"
      }]
    }
  }
},
{
  nome: "LEITE INTEGRAL",
  marca: { nome: "Maguari"},
  fabricante: { nome: "Unilever"},
  ultima_homologacao: {
    rastro_terceirizada: {
      nome_fantasia: "Fabrica SSS",
      contatos: [{
        telefone: "33 333 333",
        email: "test@test.com"
      },
      {
        telefone: "33 4444444",
        email: "admin@admin.com"
      }]
    }
  }
}]


const TabelaProdutos = ({ produtos }) => {

  const [ativos, setAtivos] = useState([0]);

  if (!produtos) return false;

  return (
    <section className="tabela-resultado-consultar-reclamacao-produto">
          <div className="table-grid table-header">
            <div className="table-header-cell">Nome do Produto</div>
            <div className="table-header-cell">Marca</div>
            <div className="table-header-cell">Fabricante</div>
          </div>
          {produtos.map((produto, index) => {
            const terceirizada = produto.ultima_homologacao.rastro_terceirizada;
            const bordas = "";
            const icone = produto ? "angle-up" : "angle-down";
            return (
              <Fragment key={index}>
                <div className="table-grid table-body">
                  <div className={`table-body-cell ${bordas}`}>{produto.nome}</div>
                  <div className={`table-body-cell ${bordas}`}>{produto.marca.nome}</div>
                  <div className={`table-body-cell ${bordas}`}>{produto.fabricante.nome}</div>
                  <div className="reclamacao-collapse">
                    <i
                      className={`fas fa-${icone}`}
                      onClick={() => {
                        ativos.includes(index)
                          ? setAtivos(ativos.filter(el => el !== index))
                          : setAtivos([...ativos, index]);
                      }}
                    />
                  </div>
                </div>
                {ativos.includes(index) && (
                   <>
                    <div className="grid-detalhe mt-3">
                      <div className="grid-detalhe-cell label-empresa">
                        Empresa solicitante (Terceirizada)
                      </div>
                      <div className="grid-detalhe-cell label-empresa">Telefone</div>
                      <div className="grid-detalhe-cell label-empresa">E-mail</div>
                      <div className="grid-detalhe-cell value-empresa">
                        {terceirizada.nome_fantasia}
                      </div>
                      <div className="grid-detalhe-cell value-empresa template-contatos-terc">
                        {terceirizada.contatos.map((contato, index) => {
                          return <div key={index}>{contato.telefone}</div>;
                        })}
                      </div>
                      <div className="grid-detalhe-cell value-empresa template-contatos-terc">
                        {terceirizada.contatos.map((contato, index) => {
                          return <div key={index}>{contato.email}</div>;
                        })}
                      </div>
                    </div>
                    <hr />
                    <div className="grid-detalhe">
                      <div className="grid-detalhe-cell label-empresa">
                        Nome da Escola
                      </div>
                      <div className="grid-detalhe-cell label-empresa">Código EOL</div>
                      <div className="grid-detalhe-cell label-empresa"></div>
                      <div className="grid-detalhe-cell value-empresa">
                        {terceirizada.nome_fantasia}
                      </div>
                      <div className="grid-detalhe-cell value-empresa">
                        XXXX
                      </div>
                      <div className="grid-detalhe-cell value-empresa">

                      </div>
                    </div>
                    <div className="grid-detalhe">
                      <div className="grid-detalhe-cell label-empresa">
                        Nome do Reclamante
                      </div>
                      <div className="grid-detalhe-cell label-empresa">RF/CRN/CFN</div>
                      <div className="grid-detalhe-cell label-empresa">Cargo</div>
                      <div className="grid-detalhe-cell value-empresa">
                        Joao da Silva
                      </div>
                      <div className="grid-detalhe-cell value-empresa">
                        XXXX
                      </div>
                      <div className="grid-detalhe-cell value-empresa">

                      </div>
                    </div>
                    <hr />
                    <div className="label-empresa">Reclamação</div>
                    <div className="value-empresa mb-3">XXXXXXXXX</div>
                    <div className="label-empresa">Questionamento CODAE</div>
                    <div className="value-empresa">XXXXXXXXX</div>
                    <hr />
                    
                    <div className="float-right">
                  <Botao
                    texto="Responder"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={() => {}}
                    className="ml-3"

                  />
                  <Botao
                    texto="Ver Produto"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3 mr-3"
                  />
                </div>
                <div className="mt-4 mb-5"> &nbsp;</div>
                    </>
                    
                )}
              </Fragment>
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
    setFiltros({ ...formValues, status: ["CODAE_AUTORIZOU_RECLAMACAO"] });
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 screen-responder-reclamacao-produto">
        <div className="card-body">
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

        {produtos1 && produtos1.length && (
          <div className="container-tabela">
            <TabelaProdutos produtos={produtos1} />
          </div>
        )}
      </div>
    </Spin>
  );
};

export default AtivacaoSuspencaoProduto;
