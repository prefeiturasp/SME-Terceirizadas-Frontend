import React, { Component } from "react";
import { FieldArray, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle } from "../../../Shareable/button";
import { getLotes } from "../../../../services/diretoriaRegional.service";
import { buscaDadosLote } from "./helper";
import { SectionFormEdital } from "./SectionFormEdital";
import ContratosRelacionados from "./ContratosRelacionados";
import "../style.scss";

class EditaisContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: [],
      lotesSelecionados: [
        
      ]
    };
    this.lidarComLotesSelecionados = this.lidarComLotesSelecionados.bind(this);
  }

  componentDidMount() {
    getLotes().then(response => {
      this.setState({ lotes: buscaDadosLote(response.results) });
    });
  }

  lidarComLotesSelecionados(value, nomeDoFormAtual) {
    if(this.state.lotesSelecionados.length === 0){
      this.setState({ lotesSelecionados: [{[nomeDoFormAtual]: Array(value[0]) }]})
    }if(this.state.lotesSelecionados.length > 0){
      this.state.lotesSelecionados.forEach(lote => {
        Object.keys(lote)[0] == [nomeDoFormAtual] ? (
          lote[[nomeDoFormAtual]].push(value[0])
        ) : (
          console.log('nao tem')
        )
      })
    }



    /*
    let valor = value[0]
    Object.keys(this.state.lotesSelecionados) == nomeDoFormAtual ? (
      this.state.lotesSelecionados[[nomeDoFormAtual]].push(valor)
    ): (
     this.setState({ lotesSelecionados: {[nomeDoFormAtual]: value} })
    )
    console.log(this.state.lotesSelecionados)
    */
  }



  render() {
    const { handleSubmit } = this.props;
    const { lotes, lotesSelecionados } = this.state;
    return (
      <section className="cadastro pt-3">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <header className="header-form">
              <nav>Dados do Edital e contrato</nav>
              <Link to="#">
                <BaseButton
                  className="header-button"
                  label="Consulta de lotes cadastrados"
                  style={ButtonStyle.OutlinePrimary}
                />
              </Link>
            </header>
            <SectionFormEdital />
            <hr />
            <FieldArray
              name="contratosRelacionados"
              component={ContratosRelacionados}
              lotes={lotes}
              lotesSelecionados={lotesSelecionados}
              lidarComLotesSelecionados={this.lidarComLotesSelecionados}
            />

            <footer>
              <button type="submit">Submit</button>
            </footer>
          </form>
        </div>
      </section>
    );
  }
}

export default reduxForm({
  form: "cadastroEditaisForm",
  initialValues: {
    contratosRelacionados: [""]
  },
  onSubmit: values => {
    window.alert("Submited: \n" + JSON.stringify(values, null, 2));
  }
})(EditaisContratos);
