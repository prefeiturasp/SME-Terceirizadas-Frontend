import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import "antd/dist/antd.css";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { Radio } from "antd";
import InputText from "components/Shareable/Input/InputText";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";
import {
  email,
  required,
  tamanhoCnpj,
  validaCPF
} from "helpers/fieldValidators";
import {
  composeValidators,
  formataCPFCensurado,
  formatarCPFouCNPJ
} from "helpers/utilities";
import SelectSelecione from "components/Shareable/SelectSelecione";
import { getDadosUsuarioEOLCompleto } from "services/permissoes.service";
import { useEffect } from "react";
import { getSubdivisoesCodae } from "services/vinculos.service";
import ModalExclusaoVinculo from "../ModalExclusaoVinculo";

const ModalCadastroVinculo = ({
  show,
  toggleShow,
  listaPerfis,
  listaVisao,
  onSubmit,
  vinculo,
  toggleExclusao
}) => {
  const [tipoUsuario, setTipoUsuario] = useState();
  const [subdivisoes, setSubdivisoes] = useState();
  const [showExclusao, setShowExclusao] = useState(false);
  const [valoresEdicao, setValoresEdicao] = useState();
  let buscarRF = useRef();

  const handleClose = () => {
    toggleShow(false, null);
  };

  const getPerfis = visao => {
    return listaPerfis
      .filter(perfil => perfil.visao === visao)
      .map(perfil => ({
        uuid: perfil.nome,
        nome: perfil.nome
      }));
  };

  const buscaSubdivisoes = async () => {
    const subdivisoes = await getSubdivisoesCodae();

    let options_subs = subdivisoes.results.map(sub => ({
      uuid: sub.uuid,
      nome: sub.nome
    }));

    setSubdivisoes(options_subs);
  };

  const buscaEOL = async values => {
    const response = await getDadosUsuarioEOLCompleto(
      values.registro_funcional
    );
    const usuarioEOL = response.data;
    values.nome_servidor = usuarioEOL.nome;
    values.cargo_servidor = usuarioEOL.cargo;
    values.email_servidor = usuarioEOL.email;
    values.cpf = usuarioEOL.cpf;
    values.cpf_servidor = formataCPFCensurado(usuarioEOL.cpf);
    values.codigo_eol_unidade = usuarioEOL.codigo_eol_unidade;
    values.cargo_servidor = usuarioEOL.cargo;

    let t = document.getElementById("inputRF");
    t.focus();
  };

  const abreDeletar = () => {
    toggleExclusao(true, vinculo);
    toggleShow(false, vinculo);
  };

  useEffect(() => {
    buscaSubdivisoes();

    if (vinculo && show) {
      setTipoUsuario("NAO_SERVIDOR");
      let values = {};
      values.nome = vinculo.nome_usuario;
      values.email = vinculo.email_usuario;
      values.cpf = formatarCPFouCNPJ(vinculo.cpf_usuario);
      values.cnpj = formatarCPFouCNPJ(vinculo.cnpj_empresa);
      values.perfil = vinculo.nome_perfil;
      setValoresEdicao(values);
    }
  }, [vinculo, show]);

  return (
    <>
      <ModalExclusaoVinculo show={showExclusao} setShow={setShowExclusao} />
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-cadastro-vinculo"
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Acesso</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          initialValues={valoresEdicao}
          render={({ form, handleSubmit, values, errors }) => (
            <>
              <Modal.Body>
                <form onSubmit={handleSubmit} className="">
                  {!vinculo && (
                    <div className="row mx-0 my-1">
                      <span className="label-radio">
                        Selecione o tipo de usuário:
                      </span>
                      <Radio.Group
                        onChange={event => setTipoUsuario(event.target.value)}
                        value={tipoUsuario}
                      >
                        <Radio className="" value={"SERVIDOR"}>
                          Servidor
                        </Radio>
                        <Radio className="" value={"NAO_SERVIDOR"}>
                          Não Servidor
                        </Radio>
                      </Radio.Group>
                    </div>
                  )}
                  {tipoUsuario === "SERVIDOR" && (
                    <>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            component={InputText}
                            id="inputRF"
                            label="Pesquisar RF"
                            name="registro_funcional"
                            placeholder="Digite o RF do Servidor"
                            className="input-busca-produto"
                            ref={buscarRF}
                            validate={required}
                          />
                        </div>
                        <div className="col-6 pl-0">
                          <Botao
                            texto=""
                            icon="fas fa-search"
                            type={BUTTON_TYPE.BUTTON}
                            onClick={() => buscaEOL(values)}
                            style={BUTTON_STYLE.GREEN}
                            className="botao-rf"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-7">
                          <Field
                            component={InputText}
                            label="Nome do Usuário"
                            name="nome_servidor"
                            className="input-busca-produto"
                            disabled={true}
                            validate={required}
                          />
                        </div>
                        <div className="col-5">
                          <Field
                            component={InputText}
                            label="Cargo"
                            name="cargo_servidor"
                            className="input-busca-produto"
                            disabled={true}
                            validate={required}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-7">
                          <Field
                            component={InputText}
                            label="E-mail"
                            name="email_servidor"
                            className="input-busca-produto"
                            disabled={true}
                            validate={required}
                          />
                        </div>
                        <div className="col-5">
                          <Field
                            component={InputText}
                            label="CPF"
                            name="cpf_servidor"
                            className="input-busca-produto"
                            disabled={true}
                            validate={required}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            component={SelectSelecione}
                            label="Perfil de Acesso"
                            name="visao_servidor"
                            placeholder="Selecione a visão"
                            className="input-busca-produto"
                            required
                            options={listaVisao}
                            validate={required}
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            component={SelectSelecione}
                            label="Perfil de Acesso"
                            name="perfil_servidor"
                            placeholder="Selecione o perfil de acesso"
                            className="input-busca-produto"
                            required
                            options={getPerfis(values.visao_servidor)}
                            validate={required}
                            disabled={!values.visao_servidor}
                          />
                        </div>
                      </div>
                      {values.visao_servidor === "CODAE" && (
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={SelectSelecione}
                              label="Subdivisão"
                              name="subdivisao_servidor"
                              placeholder="Selecione a subdivisão"
                              className="input-busca-produto"
                              required
                              options={subdivisoes}
                              validate={required}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {tipoUsuario === "NAO_SERVIDOR" && (
                    <>
                      <div className="row">
                        <div className="col-12">
                          <Field
                            component={InputText}
                            label="Nome do Usuário"
                            name="nome"
                            placeholder="Digite o nome completo do usuário"
                            className="input-busca-produto"
                            validate={required}
                            required
                            disabled={valoresEdicao}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-7">
                          <Field
                            component={InputText}
                            label="E-mail"
                            name="email"
                            placeholder="Digite o e-mail do Usuário"
                            className="input-busca-produto"
                            validate={email}
                            required
                          />
                        </div>
                        <div className="col-5">
                          <Field
                            component={MaskedInputText}
                            mask={[
                              /\d/,
                              /\d/,
                              /\d/,
                              ".",
                              /\d/,
                              /\d/,
                              /\d/,
                              ".",
                              /\d/,
                              /\d/,
                              /\d/,
                              "-",
                              /\d/,
                              /\d/
                            ]}
                            label="CPF"
                            name="cpf"
                            placeholder="Digite o CPF do usuário"
                            className="input-busca-produto"
                            validate={composeValidators(required, validaCPF)}
                            required
                            disabled={valoresEdicao}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            mask={[
                              /\d/,
                              /\d/,
                              ".",
                              /\d/,
                              /\d/,
                              /\d/,
                              ".",
                              /\d/,
                              /\d/,
                              /\d/,
                              "/",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                              "-",
                              /\d/,
                              /\d/
                            ]}
                            component={MaskedInputText}
                            label="CNPJ da Empresa"
                            name="cnpj"
                            placeholder="Digite o CNPJ da Empresa"
                            className="input-busca-produto"
                            validate={composeValidators(required, tamanhoCnpj)}
                            required
                            disabled={valoresEdicao}
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            component={SelectSelecione}
                            label="Perfil de Acesso"
                            name="perfil"
                            placeholder="Selecione o perfil de acesso"
                            className="input-busca-produto"
                            required
                            options={getPerfis("EMPRESA")}
                            validate={required}
                            disabled={valoresEdicao}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </Modal.Body>
              <Modal.Footer>
                <div className="w-100">
                  {vinculo && (
                    <Botao
                      texto="Remover"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => abreDeletar()}
                      style={BUTTON_STYLE.RED_OUTLINE}
                      icon="fas fa-trash"
                      className="float-left"
                    />
                  )}

                  <Botao
                    texto="Salvar"
                    type={BUTTON_TYPE.BUTTON}
                    onClick={() => {
                      onSubmit(values, tipoUsuario, valoresEdicao);
                    }}
                    disabled={Object.keys(errors).length > 0}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3 float-right"
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    onClick={handleClose}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="ml-3 float-right"
                  />
                </div>
              </Modal.Footer>
            </>
          )}
        />
      </Modal>
    </>
  );
};

export default ModalCadastroVinculo;
