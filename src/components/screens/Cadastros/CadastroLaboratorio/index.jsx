import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Radio, Spin, Tooltip } from "antd";
import "./style.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  alphaNumericAndSingleSpaceBetweenCharacters,
  cep,
  email,
  noSpaceStartOrEnd,
  required,
  tamanhoCnpjMascara
} from "helpers/fieldValidators";
import {
  cadastraLaboratorio,
  getListaLaboratorios
} from "services/laboratorio.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  composeValidators,
  removeCaracteresEspeciais
} from "helpers/utilities";
import createDecorator from "final-form-calculate";
import { getEnderecoPorCEP } from "services/cep.service";
import {
  CADASTROS,
  CONFIGURACOES,
  LABORATORIOS_CADASTRADOS
} from "configs/constants";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [showModalEnviar, setShowModalEnviar] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [contatos, setContatos] = useState([{}]);
  const [credenciado, setCredenciado] = useState(null);
  const [laboratorios, setLaboratorios] = useState(null);
  const [desabilitaEndereco, setDesabilitaEndereco] = useState(true);
  const history = useHistory();

  const onSubmit = () => {
    setShowModalEnviar(true);
  };

  const salvarLaboratorio = async values => {
    setCarregando(true);
    let payload = montaPayload(values);

    try {
      let response = await cadastraLaboratorio(payload);
      if (response.status === 201) {
        toastSuccess("Laboratório Cadastrado com sucesso!");
        setShowModalEnviar(false);
        setCarregando(false);
      } else {
        toastError("Ocorreu um erro ao salvar o Laboratório");
        setCarregando(false);
      }
    } catch (error) {
      toastError("Ocorreu um erro ao salvar o Laboratório");
      setCarregando(false);
    }
  };

  const handleOnChange = (event, values) => {
    values.credenciado = event.target.value;
    setCredenciado(event.target.value);
  };

  const calculator = createDecorator({
    field: "cep",
    updates: {
      dummy: (minimumValue, allValues) => buscaCEP(minimumValue, allValues)
    }
  });

  const buscaCEP = async (cep, values) => {
    if (cep.length === 9) {
      const response = await getEnderecoPorCEP(cep);
      if (response.status === HTTP_STATUS.OK && !response.data.erro) {
        const { data } = response;
        values.bairro = data.bairro;
        values.cidade = data.localidade;
        values.logradouro = data.logradouro;
        values.estado = data.uf;
        setDesabilitaEndereco(true);
      } else {
        setDesabilitaEndereco(false);
      }
    }
  };

  const montaPayload = values => {
    let payload = {};

    payload.nome = values.nome_laboratorio;
    payload.cnpj = removeCaracteresEspeciais(values.cnpj);
    payload.cep = removeCaracteresEspeciais(values.cep);
    payload.logradouro = values.logradouro;
    payload.numero = values.numero;
    payload.complemento = values.complemento;
    payload.bairro = values.bairro;
    payload.cidade = values.cidade;
    payload.estado = values.estado;
    payload.credenciado = values.credenciado;

    payload.contatos = contatos.map((contatos, index) => ({
      nome: values[`nome_${index}`],
      telefone: removeCaracteresEspeciais(values[`telefone_${index}`]),
      email: values[`email_${index}`]
    }));

    return payload;
  };

  const validaNomeLab = value => {
    if (laboratorios.includes(value.toUpperCase()))
      return "Laboratório já cadastrado";
    else return undefined;
  };

  useEffect(() => {
    const buscaListaLabs = async () => {
      const response = await getListaLaboratorios();
      setLaboratorios(response.data.results);
    };

    buscaListaLabs();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-cronograma">
        <div className="card-body cadastro-cronograma">
          <Form
            onSubmit={onSubmit}
            decorators={[calculator]}
            initialValues={{
              data_cadastro: new Date().toLocaleDateString()
            }}
            validate={values => {
              const errors = {};
              if (!values.credenciado) {
                errors.credenciado = "Campo obrigatório";
              }
              return errors;
            }}
            render={({ form, handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Link
                    to={`/${CONFIGURACOES}/${CADASTROS}/${LABORATORIOS_CADASTRADOS}`}
                  >
                    <Botao
                      texto="Laboratórios Cadastrados"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-right"
                      onClick={() => {}}
                    />
                  </Link>
                </div>
                <div className="row">
                  <div className="card-title green">Dados do Laboratório</div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Nome do Laboratório"
                      name="nome_laboratorio"
                      className="input-busca-produto"
                      placeholder="Digite o Nome do Laboratório"
                      validate={composeValidators(
                        required,
                        validaNomeLab,
                        alphaNumericAndSingleSpaceBetweenCharacters,
                        noSpaceStartOrEnd
                      )}
                      required
                      toUppercaseActive
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Data de Cadastro"
                      name="data_cadastro"
                      className="input-busca-produto"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-5">
                    <Field
                      component={MaskedInputText}
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
                      label="CNPJ"
                      name="cnpj"
                      className="input-busca-produto"
                      placeholder="Digite o CNPJ do Laboratório"
                      validate={composeValidators(required, tamanhoCnpjMascara)}
                      required
                    />
                  </div>
                </div>

                <div className="card-title green">Endereço do Laboratório</div>
                <hr />

                <div className="row">
                  <div className="col-4">
                    <Field
                      component={MaskedInputText}
                      mask={[
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        "-",
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                      label="CEP"
                      name="cep"
                      className="input-busca-produto"
                      placeholder="Digite o CEP"
                      validate={composeValidators(required, cep)}
                      required
                    />
                  </div>
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Logradouro"
                      name="logradouro"
                      className="input-busca-produto"
                      placeholder="Nome do Logradouro"
                      validate={required}
                      required
                      disabled={desabilitaEndereco}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Número"
                      name="numero"
                      className="input-busca-produto"
                      placeholder="Digite o número"
                      validate={required}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Complemento"
                      name="complemento"
                      className="input-busca-produto"
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Bairro"
                      name="bairro"
                      className="input-busca-produto"
                      placeholder="Nome do Bairro"
                      validate={required}
                      required
                      disabled={desabilitaEndereco}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Cidade"
                      name="cidade"
                      className="input-busca-produto"
                      placeholder="Nome da Cidade"
                      validate={required}
                      required
                      disabled={desabilitaEndereco}
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Estado"
                      name="estado"
                      className="input-busca-produto"
                      placeholder="Nome do Estado"
                      validate={required}
                      required
                      disabled={desabilitaEndereco}
                    />
                  </div>
                </div>

                <div className="card-title green">Contatos</div>
                <hr />

                <div className="row">
                  {contatos.map((contato, index) => (
                    <>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nome"
                          name={`nome_${index}`}
                          className="input-busca-produto"
                          placeholder="Nome do Contato"
                          validate={required}
                          required
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={MaskedInputText}
                          mask={[
                            "(",
                            /\d/,
                            /\d/,
                            ")",
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/
                          ]}
                          label="Telefone"
                          name={`telefone_${index}`}
                          className="input-busca-produto"
                          placeholder="(00) 0000-00000"
                          validate={required}
                          required
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="E-mail"
                          name={`email_${index}`}
                          className="input-busca-produto"
                          placeholder="Digite o E-mail do Contato"
                          validate={composeValidators(required, email)}
                          required
                        />
                      </div>
                      <div className={`col-1 mt-auto mb-1`}>
                        {index === 0 ? (
                          <Tooltip title="Adicionar Contato">
                            <span>
                              <Botao
                                texto="+"
                                type={BUTTON_TYPE.BUTTON}
                                style={BUTTON_STYLE.GREEN_OUTLINE}
                                onClick={() => {
                                  let newContatos = [...contatos, {}];
                                  setContatos(newContatos);
                                }}
                              />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Remover Contato">
                            <span>
                              <Botao
                                icon="fas fa-trash"
                                type={BUTTON_TYPE.BUTTON}
                                style={BUTTON_STYLE.GREEN_OUTLINE}
                                onClick={() => {
                                  let contatosNovo = [...contatos];
                                  contatosNovo.splice(index, 1);
                                  setContatos(contatosNovo);
                                }}
                              />
                            </span>
                          </Tooltip>
                        )}
                      </div>
                    </>
                  ))}
                </div>

                <div className="card-title green">
                  Laboratórios Credenciados
                </div>
                <hr />

                <div className="texto-laboratorios">
                  <p className="font-weight-bold">Lembrete!</p>
                  <p className="">
                    Verifique se o laboratório está credenciado em órgãos
                    oficiais (Ministério da Saúde, Ministério da Agricultura,
                    Pecuária e Abastecimento, INMETRO, ANVISA, Universidades
                    Federais e Estaduais). Consulte nos links abaixo:
                  </p>
                  <ul>
                    <li>
                      <a href="http://www.inmetro.gov.br/laboratorios/rble/ ">
                        INMETRO
                      </a>
                    </li>
                    <li>
                      <a href="https://app.powerbi.com/view?r=eyJrIjoiYWZhYzg4YmUtZDBmZS00MDU3LWI1MGMtN2Y5ODNhOGNiODJiIiwidCI6ImI2N2FmMjNmLWMzZjMtNGQzNS04MGM3LWI3MDg1ZjVlZGQ4MSJ9&pageName=ReportSection255cb87f555de69e1841 ">
                        REBLAS
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="row pergunta-credenciado">
                  <div className="texto-pergunta">
                    Esse Laboratório está Credenciado?
                  </div>
                  <Radio.Group
                    onChange={event => handleOnChange(event, values)}
                    value={credenciado}
                  >
                    <Radio className="" value={true}>
                      SIM
                    </Radio>
                    <Radio className="" value={false}>
                      NÃO
                    </Radio>
                  </Radio.Group>
                </div>

                {credenciado === false && (
                  <div className="texto-nao-credenciado">
                    Por não estar credenciado em um órgão oficial este
                    laboratório não poderá ser utilizado no cadastro de Laudos.
                  </div>
                )}

                <hr />

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => {
                      setShowModalCancelar(true);
                    }}
                  />
                </div>
                <Modal
                  show={showModalCancelar}
                  onHide={() => {
                    setShowModalCancelar(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Cancelar Cadastro do Laboratório</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Deseja cancelar o Cadastro?</Modal.Body>
                  <Modal.Footer>
                    <Botao
                      texto="Não"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModalCancelar(false);
                      }}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Sim"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModalCancelar(false);
                        history.push("/");
                      }}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={showModalEnviar}
                  onHide={() => {
                    setShowModalEnviar(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Salvar Cadastro do Laboratório</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Confirma o cadastro do Laboratório?</Modal.Body>
                  <Modal.Footer>
                    <Botao
                      texto="Não"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModalEnviar(false);
                        setCarregando(false);
                      }}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Sim"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        salvarLaboratorio(values);
                      }}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </Modal.Footer>
                </Modal>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
