import React, { Component, Fragment } from "react";
import { Field } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { TextArea } from "../../../../Shareable/TextArea/TextArea";
import { Select } from "antd";
import {
  getMarcasProdutos,
  getFabricantesProdutos,
  criarMarcaProduto,
  criarFabricanteProduto
} from "../../../../../services/produto.service";
import "./style.scss";

import "antd/dist/antd.css";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants";

import ModalMarca from "./ModalMarca";
import ModalFabricante from "./ModalFabricante";

import { Step1EstaValido, retornaObjetoRequest } from "../helpers";

const { Option } = Select;

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      protocolosDieta: [],
      marcasArray: [],
      fabricantesArray: [],
      showModalMarca: false,
      showModalFabricante: false,
      loadingDefault: false,
      payloadStep1: {
        eh_para_alunos_com_dieta: null,
        protocolos: [],
        detalhes_da_dieta: null,
        nome: null,
        marca: null,
        fabricante: null,
        componentes: null,
        tem_aditivos_alergenicos: null,
        aditivos: null
      },

      dafaultArrayProtocolo: [],
      retornadoAoStep: false,
      marcaDefault: null
    };
    this.enviaMarca = this.enviaMarca.bind(this);
    this.closeModalMarca = this.closeModalMarca.bind(this);
    this.enviaFabricante = this.enviaFabricante.bind(this);
    this.closeModalFabricante = this.closeModalFabricante.bind(this);
  }

  abreOuFechaFormDietaEspecial = value => {
    let { payloadStep1 } = this.state;
    let condicao = false;
    if (value === 1) {
      condicao = true;
    } else {
      condicao = false;
    }
    payloadStep1.eh_para_alunos_com_dieta = condicao;
    this.props.mostrarFormDieta(condicao);
    this.setState({
      payloadStep1
    });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  abreOuFechaFormAlergenico = value => {
    let { payloadStep1 } = this.state;
    let condicao = false;
    if (value === 1) {
      condicao = true;
    } else {
      condicao = false;
    }
    payloadStep1.tem_aditivos_alergenicos = condicao;
    this.props.mostrarFormAlergenico(condicao);
    this.setState({
      payloadStep1
    });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  showModalMarca = () => {
    this.setState({
      showModalMarca: true
    });
  };

  closeModalMarca = () => {
    this.setState({
      showModalMarca: false
    });
  };

  enviaMarca = async value => {
    const { marcasArray } = this.state;
    if (value !== null) {
      if (value !== "") {
        const response = await criarMarcaProduto(value);
        const { nome, uuid } = response.data;
        marcasArray.push(<Option key={`${nome}+${uuid}`}>{nome}</Option>);
        this.setState({ loadingDefault: true });
        setTimeout(() => {
          this.setState({
            loadingDefault: false,
            showModalMarca: false,
            marcasArray
          });
        }, 1000);
      }
    }
  };

  showModalFabricante = () => {
    this.setState({
      showModalFabricante: true
    });
  };

  closeModalFabricante = () => {
    this.setState({
      showModalFabricante: false
    });
  };

  enviaFabricante = async value => {
    const { fabricantesArray } = this.state;
    if (value !== null) {
      if (value !== "") {
        const response = await criarFabricanteProduto(value);
        const { nome, uuid } = response.data;
        fabricantesArray.push(<Option key={`${nome}+${uuid}`}>{nome}</Option>);
        this.setState({ loadingDefault: true });
        setTimeout(() => {
          this.setState({
            loadingDefault: false,
            showModalFabricante: false,
            fabricantesArray
          });
        }, 1000);
      }
    }
  };

  componentDidUpdate = async () => {
    const { protocolosDieta, payload, concluidoStep1 } = this.props;
    const {
      loading,
      marcasArray,
      fabricantesArray,
      dafaultArrayProtocolo,
      retornadoAoStep
    } = this.state;
    let listaProtocolos = [];
    let listaMarcas = [];
    let listaFabricantes = [];
    if (Step1EstaValido(payload) && concluidoStep1 && !retornadoAoStep) {
      payload.protocolos.forEach(protocoloPayload => {
        protocolosDieta.forEach(protocolo => {
          if (protocoloPayload === protocolo.uuid) {
            dafaultArrayProtocolo.push(`${protocolo.nome}+${protocolo.uuid}`);
          }
        });
      });

      this.setState({
        payloadStep1: retornaObjetoRequest(payload),
        dafaultArrayProtocolo,
        retornadoAoStep: true
      });
    }

    if (marcasArray.length === 0 && loading && fabricantesArray.length === 0) {
      const responseMarcas = await getMarcasProdutos();
      const responseFabricantes = await getFabricantesProdutos();
      responseMarcas.data.results.forEach(marca => {
        listaMarcas.push(
          <Option key={`${marca.nome}+${marca.uuid}`}>{marca.nome}</Option>
        );
      });
      responseFabricantes.data.results.forEach(fabricante => {
        listaFabricantes.push(
          <Option key={`${fabricante.nome}+${fabricante.uuid}`}>
            {fabricante.nome}
          </Option>
        );
      });
      this.setState({
        marcasArray: listaMarcas,
        fabricantesArray: listaFabricantes,
        loading: false
      });
    }
    if (this.state.protocolosDieta.length === 0) {
      protocolosDieta.forEach(protocolo => {
        listaProtocolos.push(
          <Option key={`${protocolo.nome}+${protocolo.uuid}`}>
            {protocolo.nome}
          </Option>
        );
      });

      this.setState({
        protocolosDieta: listaProtocolos
      });
    }
  };

  extrairUuidString = string => {
    return string.split("+")[1];
  };

  addProtocolo = value => {
    let { payloadStep1 } = this.state;
    const uuid = this.extrairUuidString(value);
    payloadStep1.protocolos.push(uuid);
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  delProtocolo = value => {
    let { payloadStep1 } = this.state;
    const uuid = this.extrairUuidString(value);
    const index = payloadStep1.protocolos.indexOf(uuid);
    payloadStep1.protocolos.splice(index, 1);
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  setaCampoDetalhesDieta = value => {
    let { payloadStep1 } = this.state;
    payloadStep1.detalhes_da_dieta = value;
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  setaCampoDetalheAlergenico = value => {
    let { payloadStep1 } = this.state;
    payloadStep1.aditivos = value;
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  setaNomeProduto = value => {
    let { payloadStep1 } = this.state;
    payloadStep1.nome = value.toUpperCase();
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  setaNomeComponentes = value => {
    let { payloadStep1 } = this.state;
    payloadStep1.componentes = value.toUpperCase();
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  addMarca = value => {
    this.props.setDefaultMarcaStep1(value);
    let { payloadStep1 } = this.state;
    const uuid = this.extrairUuidString(value);
    payloadStep1.marca = uuid;
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  addFabricante = value => {
    this.props.setDefaultFabricanteStep1(value);
    let { payloadStep1 } = this.state;
    const uuid = this.extrairUuidString(value);
    payloadStep1.fabricante = uuid;
    this.setState({ payloadStep1 });
    this.props.setaAtributosPrimeiroStep(payloadStep1);
  };

  render() {
    const {
      protocolosDieta,
      marcasArray,
      fabricantesArray,
      showModalMarca,
      showModalFabricante,
      loadingDefault,
      dafaultArrayProtocolo
    } = this.state;
    const {
      renderizaFormDietaEspecial,
      renderizaFormAlergenicos,
      defaultMarcaStep1,
      defaultFabricanteStep1
    } = this.props;
    return (
      <div className="cadastro-produto-step1">
        <div className="card-title">Identificação do Produto</div>
        <div className="link-with-student">
          <div className="label">
            <span className="required-asterisk">*</span>O produto se destina ao
            atendimento de alunos com dieta especial?
          </div>
          <div className="row">
            <div className="col-3">
              <label className="container-radio">
                Sim
                <Field
                  component={"input"}
                  type="radio"
                  value="1"
                  name="eh_para_alunos_com_dieta"
                  onClick={() => {
                    this.abreOuFechaFormDietaEspecial(1);
                  }}
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
                  name="eh_para_alunos_com_dieta"
                  onClick={() => {
                    this.abreOuFechaFormDietaEspecial(0);
                  }}
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </div>

        {renderizaFormDietaEspecial && (
          <Fragment>
            <div className="row">
              <div className="col-6 pt-3">
                <label className="label-formulario-produto">
                  <nav>*</nav>Nome do protocolo de Dieta Especial
                </label>
                <Field
                  component={Select}
                  className={"select-form-produto"}
                  mode="multiple"
                  name="protocolos"
                  placeholder="Digite o nome do protocolo"
                  onSelect={this.addProtocolo}
                  onDeselect={this.delProtocolo}
                  defaultValue={dafaultArrayProtocolo}
                >
                  {protocolosDieta}
                </Field>
              </div>
            </div>

            <div className="row">
              <div className="col-12 pb-5">
                <Field
                  component={TextArea}
                  label={"Detalhes da Dieta Especial"}
                  name="detalhes_da_dieta"
                  onChange={event => {
                    this.setaCampoDetalhesDieta(event.target.value);
                  }}
                />
              </div>
            </div>
          </Fragment>
        )}

        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Nome do produto"
              name="nome"
              type="text"
              placeholder="Digite o nome do produto"
              onChange={event => {
                this.setaNomeProduto(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-5 pt-3">
            <label className="label-formulario-produto">
              <nav>*</nav>Marca do produto
            </label>
            <Field
              component={Select}
              className={"select-form-produto"}
              showSearch
              name="marca"
              onSelect={this.addMarca}
              defaultValue={defaultMarcaStep1}
            >
              {marcasArray}
            </Field>
          </div>
          <div className="col-1 adicionar-marca-fornecedor">
            <Botao
              texto="+"
              className={"botao-adicionar-marca-fabricante"}
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE_OUTLINE}
              onClick={() => {
                this.showModalMarca();
              }}
            />
          </div>
          <div className="col-5 pt-3">
            <label className="label-formulario-produto">
              <nav>*</nav>Nome do fabricante
            </label>
            <Field
              component={Select}
              className={"select-form-produto"}
              showSearch
              name="fabricante"
              onSelect={this.addFabricante}
              defaultValue={defaultFabricanteStep1}
            >
              {fabricantesArray}
            </Field>
          </div>
          <div className="col-1 adicionar-marca-fornecedor">
            <Botao
              texto="+"
              className={"botao-adicionar-marca-fabricante"}
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE_OUTLINE}
              onClick={() => {
                this.showModalFabricante();
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <Field
              component={InputText}
              label="Nome dos componentes do produto"
              name="componentes"
              type="text"
              placeholder="Digite o nome dos componentes"
              onChange={event => {
                this.setaNomeComponentes(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="link-with-student">
          <div className="label">
            <span className="required-asterisk">*</span>O produto contém ou pode
            conter ingredientes/aditivos alergênicos?
          </div>

          <div className="row">
            <div className="col-3">
              <label className="container-radio">
                Sim
                <Field
                  component={"input"}
                  type="radio"
                  value="1"
                  name="tem_aditivos_alergenicos"
                  onClick={() => {
                    this.abreOuFechaFormAlergenico(1);
                  }}
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
                  name="tem_aditivos_alergenicos"
                  onClick={() => {
                    this.abreOuFechaFormAlergenico(0);
                  }}
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>

          {renderizaFormAlergenicos && (
            <div className="row">
              <div className="col-12 pb-5">
                <Field
                  component={TextArea}
                  label={"Quais?"}
                  name="aditivos"
                  onChange={event => {
                    this.setaCampoDetalheAlergenico(event.target.value);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-5">
            <div className="card-warning mt-3">
              <strong>IMPORTANTE:</strong> Relacioná-los conforme dispõe a RDC
              nº 26 de 02/07/15
            </div>
          </div>
        </div>
        <ModalMarca
          visible={showModalMarca}
          loading={loadingDefault}
          closeModal={this.closeModalMarca}
          onSubmit={this.enviaMarca}
        />
        <ModalFabricante
          visible={showModalFabricante}
          loading={loadingDefault}
          closeModal={this.closeModalFabricante}
          onSubmit={this.enviaFabricante}
        />
      </div>
    );
  }
}

export default Step1;
