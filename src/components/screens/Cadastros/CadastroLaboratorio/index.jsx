import React, { useEffect, useState } from "react";
import { Radio, Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import "./style.scss";
import moment from "moment";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Field, Form, FormSpy } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";
import { required } from "helpers/fieldValidators";
import { OnChange } from "react-final-form-listeners";
import { agregarDefault } from "helpers/utilities";
import TreeSelectForm from "components/Shareable/TreeSelectForm";
import { cadastraLaboratorio } from "services/laboratorio.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

const ENTER = 13;

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [showModalEnviar, setShowModalEnviar] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [contatos, setContatos] = useState([{}]);
  const [credenciado, setCredenciado] = useState(null);
  const history = useHistory();

  const onSubmit = () => {
    setShowModalEnviar(true);
  };

  const salvarLaboratorio = async values => {
    let payload = montaPayload(values);

    try {
      let response = await cadastraLaboratorio(payload);
      if (response.status === 201) {
        toastSuccess("Laboratório Cadastrado com sucesso!");
        setShowModalEnviar(false);
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

  const montaPayload = values => {
    let payload = {};

    payload.nome = values.nome_laboratorio;
    payload.cnpj = values.cnpj;
    payload.cep = values.cep;
    payload.logradouro = values.logradouro;
    payload.numero = values.numero;
    payload.complemento = values.complemento;
    payload.bairro = values.bairro;
    payload.cidade = values.cidade;
    payload.estado = values.estado;
    payload.credenciado = values.credenciado; //corrigir

    payload.contatos = contatos.map((contatos, index) => ({
      nome: values[`nome_${index}`],
      telefone: values[`telefone_${index}`],
      email: values[`email_${index}`]
    }));

    return payload;
  };

  // const calculator = createDecorator({
  //   field: "produto",
  //   updates: {
  //     dummy: (minimumValue, allValues) =>
  //       selecionaProduto(minimumValue, allValues)
  //   }
  // });

  useEffect(() => {}, []);

  const onChangeFormSpy = async changes => {
    // let restante = changes.values.quantidade_total;
    // etapas.forEach((e, index) => {
    //   if (changes.values[`quantidade_${index}`])
    //     restante = restante - changes.values[`quantidade_${index}`];
    // });
    // setRestante(restante);
    // if (etapas.length < 2) return;
    // const partes_etapas = [];
    // etapas.forEach((_, i) => {
    //   partes_etapas.push({
    //     parte: changes.values[`parte_${i}`],
    //     etapa: changes.values[`etapa_${i}`],
    //     index: i
    //   });
    // });
    // const duplicados = [];
    // partes_etapas.forEach(pe => {
    //   if (
    //     partes_etapas.filter(
    //       pe_ => pe_.parte === pe.parte && pe_.etapa === pe.etapa
    //     ).length > 1
    //   ) {
    //     duplicados.push(pe.index);
    //   }
    // });
    // setDuplicados(duplicados);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-cronograma">
        <div className="card-body cadastro-cronograma">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            //decorators={[calculator]}
            validate={() => {}}
            render={({ form, handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                <FormSpy
                  subscription={{ values: true, active: true, valid: true }}
                  onChange={changes => onChangeFormSpy(changes)}
                />

                <div className="card-title green">Dados do Laboratório</div>

                <div className="row">
                  <div className="col-8">
                    {/* TODO: Validação dos critérios 1.4.1.x */}
                    <Field
                      component={InputText}
                      label="Nome do Laboratório"
                      name="nome_laboratorio"
                      className="input-busca-produto"
                      placeholder="Digite o Nome do Laboratório"
                      validate={required}
                      required
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
                    {/* TODO: Mascara de CNPJ */}
                    <Field
                      component={InputText}
                      label="CNPJ"
                      name="cnpj"
                      className="input-busca-produto"
                      placeholder="Digite o CNPJ do Laboratório"
                      validate={required}
                      required
                    />
                  </div>
                </div>

                <div className="card-title green">Endereço do Laboratório</div>
                <hr />

                <div className="row">
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="CEP"
                      name="cep"
                      className="input-busca-produto"
                      placeholder="Digite o CEP"
                      validate={required}
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
                          component={InputText}
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
                          validate={required}
                          required
                        />
                      </div>
                      <div className={`col-1 mt-auto mb-1`}>
                        {index === 0 ? (
                          <Botao
                            texto="+"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            onClick={() => {
                              let newContatos = [...contatos, {}];
                              setContatos(newContatos);
                            }}
                          />
                        ) : (
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
                        setShowModalEnviar(false);
                        setCarregando(false);
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
