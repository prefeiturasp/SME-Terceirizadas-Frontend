import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import "./style.scss";
import { ToggleExpandir } from "../../../../Shareable/ToggleExpandir";
import { Collapse } from "react-collapse";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants";

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

  onSubmit = values => {
    const { informacoesAgrupadas } = this.state;
    const { payload } = this.props;

    informacoesAgrupadas.forEach(item => {
      item.informacoes_nutricionais.forEach(informacao => {
        const temPorcao = values.hasOwnProperty(`porcao=${informacao.uuid}`);
        const temVd = values.hasOwnProperty(`vd=${informacao.uuid}`);

        if (temPorcao && temVd) {
          payload.informacoes_nutricionais.push({
            informacao_nutricional: informacao.uuid,
            quantidade_porcao: values[`porcao=${informacao.uuid}`],
            valor_diario: values[`vd=${informacao.uuid}`]
          });
        }
      });
    });

    payload["porcao"] = values.porcao;
    payload["unidade_caseira"] = values.unidade_caseira;
    this.props.setaValoresStep2(payload);
  };

  render() {
    const { informacoesAgrupadas } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form>
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
                                          name={`porcao=${
                                            informacaoNutricional.uuid
                                          }`}
                                          type="text"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="col-4">
                                    <div className="row">
                                      <div className="col-8">
                                        <Field
                                          component={InputText}
                                          name={`vd=${
                                            informacaoNutricional.uuid
                                          }`}
                                          type="text"
                                          required
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
          <div className="row">
            <div className="col-10">
              <div className="card-warning mt-3 mb-3">
                % Valores Diários com base em uma dieta de 2.000 Kcal ou 8.400
                KJ.
                <br />
                Seus valores diários podem ser maiores ou menores dependendo de
                suas necessidades energéticas. (**) VD não estabelecidos
              </div>
            </div>
            <div className="col-2">
              <div className="mt-4 mb-3">
                <Botao
                  texto={"salvar"}
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.GREEN}
                  onClick={handleSubmit(values =>
                    this.onSubmit({
                      ...values
                    })
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

Step2 = reduxForm({
  form: "step2"
})(Step2);

export default Step2;
