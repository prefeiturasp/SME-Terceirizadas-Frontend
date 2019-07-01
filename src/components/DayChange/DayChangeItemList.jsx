import PropTypes from "prop-types";
import React, { Component } from "react";
import Button, { ButtonIcon, ButtonStyle } from "../Shareable/button";
import "../Shareable/custom.css";
import If from "../Shareable/layout";

export class DayChangeItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedObjects: [] };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  static propTypes = {
    descricao: PropTypes.string.isRequired,
    observacao: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    registro: PropTypes.string.isRequired,
    uuid: PropTypes.number.isRequired
  };

  onCheckChange(event, object) {
    let { checkedObjects } = this.state;
    if (event.target.checked) {
      checkedObjects.push(object);
      this.setState({ checkedObjects });
    } else {
      checkedObjects = checkedObjects.filter(obj => {
        return obj.uuid !== object.uuid;
      });
      this.setState({ checkedObjects });
    }
  }

  OnDeleteButtonClicked(uuid) {
    // faz o pai apagar o elemento
    // atualiza o estado do componente e limpa o form do pai
    this.props.OnDeleteButtonClicked(uuid);
    let { checkedObjects } = this.state;
    checkedObjects = checkedObjects.filter(obj => {
      return obj.uuid !== uuid;
    });
    this.setState({ checkedObjects });
    this.props.resetForm();
  }

  onEnviarSolicitacoesBtClicked = (event) => {
    this.state.checkedObjects.map(obj => {
      console.log(obj.uuid);
    });
  }

  render() {
    const { dayChangeList } = this.props;

    if (dayChangeList.length) {
      const allDaysInfo = dayChangeList.map(dayChange => {

        const {
          status,
          uuid,
          registro,
          data_de,
          data_para,
          descricao,
          observacao,
        } = dayChange;
        let backgroundColor = status === "ESCOLA_SALVOU" ? "#82B7E8" : "#DADADA";
        return (
          <div className="card border rounded mt-3 p-2">
            <div className="mt-2 row">
              <div className="col-sm">
                <label className="bold ml-3">Alteração de Dia de cardápio {`# ${uuid}`}</label>
                <span className="ml-3 p-1 border rounded" style={{ background: backgroundColor }}>
                  {'SALVO'}
                </span>
              </div>
              <div className="col-sm-3">
                <div className="float-right">
                  <input
                    className="float-right mt-2 mr-3"
                    type="checkbox"
                    name={uuid}
                    uuid={uuid}
                    onClick={event =>
                      this.onCheckChange(event, {
                        status,
                        uuid,
                        registro,
                        data_de,
                        data_para,
                        descricao,
                        observacao,
                      })
                    }
                  />
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-sm">
                <div className="ml-3">
                  <p>Substituição do dia: <b>{data_de}</b>{" "}
                    <i
                      className={"fa fa-arrow-right ml-2 mr-2"}
                      style={{ color: "#2881BB" }}
                    />{" "}
                    para o dia:
                  <b>{data_para}</b>
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="float-right">
                  Salvo em: {registro}
                  <Button
                    icon={ButtonIcon.TRASH}
                    onClick={p => this.OnDeleteButtonClicked(uuid)}
                  />
                  <Button
                    icon={ButtonIcon.EDIT}
                    onClick={p =>
                      this.props.OnEditButtonClicked({
                        status,
                        uuid,
                        registro,
                        data_de,
                        data_para,
                        descricao,
                        observacao,
                      })
                    }
                  />
                </div>
              </div>
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
              disabled={this.state.checkedObjects.length === 0}
              onClick={event => this.onEnviarSolicitacoesBtClicked(event)}
            />
          </If>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}
