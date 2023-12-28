import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { Field, Form } from "react-final-form";
import SelectSelecione from "components/Shareable/SelectSelecione";
import Label from "components/Shareable/Label";
import {
  getListaCompletaProdutosLogistica,
  getNomesMarcas,
  getNomesFabricantes,
  getInformacoesNutricionaisOrdenadas,
} from "services/produto.service";
import { getEnderecoPorCEP } from "services/cep.service";
import { getTerceirizadaUUID } from "services/terceirizada.service";
import { getUnidadesDeMedidaLogistica } from "services/cronograma.service";
import {
  required,
  email,
  composeValidators,
  inteiroOuDecimalComVirgula,
} from "helpers/fieldValidators";
import { Spin, Steps } from "antd";
import { CATEGORIA_OPTIONS } from "../../constants";
import InputText from "components/Shareable/Input/InputText";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";
import Collapse from "components/Shareable/Collapse";
import MeusDadosContext from "context/MeusDadosContext";
import createDecorator from "final-form-calculate";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";
import { cepMask, cnpjMask, telefoneMask } from "constants/shared";
import {
  cadastraRascunhoFichaTecnica,
  editaRascunhoFichaTecnica,
  getFichaTecnica,
} from "services/fichaTecnica.service";
import { exibeError, removeCaracteresEspeciais } from "helpers/utilities";
import {
  toastError,
  toastSuccess,
} from "../../../../../Shareable/Toast/dialogs";
import { getListaFiltradaAutoCompleteSelect } from "../../../../../../helpers/autoCompleteSelect";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import FormPereciveis from "./components/FormPereciveis";
import FormNaoPereciveis from "./components/FormNaoPereciveis";
import { OnChange } from "react-final-form-listeners";
import TabelaNutricional from "components/Shareable/TabelaNutricional";
import ModalCadastrarItemIndividual from "components/Shareable/ModalCadastrarItemIndividual";

import {
  CategoriaFichaTecnicaChoices,
  FichaTecnicaDetalhada,
  OptionsGenerico,
} from "interfaces/pre_recebimento.interface";
import { MeusDadosInterfaceOuter } from "context/MeusDadosContext/interfaces";
import { TerceirizadaComEnderecoInterface } from "interfaces/terceirizada.interface";
import {
  ResponseFichaTecnicaDetalhada,
  ResponseInformacoesNutricionais,
} from "interfaces/responses.interface";
import { InformacaoNutricional } from "interfaces/produto.interface";
import {
  FichaTecnicaPayload,
  InformacoesNutricionaisFichaTecnicaPayload,
} from "../../interfaces";

export default () => {
  const { meusDados } = useContext<MeusDadosInterfaceOuter>(MeusDadosContext);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtosOptions, setProdutosOptions] = useState<OptionsGenerico[]>([]);
  const [marcasOptions, setMarcasOptions] = useState<OptionsGenerico[]>([]);
  const [fabricantesOptions, setFabricantesOptions] = useState<
    OptionsGenerico[]
  >([]);
  const [unidadesMedidaOptions, setUnidadesMedidaOptions] = useState<
    OptionsGenerico[]
  >([]);
  const [proponente, setProponente] =
    useState<TerceirizadaComEnderecoInterface>(
      {} as TerceirizadaComEnderecoInterface
    );
  const [desabilitaEndereco, setDesabilitaEndereco] = useState(true);
  const [collapse, setCollapse] = useState([]);
  const [ficha, setFicha] = useState<FichaTecnicaDetalhada>(
    {} as FichaTecnicaDetalhada
  );
  const [initialValues, setInitialValues] = useState<FichaTecnicaPayload>({});
  const [stepAtual, setStepAtual] = useState(0);
  const listaCompletaInformacoesNutricionais = useRef<InformacaoNutricional[]>(
    []
  );
  const listaInformacoesNutricionaisFichaTecnica = useRef<
    InformacaoNutricional[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState("");

  const onSubmit = (): void => {};

  const carregarProdutos = async () => {
    const response = await getListaCompletaProdutosLogistica();
    setProdutosOptions(response.data.results);
  };

  const carregarMarcas = async () => {
    const response = await getNomesMarcas();
    setMarcasOptions(response.data.results);
  };

  const carregarFabricantes = async () => {
    const response = await getNomesFabricantes();
    setFabricantesOptions(response.data.results);
  };

  const carregarUnidadesMedida = async () => {
    const response = await getUnidadesDeMedidaLogistica();
    setUnidadesMedidaOptions(response.data.results);
  };

  const carregarTerceirizada = async () => {
    if (ficha.empresa?.uuid) {
      const response = await getTerceirizadaUUID(ficha.empresa.uuid);
      setProponente(response.data);
    } else if (meusDados) {
      const response = await getTerceirizadaUUID(
        meusDados.vinculo_atual.instituicao.uuid
      );
      setProponente(response.data);
    }
  };

  const atualizarDadosCarregados = async () => {
    setCarregando(true);
    await carregarProdutos();
    await carregarMarcas();
    await carregarFabricantes();
    setCarregando(false);
  };

  const gerenciaModalCadastroExterno = (tipo: string) => {
    setTipoCadastro(tipo);
    setShowModal(true);
  };

  const cepCalculator = createDecorator({
    field: "cep_fabricante",
    updates: {
      dummy: (minimumValue, allValues) => buscaCEP(minimumValue, allValues),
    },
  });

  const buscaCEP = async (cep: string, values: FichaTecnicaPayload) => {
    if (cep?.length === 9) {
      const response = await getEnderecoPorCEP(cep);
      if (response.status === 200 && !response.data.erro) {
        const { data } = response;
        values.bairro_fabricante = data.bairro;
        values.cidade_fabricante = data.localidade;
        values.endereco_fabricante = data.logradouro;
        values.estado_fabricante = data.uf;
        setDesabilitaEndereco(true);
      } else {
        setDesabilitaEndereco(false);
      }
    }
  };

  const geraInitialValues = (ficha: FichaTecnicaDetalhada) => {
    const valuesInformacoesNutricionais = {};
    ficha?.informacoes_nutricionais.forEach((informacao) => {
      valuesInformacoesNutricionais[
        `quantidade_por_100g_${informacao.informacao_nutricional.uuid}`
      ] = informacao.quantidade_por_100g;
      valuesInformacoesNutricionais[
        `quantidade_porcao_${informacao.informacao_nutricional.uuid}`
      ] = informacao.quantidade_porcao;
      valuesInformacoesNutricionais[
        `valor_diario_${informacao.informacao_nutricional.uuid}`
      ] = informacao.valor_diario;
    });

    const valuesSelect = {};
    ficha?.informacoes_nutricionais
      .filter(({ informacao_nutricional }) => !informacao_nutricional.eh_fixo)
      .forEach((informacao, index) => {
        valuesSelect[`informacao_adicional_${index}`] =
          informacao.informacao_nutricional.uuid;
      });

    return {
      ...initialValues,
      produto: ficha.produto?.nome,
      marca: ficha.marca.uuid,
      categoria: ficha.categoria as CategoriaFichaTecnicaChoices,
      pregao_chamada_publica: ficha.pregao_chamada_publica,
      fabricante: ficha.fabricante?.nome,
      cnpj_fabricante: ficha.cnpj_fabricante,
      cep_fabricante: ficha.cep_fabricante,
      endereco_fabricante: ficha.endereco_fabricante,
      numero_fabricante: ficha.numero_fabricante,
      complemento_fabricante: ficha.complemento_fabricante,
      bairro_fabricante: ficha.bairro_fabricante,
      cidade_fabricante: ficha.cidade_fabricante,
      estado_fabricante: ficha.estado_fabricante,
      email_fabricante: ficha.email_fabricante,
      telefone_fabricante: ficha.telefone_fabricante,
      prazo_validade: ficha.prazo_validade,
      numero_registro: ficha.numero_registro,
      agroecologico: booleanToString(ficha.agroecologico),
      organico: booleanToString(ficha.organico),
      mecanismo_controle: ficha.mecanismo_controle,
      componentes_produto: ficha.componentes_produto,
      alergenicos: booleanToString(ficha.alergenicos),
      ingredientes_alergenicos: ficha.ingredientes_alergenicos,
      gluten: booleanToString(ficha.gluten),
      lactose: booleanToString(ficha.lactose),
      lactose_detalhe: ficha.lactose_detalhe,
      porcao: ficha.porcao,
      unidade_medida_porcao: ficha.unidade_medida_porcao?.uuid,
      valor_unidade_caseira: ficha.valor_unidade_caseira,
      unidade_medida_caseira: ficha.unidade_medida_caseira,
      ...valuesInformacoesNutricionais,
      ...valuesSelect,
    };
  };

  const formataPayload = (values: Record<string, any>): FichaTecnicaPayload => {
    let payload: FichaTecnicaPayload = {
      produto: produtosOptions.find((p) => p.nome === values.produto)?.uuid,
      marca: values.marca,
      categoria: values.categoria,
      pregao_chamada_publica: values.pregao_chamada_publica,
      empresa: proponente.uuid,
      fabricante:
        fabricantesOptions.find((p) => p.nome === values.fabricante)?.uuid ||
        null,
      cnpj_fabricante: removeCaracteresEspeciais(values.cnpj_fabricante) || "",
      cep_fabricante: removeCaracteresEspeciais(values.cep_fabricante) || "",
      endereco_fabricante: values.endereco_fabricante || "",
      numero_fabricante: values.numero_fabricante || "",
      complemento_fabricante: values.complemento_fabricante || "",
      bairro_fabricante: values.bairro_fabricante || "",
      cidade_fabricante: values.cidade_fabricante || "",
      estado_fabricante: values.estado_fabricante || "",
      email_fabricante: values.email_fabricante || "",
      telefone_fabricante:
        removeCaracteresEspeciais(values.telefone_fabricante) || "",
      prazo_validade: values.prazo_validade || "",
      componentes_produto: values.componentes_produto || "",
      alergenicos: stringToBoolean(values.alergenicos as string),
      gluten: stringToBoolean(values.gluten as string),
      lactose: stringToBoolean(values.lactose as string),
      mecanismo_controle: "",
      ingredientes_alergenicos: "",
      lactose_detalhe: "",
      numero_registro: "",
      porcao: values.porcao || "",
      unidade_medida_porcao: values.unidade_medida_porcao || null,
      valor_unidade_caseira: values.valor_unidade_caseira || "",
      unidade_medida_caseira: values.unidade_medida_caseira || "",
      informacoes_nutricionais: formataInformacoesNutricionais(values),
    };
    if (payload.alergenicos) {
      payload.ingredientes_alergenicos = values.ingredientes_alergenicos || "";
    }
    if (payload.lactose) {
      payload.lactose_detalhe = values.lactose_detalhe || "";
    }
    if (payload.categoria === "PERECIVEIS") {
      payload = {
        ...payload,
        numero_registro: values.numero_registro || "",
        agroecologico: stringToBoolean(values.agroecologico as string),
        organico: stringToBoolean(values.organico as string),
      };
      if (payload.organico) {
        payload.mecanismo_controle = values.mecanismo_controle || "";
      }
    }

    return payload;
  };

  const stringToBoolean = (str: string): boolean =>
    str === "1" ? true : str === "0" ? false : undefined;

  const booleanToString = (str: boolean): string =>
    str === true ? "1" : str === false ? "0" : undefined;

  const formataInformacoesNutricionais = (values: Record<string, any>) => {
    const uuids_informacoes = Object.keys(values)
      .filter((key) => key.startsWith("quantidade_por_100g_"))
      .map((key) => key.split("_").pop());

    const payload = uuids_informacoes.map((uuid) => {
      return {
        informacao_nutricional: uuid,
        quantidade_por_100g: values[`quantidade_por_100g_${uuid}`],
        quantidade_porcao: values[`quantidade_porcao_${uuid}`],
        valor_diario: values[`valor_diario_${uuid}`],
      };
    });

    return payload as InformacoesNutricionaisFichaTecnicaPayload[];
  };

  const salvarRascunho = async (values: FichaTecnicaPayload) => {
    const payload = formataPayload(values);

    try {
      setCarregando(true);
      let response: ResponseFichaTecnicaDetalhada;
      if (ficha.uuid) {
        response = await editaRascunhoFichaTecnica(payload, ficha.uuid);
      } else {
        response = await cadastraRascunhoFichaTecnica(payload);
      }

      if (response.status === 201 || response.status === 200) {
        toastSuccess("Rascunho salvo com sucesso!");
        setFicha(response.data);
      } else {
        toastError("Ocorreu um erro ao salvar a Ficha Técnica");
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar a Ficha Técnica");
    } finally {
      setCarregando(false);
    }
  };

  const carregarDados = async (): Promise<void> => {
    const responseInformacoes: ResponseInformacoesNutricionais =
      await getInformacoesNutricionaisOrdenadas();
    listaCompletaInformacoesNutricionais.current =
      responseInformacoes.data.results;

    let initialValues = {};

    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const responseFicha = await getFichaTecnica(uuid);
      const fichaTecnica = responseFicha.data;

      listaInformacoesNutricionaisFichaTecnica.current =
        fichaTecnica.informacoes_nutricionais.map(
          ({ informacao_nutricional }) => informacao_nutricional
        );

      setFicha(fichaTecnica);

      initialValues = { ...geraInitialValues(fichaTecnica) };
    }

    setInitialValues(initialValues);
  };

  useEffect(() => {
    (async () => {
      setCarregando(true);
      await carregarProdutos();
      await carregarMarcas();
      await carregarFabricantes();
      await carregarUnidadesMedida();
      await carregarDados();
      setCarregando(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!proponente.uuid) {
        setCarregando(true);
        await carregarTerceirizada();
        setCarregando(false);
      }
    })();
  }, [meusDados, ficha]);

  const validaRascunho = (values: FichaTecnicaPayload): boolean => {
    return (
      !values.produto ||
      !values.marca ||
      !values.categoria ||
      !values.pregao_chamada_publica
    );
  };

  const validaProximo = (
    values: FichaTecnicaPayload,
    errors: Record<string, string>
  ): boolean => {
    const validaStepMap = [
      validaProximoIdentificacaoProduto,
      validaProximoInformacoesNutricionais,
    ];

    return validaStepMap[stepAtual](values, errors);
  };

  const validaProximoIdentificacaoProduto = (
    values: FichaTecnicaPayload,
    errors: Record<string, string>
  ): boolean => {
    const campoAlergenicosValido =
      (values.alergenicos === "1" && values.ingredientes_alergenicos) ||
      values.alergenicos === "0";

    const campoComLactoseValido =
      (values.lactose === "1" && values.lactose_detalhe) ||
      values.lactose === "0";

    const campoOrganicoValido =
      (values.organico === "1" && values.mecanismo_controle) ||
      values.organico === "0";

    const camposFormPereciveisValidos =
      values.numero_registro && values.agroecologico && campoOrganicoValido;

    return (
      Object.keys(errors).length !== 0 ||
      !values.produto ||
      !values.marca ||
      !values.categoria ||
      !values.pregao_chamada_publica ||
      !values.fabricante ||
      !values.prazo_validade ||
      !values.componentes_produto ||
      !values.gluten ||
      !campoAlergenicosValido ||
      !campoComLactoseValido ||
      (values.categoria === "PERECIVEIS" && !camposFormPereciveisValidos)
    );
  };

  const validaProximoInformacoesNutricionais = (
    values: FichaTecnicaPayload,
    errors: Record<string, string>
  ): boolean => {
    return (
      Object.keys(errors).length !== 0 ||
      !values.porcao ||
      !values.unidade_medida_porcao ||
      !values.valor_unidade_caseira ||
      !values.unidade_medida_caseira
    );
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-ficha-tecnica">
        <div className="card-body cadastro-ficha-tecnica">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            decorators={[cepCalculator]}
            render={({ form, handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className="steps">
                  <Steps
                    size="small"
                    current={stepAtual}
                    items={[
                      {
                        title: "Identificação do Produto",
                      },
                      {
                        title: "Informações Nutricionais",
                      },
                      {
                        title: "Informações de Acondicionamento",
                      },
                    ]}
                  />
                </div>

                <hr />

                {stepAtual === 0 && (
                  <>
                    <div className="subtitulo">Identificação do Produto</div>

                    <div className="row mt-4">
                      <div className="col-6">
                        <Field
                          component={AutoCompleteSelectField}
                          options={getListaFiltradaAutoCompleteSelect(
                            produtosOptions.map((e) => e.nome),
                            values["produto"],
                            true
                          )}
                          label="Produto"
                          name={`produto`}
                          placeholder="Selecione um Produto"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                          tooltipText={
                            "Caso não localize o produto no seletor, faça o cadastro no botão Cadastrar Produto."
                          }
                        />
                        <OnChange name="produto">
                          {(value) => {
                            if (form.getState().dirty) {
                              form.restart({ produto: value });
                            }
                          }}
                        </OnChange>
                      </div>
                      <div className="col-2 cadastro-externo">
                        <Botao
                          texto="Cadastrar Produto"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="botao-cadastro-externo"
                          onClick={() =>
                            gerenciaModalCadastroExterno("PRODUTO")
                          }
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={SelectSelecione}
                          naoDesabilitarPrimeiraOpcao
                          options={CATEGORIA_OPTIONS}
                          label="Categoria"
                          name={`categoria`}
                          placeholder="Selecione uma Categoria"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                      <div className="col-6">
                        <Field
                          component={SelectSelecione}
                          naoDesabilitarPrimeiraOpcao
                          options={marcasOptions}
                          label="Marca"
                          name={`marca`}
                          placeholder="Selecione uma Marca"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                          tooltipText={
                            "Caso não localize a marca no seletor, faça o cadastro no botão Cadastrar Marca."
                          }
                        />
                      </div>
                      <div className="col-2 cadastro-externo">
                        <Botao
                          texto="Cadastrar Marca"
                          type={BUTTON_TYPE.BUTTON}
                          style={BUTTON_STYLE.GREEN_OUTLINE}
                          className="botao-cadastro-externo"
                          onClick={() => gerenciaModalCadastroExterno("MARCA")}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nº do Pregão/Chamada Pública"
                          name={`pregao_chamada_publica`}
                          placeholder="Nº do Pregão/Chamada Pública"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                          tooltipText={
                            "Pode ser informado o número do Edital do Pregão Eletrônico ou Chamada Pública referente ao Produto."
                          }
                        />
                      </div>
                    </div>
                    <hr />

                    <Collapse
                      collapse={collapse}
                      setCollapse={setCollapse}
                      titulos={[
                        <span key={0}>
                          Empresa ou Organização{" "}
                          <span className="verde-escuro">Proponente</span>
                        </span>,
                        <span className="fw-bold" key={1}>
                          Empresa ou Organização{" "}
                          <span className="verde-escuro">Fabricante</span>
                        </span>,
                        <span className="fw-bold" key={1}>
                          Detalhes do{" "}
                          <span className="verde-escuro">Produto</span>
                        </span>,
                      ]}
                      id="collapseFichaTecnica"
                    >
                      <section id="formProponente">
                        <div className="row">
                          <div className="col-6">
                            <InputText
                              label="CNPJ"
                              valorInicial={proponente.cnpj}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="Nome da Empresa/Organização"
                              valorInicial={proponente.nome_fantasia}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="Endereço"
                              valorInicial={proponente.endereco}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Nº"
                              valorInicial={proponente.numero}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <InputText
                              label="Complemento"
                              valorInicial={proponente.complemento}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Bairro"
                              valorInicial={proponente.bairro}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="CEP"
                              valorInicial={proponente.cep}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="Cidade"
                              valorInicial={proponente.cidade}
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Estado"
                              valorInicial={proponente.estado}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <InputText
                              label="E-mail"
                              valorInicial={proponente.responsavel_email}
                              required
                              disabled={true}
                            />
                          </div>
                          <div className="col-4">
                            <InputText
                              label="Telefone"
                              valorInicial={proponente.responsavel_telefone}
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                      </section>

                      <section id="formFabricante">
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={AutoCompleteSelectField}
                              options={getListaFiltradaAutoCompleteSelect(
                                fabricantesOptions.map((e) => e.nome),
                                values["fabricante"],
                                true
                              )}
                              label="Fabricantes"
                              name={`fabricante`}
                              placeholder="Selecione um Fabricante"
                              className="input-ficha-tecnica"
                              required
                              validate={required}
                            />
                          </div>
                          <div className="col-2 cadastro-externo">
                            <Botao
                              texto="Cadastrar Fabricante"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                              className="botao-cadastro-externo"
                              onClick={() =>
                                gerenciaModalCadastroExterno("FABRICANTE")
                              }
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <Field
                              component={MaskedInputText}
                              mask={cnpjMask}
                              label="CNPJ"
                              name={`cnpj_fabricante`}
                              placeholder="Digite o CNPJ"
                              className="input-ficha-tecnica"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <Field
                              component={MaskedInputText}
                              mask={cepMask}
                              label="CEP"
                              name={`cep_fabricante`}
                              placeholder="Digite o CEP"
                              className="input-ficha-tecnica"
                            />
                          </div>
                          <div className="col-8">
                            <Field
                              component={InputText}
                              label="Endereço"
                              name={`endereco_fabricante`}
                              placeholder="Digite o Endereço"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Número"
                              name={`numero_fabricante`}
                              placeholder="Digite o Número"
                              className="input-ficha-tecnica"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Complemento"
                              name={`complemento_fabricante`}
                              placeholder="Digite o Complemento"
                              className="input-ficha-tecnica"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Bairro"
                              name={`bairro_fabricante`}
                              placeholder="Digite o Bairro"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <Field
                              component={InputText}
                              label="Cidade"
                              name={`cidade_fabricante`}
                              placeholder="Digite o Cidade"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              label="Estado"
                              name={`estado_fabricante`}
                              placeholder="Digite o Estado"
                              className="input-ficha-tecnica"
                              disabled={desabilitaEndereco}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-8">
                            <Field
                              component={InputText}
                              label="E-mail"
                              name={`email_fabricante`}
                              placeholder="Digite o E-mail"
                              className="input-ficha-tecnica"
                              validate={email}
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={MaskedInputText}
                              mask={telefoneMask}
                              label="Telefone"
                              name={`telefone_fabricante`}
                              placeholder="Digite o Telefone"
                              className="input-ficha-tecnica"
                            />
                          </div>
                        </div>
                      </section>

                      <section id="formProduto">
                        {values["categoria"] === "PERECIVEIS" && (
                          <FormPereciveis values={values} />
                        )}
                        {values["categoria"] === "NAO_PERECIVEIS" && (
                          <FormNaoPereciveis values={values} />
                        )}
                      </section>
                    </Collapse>
                  </>
                )}

                {stepAtual === 1 && (
                  <>
                    <div className="subtitulo">Informações Nutricionais</div>

                    <div className="row">
                      <div className="col-6">
                        <Label content="Porção" required />
                      </div>
                      <div className="col-6">
                        <Label content="Unidade Caseira" required />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name={`porcao`}
                          placeholder="Apenas Números"
                          className="input-ficha-tecnica"
                          required
                          proibeLetras
                          validate={composeValidators(
                            required,
                            inteiroOuDecimalComVirgula
                          )}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={SelectSelecione}
                          naoDesabilitarPrimeiraOpcao
                          options={unidadesMedidaOptions}
                          name={`unidade_medida_porcao`}
                          placeholder="Unidade de Medida"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name={`valor_unidade_caseira`}
                          placeholder="Apenas Números"
                          className="input-ficha-tecnica"
                          required
                          proibeLetras
                          validate={composeValidators(
                            required,
                            inteiroOuDecimalComVirgula
                          )}
                        />
                      </div>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name={`unidade_medida_caseira`}
                          placeholder="Unidade de Medida"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                    </div>

                    <TabelaNutricional
                      values={values}
                      listaCompletaInformacoesNutricionais={
                        listaCompletaInformacoesNutricionais.current
                      }
                      informacoesNutricionaisCarregadas={
                        listaInformacoesNutricionaisFichaTecnica.current
                      }
                    />
                  </>
                )}

                <hr />

                {stepAtual === 0 && (
                  <div className="mt-4 mb-4">
                    <Botao
                      texto="Próximo"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={() => setStepAtual((stepAtual) => stepAtual + 1)}
                      disabled={validaProximo(values, errors)}
                    />
                  </div>
                )}

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar Rascunho"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-end ms-3"
                    onClick={() => salvarRascunho(values)}
                    disabled={validaRascunho(values)}
                  />
                </div>
                {stepAtual === 1 && (
                  <div className="mt-4 mb-4">
                    <Botao
                      texto="Anterior"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={() => setStepAtual((stepAtual) => stepAtual - 1)}
                    />
                  </div>
                )}
              </form>
            )}
          />
        </div>
      </div>

      <ModalCadastrarItemIndividual
        closeModal={() => setShowModal(false)}
        showModal={showModal}
        atualizarDadosCarregados={() => atualizarDadosCarregados()}
        tipoCadastro={tipoCadastro}
        tipoCadastroVisualizacao={
          tipoCadastro[0] + tipoCadastro.slice(1).toLowerCase()
        }
      />
    </Spin>
  );
};
