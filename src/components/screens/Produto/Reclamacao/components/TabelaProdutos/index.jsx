import React, { Component } from "react";
import "./style.scss";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

import DetalheProduto from "../DetalheProduto";
import ModalReclamacaoProduto from "../ModalReclamacaoProduto";

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
            <div>Fabricante</div>
            <div>Tipo</div>
            <div>Data</div>
          </div>
        </section>
        {listaProdutos.map((produto, indice) => {
          const isProdutoAtivo = indice === indiceProdutoAtivo;
          const produtoPossuiReclamacao =
            produto.homologacoes.find(
              h => h.status === "ESCOLA_OU_NUTRICIONISTA_RECLAMOU"
            ) !== undefined;
          return (
            <div key={indice}>
              <div className="tabela-produto tabela-body-produto item-produto">
                <div>{produto.nome}</div>
                <div>{produto.marca.nome}</div>
                <div>{produto.fabricante.nome}</div>
                <div>
                  {produto.eh_para_alunos_com_dieta ? "D. Especial" : "Comum"}
                </div>
                <div className="com-botao">
                  {produto.criado_em}
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
                  <DetalheProduto produto={produto} />
                  <div className="botao-reclamacao">
                    {produtoPossuiReclamacao && (
                      <span>
                        Este produto já possui uma análise de reclamação em
                        andamento
                      </span>
                    )}
                    <Botao
                      texto="Reclamação"
                      className="ml-3"
                      onClick={this.abreModalReclamacao}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN}
                      disabled={produtoPossuiReclamacao}
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
