import React, { Component } from "react";
import { Botao } from "../../../../Shareable/Botao";
import moment from "moment";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "../../../../Shareable/Botao/constants";
import { toastError } from "../../../../Shareable/Toast/dialogs";
import "./style.scss";

class ResultadoFiltro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkTodos: false,
      listaSolicitacoes: null,
      pagina: false,
      index: 0
    };
  }

  componentDidMount() {
    this.setState({ listaSolicitacoes: this.props.resultadosFiltro });
  }

  componentDidUpdate(prevProps) {
    if (this.props.resultadosFiltro !== this.state.listaSolicitacoes) {
      if (this.props.count !== prevProps.count) {
        this.setState({ index: 0, pagina: false });
      }
      if (!this.state.pagina) {
        this.setState({
          listaSolicitacoes: this.props.resultadosFiltro
        });
      }
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

  navegacaoPagina = pagina => {
    this.setState({ pagina: true });
    const dataDe = moment(this.props.values.data_de, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    const dataAte = moment(this.props.values.data_ate, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    this.props
      .getPedidosESolicitacoesFiltroPaginacao(
        this.props.values,
        dataDe,
        dataAte,
        pagina
      )
      .then(response => {
        if (response.results.length > 0) {
          this.setState({ listaSolicitacoes: response.results });
        } else {
          toastError("Nenhum resultado encontrado!");
          this.props.renderizarRelatorio(response.results);
        }
      });
  };

  render() {
    const { paginacao, count } = this.props;
    const { checkTodos, listaSolicitacoes, index } = this.state;
    return (
      <section className="card">
        <section className="card-body relatorio-filtro">
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
          {!count ? (
            <div>Nenhuma solicitação no período para estes filtros.</div>
          ) : (
            <div>
              <section className="total-pedidos">
                {count || 0} solicitações no período
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
                  <div>Quantidade de alunos</div>
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
                <section className="footer-paginacao">
                  {index === 0 ? (
                    <div className={`pagina atual`}>
                      <i className="fas fa-angle-double-left" />
                    </div>
                  ) : (
                    <div
                      className={`pagina`}
                      onClick={() => {
                        this.navegacaoPagina((index - 1) * 100);
                        this.setState({ index: index - 1 });
                      }}
                    >
                      <i className="fas fa-angle-double-left" />
                    </div>
                  )}
                  <div>
                    {`pagina ${index + 1} de ${paginacao[paginacao.length - 1] /
                      100 +
                      1}`}
                  </div>

                  {index === paginacao[paginacao.length - 1] / 100 ? (
                    <div className={`pagina atual`}>
                      <i className="fas fa-angle-double-right" />
                    </div>
                  ) : (
                    <div
                      className={`pagina`}
                      onClick={() => {
                        this.navegacaoPagina((index + 1) * 100);
                        this.setState({ index: index + 1 });
                      }}
                    >
                      <i className="fas fa-angle-double-right" />
                    </div>
                  )}
                </section>
              </section>
            </div>
          )}
        </section>
      </section>
    );
  }
}

export default ResultadoFiltro;
