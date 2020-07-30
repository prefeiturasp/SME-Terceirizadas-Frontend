import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setaProdutoRelatorio } from "../produtoAction";
import "antd/dist/antd.css";
import "./styles.scss";
import { Pagination } from "antd";
import {
  retornaStatusFormatado,
  retornaProdutosComHomologacoesOrdenadas,
  retornaArrayDeProdutosParaPaginacao
} from "./helpers";

class ListagemProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      indexPaginacao: 1,
      produtosOrdenadosPage: []
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { produtos } = this.state;
    if (
      produtos === prevState.produtos &&
      prevProps.produtos !== this.props.produtos
    ) {
      const produtosOrdenados = retornaProdutosComHomologacoesOrdenadas(
        this.props.produtos
      );
      const produtosOrdenadosPage = retornaArrayDeProdutosParaPaginacao(
        this.props.produtos
      );
      this.setState({
        produtos: produtosOrdenados,
        produtosOrdenadosPage,
        indexPaginacao: 1
      });
    }
  };

  changePaginacao = pagina => {
    this.setState({
      indexPaginacao: pagina
    });
  };

  detalhesProduto = (uuid, ativo) => {
    let { produtos } = this.state;
    produtos.forEach(produto => {
      if (produto.ativo) {
        produto.ativo = false;
      }
    });
    const index = produtos.findIndex(produto => produto.uuid === uuid);
    produtos[index].ativo = !ativo;
    this.setState({ produtos });
  };

  setaProdutoParaVisualizar = produto => {
    this.props.setaProdutoRelatorio(produto);
  };

  render() {
    const { pesquisado } = this.props;
    const { produtos, indexPaginacao, produtosOrdenadosPage } = this.state;
    const paginacao = indexPaginacao - 1;
    return pesquisado === true && produtos.length > 0 ? (
      <section className="resultado-busca-produto-avancada">
        <header>Veja os resultados para busca</header>
        <article>
          <div className="grid-produto-table header-table-produtos">
            <div>Tipo</div>
            <div>Status</div>
            <div>Data cadastro</div>
            <div>Nome do Produto</div>
            <div>Marca</div>
            <div>Fabricante</div>
            <div />
          </div>
          {produtosOrdenadosPage[paginacao].map((produto, index) => {
            const terceirizada = produto.ultima_homologacao.rastro_terceirizada;
            const bordas = produto.ativo ? "desativar-borda" : "";
            const ativo = produto.ativo;
            const icone = produto.ativo ? "angle-up" : "angle-down";
            return (
              <Fragment key={index}>
                <div className="grid-produto-table body-table-produtos">
                  <div className={`${bordas}`}>
                    {produto.eh_para_alunos_com_dieta ? "D. Especial" : "Comum"}
                  </div>
                  <div className={`${bordas}`}>
                    {retornaStatusFormatado(produto.status)}
                  </div>
                  <div className={`${bordas}`}>
                    {produto.criado_em.split(" ")[0]}
                  </div>
                  <div className={`${bordas}`}>{produto.nome}</div>
                  <div className={`${bordas}`}>{produto.marca.nome}</div>
                  <div className={`${bordas}`}>{produto.fabricante.nome}</div>
                  <div>
                    <i
                      className={`fas fa-${icone}`}
                      onClick={() => this.detalhesProduto(produto.uuid, ativo)}
                    />
                  </div>
                </div>
                {produto.ativo && (
                  <section className="resultado-busca-detalhe-produto">
                    <div className="grid-contatos-terceirizada">
                      <div className="label-empresa">
                        Empresa solicitante (Terceirizada)
                      </div>
                      <div className="label-empresa">Telefone</div>
                      <div className="label-empresa">E-mail</div>
                      <div className="value-empresa">
                        {terceirizada.nome_fantasia}
                      </div>
                      <div className="value-empresa template-contatos-terc">
                        {terceirizada.contatos.map((contato, index) => {
                          return <div key={index}>{contato.telefone}</div>;
                        })}
                      </div>
                      <div className="value-empresa template-contatos-terc">
                        {terceirizada.contatos.map((contato, index) => {
                          return <div key={index}>{contato.email}</div>;
                        })}
                      </div>
                      <div />
                    </div>
                    <div className="grid-do-produto">
                      <div className="label-empresa">
                        Componentes do produto
                      </div>
                      <div className="value-empresa">{produto.componentes}</div>
                    </div>
                    <div className="grid-do-produto">
                      <div className="label-empresa">
                        O produto contém ou pode conter ingredientes/aditivos
                        alergênicos?
                      </div>
                      <div className="value-empresa">
                        {produto.tem_aditivos_alergenicos ? "SIM" : "NÃO"}
                      </div>
                    </div>
                    <div className="grid-do-produto">
                      <div className="label-empresa">Quais?</div>
                      <div className="value-empresa">{produto.aditivos}</div>
                    </div>
                    <div className="grid-do-produto botao-produto-visualizar">
                      <NavLink
                        activeClassName="active"
                        className="botao-visualizar-produto"
                        to="/pesquisa-desenvolvimento/relatorio-produto"
                        onClick={() => {
                          this.setaProdutoParaVisualizar(produto);
                        }}
                      >
                        Visualizar
                      </NavLink>
                    </div>
                  </section>
                )}
              </Fragment>
            );
          })}
        </article>

        <Pagination
          defaultCurrent={1}
          total={produtos.length}
          showSizeChanger={false}
          onChange={page => {
            this.changePaginacao(page);
          }}
        />
      </section>
    ) : (
      pesquisado === true && (
        <section className="resultado-busca-produto-avancada">
          <header>Nenhum resultado encontrado</header>
        </section>
      )
    );
  }
}

const mapStateToProps = state => ({
  produtos: state.produtos.produtosFiltrados
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setaProdutoRelatorio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListagemProdutos);
