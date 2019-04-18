import PropTypes from "prop-types";
import React, { Component } from "react";
import Button, { ButtonIcon, ButtonStyle } from "../Shareable/button";
import "../Shareable/custom.css";
import If from "../Shareable/layout";

export class DayChangeItemList extends Component {
  static propTypes = {
    motivo: PropTypes.string.isRequired,
    obs: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    salvo_em: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { checkedObjects: [] };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(event, object) {
    let { checkedObjects } = this.state;
    switch (event.target.checked) {
      case true:
        checkedObjects.push(object);
        this.setState({ checkedObjects });
        break;
      case false:
        checkedObjects = checkedObjects.filter(obj => {
          return obj.id !== object.id;
        });
        this.setState({ checkedObjects });
        break;
      default:
        break;
    }
  }

  render() {
    const { dayChangeList } = this.props;
    const allDaysInfo = dayChangeList.map(dayChange => {
      const {
        status,
        id,
        salvo_em,
        subst_dia_origem,
        subst_dia_destino,
        motivo,
        obs
      } = dayChange;
      let backgroundColor = status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="border rounded mt-3">
          <div className="mt-2">
            <label className="bold ml-3">
              Alteração de Dia de cardápio {`# ${id}`}
            </label>
            <span
              className="ml-3 p-1 border rounded"
              style={{ background: backgroundColor }}
            >
              {status}
            </span>
            <div className="float-right">
              <input
                className="float-right mt-2 mr-3"
                type="checkbox"
                name={id}
                id={id}
                onClick={event =>
                  this.onCheckChange(event, {
                    status,
                    id,
                    salvo_em,
                    subst_dia_origem,
                    subst_dia_destino,
                    motivo,
                    obs
                  })
                }
              />
            </div>
          </div>
          <div>
            <div className="float-right">
              Salvo em: {salvo_em}
              <Button
                icon={ButtonIcon.TRASH}
                onClick={p => this.props.OnDeleteButtonClicked(id)}
              />
              <Button
                icon={ButtonIcon.EDIT}
                onClick={p =>
                  this.props.OnEditButtonClicked(
                    {
                      status,
                      id,
                      salvo_em,
                      subst_dia_origem,
                      subst_dia_destino,
                      motivo,
                      obs
                    },
                  )
                }
              />
            </div>
          </div>
          <div className="ml-3">
            <p>
              Substituição do dia: <b>{subst_dia_origem}</b>{" "}
              <i
                className={"fa fa-arrow-right ml-2 mr-2"}
                style={{ color: "#2881BB" }}
              />{" "}
              para o dia:
              <b>{subst_dia_destino}</b>
            </p>
          </div>
        </div>
      );
    });
    return (
      <div>
        {allDaysInfo}
        <If isVisible={this.props.dayChangeList.length >= 1}>
          <Button
            style={ButtonStyle.Primary}
            label="Enviar solicitações"
            className="float-right mt-2"
          />
        </If>
      </div>
    );
  }
}
