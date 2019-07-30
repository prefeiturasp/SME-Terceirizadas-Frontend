import React, { Component } from "react";

export class Rascunhos extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedObjects: [] };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(event, object) {
    let { checkedObjects } = this.state;
    if (event.target.checked) {
      checkedObjects.push(object);
      this.setState({ checkedObjects });
    } else {
      checkedObjects = checkedObjects.filter(obj => {
        return obj.id !== object.id;
      });
      this.setState({ checkedObjects });
    }
  }

  OnDeleteButtonClicked(id, uuid) {
    this.props.OnDeleteButtonClicked(id, uuid);
    let { checkedObjects } = this.state;
    checkedObjects = checkedObjects.filter(obj => {
      return obj.id !== id;
    });
    this.setState({ checkedObjects });
    this.props.resetForm();
  }

  render() {
    const { unifiedSolicitationList } = this.props;
    const allDaysInfo = unifiedSolicitationList.map(solicitacaoUnificada => {
      const { id_externo, uuid } = solicitacaoUnificada;
      let backgroundColor =
        solicitacaoUnificada.status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="bg-white border rounded mt-3">
          <div className="mt-2">
            <label className="bold ml-3">
              Solicitação Unificada {`# ${id_externo}`}
            </label>
            <span
              className="ml-3 p-1 border rounded"
              style={{ background: backgroundColor }}
            >
              SALVO
            </span>
          </div>
          <div className="icon-draft-card float-right">
            Criado em: {solicitacaoUnificada.solicitacao_kit_lanche.criado_em}
            <span onClick={p => this.OnDeleteButtonClicked(id_externo, uuid)}>
              <i className="fas fa-trash" />
            </span>
            <span
              disabled={!this.props.schoolsLoaded}
              onClick={p =>
                this.props.OnEditButtonClicked({
                  solicitacaoUnificada
                })
              }
            >
              <i className="fas fa-edit" />
            </span>
          </div>
          <div className="ml-3">
            <p>
              {solicitacaoUnificada.lista_kit_lanche_igual
                ? "Pedido Múltiplo - "
                : solicitacaoUnificada.escolas_quantidades.length > 1
                ? solicitacaoUnificada.escolas_quantidades.length +
                  " escolas - "
                : solicitacaoUnificada.escolas_quantidades.length +
                  " escola - "}
              {solicitacaoUnificada.solicitacao_kit_lanche.data} -{" "}
              {solicitacaoUnificada.motivo.nome}
            </p>
          </div>
        </div>
      );
    });
    return <div>{allDaysInfo}</div>;
  }
}
