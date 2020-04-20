import React, { Component } from "react";
import { Field } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import "./style.scss";
import { ToggleExpandir } from "../../../../Shareable/ToggleExpandir";
import { Collapse } from "react-collapse";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solicitacoesVigentes: null
    };
  }
  componentDidMount() {
    if (this.props.solicitacoesVigentes !== this.state.solicitacoesVigentes) {
      this.setState({ solicitacoesVigentes: this.props.solicitacoesVigentes });
    }
  }
  componentDidUpdate() {
    if (this.props.informacoesAgrupadas !== this.state.informacoesAgrupadas) {
      this.setState({ informacoesAgrupadas: this.props.informacoesAgrupadas });
    }
  }

  activateInformacao(key) {
    let informacoesAgrupadas = this.state.informacoesAgrupadas;
    informacoesAgrupadas[key].active = !informacoesAgrupadas[key].active;
    this.setState({ informacoesAgrupadas });
  }

  render() {
    const { informacoesAgrupadas } = this.state;
    return (
      <div className="cadastro-produto-step2">
        <div className="card-title">Informações Nutricionais</div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Porção"
              name="porcao"
              type="text"
              placeholder="Ex: porção de 200ml (01 unidade)"
              required
              validate={required}
            />
          </div>
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Unidade Caseira"
              name="unidade_caseira"
              type="text"
              placeholder="Ex: 01 copo"
              required
              validate={required}
            />
          </div>
        </div>
        {informacoesAgrupadas &&
          informacoesAgrupadas.map((informacao, key) => {
            return (
              <div className="pb-2" key={key}>
                <div className="school-container col-md-12 mr-4">
                  <div className="row pt-2 pb-2 title">
                    <div className="title col-4">{informacao.nome}</div>
                    <div className="col-8 text-right">
                      <ToggleExpandir
                        onClick={() => this.activateInformacao(key)}
                        ativo={informacao.active}
                        className="float-right"
                      />
                    </div>
                  </div>
                  <Collapse isOpened={informacao.active}>
                    <table className="table-informacoes-nutricionais">
                      <thead>
                        <th className="row">
                          <td className="col-4">Título</td>
                          <td className="col-4">Quantidade por porção</td>
                          <td className="col-4">%VD(*)</td>
                        </th>
                      </thead>
                      <tbody>
                        {informacao.informacoes_nutricionais.map(
                          (informacaoNutricional, key) => {
                            return (
                              <tr className="row" key={key}>
                                <td className="col-4">
                                  {informacaoNutricional.nome}
                                </td>
                                <td className="col-4">
                                  <div className="row">
                                    <div className="col-8">
                                      <Field
                                        component={InputText}
                                        name="porcao"
                                        type="text"
                                        required
                                        validate={required}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className="col-4">
                                  <div className="row">
                                    <div className="col-8">
                                      <Field
                                        component={InputText}
                                        name="porcao"
                                        type="text"
                                        required
                                        validate={required}
                                      />
                                    </div>
                                    <div className="col-2">%</div>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </Collapse>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Step2;
