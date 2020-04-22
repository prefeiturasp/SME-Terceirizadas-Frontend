import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ESCOLA, CODAE } from "../../../../configs/constants";
import { statusEnum } from "../../../../constants";
import {
  getDietaEspecial,
  getDietasEspeciaisVigentesDeUmAluno,
} from "../../../../services/dietaEspecial.service";
import { getProtocoloDietaEspecial } from "../../../../services/relatorios";

import Botao from "../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../Shareable/Botao/constants";

import { formatarSolicitacoesVigentes } from "../Escola/helper";

import CorpoRelatorio from "./componentes/CorpoRelatorio";
import EscolaCancelaDietaEspecial from "./componentes/EscolaCancelaDietaEspecial"
import FormAutorizaDietaEspecial from "./componentes/FormAutorizaDietaEspecial"

import "./style.scss";

const BotaoGerarRelatorio = ({uuid}) => {
  return (
    <div className="form-group row float-right mt-4">
      <Link
        to="route"
        target="_blank"
        onClick={event => {
          event.preventDefault();
          window.open(
            getProtocoloDietaEspecial(uuid)
          );
        }}
      >
        <Botao
          texto="Gerar Protocolo"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          icon={BUTTON_ICON.PRINT}
          className="ml-3"
        />
      </Link>
    </div>
  )
}

export default class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaEspecial: null,
      solicitacoesVigentes: null,
      uuid: null,
    };
    this.loadSolicitacao = this.loadSolicitacao.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      this.loadSolicitacao(uuid);
    }
  }

  loadSolicitacao(uuid) {
    getDietaEspecial(uuid).then(responseDietaEspecial => {
      getDietasEspeciaisVigentesDeUmAluno(
        responseDietaEspecial.data.aluno.codigo_eol
      ).then(responseDietasVigentes => {
        this.setState({
          solicitacoesVigentes: formatarSolicitacoesVigentes(
            responseDietasVigentes.data.results.filter(
              solicitacaoVigente => solicitacaoVigente.uuid !== uuid
            )
          ),
          dietaEspecial: responseDietaEspecial.data,
          uuid
        });
      });
    });
  }

  render() {
    const {
      dietaEspecial,
      uuid,
      solicitacoesVigentes,
    } = this.state;
    const { visao } = this.props;
    if (!dietaEspecial) {
      return <div>Carregando...</div>
    }
    return (
      <>
        <span className="page-title">{`Dieta Especial - Solicitação # ${
          dietaEspecial.id_externo
        }`}</span>
        <div className="card mt-3">
          <div className="card-body">
            <CorpoRelatorio
              uuid={uuid}
              solicitacoesVigentes={solicitacoesVigentes}
              dietaEspecial={dietaEspecial}
            />
            {dietaEspecial.status_solicitacao === statusEnum.CODAE_A_AUTORIZAR && visao === ESCOLA &&
              <EscolaCancelaDietaEspecial
                uuid={dietaEspecial.uuid}
                onCancelar={() => this.loadSolicitacao(uuid)}
              />}
            {dietaEspecial.status_solicitacao === statusEnum.CODAE_A_AUTORIZAR && visao === CODAE && <FormAutorizaDietaEspecial dietaEspecial={dietaEspecial}/>}
            {dietaEspecial.status_solicitacao ===
              statusEnum.CODAE_AUTORIZADO && <BotaoGerarRelatorio uuid={dietaEspecial.uuid}/>}
          </div>
        </div>
      </>
    );
  }
}