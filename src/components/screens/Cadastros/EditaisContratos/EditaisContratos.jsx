import React, { Component } from "react";
import { reduxForm, FormSection } from "redux-form";
import { Link } from "react-router-dom";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import {
  getLotes,
  getDiretoriaregionalCombo
} from "../../../../services/diretoriaRegional.service";
import HTTP_STATUS from "http-status-codes";
import { criarEditalEContrato } from "../../../../services/edital.service";
import { ModalCadastroEdital } from "./ModalCadastroEdital";
import { getTerceirizada } from "../../../../services/terceirizada.service";
import {
  normalizaLabelValueLote,
  normalizaLabelValueDRE,
  normalizaLabelValueEmpresa
} from "./helper";
import { SectionFormEdital } from "./SectionFormEdital";
import ContratosRelacionados from "./ContratosRelacionados";
import "../style.scss";
import { toastError, toastSuccess } from "../../../Shareable/dialogs";

class EditaisContratos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: [],
      diretoriasRegionais: [],
      empresas: [],
      forms: ["secaoEdital0"],

      edital: {
        tipo_contratacao: null,
        numero: null,
        numero_processo: null,
        resumo: null
      },

      contratos_relacionados: [
        {
          vigencias: [
            {
              data_inicial: null,
              data_final: null
            }
          ],
          numero_contrato: null,
          processo_administrativo: null,
          data_proposta: null,
          lotes: null,
          lotes_nomes: null,
          dres: null,
          dres_nomes: null,
          empresas: null,
          empresas_nomes: null
        }
      ],
      exibirModal: false,
      edital_contratos: null,
      reseta: false
    };
    this.exibirModal = this.exibirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
    this.obtemDadosParaSubmit = this.obtemDadosParaSubmit.bind(this);
    this.adicionaVigenciaContrato = this.adicionaVigenciaContrato.bind(this);
    this.adicionaNumeroContrato = this.adicionaNumeroContrato.bind(this);
    this.adicionaFieldsFormEdital = this.adicionaFieldsFormEdital.bind(this);
    this.adicionarNomesListagem = this.adicionarNomesListagem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setaResetFormChild = this.setaResetFormChild.bind(this);
    this.excluirContratoRelacionado = this.excluirContratoRelacionado.bind(
      this
    );
  }

  excluirContratoRelacionado(indiceForm) {
    let contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados.splice(indiceForm, 1);
    let forms = this.state.forms;
    forms.splice(indiceForm, 1);
    this.setState({ contratos_relacionados, forms });
  }

  exibirModal() {
    this.setState({ exibirModal: true });
  }

  fecharModal(e) {
    this.setState({ exibirModal: false });
  }

  onSubmit(values) {
    criarEditalEContrato(JSON.stringify(values)).then(
      response => {
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Edital salvo com sucesso");
        } else {
          toastError("Houve um erro ao salvar o edital");
        }
      },
      function(error) {
        toastError("Houve um erro ao salvar o lote");
      }
    );
  }

  resetForm(value) {
    [
      "tipo_contratacao",
      "edital_numero",
      "processo_administrativo",
      "resumo_objeto"
    ].forEach(element => {
      this.props.change(element, null);
    });

    this.setState({ reseta: true });

    this.state.forms.forEach((form, index) => {
      this.props.change(`${form}.numero_contrato${index}`, null);
      this.props.change(`${form}.processo_administrativo${index}`, null);
      this.props.change(`${form}.data_proposta${index}`, null);
      this.state.contratos_relacionados[index].vigencias.forEach(
        (vigencia, key) => {
          this.props.change(
            `${form}.secaoContrato${key}.data_inicio${key}`,
            null
          );
          this.props.change(`${form}.secaoContrato${key}.data_fim${key}`, null);
        }
      );
    });

    this.state.forms.splice(1, Number.MAX_VALUE);

    this.state.contratos_relacionados.splice(1, Number.MAX_VALUE);

    let contratos_relacionados = [
      {
        vigencias: [
          {
            data_inicial: null,
            data_final: null
          }
        ],
        numero_contrato: null,
        processo_administrativo: null,
        data_proposta: null,
        lotes: null,
        lotes_nomes: null,
        dres: null,
        dres_nomes: null,
        empresas: null,
        empresas_nomes: null
      }
    ];

    this.setState({ contratos_relacionados });
  }

  adicionarNomesListagem(chave, valor, indice) {
    let contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[indice][chave] = valor;
    this.setState({ contratos_relacionados });
  }

  adicionaNumeroContrato(indice, numero_contrato) {
    const contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[indice].numero_contrato = numero_contrato;
    this.setState({
      contratos_relacionados
    });
  }

  adicionaFieldsFormEdital(field, value) {
    let edital = this.state.edital;
    edital[field] = value;
    this.setState({ edital });
  }

  validarForm(edital_contratos) {
    edital_contratos.contratos_relacionados.forEach(contrato => {
      if (
        contrato.lotes === null ||
        contrato.dres === null ||
        contrato.empresas === null
      ) {
        toastError("Verifique os itens obrigatórios no formulario");
      } else {
        this.setState({ edital_contratos });
        this.exibirModal();
      }
    });
  }

  salvaFormulario(values) {
    const edital_contratos = this.state.edital;
    edital_contratos[
      "contratos_relacionados"
    ] = this.state.contratos_relacionados;
    this.validarForm(edital_contratos);
  }

  obtemDadosParaSubmit(field, value, key) {
    let contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[key][field] = value;
    this.setState({ contratos_relacionados });
  }

  adicionaVigenciaContrato(indice, vigencias) {
    const contratos_relacionados = this.state.contratos_relacionados;
    contratos_relacionados[indice].vigencias = vigencias;
    this.setState({ contratos_relacionados });
  }

  adicionaContratosRelacionados() {
    this.setState({
      contratos_relacionados: this.state.contratos_relacionados.concat([
        {
          vigencias: [
            {
              data_inicial: null,
              data_final: null
            }
          ],
          numero_contrato: null,
          processo_administrativo: null,
          data_proposta: null,
          lotes: null,
          lotes_nomes: null,
          dres: null,
          dres_nomes: null,
          empresas: null,
          empresas_nomes: null
        }
      ])
    });
  }

  nomeFormAtual() {
    const indiceDoFormAtual = `secaoEdital${this.state.forms.length}`;
    let forms = this.state.forms;
    forms.push(indiceDoFormAtual);
    this.setState({ forms });
  }

  componentDidMount() {
    getLotes().then(response => {
      this.setState({ lotes: normalizaLabelValueLote(response.results) });
    });

    getDiretoriaregionalCombo().then(response => {
      this.setState({
        diretoriasRegionais: normalizaLabelValueDRE(response.data)
      });
    });

    getTerceirizada().then(response => {
      this.setState({
        empresas: normalizaLabelValueEmpresa(response.data.results)
      });
    });
  }

  setaResetFormChild() {
    this.setState({ reseta: false });
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      lotes,
      forms,
      diretoriasRegionais,
      empresas,
      exibirModal,
      edital_contratos,
      reseta,
      contratos_relacionados
    } = this.state;
    return (
      <section className="cadastro pt-3">
        <ModalCadastroEdital
          closeModal={this.fecharModal}
          showModal={exibirModal}
          edital_contratos={edital_contratos}
          onSubmit={this.onSubmit}
        />
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
            <SectionFormEdital
              adicionaFieldsFormEdital={this.adicionaFieldsFormEdital}
            />
            <hr />
            <nav className="titulo">Contratos relacionados</nav>
            {forms.map((formEdital, key) => {
              return (
                <FormSection
                  component={ContratosRelacionados}
                  lotes={lotes}
                  name={`secaoEdital${key}`}
                  nomeForm={formEdital}
                  diretoriasRegionais={diretoriasRegionais}
                  empresas={empresas}
                  obtemDadosParaSubmit={this.obtemDadosParaSubmit}
                  obtemLotesDresouEmpresas={this.obtemLotesDresouEmpresas}
                  indice={key}
                  adicionaVigenciaContrato={this.adicionaVigenciaContrato}
                  adicionaNumeroContrato={this.adicionaNumeroContrato}
                  adicionarNomesListagem={this.adicionarNomesListagem}
                  excluirContratoRelacionado={this.excluirContratoRelacionado}
                  reseta={reseta}
                  setaResetFormChild={this.setaResetFormChild}
                  contratos_relacionados={contratos_relacionados}
                />
              );
            })}

            <article className="card-body dados-editais">
              <BaseButton
                className="header-button"
                label="+ Adicionar outro contrato relacionado"
                style={ButtonStyle.OutlinePrimary}
                onClick={() => {
                  this.nomeFormAtual();
                  this.adicionaContratosRelacionados();
                }}
              />
            </article>

            <footer className="card-body">
              <div className="button-container">
                <div className="button-submit">
                  <BaseButton
                    label="Cancelar"
                    onClick={value => {
                      this.resetForm(value);
                    }}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={"Salvar"}
                    onClick={handleSubmit(values =>
                      this.salvaFormulario(values)
                    )}
                    className="ml-3"
                    type={ButtonType.SUBMIT}
                    style={ButtonStyle.Primary}
                  />
                </div>
              </div>
            </footer>
          </form>
        </div>
      </section>
    );
  }
}

export default reduxForm({
  form: "cadastroEditaisForm"
})(EditaisContratos);
