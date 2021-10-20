import HTTP_STATUS from "http-status-codes";
import React, { Component, Fragment } from "react";
import moment from "moment";
import { Spin } from "antd";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm, FormSection } from "redux-form";
import { PERFIL } from "../../../../constants/shared";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { getError, cpfMask } from "helpers/utilities";
import {
  required,
  tamanhoCnpj,
  validaCPF,
  email,
  cep
} from "../../../../helpers/fieldValidators";
import "../style.scss";
import "./style.scss";
import { getLotesSimples } from "../../../../services/lote.service";
import {
  createTerceirizada,
  getTerceirizadaUUID,
  updateTerceirizada
} from "../../../../services/terceirizada.service";
import { transformaObjetos, fieldCnpj, formataJsonParaEnvio } from "./helper";
import { toastSuccess, toastError } from "../../../Shareable/Toast/dialogs";
import TelefoneOuCelular from "../../../Shareable/Input/InputTelefone";
import InputPhoneNumber from "../../../Shareable/Input/InputPhoneNumber";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import { Botao } from "../../../Shareable/Botao";
import { InputText } from "../../../Shareable/Input/InputText";
import Select from "../../../Shareable/Select";
import { loadEmpresa } from "../../../../reducers/empresa.reducer";
import { ModalCadastroEmpresa } from "./components/ModalCadastroEmpresa";
import { finalizarVinculoTerceirizadas } from "../../../../services/permissoes.service";
import { getEnderecoPorCEP } from "../../../../services/cep.service";

const ENTER = 13;
class CadastroEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotes: "",
      exibirModal: false,
      tituloModal: "Confirma cadastro de Empresa?",
      valoresForm: null,
      lotesSelecionados: [],
      lotesNomesSelecionados: [],
      formValido: false,
      contatosEmpresaForm: ["contatoEmpresa_0"],
      contatosPessoaEmpresaForm: ["contatoPessoaEmpresa_0"],
      contatosTerceirizadaForm: ["contatoTerceirizada_0"],
      editaisContratosForm: ["editalContrato_0"],
      ehDistribuidor: false,
      contatosEmpresa: [
        {
          telefone: null,
          email: ""
        }
      ],
      contatosPessoaEmpresa: [
        {
          nome: "",
          telefone: null,
          email: ""
        }
      ],

      uuid: null,
      redirect: false,

      contatosNutricionista: [
        {
          vinculo_atual: null,
          telefone: null,
          responsavel: null,
          crn: null,
          email: null,
          super_admin_terceirizadas: false
        }
      ],

      telefoneRepresentante: null,
      qtdField: 8,
      carregando: false,
      dadosEndereco: {
        request: null,
        endereco: null,
        bairro: null,
        cidade: null,
        estado: null,
        desabilitado: true
      }
    };
    this.setaContatosEmpresa = this.setaContatosEmpresa.bind(this);
    this.setaContatosPessoaEmpresa = this.setaContatosPessoaEmpresa.bind(this);
    this.setaContatoRepresentante = this.setaContatoRepresentante.bind(this);
    this.setaContatosNutricionista = this.setaContatosNutricionista.bind(this);
    this.exibirModal = this.exibirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  exibirModal(values) {
    this.setState({
      exibirModal: true,
      valoresForm: values
    });
  }

  fecharModal() {
    this.setState({ exibirModal: false });
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/configuracoes/cadastros/empresas-cadastradas" />;
    }
  };

  excluirNutricionista(indice) {
    if (this.state.contatosNutricionista[indice].vinculo_atual) {
      if (window.confirm("Deseja realmente desativar este nutricionista?")) {
        const { uuid } = this.state;
        finalizarVinculoTerceirizadas(
          uuid,
          this.state.contatosNutricionista[indice].vinculo_atual.uuid
        ).then(response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Vínculo finalizado com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toastError(response.data.detail);
          }
        });
      }
    } else {
      let contatosNutricionista = this.state.contatosNutricionista;
      let contatosTerceirizadaForm = this.state.contatosTerceirizadaForm;
      contatosNutricionista.splice(indice, 1);
      contatosTerceirizadaForm.splice(indice, 1);
      this.setState({ contatosNutricionista, contatosTerceirizadaForm });
    }
  }

  nomeFormContatoEmpresa() {
    const indiceDoFormAtual = `contatoEmpresa_${
      this.state.contatosEmpresaForm.length
    }`;
    let contatosEmpresaForm = this.state.contatosEmpresaForm;
    contatosEmpresaForm.push(indiceDoFormAtual);
    this.setState({ contatosEmpresaForm });
  }

  nomeFormContatoPessoaEmpresa() {
    const indiceDoFormAtual = `contatoPessoaEmpresa_${
      this.state.contatosPessoaEmpresaForm.length
    }`;
    let contatosPessoaEmpresaForm = this.state.contatosPessoaEmpresaForm;
    contatosPessoaEmpresaForm.push(indiceDoFormAtual);
    this.setState({ contatosPessoaEmpresaForm });
  }

  nomeFormContatoTerceirizada() {
    const indiceDoFormAtual = `contatoTerceirizada_${
      this.state.contatosTerceirizadaForm.length
    }`;
    let contatosTerceirizadaForm = this.state.contatosTerceirizadaForm;
    contatosTerceirizadaForm.push(indiceDoFormAtual);
    this.setState({ contatosTerceirizadaForm });
  }

  nomeFormContatoEdital() {
    const indiceDoFormAtual = `editalContrato_${
      this.state.editaisContratosForm.length
    }`;
    let editaisContratosForm = this.state.editaisContratosForm;
    editaisContratosForm.push(indiceDoFormAtual);
    this.setState({ editaisContratosForm });
  }

  setaContatosEmpresa(input, event, indice) {
    let contatosEmpresa = this.state.contatosEmpresa;
    contatosEmpresa[indice][input] = event ? event : "";
    this.setState({ contatosEmpresa });
  }

  setaContatosPessoaEmpresa(input, event, indice) {
    let contatosPessoaEmpresa = this.state.contatosPessoaEmpresa;
    contatosPessoaEmpresa[indice][input] = event ? event : "";
    this.setState({ contatosPessoaEmpresa });
  }

  setaContatosNutricionista(input, event, indice) {
    let contatosNutricionista = this.state.contatosNutricionista;
    contatosNutricionista[indice][input] = event;
    this.setState({ contatosNutricionista });
  }

  setAdminNutricionista(indice) {
    let contatosNutricionista = this.state.contatosNutricionista;
    contatosNutricionista.forEach((contato, key) => {
      contato.super_admin_terceirizadas = key === indice;
    });
    this.setState({ contatosNutricionista });
  }

  setaContatoRepresentante(event) {
    let telefoneRepresentante = this.state.telefoneRepresentante;
    telefoneRepresentante = event;
    this.setState({ telefoneRepresentante });
  }

  adicionaContatoEmpresa() {
    this.setState({
      contatosEmpresa: this.state.contatosEmpresa.concat([
        {
          telefone: "",
          email: ""
        }
      ])
    });
  }

  adicionaContatoPessoaEmpresa() {
    this.setState({
      contatosPessoaEmpresa: this.state.contatosPessoaEmpresa.concat([
        {
          telefone: "",
          email: ""
        }
      ])
    });
  }

  adicionaContatoNutricionista() {
    this.setState({
      contatosNutricionista: this.state.contatosNutricionista.concat([
        {
          vinculo_atual: null,
          telefone: null,
          responsavel: null,
          crn: null,
          email: null
        }
      ])
    });
  }

  atribuiContatosEmpresaForm(contatos) {
    contatos
      .filter(contato => !contato.nome)
      .forEach((contato, indice) => {
        let contatosEmpresaForm = this.state.contatosEmpresaForm;
        let contatosEmpresa = this.state.contatosEmpresa;
        if (indice !== 0 && contatos.length > contatosEmpresaForm.length) {
          contatosEmpresaForm.push(`contatoEmpresa_${indice}`);
          contatosEmpresa.push({
            telefone: null,
            email: null
          });
        }
        this.setState({ contatosEmpresaForm });

        contatosEmpresa[indice]["email"] = contato.email;
        contatosEmpresa[indice]["telefone"] = contato.telefone;

        this.setState({ contatosEmpresa });

        this.props.change(
          `contatoEmpresa_${indice}.telefone_empresa_${indice}`,
          contato.telefone
        );
        this.props.change(
          `contatoEmpresa_${indice}.email_empresa_${indice}`,
          contato.email
        );
      });
  }

  atribuiContatosPessoaEmpresaForm(contatos) {
    contatos
      .filter(contato => contato.nome)
      .forEach((contato, indice) => {
        let contatosPessoaEmpresaForm = this.state.contatosPessoaEmpresaForm;
        let contatosPessoaEmpresa = this.state.contatosPessoaEmpresa;
        if (
          indice !== 0 &&
          contatos.length > contatosPessoaEmpresaForm.length
        ) {
          contatosPessoaEmpresaForm.push(`contatoPessoaEmpresa_${indice}`);
          contatosPessoaEmpresa.push({
            telefone: null,
            email: null
          });
        }
        this.setState({ contatosPessoaEmpresaForm });

        contatosPessoaEmpresa[indice]["nome"] = contato.email;
        contatosPessoaEmpresa[indice]["email"] = contato.email;
        contatosPessoaEmpresa[indice]["telefone"] = contato.telefone;

        this.setState({ contatosPessoaEmpresa });

        this.props.change(
          `contatoPessoaEmpresa_${indice}.nome_contato_${indice}`,
          contato.email
        );
        this.props.change(
          `contatoPessoaEmpresa_${indice}.telefone_contato_${indice}`,
          contato.telefone
        );
        this.props.change(
          `contatoPessoaEmpresa_${indice}.email_contato_${indice}`,
          contato.email
        );
      });
  }

  atribuiNutricionistaEmpresaForm(nutricionistas) {
    nutricionistas.forEach((nutri, indice) => {
      let contatosNutricionista = this.state.contatosNutricionista;
      let contatosTerceirizadaForm = this.state.contatosTerceirizadaForm;
      if (
        indice !== 0 &&
        nutricionistas.length > contatosNutricionista.length
      ) {
        contatosTerceirizadaForm.push(`contatoTerceirizada_${indice}`);
        contatosNutricionista.push({
          telefone: null,
          responsavel: null,
          crn: null,
          email: null
        });
      }
      contatosNutricionista[indice]["telefone"] =
        nutri.contatos.length === 0 ? null : nutri.contatos[0].telefone;
      contatosNutricionista[indice]["responsavel"] = nutri.nome;
      contatosNutricionista[indice]["crn"] = nutri.crn_numero;
      contatosNutricionista[indice]["vinculo_atual"] = nutri.vinculo_atual;
      contatosNutricionista[indice]["super_admin_terceirizadas"] =
        nutri.super_admin_terceirizadas;
      contatosNutricionista[indice]["email"] =
        nutri.contatos.length === 0 ? null : nutri.contatos[0].email;

      this.setState({ contatosNutricionista });

      this.props.change(
        `contatoTerceirizada_${indice}.nutricionista_nome_${indice}`,
        nutri.nome
      );
      this.props.change(
        `contatoTerceirizada_${indice}.nutricionista_crn_${indice}`,
        nutri.crn_numero
      );
      this.props.change(
        `contatoTerceirizada_${indice}.telefone_terceirizada_${indice}`,
        nutri.contatos.length === 0 ? null : nutri.contatos[0].telefone
      );
      this.props.change(
        `contatoTerceirizada_${indice}.email_terceirizada_${indice}`,
        nutri.contatos.length === 0 ? null : nutri.contatos[0].email
      );
    });
  }

  setaValoresForm(data) {
    const super_admin = data.super_admin;
    this.props.change("cep", data.cep);
    this.props.change("cnpj", data.cnpj);
    this.props.change("nome_fantasia", data.nome_fantasia);
    this.props.change("razao_social", data.razao_social);
    this.props.change("endereco", data.endereco);
    this.props.change("representante_legal", data.representante_legal);
    this.props.change("email_representante_legal", data.representante_email);
    this.props.change("telefone_representante", data.representante_telefone);
    if (super_admin) {
      const super_admin_contato = data.super_admin.contatos.pop();
      this.props.change(
        "super_admin.nome",
        data.super_admin.nome ? data.super_admin.nome : undefined
      );
      this.props.change("super_admin.email", data.super_admin.email);
      this.props.change("super_admin.cpf", data.super_admin.cpf);
      this.props.change("super_admin.cargo", data.super_admin.cargo);
      this.props.change(
        "super_admin.telefone",
        super_admin_contato ? super_admin_contato.telefone : undefined
      );
    }
    this.props.change("bairro", data.bairro);
    this.props.change("cidade", data.cidade);
    this.props.change("estado", data.estado);
    this.props.change("numero", data.numero);
    this.props.change("complemento", data.complemento);
    this.props.change("eh_distribuidor", data.eh_distribuidor);
    if (data.eh_distribuidor) {
      this.setState({ ehDistribuidor: true });
      this.props.change("numero_contrato", data.numero_contrato);
      this.props.change("tipo_alimento", data.tipo_alimento);
      this.props.change("tipo_empresa", data.tipo_empresa);
      this.props.change("situacao", data.ativo);
      this.props.change(
        "data_cadastro",
        moment(data.criado_em, "DD/MM/YYYY").format("DD/MM/YYYY")
      );
    }
    this.props.change("responsavel_nome", data.responsavel_nome);
    this.props.change("responsavel_email", data.responsavel_email);
    this.props.change("responsavel_cpf", data.responsavel_cpf);
    this.props.change("responsavel_telefone", data.responsavel_telefone);
    this.props.change("responsavel_cargo", data.responsavel_cargo);
    this.atribuiContatosEmpresaForm(data.contatos);
    this.atribuiContatosPessoaEmpresaForm(data.contatos);
    this.atribuiNutricionistaEmpresaForm(data.nutricionistas);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) this.setState({ carregando: true });
    getLotesSimples().then(response => {
      let lotes = transformaObjetos(response);
      this.setState({ lotes });
    });
  }

  inciaFormEndereco = () => {
    const { dadosEndereco } = this.state;
    const { change } = this.props;
    if (dadosEndereco.request !== null) {
      if (dadosEndereco.request) {
        change("endereco", dadosEndereco.endereco);
        change("bairro", dadosEndereco.bairro);
        change("cidade", dadosEndereco.cidade);
        change("estado", dadosEndereco.estado);
      } else {
        dadosEndereco.desabilitado = false;
        this.setState({ dadosEndereco });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    let lotes = this.state.lotes;
    const tipoPerfil = localStorage.getItem("perfil");
    let validate = false;
    if (tipoPerfil === PERFIL.COORDENADOR_GESTAO_ALIMENTACAO_TERCEIRIZADA) {
      validate = false;
    } else if (tipoPerfil === PERFIL.COORDENADOR_LOGISTICA) {
      validate = true;
    } else {
      validate = false;
    }
    this.inciaFormEndereco();
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (lotes !== prevState.lotes) {
      if (uuid) {
        const tituloModal = "Confirma atualização de Empresa?";
        this.setState({ uuid, tituloModal });
        getTerceirizadaUUID(uuid).then(response => {
          if (response.status !== HTTP_STATUS.NOT_FOUND) {
            this.props.reset();
            let lotesNomesSelecionados = [];
            let lotesSelecionados = [];
            response.data.lotes.forEach(lote => {
              lotesNomesSelecionados.push(lote.nome);
              lotesSelecionados.push(lote.uuid);
            });
            this.setState({
              lotesNomesSelecionados,
              lotesSelecionados
            });
          }
          this.setState({ carregando: false });
          this.setaValoresForm(response.data);
        });
      } else {
        this.props.change("data_cadastro", moment().format("DD/MM/YYYY"));
        this.setState({
          uuid: null,
          redirect: false,
          carregando: false,
          ehDistribuidor: validate
        });
      }
    }
    if (this.state.ehDistribuidor !== prevState.ehDistribuidor) {
      this.setState({ ehDistribuidor: validate });
    }
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

  lidarComSelecionados(values) {
    const lotes = this.state.lotes;
    let lotesNomesSelecionados = [];
    values.forEach(value => {
      const indice = lotes.findIndex(lote => lote.uuid === value);
      lotesNomesSelecionados.push(lotes[indice].label);
    });

    this.setState({
      lotesNomesSelecionados,
      lotesSelecionados: values
    });
  }

  resetForm() {
    this.props.reset();
  }

  salvaFormulario() {
    this.resetForm();
    this.setState({ lotesSelecionados: [] });
  }

  onSubmit(values) {
    const uuid = this.state.uuid;

    const request = formataJsonParaEnvio(values, this.state);

    if (uuid !== null) {
      updateTerceirizada(uuid, request).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Empresa atualizada com sucesso!");
          this.setRedirect();
          this.resetForm();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(
            `Erro ao atualizar cadastro de empresa: ${getError(response.data)}.`
          );
        } else {
          toastError(`Erro ao atualizar cadastro de empresa`);
        }
      });
    } else {
      createTerceirizada(request).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Empresa cadastrada com sucesso!");
          this.setRedirect();
          this.resetForm();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(`Erro ao cadastrar empresa: ${getError(response.data)}.`);
        } else {
          toastError(`Erro ao cadastrar empresa`);
        }
      });
    }
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  onCheckClicked() {
    const { ehDistribuidor } = this.state;
    this.props.change("eh_distribuidor", !ehDistribuidor);
    this.setState({ ehDistribuidor: !ehDistribuidor });
  }

  temTracos = value => {
    const { qtdField } = this.state;
    const valid = value.indexOf("-") > -1;
    if (valid) {
      this.setState({ qtdField: 9 });
    } else {
      if (qtdField !== 8) {
        this.setState({ qtdField: 8 });
      }
    }
    return valid;
  };

  buscaCep = async value => {
    const { dadosEndereco } = this.state;
    if (value.length === 8 && !this.temTracos(value)) {
      const response = await getEnderecoPorCEP(value);
      if (response.status === HTTP_STATUS.OK && !response.data.erro) {
        const { data } = response;
        dadosEndereco.desabilitado = true;
        dadosEndereco.bairro = data.bairro;
        dadosEndereco.cidade = data.localidade;
        dadosEndereco.endereco = data.logradouro;
        dadosEndereco.estado = data.uf;
        dadosEndereco.request = true;
      } else {
        dadosEndereco.desabilitado = false;
        dadosEndereco.bairro = null;
        dadosEndereco.cidade = null;
        dadosEndereco.endereco = null;
        dadosEndereco.estado = null;
      }
    } else if (value.length === 9 && this.temTracos(value)) {
      const response = await getEnderecoPorCEP(value);
      if (response.status === HTTP_STATUS.OK && !response.data.erro) {
        const { data } = response;
        dadosEndereco.desabilitado = true;
        dadosEndereco.bairro = data.bairro;
        dadosEndereco.cidade = data.localidade;
        dadosEndereco.endereco = data.logradouro;
        dadosEndereco.estado = data.uf;
        dadosEndereco.request = true;
      } else {
        dadosEndereco.desabilitado = false;
        dadosEndereco.bairro = null;
        dadosEndereco.cidade = null;
        dadosEndereco.endereco = null;
        dadosEndereco.estado = null;
      }
    } else {
      dadosEndereco.desabilitado = true;
      dadosEndereco.bairro = null;
      dadosEndereco.cidade = null;
      dadosEndereco.endereco = null;
      dadosEndereco.estado = null;
    }
    this.setState({ dadosEndereco });
  };

  render() {
    const { handleSubmit } = this.props;
    const {
      contatosEmpresaForm,
      contatosPessoaEmpresaForm,
      contatosTerceirizadaForm,
      contatosNutricionista,
      lotes,
      lotesSelecionados,
      lotesNomesSelecionados,
      uuid,
      valoresForm,
      exibirModal,
      tituloModal,
      carregando,
      ehDistribuidor,
      dadosEndereco,
      qtdField
    } = this.state;
    return (
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="cadastro pt-3">
          {this.renderRedirect()}
          <ModalCadastroEmpresa
            titulo={tituloModal}
            values={valoresForm}
            onSubmit={this.onSubmit}
            closeModal={this.fecharModal}
            showModal={exibirModal}
          />
          <form onSubmit={handleSubmit} onKeyPress={this.onKeyPress}>
            <div className="card">
              <div>
                <div className="card-body">
                  <div className="card-title font-weight-bold">
                    Dados da Empresa
                  </div>
                  <div className="row pt-3">
                    <div className="col-12">
                      <Link to="/configuracoes/cadastros/empresas-cadastradas">
                        <Botao
                          texto="Consulta de empresas cadastradas"
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                      </Link>
                    </div>
                  </div>
                  {ehDistribuidor && (
                    <div className="row pt-3">
                      <div className="col-3">
                        <Field
                          component={InputText}
                          label="Data de Cadastro"
                          name="data_cadastro"
                          disabled
                        />
                      </div>
                    </div>
                  )}
                  <div className="row pt-3">
                    <div className="col-9">
                      <Field
                        component={InputText}
                        label="Razão social"
                        name="razao_social"
                        required
                        validate={required}
                        maxlength="150"
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        {...fieldCnpj}
                        component={InputText}
                        label="CNPJ"
                        name="cnpj"
                        required
                        validate={[required, tamanhoCnpj]}
                      />
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-9">
                      <Field
                        component={InputText}
                        label="Nome Fantasia"
                        name="nome_fantasia"
                        validate={required}
                        required
                        maxlength="150"
                      />
                    </div>
                  </div>
                  {ehDistribuidor && (
                    <div className="row pt-3">
                      <div className="col-6">
                        <Field
                          component={InputText}
                          label="Número de Contrato"
                          name="numero_contrato"
                          validate={required}
                          required
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={Select}
                          label="Tipo de Empresa"
                          name="tipo_empresa"
                          validate={required}
                          required
                          naoDesabilitarPrimeiraOpcao
                          options={[
                            {
                              nome: "Selecione...",
                              uuid: ""
                            },
                            {
                              nome: "Armazém/Distribuidor",
                              uuid: "ARMAZEM/DISTRIBUIDOR"
                            },
                            {
                              nome: "Fornecedor/Distribuidor",
                              uuid: "FORNECEDOR/DISTRIBUIDOR"
                            }
                          ]}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={Select}
                          label="Tipo de Alimento"
                          name="tipo_alimento"
                          validate={required}
                          required
                          naoDesabilitarPrimeiraOpcao
                          options={[
                            {
                              nome: "Selecione...",
                              uuid: ""
                            },
                            {
                              nome: "Congelados e resfriados",
                              uuid: "CONGELADOS_E_RESFRIADOS"
                            },
                            {
                              nome: "FLVO",
                              uuid: "FLVO"
                            },
                            {
                              nome: "Pães & bolos",
                              uuid: "PAES_E_BOLO"
                            },
                            {
                              nome: "Secos",
                              uuid: "SECOS"
                            }
                          ]}
                        />
                      </div>
                    </div>
                  )}

                  <div className="row pt-3">
                    <div className="col-3">
                      <Field
                        label="CEP"
                        name={`cep`}
                        component={InputText}
                        required
                        maxlength={qtdField}
                        onChange={event => {
                          this.buscaCep(event.target.value);
                        }}
                        validate={qtdField === 8 ? required : [required, cep]}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        component={InputText}
                        label="Endereço"
                        name="endereco"
                        validate={required}
                        required
                        disabled={dadosEndereco.desabilitado}
                        maxlength="150"
                      />
                    </div>

                    <div className="col-3">
                      <Field
                        component={InputText}
                        label="Complemento"
                        name="complemento"
                        maxlength="45"
                      />
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="col-3">
                      <Field
                        component={InputText}
                        label="Bairro"
                        name="bairro"
                        required
                        validate={required}
                        disabled={dadosEndereco.desabilitado}
                        maxlength="140"
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        component={InputText}
                        label="Cidade"
                        name="cidade"
                        validate={required}
                        required
                        disabled={dadosEndereco.desabilitado}
                        maxlength="140"
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        component={InputText}
                        label="Estado"
                        name="estado"
                        validate={required}
                        required
                        disabled={dadosEndereco.desabilitado}
                        maxlength="140"
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        component={InputText}
                        label="Número"
                        name="numero"
                        maxlength="5"
                      />
                    </div>
                  </div>

                  <div className="container-fields row">
                    <div className="col-11">
                      {contatosEmpresaForm.map(
                        (contatoEmpresa, indiceEmpresa) => {
                          return (
                            <FormSection
                              nomeForm={`contatoEmpresa_${indiceEmpresa}`}
                              name={contatoEmpresa}
                              key={indiceEmpresa}
                            >
                              <div className="fields-set">
                                <div>
                                  <Field
                                    name={`telefone_empresa_${indiceEmpresa}`}
                                    component={TelefoneOuCelular}
                                    label="Telefone"
                                    id={`telefone_empresa_${indiceEmpresa}`}
                                    setaContatosEmpresa={
                                      this.setaContatosEmpresa
                                    }
                                    indice={indiceEmpresa}
                                    cenario="contatoEmpresa"
                                    validate={required}
                                    required
                                    maxlength="140"
                                  />
                                </div>
                                <div>
                                  <Field
                                    name={`email_empresa_${indiceEmpresa}`}
                                    component={InputText}
                                    label="E-mail"
                                    validate={email}
                                    onChange={event =>
                                      this.setaContatosEmpresa(
                                        "email",
                                        event.target.value,
                                        indiceEmpresa
                                      )
                                    }
                                    maxlength="140"
                                  />
                                </div>
                              </div>
                            </FormSection>
                          );
                        }
                      )}
                    </div>
                    <div className={`col-1 mt-auto mb-1`}>
                      <Botao
                        texto="+"
                        type={BUTTON_TYPE.BUTTON}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        onClick={() => {
                          this.nomeFormContatoEmpresa();
                          this.adicionaContatoEmpresa();
                        }}
                      />
                    </div>
                  </div>
                </div>

                <hr className="linha-form" />

                {!ehDistribuidor && (
                  <FormSection name={"super_admin"}>
                    <div className="card-body">
                      <div className="card-title font-weight-bold">
                        Principal administrador do sistema
                      </div>
                      <div className="row">
                        <div className="col">
                          <Field
                            name={`email`}
                            component={InputText}
                            label="E-mail"
                            type="email"
                            required
                            validate={[required, email]}
                            maxlength="140"
                          />
                        </div>
                        <div className="col">
                          <Field
                            name={`nome`}
                            component={InputText}
                            label={"Nome"}
                            validate={required}
                            required
                            maxlength="140"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <Field
                            {...cpfMask}
                            name={`cpf`}
                            component={InputText}
                            label="CPF"
                            required
                            validate={[required, validaCPF]}
                          />
                        </div>
                        <div className="col">
                          <Field
                            name={`telefone`}
                            component={InputPhoneNumber}
                            label={"Telefone"}
                            validate={required}
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Field
                            name={`cargo`}
                            component={InputText}
                            label="Cargo"
                            required
                            validate={required}
                            maxlength="50"
                          />
                        </div>
                      </div>
                    </div>
                  </FormSection>
                )}

                <hr className="linha-form" />

                <div>
                  <div className="card-body">
                    {ehDistribuidor ? (
                      <Fragment>
                        <div className="card-title font-weight-bold">
                          Cadastro do Usuário Responsável pelo acesso ao Sistema
                        </div>
                        <div className="row">
                          <div className="col-7">
                            <Field
                              component={InputText}
                              label="Nome"
                              name="responsavel_nome"
                              required
                              validate={required}
                              maxlength="150"
                            />
                          </div>
                          <div className="col-5">
                            <Field
                              component={InputText}
                              label="Email"
                              name="responsavel_email"
                              type="email"
                              required
                              validate={[required, email]}
                              maxlength="150"
                            />
                          </div>
                        </div>
                        <div className="row pt-3">
                          <div className="col-4">
                            <Field
                              {...cpfMask}
                              component={InputText}
                              label="CPF"
                              name="responsavel_cpf"
                              required
                              validate={[required, validaCPF]}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Cargo"
                              name="responsavel_cargo"
                              required
                              validate={required}
                              maxlength="40"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={TelefoneOuCelular}
                              label="Telefone"
                              name="responsavel_telefone"
                              cenario="distribuidor"
                              required
                              validate={required}
                            />
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="row">
                          <div className="col-7">
                            <Field
                              component={InputText}
                              label="Representante Legal"
                              name="representante_legal"
                              required
                              validate={required}
                              maxlength="140"
                            />
                          </div>
                          <div className="col-5">
                            <Field
                              name={`telefone_representante`}
                              label="Telefone"
                              component={TelefoneOuCelular}
                              id={`telefone_representante`}
                              setaContatoRepresentante={
                                this.setaContatoRepresentante
                              }
                              cenario="contatoRepresentante"
                            />
                          </div>
                        </div>
                        <div className="row pt-3">
                          <div className="col-7">
                            <Field
                              component={InputText}
                              label="E-mail"
                              name="email_representante_legal"
                              validate={email}
                              maxlength="140"
                            />
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>

                <hr className="linha-form" />

                {ehDistribuidor && (
                  <Fragment>
                    <div>
                      <div className="card-body">
                        <div className="card-title font-weight-bold">
                          Contatos
                        </div>

                        <div className="container-fields row">
                          <div className="col-11">
                            {contatosPessoaEmpresaForm.map(
                              (contatoEmpresa, indiceEmpresa) => {
                                return (
                                  <FormSection
                                    nomeForm={`contatoPessoaEmpresa_${indiceEmpresa}`}
                                    name={contatoEmpresa}
                                    key={indiceEmpresa}
                                  >
                                    <div className="fields-set-contatos">
                                      <div>
                                        <Field
                                          name={`nome_contato_${indiceEmpresa}`}
                                          component={InputText}
                                          label="Nome"
                                          required
                                          validate={required}
                                          onChange={event =>
                                            this.setaContatosPessoaEmpresa(
                                              "nome",
                                              event.target.value,
                                              indiceEmpresa
                                            )
                                          }
                                          maxlength="140"
                                        />
                                      </div>
                                      <div>
                                        <Field
                                          name={`telefone_contato_${indiceEmpresa}`}
                                          component={TelefoneOuCelular}
                                          label="Telefone"
                                          id={`telefone_contato_${indiceEmpresa}`}
                                          setaContatosEmpresa={
                                            this.setaContatosPessoaEmpresa
                                          }
                                          indice={indiceEmpresa}
                                          cenario="contatoEmpresa"
                                          validate={required}
                                          required
                                          maxlength="140"
                                        />
                                      </div>
                                      <div>
                                        <Field
                                          name={`email_contato_${indiceEmpresa}`}
                                          component={InputText}
                                          label="E-mail"
                                          validate={email}
                                          onChange={event =>
                                            this.setaContatosPessoaEmpresa(
                                              "email",
                                              event.target.value,
                                              indiceEmpresa
                                            )
                                          }
                                          maxlength="140"
                                        />
                                      </div>
                                    </div>
                                  </FormSection>
                                );
                              }
                            )}
                          </div>
                          <div className={`col-1 mt-auto mb-1`}>
                            <Botao
                              texto="+"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                              onClick={() => {
                                this.nomeFormContatoPessoaEmpresa();
                                this.adicionaContatoPessoaEmpresa();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="linha-form" />
                    <div className="card-body">
                      <div className="w-25">
                        <Field
                          component={Select}
                          label="Situação"
                          name="situacao"
                          validate={required}
                          required
                          options={[
                            {
                              nome: "Selecione...",
                              uuid: ""
                            },
                            {
                              nome: "Ativo",
                              uuid: true
                            },
                            {
                              nome: "Inativo",
                              uuid: false
                            }
                          ]}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}

                {!ehDistribuidor && (
                  <div>
                    <hr className="linha-form" />
                    <div className="card-body">
                      <div className="container-fields">
                        <div className="fields">
                          {contatosTerceirizadaForm.map(
                            (contatoTerceirizada, indiceTerceirizada) => {
                              return (
                                <FormSection
                                  nomeForm={`contatoTerceirizada_${indiceTerceirizada}`}
                                  name={contatoTerceirizada}
                                  key={indiceTerceirizada}
                                >
                                  {indiceTerceirizada > 0 && <hr />}
                                  <div className="form-section-terceirizada">
                                    <div className="section-nutri-crn">
                                      <div>
                                        <Field
                                          name={`nutricionista_nome_${indiceTerceirizada}`}
                                          component={InputText}
                                          label="Nutricionista Responsável Técnico"
                                          required
                                          validate={required}
                                          onChange={event =>
                                            this.setaContatosNutricionista(
                                              "responsavel",
                                              event.target.value,
                                              indiceTerceirizada
                                            )
                                          }
                                          maxlength="140"
                                        />
                                      </div>
                                      <div>
                                        <Field
                                          name={`nutricionista_crn_${indiceTerceirizada}`}
                                          label="CRN"
                                          component={InputText}
                                          onChange={event =>
                                            this.setaContatosNutricionista(
                                              "crn",
                                              event.target.value,
                                              indiceTerceirizada
                                            )
                                          }
                                          required
                                          validate={required}
                                          maxlength="140"
                                        />
                                      </div>
                                      {contatosNutricionista.length > 1 && (
                                        <div className="trash">
                                          <i
                                            onClick={() =>
                                              this.excluirNutricionista(
                                                indiceTerceirizada
                                              )
                                            }
                                            className="fas fa-trash"
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div className="section-nutri-contato pt-2">
                                      <div>
                                        <Field
                                          name={`telefone_terceirizada_${indiceTerceirizada}`}
                                          component={TelefoneOuCelular}
                                          label="Telefone/Celular Técnico"
                                          id={`telefone_terceirizada_${indiceTerceirizada}`}
                                          setaContatosNutricionista={
                                            this.setaContatosNutricionista
                                          }
                                          indice={indiceTerceirizada}
                                          required
                                          validate={required}
                                        />
                                      </div>
                                      <div>
                                        <Field
                                          name={`email_terceirizada_${indiceTerceirizada}`}
                                          label="E-mail"
                                          type={"email"}
                                          component={InputText}
                                          required
                                          validate={[email, required]}
                                          onChange={event =>
                                            this.setaContatosNutricionista(
                                              "email",
                                              event.target.value,
                                              indiceTerceirizada
                                            )
                                          }
                                          maxlength="140"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </FormSection>
                              );
                            }
                          )}
                        </div>
                        <div className={`col-1 mt-auto mb-1`}>
                          <Botao
                            texto="+"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            onClick={() => {
                              this.nomeFormContatoTerceirizada();
                              this.adicionaContatoNutricionista();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!ehDistribuidor && (
                  <Fragment>
                    <hr className="linha-form" />

                    <div>
                      <div className="card-body">
                        <div className="row pt-3">
                          <div className="col-12">
                            <label className="label font-weight-normal pb-3">
                              Lotes de atendimento
                            </label>

                            {this.state.lotes.length ? (
                              <Field
                                component={StatefulMultiSelect}
                                name="lotes"
                                selected={lotesSelecionados}
                                options={lotes}
                                valueRenderer={this.renderizarLabelLote}
                                onSelectedChanged={value => {
                                  this.lidarComSelecionados(value);
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
                              <div className="col-6">Carregando lotes..</div>
                            )}
                          </div>
                          <div className="col-12">
                            {lotesNomesSelecionados.length > 0 && (
                              <div className="row pt-3">
                                <div className="col-12">
                                  <label className="label-selected-unities">
                                    Lotes Selecionados
                                  </label>
                                  {lotesNomesSelecionados.map(
                                    (lote, indice) => {
                                      return (
                                        <div
                                          className="value-selected-unities"
                                          key={indice}
                                        >
                                          {lote}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
                <div className="card-body">
                  <div className="row mt-5">
                    {uuid === null ? (
                      <div className="col-12 text-right">
                        <Botao
                          texto="Cancelar"
                          onClick={event => this.resetForm(event)}
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                        />
                        <Botao
                          texto={"Salvar"}
                          onClick={handleSubmit(values =>
                            this.exibirModal({
                              ...values
                            })
                          )}
                          className="ml-3"
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN}
                        />
                      </div>
                    ) : (
                      <div className="col-12 text-right">
                        <Link to="/configuracoes/cadastros/empresas-cadastradas">
                          <Botao
                            texto="Cancelar"
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                          />
                        </Link>
                        <Botao
                          texto={"Atualizar"}
                          onClick={handleSubmit(values =>
                            this.exibirModal({
                              ...values
                            })
                          )}
                          className="ml-3"
                          type={BUTTON_TYPE.SUBMIT}
                          style={BUTTON_STYLE.GREEN}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Spin>
    );
  }
}

const CadastroEmpresaForm = reduxForm({
  form: "cadastroEmpresaForm",
  enableReinitialize: true
})(CadastroEmpresa);
const mapStateToProps = state => {
  return {
    initialValues: state.cadastroEmpresaForm.data
  };
};

const mapDispatchToProps = dispatch => {
  bindActionCreators(
    {
      loadEmpresa
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CadastroEmpresaForm);
