import PropTypes from "prop-types";
import React, { Component } from "react";
import "../Shareable/style.scss";

export class Rascunhos extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedObjects: [] };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  static propTypes = {
    salvo_em: PropTypes.string.isRequired
  };

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

  removerRascunho(id, uuid) {
    this.props.removerRascunho(id, uuid);
    let { checkedObjects } = this.state;
    checkedObjects = checkedObjects.filter(obj => {
      return obj.id !== id;
    });
    this.setState({ checkedObjects });
    this.props.resetForm();
  }

  render() {
    const { rascunhosInclusaoDeAlimentacao } = this.props;
    const allDaysInfo = rascunhosInclusaoDeAlimentacao.map(
      inclusaoDeAlimentacao => {
        const { id_externo, uuid } = inclusaoDeAlimentacao;
        let backgroundColor =
          inclusaoDeAlimentacao.status === "SALVO" ? "#82B7E8" : "#DADADA";
        return (
          <div className="bg-white border rounded mt-1">
            <div className="mt-2">
              <label className="bold ml-3">
                {`Inclusão de Alimentação # ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {inclusaoDeAlimentacao.status}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Salvo em: {inclusaoDeAlimentacao.created_at}
              <span
                onClick={p =>
                  this.removerRascunho(
                    id_externo,
                    uuid
                  )
                }
              >
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={p =>
                  this.props.carregarRascunho({
                    inclusaoDeAlimentacao
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>
                {inclusaoDeAlimentacao.quantidades_periodo.length > 1
                  ? inclusaoDeAlimentacao.quantidades_periodo.length + " dias"
                  : inclusaoDeAlimentacao.motivo.nome.includes(
                      "Programa Contínuo"
                    )
                  ? inclusaoDeAlimentacao.motivo.nome +
                    " (" +
                    inclusaoDeAlimentacao.data_inicial +
                    " - " +
                    inclusaoDeAlimentacao.data_final +
                    ")"
                  : inclusaoDeAlimentacao.motivo.nome +
                    " - " +
                    inclusaoDeAlimentacao.data}
              </p>
            </div>
          </div>
        );
      }
    );
    return <div>{allDaysInfo}</div>;
  }
}
