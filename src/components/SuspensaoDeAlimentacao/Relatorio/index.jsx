import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import {
  SUSPENSAO_ALIMENTACAO,
  TERCEIRIZADA
} from "../../../configs/constants";
import { statusEnum } from "../../../constants";
import { usuarioTerceirizada } from "../../../helpers/utilities";
import {
  getSuspensaoDeAlimentacaoUUID,
  terceirizadaTomaCienciaSuspensaoDeAlimentacao
} from "../../../services/suspensaoDeAlimentacao.service";
import Botao from "../../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../Shareable/Botao/constants";
import { toastError, toastSuccess } from "../../Shareable/Toast/dialogs";
import { CorpoRelatorio } from "./componentes/CorpoRelatorio";
import "./style.scss";

class RelatorioSuspensaoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      suspensaoAlimentacao: null,
      dadosEscola: null,
      redirect: false
    };
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderizarRedirecionamentoParaSuspensoesDeAlimentacao = () => {
    if (this.state.redirect) {
      return <Redirect to={`/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`} />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getSuspensaoDeAlimentacaoUUID(uuid).then(response => {
        let suspensaoAlimentacao = response.data;
        let dadosEscola = suspensaoAlimentacao.escola;
        this.setState({
          suspensaoAlimentacao,
          dadosEscola,
          uuid
        });
      });
    }
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    terceirizadaTomaCienciaSuspensaoDeAlimentacao(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Ciência de suspensão de alimentação avisada com sucesso!"
          );
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Erro ao tomar ciência de suspensão de alimentação");
        }
      },
      function() {
        toastError("Erro ao tomar ciência de suspensão de alimentação");
      }
    );
  }

  render() {
    const { suspensaoAlimentacao, dadosEscola } = this.state;
    return (
      <div className="report">
        {this.renderizarRedirecionamentoParaSuspensoesDeAlimentacao()}
        {!suspensaoAlimentacao ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Suspensão de Alimentação - Solicitação # ${
              suspensaoAlimentacao.id_externo
            }`}</span>
            <Link to={`/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`}>
              <Botao
                texto="voltar"
                type={BUTTON_TYPE.BUTTON}
                titulo="voltar"
                style={BUTTON_STYLE.BLUE}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="float-right"
              />
            </Link>
            <div className="card mt-3">
              <div className="card-body">
                <CorpoRelatorio
                  suspensaoAlimentacao={suspensaoAlimentacao}
                  dadosEscola={dadosEscola}
                />
                {suspensaoAlimentacao.status === statusEnum.INFORMADO &&
                  usuarioTerceirizada() && (
                    <div className="form-group row float-right mt-4">
                      <Botao
                        texto="Ciente"
                        type={BUTTON_TYPE.SUBMIT}
                        onClick={() => this.handleSubmit()}
                        style={BUTTON_STYLE.GREEN}
                        className="ml-3"
                      />
                    </div>
                  )}
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const RelatorioForm = reduxForm({
  form: "suspensaoALimentacaoForm",
  enableReinitialize: true
})(RelatorioSuspensaoAlimentacao);
export default RelatorioForm;
