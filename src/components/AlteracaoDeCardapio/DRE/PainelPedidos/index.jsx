import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { FiltroEnum, TIPO_SOLICITACAO } from "constants/shared";
import {
  filtraNoLimite,
  filtraPrioritarios,
  filtraRegular,
  ordenarPedidosDataMaisRecente,
} from "../../../../helpers/painelPedidos";
import { dataAtualDDMMYYYY, safeConcatOn } from "../../../../helpers/utilities";
import { dreListarSolicitacoesDeAlteracaoDeCardapio } from "services/alteracaoDeCardapio";
import { getLotesSimples } from "services/lote.service";
import HTTP_STATUS from "http-status-codes";
import { ASelect } from "components/Shareable/MakeField";
import { Select as SelectAntd } from "antd";
import { formatarOpcoesLote } from "helpers/utilities";
import { meusDados } from "services/perfil.service";
import { CardPendenteAcao } from "../../components/CardPendenteAcao";

const { SOLICITACAO_NORMAL, SOLICITACAO_CEI, SOLICITACAO_CEMEI } =
  TIPO_SOLICITACAO;

class PainelPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      pedidosCarregados: false,
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
    Promise.all([
      dreListarSolicitacoesDeAlteracaoDeCardapio(
        filtro,
        SOLICITACAO_NORMAL,
        filtros
      ),
      dreListarSolicitacoesDeAlteracaoDeCardapio(
        filtro,
        SOLICITACAO_CEI,
        filtros
      ),
      dreListarSolicitacoesDeAlteracaoDeCardapio(
        filtro,
        SOLICITACAO_CEMEI,
        filtros
      ),
    ]).then(([response, ceiResponse, cemeiResponse]) => {
      const results = safeConcatOn(
        "results",
        response,
        ceiResponse,
        cemeiResponse
      );
      let pedidosPrioritarios = ordenarPedidosDataMaisRecente(
        filtraPrioritarios(results)
      );
      let pedidosNoPrazoLimite = ordenarPedidosDataMaisRecente(
        filtraNoLimite(results)
      );
      let pedidosNoPrazoRegular = ordenarPedidosDataMaisRecente(
        filtraRegular(results)
      );
      this.setState({
        pedidosCarregados: true,
        pedidosPrioritarios,
        pedidosNoPrazoLimite,
        pedidosNoPrazoRegular,
      });
    });
  }

  componentDidMount() {
    meusDados().then((response) => {
      if (response) {
        this.setState({ meusDados: response });
        this.getLotesAsync(response.vinculo_atual.instituicao.uuid);
      }
    });
    const paramsFromPrevPage = this.props.filtros || {
      lote: undefined,
    };
    this.filtrar(FiltroEnum.SEM_FILTRO, paramsFromPrevPage);
    if (this.props.filtros) {
      this.props.change("lote", this.props.filtros.lote);
    }
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
      pedidosCarregados,
      pedidosPrioritarios,
      pedidosNoPrazoLimite,
      pedidosNoPrazoRegular,
      lotes,
    } = this.state;
    const { valorDoFiltro } = this.props;
    const todosOsPedidosForamCarregados = pedidosCarregados === true;
    return (
      <div>
        {!todosOsPedidosForamCarregados ? (
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
                      inputOnChange={(value) => {
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
                      ultimaColunaLabel={"Data da Inclusão"}
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
                        ultimaColunaLabel={"Data da Inclusão"}
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
                        ultimaColunaLabel={"Data da Inclusão"}
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
