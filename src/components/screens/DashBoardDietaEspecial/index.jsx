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

import { ajustaFormatoLogPainelDietaEspecial, slugify } from "../helper";
import { getNomeCardAguardandoAutorizacao } from "helpers/dietaEspecial";

const TEXTO_ATALHO_DIETA = `Quando houver necessidade de incluir Dieta Especial para os alunos matriculados na unidade.`;

class DashBoardDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autorizadasList: null,
      autorizadasTemporariamenteList: null,
      inativasTemporariamenteList: null,
      pendentesList: null,
      negadasList: null,
      canceladasList: null,
      inativasList: null,
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
      autorizadasList,
      pendentesList,
      negadasList,
      canceladasList,
      inativasList,
      autorizadasTemporariamenteList,
      inativasTemporariamenteList,
      instituicao
    } = this.state;

    if (autorizadasList !== prevState.autorizadasList && !autorizadasList) {
      this.props
        .getDietaEspecialAutorizadas(instituicao.uuid)
        .then(response => {
          this.setState({
            autorizadasList: ajustaFormatoLogPainelDietaEspecial(
              response.results
            ),
            autorizadasListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.results
            )
          });
        });
    }
    if (pendentesList !== prevState.pendentesList && !pendentesList) {
      this.props
        .getDietaEspecialPendenteAutorizacao(instituicao.uuid)
        .then(response => {
          this.setState({
            pendentesList: ajustaFormatoLogPainelDietaEspecial(
              response.results
            ),
            pendentesListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.results
            )
          });
        });
    }
    if (negadasList !== prevState.negadasList && !negadasList) {
      this.props.getDietaEspecialNegadas(instituicao.uuid).then(response => {
        this.setState({
          negadasList: ajustaFormatoLogPainelDietaEspecial(response.results),
          negadasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results
          )
        });
      });
    }
    if (canceladasList !== prevState.canceladasList && !canceladasList) {
      this.props.getDietaEspecialCanceladas(instituicao.uuid).then(response => {
        this.setState({
          canceladasList: ajustaFormatoLogPainelDietaEspecial(response.results),
          canceladasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results
          )
        });
      });
    }
    if (inativasList !== prevState.inativasList && !inativasList) {
      this.props.getDietaEspecialInativas &&
        this.props.getDietaEspecialInativas(instituicao.uuid).then(response => {
          this.setState({
            inativasList: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            ),
            inativasListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            )
          });
        });
    }

    if (
      autorizadasTemporariamenteList !==
        prevState.autorizadasTemporariamenteList &&
      !autorizadasTemporariamenteList
    ) {
      this.props
        .getDietaEspecialAutorizadasTemporariamente(instituicao.uuid)
        .then(response => {
          this.setState({
            autorizadasTemporariamenteList: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            ),
            autorizadasTemporariamenteListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            )
          });
        });
    }
    if (
      inativasTemporariamenteList !== prevState.inativasTemporariamenteList &&
      !inativasTemporariamenteList
    ) {
      this.props
        .getDietaEspecialInativasTemporariamente(instituicao.uuid)
        .then(response => {
          this.setState({
            inativasTemporariamenteList: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            ),
            inativasTemporariamenteListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results
            )
          });
        });
    }
  }

  filtrarNome(listaFiltro, event) {
    listaFiltro = listaFiltro.filter(function(item) {
      const wordToFilter = slugify(event.target.value.toLowerCase());
      return slugify(item.text.toLowerCase()).search(wordToFilter) !== -1;
    });
    return listaFiltro;
  }

  onPesquisaChanged(event) {
    if (event === undefined) event = { target: { value: "" } };
    let {
      pendentesList,
      autorizadasList,
      negadasList,
      canceladasList,
      autorizadasTemporariamenteList,
      inativasTemporariamenteList,
      inativasList
    } = this.state;

    let pendentesListFiltered = this.filtrarNome(pendentesList, event);
    let autorizadasListFiltered = this.filtrarNome(autorizadasList, event);
    let negadasListFiltered = this.filtrarNome(negadasList, event);
    let canceladasListFiltered = this.filtrarNome(canceladasList, event);
    let inativasListFiltered = this.filtrarNome(inativasList, event);
    let autorizadasTemporariamenteListFiltered = this.filtrarNome(
      autorizadasTemporariamenteList,
      event
    );
    let inativasTemporariamenteListFiltered = this.filtrarNome(
      inativasTemporariamenteList,
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
                    cardTitle={getNomeCardAguardandoAutorizacao()}
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
            <div className="col-3">
              <CardAtalho
                titulo={"Cancelar Dieta Especial"}
                nome="card-cancelar"
                texto={`Quando houver necessidade de cancelamento de dieta devido a existência de laudo de alta.`}
                textoLink={"Cancelar Dieta"}
                href={"/dieta-especial/cancelamento"}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DashBoardDietaEspecial;
