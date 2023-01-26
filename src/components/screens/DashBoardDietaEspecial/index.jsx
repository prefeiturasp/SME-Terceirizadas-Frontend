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
import {
  dataAtual,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhTerceirizada
} from "../../../helpers/utilities";
import { getMeusLotes } from "services/lote.service";

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
      aguardandoVigenciaList: null,
      aguardandoVigenciaListFiltered: null,
      inativasTemporariamenteListFiltered: null,
      pendentesListFiltered: null,
      negadasListFiltered: null,
      canceladasListFiltered: null,
      inativasListFiltered: null,
      instituicao: null,
      listaLotes: null,
      dadosMeus: null,
      listaStatus: [
        { nome: "Conferência Status", uuid: "" },
        { nome: "Conferida", uuid: "1" },
        { nome: "Não Conferida", uuid: "0" }
      ],
      loadingDietas: true
    };
    this.onPesquisaChanged = this.onPesquisaChanged.bind(this);
  }

  async componentDidMount() {
    await meusDados().then(response => {
      this.setState({
        instituicao: response.vinculo_atual.instituicao,
        dadosMeus: response
      });
    });
    this.loadDietas();
    if (usuarioEhTerceirizada()) {
      await getMeusLotes().then(response => {
        this.setState({
          listaLotes: [{ nome: "Selecione um lote", uuid: "" }].concat(
            response.results
          )
        });
      });
    }
  }

  async loadDietas() {
    let { instituicao } = this.state;
    await this.props
      .getDietaEspecialAutorizadas(instituicao.uuid, true)
      .then(response => {
        this.setState({
          autorizadasList: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "autorizadas"
          ),
          autorizadasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "autorizadas"
          )
        });
      });

    await this.props
      .getDietaEspecialPendenteAutorizacao(instituicao.uuid, true)
      .then(response => {
        this.setState({
          pendentesList: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "pendentes-aut"
          ),
          pendentesListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "pendentes-aut"
          )
        });
      });

    await this.props
      .getDietaEspecialNegadas(instituicao.uuid, true)
      .then(response => {
        this.setState({
          negadasList: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "negadas"
          ),
          negadasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "negadas"
          )
        });
      });

    await this.props
      .getDietaEspecialCanceladas(instituicao.uuid, true)
      .then(response => {
        this.setState({
          canceladasList: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "canceladas"
          ),
          canceladasListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.results,
            "canceladas"
          )
        });
      });

    this.props.getDietaEspecialInativas &&
      (await this.props
        .getDietaEspecialInativas(instituicao.uuid, true)
        .then(response => {
          this.setState({
            inativasList: ajustaFormatoLogPainelDietaEspecial(
              response.data.results,
              "inativas"
            ),
            inativasListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results,
              "inativas"
            )
          });
        }));

    await this.props
      .getDietaEspecialAutorizadasTemporariamente(instituicao.uuid, true)
      .then(response => {
        this.setState({
          autorizadasTemporariamenteList: ajustaFormatoLogPainelDietaEspecial(
            response.data.results,
            "autorizadas-temp"
          ),
          autorizadasTemporariamenteListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.data.results,
            "autorizadas-temp"
          )
        });
      });

    if (
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhTerceirizada()
    ) {
      await this.props
        .getDietaEspecialAguardandoVigencia(instituicao.uuid, true)
        .then(response => {
          this.setState({
            aguardandoVigenciaList: ajustaFormatoLogPainelDietaEspecial(
              response.data.results,
              "aguardando-vigencia"
            ),
            aguardandoVigenciaListFiltered: ajustaFormatoLogPainelDietaEspecial(
              response.data.results,
              "aguardando-vigencia"
            )
          });
        });
    }

    await this.props
      .getDietaEspecialInativasTemporariamente(instituicao.uuid, true)
      .then(response => {
        this.setState({
          inativasTemporariamenteList: ajustaFormatoLogPainelDietaEspecial(
            response.data.results,
            "inativas-temp"
          ),
          inativasTemporariamenteListFiltered: ajustaFormatoLogPainelDietaEspecial(
            response.data.results,
            "inativas-temp"
          )
        });
      });

    this.setState({ loadingDietas: false });
  }

  filtrarStatus(listaFiltro, value) {
    if (value && value.length > 0) {
      if (value === "1") {
        listaFiltro = listaFiltro.filter(item => item.conferido === true);
      }
      if (value === "0") {
        listaFiltro = listaFiltro.filter(item => item.conferido === false);
      }
      return listaFiltro;
    } else {
      return listaFiltro;
    }
  }

  filtrarLote(listaFiltro, value) {
    if (value && value.length > 0) {
      listaFiltro = listaFiltro.filter(item => item.lote_uuid === value);
      return listaFiltro;
    } else {
      return listaFiltro;
    }
  }

  filtrarNome(listaFiltro, value) {
    if (value && value.length > 0) {
      listaFiltro = listaFiltro.filter(function(item) {
        const wordToFilter = slugify(value.toLowerCase());
        return (
          slugify(item.texto_inteiro.toLowerCase()).search(wordToFilter) !== -1
        );
      });
      return listaFiltro;
    } else {
      return listaFiltro;
    }
  }

  onPesquisaChanged(values) {
    if (values.titulo === undefined) values.titulo = "";
    let {
      pendentesList,
      autorizadasList,
      negadasList,
      canceladasList,
      autorizadasTemporariamenteList,
      aguardandoVigenciaList,
      inativasTemporariamenteList,
      inativasList
    } = this.state;

    let pendentesListFiltered = this.filtrarLote(pendentesList, values.lote);
    let autorizadasListFiltered = this.filtrarLote(
      autorizadasList,
      values.lote
    );
    let negadasListFiltered = this.filtrarLote(negadasList, values.lote);
    let canceladasListFiltered = this.filtrarLote(canceladasList, values.lote);
    let inativasListFiltered = this.filtrarLote(inativasList, values.lote);
    let autorizadasTemporariamenteListFiltered = this.filtrarLote(
      autorizadasTemporariamenteList,
      values.lote
    );

    let aguardandoVigenciaListFiltered = null;
    if (
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhTerceirizada()
    ) {
      aguardandoVigenciaListFiltered = this.filtrarLote(
        aguardandoVigenciaList,
        values.lote
      );
    }

    let inativasTemporariamenteListFiltered = this.filtrarLote(
      inativasTemporariamenteList,
      values.lote
    );

    autorizadasListFiltered = this.filtrarStatus(
      autorizadasListFiltered,
      values.status
    );
    canceladasListFiltered = this.filtrarStatus(
      canceladasListFiltered,
      values.status
    );

    pendentesListFiltered = this.filtrarNome(
      pendentesListFiltered,
      values.titulo
    );
    autorizadasListFiltered = this.filtrarNome(
      autorizadasListFiltered,
      values.titulo
    );
    negadasListFiltered = this.filtrarNome(negadasListFiltered, values.titulo);
    canceladasListFiltered = this.filtrarNome(
      canceladasListFiltered,
      values.titulo
    );
    inativasListFiltered = this.filtrarNome(
      inativasListFiltered,
      values.titulo
    );
    autorizadasTemporariamenteListFiltered = this.filtrarNome(
      autorizadasTemporariamenteListFiltered,
      values.titulo
    );

    if (
      usuarioEhEscolaTerceirizadaDiretor() ||
      usuarioEhEscolaTerceirizada() ||
      usuarioEhTerceirizada()
    ) {
      aguardandoVigenciaListFiltered = this.filtrarNome(
        aguardandoVigenciaListFiltered,
        values.titulo
      );
    }

    inativasTemporariamenteListFiltered = this.filtrarNome(
      inativasTemporariamenteListFiltered,
      values.titulo
    );

    this.setState({
      autorizadasListFiltered,
      pendentesListFiltered,
      negadasListFiltered,
      canceladasListFiltered,
      autorizadasTemporariamenteListFiltered,
      aguardandoVigenciaListFiltered,
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
      aguardandoVigenciaListFiltered,
      inativasTemporariamenteListFiltered,
      inativasListFiltered,
      instituicao,
      listaLotes,
      listaStatus,
      loadingDietas,
      dadosMeus
    } = this.state;

    const podeIncluirDietaEspecial =
      usuarioEhEscolaTerceirizadaDiretor() || usuarioEhEscolaTerceirizada();
    return (
      <div>
        <CardMatriculados
          meusDados={dadosMeus}
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
              listaLotes={listaLotes}
              listaStatus={listaStatus}
              loadingDietas={loadingDietas}
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
                    cardTitle={"Autorizadas"}
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
                    cardTitle={"Autorizadas Temporariamente"}
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
                {(usuarioEhEscolaTerceirizadaDiretor() ||
                  usuarioEhEscolaTerceirizada() ||
                  usuarioEhTerceirizada()) && (
                  <div className="col-6">
                    <CardStatusDeSolicitacao
                      cardTitle={"Aguardando início da vigência"}
                      cardType={CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
                      solicitations={
                        aguardandoVigenciaListFiltered
                          ? aguardandoVigenciaListFiltered
                          : []
                      }
                      icon={ICON_CARD_TYPE_ENUM.AGUARDANDO_ANALISE_RECLAMACAO}
                      href={`/solicitacoes-dieta-especial/solicitacoes-aguardando-inicio-vigencia`}
                    />
                  </div>
                )}
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
