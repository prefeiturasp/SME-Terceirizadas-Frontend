import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import {
  CODAEAutorizaPedidoKitLancheUnificado,
  getSolicitacaoUnificada,
  CODAENegaKitLancheUnificadoEscola
} from "../../../../services/solicitacaoUnificada.service";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import { prazoDoPedidoMensagem } from "../../../../helpers/utilities";
import TabelaKits from "./TabelaKits";
import {
  CODAE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA
} from "../../../../configs/constants";
import { statusEnum } from "../../../../constants/statusEnum";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../Shareable/Botao/constants";
import { ModalNegarSolicitacao } from "../../../Shareable/ModalNegarSolicitacao";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      redirect: false,
      showModal: false,
      ehInclusaoContinua: false,
      solicitacaoUnificada: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.updateLogs = this.updateLogs.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamento = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getSolicitacaoUnificada(uuid).then(response => {
        const solicitacaoUnificada = response.data;
        this.setState({
          solicitacaoUnificada,
          uuid,
          prazoDoPedidoMensagem: prazoDoPedidoMensagem(
            solicitacaoUnificada.prioridade
          )
        });
      });
    }
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  updateLogs() {
    getSolicitacaoUnificada(this.state.uuid).then(response => {
      this.setState({ solicitacaoUnificada: response.data });
    });
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    CODAEAutorizaPedidoKitLancheUnificado(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação Unificada autorizada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao autorizar a Solicitação Unificada");
        }
      },
      function() {
        toastError("Houve um erro ao autorizar a Solicitação Unificada");
      }
    );
  }

  render() {
    const { showModal, solicitacaoUnificada, uuid } = this.state;
    const { justificativa } = this.props;
    return (
      <div>
        {!solicitacaoUnificada ? (
          <span>Carregando...</span>
        ) : (
          <div>
            <ModalNegarSolicitacao
              closeModal={this.closeModal}
              showModal={showModal}
              uuid={uuid}
              justificativa={justificativa}
              negarEndpoint={CODAENegaKitLancheUnificadoEscola}
              updateLogs={this.updateLogs}
            />
            <span className="page-title">
              Solicitação Unificada # {solicitacaoUnificada.id_externo}
              <Link to={`/${CODAE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}>
                <Botao
                  texto="voltar"
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.BLUE}
                  icon={BUTTON_ICON.ARROW_LEFT}
                  className="float-right"
                />
              </Link>
            </span>
            <div className="card mt-3">
              <div className="card-body container-detail">
                {this.renderizarRedirecionamento()}
                <div className="container-title">
                  <div className="identificador">
                    <div># {solicitacaoUnificada.id_externo}</div>
                    <div>ID DA SOLICITAÇÃO</div>
                  </div>
                  <div className="titulo-descricao">
                    <div className="titulo-solicitante-lote">
                      <div>
                        <div className="solicitante">Solicitante</div>
                        <div className="lote">Lote</div>
                      </div>
                      <div>
                        <div className="prop-solicitante">{`DRE ${
                          solicitacaoUnificada.diretoria_regional.nome
                        }`}</div>
                        <div className="prop-lote">
                          {solicitacaoUnificada.lote_nome}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Botao
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE}
                    icon={BUTTON_ICON.PRINT}
                    className="float-right"
                  />
                </div>

                <hr />
                <FluxoDeStatus
                  tipoDeFluxo="partindoDRE"
                  listaDeStatus={solicitacaoUnificada.logs}
                />
                <hr />

                <div className="descricao-evento">
                  <div className="direita">
                    <div className="descricao-container">
                      <div className="descricao-titulo">Local do passeio</div>
                      <div className="descricao-texto">
                        {solicitacaoUnificada.local}
                      </div>
                    </div>
                  </div>
                  <div className="esquerda">
                    <div className="descricao-container">
                      <div className="descricao-titulo">Data do evento</div>
                      <div className="descricao-observacao">
                        {solicitacaoUnificada.solicitacao_kit_lanche.data}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tabela-escolas header-tabela">
                  <div>Código</div>
                  <div>Unidade Escolar</div>
                  <div>N° de alunos participantes</div>
                  <div>Tempo de passeio</div>
                  <div>Opção desejada</div>
                  <div>N° Total de Kits</div>
                </div>

                <div>
                  {solicitacaoUnificada.escolas_quantidades.map(
                    (escola_quantidade, key) => {
                      return (
                        <TabelaKits
                          key={key}
                          escola_quantidade={escola_quantidade}
                          solicitacaoUnificada={solicitacaoUnificada}
                        />
                      );
                    }
                  )}
                </div>

                <div className="observacoes-solicitacao">
                  <div className="div-topo">
                    <div>
                      <div className="descricao-titulo">
                        N° total de Unidade Escolares beneficiadas
                      </div>
                      <div className="descricao-texto">{`${
                        solicitacaoUnificada.escolas_quantidades.length
                      } Unidades Escolares`}</div>
                    </div>
                    <div className="kits">
                      <div>
                        <div className="descricao-titulo">N° total de Kits</div>
                        <div className="descricao-texto">
                          {solicitacaoUnificada.total_kit_lanche} Kits
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="descricao-titulo">Observações</div>
                    <div
                      className="descricao-texto"
                      dangerouslySetInnerHTML={{
                        __html:
                          solicitacaoUnificada.solicitacao_kit_lanche.descricao
                      }}
                    />
                  </div>
                </div>
                {solicitacaoUnificada.status ===
                  statusEnum.CODAE_A_AUTORIZAR && (
                  <div className="row">
                    <div className="col-12 text-right">
                      <Botao
                        texto={"Negar"}
                        onClick={() => this.showModal()}
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                      />
                      <Botao
                        texto="Autorizar"
                        type={BUTTON_TYPE.SUBMIT}
                        onClick={() => this.handleSubmit()}
                        style={BUTTON_STYLE.GREEN}
                        className="ml-3"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const formName = "kitLancheUnificadoRelatorioCodaeForm";

const selector = formValueSelector(formName);
const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa"),
    motivo_cancelamento: selector(state, "motivo_cancelamento")
  };
};

const RelatorioForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(Relatorio);

export default connect(mapStateToProps)(RelatorioForm);
