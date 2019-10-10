import React, { Component } from "react";
import { Botao } from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../../Shareable/Botao/constants";
import { Redirect } from "react-router-dom";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { prazoDoPedidoMensagem, corDaMensagem } from "./helper";
import { ModalCancelarAlteracaoDeCardapio } from "./components/ModalCancelarAlteracaoDeCardapio";
import { getAlteracaoCardapio } from "../../../../services/alteracaoDecardapio.service";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import { meusDados } from "../../../../services/perfil.service";
import { dataParaUTC } from "../../../../helpers/utilities";
import "./style.scss";
import { ESCOLA, ALTERACAO_CARDAPIO } from "../../../../configs/constants";
import { escolaPodeCancelar } from "../../../../constants/statusEnum";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: null,
      redirect: false,
      showModal: false,
      ehInclusaoContinua: false,
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

    meusDados().then(meusDados => {
      this.setState({
        meusDados
      });
    });
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

  renderParteAvulsa() {
    const { alteracaoDeCardapio } = this.state;
    return (
      <table className="table-periods">
        <tr>
          <th>Data Inicial</th>
          <th>Data Final</th>
        </tr>
        <tr>
          <td>{alteracaoDeCardapio.data_inicial}</td>
          <td>{alteracaoDeCardapio.data_final}</td>
        </tr>
      </table>
    );
  }

  render() {
    const {
      showModal,
      alteracaoDeCardapio,
      prazoDoPedidoMensagem,
      uuid
    } = this.state;
    const { justificativa, motivo_cancelamento } = this.props;
    return (
      <div>
        <ModalCancelarAlteracaoDeCardapio
          closeModal={this.closeModal}
          showModal={showModal}
          uuid={uuid}
          justificativa={justificativa}
          motivoCancelamento={motivo_cancelamento}
          alteracaoDeCardapio={alteracaoDeCardapio}
          setRedirect={this.setRedirect.bind(this)}
        />
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
                <div className="row">
                  <p
                    className={`col-12 title-message ${corDaMensagem(
                      prazoDoPedidoMensagem
                    )}`}
                  >
                    {prazoDoPedidoMensagem}
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        # {alteracaoDeCardapio.id_externo}
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
                      {alteracaoDeCardapio.escola &&
                        alteracaoDeCardapio.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {alteracaoDeCardapio.escola &&
                        alteracaoDeCardapio.escola.lote &&
                        alteracaoDeCardapio.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {alteracaoDeCardapio.escola &&
                        alteracaoDeCardapio.escola.tipo_gestao &&
                        alteracaoDeCardapio.escola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                {alteracaoDeCardapio.logs && (
                  <div className="row">
                    <FluxoDeStatus listaDeStatus={alteracaoDeCardapio.logs} />
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{alteracaoDeCardapio.escola.quantidade_alunos}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Alteração de Cardápio</p>
                  </div>
                </div>
                {this.renderParteAvulsa()}
                <table className="table-periods">
                  <tr>
                    <th>Período</th>
                    <th>Tipos de Alimentação de</th>
                    <th>Tipos de Alimentação para</th>
                  </tr>
                  {alteracaoDeCardapio.substituicoes.map(
                    (quantidade_por_periodo, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            {quantidade_por_periodo.periodo_escolar &&
                              quantidade_por_periodo.periodo_escolar.nome}
                          </td>
                          <td>
                            {quantidade_por_periodo.tipo_alimentacao_de.nome}
                          </td>
                          <td>
                            {quantidade_por_periodo.tipo_alimentacao_para.nome}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </table>

                <table className="table-periods">
                  <tr>
                    <th>Motivo</th>
                  </tr>
                  <tr>
                    <td>{alteracaoDeCardapio.motivo.nome}</td>
                  </tr>
                </table>

                <table className="table-periods">
                  <tr>
                    <th>Observações</th>
                  </tr>
                  <tr>
                    <td>
                      <p
                        className="value"
                        dangerouslySetInnerHTML={{
                          __html: alteracaoDeCardapio.observacao
                        }}
                      />
                    </td>
                  </tr>
                </table>
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
