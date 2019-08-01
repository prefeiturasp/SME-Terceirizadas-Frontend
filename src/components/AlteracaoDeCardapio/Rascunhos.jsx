import PropTypes from "prop-types";
import React, { Component } from "react";

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

  OnDeleteButtonClicked(id, uuid) {
    // faz o pai apagar o elemento
    // atualiza o estado do componente e limpa o form do pai
    this.props.OnDeleteButtonClicked(id, uuid);
    let { checkedObjects } = this.state;
    checkedObjects = checkedObjects.filter(obj => {
      return obj.id !== id;
    });
    this.setState({ checkedObjects });
    this.props.resetForm();
  }

  render() {
    const { alteracaoCardapioList } = this.props;

    const allDaysInfo = alteracaoCardapioList.map(dayChange => {
      const { id } = dayChange;
      let backgroundColor =
        dayChange.status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="bg-white border rounded mt-3">
          <div className="mt-2">
            <label className="bold ml-3">
              Alteração de Cardápio por {`# ${dayChange.motivo.nome}`}
            </label>
            <span
              className="ml-3 p-1 border rounded"
              style={{ background: backgroundColor }}
            >
              {dayChange.status}
            </span>
          </div>
          <div className="icon-draft-card float-right">
            Salvo em: {dayChange.criado_em}
            <span
              onClick={p => this.OnDeleteButtonClicked(id, dayChange.uuid)}
            >
              <i className="fas fa-trash" />
            </span>
            <span
              onClick={p =>
                this.props.OnEditButtonClicked({
                  dayChange
                })
              }
            >
              <i className="fas fa-edit" />
            </span>
          </div>
          <div className="ml-3">
            <p>
              De {dayChange.data_inicial} a {dayChange.data_final}
            </p>
            <small>{dayChange.uuid}</small>
          </div>
        </div>
      );
    });
    return <div>{allDaysInfo}</div>;
  }
}
