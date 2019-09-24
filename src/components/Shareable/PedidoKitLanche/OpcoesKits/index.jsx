import React, { Component } from "react";
import { CardKit } from "./CardKit";
import { getKitLanches } from "../../../../services/solicitacaoDeKitLanche.service";
import { extrairKitsLanche } from "./helper";
import { TEMPO_PASSEIO } from "../../../../constants/kitLanche.constants";
import "./style.scss";

export class OpcoesKits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kitsLanche: null,
      kitsChecked: []
    };
    this.onCardChange = this.onCardChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.kitsLanche) {
      getKitLanches().then(response => {
        this.setState({
          kitsLanche: response.results
        });
      });
    } else {
      this.setState({ kitsLanche: this.props.kitsLanche });
    }
  }

  componentDidUpdate(prevProps) {
    this.iteracaoEntreTempoPasseioECards(prevProps);
  }

  iteracaoEntreTempoPasseioECards(prevProps) {
    if (
      this.props.tempoPasseio === TEMPO_PASSEIO.OITO_HORAS_OU_MAIS &&
      prevProps.tempoPasseio !== TEMPO_PASSEIO.OITO_HORAS_OU_MAIS
    ) {
      this.setState({ kitsChecked: extrairKitsLanche(this.state.kitsLanche) });
      this.props.updateKitsChecked(extrairKitsLanche(this.state.kitsLanche));
    } else if (
      this.props.tempoPasseio !== TEMPO_PASSEIO.OITO_HORAS_OU_MAIS &&
      prevProps.tempoPasseio === TEMPO_PASSEIO.OITO_HORAS_OU_MAIS
    ) {
      this.setState({ kitsChecked: [] });
    } else if (
      this.props.tempoPasseio === TEMPO_PASSEIO.QUATRO_HORAS &&
      (prevProps.tempoPasseio === TEMPO_PASSEIO.CINCO_A_SETE_HORAS ||
        prevProps.tempoPasseio === "")
    ) {
      this.setState({ kitsChecked: [] });
    } else if (
      prevProps.kitsChecked &&
      this.props.kitsChecked &&
      this.props.kitsChecked.length !== prevProps.kitsChecked.length
    ) {
      this.setState({ kitsChecked: this.props.kitsChecked });
    }
  }

  onCardChange(uuid) {
    let kitsChecked = this.state.kitsChecked;
    if (!kitsChecked.includes(uuid)) {
      kitsChecked.push(uuid);
    } else {
      kitsChecked.splice(kitsChecked.indexOf(uuid), 1);
    }
    this.setState({ kitsChecked });
    this.props.updateKitsChecked(kitsChecked);
  }

  render() {
    const { kitsLanche, kitsChecked } = this.state;
    return (
      <div className="kits-options mt-3">
        <p className="label">Selecione a opção desejada</p>
        <div className="row">
          {kitsLanche &&
            kitsLanche.map(kitLanche => {
              return (
                <div className="col-lg-4 col-md-12">
                  <CardKit
                    onCardChange={this.onCardChange}
                    kitLanche={kitLanche}
                    kitsChecked={kitsChecked}
                    checked={kitsChecked.includes(kitLanche.uuid)}
                    {...this.props}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default OpcoesKits;
