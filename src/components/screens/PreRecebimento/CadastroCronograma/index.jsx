import React, { useEffect, useState } from "react";
import { Spin, TreeSelect } from "antd";
import "./styles.scss";
import moment from "moment";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import {
  getContratoSAFI,
  getListaTermosContratoSAFI
} from "services/safi.service";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import createDecorator from "final-form-calculate";
import { InputComData } from "components/Shareable/DatePicker";
import { getArmazens } from "services/terceirizada.service";
import SelectSelecione from "components/Shareable/SelectSelecione";
import { cadastraCronograma, getEtapas } from "services/cronograma.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contratoAtual, setContratoAtual] = useState();
  const [contratos, setContratos] = useState([]);
  const [contratosOptions, setContratosOptions] = useState([]);
  const [collapse, setCollapse] = useState([]);
  const [produtosOptions, setProdutosOptions] = useState([]);
  const [empenhoOptions, setEmpenhoOptions] = useState([]);
  const [etapas, setEtapas] = useState([{}]);
  const [etapasOptions, setEtapasOptions] = useState([{}]);
  const [recebimentos, setRecebimentos] = useState([{}]);
  const [armazens, setArmazens] = useState([{}]);
  const history = useHistory();

  const onSubmit = () => {};

  const getContratosFiltrado = termoContrato => {
    if (termoContrato) {
      const reg = new RegExp(termoContrato, "iu");
      return contratosOptions.filter(a => reg.test(a.value));
    }
    return contratosOptions;
  };

  const getEtapasFiltrado = etapa => {
    if (etapa) {
      const reg = new RegExp(etapa, "iu");
      return etapasOptions.filter(a => reg.test(a.value));
    }
    return etapasOptions;
  };

  const buscaContrato = async values => {
    if (values.termo_contrato) {
      let contrato_uuid = contratos.find(
        c => c.termo_contrato === values.termo_contrato
      ).uuid;
      let response = await getContratoSAFI(contrato_uuid);

      let contrato = response.data;
      setContratoAtual(contrato);
      values.contrato_uuid = contrato_uuid;
      values.empresa = contrato.empresa_contratada
        ? contrato.empresa_contratada.nome
        : undefined;
      values.empresa_uuid = contrato.empresa_contratada
        ? contrato.empresa_contratada.uuid
        : undefined;
      values.numero_processo = contrato.processo;

      if (contrato.ata) {
        setProdutosOptions(
          contrato.ata.produtos.map(produto => ({
            ...produto,
            nome: produto.nome_produto
          }))
        );
      }

      if (contrato.dotacoes) {
        let treeData = contrato.dotacoes.map(dotacao => ({
          title: dotacao.numero_dotacao,
          value: dotacao.uuid,
          selectable: false,
          children: dotacao.empenhos.map(empenho => ({
            title: empenho.numero,
            value: empenho.uuid
          }))
        }));

        setEmpenhoOptions(treeData);
      }

      document.getElementById("autocomplete-contrato").focus();
      document.getElementById("autocomplete-contrato").blur();
    }
  };

  const selecionaProduto = (uuid, values) => {
    let produto = produtosOptions.find(prod => prod.uuid === uuid);
    if (produto) {
      values.quantidade_total = produto.quantidade_total;
      values.unidade_medida = produto.unidade_medida;
    }
  };

  const onChangeEmpenho = (empenho, index, values) => {
    values[`empenho_${index}`] = empenho;
  };

  const adicionaEtapa = () => {
    setEtapas([...etapas, {}]);
  };

  const deletaEtapa = index => {
    let etapasNovo = [...etapas];
    etapasNovo.splice(index, 1);
    setEtapas(etapasNovo);
  };

  const adicionaRecebimento = () => {
    setRecebimentos([...recebimentos, {}]);
  };

  const deletaRecebimento = index => {
    let recebimentosNovo = [...recebimentos];
    recebimentosNovo.splice(index, 1);
    setRecebimentos(recebimentosNovo);
  };

  const calculator = createDecorator({
    field: "produto",
    updates: {
      dummy: (minimumValue, allValues) =>
        selecionaProduto(minimumValue, allValues)
    }
  });

  const toggleCollapse = index => {
    setCollapse({
      [index]: !collapse[index]
    });
  };

  const validaParte = (values, index) => {
    let flagErro = false;
    etapas.forEach((e, i) => {
      if (i === index) return;
      if (values[`parte_${i}`] === values[`parte_${index}`]) {
        if (values[`etapa_${i}`] === values[`etapa_${index}`]) {
          flagErro = true;
        }
      }
    });
    return flagErro ? "Parte já selecionada" : undefined;
  };

  const quantidadeFaltante = values => {
    let restante = values.quantidade_total;
    etapas.forEach((e, index) => {
      if (values[`quantidade_${index}`])
        restante = restante - values[`quantidade_${index}`];
    });
    return restante;
  };

  const textoFaltante = values => {
    let qtdFaltante = quantidadeFaltante(values);
    let textoPadrao = (
      <div>
        Faltam
        <span className="font-weight-bold">
          &nbsp;
          {qtdFaltante}
          &nbsp;
          {values.unidade_medida}
          &nbsp;
        </span>
        para programar
      </div>
    );

    let textoAcima = <div>Quantidade maior que a prevista em contrato</div>;

    return (
      <div className="row">
        <div
          className={`col-12 texto-alimento-faltante ${
            qtdFaltante === 0 ? "verde" : "vermelho"
          }`}
        >
          {qtdFaltante < 0 ? textoAcima : textoPadrao}
        </div>
      </div>
    );
  };

  const getOptionsDataProgramada = values => {
    let options = [];
    etapas.forEach((e, index) => {
      if (values[`etapa_${index}`] && values[`data_programada_${index}`]) {
        let nomeConcatenado = `${values[`data_programada_${index}`]} - ${
          values[`etapa_${index}`]
        } ${values[`parte_${index}`] ? ` - ${values[`parte_${index}`]}` : ""}`;
        options.push({
          uuid: nomeConcatenado,
          nome: nomeConcatenado
        });
      }
    });
    return options;
  };

  const buscaEmpenho = uuid => {
    if (!uuid) return;
    let nome;
    contratoAtual.dotacoes.forEach(d => {
      let emp = d.empenhos.find(e => e.uuid === uuid);
      if (emp) {
        nome = emp.numero;
        return;
      }
    });
    return nome;
  };

  const formataPayload = (values, rascunho) => {
    let payload = {};
    payload.cadastro_finalizado = !rascunho;
    payload.contrato = values.termo_contrato;
    payload.contrato_uuid = values.contrato_uuid;
    payload.empresa_uuid = values.empresa_uuid;
    payload.nome_empresa = values.empresa;
    payload.processo_sei = values.numero_processo;
    payload.nome_produto = values.produto
      ? produtosOptions.find(x => x.uuid === values.produto).nome
      : undefined;
    payload.produto_uuid = values.produto;
    payload.qtd_total_programada = values.quantidade_total;
    payload.unidade_medida = values.unidade_medida;
    payload.armazem = values.armazem;
    payload.tipo_embalagem = values.tipo_embalagem;

    payload.etapas = etapas.map((etapa, index) => ({
      empenho_uuid: values[`empenho_${index}`],
      numero_empenho: buscaEmpenho(values[`empenho_${index}`]),
      etapa: values[`etapa_${index}`],
      parte: values[`parte_${index}`],
      data_programada: values[`data_programada_${index}`]
        ? moment(values[`data_programada_${index}`], "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          )
        : undefined,
      quantidade: values[`quantidade_${index}`],
      total_embalagens: values[`total_embalagens_${index}`]
    }));

    payload.programacoes_de_recebimento = recebimentos.map((etapa, index) => ({
      data_recebimento: values[`data_programada_${index}`],
      tipo_carga: values[`tipo_recebimento_${index}`]
    }));

    return payload;
  };

  const salvarCronograma = async (values, rascunho) => {
    setCarregando(true);
    let payload = formataPayload(values, rascunho);

    let response = await cadastraCronograma(payload);
    if (response.status === 201) {
      if (rascunho) {
        toastSuccess("Rascunho salvo com sucesso!");
      } else {
        toastSuccess("Cadastro de Cronograma salvo e enviado para aprovação!");
        setShowModal(false);
        history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
      }
    } else {
      toastError("Ocorreu um erro ao salvar o Cronograma");
      setCarregando(false);
    }
  };

  const validaRascunho = values => {
    return !values.contrato_uuid;
  };

  const validaSalvarEnviar = values => {
    let valido = true;

    valido =
      valido &&
      values.contrato_uuid &&
      values.produto &&
      values.armazem &&
      values.tipo_embalagem;

    etapas.forEach((e, index) => {
      valido =
        valido &&
        values[`empenho_${index}`] &&
        values[`etapa_${index}`] &&
        values[`data_programada_${index}`] &&
        values[`quantidade_${index}`] &&
        values[`total_embalagens_${index}`];
    });

    if (quantidadeFaltante(values) !== 0) valido = false;

    return !valido;
  };

  useEffect(() => {
    const buscaListaContratos = async () => {
      const response = await getListaTermosContratoSAFI();
      setContratos(response.data);
      setContratosOptions(
        response.data.map(contrato => ({
          value: contrato.termo_contrato,
          uuid: contrato.uuid
        }))
      );
    };

    const buscaArmazens = async () => {
      const response = await getArmazens();
      setArmazens(
        response.data.results.map(armazem => ({
          nome: armazem.nome_fantasia,
          uuid: armazem.uuid
        }))
      );
    };

    const buscaEtapas = async () => {
      const response = await getEtapas();
      setEtapasOptions(response.data);
    };

    buscaListaContratos();
    buscaArmazens();
    buscaEtapas();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-cronograma">
        <div className="card-body cadastro-cronograma">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            decorators={[calculator]}
            validate={() => {}}
            render={({ form, handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-5">
                    <Field
                      component={AutoCompleteField}
                      id="autocomplete-contrato"
                      options={getContratosFiltrado(values.termo_contrato)}
                      label="Pesquisar Contrato"
                      name="termo_contrato"
                      className="input-busca-produto"
                      required
                      esconderIcone
                    />
                  </div>
                  <div className="col-1 pl-0">
                    <Botao
                      texto=""
                      icon="fas fa-search"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN}
                      className="botao-pesquisar"
                      onClick={() => buscaContrato(values)}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Empresa"
                      name="empresa"
                      className="input-busca-produto"
                      disabled={true}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nº do Processo SEI - Contratos"
                      name="numero_processo"
                      className="input-busca-produto"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="accordion mt-1" id="accordionCronograma">
                  <div className="card mt-3">
                    <div className={`card-header card-tipo`} id={`heading_1`}>
                      <div className="row card-header-content">
                        <span className="nome-alimento">Dados do Produto</span>
                        <div className="col-1 align-self-center">
                          <button
                            onClick={() => toggleCollapse(1)}
                            className="btn btn-link btn-block text-left px-0"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse_1`}
                            aria-expanded="true"
                            aria-controls={`collapse_1`}
                          >
                            <span className="span-icone-toogle">
                              <i
                                className={
                                  collapse[1]
                                    ? "fas fa-chevron-up"
                                    : "fas fa-chevron-down"
                                }
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      id={`collapse_1`}
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionCronograma"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={SelectSelecione}
                              naoDesabilitarPrimeiraOpcao
                              options={produtosOptions}
                              label="Produto"
                              name="produto"
                              placeholder={"Selecione um Produto"}
                              required
                            />
                          </div>
                          <div className="col-3">
                            <Field
                              component={InputText}
                              label="Quantidade Total Programada"
                              name="quantidade_total"
                              className="input-busca-produto"
                              disabled={true}
                              required
                            />
                          </div>
                          <div className="col-3">
                            <Field
                              component={InputText}
                              label="Unidade de Medida"
                              name="unidade_medida"
                              className="input-busca-produto"
                              disabled={true}
                              required
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={SelectSelecione}
                              naoDesabilitarPrimeiraOpcao
                              options={armazens}
                              label="Armazém"
                              name="armazem"
                              required
                              placeholder={"Selecione o Armazém"}
                            />
                          </div>
                          <div className="col-3">
                            <Field
                              component={SelectSelecione}
                              naoDesabilitarPrimeiraOpcao
                              options={[
                                {
                                  uuid: "CAIXA",
                                  nome: "Caixa"
                                },
                                {
                                  uuid: "FARDO",
                                  nome: "Fardo"
                                },
                                {
                                  uuid: "TUBET",
                                  nome: "Tubet"
                                }
                              ]}
                              label="Tipo de Embalagem"
                              name="tipo_embalagem"
                              required
                              placeholder={"Selecione a Embalagem"}
                            />
                          </div>
                        </div>

                        <div className="subtitulo">Cronograma das Entregas</div>
                        <hr className="linha-verde" />

                        {etapas.map((etapa, index) => (
                          <>
                            {index !== 0 && (
                              <>
                                <hr />
                                <div className="row">
                                  <div className="w-100">
                                    <Botao
                                      texto=""
                                      type={BUTTON_TYPE.BUTTON}
                                      style={BUTTON_STYLE.GREEN_OUTLINE}
                                      icon="fas fa-trash"
                                      className="float-right ml-3"
                                      onClick={() => deletaEtapa(index)}
                                      disabled={submitting}
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="row">
                              <div className="col-4">
                                <span className="required-asterisk">*</span>
                                <label className="col-form-label">
                                  Produtos
                                </label>
                                <TreeSelect
                                  treeData={empenhoOptions}
                                  value={values.empenho}
                                  onChange={e =>
                                    onChangeEmpenho(e, index, values)
                                  }
                                  placeholder="Selecione o Empenho"
                                  style={{ width: "100%" }}
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={AutoCompleteField}
                                  options={getEtapasFiltrado(
                                    values[`etapa_${index}`]
                                  )}
                                  label="Etapa"
                                  name={`etapa_${index}`}
                                  className="input-busca-produto"
                                  placeholder="Selecione a Etapa"
                                  required
                                  esconderIcone
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={[
                                    {
                                      uuid: "Parte 1",
                                      nome: "Parte 1"
                                    },
                                    {
                                      uuid: "Parte 2",
                                      nome: "Parte 2"
                                    },
                                    {
                                      uuid: "Parte 3",
                                      nome: "Parte 3"
                                    },
                                    {
                                      uuid: "Parte 4",
                                      nome: "Parte 4"
                                    },
                                    {
                                      uuid: "Parte 5",
                                      nome: "Parte 5"
                                    }
                                  ]}
                                  label="Parte"
                                  name={`parte_${index}`}
                                  placeholder={"Selecione a Parte"}
                                  validate={() => validaParte(values, index)}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-4">
                                <Field
                                  component={InputComData}
                                  label="Data Programada"
                                  name={`data_programada_${index}`}
                                  placeholder="Selecionar a Data"
                                  required
                                  writable={false}
                                  minDate={null}
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={InputText}
                                  label="Quantidade"
                                  name={`quantidade_${index}`}
                                  placeholder="Digite a Quantidade"
                                  required
                                  type="number"
                                  pattern="[0-9]*"
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={InputText}
                                  label="Total de Embalagens"
                                  name={`total_embalagens_${index}`}
                                  placeholder="Digite a Quantidade"
                                  required
                                  apenasNumeros
                                />
                              </div>
                            </div>
                          </>
                        ))}

                        {values.quantidade_total && textoFaltante(values)}

                        <div className="text-center mb-2 mt-2">
                          <Botao
                            texto="+ Adicionar Etapa"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            className=""
                            onClick={() => adicionaEtapa()}
                            disabled={submitting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className={`card-header card-tipo`} id={`heading_2`}>
                      <div className="row card-header-content">
                        <span className="nome-alimento">
                          Dados do Recebimento
                        </span>
                        <div className="col-1 align-self-center">
                          <button
                            onClick={() => toggleCollapse(2)}
                            className="btn btn-link btn-block text-left px-0"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse_2`}
                            aria-expanded="true"
                            aria-controls={`collapse_2`}
                          >
                            <span className="span-icone-toogle">
                              <i
                                className={
                                  collapse[2]
                                    ? "fas fa-chevron-up"
                                    : "fas fa-chevron-down"
                                }
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      id={`collapse_2`}
                      className="collapse"
                      aria-labelledby="headingOne"
                      data-parent="#accordionCronograma"
                    >
                      <div className="card-body">
                        {recebimentos.map((recebimento, index) => (
                          <>
                            {index !== 0 && (
                              <>
                                <hr />
                                <div className="row">
                                  <div className="w-100">
                                    <Botao
                                      texto=""
                                      type={BUTTON_TYPE.BUTTON}
                                      style={BUTTON_STYLE.GREEN_OUTLINE}
                                      icon="fas fa-trash"
                                      className="float-right ml-3"
                                      onClick={() => deletaRecebimento(index)}
                                      disabled={submitting}
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="row">
                              <div className="col-4">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={getOptionsDataProgramada(values)}
                                  label="Data Programada"
                                  name={`data_recebimento_${index}`}
                                  placeholder={"Selecione a Data"}
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={SelectSelecione}
                                  naoDesabilitarPrimeiraOpcao
                                  options={[
                                    {
                                      uuid: "PALETIZADA",
                                      nome: "Paletizada"
                                    },
                                    {
                                      uuid: "ESTIVADA_BATIDA",
                                      nome: "Estivada/Batida"
                                    }
                                  ]}
                                  label="Tipo de Carga"
                                  name={`tipo_recebimento_${index}`}
                                  placeholder={"Selecione a Carga"}
                                />
                              </div>
                            </div>
                          </>
                        ))}

                        <div className="text-center mb-2 mt-2">
                          <Botao
                            texto="+ Adicionar Recebimento"
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            className=""
                            onClick={() => adicionaRecebimento()}
                            disabled={submitting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar e Enviar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    onClick={() => setShowModal(true)}
                    disabled={validaSalvarEnviar(values)}
                  />
                  <Botao
                    texto="Salvar Rascunho"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => salvarCronograma(values, true)}
                    disabled={validaRascunho(values)}
                  />
                </div>
                <Modal
                  show={showModal}
                  onHide={() => {
                    setShowModal(false);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Salvar e Enviar</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Deseja salvar o Cadastro do Cronograma e enviar para
                    aprovação?
                  </Modal.Body>
                  <Modal.Footer>
                    <Botao
                      texto="Continuar Editando"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        setShowModal(false);
                      }}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Salvar e Enviar"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        salvarCronograma(values, false);
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
