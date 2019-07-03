import PropTypes from "prop-types";
import React, { Component } from "react";
import Button, { ButtonIcon } from "../Shareable/button";

export class FoodSuspensionItemList extends Component {
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
    const { foodSuspensionList } = this.props;
    const allDaysInfo = foodSuspensionList.map(dayChange => {
      const { id } = dayChange;
      let backgroundColor =
        dayChange.status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="border rounded mt-3">
          <div className="mt-2">
            <label className="bold ml-3">
              Inclusão de Alimentação {`# ${dayChange.id}`}
            </label>
            <span
              className="ml-3 p-1 border rounded"
              style={{ background: backgroundColor }}
            >
              {dayChange.status}
            </span>
          </div>
          <div>
            <div className="float-right">
              Salvo em: {dayChange.criado_em}
              <Button
                icon={ButtonIcon.TRASH}
                onClick={p => this.OnDeleteButtonClicked(id, dayChange.uuid)}
              />
              <Button
                icon={ButtonIcon.EDIT}
                onClick={p =>
                  this.props.OnEditButtonClicked({
                    dayChange
                  })
                }
              />
            </div>
          </div>
          <div className="ml-3">
            <p>
              {dayChange.dias_razoes.length > 1
                ? dayChange.dias_razoes.length + " dias"
                : dayChange.dias_razoes[0].razao.includes("Programa Contínuo")
                ? dayChange.dias_razoes[0].razao +
                  " (" +
                  dayChange.dias_razoes[0].data_de +
                  " - " +
                  dayChange.dias_razoes[0].data_ate +
                  ")"
                : dayChange.dias_razoes[0].razao +
                  " - " +
                  dayChange.dias_razoes[0].data}
            </p>
          </div>
        </div>
      );
    });
    return <div>{allDaysInfo}</div>;
  }
}
