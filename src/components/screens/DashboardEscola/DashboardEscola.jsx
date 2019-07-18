import React, { Component } from "react";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { dataAtual } from "./utils";
import CardBody from "../../Shareable/CardBody";
import { CardStatusDeSolicitacao } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardAtalho from "./CardAtalho";
import CardLegendas from "./CardLegendas";
import CardHistorico from "../../Shareable/CardHistorico/CardHistorico";

export default class DashboardEscola extends Component {
  render() {
    const { numeroAlunos, autorizadas, theadList, trs } = this.props;
    return (
      <div>
        <CardMatriculados
          numeroAlunos={numeroAlunos}
        />
        <CardBody
          titulo={"Painel de Status de Solicitações"}
          dataAtual={dataAtual()}
        >
          <div className="row">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Autorizadas"}
                cardType={"card-authorized"}
                solicitations={autorizadas}
                icon={"fa-check"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Pendente Aprovação"}
                cardType={"card-pending"}
                solicitations={autorizadas}
                icon={"fa-exclamation-triangle"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Recusadas"}
                cardType={"card-denied"}
                solicitations={autorizadas}
                icon={"fa-ban"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Canceladas"}
                cardType={"card-cancelled"}
                solicitations={autorizadas}
                icon={"fa-times-circle"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
          </div>
          <CardLegendas />
        </CardBody>
        <div className="row">
          <CardAtalho
            titulo={"Inversão de Dias de Cardapio"}
            texto={
              "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
            }
            textoLink={"Novo pedido"}
            href={"/escola/inversao-de-dia-de-cardapio"}
          />
          <CardAtalho
            titulo={"Alteração de Cardápio"}
            texto={
              "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
            }
            textoLink={"Novo pedido"}
            href={"/escola/alteracao-de-cardapio"}
          />
          <CardAtalho
            titulo={"Inclusão de Alimentação"}
            texto={
              "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
            }
            textoLink={"Novo pedido"}
            href={"/escola/inclusao-de-alimentacao"}
          />
          <CardAtalho
            titulo={"Suspensão de Alimentação"}
            texto={
              "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
            }
            textoLink={"Novo pedido"}
            href={"/escola/suspensao-de-alimentacao"}
          />
          <CardAtalho
            titulo={"Kit Lanche"}
            texto={
              "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
            }
            textoLink={"Novo pedido"}
            href="/escola/solicitacao-de-kit-lanche"
          />
        </div>
        <CardHistorico
          thead={theadList}
          trs={trs}
          titulo={"Histórico de Alimentações solicitadas"}
        />
      </div>
    );
  }
}
