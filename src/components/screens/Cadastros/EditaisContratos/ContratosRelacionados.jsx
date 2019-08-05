import React, { Component, Fragment } from "react";
import { Field } from "redux-form";
import {
  LabelAndInput,
  LabelAndDate
} from "../../../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle } from "../../../Shareable/button";
import StatefulMultiSelect from "@khanacademy/react-multi-select";

class ContratosRelacionados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidadeForm: 0,
      nomeDoFormAtual: "",
      lista_lotes: null
    };
    
    this.obtemNomeForm = this.obtemNomeForm.bind(this);
    
  }

  obtemNomeForm(form, quantidadeForm) {
    let nome = `${form}${quantidadeForm + 1}`;
    this.setState({ nomeDoFormAtual: nome})
    this.setState({ quantidadeForm: quantidadeForm +1 })
  }

  listaDeLotes(nomeDoFormAtual, lotesSelecionados){
    if(lotesSelecionados.length <= 0){
      return []
    }
    if(lotesSelecionados.length > 0){
      lotesSelecionados.forEach(lote => {
        if (Object.keys(lote) == nomeDoFormAtual){
          this.setState({lista_lotes: lote[[nomeDoFormAtual]]})
          
        }else {
          
        }
      })
      return []
      
    }
  }

  componentDidMount() {
    this.obtemNomeForm(
      this.props.fields.name,
      this.state.quantidadeForm
    );

  }

  

  renderizarLabelLote(selected, options) {
    if (selected.length === 0) {
      return "Selecione um ou mais lotes...";
    }
    if (selected.length === options.length) {
      return "Todos os lotes foram selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} lote selecionado`;
    }
    return `${selected.length} lotes selecionados`;
  }

  render() {
    const { nomeDoFormAtual, quantidadeForm,lista_lotes } = this.state;
    const { fields, lotes, lotesSelecionados, lidarComLotesSelecionados } = this.props;
   
    return (
      <Fragment>
        <nav className="titulo">Contratos relacionados</nav>
        {fields.map((contratoRelacionado, index) => (
          <Fragment>
            <article className="card-body contratos-relacionados">
              <section className="section-inputs">
                <div className="section-contrato-vigencia" />
                <div className="container-processo-adm">
                  <div className="data-processo-adm">
                    <div className="inputs-processo">
                      <div>
                        <Field
                          name={`${contratoRelacionado}processo_administrativo`}
                          label="* Processo administrativo do contrato"
                          key={index}
                          component={LabelAndInput}
                        />
                      </div>
                      <div>
                        <Field
                          name={`${contratoRelacionado}data_proposta`}
                          label="* Data do proposta"
                          key={index}
                          component={LabelAndDate}
                        />
                      </div>
                    </div>
                    <div />
                  </div>
                  <div className="container-lote-dre">
                    <div className="inputs-select-lote-dre">
                      {lotes.length ? (
                        
                        <Field
                          component={StatefulMultiSelect}
                          name={`${nomeDoFormAtual}lotes`}
                          selected={!lista_lotes ? [] : lista_lotes}
                          options={lotes}
                          valueRenderer={this.renderizarLabelLote}
                          onSelectedChanged={value => {
                            lidarComLotesSelecionados(value, nomeDoFormAtual)
                            this.listaDeLotes(nomeDoFormAtual, lotesSelecionados)
                          }}
                          overrideStrings={{
                            search: "Busca",
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                        />
                      ) : (
                        <div>Carregando lotes..</div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </article>
            <hr />
          </Fragment>
        ))}

        <article className="card-body dados-editais">
          <BaseButton
            className="header-button"
            label="+ Adicionar outro contrato relacionado"
            style={ButtonStyle.OutlinePrimary}
            onClick={() => {
              fields.push()
              this.obtemNomeForm(fields.name, quantidadeForm)
            }}
          />
        </article>
      </Fragment>
    );
  }
}

export default ContratosRelacionados;
