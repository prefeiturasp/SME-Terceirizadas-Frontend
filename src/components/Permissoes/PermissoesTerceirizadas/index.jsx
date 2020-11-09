import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { formatarCPFouCNPJ, getError } from "../../../helpers/utilities";
import { meusDados } from "../../../services/perfil.service";
import { Botao } from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import InputText from "../../Shareable/Input/InputText";
import { toastError, toastSuccess } from "../../Shareable/Toast/dialogs";
import "../style.scss";
import { required } from "../../../helpers/fieldValidators";
import { validarValores } from "./validar";

class PermissoesTerceirizadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minhaInstituicao: null,
      equipeAdministradora: [],
      bloquearBotao: false
    };
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

  onSubmit(values) {
    const { minhaInstituicao } = this.state;
    const erro = validarValores(values);
    if (erro) {
      toastError(erro);
    } else {
      this.props
        .criarEquipeAdministradora(minhaInstituicao.uuid, values)
        .then(response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Vínculo cadastrado com sucesso!");
            ["nome", "cpf", "email"].forEach(campo => {
              this.props.change(campo, null);
            });
            this.setEquipeAdministradora();
          } else {
            toastError(getError(response.data));
          }
        });
    }
  }

  render() {
    const { equipeAdministradora, bloquearBotao } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="permissions">
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <div className="card">
            <div className="card-body">
              <h2>Atribuição de Perfil: Individual</h2>
              <div className="row">
                <div className="col-4 pt-3">
                  <Field
                    component={InputText}
                    name="nome"
                    type="text"
                    placeholder="Nome Completo"
                    required
                    validate={required}
                  />
                </div>
                <div className="col-2 pt-3">
                  <Field
                    component={InputText}
                    name="cpf"
                    type="text"
                    placeholder="CPF"
                    helpText="Somente números"
                    pattern="\d*"
                    maxlength="11"
                    required
                    validate={required}
                  />
                </div>
                <div className="col-4 pt-3">
                  <Field
                    component={InputText}
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    validate={required}
                  />
                </div>
                <div className="col-2 pt-3">
                  <Botao
                    texto="Enviar"
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    type={BUTTON_TYPE.SUBMIT}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values
                      })
                    )}
                    disabled={bloquearBotao}
                  />
                </div>
              </div>
              <div className="table-users">
                <div className="row titles">
                  <div className="col-3">Nome</div>
                  <div className="col-3">CPF</div>
                  <div className="col-6">E-mail</div>
                </div>
                {equipeAdministradora.length > 0 &&
                  equipeAdministradora.map((vinculo, key) => {
                    return (
                      <div key={key} className="row values">
                        <div className="col-3">{vinculo.usuario.nome}</div>
                        <div className="col-3">
                          {vinculo.usuario.cpf &&
                            formatarCPFouCNPJ(vinculo.usuario.cpf)}
                        </div>
                        <div className="col-5">{vinculo.usuario.email}</div>
                        <div className="col-1 trash">
                          <i
                            onClick={() => this.excluir(vinculo.uuid)}
                            className="fas fa-trash"
                          />
                        </div>
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

const PermissoesTerceirizadasForm = reduxForm({
  form: "permissoesTerceirizadas",
  enableReinitialize: true
})(PermissoesTerceirizadas);

export default PermissoesTerceirizadasForm;
