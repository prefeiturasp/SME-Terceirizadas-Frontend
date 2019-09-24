import React, { Component } from "react";
import { meusDados } from "../../services/perfil.service";
import { getDiasUteis } from "../../services/diasUteis.service";
import { dataParaUTC } from "../../helpers/utilities";
import SolicitacaoUnificada from ".";

class SolicitacaoUnificadaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null,
      escolas: []
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      let escolas = response.diretorias_regionais[0].escolas;
      escolas.forEach(function(escola) {
        escola["total_alunos"] = escola.quantidade_alunos;
        escola["burger_active"] = false;
        escola["limit_of_meal_kits"] = 0;
        escola["number_of_choices"] = 0;
        escola["number_of_meal_kits"] = 0;
        escola["nro_alunos"] = 0;
        escola["numero_alunos"] = 0;
        escola["tempo_passeio"] = null;
        escola["kit_lanche"] = null;
        escola["checked"] = false;
        escola["kitsChecked"] = [];
      });
      this.setState({
        meusDados: response,
        escolas
      });
    });

    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      this.setState({
        proximos_dois_dias_uteis,
        proximos_cinco_dias_uteis
      });
    });
  }

  render() {
    return <SolicitacaoUnificada {...this.state} />;
  }
}

export default SolicitacaoUnificadaContainer;
