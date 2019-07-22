import React, { Component } from "react";
import { escolas } from "../../services/school.service";
import { motivosSolicitacaoUnificada } from "../../services/unifiedSolicitation.service";
import { diasUteis } from "../../services/workingDays.service";
import UnifiedSolicitation from "./UnifiedSolicitation";

class UnifiedSolicitationContainer extends Component {
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
    escolas().then(resultadoEscolas => {
      console.log(resultadoEscolas);
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
          let proximos_dois_dias_uteis,
            proximos_cinco_dias_uteis = null;
          proximos_dois_dias_uteis = resultadoDiasUteis.proximos_dois_dias_uteis.split(
            "/"
          );
          proximos_cinco_dias_uteis = resultadoDiasUteis.proximos_cinco_dias_uteis.split(
            "/"
          );
          this.setState({
            ...this.state,
            motivos: resultadoMotivos.results,
            proximos_dois_dias_uteis: new Date(
              proximos_dois_dias_uteis[2],
              proximos_dois_dias_uteis[1] - 1,
              proximos_dois_dias_uteis[0]
            ),
            proximos_cinco_dias_uteis: new Date(
              proximos_cinco_dias_uteis[2],
              proximos_cinco_dias_uteis[1] - 1,
              proximos_cinco_dias_uteis[0]
            ),
            escolas: escolas
          });
        });
      });
    });
  }

  render() {
    return <UnifiedSolicitation {...this.state} />;
  }
}

export default UnifiedSolicitationContainer;
