import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import InputText from "../Shareable/Input/InputText";
import "./style.scss";
import { Botao } from "../Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../Shareable/Botao/constants";
import {
  getDadosUsuarioEOL,
  criarEquipeAdministradoraEscola
} from "../../services/permissoes.service";
import { meusDados } from "../../services/perfil.service";
import { toastError } from "../Shareable/Toast/dialogs";

class Permissoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minhaInstituicao: null,
      perfilEOL: null,
      registroFuncional: null
    };
    this.permitir = this.permitir.bind(this);
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({ minhaInstituicao: response.vinculo_atual.instituicao });
    });
  }

  filterList(registroFuncional) {
    if (registroFuncional.length === 7) {
      getDadosUsuarioEOL(registroFuncional).then(response => {
        this.setState({ registroFuncional, perfilEOL: response.data[0] });
      });
    } else {
      this.setState({
        registroFuncional: null,
        perfilEOL: null
      });
    }
  }

  permitir() {
    const { minhaInstituicao, perfilEOL, registroFuncional } = this.state;
    if (minhaInstituicao.nome.includes(perfilEOL.divisao)) {
      criarEquipeAdministradoraEscola(
        minhaInstituicao.uuid,
        registroFuncional
      ).then(response => {
        console.log(response);
      });
    } else {
      toastError(`Usuário pertence a instituição ${perfilEOL.divisao}`);
    }
  }

  render() {
    const { perfilEOL, registroFuncional } = this.state;
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
                    type="number"
                    placeholder="Pesquisar"
                    onChange={event => this.filterList(event.target.value)}
                    className="form-control"
                    icone={`${BUTTON_ICON.SEARCH} fa-lg`}
                  />
                </div>
              </div>
              {perfilEOL && (
                <div className="row search-result">
                  <div className="col-2 align-self-center">
                    <p className="rf">{registroFuncional}</p>
                  </div>
                  <div className="col-3 align-self-center">
                    <p>{perfilEOL.nm_pessoa}</p>
                  </div>
                  <div className="col-5 align-self-center">
                    <p>{perfilEOL.divisao}</p>
                  </div>
                  <div className="col-2 align-self-center">
                    <Botao
                      texto="Permitir"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      type={BUTTON_TYPE.BUTTON}
                      onClick={this.permitir}
                    />
                  </div>
                </div>
              )}
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
