import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { CODAE, DRE } from "../../configs/constants";
import { TAMANHO_RF } from "../../constants/shared";
import { stringSeparadaPorVirgulas, getError } from "../../helpers/utilities";
import { meusDados } from "../../services/perfil.service";
import { getDadosUsuarioEOL } from "../../services/permissoes.service";
import { Botao } from "../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../Shareable/Botao/constants";
import InputText from "../Shareable/Input/InputText";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import "./style.scss";

class Permissoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minhaInstituicao: null,
      perfisEOL: null,
      registroFuncional: null,
      equipeAdministradora: [],
      bloquearBotao: false,
      ativos: []
    };
    this.permitir = this.permitir.bind(this);
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({ minhaInstituicao: response.vinculo_atual.instituicao });
      this.setEquipeAdministradora();
    });
  }

  async setEquipeAdministradora() {
    const { minhaInstituicao } = this.state;
    const { getEquipeAdministradora } = this.props;
    const equipeAdministradora = await getEquipeAdministradora(
      minhaInstituicao.uuid
    );
    this.setState({
      equipeAdministradora: equipeAdministradora.data
    });
  }

  filterList(registroFuncional) {
    if (registroFuncional.length === TAMANHO_RF) {
      getDadosUsuarioEOL(registroFuncional)
        .then(response => {
          if (response.status === HTTP_STATUS.OK) {
            this.setState({
              registroFuncional,
              perfisEOL: response.data.detail
            });
          } else {
            toastError("Erro ao obter dados do funcionário");
          }
        })
        .catch(error => {
          if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
            toastError(`${error.response.data.detail}`);
          } else {
            toastError("Erro ao obter dados do funcionário");
          }
        });
    } else {
      this.setState({
        registroFuncional: null,
        perfisEOL: null
      });
    }
  }

  permitir() {
    const { minhaInstituicao, perfisEOL, registroFuncional } = this.state;
    const { criarEquipeAdministradora, visao } = this.props;
    let mesmaInstituicao = false;
    for (let perfilEOL of perfisEOL) {
      if (
        minhaInstituicao.nome.includes(perfilEOL.divisao) ||
        perfilEOL.divisao.includes(minhaInstituicao.nome)
      ) {
        mesmaInstituicao = true;
        break;
      }
    }
    if (visao === CODAE || visao === DRE || mesmaInstituicao) {
      this.setState({ bloquearBotao: true });
      criarEquipeAdministradora(minhaInstituicao.uuid, registroFuncional)
        .then(response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Permissão realizada com sucesso");
            this.setEquipeAdministradora();
            this.props.change("registro_funcional", "");
            this.setState({ perfisEOL: null, bloquearBotao: false });
          } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
            this.setState({ perfisEOL: null, bloquearBotao: false });
            toastError(getError(response.data));
          } else if (response.status === HTTP_STATUS.FORBIDDEN) {
            this.setState({ perfisEOL: null, bloquearBotao: false });
            toastError("Você não tem permissão para essa ação");
          } else {
            this.setState({ perfisEOL: null, bloquearBotao: false });
            toastError(getError(response.data));
          }
        })
        .catch(error => {
          this.setState({ perfisEOL: null, bloquearBotao: false });
          toastError(`Erro ao permitir usuário ${getError(error.data)}`);
        });
    } else {
      toastError(
        `Usuário pertence a(s) instituição(ões) ${stringSeparadaPorVirgulas(
          perfisEOL,
          "divisao"
        )}`
      );
    }
  }

  excluir(permissaoUuid) {
    const { finalizarVinculo } = this.props;
    if (window.confirm("Deseja realmente finalizar essa permissão?")) {
      const { minhaInstituicao } = this.state;
      finalizarVinculo(minhaInstituicao.uuid, permissaoUuid).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Vínculo finalizado com sucesso!");
          this.setEquipeAdministradora();
        }
      });
    }
  }

  render() {
    const {
      equipeAdministradora,
      perfisEOL,
      registroFuncional,
      bloquearBotao,
      ativos
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="permissions">
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <div className="card">
            <div className="card-body">
              <h2>Atribuição de Perfil: Individual</h2>
              <div className="row">
                <div className="col-6 pt-3">
                  <Field
                    component={InputText}
                    name="registro_funcional"
                    type="number"
                    placeholder="Pesquisar Código RF"
                    onChange={event => this.filterList(event.target.value)}
                    className="form-control"
                    icone={`${BUTTON_ICON.SEARCH} fa-lg`}
                  />
                </div>
              </div>
              {perfisEOL && perfisEOL.length > 0 && (
                <div className="row search-result">
                  <div className="col-2 align-self-center">
                    <p className="rf">{registroFuncional}</p>
                  </div>
                  <div className="col-3 align-self-center">
                    <p>{perfisEOL[0].nm_pessoa}</p>
                  </div>
                  <div className="col-5 align-self-center">
                    <p>{stringSeparadaPorVirgulas(perfisEOL, "divisao")}</p>
                  </div>
                  <div className="col-2 align-self-center">
                    <Botao
                      texto="Permitir"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      type={BUTTON_TYPE.BUTTON}
                      onClick={this.permitir}
                      disabled={bloquearBotao}
                    />
                  </div>
                </div>
              )}
              <div className="table-users">
                <div className="row titles">
                  <div className="col-2">Código RF</div>
                  <div className="col-5">Nome</div>
                  <div className="col-3">Cargo</div>
                </div>
                {equipeAdministradora.length > 0 &&
                  equipeAdministradora.map((vinculo, key) => {
                    const icone =
                      ativos && ativos.includes(vinculo.uuid)
                        ? "chevron-up"
                        : "chevron-down";
                    return (
                      <div key={key} className="row values">
                        <div className="col-2">
                          {vinculo.usuario.registro_funcional}
                        </div>
                        <div className="col-5">{vinculo.usuario.nome}</div>
                        <div className="col-3">{vinculo.usuario.cargo}</div>
                        <div className="col-1">
                          <i
                            className={`fas fa-${icone}`}
                            onClick={() => {
                              ativos && ativos.includes(vinculo.uuid)
                                ? this.setState({
                                    ativos: ativos.filter(
                                      el => el !== vinculo.uuid
                                    )
                                  })
                                : this.setState({
                                    ativos: ativos
                                      ? [...ativos, vinculo.uuid]
                                      : [vinculo.uuid]
                                  });
                            }}
                          />
                        </div>
                        <div className="col-1 trash">
                          <i
                            onClick={() => this.excluir(vinculo.uuid)}
                            className="fas fa-trash"
                          />
                        </div>
                        {ativos && ativos.includes(vinculo.uuid) && (
                          <>
                            <div className="col-2">
                              <div className="text-muted">CPF</div>
                              <div>{vinculo.usuario.cpf}</div>
                            </div>
                            <div className="col-4">
                              <div className="text-muted">E-mail</div>
                              <div>{vinculo.usuario.email}</div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                {equipeAdministradora.length === 0 && (
                  <div className="text-center mt-5">
                    Não existem usuários autorizados.
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const PermissoesForm = reduxForm({
  form: "permissoes",
  enableReinitialize: true
})(Permissoes);

export default PermissoesForm;
