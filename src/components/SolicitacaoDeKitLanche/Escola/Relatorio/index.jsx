import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { formValueSelector, reduxForm } from "redux-form";
import { escolaPodeCancelar } from "../../../../constants/statusEnum";
import { dataParaUTC } from "../../../../helpers/utilities";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import { meusDados } from "../../../../services/perfil.service";
import {
  aprovaDeKitLancheAvulsoDiretoriaRegional,
  getDetalheKitLancheAvulsa
} from "../../../../services/solicitacaoDeKitLanche.service";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import {
  ModalCancelarSolicitacao,
  ORIGEM_SOLICITACAO
} from "../../../Shareable/ModalCancelarSolicitacao";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { corDaMensagem, prazoDoPedidoMensagem } from "./helper";
import "./style.scss";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      meusDados: { diretorias_regionais: [{ nome: "" }] },
      redirect: false,
      showModal: false,
      solicitacaoKitLanche: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaPedidosDeSolicitacao = () => {
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
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
        getDetalheKitLancheAvulsa(uuid).then(response => {
          const solicitacaoKitLanche = response;
          const data = solicitacaoKitLanche.solicitacao_kit_lanche.data;
          this.setState({
            solicitacaoKitLanche,
            uuid,
            prazoDoPedidoMensagem: prazoDoPedidoMensagem(
              data,
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
    aprovaDeKitLancheAvulsoDiretoriaRegional(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Solicitação de Kit Lanche Passeio validada com sucesso!"
          );
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(
            "Houve um erro ao validar a Solicitação de Kit Lanche Passeio"
          );
        }
      },
      function() {
        toastError(
          "Houve um erro ao validar a Solicitação de Kit Lanche Passeio"
        );
      }
    );
  }

  render() {
    const {
      solicitacaoKitLanche,
      showModal,
      prazoDoPedidoMensagem,
      uuid,
      meusDados
    } = this.state;
    const { justificativa } = this.props;
    return (
      <div>
        {this.renderizarRedirecionamentoParaPedidosDeSolicitacao()}
        <ModalCancelarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
          uuid={uuid}
          justificativa={justificativa}
          origemSolicitacao={ORIGEM_SOLICITACAO.ESCOLA}
          meusDados={meusDados}
          solicitacaoKitLanche={solicitacaoKitLanche}
        />
        {solicitacaoKitLanche && (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">
              Kit Lanche Passeio Pedido # {solicitacaoKitLanche.id_externo}
            </span>
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
                        # {solicitacaoKitLanche.id_externo}
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
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.diretoria_regional &&
                        solicitacaoKitLanche.escola.diretoria_regional.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.lote &&
                        solicitacaoKitLanche.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.tipo_gestao &&
                        solicitacaoKitLanche.escola.tipo_gestao.nome}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <FluxoDeStatus listaDeStatus={solicitacaoKitLanche.logs} />
                </div>
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>
                      {solicitacaoKitLanche.escola &&
                        solicitacaoKitLanche.escola.alunos_total}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Solicitação</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">
                      {solicitacaoKitLanche.solicitacao_kit_lanche &&
                        solicitacaoKitLanche.solicitacao_kit_lanche.data}
                    </p>
                  </div>
                  <div className="col-8 report-label-value">
                    <p>Local do passeio</p>
                    <p className="value">{solicitacaoKitLanche.local}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Nº de alunos participantes</p>
                    <p className="value">
                      {solicitacaoKitLanche.quantidade_alunos} alunos
                    </p>
                  </div>
                  <div className="col-8 report-label-value">
                    <p>Tempo previsto do passeio</p>
                    <p className="value">
                      {solicitacaoKitLanche.solicitacao_kit_lanche &&
                        solicitacaoKitLanche.solicitacao_kit_lanche
                          .tempo_passeio_explicacao}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 float-right report-label-value">
                    <p>Opção desejada</p>
                    {solicitacaoKitLanche.solicitacao_kit_lanche &&
                      solicitacaoKitLanche.solicitacao_kit_lanche.kits.map(
                        (kit, key) => {
                          return (
                            <p key={key} className="value">
                              Modelo {kit.nome}
                            </p>
                          );
                        }
                      )}
                  </div>
                </div>
                {solicitacaoKitLanche.solicitacao_kit_lanche &&
                  solicitacaoKitLanche.solicitacao_kit_lanche.kits && (
                    <div className="row">
                      <div className="col-12 float-right report-label-value">
                        <p>Nº total de kits</p>
                        <p className="value">
                          {solicitacaoKitLanche.solicitacao_kit_lanche.kits
                            .length *
                            solicitacaoKitLanche.quantidade_alunos}{" "}
                          kits
                        </p>
                      </div>
                    </div>
                  )}
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html:
                          solicitacaoKitLanche.solicitacao_kit_lanche &&
                          solicitacaoKitLanche.solicitacao_kit_lanche.descricao
                      }}
                    />
                  </div>
                </div>
                {escolaPodeCancelar(solicitacaoKitLanche.status) && (
                  <div className="form-group row float-right mt-4">
                    <BaseButton
                      label={"Cancelar pedido"}
                      className="ml-3"
                      onClick={() => this.showModal()}
                      type={ButtonType.BUTTON}
                      style={ButtonStyle.OutlinePrimary}
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
const formName = "solicitacaoKitLancheRelatorio";
const selector = formValueSelector(formName);

const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa")
  };
};

const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

export default connect(mapStateToProps)(RelatorioForm);
