import React, { Component } from "react";
import { connect } from "react-redux";
import HTTP_STATUS from "http-status-codes";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import {
  getHomologacaoProduto,
  CODAEHomologaProduto,
  CODAENaoHomologaProduto,
  CODAEPedeAnaliseSensorialProduto
} from "../../../../services/produto.service";
import "./style.scss";
import { ToggleExpandir } from "../../../Shareable/ToggleExpandir";
import { Collapse } from "react-collapse";
import { formataInformacoesNutricionais } from "./helper";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";

class HomologacaoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: null,
      uuid: null
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    getHomologacaoProduto(uuid).then(response => {
      this.setState({
        produto: response.data.produto,
        informacoesNutricionais: formataInformacoesNutricionais(
          response.data.produto
        ),
        uuid
      });
    });
  }

  activateInformacao(key) {
    let informacoesNutricionais = this.state.informacoesNutricionais;
    informacoesNutricionais[key].active = !informacoesNutricionais[key].active;
    this.forceUpdate();
  }

  naoHomologar = () => {
    const { uuid } = this.state;
    CODAENaoHomologaProduto(uuid).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação de não homologado enviada com sucesso");
      } else {
        toastError("Erro ao não homologar solicitação");
      }
    });
  };

  onSubmit = values => {
    const { uuid } = this.state;
    if (values.necessita_analise_sensorial === "1") {
      CODAEPedeAnaliseSensorialProduto(uuid).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação de homologado enviada com sucesso");
        } else {
          toastError("Erro ao pedir análise sensorial solicitação");
        }
      });
    } else {
      CODAEHomologaProduto(uuid).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Solicitação de homologado enviada com sucesso");
        } else {
          toastError("Erro ao homologar solicitação");
        }
      });
    }
  };

  render() {
    const { produto, informacoesNutricionais } = this.state;
    const { necessita_analise_sensorial, handleSubmit } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          {!produto ? (
            <div>Carregando...</div>
          ) : (
            <form
              className="homologacao-produto"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <div className="title">
                Informação de empresa solicitante (Terceirizada)
              </div>
              <div className="row">
                <div className="col-4 report-label-value">
                  <p>Empresa solicitante (Terceirizada)</p>
                  <p className="value">{produto.terceirizada.nome_fantasia}</p>
                </div>
                <div className="col-4 report-label-value">
                  <p>Telefone</p>
                  <p className="value">
                    {produto.terceirizada.contatos[0].telefone}
                  </p>
                </div>
                <div className="col-4 report-label-value">
                  <p>E-mail</p>
                  <p className="value">
                    {produto.terceirizada.contatos[0].email}
                  </p>
                </div>
              </div>
              <hr />
              <div className="title">Identificação do Produto</div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>
                    O produto se destina a alimentação de alunos com dieta
                    especial?
                  </p>
                  <p className="value">
                    {produto.eh_para_alunos_com_dieta ? "SIM" : "NÃO"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Marca</p>
                  <p className="value">
                    {produto.marca ? produto.marca.nome : "Não possui marca"}
                  </p>
                </div>
                <div className="col-6 report-label-value">
                  <p>Fabricante</p>
                  <p className="value">
                    {produto.fabricante
                      ? produto.fabricante.nome
                      : "Não possui fabricante"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>Componentes do produto</p>
                  <p className="value">
                    {produto.componentes || "Não possui componentes"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>
                    O produto contém ou pode conter ingredientes/aditivos
                    alergênicos?
                  </p>
                  <p className="value">
                    {produto.tem_aditivos_alergenicos ? "SIM" : "NÃO"}
                  </p>
                </div>
              </div>
              {produto.tem_aditivos_alergenicos && (
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Quais?</p>
                    <p className="value">
                      {produto.aditivos || "Não possui aditivos"}
                    </p>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-5">
                  <div className="card-warning mt-3">
                    <strong>IMPORTANTE:</strong> Relacioná-los conforme dispõe a
                    RDC nº 26 de 02/07/15
                  </div>
                </div>
              </div>
              <hr />
              <div className="title">Informações nutricionais</div>
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Porção</p>
                  <p className="value">{produto.porcao}</p>
                </div>
                <div className="col-6 report-label-value">
                  <p>Unidade Caseira</p>
                  <p className="value">{produto.unidade_caseira}</p>
                </div>
              </div>
              {informacoesNutricionais &&
                informacoesNutricionais.map((informacao, key) => {
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
                              {informacao.valores.map(
                                (informacaoNutricional, key) => {
                                  return (
                                    <tr className="row" key={key}>
                                      <td className="col-4">
                                        {informacaoNutricional.nome}
                                      </td>
                                      <td className="col-4">
                                        <div className="row">
                                          <div className="col-8">
                                            {
                                              informacaoNutricional.quantidade_porcao
                                            }
                                          </div>
                                        </div>
                                      </td>
                                      <td className="col-4">
                                        <div className="row">
                                          <div className="col-8">
                                            {informacaoNutricional.valor_diario}
                                          </div>
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
                  <div className="card-warning gray mt-3 mb-3">
                    % Valores Diários com base em uma dieta de 2.000 Kcal ou
                    8.400 KJ.
                    <br />
                    Seus valores diários podem ser maiores ou menores dependendo
                    de suas necessidades energéticas. (**) VD não estabelecidos
                  </div>
                </div>
              </div>
              <hr />
              <div className="title">Informação do Produto (classificação)</div>
              <div className="row">
                <div className="col-6 report-label-value">
                  <p>Embalagem primária</p>
                  <p className="value">
                    {produto.embalagem || "Sem embalagem"}
                  </p>
                </div>
                <div className="col-6 report-label-value">
                  <p>Prazo de validade</p>
                  <p className="value">
                    {produto.prazo_validade || "Sem prazo validade"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>
                    Condições de armazenamento, conservação e prazo máximo para
                    consumo após abertura da embalagem
                  </p>
                  <p className="value">
                    {produto.info_armazenamento ||
                      "Sem informações sobre armazenamento"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>Outras informações que empresa julgar necessário</p>
                  <p className="value">
                    {produto.outras_informacoes || "Sem mais informações"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 report-label-value">
                  <p>Nº de registro do produto de órgão competente</p>
                  <p className="value">
                    {produto.numero_registro || "Registro não encontrado"}
                  </p>
                </div>
              </div>
              <section className="row attachments">
                <div className="col-12 report-label-value">
                  <p>Fotos do produto</p>
                  {produto.imagens.map((anexo, key) => {
                    return (
                      <div key={key}>
                        <a
                          href={anexo.arquivo}
                          className="value-important link"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {`Anexo ${key + 1}`}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </section>
              <div className="link-with-student pt-4">
                <div className="label">
                  <span className="required-asterisk">*</span>Precisa solicitar
                  análise sensorial?
                </div>
                <div className="row">
                  <div className="col-3">
                    <label className="container-radio">
                      Sim
                      <Field
                        component={"input"}
                        type="radio"
                        value="1"
                        name="necessita_analise_sensorial"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-3">
                    <label className="container-radio">
                      Não
                      <Field
                        component={"input"}
                        type="radio"
                        value="0"
                        name="necessita_analise_sensorial"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-right pt-3">
                  <Botao
                    texto={"Análise"}
                    className="mr-3"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    disabled={
                      !necessita_analise_sensorial ||
                      necessita_analise_sensorial === "0"
                    }
                  />
                  <Botao
                    texto={"Corrigir"}
                    className="mr-3"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto={"Não homologar"}
                    className="mr-3"
                    onClick={() => this.naoHomologar()}
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    disabled={
                      !necessita_analise_sensorial ||
                      necessita_analise_sensorial === "1"
                    }
                  />
                  <Botao
                    texto={"Homologar"}
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    disabled={
                      !necessita_analise_sensorial ||
                      necessita_analise_sensorial === "1"
                    }
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const componentNameForm = reduxForm({
  form: "HomologacaoProduto"
})(HomologacaoProduto);
const selector = formValueSelector("HomologacaoProduto");
const mapStateToProps = state => {
  return {
    necessita_analise_sensorial: selector(state, "necessita_analise_sensorial")
  };
};

export default connect(mapStateToProps)(componentNameForm);
