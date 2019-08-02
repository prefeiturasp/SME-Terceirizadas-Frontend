import React, { Component, Fragment } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import {
  LabelAndInput,
  LabelAndDate
} from "../../../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle } from "../../../Shareable/button";
import {
  getDiretoriaregional
} from "../../../../services/diretoriaRegional.service";
import { buscaDadosDRE } from "./helper";
import MultiSelectLotes from './MultiSelectLotes';


class ContratosRelacionados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dres: [],
      dresSelecionados: [],
      empresas: [
        {
          uuid: "6d8fd0c9-a2ad-4ead-b748-a3d588d9872a",
          nome: "SINGULAR GESTÃO DE SERVIÇOS LTDA"
        },
        {
          uuid: "2cfdb273-4ef2-44a7-9278-26a0a2373896",
          nome: "APETECE SISTEMAS DE ALIMENTAÇÃO S/A. "
        },
        {
          uuid: "4d5ae3ac-f487-4680-b56a-fedb9a69c6a4",
          nome: "S.H.A COMÉRCIO DE ALIMENTOS LTDA"
        },
        {
          uuid: "91e5d95b-42a2-46fa-bae1-418dbf37f510",
          nome: "P.R.M. SERVIÇOS E MÃO DE OBRA ESPECIALIZADA EIRELI "
        },
        {
          uuid: "398eb388-5e8b-4805-8ab6-afbaac743f31",
          nome: "COMERCIAL MILANO BRASIL"
        }
      ],
      empresasSelecionadas: []
    };
  }

  componentDidMount() {
    getDiretoriaregional().then(response => {
      this.setState({ dres: buscaDadosDRE(response.data) });
    });

  }

  render() {
    const {
      lotes,
      dres,
      empresas,
      lotesSelecionados,
      dresSelecionados,
      empresasSelecionadas
    } = this.state;
    const { fields } = this.props;

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
                     <MultiSelectLotes contratoRelacionado={contratoRelacionado} />
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
            onClick={() => fields.push()}
          />
        </article>
      </Fragment>
    );
  }
}

export default ContratosRelacionados;
