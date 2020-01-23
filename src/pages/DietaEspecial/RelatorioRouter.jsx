import React, { Component } from "react";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";
import { statusEnum, TIPO_PERFIL } from "../../constants";

import Botao from "../../components/Shareable/Botao";
import { BUTTON_STYLE } from "../../components/Shareable/Botao/constants";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import {
  toastSuccess,
  toastError
} from "../../components/Shareable/Toast/dialogs";

import VisualizarPage from "./Relatorio";
import EditarPage from "./EditarPage";

import { getSolicitacaoDietaEspecial } from "../../services/painelNutricionista.service";
import {
  terceirizadaTomaCienciaDietaEspecial,
  CODAEAutorizaDietaEspecial
} from "../../services/dietaEspecial.service";

const BotaoCiencia = props => (
  <div className="row">
    <div className="col-12">
      <Botao
        style={BUTTON_STYLE.GREEN}
        texto="Ciente"
        className="float-right"
        {...props}
      />
    </div>
  </div>
);

export default class RelatorioRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: undefined,
      fetching: false
    };
    this.onTerceirizadaTomarCiencia = this.onTerceirizadaTomarCiencia.bind(
      this
    );
    this.onAutorizaSolicitacao = this.onAutorizaSolicitacao.bind(this);
  }
  atual = {
    href: "#",
    titulo: "Relatório"
  };
  anteriores = [
    {
      href: `/${constants.RELATORIOS}`,
      titulo: "Dietas Especiais"
    }
  ];

  onAutorizaSolicitacao = async formData => {
    const uuid = this.state.dietaEspecial.uuid;
    const {
      classificacaoDieta,
      diagnosticosSelecionados,
      identificacaoNutricionista,
      protocolos
    } = formData;
    let diagnosticos = diagnosticosSelecionados.filter(d => d !== "");
    const resposta = await CODAEAutorizaDietaEspecial({
      uuid,
      classificacaoDieta,
      diagnosticosSelecionados: diagnosticos,
      identificacaoNutricionista,
      protocolos
    });
    if (resposta.status === 200) {
      toastSuccess(resposta.data.mensagem);
      this.updateDietaEspecial(uuid);
    } else {
      this.setState({
        fetching: false
      });
      toastError(`Erro ao autorizar solicitação: ${resposta}`);
    }
  };

  onModificaSolicitacao = async () => {
    this.updateDietaEspecial(this.state.dietaEspecial.uuid);
  };

  onTerceirizadaTomarCiencia = async () => {
    const uuid = this.state.dietaEspecial.uuid;
    this.setState({
      fetching: true
    });
    const resposta = await terceirizadaTomaCienciaDietaEspecial(uuid);
    if (resposta.status === 200) {
      toastSuccess(resposta.data.mensagem);
      this.updateDietaEspecial(uuid);
    } else {
      this.setState({
        fetching: false
      });
      toastError(`Erro ao tomar ciência: ${resposta}`);
    }
  };

  updateDietaEspecial = async uuid => {
    this.setState({
      fetching: false
    });
    const dietaEspecial = await getSolicitacaoDietaEspecial(uuid);
    this.setState({
      dietaEspecial: dietaEspecial.results,
      fetching: false
    });
  };

  componentWillMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      this.updateDietaEspecial(uuid);
    }
  }

  render() {
    const { dietaEspecial, fetching } = this.state;
    let page;
    if (dietaEspecial) {
      let botoes;
      const tipoPerfil = localStorage.getItem("tipo_perfil");
      const statusSolicitacao = dietaEspecial.status_solicitacao;
      if (
        tipoPerfil === TIPO_PERFIL.DIETA_ESPECIAL &&
        statusSolicitacao === statusEnum.CODAE_A_AUTORIZAR
      ) {
        page = (
          <EditarPage
            dietaEspecial={dietaEspecial}
            onModificaSolicitacao={this.onModificaSolicitacao}
            {...this.props}
          />
        );
      } else {
        if (
          tipoPerfil === TIPO_PERFIL.TERCEIRIZADA &&
          statusSolicitacao === statusEnum.CODAE_AUTORIZADO
        ) {
          botoes = (
            <BotaoCiencia
              onClick={this.onTerceirizadaTomarCiencia}
              disabled={fetching}
            />
          );
        }
        page = (
          <VisualizarPage
            dietaEspecial={dietaEspecial}
            botoes={botoes}
            {...this.props}
          />
        );
      }
    } else {
      page = <div>Carregando...</div>;
    }

    return (
      <Page>
        <Breadcrumb
          home={HOME}
          anteriores={this.anteriores}
          atual={this.atual}
        />
        {page}
      </Page>
    );
  }
}
