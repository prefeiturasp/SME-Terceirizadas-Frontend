import React, { Component } from "react";
import { meusDados } from "../../../services/perfil.service";
import {
  CardStatusDeSolicitacao,
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { dataAtual } from "../../../helpers/utilities";

import { ajustarFormatoLog } from "../helper";

class DashBoardDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasListFiltered: null,
      pendentesListFiltered: null,
      negadasListFiltered: null,
      instituicao: null
    };
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({
        instituicao: response.vinculo_atual.instituicao
      });
    });
  }

  componentDidUpdate(prevState) {
    let {
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      instituicao
    } = this.state;

    if (
      autorizadasListFiltered !== prevState.autorizadasListFiltered &&
      !autorizadasListFiltered
    ) {
      this.props
        .getDietaEspecialAutorizadas(instituicao.uuid)
        .then(response => {
          this.setState({
            autorizadasListFiltered: ajustarFormatoLog(response.results)
          });
        });
    }
    if (
      pendentesListFiltered !== prevState.pendentesListFiltered &&
      !pendentesListFiltered
    ) {
      this.props
        .getDietaEspecialPendenteAutorizacao(instituicao.uuid)
        .then(response => {
          this.setState({
            pendentesListFiltered: ajustarFormatoLog(response.results)
          });
        });
    }
    if (
      negadasListFiltered !== prevState.negadasListFiltered &&
      !negadasListFiltered
    ) {
      this.props.getDietaEspecialNegadas(instituicao.uuid).then(response => {
        this.setState({
          negadasListFiltered: ajustarFormatoLog(response.results)
        });
      });
    }
  }

  filtrarNome(listaFiltro, event) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return item.text.toLowerCase().search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    let {
      pendentesListFiltered,
      autorizadasListFiltered,
      negadasListFiltered
    } = this.state;

    pendentesListFiltered = this.filtrarNome(pendentesListFiltered, event);
    autorizadasListFiltered = this.filtrarNome(autorizadasListFiltered, event);
    negadasListFiltered = this.filtrarNome(negadasListFiltered, event);

    this.setState({
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered
    });
  }

  render() {
    const {
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      instituicao
    } = this.state;
    return (
      <div>
        <CardMatriculados
          numeroAlunos={instituicao && instituicao.quantidade_alunos}
          alterarCollapse={this.alterarCollapse}
        />
        {pendentesListFiltered &&
          autorizadasListFiltered &&
          negadasListFiltered && (
            <CardBody
              titulo={"Acompanhamento de solicitações dieta especial"}
              dataAtual={dataAtual()}
              onChange={this.onPesquisaChanged}
            >
              <div className="row">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Aguardando Autorização"}
                    cardType={CARD_TYPE_ENUM.PENDENTE}
                    solicitations={pendentesListFiltered}
                    icon={ICON_CARD_TYPE_ENUM.PENDENTE}
                    href={`dfdfddfd`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizados"}
                    cardType={CARD_TYPE_ENUM.AUTORIZADO}
                    solicitations={autorizadasListFiltered}
                    icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                    href={`dffdfddf`}
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
                    href={`fdfddffd`}
                  />
                </div>
              </div>
            </CardBody>
          )}
      </div>
    );
  }
}

export default DashBoardDietaEspecial;
