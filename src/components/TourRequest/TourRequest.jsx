import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { maxValue, required } from "../../helpers/fieldValidators";
import { validateTourRequestForm } from "../../helpers/formValidators/tourRequestValidators";
import Button, { ButtonStyle, ButtonType } from "../Shareable/button";
import { LabelAndDate, LabelAndInput, LabelAndTextArea } from "../Shareable/labelAndInput";
import { Grid } from "../Shareable/responsiveBs4";
import { SelecionaKitLancheBox, SelecionaTempoPasseio } from "./TourRequestCheck";
import { TourRequestItemList } from "./TourRequesttemList";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};

export class TourRequest extends Component {
  constructor(props) {
    super(props);
    this.setNumeroDeKitLanches = this.setNumeroDeKitLanches.bind(this);
    this.state = {
      qtd_kit_lanche: 0,
      radioChanged: false,
      dayChangeList: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    validateTourRequestForm(values);
    if (values.id) {
      //put
      axios
        .put(`http://localhost:3004/tourRequest/${values.id}`, values)
        .then(res => {
          // this.refresh();
          console.log("PUT", res.data);
        });
    } else {
      axios.post(`http://localhost:3004/tourRequest/`, values).then(res => {
        // this.refresh();
        console.log("POST", res.data);
      });
    }
  }

  refresh() {
    axios.get(`http://localhost:3004/tourRequest/?status=SALVO`).then(res => {
      const dayChangeList = res.data;
      this.setState({ dayChangeList });
    });
  }

  setNumeroDeKitLanches = (event, newValue, previousValue, name) => {
    const parser = {
      "4h": HORAS_ENUM._4.qtd_kits,
      "5_7h": HORAS_ENUM._5a7.qtd_kits,
      "8h": HORAS_ENUM._8.qtd_kits
    };
    let newQuantity = parser[event];
    this.setState({
      ...this.state,
      qtd_kit_lanche: newQuantity,
      radioChanged: event !== previousValue
    });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="d-flex flex-column p-4 mt-5">
        <form>
          <div>
            <label className="header-form-label mb-5">Nº de matriculados</label>
          </div>
          <div className="form-group row">
            <br />
            <Field
              component={"input"}
              type="number"
              className="btn btn-primary mr-3"
              name="nro_matriculados"
            />
            <label htmlFor="nro_matriculados">
              Informação automática disponibilizada no cadastro da UE
            </label>
          </div>
          <TourRequestItemList
            tourRequestList={[{
              "obs": "<p>123213213</p>\n",
              "tempo_passeio": "8h",
              "kit_lanche": [
                "kit_1",
                "kit_2",
                "kit_3"
              ],
              "nro_alunos": "333",
              "status": "SALVO",
              "salvo_em": "2019-04-22T13:03:25.926Z",
              "id": 1
            }]}
            OnDeleteButtonClicked={this.OnDeleteButtonClicked}
            resetForm={event => this.resetForm(event)}
            OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
          />
          <div className="form-group row">
            <Field
              component={LabelAndDate}
              cols="4 4 4 4"
              hasIcon={true}
              label="Data do evento"
              name="evento_data"
            />
            <Field
              component={LabelAndInput}
              cols="8 8 8 8"
              label="Local do passeio"
              name="local_passeio"
            />
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndInput}
              cols="3 3 3 3"
              name="nro_alunos"
              type="number"
              label="Número de alunos participantes"
              validate={[
                required,
                maxValue(this.props.initialValues.nro_matriculados)
              ]}
            />
          </div>
          <SelecionaTempoPasseio
            className="mt-3"
            onChange={(event, newValue, previousValue, name) =>
              this.setNumeroDeKitLanches(event, newValue, previousValue, name)
            }
          />
          <SelecionaKitLancheBox
            className="mt-3"
            choicesNumberLimit={this.state.qtd_kit_lanche}
          />
          <div className="form-group">
            <label className="bold">{"Número total kits:"}</label>
            <br />
            <Grid
              cols="1 1 1 1"
              className="border rounded p-2"
              style={{
                background: "#E8E8E8"
              }}
            >
              <span className="bold d-flex justify-content-center">
                {this.props.qtd_total || 0}
              </span>
            </Grid>
          </div>
          <hr />
          <div className="form-group">
            <Field
              component={LabelAndTextArea}
              label="Observações"
              name="obs"
              placeholder="Campo opcional"
            />
          </div>
          <div className="form-group row float-right">
            <Button
              label="Cancelar"
              onClick={reset}
              disabled={pristine || submitting}
              style={ButtonStyle.OutlinePrimary}
            />
            <Button
              label="Salvar"
              disabled={pristine || submitting}
              onClick={handleSubmit(values =>
                this.onSubmit({
                  ...values,
                  status: "SALVO",
                  salvo_em: new Date()
                })
              )}
              className="ml-3"
              type={ButtonType.SUBMIT}
              style={ButtonStyle.OutlinePrimary}
            />
            <Button
              label="Enviar Solicitação"
              disabled={pristine || submitting}
              type={ButtonType.SUBMIT}
              onClick={handleSubmit(values =>
                this.onSubmit({
                  ...values,
                  Acao: "Enviar solicitação"
                })
              )}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </div>
        </form>
      </div>
    );
  }
}

TourRequest = reduxForm({
  form: "tourRequest",
  destroyOnUnmount: false, // para nao perder o estado,
  initialValues: {
    nro_matriculados: 333
  }
})(TourRequest);

const selector = formValueSelector("tourRequest");

TourRequest = connect(state => {
  const nro_alunos = selector(state, "nro_alunos");
  const kit_lanche = selector(state, "kit_lanche") || [];
  return { qtd_total: kit_lanche.length * nro_alunos };
})(TourRequest);

export default TourRequest;
