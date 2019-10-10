import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { formValueSelector, reduxForm } from "redux-form";
import { CODAE, INVERSAO_CARDAPIO } from "../../../../configs/constants";
import { statusEnum } from "../../../../constants/statusEnum";
import { dataParaUTC } from "../../../../helpers/utilities";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import {
  CODAEAutorizaPedidoDRE,
  getInversaoDeDiaDeCardapio
} from "../../../../services/inversaoDeDiaDeCardapio.service";
import { meusDados } from "../../../../services/perfil.service";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../Shareable/Botao/constants";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { ModalNegarInversaoDiaCardapio } from "../../../Shareable/ModalNegarInversaoDiaCardapio";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { corDaMensagem, prazoDoPedidoMensagem } from "./helper";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: { diretorias_regionais: [{ nome: "" }] },
      redirect: false,
      showModal: false,
      ehInclusaoContinua: false,
      InversaoCardapio: null,
      escolaDaInversao: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaInversoesDeCardapio = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${CODAE}/${INVERSAO_CARDAPIO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    meusDados().then(meusDados => {
      this.setState({ meusDados });
    });
    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      if (uuid) {
        getInversaoDeDiaDeCardapio(uuid).then(response => {
          const InversaoCardapio = response.data;
          const data_de = moment(InversaoCardapio.data_de, "DD/MM/YYYY");
          const data_para = moment(InversaoCardapio.data_para, "DD/MM/YYYY");
          let dataMaisProxima = data_de;
          if (dataMaisProxima < data_para) {
            dataMaisProxima = data_para;
          }

          this.setState({
            InversaoCardapio,
            uuid,
            escolaDaInversao: InversaoCardapio.escola,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              dataMaisProxima,
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

  handleSubmit() {
    const uuid = this.state.uuid;
    CODAEAutorizaPedidoDRE(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Inversão de dias de cardápio autorizada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(
            "Houve um erro ao autorizar a Inversão de dias de cardápio"
          );
        }
      },
      function() {
        toastError("Houve um erro ao autorizar a Inversão de dias de cardápio");
      }
    );
  }

  render() {
    const {
      showModal,
      InversaoCardapio,
      prazoDoPedidoMensagem,
      escolaDaInversao,
      uuid
    } = this.state;
    const { justificativa, motivo_cancelamento } = this.props;
    return (
      <div className="report">
        <ModalNegarInversaoDiaCardapio
          closeModal={this.closeModal}
          showModal={showModal}
          uuid={uuid}
          justificativa={justificativa}
          motivoCancelamento={motivo_cancelamento}
          inversaoDeDiaDeCardapio={InversaoCardapio}
          setRedirect={this.setRedirect.bind(this)}
        />
        {this.renderizarRedirecionamentoParaInversoesDeCardapio()}
        {!InversaoCardapio ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Inversão de dia de cardápio - Pedido # ${
              InversaoCardapio.id_externo
            }`}</span>
            <Link to={`/${CODAE}/${INVERSAO_CARDAPIO}`}>
              <Botao
                texto="voltar"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="float-right"
              />
            </Link>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p
                    className={`col-12 title-message ${corDaMensagem(
                      prazoDoPedidoMensagem
                    )}`}
                  >
                    {prazoDoPedidoMensagem}
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      icon={BUTTON_ICON.PRINT}
                      className="float-right"
                    />
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {InversaoCardapio.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DO PEDIDO
                      </span>
                    </span>
                  </div>
                  <div className="report-div-beside-order my-auto col-8">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {InversaoCardapio.escola && InversaoCardapio.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {InversaoCardapio.escola &&
                        InversaoCardapio.escola.diretoria_regional &&
                        InversaoCardapio.escola.diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {escolaDaInversao.lote && escolaDaInversao.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {escolaDaInversao &&
                        escolaDaInversao.tipo_gestao &&
                        escolaDaInversao.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {InversaoCardapio.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={InversaoCardapio.logs} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{escolaDaInversao.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">
                      Descrição da inversão de dias de cardápio
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 report-label-value">
                    <p>De:</p>
                    <p className="value">{InversaoCardapio.data_de}</p>
                  </div>
                  <div className="col-3 report-label-value">
                    <p>Para:</p>
                    <p className="value">{InversaoCardapio.data_para}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Motivo</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: InversaoCardapio.motivo
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: InversaoCardapio.observacao
                      }}
                    />
                  </div>
                </div>
                {InversaoCardapio.status === statusEnum.DRE_VALIDADO && (
                  <div className="form-group row float-right mt-4">
                    <Botao
                      texto={"Negar Solicitação"}
                      className="ml-3"
                      onClick={() => this.showModal()}
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Autorizar Solicitação"
                      type={BUTTON_TYPE.SUBMIT}
                      onClick={() => this.handleSubmit()}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
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

const formName = "relatorioInversaoDeDiaDeCardapioCODAE";
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
