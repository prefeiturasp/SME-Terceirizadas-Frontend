import React, { Component } from "react";
import Button, { ButtonIcon } from "../Shareable/button";
import "../Shareable/custom.css";

export class UnifiedSolicitationItemList extends Component {
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
    const allDaysInfo = unifiedSolicitationList.map(dayChange => {
      const { id } = dayChange;
      let backgroundColor =
        dayChange.status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="border rounded mt-3">
          <div className="mt-2">
            <label className="bold ml-3">
              Solicitação Unificada {`# ${dayChange.id}`}
            </label>
            <span
              className="ml-3 p-1 border rounded"
              style={{ background: backgroundColor }}
            >
              SALVO
            </span>
          </div>
          <div>
            <div className="float-right">
              Criado em: {dayChange.criado_em}
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
              {dayChange.pedido_multiplo
                ? "Pedido Múltiplo - "
                : dayChange.escolas.length > 1
                ? dayChange.escolas.length + " escolas - "
                : dayChange.escolas.length + " escola - "}
              {dayChange.dia} - {dayChange.razao}
            </p>
          </div>
        </div>
      );
    });
    return <div>{allDaysInfo}</div>;
  }
}
