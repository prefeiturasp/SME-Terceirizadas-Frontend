import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { solicitacoesUnificadasSalvas } from "../../services/solicitacaoUnificada.service";
import { toastError } from "../Shareable/dialogs";
import DetailUnifiedSolicitation from "./DetailUnifiedSolicitation";

class UnifiedSolicitationFilled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      solicitationsList: [],
      solicitation: {
        id: null,
        dre: null,
        reason: null,
        date: null,
        local_of_event: null,
        escolas: [],
        students_total: null,
        kits_total: null,
        obs: null
      }
    };
  }

  componentDidMount() {
    solicitacoesUnificadasSalvas().then(
      response => {
        this.setState({
          ...this.state,
          unifiedSolicitationList: response.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
  }

  preencherFormulario(solicitation) {
    let listSolicitation = this.state.unifiedSolicitationList;
    let list = [];
    listSolicitation.forEach(objeto => {
      if (objeto.uuid === solicitation.uuid) {
        list.push(objeto);
      }
    });
    this.setState({ solicitationsList: list });
  }

  render() {
    const { unifiedSolicitationList } = this.state;

    return (
      <div>
        {unifiedSolicitationList.length > 0 &&
          unifiedSolicitationList.map((unifiedSolicitation, key) => {
            return (
              <div>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => this.preencherFormulario(unifiedSolicitation)}
                >
                  {unifiedSolicitation.diretoria_regional.nome} - {unifiedSolicitation.lote} -{" "}
                  {unifiedSolicitation.solicitacao_kit_lanche.data}
                </p>
              </div>
            );
          })}

        {this.state.solicitationsList.map(solicitation => {
          return <DetailUnifiedSolicitation solicitation={solicitation} />;
        })}
      </div>
    );
  }
}

const UnifiedSolicitationFilledForm = reduxForm({
  form: "unifiedSolicitationFilledForm",
  enableReinitialize: true
})(UnifiedSolicitationFilled);
export default UnifiedSolicitationFilledForm;
