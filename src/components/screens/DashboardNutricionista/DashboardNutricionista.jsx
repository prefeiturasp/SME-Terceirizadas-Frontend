import { getNomeCardAguardandoAutorizacao } from "helpers/dietaEspecial";
import React, { Component } from "react";
//import { reduxForm } from "redux-form";
import {
  ESCOLA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS
} from "../../../configs/constants";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import {
  CardStatusDeSolicitacao,
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import "./style.scss";

export default class DashboardNutricionista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      autorizadasListFiltered: [],
      pendentesListFiltered: [],
      negadasListFiltered: []
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { autorizadas, pendentes, negadas } = this.props;

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
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    const { autorizadas, pendentes, negadas } = this.props;

    let pendentesListFiltered = pendentes;
    let autorizadasListFiltered = autorizadas;
    let negadasListFiltered = negadas;

    pendentesListFiltered = this.filtrarNome(pendentesListFiltered, event);
    autorizadasListFiltered = this.filtrarNome(autorizadasListFiltered, event);
    negadasListFiltered = this.filtrarNome(negadasListFiltered, event);

    this.setState({
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered
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
      pendentesListFiltered,
      autorizadasListFiltered,
      negadasListFiltered
    } = this.state;
    return (
      <div className="dashboard-school">
        <CardBody
          titulo={"Acompanhamento solicitações"}
          dataAtual={dataAtual()}
          onChange={this.onPesquisaChanged}
        >
          <div className="row">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={getNomeCardAguardandoAutorizacao()}
                cardType={CARD_TYPE_ENUM.PENDENTE}
                solicitations={pendentesListFiltered}
                icon={ICON_CARD_TYPE_ENUM.PENDENTE}
                href={`/${ESCOLA}/${SOLICITACOES_PENDENTES}`}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Autorizados"}
                cardType={CARD_TYPE_ENUM.AUTORIZADO}
                solicitations={autorizadasListFiltered}
                icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
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
                href={`/${ESCOLA}/${SOLICITACOES_NEGADAS}`}
              />
            </div>
          </div>
        </CardBody>
      </div>
    );
  }
}

// const DashboardNutricionistaForm = reduxForm({
//   form: "dashboardNutricionista",
//   enableReinitialize: true
// })(DashboardNutricionista);

// export default DashboardNutricionistaForm;
