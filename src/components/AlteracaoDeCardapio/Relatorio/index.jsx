import React, { Component } from "react";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  getAlteracaoCardapio,
  escolaCancelaAlteracaoCardapio
} from "../../../services/alteracaoDecardapio.service";
import { getDiasUteis } from "../../../services/diasUteis.service";
import { dataParaUTC } from "../../../helpers/utilities";
import { escolaPodeCancelar } from "../../../constants/statusEnum";
import CorpoRelatorio from "./componentes/CorpoRelatorio";
import { prazoDoPedidoMensagem } from "../../../helpers/utilities";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      showNaoModalAprova: false,
      showModalAprova: false,
      alteracaoDecardapio: null,
      prazoDoPedidoMensagem: null
    };
    this.closeAprovaModal = this.closeAprovaModal.bind(this);
    this.closeNaoAprovaModal = this.closeNaoAprovaModal.bind(this);
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
  }

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
          this.setState({
            alteracaoDeCardapio: response,
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              response.data_inicial,
              proximos_dois_dias_uteis,
              proximos_cinco_dias_uteis
            )
          });
        });
      }
    });
  }

  showAprovaModal() {
    this.setState({ showAprovaModal: true });
  }

  closeAprovaModal() {
    this.setState({ showAprovaModal: false });
  }

  showNaoAprovaModal() {
    this.setState({ showNaoAprovaModal: true });
  }

  closeNaoAprovaModal() {
    this.setState({ showNaoAprovaModal: false });
  }

  loadSolicitacao(uuid) {
    getAlteracaoCardapio(uuid).then(response => {
      this.setState({
        alteracaoDeCardapio: response
      });
    });
  }

  render() {
    const {
      showNaoAprovaModal,
      alteracaoDeCardapio,
      prazoDoPedidoMensagem,
      uuid
    } = this.state;
    const { justificativa } = this.props;
    const ModalNaoAprova = this.props.modalNaoAprova;
    return (
      <div>
        <ModalNaoAprova
          showModal={showNaoAprovaModal}
          closeModal={this.closeNaoAprovaModal}
          endpoint={escolaCancelaAlteracaoCardapio}
          solicitacao={alteracaoDeCardapio}
          loadSolicitacao={this.loadSolicitacao}
          justificativa={justificativa}
          uuid={uuid}
        />
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
                        onClick={() => this.showNaoAprovaModal()}
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
