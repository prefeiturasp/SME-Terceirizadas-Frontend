import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import moment from "moment";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Field, Form, FormSpy } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { InputComData } from "components/Shareable/DatePicker";
import { getNomesDistribuidores } from "services/logistica.service";
import SelectSelecione from "components/Shareable/SelectSelecione";
import {
  cadastraCronograma,
  editaCronograma,
  getCronograma,
  getEtapas,
  getRascunhos
} from "services/cronograma.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { useHistory } from "react-router-dom";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";
import Rascunhos from "../RascunhosCronograma";
import "../CronogramaEntrega/styles.scss";
import { required } from "helpers/fieldValidators";
import { OnChange } from "react-final-form-listeners";
import { agregarDefault, exibeError } from "helpers/utilities";
import { getEmpresasCronograma } from "services/terceirizada.service";
import {
  getListaProdutosEdital,
  getUnidadesDeMedidaProduto
} from "services/produto.service";
import { ModalAssinaturaUsuario } from "components/Shareable/ModalAssinaturaUsuario";
import { MSG_SENHA_INVALIDA } from "components/screens/helper";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [collapse, setCollapse] = useState([]);
  const [produtosOptions, setProdutosOptions] = useState([{}]);
  const [unidadesMedidaOptions, setUnidadesMedidaOptions] = useState([{}]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(undefined);
  const [contratoSelecionado, setContratoSelecionado] = useState(undefined);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState({});
  const [etapas, setEtapas] = useState([{}]);
  const [etapasOptions, setEtapasOptions] = useState([{}]);
  const [recebimentos, setRecebimentos] = useState([{}]);
  const [armazens, setArmazens] = useState([{}]);
  const [fornecedores, setFornecedores] = useState([{}]);
  const history = useHistory();
  const [listaRascunhos, setListaRascunhos] = useState(null);
  const [duplicados, setDuplicados] = useState([]);
  const [restante, setRestante] = useState(undefined);
  const [datasProgramadas, setDatasProgramadas] = useState([]);
  const [edicao, setEdicao] = useState(false);
  const [cronograma, setCronograma] = useState({});
  const [valoresIniciais, setValoresIniciais] = useState(true);
  const [uuidCronograma, setUuidCronograma] = useState(null);
  const [etapasValues, setEtapasValues] = useState({});
  const [recebimentosValues, setRecebimentosValues] = useState({});

  const getRascunhosAsync = async () => {
    try {
      const response = await getRascunhos();
      if (response.status === HTTP_STATUS.OK) {
        setListaRascunhos(response.data.results);
      }
    } catch (erro) {
      setListaRascunhos();
      toastError("Ocorreu um erro ao tentar carregar a lista de rascunhos.");
    }
  };

  const onSubmit = () => {
    setShowModal(true);
  };

  const getEmpresaFiltrado = empresa => {
    if (empresa) {
      const reg = new RegExp(empresa, "iu");
      return fornecedores.filter(a => reg.test(a.value));
    }
    return fornecedores;
  };

  const getEtapasFiltrado = etapa => {
    if (etapa) {
      const reg = new RegExp(etapa, "iu");
      return etapasOptions.filter(a => reg.test(a.value));
    }
    return etapasOptions;
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

  const toggleCollapse = index => {
    setCollapse({
      [index]: !collapse[index]
    });
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
          {unidadeSelecionada.nome}
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
    return agregarDefault(options);
  };

  const formataPayload = (values, rascunho) => {
    let payload = {};
    payload.cadastro_finalizado = !rascunho;
    payload.contrato = values.contrato;
    payload.empresa = empresaSelecionada.uuid;
    payload.produto = values.produto;
    payload.qtd_total_programada = values.quantidade_total;
    payload.unidade_medida = values.unidade_medida;
    payload.armazem = values.armazem;
    payload.tipo_embalagem = values.tipo_embalagem;

    payload.etapas = etapas.map((etapa, index) => ({
      numero_empenho: values[`empenho_${index}`],
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
      data_programada: values[`data_recebimento_${index}`],
      tipo_carga: values[`tipo_recebimento_${index}`]
    }));
    return payload;
  };

  const salvarCronograma = async (values, rascunho) => {
    setCarregando(true);
    let payload = formataPayload(values, rascunho);
    if (!rascunho) {
      payload["password"] = values["password"];
    }
    try {
      let response = edicao
        ? await editaCronograma(payload, uuidCronograma)
        : await cadastraCronograma(payload);
      if (response.status === 201 || response.status === 200) {
        if (rascunho) {
          toastSuccess("Rascunho salvo com sucesso!");
          getRascunhosAsync();
          setCarregando(false);
        } else {
          setCarregando(false);
          toastSuccess(
            "Cadastro de Cronograma salvo e enviado para aprovação!"
          );
          setShowModal(false);
          history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
        }
      } else {
        toastError("Ocorreu um erro ao salvar o Cronograma");
        setCarregando(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toastError(MSG_SENHA_INVALIDA);
        setCarregando(false);
      } else {
        exibeError(error, "Ocorreu um erro ao salvar o Cronograma");
      }
    }
  };

  const validaRascunho = values => {
    return !values.contrato;
  };
  const lengthOrUnderfined = value => {
    let valor = value ? value.toString() : undefined;
    return valor && valor.length > 0 ? valor : undefined;
  };

  const getDadosCronograma = async () => {
    try {
      const responseCronograma = await getCronograma(uuidCronograma);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        const programacoes_de_recebimento = responseCronograma.data.programacoes_de_recebimento.reverse();
        setEtapas(responseCronograma.data.etapas);
        setRecebimentos(programacoes_de_recebimento);

        const cronogramaValues = {};
        const crono = responseCronograma.data;
        setEmpresaSelecionada(crono.empresa);
        cronogramaValues["empresa"] = lengthOrUnderfined(
          crono.empresa.nome_fantasia
        );
        setContratoSelecionado(crono.contrato);
        cronogramaValues["contrato"] = lengthOrUnderfined(crono.contrato.uuid);
        cronogramaValues["numero_processo"] = lengthOrUnderfined(
          crono.contrato.processo
        );
        cronogramaValues["quantidade_total"] = lengthOrUnderfined(
          crono.qtd_total_programada
        );
        cronogramaValues["unidade_medida"] = lengthOrUnderfined(
          crono.unidade_medida ? crono.unidade_medida.uuid : undefined
        );
        cronogramaValues["produto"] = lengthOrUnderfined(
          crono.produto ? crono.produto.uuid : undefined
        );
        cronogramaValues["armazem"] = lengthOrUnderfined(
          crono.armazem ? crono.armazem.uuid : undefined
        );
        cronogramaValues["tipo_embalagem"] = lengthOrUnderfined(
          crono.tipo_embalagem
        );
        cronogramaValues["numero"] = crono.numero ? crono.numero : undefined;
        setCronograma(cronogramaValues);

        const etapaValues = {};
        responseCronograma.data.etapas.forEach((etapa, i) => {
          etapaValues[`empenho_${i}`] = lengthOrUnderfined(
            etapa.numero_empenho
          );
          etapaValues[`etapa_${i}`] = lengthOrUnderfined(etapa.etapa);
          etapaValues[`parte_${i}`] = lengthOrUnderfined(etapa.parte);
          etapaValues[`data_programada_${i}`] = lengthOrUnderfined(
            etapa.data_programada
          );
          etapaValues[`quantidade_${i}`] = lengthOrUnderfined(etapa.quantidade);
          etapaValues[`total_embalagens_${i}`] = lengthOrUnderfined(
            etapa.total_embalagens
          );
        });
        setEtapasValues(etapaValues);

        const recebimentoValues = {};
        programacoes_de_recebimento.forEach((recebimento, i) => {
          recebimentoValues[`data_recebimento_${i}`] = lengthOrUnderfined(
            recebimento.data_programada
          );
          recebimentoValues[`tipo_recebimento_${i}`] = lengthOrUnderfined(
            recebimento.tipo_carga
          );
        });
        setRecebimentosValues(recebimentoValues);
        setCarregando(false);
      }
    } catch (e) {
      toastError("Ocorreu um erro ao carregar o Cronograma");
    }
  };

  const getOpcoesContrato = () => {
    if (!empresaSelecionada) return [];
    return empresaSelecionada.contratos.map(contrato => ({
      nome: contrato.numero,
      uuid: contrato.uuid
    }));
  };

  const selecionaEmpresa = uuid_empresa => {
    if (!empresaSelecionada || empresaSelecionada.uuid !== uuid_empresa) {
      let fornecedor = fornecedores.find(f => f.value === uuid_empresa);
      setEmpresaSelecionada(fornecedor);
    }
  };

  const selecionaContrato = values => {
    let uuid_contrato = values.contrato;
    if (!contratoSelecionado || contratoSelecionado.uuid !== uuid_contrato) {
      let contrato = empresaSelecionada.contratos.find(
        c => c.uuid === uuid_contrato
      );
      values.numero_processo = contrato.processo;
      setContratoSelecionado(contrato);
    }
  };

  const selecionaUnidade = uuid_unidade => {
    if (!unidadeSelecionada || unidadeSelecionada.uuid !== uuid_unidade) {
      let unidade = unidadesMedidaOptions.find(u => u.uuid === uuid_unidade);
      setUnidadeSelecionada(unidade);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    if (uuid && valoresIniciais) {
      setUuidCronograma(uuid);
      setCarregando(true);
      setEdicao(true);
    } else {
      setCarregando(false);
    }

    const buscaArmazens = async () => {
      const response = await getNomesDistribuidores();
      setArmazens(
        response.data.results.map(armazem => ({
          nome: armazem.nome_fantasia,
          uuid: armazem.uuid
        }))
      );
    };

    const buscaFornecedores = async () => {
      const response = await getEmpresasCronograma();
      setFornecedores(
        response.data.results.map(forn => ({
          uuid: forn.uuid,
          value: forn.nome_fantasia,
          contratos: forn.contratos
        }))
      );
    };

    const buscaEtapas = async () => {
      const response = await getEtapas();
      setEtapasOptions(response.data);
    };

    const buscaProdutos = async () => {
      const response = await getListaProdutosEdital();
      setProdutosOptions(response.data.results);
    };

    const buscaUnidadesMedida = async () => {
      const response = await getUnidadesDeMedidaProduto();
      setUnidadesMedidaOptions(response.data.results);
    };

    buscaArmazens();
    buscaEtapas();
    buscaFornecedores();
    buscaProdutos();
    buscaUnidadesMedida();
    getRascunhosAsync();
  }, [valoresIniciais]);

  if (valoresIniciais && edicao) {
    getDadosCronograma();
    setValoresIniciais(false);
  }

  const onChangeFormSpy = async changes => {
    if (changes.values.empresa) selecionaEmpresa(changes.values.empresa);
    if (changes.values.contrato) selecionaContrato(changes.values);
    if (changes.values.unidade_medida)
      selecionaUnidade(changes.values.unidade_medida);
    let restante = changes.values.quantidade_total;
    etapas.forEach((e, index) => {
      if (changes.values[`quantidade_${index}`])
        restante = restante - changes.values[`quantidade_${index}`];
    });
    setRestante(restante);
    if (etapas.length < 2) return;
    const partes_etapas = [];
    etapas.forEach((_, i) => {
      partes_etapas.push({
        parte: changes.values[`parte_${i}`],
        etapa: changes.values[`etapa_${i}`],
        index: i
      });
    });
    const duplicados = [];
    partes_etapas.forEach(pe => {
      if (
        partes_etapas.filter(
          pe_ => pe_.parte === pe.parte && pe_.etapa === pe.etapa
        ).length > 1
      ) {
        duplicados.push(pe.index);
      }
    });
    setDuplicados(duplicados);
  };
  return (
    <Spin tip="Carregando..." spinning={carregando}>
      {!edicao && <Rascunhos listaRascunhos={listaRascunhos} />}
      <div className="card mt-3 card-cadastro-cronograma">
        <div className="card-body cadastro-cronograma">
          <Form
            onSubmit={onSubmit}
            initialValues={{
              ...cronograma,
              ...etapasValues,
              ...recebimentosValues
            }}
            validate={() => {}}
            render={({ form, handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                <FormSpy
                  subscription={{ values: true, active: true, valid: true }}
                  onChange={changes => onChangeFormSpy(changes)}
                />
                <div className="row">
                  <div className="col-5">
                    <Field
                      component={AutoCompleteField}
                      options={getEmpresaFiltrado(values.empresa)}
                      label="Pesquisar Empresa"
                      name="empresa"
                      required
                      validate={required}
                      placeholder={"Selecione uma Empresa Cadastrada"}
                      esconderIcone
                    />
                  </div>
                  {edicao && (
                    <div className="col-6 text-right">
                      <p>
                        <b>Nº do Cronograma: </b>

                        <span className="head-green">{cronograma.numero}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-8">
                    <Field
                      component={SelectSelecione}
                      naoDesabilitarPrimeiraOpcao
                      options={getOpcoesContrato()}
                      label="Nº do Contrato"
                      name="contrato"
                      required
                      validate={required}
                      placeholder={"Selecione um Contrato"}
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Nº do Processo SEI - Contratos"
                      name="numero_processo"
                      className="input-busca-produto"
                      validate={required}
                      disabled={true}
                    />
                  </div>
                </div>

                {values.empresa && values.contrato && (
                  <div className="accordion mt-1" id="accordionCronograma">
                    <div className="card mt-3">
                      <div className={`card-header card-tipo`} id={`heading_1`}>
                        <div className="row card-header-content">
                          <span className="nome-alimento">
                            Dados do Produto
                          </span>
                          <div className="col-1 align-self-center">
                            <button
                              onClick={() => toggleCollapse(1)}
                              className="btn btn-link btn-block text-right px-0"
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
                                disabled={false}
                                apenasNumeros
                                required
                                placeholder="Informe a Quantidade Total"
                              />
                            </div>
                            <div className="col-3">
                              <Field
                                component={SelectSelecione}
                                naoDesabilitarPrimeiraOpcao
                                options={unidadesMedidaOptions}
                                label="Unidade de Medida"
                                name="unidade_medida"
                                required
                                validate={required}
                                placeholder={"Selecione a Unidade"}
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
                                validate={required}
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
                                validate={required}
                                placeholder={"Selecione a Embalagem"}
                              />
                            </div>
                          </div>

                          <div className="subtitulo">
                            Cronograma das Entregas
                          </div>
                          <hr className="linha-verde" />
                          {etapas &&
                            etapas.map((etapa, index) => (
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
                                    <Field
                                      component={InputText}
                                      label="Nº do Empenho"
                                      name={`empenho_${index}`}
                                      placeholder="Informe o Nº do Empenho"
                                      required
                                      validate={required}
                                      proibeLetras
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
                                      validate={required}
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
                                      validate={() =>
                                        duplicados.includes(index) &&
                                        "Parte já selecionada"
                                      }
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
                                      validate={required}
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
                                      validate={() =>
                                        restante !== 0 &&
                                        `quantidade total é diferente de ${values.quantidade_total ||
                                          0}`
                                      }
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
                                      validate={required}
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
                              className="btn btn-link btn-block text-right px-0"
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
                                    options={getOptionsDataProgramada(
                                      values
                                    ).filter(
                                      op =>
                                        !datasProgramadas.find(
                                          dp =>
                                            dp.nome === op.nome &&
                                            dp.index !== index
                                        )
                                    )}
                                    label="Data Programada"
                                    name={`data_recebimento_${index}`}
                                    placeholder={"Selecionar a Data"}
                                  />
                                  <OnChange name={`data_recebimento_${index}`}>
                                    {async value => {
                                      const index_ = datasProgramadas.findIndex(
                                        dp => dp.index === index
                                      );
                                      if (index_ !== -1) {
                                        datasProgramadas.splice(index_, 1);
                                      }
                                      datasProgramadas.push({
                                        nome: value,
                                        index
                                      });
                                      setDatasProgramadas(datasProgramadas);
                                      form.change("reload", !values.reload);
                                    }}
                                  </OnChange>
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
                )}

                <hr />

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Assinar e Enviar Cronograma"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
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
                <ModalAssinaturaUsuario
                  titulo="Assinar Cronograma"
                  texto="Você confirma a assinatura digital deste cronograma de entrega"
                  show={showModal}
                  loading={carregando}
                  handleClose={() => {
                    setShowModal(false);
                    setCarregando(false);
                  }}
                  handleSim={password => {
                    values["password"] = password;
                    salvarCronograma(values, false);
                  }}
                />
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
