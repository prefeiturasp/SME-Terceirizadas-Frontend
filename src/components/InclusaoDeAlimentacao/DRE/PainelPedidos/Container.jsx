import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import {
  getDiretoriaRegionalPedidosPrioritarios as prioritariosContinuo,
  getDiretoriaRegionalPedidosNoPrazoLimite as limitesContinuo,
  getDiretoriaRegionalPedidosNoPrazoRegular as regularesContinuo
} from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import {
  getDiretoriaRegionalPedidosPrioritarios as prioritariosAvulso,
  getDiretoriaRegionalPedidosNoPrazoLimite as limitesAvulso,
  getDiretoriaRegionalPedidosNoPrazoRegular as regularesAvulso
} from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import PainelPedidos from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosCarregados: 0,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      visaoPorCombo: visaoPorComboSomenteDatas
    };
  }

  componentDidMount() {
    prioritariosContinuo().then(response => {
      const pedidosPrioritarios = response.results;
      this.setState({
        pedidosPrioritarios: this.state.pedidosPrioritarios.concat(
          pedidosPrioritarios
        ),
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    prioritariosAvulso().then(response => {
      const pedidosPrioritarios = response.results;
      this.setState({
        pedidosPrioritarios: this.state.pedidosPrioritarios.concat(
          pedidosPrioritarios
        ),
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    limitesContinuo().then(response => {
      const pedidosNoPrazoLimite = response.results;
      this.setState({
        pedidosNoPrazoLimite: this.state.pedidosNoPrazoLimite.concat(
          pedidosNoPrazoLimite
        ),
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    limitesAvulso().then(response => {
      const pedidosNoPrazoLimite = response.results;
      this.setState({
        pedidosNoPrazoLimite: this.state.pedidosNoPrazoLimite.concat(
          pedidosNoPrazoLimite
        ),
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    regularesContinuo().then(response => {
      const pedidosNoPrazoRegular = response.results;
      this.setState({
        pedidosNoPrazoRegular: this.state.pedidosNoPrazoRegular.concat(
          pedidosNoPrazoRegular
        ),
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    regularesAvulso().then(response => {
      const pedidosNoPrazoRegular = response.results;
      this.setState({
        pedidosNoPrazoRegular: this.state.pedidosNoPrazoRegular.concat(
          pedidosNoPrazoRegular
        ),
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
