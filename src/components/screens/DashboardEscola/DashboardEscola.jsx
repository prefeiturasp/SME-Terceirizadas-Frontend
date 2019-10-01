import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import {
  ESCOLA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_RECUSADAS
} from "../../../configs/constants";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import CardLegendas from "../../Shareable/CardLegendas";
import CardMatriculados from "../../Shareable/CardMatriculados";
import {
  CardStatusDeSolicitacao,
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { LabelAndInput } from "../../Shareable/labelAndInput/labelAndInput";
import CardAtalho from "./CardAtalho";
import "./style.scss";

export class DashboardEscola extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      autorizadasListFiltered: [],
      pendentesListFiltered: [],
      negadasListFiltered: [],
      canceladasListFiltered: []
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { autorizadas, pendentes, negadas, canceladas } = this.props;
    if (prevProps.autorizadas.length !== autorizadas.length)
      this.setState({
        autorizadasListFiltered: autorizadas
      });

    if (prevProps.pendentes.length !== pendentes.length)
      this.setState({
        pendentesListFiltered: pendentes
      });

    if (prevProps.negadas.length !== negadas.length)
      this.setState({
        negadasListFiltered: negadas
      });
    if (prevProps.canceladas.length !== canceladas.length)
      this.setState({
        canceladasListFiltered: canceladas
      });
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    const { autorizadas, pendentes, negadas, canceladas } = this.props;

    let pendentesListFiltered = pendentes;
    let autorizadasListFiltered = autorizadas;
    let negadasListFiltered = negadas;
    let canceladasListFiltered = canceladas;

    pendentesListFiltered = this.filtrarNome(pendentesListFiltered, event);
    autorizadasListFiltered = this.filtrarNome(autorizadasListFiltered, event);
    negadasListFiltered = this.filtrarNome(negadasListFiltered, event);
    canceladasListFiltered = this.filtrarNome(canceladasListFiltered, event);

    this.setState({
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      canceladasListFiltered
    });
  }

  filtrarNome(listaFiltro, event) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      collapsed,
      pendentesListFiltered,
      autorizadasListFiltered,
      negadasListFiltered,
      canceladasListFiltered
    } = this.state;
    const { numeroAlunos } = this.props;
    return (
      <div className="dashboard-school">
        <CardMatriculados
          numeroAlunos={numeroAlunos}
          collapsed={collapsed}
          alterarCollapse={this.alterarCollapse}
        >
          <Collapse isOpened={!collapsed}>
            <div className="user-data">
              <form>
                <div className="row">
                  <div className="form-group col-6">
                    <Field
                      component={LabelAndInput}
                      label="RF Responsável"
                      placeholder="00000000"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                      hasIcon
                    />
                  </div>
                  <div className="form-group col-6">
                    <Field
                      component={LabelAndInput}
                      label="Cargo / Função"
                      placeholder="Nome do Cargo"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                      hasIcon
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <Field
                      component={LabelAndInput}
                      label="Nome"
                      placeholder="Nome Completo"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                      hasIcon
                    />
                  </div>
                </div>
              </form>
            </div>
          </Collapse>
        </CardMatriculados>
        <CardBody
          titulo={"Acompanhamento solicitações"}
          dataAtual={dataAtual()}
          onChange={this.onPesquisaChanged}
        >
          <div className="row">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Pendente Aprovação"}
                cardType={CARD_TYPE_ENUM.PENDENTE}
                solicitations={pendentesListFiltered}
                icon={ICON_CARD_TYPE_ENUM.PENDENTE}
                href={`/${ESCOLA}/${SOLICITACOES_PENDENTES}`}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Aguardando Aprovação"}
                cardType={CARD_TYPE_ENUM.APROVADO}
                solicitations={autorizadasListFiltered}
                icon={ICON_CARD_TYPE_ENUM.APROVADO}
                href={`/${ESCOLA}/${SOLICITACOES_AUTORIZADAS}`}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Negadas"}
                cardType={CARD_TYPE_ENUM.NEGADO}
                solicitations={negadasListFiltered}
                icon={ICON_CARD_TYPE_ENUM.NEGADO}
                href={`/${ESCOLA}/${SOLICITACOES_RECUSADAS}`}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Canceladas"}
                cardType={CARD_TYPE_ENUM.CANCELADO}
                solicitations={canceladasListFiltered}
                icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                href={`/${ESCOLA}/${SOLICITACOES_CANCELADAS}`}
              />
            </div>
          </div>
          <CardLegendas />
        </CardBody>
        <div className="row row-shortcuts">
          <div className="col-3">
            <CardAtalho
              titulo={"Inclusão de Alimentação"}
              texto={
                "Quando houver necessidade de incluir dentro" +
                " da unidade alimentação para os alunos matriculados" +
                " na RME (exemplos: reposição de aula aos sábados; projetos)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/inclusao-de-alimentacao"}
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Alteração de Cardápio"}
              texto={
                "Quando houver necessidade de alteração do cardápio dentro da unidade, " +
                "alterando o tipo de alimentação (exemplos: alteração de refeição " +
                "por lanche; alteração de refeição e lanche por merenda seca)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/alteracao-de-cardapio"}
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Solicitação de Kit Lanche Passeio"}
              texto={
                "Quando houver necessidade da solicitação de Kit Lanche Passeio para consumo durante " +
                "o passeio externo (situações em que não há possibilidade de oferecer a " +
                "alimentação na própria unidade como por exemplo Kit Lanche Passeio para visitar " +
                "o museu)"
              }
              textoLink={"Novo pedido"}
              href="/escola/solicitacao-de-kit-lanche"
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Inversão de Dias de Cardapio"}
              texto={
                "Quando houver necessidade da inversão de todo cardápio de um dia do mês por " +
                "outro dia de atendimento (exemplo: inversão do cardápio do dia X pelo dia Y)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/inversao-de-dia-de-cardapio"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <CardAtalho
              titulo={"Suspensão de Alimentação"}
              texto={
                "Quando houver necessidade de suspensão da alimentação de algum dia do mês " +
                "(refeição/lanche) por não ter atendimento com alunos (exemplo: suspensão da " +
                "alimentação do dia X devido a parada pedagógica)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/suspensao-de-alimentacao"}
            />
          </div>
        </div>
      </div>
    );
  }
}

const DashboardEscolaForm = reduxForm({
  form: "dashboardEscola",
  enableReinitialize: true
})(DashboardEscola);

export default DashboardEscolaForm;
