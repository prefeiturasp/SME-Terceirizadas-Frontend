import React, { Component } from "react";
import CardPendenciaDRE from "./CardPendenciaDRE";

class VisaoPorDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dre: 1
    };
  }
  render() {
    const { dres } = this.props;
    return (
      <div className="container-dre">
        {dres.map((dre, key) => {
          return (
            <div className="card-dre" key={key}>
              <CardPendenciaDRE
                totalPedidos={dre.pedidos}
                nomeDre={dre.nome}
                dre={dre}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default VisaoPorDRE;
