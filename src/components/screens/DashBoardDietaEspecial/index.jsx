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
import { dataAtual, usuarioEhEscola } from "../../../helpers/utilities";

import { ajustaFormatoLogPainelDietaEspecial } from "../helper";

const TEXTO_ATALHO_DIETA = `Quando houver necessidade de incluir Dieta Especial para os alunos matriculados na unidade.`;

class DashBoardDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasListFiltered: null,
      autorizadasTemporariamenteListFiltered: null,
      inativasTemporariamenteListFiltered: null,
      pendentesListFiltered: null,
      negadasListFiltered: null,
      canceladasListFiltered: null,
      inativasListFiltered: null,
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
      inativasListFiltered,
      autorizadasTemporariamenteListFiltered,
      inativasTemporariamenteListFiltered,
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
    if (
      inativasListFiltered !== prevState.inativasListFiltered &&
      !inativasListFiltered
    ) {
      this.props.getDietaEspecialInativas &&
        this.props.getDietaEspecialInativas(instituicao.uuid).then(response => {
          this.setState({
            inativasListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            )
          });
        });
    }

    if (
      autorizadasTemporariamenteListFiltered !==
        prevState.autorizadasTemporariamenteListFiltered &&
      !autorizadasTemporariamenteListFiltered
    ) {
      this.props
        .getDietaEspecialAutorizadasTemporariamente(instituicao.uuid)
        .then(response => {
          this.setState({
            autorizadasTemporariamenteListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            )
          });
        });
    }
    if (
      inativasTemporariamenteListFiltered !==
        prevState.inativasTemporariamenteListFiltered &&
      !inativasTemporariamenteListFiltered
    ) {
      this.props
        .getDietaEspecialInativasTemporariamente(instituicao.uuid)
        .then(response => {
          this.setState({
            inativasTemporariamenteListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
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
      canceladasListFiltered,
      autorizadasTemporariamenteListFiltered,
      inativasTemporariamenteListFiltered,
      inativasListFiltered
    } = this.state;

    pendentesListFiltered = this.filtrarNome(pendentesListFiltered, event);
    autorizadasListFiltered = this.filtrarNome(autorizadasListFiltered, event);
    negadasListFiltered = this.filtrarNome(negadasListFiltered, event);
    canceladasListFiltered = this.filtrarNome(canceladasListFiltered, event);
    inativasListFiltered = this.filtrarNome(inativasListFiltered, event);
    autorizadasTemporariamenteListFiltered = this.filtrarNome(
      autorizadasTemporariamenteListFiltered,
      event
    );
    inativasTemporariamenteListFiltered = this.filtrarNome(
      inativasTemporariamenteListFiltered,
      event
    );

    this.setState({
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      canceladasListFiltered,
      autorizadasTemporariamenteListFiltered,
      inativasTemporariamenteListFiltered,
      inativasListFiltered
    });
  }

  render() {
    const {
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      canceladasListFiltered,
      autorizadasTemporariamenteListFiltered,
      inativasTemporariamenteListFiltered,
      inativasListFiltered,
      instituicao
    } = this.state;

    const podeIncluirDietaEspecial = usuarioEhEscola();
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
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Inativas"}
                    cardType={CARD_TYPE_ENUM.CANCELADO}
                    solicitations={
                      inativasListFiltered ? inativasListFiltered : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.CANCELADO}
                    href={`/solicitacoes-dieta-especial/solicitacoes-inativas`}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizados Temporariamente"}
                    cardType={CARD_TYPE_ENUM.AUTORIZADO}
                    solicitations={
                      autorizadasTemporariamenteListFiltered
                        ? autorizadasTemporariamenteListFiltered
                        : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.AUTORIZADO}
                    href={`/solicitacoes-dieta-especial/solicitacoes-autorizadas-temporariamente`}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Inativas Temporariamente"}
                    cardType={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
                    solicitations={
                      inativasTemporariamenteListFiltered
                        ? inativasTemporariamenteListFiltered
                        : []
                    }
                    icon={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
                    href={`/solicitacoes-dieta-especial/solicitacoes-inativas-temporariamente`}
                  />
                </div>
              </div>
            </CardBody>
          )}
        {podeIncluirDietaEspecial && (
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
            <div className="col-3">
              <CardAtalho
                titulo={"Alterar U.E da Dieta Especial"}
                nome="card-inclusao"
                texto={`Quando houver necessidade de alteração de unidade escolar
                        do aluno para os programas Polo e Recreio nas Férias.`}
                textoLink={"Alterar U.E"}
                href={"/escola/dieta-especial-alteracao-ue"}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DashBoardDietaEspecial;
