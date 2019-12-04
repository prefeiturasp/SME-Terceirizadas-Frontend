import React, { Component } from "react";
import { Botao } from "../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "../../../../Shareable/Botao/constants";

class ResultadoFiltro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTodos: false,
      listaSolicitacoes: null
    };
  }

  componentDidMount() {
    this.setState({ listaSolicitacoes: this.props.resultadosFiltro });
  }

  componentDidUpdate() {
    if (this.props.resultadosFiltro !== this.state.listaSolicitacoes) {
      this.setState({ listaSolicitacoes: this.props.resultadosFiltro });
    }
  }

  checarTodosItens() {
    let checkTodos = this.state.checkTodos;
    checkTodos = !checkTodos;
    let listaSolicitacoes = this.state.listaSolicitacoes;
    listaSolicitacoes.forEach(item => {
      item.check = checkTodos;
    });
    this.setState({ checkTodos, listaSolicitacoes });
  }

  setaCheckItem(index) {
    let listaSolicitacoes = this.state.listaSolicitacoes;
    listaSolicitacoes[index].check = !listaSolicitacoes[index].check;
    this.setState({ listaSolicitacoes });
  }

  render() {
    const { resultadosFiltro } = this.props;
    const { checkTodos, listaSolicitacoes } = this.state;
    return (
      <section className="card">
        <section className="card-body realtorio-filtro">
          <header>Resultado</header>
          <section className="cabecalho">
            <div className="cabecalho-esquerdo">Solicitações por status</div>
            <div className="cabecalho-direito">
              <section>
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  texto={"Exportar Planilha"}
                  icon={BUTTON_ICON.FILE_PDF}
                  type={BUTTON_TYPE.BUTTON}
                />
                <Botao
                  className="ml-2"
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  icon={BUTTON_ICON.PRINT}
                  texto={"Imprimir"}
                  type={BUTTON_TYPE.BUTTON}
                />
                <Botao
                  className="ml-2"
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  icon={BUTTON_ICON.SAIR}
                  texto={"Sair"}
                  type={BUTTON_TYPE.BUTTON}
                  onClick={() => this.props.renderizarRelatorio("sair")}
                />
              </section>
            </div>
          </section>
          <section className="total-pedidos">
            {`${
              resultadosFiltro ? resultadosFiltro.length : 0
            } solicitações no período`}
          </section>
          <section className="grid-listagem-itens mb-5">
            <div
              className="check-seleciona-todos"
              onClick={() => this.checarTodosItens()}
            >
              <input
                type="checkbox"
                name="select_all"
                value="select_all_check"
                checked={checkTodos}
              />
              <label>Selecionar todos</label>
            </div>

            <section className="cabecalho-listagem mt-2">
              <div>Data</div>
              <div>N° solicitação</div>
              <div>Tipo de solicitação</div>
              <div>Quantidade de alimentações solicitadas</div>
            </section>
            <section className="corpo-listagem mt-2">
              {listaSolicitacoes === null ? (
                <div>Carregando</div>
              ) : (
                listaSolicitacoes.map((item, index) => {
                  return (
                    <div className="linha-dado" key={index}>
                      <div className="input-check">
                        <div
                          className="check-item"
                          onClick={() => this.setaCheckItem(index)}
                        >
                          <input
                            type="checkbox"
                            name="select_all"
                            value="select_all_check"
                            checked={item.check}
                          />
                          <label />
                        </div>
                      </div>
                      <div className="grid-detalhe-item">
                        <div>{item.data_evento}</div>
                        <div>{item.id_externo}</div>
                        <div>{item.desc_doc}</div>
                        <div>
                          {item.tipo_doc === "SUSP_ALIMENTACAO"
                            ? "------"
                            : item.numero_alunos}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default ResultadoFiltro;
