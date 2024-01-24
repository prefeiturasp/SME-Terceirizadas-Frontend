import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import "./styles.scss";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { Field, Form, FormSpy } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import AutoCompleteField from "components/Shareable/AutoCompleteField";
import { getNomesDistribuidores } from "services/logistica.service";
import Select from "components/Shareable/Select";
import Label from "components/Shareable/Label";
import {
  cadastraCronograma,
  editaCronograma,
  getCronograma,
  getRascunhos,
  getUnidadesDeMedidaLogistica,
} from "services/cronograma.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { useHistory } from "react-router-dom";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";
import Rascunhos from "../RascunhosCronograma";
import "../CronogramaEntrega/styles.scss";
import {
  required,
  composeValidators,
  decimalMonetario,
} from "helpers/fieldValidators";
import { exibeError, formataMilhar } from "helpers/utilities";
import { getEmpresasCronograma } from "services/terceirizada.service";
import { ModalAssinaturaUsuario } from "components/Shareable/ModalAssinaturaUsuario";
import { MSG_SENHA_INVALIDA } from "components/screens/helper";
import FormEtapa from "../../../PreRecebimento/FormEtapa";
import { onChangeEtapas } from "components/PreRecebimento/FormEtapa/helper";
import FormRecebimento from "components/PreRecebimento/FormRecebimento";
import {
  getListaFichasTecnicasSimplesSemCronograma,
  getDadosCronogramaFichaTecnica,
} from "services/fichaTecnica.service";
import {
  stringNaoVaziaOuUndefined,
  numberToStringDecimal,
} from "helpers/parsers";
import {
  formataPayload,
  geraOptionsFichasTecnicas,
  getEmpresaFiltrado,
  getOpcoesContrato,
  validaRascunho,
} from "./helpers";

export default () => {
  const [carregando, setCarregando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [collapse, setCollapse] = useState([]);

  const [fichasTecnicas, setFichasTecnicas] = useState([{}]);
  const [unidadesMedidaOptions, setUnidadesMedidaOptions] = useState([{}]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(undefined);
  const [contratoSelecionado, setContratoSelecionado] = useState(undefined);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState({});
  const [fichaTecnicaSelecionada, setFichaTecnicaSelecionada] = useState();
  const [etapas, setEtapas] = useState([{}]);
  const [recebimentos, setRecebimentos] = useState([{}]);
  const [armazens, setArmazens] = useState([{}]);
  const [fornecedores, setFornecedores] = useState([{}]);
  const [listaRascunhos, setListaRascunhos] = useState(null);
  const [duplicados, setDuplicados] = useState([]);
  const [restante, setRestante] = useState(undefined);
  const [edicao, setEdicao] = useState(false);
  const [cronogramaValues, setCronogramaValues] = useState({});
  const [etapasValues, setEtapasValues] = useState({});
  const [recebimentosValues, setRecebimentosValues] = useState({});

  const history = useHistory();

  const toggleCollapse = (index) => {
    setCollapse({
      [index]: !collapse[index],
    });
  };

  const salvarCronograma = async (values, rascunho) => {
    setCarregando(true);

    let payload = formataPayload(
      values,
      rascunho,
      empresaSelecionada,
      etapas,
      recebimentos
    );

    if (!rascunho) {
      payload["password"] = values["password"];
    }

    try {
      let response = edicao
        ? await editaCronograma(payload, cronogramaValues.uuid)
        : await cadastraCronograma(payload);
      if (response.status === 201 || response.status === 200) {
        if (rascunho) {
          toastSuccess("Rascunho salvo com sucesso!");
          buscaRascunhos();
        } else {
          toastSuccess(
            "Cadastro de Cronograma salvo e enviado para aprovação!"
          );
          setShowModal(false);
          history.push(`/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`);
        }
      } else {
        toastError("Ocorreu um erro ao salvar o Cronograma");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toastError(MSG_SENHA_INVALIDA);
      } else {
        exibeError(error, "Ocorreu um erro ao salvar o Cronograma");
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    if (uuid) {
      setEdicao(true);
    }

    const carregaPagina = async () => {
      setCarregando(true);

      await Promise.all([
        buscaArmazens(),
        buscaFornecedores(),
        buscaFichasTecnicas(),
        buscaUnidadesMedida(),
        buscaRascunhos(),
      ]);

      if (uuid) {
        await getDadosCronograma(uuid);
      }

      setCarregando(false);
    };

    carregaPagina();
  }, []);

  const buscaArmazens = async () => {
    const response = await getNomesDistribuidores();
    setArmazens(
      response.data.results.map((armazem) => ({
        nome: armazem.nome_fantasia,
        uuid: armazem.uuid,
      }))
    );
  };

  const buscaFornecedores = async () => {
    const response = await getEmpresasCronograma();
    setFornecedores(
      response.data.results.map((fornecedor) => ({
        uuid: fornecedor.uuid,
        value: fornecedor.nome_fantasia,
        contratos: fornecedor.contratos,
      }))
    );
  };

  const buscaFichasTecnicas = async () => {
    const response = await getListaFichasTecnicasSimplesSemCronograma();
    setFichasTecnicas(response.data.results);
  };

  const buscaUnidadesMedida = async () => {
    const response = await getUnidadesDeMedidaLogistica();
    setUnidadesMedidaOptions(response.data.results);
  };

  const buscaRascunhos = async () => {
    try {
      const response = await getRascunhos();
      if (response.status === HTTP_STATUS.OK) {
        setListaRascunhos(response.data.results);
      }
    } catch {
      toastError("Ocorreu um erro ao tentar carregar a lista de rascunhos.");
    }
  };

  const getDadosCronograma = async (uuid) => {
    try {
      const responseCronograma = await getCronograma(uuid);
      if (responseCronograma.status === HTTP_STATUS.OK) {
        const programacoesDeRecebimento =
          responseCronograma.data.programacoes_de_recebimento.reverse();
        setEtapas(responseCronograma.data.etapas);
        setRecebimentos(programacoesDeRecebimento);

        const cronogramaValues = {};
        const crono = responseCronograma.data;
        setEmpresaSelecionada(crono.empresa);
        cronogramaValues["empresa"] = crono.empresa?.nome_fantasia;
        setContratoSelecionado(crono.contrato);
        cronogramaValues["contrato"] = crono.contrato?.uuid;
        cronogramaValues["numero_processo"] = crono.contrato?.processo;
        cronogramaValues["quantidade_total"] = formataMilhar(
          crono.qtd_total_programada
        );
        cronogramaValues["unidade_medida"] = crono.unidade_medida?.uuid;
        cronogramaValues["produto"] = crono.produto?.uuid;
        cronogramaValues["armazem"] = crono.armazem?.uuid;

        setFichaTecnicaSelecionada(crono.ficha_tecnica);
        cronogramaValues["ficha_tecnica"] = crono.ficha_tecnica?.uuid;
        cronogramaValues["marca"] = crono.ficha_tecnica?.marca.nome;
        cronogramaValues["peso_liquido_embalagem_primaria"] =
          crono.ficha_tecnica?.peso_liquido_embalagem_primaria;
        cronogramaValues["unidade_medida_primaria"] =
          crono.ficha_tecnica?.unidade_medida_primaria.uuid;
        cronogramaValues["peso_liquido_embalagem_secundaria"] =
          crono.ficha_tecnica?.peso_liquido_embalagem_secundaria;
        cronogramaValues["unidade_medida_secundaria"] =
          crono.ficha_tecnica?.unidade_medida_secundaria.uuid;
        if (crono.ficha_tecnica?.volume_embalagem_primaria) {
          cronogramaValues["volume_embalagem_primaria"] =
            crono.ficha_tecnica?.volume_embalagem_primaria;
          cronogramaValues["unidade_medida_volume_primaria"] =
            crono.ficha_tecnica?.unidade_medida_volume_primaria.uuid;
        }

        cronogramaValues["custo_unitario_produto"] = numberToStringDecimal(
          crono.custo_unitario_produto
        );
        cronogramaValues["numero"] = crono.numero;
        cronogramaValues["uuid"] = crono.uuid;
        setCronogramaValues(cronogramaValues);

        const etapaValues = {};
        responseCronograma.data.etapas.forEach((etapa, i) => {
          etapaValues[`empenho_${i}`] = stringNaoVaziaOuUndefined(
            etapa.numero_empenho
          );
          etapaValues[`qtd_total_empenho_${i}`] = numberToStringDecimal(
            etapa.qtd_total_empenho
          );
          etapaValues[`etapa_${i}`] = stringNaoVaziaOuUndefined(etapa.etapa);
          etapaValues[`parte_${i}`] = stringNaoVaziaOuUndefined(etapa.parte);
          etapaValues[`data_programada_${i}`] = stringNaoVaziaOuUndefined(
            etapa.data_programada
          );
          etapaValues[`quantidade_${i}`] = stringNaoVaziaOuUndefined(
            etapa.quantidade
          );
          etapaValues[`total_embalagens_${i}`] = stringNaoVaziaOuUndefined(
            etapa.total_embalagens
          );
        });
        setEtapasValues(etapaValues);

        const recebimentoValues = {};
        programacoesDeRecebimento.forEach((recebimento, i) => {
          recebimentoValues[`data_recebimento_${i}`] =
            stringNaoVaziaOuUndefined(recebimento.data_programada);
          recebimentoValues[`tipo_recebimento_${i}`] =
            stringNaoVaziaOuUndefined(recebimento.tipo_carga);
        });
        setRecebimentosValues(recebimentoValues);
      } else {
        toastError("Ocorreu um erro ao carregar o Cronograma");
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao carregar o Cronograma");
    } finally {
      setCarregando(false);
    }
  };

  const onChangeFormSpy = async (changes) => {
    if (changes.values.empresa) selecionaEmpresa(changes.values.empresa);
    if (changes.values.contrato) selecionaContrato(changes.values);
    if (changes.values.unidade_medida)
      selecionaUnidade(changes.values.unidade_medida);
    if (changes.values.ficha_tecnica)
      await selecionaFichaTecnica(changes.values);

    onChangeEtapas(changes, etapas, setRestante, setDuplicados);
  };

  const selecionaEmpresa = (uuidEmpresa) => {
    if (!empresaSelecionada || empresaSelecionada.uuid !== uuidEmpresa) {
      let fornecedor = fornecedores.find((f) => f.value === uuidEmpresa);
      setEmpresaSelecionada(fornecedor);
    }
  };

  const selecionaContrato = (values) => {
    let uuidContrato = values.contrato;
    if (!contratoSelecionado || contratoSelecionado.uuid !== uuidContrato) {
      let contrato = empresaSelecionada.contratos.find(
        (c) => c.uuid === uuidContrato
      );

      values.numero_processo = contrato.processo;
      values.numero_pregao_chamada_publica =
        contrato.numero_pregao || contrato.numero_chamada_publica;
      values.ata = contrato.ata;

      setContratoSelecionado(contrato);
    }
  };

  const selecionaUnidade = (uuidUnidade) => {
    if (!unidadeSelecionada || unidadeSelecionada.uuid !== uuidUnidade) {
      let unidade = unidadesMedidaOptions.find((u) => u.uuid === uuidUnidade);
      setUnidadeSelecionada(unidade);
    }
  };

  const selecionaFichaTecnica = async (values) => {
    const uuidFicha = values.ficha_tecnica;
    if (
      !fichaTecnicaSelecionada ||
      fichaTecnicaSelecionada.uuid !== uuidFicha
    ) {
      setCarregando(true);

      const response = await getDadosCronogramaFichaTecnica(uuidFicha);
      const fichaTecnica = response.data;

      values.marca = fichaTecnica.marca.nome;
      values.peso_liquido_embalagem_primaria =
        fichaTecnica.peso_liquido_embalagem_primaria;
      values.unidade_medida_primaria =
        fichaTecnica.unidade_medida_primaria.uuid;
      values.peso_liquido_embalagem_secundaria =
        fichaTecnica.peso_liquido_embalagem_secundaria;
      values.unidade_medida_secundaria =
        fichaTecnica.unidade_medida_secundaria.uuid;
      if (fichaTecnica.volume_embalagem_primaria) {
        values.volume_embalagem_primaria =
          fichaTecnica.volume_embalagem_primaria;
        values.unidade_medida_volume_primaria =
          fichaTecnica.unidade_medida_volume_primaria.uuid;
      }

      setFichaTecnicaSelecionada(fichaTecnica);
      setCarregando(false);
    }
  };

  return (
    <>
      {!edicao && <Rascunhos listaRascunhos={listaRascunhos} />}
      <Spin tip="Carregando..." spinning={carregando}>
        <div className="card mt-3 card-cadastro-cronograma">
          <div className="card-body cadastro-cronograma">
            <Form
              onSubmit={() => setShowModal(true)}
              initialValues={{
                ...cronogramaValues,
                ...etapasValues,
                ...recebimentosValues,
              }}
              validate={() => {}}
              render={({ form, handleSubmit, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{ values: true, active: true, valid: true }}
                    onChange={(changes) => onChangeFormSpy(changes)}
                  />
                  <div className="row">
                    {edicao && (
                      <div className="col text-end">
                        <p>
                          <b>Nº do Cronograma: </b>

                          <span className="head-green">
                            {cronogramaValues.numero}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <Field
                        className="input-cronograma"
                        component={AutoCompleteField}
                        options={getEmpresaFiltrado(
                          fornecedores,
                          values.empresa
                        )}
                        label="Pesquisar Empresa"
                        name="empresa"
                        required
                        validate={required}
                        placeholder={"Selecione uma Empresa Cadastrada"}
                        esconderIcone
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        className="input-cronograma"
                        component={Select}
                        naoDesabilitarPrimeiraOpcao
                        options={[
                          { nome: "Selecione um Contrato", uuid: "" },
                          ...getOpcoesContrato(empresaSelecionada),
                        ]}
                        label="Nº do Contrato"
                        name="contrato"
                        required
                        validate={required}
                        disabled={!values.empresa}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4">
                      <Field
                        className="input-cronograma"
                        component={InputText}
                        label="Nº do Pregão Eletrônico/Chamada Pública"
                        name="numero_pregao_chamada_publica"
                        validate={required}
                        disabled={true}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        className="input-cronograma"
                        component={InputText}
                        label="Nº ATA"
                        name="ata"
                        validate={required}
                        disabled={true}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        className="input-cronograma"
                        component={InputText}
                        label="Nº do Processo SEI - Contratos"
                        name="numero_processo"
                        validate={required}
                        disabled={true}
                      />
                    </div>
                  </div>

                  {values.empresa && values.contrato && (
                    <div className="accordion mt-1" id="accordionCronograma">
                      <div className="card mt-3">
                        <div
                          className={`card-header card-tipo`}
                          id={`heading_1`}
                        >
                          <div className="row card-header-content">
                            <span className="col-11 nome-alimento">
                              Dados do Produto
                            </span>
                            <div className="col-1 align-self-center">
                              <button
                                onClick={() => toggleCollapse(1)}
                                className="btn btn-link btn-block text-end px-0"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse_1`}
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
                          data-bs-parent="#accordionCronograma"
                        >
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6">
                                <Field
                                  className="input-cronograma"
                                  component={Select}
                                  naoDesabilitarPrimeiraOpcao
                                  options={[
                                    {
                                      nome: "Selecione uma Ficha Técnica de Produto",
                                      uuid: "",
                                    },
                                    ...geraOptionsFichasTecnicas(
                                      fichasTecnicas,
                                      empresaSelecionada,
                                      fichaTecnicaSelecionada
                                    ),
                                  ]}
                                  label="Ficha Técnica e Produto"
                                  name="ficha_tecnica"
                                  required
                                />
                              </div>
                              <div className="col-6">
                                <Field
                                  className="input-cronograma"
                                  component={InputText}
                                  label="Marca"
                                  name="marca"
                                  required
                                  disabled
                                />
                              </div>

                              <div className="row mt-3">
                                <div className="row">
                                  <div className="col-6">
                                    <Label
                                      content="Peso da Embalagem Primária"
                                      required
                                    />
                                  </div>

                                  <div className="col-6">
                                    <Label
                                      content="Peso da Embalagem Secundária"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-3">
                                    <Field
                                      className="input-cronograma"
                                      component={InputText}
                                      name={`peso_liquido_embalagem_primaria`}
                                      required
                                      disabled
                                    />
                                  </div>

                                  <div className="col-3">
                                    <Field
                                      className="input-cronograma"
                                      component={Select}
                                      options={unidadesMedidaOptions}
                                      name={`unidade_medida_primaria`}
                                      required
                                      disabled
                                    />
                                  </div>

                                  <div className="col-3">
                                    <Field
                                      className="input-cronograma"
                                      component={InputText}
                                      name={`peso_liquido_embalagem_secundaria`}
                                      required
                                      disabled
                                    />
                                  </div>

                                  <div className="col-3">
                                    <Field
                                      className="input-cronograma"
                                      component={Select}
                                      options={unidadesMedidaOptions}
                                      name={`unidade_medida_secundaria`}
                                      required
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-6">
                                <Field
                                  className="input-cronograma"
                                  component={Select}
                                  naoDesabilitarPrimeiraOpcao
                                  options={[
                                    { nome: "Selecione o Armazém", uuid: "" },
                                    ...armazens,
                                  ]}
                                  label="Armazém"
                                  name="armazem"
                                  required
                                  validate={required}
                                />
                              </div>

                              <div className="col-3">
                                <Field
                                  className="input-cronograma"
                                  component={InputText}
                                  label="Quantidade Total Programada"
                                  name="quantidade_total"
                                  disabled={false}
                                  agrupadorMilhar
                                  required
                                  placeholder="Informe a Quantidade Total"
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  className="input-cronograma"
                                  component={Select}
                                  naoDesabilitarPrimeiraOpcao
                                  options={[
                                    { nome: "Selecione a Unidade", uuid: "" },
                                    ...unidadesMedidaOptions,
                                  ]}
                                  label="Unidade de Medida"
                                  name="unidade_medida"
                                  required
                                  validate={required}
                                />
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-4">
                                <Field
                                  className="input-cronograma"
                                  component={InputText}
                                  name={`custo_unitario_produto`}
                                  label="Custo Unitário do Produto"
                                  placeholder="Digite o Custo Unitário do Produto"
                                  required
                                  proibeLetras
                                  validate={composeValidators(
                                    required,
                                    decimalMonetario
                                  )}
                                />
                              </div>
                              <div className="col-8">
                                <div className="row">
                                  <div className="col">
                                    <Label
                                      content="Volume da Embalagem Primária"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col">
                                    <Field
                                      className="input-cronograma"
                                      component={InputText}
                                      name={`volume_embalagem_primaria`}
                                      required
                                      disabled
                                    />
                                  </div>

                                  <div className="col">
                                    <Field
                                      className="input-cronograma"
                                      component={Select}
                                      options={unidadesMedidaOptions}
                                      name={`unidade_medida_volume_primaria`}
                                      required
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="subtitulo">
                              Cronograma das Entregas
                            </div>

                            <hr className="linha-verde" />

                            <FormEtapa
                              etapas={etapas}
                              setEtapas={setEtapas}
                              values={values}
                              errors={errors}
                              duplicados={duplicados}
                              restante={restante}
                              unidadeMedida={unidadeSelecionada}
                            />
                          </div>
                        </div>
                      </div>

                      <FormRecebimento
                        values={values}
                        form={form}
                        etapas={etapas}
                        recebimentos={recebimentos}
                        setRecebimentos={setRecebimentos}
                      />
                    </div>
                  )}

                  <hr />

                  <div className="mt-4 mb-4">
                    <Botao
                      texto="Assinar e Enviar Cronograma"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="float-end ms-3"
                    />
                    <Botao
                      texto="Salvar Rascunho"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
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
                    handleSim={(password) => {
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
    </>
  );
};
