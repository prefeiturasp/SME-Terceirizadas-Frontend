import PropTypes from "prop-types";
import React, { Component } from "react";
import Button, { ButtonIcon, ButtonStyle } from "../Shareable/button";
import "../Shareable/custom.css";
import If from "../Shareable/layout";

export class TourRequestItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedObjects: [] };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  static propTypes = {
    tourRequestList: PropTypes.arrayOf(
      PropTypes.shape({
        obs: PropTypes.string,
        status: PropTypes.string.isRequired,
        salvo_em: PropTypes.string.isRequired,
        id: PropTypes.number,
        tempo_passeio: PropTypes.string.isRequired,
        kit_lanche: PropTypes.array.isRequired,
        nro_alunos: PropTypes.string.isRequired
      })
    )
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
    const { tourRequestList } = this.props;
    const allDaysInfo = tourRequestList.map(tourRequest => {
      const {
        status,
        salvo_em,
        id,
        tempo_passeio,
        kit_lanche,
        nro_alunos,
        local_passeio,
        evento_data
      } = tourRequest;
      let backgroundColor = status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="border rounded mt-3" key={id}>
          <div className="mt-2">
            <label className="bold ml-3">
              Solicitação de Kit Lanche/Passeio{" "}
              {`${tempo_passeio.replace("_", " a ")} # ${id}`}
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
                onClick={event => this.onCheckChange(event, tourRequest)}
              />
            </div>
            <div className="ml-3">
              <p>
                Data do evento: <b>{evento_data}</b> Local do passeio:{" "}
                <b>{local_passeio}</b>
              </p>
              <div>
                <div className="float-right">
                  Salvo em: {salvo_em}
                  <Button
                    icon={ButtonIcon.TRASH}
                    onClick={p => this.OnDeleteButtonClicked(id)}
                  />
                  <Button
                    icon={ButtonIcon.EDIT}
                    onClick={p => this.props.OnEditButtonClicked(tourRequest)}
                  />
                </div>
              </div>
              Nº de Alunos participantes: <b>{nro_alunos}</b>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {allDaysInfo}
        <If isVisible={this.props.tourRequestList.length >= 1}>
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
