import React, { Component } from "react";
import "./style.scss";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

import ModalReclamacaoProduto from "../ModalReclamacaoProduto";
import Reclamacao from "../Reclamacao";
import { Link } from "react-router-dom";

export default class TabelaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indiceProdutoAtivo: undefined,
      mostraModalReclamacao: false
    };
  }
  setIndiceProdutoAtivo = indice => {
    this.setState({
      indiceProdutoAtivo:
        this.state.indiceProdutoAtivo === indice ? undefined : indice
    });
  };

  abreModalReclamacao = () => {
    this.setState({ mostraModalReclamacao: true });
  };

  fechaModalReclamacao = () => {
    this.setState({ mostraModalReclamacao: false });
  };

  render() {
    const { listaProdutos, onAtualizarProduto } = this.props;
    const { indiceProdutoAtivo, mostraModalReclamacao } = this.state;
    return (
      <section className="resultados-busca-produtos">
        <section>
          <div className="tabela-produto tabela-header-produto">
            <div>Nome do Produto</div>
            <div>Marca</div>
            <div>Tipo</div>
            <div>Qtde. Reclamações</div>
            <div>Data de cadastro</div>
          </div>
        </section>
        {listaProdutos.map((produto, indice) => {
          const isProdutoAtivo = indice === indiceProdutoAtivo;
          return (
            <div key={indice}>
              <div className="tabela-produto tabela-body-produto item-produto">
                <div>{produto.nome}</div>
                <div>{produto.marca.nome}</div>
                <div>
                  {produto.eh_para_alunos_com_dieta ? "D. Especial" : "Comum"}
                </div>
                <div>{produto.ultima_homologacao.reclamacoes.length}</div>
                <div className="com-botao">
                  {produto.criado_em.split(" ")[0]}
                  <div className="botoes-produto">
                    <i
                      className={`fas fa-angle-${
                        isProdutoAtivo ? "up" : "down"
                      }`}
                      onClick={() => {
                        this.setIndiceProdutoAtivo(indice);
                      }}
                    />
                  </div>
                </div>
              </div>
              {isProdutoAtivo && (
                <>
                  {produto.ultima_homologacao.reclamacoes.map(
                    (reclamacao, indice) => {
                      const deveMostrarBarraHorizontal =
                        indice <
                        produto.ultima_homologacao.reclamacoes.length - 1;
                      return [
                        <Reclamacao
                          key={indice}
                          indice={indice + 1}
                          reclamacao={reclamacao}
                        />,
                        deveMostrarBarraHorizontal && <hr />
                      ];
                    }
                  )}
                  <div className="botao-reclamacao">
                    <Link
                      to={`/gestao-produto/relatorio?uuid=${
                        produto.ultima_homologacao.uuid
                      }`}
                    >
                      <Botao
                        texto="Ver produto"
                        className="ml-3"
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                      />
                    </Link>
                    <Botao
                      texto="Reclamação"
                      className="ml-3"
                      onClick={this.abreModalReclamacao}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
        <ModalReclamacaoProduto
          showModal={mostraModalReclamacao}
          closeModal={this.fechaModalReclamacao}
          produto={listaProdutos[indiceProdutoAtivo]}
          onAtualizarProduto={onAtualizarProduto}
        />
      </section>
    );
  }
}
