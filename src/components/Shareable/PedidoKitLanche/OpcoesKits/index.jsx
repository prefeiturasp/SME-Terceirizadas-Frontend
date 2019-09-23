import React, { Component } from "react";
import { CardKit } from "./CardKit";
import { getKitLanches } from "../../../../services/solicitacaoDeKitLanche.service";
import { extrairKitsLanche } from "./helper";
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
    getKitLanches().then(response => {
      this.setState({
        kitsLanche: response.results
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.tempoPasseio === "2" && prevProps.tempoPasseio !== "2") {
      this.setState({ kitsChecked: extrairKitsLanche(this.state.kitsLanche) });
      this.props.updateKitsChecked(extrairKitsLanche(this.state.kitsLanche));
    } else if (
      this.props.tempoPasseio !== "2" &&
      prevProps.tempoPasseio === "2"
    ) {
      this.setState({ kitsChecked: [] });
    } else if (
      this.props.tempoPasseio === "0" &&
      (prevProps.tempoPasseio === "1" || prevProps.tempoPasseio === "")
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
