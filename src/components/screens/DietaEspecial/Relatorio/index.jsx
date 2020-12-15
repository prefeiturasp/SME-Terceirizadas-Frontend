import React, { Component } from "react";

import { ESCOLA, CODAE } from "../../../../configs/constants";
import { statusEnum } from "constants/shared";
import {
  getDietaEspecial,
  escolaCancelaSolicitacao
} from "../../../../services/dietaEspecial.service";
import { getProtocoloDietaEspecial } from "../../../../services/relatorios";

import { toastSuccess } from "components/Shareable/Toast/dialogs";
import "antd/dist/antd.css";
import { Spin } from "antd";

import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";

import CorpoRelatorio from "./componentes/CorpoRelatorio";
import EscolaCancelaDietaEspecial from "./componentes/EscolaCancelaDietaEspecial";
import FormAutorizaDietaEspecial from "./componentes/FormAutorizaDietaEspecial";
import ModalNegaDietaEspecial from "./componentes/ModalNegaDietaEspecial";

import "./style.scss";
import { cabecalhoDieta } from "./helpers";

const BotaoGerarRelatorio = ({ uuid }) => {
  return (
    <div className="form-group row float-right mt-4">
      <Botao
        texto="Gerar Protocolo"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.BLUE_OUTLINE}
        icon={BUTTON_ICON.PRINT}
        className="ml-3"
        onClick={() => {
          getProtocoloDietaEspecial(uuid);
        }}
      />
    </div>
  );
};

const BotaoAutorizaCancelamento = ({ uuid, onAutorizar, setCarregando }) => {
  return (
    <div className="form-group row float-right mt-4">
      <Botao
        texto="Autorizar Inativação"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN}
        className="ml-3"
        onClick={() => {
          setCarregando(true);
          escolaCancelaSolicitacao(uuid).then(() => {
            onAutorizar();
            toastSuccess("Autorização do Cancelamento realizada com sucesso!");
          });
        }}
      />
    </div>
  );
};

export default class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: null,
      solicitacoesVigentes: null,
      uuid: null,
      carregando: false
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      this.loadSolicitacao(uuid);
    }
  }

  showNaoAprovaModal = () => {
    this.setState({ showNaoAprovaModal: true });
  };

  closeNaoAprovaModal = () => {
    this.setState({ showNaoAprovaModal: false });
    toastSuccess("Inativação realizada com sucesso.");
    window.location.reload();
  };

  loadSolicitacao = uuid => {
    this.setCarregando(true);
    getDietaEspecial(uuid).then(responseDietaEspecial => {
      this.setState({
        dietaEspecial: responseDietaEspecial.data
      });
      this.setCarregando(false);
    });
  };

  setTemSolicitacaoCadastroProduto = () => {
    this.setState({
      dietaEspecial: {
        ...this.state.dietaEspecial,
        tem_solicitacao_cadastro_produto: true
      }
    });
  };

  setCarregando = carregando => {
    this.setState({ carregando: carregando });
  };

  render() {
    const {
      dietaEspecial,
      showNaoAprovaModal,
      solicitacoesVigentes,
      carregando
    } = this.state;
    const { visao } = this.props;
    if (!dietaEspecial) {
      return <div>Carregando...</div>;
    }

    return (
      <Spin tip="Carregando..." spinning={carregando}>
        <span className="page-title">{cabecalhoDieta(dietaEspecial)}</span>
        <div className="card mt-3">
          <div className="card-body">
            <CorpoRelatorio
              uuid={dietaEspecial.uuid}
              solicitacoesVigentes={solicitacoesVigentes}
              dietaEspecial={dietaEspecial}
            />
            {dietaEspecial.status_solicitacao ===
              statusEnum.CODAE_A_AUTORIZAR &&
              visao === ESCOLA && (
                <EscolaCancelaDietaEspecial
                  uuid={dietaEspecial.uuid}
                  onCancelar={() => this.loadSolicitacao(dietaEspecial.uuid)}
                />
              )}
            {dietaEspecial.status_solicitacao ===
              statusEnum.CODAE_A_AUTORIZAR &&
              visao === CODAE && (
                <FormAutorizaDietaEspecial
                  dietaEspecial={dietaEspecial}
                  onAutorizarOuNegar={() =>
                    this.loadSolicitacao(dietaEspecial.uuid)
                  }
                  setTemSolicitacaoCadastroProduto={
                    this.setTemSolicitacaoCadastroProduto
                  }
                />
              )}
            {dietaEspecial.status_solicitacao ===
              statusEnum.ESCOLA_SOLICITOU_INATIVACAO &&
              visao === CODAE && (
                <BotaoAutorizaCancelamento
                  uuid={dietaEspecial.uuid}
                  showNaoAprovaModal={this.showNaoAprovaModal}
                  onAutorizar={() => {
                    this.loadSolicitacao(dietaEspecial.uuid);
                  }}
                  setCarregando={this.setCarregando}
                />
              )}
            {dietaEspecial.status_solicitacao ===
              statusEnum.CODAE_AUTORIZADO && (
              <BotaoGerarRelatorio uuid={dietaEspecial.uuid} />
            )}
          </div>
        </div>
        <ModalNegaDietaEspecial
          showModal={showNaoAprovaModal}
          closeModal={this.closeNaoAprovaModal}
          onNegar={this.props.onAutorizarOuNegar}
          uuid={dietaEspecial.uuid}
        />
      </Spin>
    );
  }
}
