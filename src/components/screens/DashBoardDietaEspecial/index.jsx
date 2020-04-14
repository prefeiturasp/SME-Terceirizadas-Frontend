import React, { Component } from "react";
import { meusDados } from "../../../services/perfil.service";
import {
  CardStatusDeSolicitacao,
  CARD_TYPE_ENUM,
  ICON_CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardBody from "../../Shareable/CardBody";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardAtalho from "../../Shareable/CardAtalho";
import { dataAtual } from "../../../helpers/utilities";

import { ajustaFormatoLogPainelDietaEspecial } from "../helper";

const TEXTO_ATALHO_DIETA = `Quando houver necessidade de incluir Dieta Especial para os alunos matriculados na unidade.`;

class DashBoardDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasListFiltered: null,
      pendentesListFiltered: null,
      negadasListFiltered: null,
      canceladasListFiltered: null,
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
      canceladasListFiltered,
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
            autorizadasListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.results
            )
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
            pendentesListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.results
            )
          });
        });
    }
    if (
      negadasListFiltered !== prevState.negadasListFiltered &&
      !negadasListFiltered
    ) {
      this.props.getDietaEspecialNegadas(instituicao.uuid).then(response => {
        this.setState({
          negadasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results
          )
        });
      });
    }
    if (
      canceladasListFiltered !== prevState.canceladasListFiltered &&
      !canceladasListFiltered
    ) {
      this.props.getDietaEspecialCanceladas(instituicao.uuid).then(response => {
        this.setState({
          canceladasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results
          )
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
      negadasListFiltered,
      canceladasListFiltered
    } = this.state;

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

  render() {
    const {
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      canceladasListFiltered,
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
                    solicitations={
                      pendentesListFiltered ? pendentesListFiltered : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.PENDENTE}
                    href={`/solicitacoes-dieta-especial/solicitacoes-pendentes`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizados"}
                    cardType={CARD_TYPE_ENUM.AUTORIZADO}
                    solicitations={
                      autorizadasListFiltered ? autorizadasListFiltered : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                    href={`/solicitacoes-dieta-especial/solicitacoes-autorizadas`}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Negadas"}
                    cardType={CARD_TYPE_ENUM.NEGADO}
                    solicitations={
                      negadasListFiltered ? negadasListFiltered : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.NEGADO}
                    href={`/solicitacoes-dieta-especial/solicitacoes-negadas`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={CARD_TYPE_ENUM.CANCELADO}
                    solicitations={
                      canceladasListFiltered ? canceladasListFiltered : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                    href={`/solicitacoes-dieta-especial/solicitacoes-canceladas`}
                  />
                </div>
              </div>
            </CardBody>
          )}
                  <div className="row row-shortcuts">
          <div className="col-3">
            <CardAtalho
              titulo={"Inclusão de Dieta Especial"}
              nome="card-inclusao"
              texto={TEXTO_ATALHO_DIETA}
              textoLink={"Novo pedido"}
              href={"/escola/dieta-especial"}
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default DashBoardDietaEspecial;
