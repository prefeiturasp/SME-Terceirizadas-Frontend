import React, { Component } from "react";
import { FluxoDeStatus } from "../Shareable/FluxoDeStatus/FluxoDeStatus";
import { RowTableSchool } from "./RowTableSchool";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { ModalRecusarSolicitacao } from "../Shareable/ModalRecusarSolicitacao";
import { toastSuccess } from "../Shareable/dialogs";

class DetailUnifiedSolicitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacao: null,
      showModal: false,
      listaDeStatus: [
        {
          titulo: "Solicitação Realizada",
          status: "aprovado",
          timestamp: "25/04/2019 às 9:20",
          rf: "7972324",
          nome: "João da Silva"
        },
        {
          titulo: "Reprovado da DRE",
          status: "aprovado",
          timestamp: "25/04/2019 às 9:20",
          rf: "7972324",
          nome: "João da Silva"
        },
        {
          titulo: "Cancelado pela CODAE",
          status: "aprovado",
          timestamp: "25/04/2019 às 9:20",
          rf: "7972324",
          nome: "João da Silva"
        }
      ]
    };
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal(e) {
    this.setState({ showModal: false });
    toastSuccess("Kit Lanche recusado com sucesso!");
  }

  handleSubmit() {
    toastSuccess("Kit Lanche validado com sucesso!");
  }

  render() {
    const { solicitation } = this.props;
    const { listaDeStatus, showModal } = this.state;
    return (
      <div className="card mt-3">
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        <div className="card-body container-detail">
          <div className="container-title">
            <div className="identificador">
              <div>12083 - 7A IP I</div>
              <div>N° PEDIDO</div>
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
                  <div className="prop-solicitante">{solicitation.dre}</div>
                  <div className="prop-lote">{solicitation.lote}</div>
                </div>
              </div>
            </div>
            <div className="impressora">
              <i class="fas fa-print" />
            </div>
          </div>

          <hr />
          <FluxoDeStatus listaDeStatus={listaDeStatus} />
          <hr />

          <div className="descricao-evento">
            <div className="direita">
              <div className="descricao-container">
                <div className="descricao-titulo">Motivo</div>
                <div className="descricao-texto">
                  {solicitation.formulario.razao}
                </div>
              </div>
              <div className="descricao-container">
                <div className="descricao-titulo">Local do passeio</div>
                <div className="descricao-texto">
                  {solicitation.formulario.local_passeio}
                </div>
              </div>
            </div>
            <div className="esquerda">
              <div className="descricao-titulo">Data do evento</div>
              <div className="descricao-observacao">
                {solicitation.formulario.dia}
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
            {solicitation.formulario.escolas.map(escola => {
              return (
                <RowTableSchool escola={escola} solicitation={solicitation} />
              );
            })}
          </div>

          <div className="observacoes-solicitacao">
            <div className="div-topo">
              <div>
                <div className="descricao-titulo">
                  N° total de Unidade Escolares beneficiadas
                </div>
                <div className="descricao-texto">20 Unidades Escolares</div>
              </div>
              <div className="kits">
                <div>
                  <div className="descricao-titulo">N° total de Kits</div>
                  <div className="descricao-texto">203 Kits</div>
                </div>
              </div>
            </div>
            <div>
              <div className="descricao-titulo">Observações</div>
              <div
                className="descricao-texto"
                dangerouslySetInnerHTML={{
                  __html: solicitation.formulario.obs
                }}
              />
            </div>
          </div>

          <div className="botoes-acao">
            <BaseButton
              label={"Recusar Solicitação"}
              className="ml-3"
              onClick={() => this.showModal()}
              type={ButtonType.BUTTON}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label="Aprovar Solicitação"
              type={ButtonType.SUBMIT}
              onClick={() => this.handleSubmit()}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DetailUnifiedSolicitation;
