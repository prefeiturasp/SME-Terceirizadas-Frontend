import PropTypes from "prop-types";
import React, { Component } from "react";
import AlteracaoDeCardapio from ".";

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

    const cardsRascunhos = alteracaoCardapioList.map(alteracaoDeCardapio => {
      const { uuid, id_externo } = alteracaoDeCardapio;
      let backgroundColor =
        alteracaoDeCardapio.status === "SALVO" ? "#82B7E8" : "#DADADA";
      return (
        <div className="bg-white border rounded mt-3">
          <div className="mt-2">
            <label className="bold ml-3">
              {`Alteração de Cardápio # ${id_externo}`}
            </label>
            <span
              className="ml-3 p-1 border rounded"
              style={{ background: backgroundColor }}
            >
              {alteracaoDeCardapio.status}
            </span>
          </div>
          <div className="icon-draft-card float-right">
            Salvo em: {alteracaoDeCardapio.criado_em}
            <span onClick={() => this.OnDeleteButtonClicked(id_externo, uuid)}>
              <i className="fas fa-trash" />
            </span>
            <span
              onClick={p =>
                this.props.OnEditButtonClicked({
                  alteracaoDeCardapio
                })
              }
            >
              <i className="fas fa-edit" />
            </span>
          </div>
          <div className="ml-3">
            <p>
              {alteracaoDeCardapio.data_inicial ===
              alteracaoDeCardapio.data_final
                ? `Dia: ${alteracaoDeCardapio.data_inicial ||
                    alteracaoDeCardapio.alterar_dia}`
                : `De ${alteracaoDeCardapio.data_inicial} a ${
                    alteracaoDeCardapio.data_final
                  }`}
            </p>
          </div>
        </div>
      );
    });
    return <div>{cardsRascunhos}</div>;
  }
}
