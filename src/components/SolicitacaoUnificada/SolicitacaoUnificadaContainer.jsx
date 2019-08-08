import React, { Component } from "react";
import { getEscolas } from "../../services/escola.service";
import { motivosSolicitacaoUnificada } from "../../services/solicitacaoUnificada.service";
import { diasUteis } from "../../services/workingDays.service";
import SolicitacaoUnificada from "./SolicitacaoUnificada";

class SolicitacaoUnificadaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 4500,
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null,
      motivos: [],
      escolas: []
    };
  }

  componentDidMount() {
    getEscolas().then(resultadoEscolas => {
      motivosSolicitacaoUnificada().then(resultadoMotivos => {
        diasUteis().then(resultadoDiasUteis => {
          let escolas = resultadoEscolas.results;
          escolas.forEach(function(escola) {
            escola["burger_active"] = false;
            escola["limit_of_meal_kits"] = 0;
            escola["number_of_choices"] = 0;
            escola["number_of_meal_kits"] = 0;
            escola["nro_alunos"] = 0;
            escola["numero_alunos"] = 0;
            escola["tempo_passeio"] = null;
            escola["kit_lanche"] = null;
            escola["checked"] = false;
          });
          this.setState({
            ...this.state,
            motivos: resultadoMotivos.results,
            proximos_dois_dias_uteis: new Date(
              resultadoDiasUteis.proximos_dois_dias_uteis
            ),
            proximos_cinco_dias_uteis: new Date(
              resultadoDiasUteis.proximos_cinco_dias_uteis
            ),
            escolas: escolas
          });
        });
      });
    });
  }

  render() {
    return <SolicitacaoUnificada {...this.state} />;
  }
}

export default SolicitacaoUnificadaContainer;
