import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { formValueSelector, reduxForm } from "redux-form";
import {
  CODAE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA
} from "../../../../configs/constants";
import { dataParaUTC } from "../../../../helpers/utilities";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import { meusDados } from "../../../../services/perfil.service";
import {
  CODAEAprovaPedidoDRE,
  getSolicitacaoUnificada
} from "../../../../services/solicitacaoUnificada.service";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus";
import {
  ModalCancelarSolicitacao,
  ORIGEM_SOLICITACAO
} from "../../../Shareable/ModalCancelarSolicitacao";
import { toastError, toastSuccess } from "../../../Shareable/Toast/dialogs";
// import "../style.scss";
import { prazoDoPedidoMensagem } from "./helper";
import "./style.scss";
import TabelaKits from "./TabelaKits";

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
      solicitacaoUnificada: null,
      prazoDoPedidoMensagem: null
    };
    this.closeModal = this.closeModal.bind(this);
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
        getSolicitacaoUnificada(uuid).then(response => {
          const solicitacaoUnificada = response.data;
          const data_de = moment(solicitacaoUnificada.data_de, "DD/MM/YYYY");
          const data_para = moment(
            solicitacaoUnificada.data_para,
            "DD/MM/YYYY"
          );
          let dataMaisProxima = data_de;
          if (dataMaisProxima < data_para) {
            dataMaisProxima = data_para;
          }

          this.setState({
            solicitacaoUnificada,
            uuid,
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

  closeModal(e) {
    this.setState({ showModal: false });
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    CODAEAprovaPedidoDRE(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação Unificada autorizada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao autorizar a Solicitação Unificada");
        }
      },
      function(error) {
        toastError("Houve um erro ao autorizar a Solicitação Unificada");
      }
    );
  }

  render() {
    const { showModal, solicitacaoUnificada, uuid, meusDados } = this.state;
    const { justificativa } = this.props;
    return (
      <div className="card mt-3">
        <ModalCancelarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
          uuid={uuid}
          justificativa={justificativa}
          meusDados={meusDados}
          origemSolicitacao={ORIGEM_SOLICITACAO.DRE}
          solicitacaoKitLanche={solicitacaoUnificada}
        />
        {!solicitacaoUnificada ? (
          <span>Carregando...</span>
        ) : (
          <div className="card-body container-detail">
            {this.renderizarRedirecionamento()}
            <div className="container-title">
              <div className="identificador">
                <div># {solicitacaoUnificada.id_externo}</div>
                <div>ID do PEDIDO</div>
              </div>
              <div className="titulo-descricao">
                <div className="titulo-descricao-top">
                  informação automatica disponibilizada no
                  <span> Cadastro de Unidade Escolar</span>
                </div>
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
                      {
                        "# TODO: ajustar o serializer para trazer o lote de forma mais amigavel"
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="impressora">
                <i class="fas fa-print" />
              </div>
            </div>

            <hr />
            <FluxoDeStatus
              tipoDeFluxo="partindoDRE"
              listaDeStatus={solicitacaoUnificada.logs}
            />
            <hr />

            <div className="descricao-evento">
              <div className="direita">
                <div className="descricao-container" />
                <div className="descricao-container">
                  <div className="descricao-titulo">Local do passeio</div>
                  <div className="descricao-texto">
                    {solicitacaoUnificada.local}
                  </div>
                </div>
              </div>
              <div className="esquerda">
                <div className="descricao-titulo">Data do passeio</div>
                <div className="descricao-observacao">
                  {solicitacaoUnificada.solicitacao_kit_lanche.data}
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
                escola_quantidade => {
                  return (
                    <TabelaKits
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
            <div className="botoes-acao">
              <BaseButton
                label="Cancelar"
                type={ButtonType.SUBMIT}
                onClick={() => this.showModal()}
                style={ButtonStyle.Success}
                className="ml-3"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
const formName = "unifiedSolicitationFilledForm";

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
