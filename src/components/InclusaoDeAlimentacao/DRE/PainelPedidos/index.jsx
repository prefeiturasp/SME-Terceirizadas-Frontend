import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum, TIPO_SOLICITACAO } from "constants/shared";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  ordenarPedidosDataMaisRecente,
} from "helpers/painelPedidos";
import { dataAtualDDMMYYYY, getError, safeConcatOn } from "helpers/utilities";
import { dreListarSolicitacoesDeInclusaoDeAlimentacao } from "services/inclusaoDeAlimentacao";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";
import { formatarOpcoesLote } from "helpers/utilities";
import { getLotesSimples } from "services/lote.service";
import HTTP_STATUS from "http-status-codes";
import { ASelect } from "components/Shareable/MakeField";
import { Select as SelectAntd } from "antd";
import { meusDados } from "services/perfil.service";
import { toastError } from "components/Shareable/Toast/dialogs";

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      loading: true,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      filtros: this.props.filtros || {
        lote: undefined,
      },
      lotes: [],
    };
  }

  filtrar(filtro, filtros) {
    this.atualizarDadosDasInclusoes(filtro, filtros);
  }

  async componentDidMount() {
    meusDados().then((response) => {
      if (response) {
        this.setState({ meusDados: response });
        this.getLotesAsync(response.vinculo_atual.instituicao.uuid);
      }
    });
    const paramsFromPrevPage = this.props.filtros || {
      lote: undefined,
    };
    const filtro = FiltroEnum.SEM_FILTRO;
    this.atualizarDadosDasInclusoes(filtro, paramsFromPrevPage);
    if (this.props.filtros) {
      this.props.change("lote", this.props.filtros.lote);
    }
  }

  //FIXME: Nao trata errors, nao faz requisicoes em paralelo
  async atualizarDadosDasInclusoes(filtro, paramsFromPrevPage = {}) {
    const [avulsas, continuas, cei, cemei] = await Promise.all([
      dreListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_NORMAL,
        paramsFromPrevPage
      ),
      dreListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_CONTINUA,
        paramsFromPrevPage
      ),
      dreListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_CEI,
        paramsFromPrevPage
      ),
      dreListarSolicitacoesDeInclusaoDeAlimentacao(
        filtro,
        TIPO_SOLICITACAO.SOLICITACAO_CEMEI,
        paramsFromPrevPage
      ),
    ]);
    if (avulsas.status === HTTP_STATUS.BAD_REQUEST) {
      toastError(
        "Erro ao carregar inclusões normais (EMEI, EMEF, etc.): " +
          getError(avulsas.data)
      );
    }
    if (continuas.status === HTTP_STATUS.BAD_REQUEST) {
      toastError(
        "Erro ao carregar inclusões contínuas: " + getError(continuas.data)
      );
    }
    if (cei.status === HTTP_STATUS.BAD_REQUEST) {
      toastError("Erro ao carregar inclusões CEI: " + getError(cei.data));
    }
    if (cemei.status === HTTP_STATUS.BAD_REQUEST) {
      toastError("Erro ao carregar inclusões CEMEI: " + getError(cemei.data));
    }
    const inclusoes = safeConcatOn("results", avulsas, continuas, cei, cemei);
    const pedidosPrioritarios = ordenarPedidosDataMaisRecente(
      filtraPrioritarios(inclusoes)
    );

    const pedidosNoPrazoLimite = ordenarPedidosDataMaisRecente(
      filtraNoLimite(inclusoes)
    );

    const pedidosNoPrazoRegular = ordenarPedidosDataMaisRecente(
      filtraRegular(inclusoes)
    );

    this.setState({
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      loading: false,
    });
  }

  async getLotesAsync(uuid) {
    const response = await getLotesSimples({ diretoria_regional__uuid: uuid });
    if (response.status === HTTP_STATUS.OK) {
      const { Option } = SelectAntd;
      const lotes_ = formatarOpcoesLote(response.data.results).map((lote) => {
        return <Option key={lote.value}>{lote.label}</Option>;
      });
      this.setState({
        lotes: [
          <Option value="" key={0}>
            Filtrar por Lote
          </Option>,
        ].concat(lotes_),
      });
    }
  }

  setFiltros(filtros) {
    this.setState({ filtros: filtros });
  }

  render() {
    const {
      loading,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      lotes,
    } = this.state;
    const { valorDoFiltro } = this.props;
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-3 font-10 my-auto">
                    Data: {dataAtualDDMMYYYY()}
                  </div>
                  <div className="offset-6 col-3">
                    <Field
                      component={ASelect}
                      showSearch
                      onChange={(value) => {
                        const filtros_ = {
                          lote: value || undefined,
                        };
                        this.setFiltros(filtros_);
                        this.filtrar(FiltroEnum.SEM_FILTRO, filtros_);
                      }}
                      onBlur={(e) => {
                        e.preventDefault();
                      }}
                      name="lote"
                      filterOption={(inputValue, option) =>
                        option.props.children
                          .toString()
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                    >
                      {lotes}
                    </Field>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12">
                    <CardPendenteAcao
                      titulo={
                        "Solicitações próximas ao prazo de vencimento (2 dias ou menos)"
                      }
                      tipoDeCard={"priority"}
                      pedidos={pedidosPrioritarios}
                      colunaDataLabel={"Data da Inclusão"}
                    />
                  </div>
                </div>
                {valorDoFiltro !== "hoje" && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardPendenteAcao
                        titulo={"Solicitações no prazo limite"}
                        tipoDeCard={"on-limit"}
                        pedidos={pedidosNoPrazoLimite}
                        colunaDataLabel={"Data da Inclusão"}
                      />
                    </div>
                  </div>
                )}
                {valorDoFiltro !== "hoje" && (
                  <div className="row pt-3">
                    <div className="col-12">
                      <CardPendenteAcao
                        titulo={"Solicitações no prazo regular"}
                        tipoDeCard={"regular"}
                        pedidos={pedidosNoPrazoRegular}
                        colunaDataLabel={"Data da Inclusão"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const PainelPedidosForm = reduxForm({
  form: "painelPedidos",
  enableReinitialize: true,
})(PainelPedidos);
const selector = formValueSelector("painelPedidos");
const mapStateToProps = (state) => {
  return {
    valorDoFiltro: selector(state, "visao_por"),
  };
};

export default connect(mapStateToProps)(PainelPedidosForm);
