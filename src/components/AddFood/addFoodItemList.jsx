import PropTypes from "prop-types";
import React, { Component } from "react";
import Button, { ButtonIcon, ButtonStyle } from "../Shareable/button";
import "../Shareable/custom.css";
import If from "../Shareable/layout";

export class AddFoodItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedObjects: [] };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  static propTypes = {
    motivo: PropTypes.string.isRequired,
    obs: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    salvo_em: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
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

  OnDeleteButtonClicked(id) {
    // faz o pai apagar o elemento
    // atualiza o estado do componente e limpa o form do pai
    this.props.OnDeleteButtonClicked(id);
    let { checkedObjects } = this.state;
    checkedObjects = checkedObjects.filter(obj => {
      return obj.id !== id;
    });
    this.setState({ checkedObjects });
    this.props.resetForm();
  }

  onEnviarSolicitacoesBtClicked(event) {
    this.state.checkedObjects.map(obj => {
      console.log(obj.id);
    });
  }

  render() {
    const { addFoodList } = this.props;
    console.log(addFoodList);
    const allDaysInfo = addFoodList.map(dayChange => {
      const {
        status,
        id,
        salvo_em,
        motivo,
        periodo,
        first_period_check,
        first_period_select,
        first_period_number,
        reason_day,
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
                    first_period_check,
                    first_period_select,
                    first_period_number,
                    reason_day,
                    motivo,
                    periodo,
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
                onClick={p => this.OnDeleteButtonClicked(id)}
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
              {addFoodList.map((addFoodItem)=>{
                return <p>{addFoodItem.period} - {
                  addFoodItem.reason_day ?
                  addFoodItem.reason_day :
                  '(' + addFoodItem.reason_from + ' - ' + addFoodItem.reason_to + ')'
                }</p>
              })}
          </div>
        </div>
      );
    });
    return (
      <div>
        {allDaysInfo}
        <If isVisible={this.props.addFoodList.length >= 1}>
          <Button
            style={ButtonStyle.Primary}
            label="Enviar solicitações"
            className="float-right mt-2"
            disabled={this.state.checkedObjects.length === 0}
            onClick={event => this.onEnviarSolicitacoesBtClicked(event)}
          />
        </If>
      </div>
    );
  }
}
