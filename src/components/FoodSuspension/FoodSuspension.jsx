import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/esm/locale';
import InputRowSuspension from '../Shareable/InputRowSupension'

class FoodSuspension extends Component {

  fontHeader = {
    color: "#686868"
  }
  bgMorning = {
    background: "#FFF7CB"
  }

  state = {}
  render() {
    return (
      <div>
        <form>
          <span className="page-title">Suspensão de Alimentação</span>
          <div className="card mt-3">
            <div className="card-body">
              <span className="blockquote-sme">Nº de Matriculados</span>
              <div></div>
              <span class="badge-sme badge-secondary-sme">{this.props.enrolled}</span>
              <span className="blockquote-sme pl-2 text-color-sme-silver">Informaçâo automática disponibilizada no Cadastro da Unidade Escolar</span>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold" style={this.fontHeader}>Descrição da Suspensão</div>
              <table className="table table-borderless">
                <tr>
                  <td>Período</td>
                  <td style={{"paddingLeft" : "9rem"}}>Tipo de Alimentação</td>
                  <td>Nº de Alunos</td>
                </tr>
              </table>

              <InputRowSuspension
                labelCheck={"1º Período - Matutino"}
                nameCheck={"teste"}
                valueCheck={"1"}
                nameSelect={"teste1"}
                optionsSelect={[{
                  key: "1",
                  value: "Teste"
                }]}
                nameNumber={"teste3"}
                valueNumber={10}
              />

              <InputRowSuspension
                labelCheck={"2º Período - Intermediário"}
                nameCheck={"teste"}
                valueCheck={"1"}
                nameSelect={"teste1"}
                optionsSelect={[{
                  key: "1",
                  value: "Teste"
                }]}
                nameNumber={"teste3"}
                valueNumber={10}
              />

              <InputRowSuspension
                labelCheck={"3º Período - Vespertino"}
                nameCheck={"teste"}
                valueCheck={"1"}
                nameSelect={"teste1"}
                optionsSelect={[{
                  key: "1",
                  value: "Teste"
                }]}
                nameNumber={"teste3"}
                valueNumber={10}
              />

              <InputRowSuspension
                labelCheck={"4º Período - Noturno"}
                nameCheck={"teste"}
                valueCheck={"1"}
                nameSelect={"teste1"}
                optionsSelect={[{
                  key: "1",
                  value: "Teste"
                }]}
                nameNumber={"teste3"}
                valueNumber={10}
              />

              <InputRowSuspension
                labelCheck={"Integral"}
                nameCheck={"teste"}
                valueCheck={"1"}
                nameSelect={"teste1"}
                optionsSelect={[{
                  key: "1",
                  value: "Teste"
                }]}
                nameNumber={"teste3"}
                valueNumber={10}
              />
              <hr className="w-100" />

              <div className="card-title font-weight-bold" style={this.fontHeader}>Data da Suspensão</div>

              <div className="form-row">
                <div className="form-group col-sm-8">
                  <label>Motivo</label><br />
                  <select className="form-control">
                    <option>--MOTIVO--</option>
                    {this.props.reasons.map((value,key)=>{
                      return <option key={key} value={value.key}>{value.value}</option>
                    })}
                  </select>
                </div>

                <div className="input-group col-sm-2">
                  <label>Dia</label><br/>
                  <DatePicker
                    //https://reactdatepicker.com/
                    // placeholderText={"Dia"}
                    dateFormat={"dd/MM/YYYY"}
                    selected={this.props.day}
                    className="form-control ml-3"
                    locale={ptBR}
                    onChange={value => {this.props.handleDate(value)}}
                  />
                  {/* <div class="input-group-append">
                    <i className="fa fa-calendar" />
                  </div> */}
                </div>
              </div>

              <div className="form-group col-sm-4">
                <button class="btn btn-outline-primary" type="button">Adicionar Dia</button>
              </div>

              <hr className="w-100" />

              <div className="form-row">
                <div className="form-grop col-sm-11">
                  <label className="font-weight-bold">Observações</label>
                  <Editor
                    //how to config: https://jpuri.github.io/react-draft-wysiwyg/#/docs
                    name={"description"}
                    wrapperClassName="border rounded"
                    editorClassName="ml-2"
                    className="form-control"
                    placeholder={"Digite seu texto"}

                    toolbar={{
                      options: ["inline", "list"],
                      inline: {
                        inDropdown: false,
                        options: ["bold", "italic", "underline", "strikethrough"]
                      },
                      list: { inDropdown: false, options: ["unordered", "ordered"] }
                    }}
                  />

                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-3"></div>
        <button type="button" className="btn btn-lg btn-outline-primary btn-block"><i className="fa fa-plus"></i> Adicionar nova informação de suspensão</button>
      </div>
    );
  }
}

export default FoodSuspension
