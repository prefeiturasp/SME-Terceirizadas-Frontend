import React, { Component } from "react";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import { Redirect } from "react-router-dom";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getAlteracaoCardapio } from "../../../services/alteracaoDecardapio.service";
import { getDiasUteis } from "../../../services/diasUteis.service";
import { dataParaUTC } from "../../../helpers/utilities";
import { ESCOLA, ALTERACAO_CARDAPIO } from "../../../configs/constants";
import { escolaPodeCancelar } from "../../../constants/statusEnum";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { prazoDoPedidoMensagem } from "../../../helpers/utilities";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      showModal: false,
      alteracaoDecardapio: null,
      prazoDoPedidoMensagem: null,
      listaDeStatus: []
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaPedidos = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${ESCOLA}/${ALTERACAO_CARDAPIO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      if (uuid) {
        getAlteracaoCardapio(uuid).then(response => {
          const dataMaisProxima =
            response.inclusoes && response.inclusoes[0].data;
          this.setState({
            alteracaoDeCardapio: response,
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              response.data_inicial || dataMaisProxima,
              proximos_dois_dias_uteis,
              proximos_cinco_dias_uteis
            )
          });
        });
      }
    });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { alteracaoDeCardapio, prazoDoPedidoMensagem } = this.state;
    return (
      <div>
        {this.renderizarRedirecionamentoParaPedidos()}
        {!alteracaoDeCardapio ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Alteração de Cardápio - Pedido # ${
              alteracaoDeCardapio.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio
                  alteracaoDeCardapio={alteracaoDeCardapio}
                  prazoDoPedidoMensagem={prazoDoPedidoMensagem}
                />
                {escolaPodeCancelar(alteracaoDeCardapio.status) && (
                  <div className="form-group row mt-4">
                    <div className="col-12 text-right">
                      <Botao
                        texto={"Cancelar"}
                        onClick={() => this.showModal()}
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
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

const formName = "relatorioAlteracaoDeCardapioDre";
const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

const selector = formValueSelector(formName);

const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa"),
    motivo_cancelamento: selector(state, "motivo_cancelamento")
  };
};

export default connect(mapStateToProps)(RelatorioForm);
