import { Dispatch, MutableRefObject, SetStateAction } from "react";
import createDecorator from "final-form-calculate";

import { getEnderecoPorCEP } from "services/cep.service";
import {
  getListaCompletaProdutosLogistica,
  getNomesMarcas,
  getNomesFabricantes,
  getInformacoesNutricionaisOrdenadas,
} from "services/produto.service";
import { getUnidadesDeMedidaLogistica } from "services/cronograma.service";
import { getTerceirizadaUUID } from "services/terceirizada.service";
import {
  cadastraRascunhoFichaTecnica,
  cadastrarFichaTecnicaDoRascunho,
  cadastrarFichaTecnica,
  editaRascunhoFichaTecnica,
  getFichaTecnica,
} from "services/fichaTecnica.service";

import { removeCaracteresEspeciais, exibeError } from "helpers/utilities";
import { downloadAndConvertToBase64 } from "components/Shareable/Input/InputFile/helper";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { FICHA_TECNICA, PRE_RECEBIMENTO } from "configs/constants";

import {
  ArquivoForm,
  CategoriaFichaTecnicaChoices,
  FichaTecnicaDetalhada,
  OptionsGenerico,
} from "interfaces/pre_recebimento.interface";
import { TerceirizadaComEnderecoInterface } from "interfaces/terceirizada.interface";

import {
  FichaTecnicaPayload,
  InformacoesNutricionaisFichaTecnicaPayload,
} from "./interfaces";
import { ResponseInformacoesNutricionais } from "interfaces/responses.interface";
import { InformacaoNutricional } from "interfaces/produto.interface";
import { MeusDadosInterface } from "context/MeusDadosContext/interfaces";
import { NavigateFunction } from "react-router-dom";

export const stringToBoolean = (str: string): boolean =>
  str === "1" ? true : str === "0" ? false : undefined;

export const booleanToString = (str: boolean): string =>
  str === true ? "1" : str === false ? "0" : undefined;

export const numberToStringDecimal = (num: number) =>
  num?.toString().replace(".", ",");

export const stringDecimalToNumber = (str: string) =>
  str === "0" ? Number(str) : Number(str?.replace(",", ".")) || null;

export const formataInformacoesNutricionais = (values: Record<string, any>) => {
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

export const cepCalculator = (
  setDesabilitaEndereco: Dispatch<SetStateAction<boolean>>
) =>
  createDecorator({
    field: "cep_fabricante",
    updates: {
      dummy: (minimumValue, allValues: FichaTecnicaPayload) =>
        buscaCEP(minimumValue, allValues, setDesabilitaEndereco),
    },
  });

export const buscaCEP = async (
  cep: string,
  values: FichaTecnicaPayload,
  setDesabilitaEndereco: Dispatch<SetStateAction<boolean>>
) => {
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

export const carregarProdutos = async (
  setProdutosOptions: Dispatch<SetStateAction<OptionsGenerico[]>>
) => {
  const response = await getListaCompletaProdutosLogistica();
  setProdutosOptions(response.data.results);
};

export const carregarMarcas = async (
  setMarcasOptions: Dispatch<SetStateAction<OptionsGenerico[]>>
) => {
  const response = await getNomesMarcas();
  setMarcasOptions(response.data.results);
};

export const carregarFabricantes = async (
  setFabricantesOptions: Dispatch<SetStateAction<OptionsGenerico[]>>
) => {
  const response = await getNomesFabricantes();
  setFabricantesOptions(response.data.results);
};

export const carregarUnidadesMedida = async (
  setUnidadesMedidaOptions: Dispatch<SetStateAction<OptionsGenerico[]>>
) => {
  const response = await getUnidadesDeMedidaLogistica();
  setUnidadesMedidaOptions(response.data.results);
};

export const carregarTerceirizada = async (
  ficha: FichaTecnicaDetalhada,
  meusDados: Record<string, any>,
  setProponente: Dispatch<SetStateAction<TerceirizadaComEnderecoInterface>>
) => {
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

export const carregarDados = async (
  listaCompletaInformacoesNutricionais: MutableRefObject<
    InformacaoNutricional[]
  >,
  listaInformacoesNutricionaisFichaTecnica: MutableRefObject<
    InformacaoNutricional[]
  >,
  meusDados: MeusDadosInterface,
  setFicha: Dispatch<SetStateAction<FichaTecnicaDetalhada>>,
  setInitialValues: Dispatch<SetStateAction<Record<string, any>>>,
  setArquivo: Dispatch<SetStateAction<ArquivoForm[]>>,
  setProponente: Dispatch<SetStateAction<TerceirizadaComEnderecoInterface>>,
  setCarregando: Dispatch<SetStateAction<boolean>>
) => {
  setCarregando(true);

  const responseInformacoes: ResponseInformacoesNutricionais =
    await getInformacoesNutricionaisOrdenadas();
  listaCompletaInformacoesNutricionais.current =
    responseInformacoes.data.results;

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
    setInitialValues(geraInitialValues(fichaTecnica));

    if (fichaTecnica.arquivo) {
      const arquivo = await carregarArquivo(fichaTecnica.arquivo);
      setArquivo(arquivo);
    }

    const response = await getTerceirizadaUUID(fichaTecnica.empresa.uuid);
    setProponente(response.data);
  } else if (meusDados) {
    const response = await getTerceirizadaUUID(
      meusDados.vinculo_atual.instituicao.uuid
    );
    setProponente(response.data);
  }

  setCarregando(false);
};

export const validaRascunho = (values: FichaTecnicaPayload): boolean => {
  return (
    !values.produto ||
    !values.marca ||
    !values.categoria ||
    !values.pregao_chamada_publica
  );
};

export const validaProximo = (
  values: FichaTecnicaPayload,
  errors: Record<string, string>,
  stepAtual: number
): boolean => {
  const validaStepMap = [
    validaProximoIdentificacaoProduto,
    validaProximoInformacoesNutricionais,
  ];

  return validaStepMap[stepAtual](values, errors);
};

export const validaProximoIdentificacaoProduto = (
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

export const validaProximoInformacoesNutricionais = (
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

export const validaAssinarEnviar = (
  values: FichaTecnicaPayload,
  errors: Record<string, string>,
  arquivo: ArquivoForm[]
): boolean => {
  return (
    Object.keys(errors).length !== 0 ||
    !values.embalagens_de_acordo_com_anexo ||
    !values.rotulo_legivel ||
    !arquivo.length
  );
};

export const geraInitialValues = (ficha: FichaTecnicaDetalhada) => {
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

  const initialValues = {
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
    porcao: numberToStringDecimal(ficha.porcao),
    unidade_medida_porcao: ficha.unidade_medida_porcao?.uuid,
    valor_unidade_caseira: numberToStringDecimal(ficha.valor_unidade_caseira),
    unidade_medida_caseira: ficha.unidade_medida_caseira,
    ...valuesInformacoesNutricionais,
    ...valuesSelect,
    prazo_validade_descongelamento: ficha.prazo_validade_descongelamento,
    condicoes_de_conservacao: ficha.condicoes_de_conservacao,
    temperatura_congelamento: numberToStringDecimal(
      ficha.temperatura_congelamento
    ),
    temperatura_veiculo: numberToStringDecimal(ficha.temperatura_veiculo),
    condicoes_de_transporte: ficha.condicoes_de_transporte,
    embalagem_primaria: ficha.embalagem_primaria,
    embalagem_secundaria: ficha.embalagem_secundaria,
    embalagens_de_acordo_com_anexo: ficha.embalagens_de_acordo_com_anexo,
    material_embalagem_primaria: ficha.material_embalagem_primaria,
    produto_eh_liquido: booleanToString(ficha.produto_eh_liquido),
    volume_embalagem_primaria: numberToStringDecimal(
      ficha.volume_embalagem_primaria
    ),
    unidade_medida_volume_primaria: ficha.unidade_medida_volume_primaria?.uuid,
    peso_liquido_embalagem_primaria: numberToStringDecimal(
      ficha.peso_liquido_embalagem_primaria
    ),
    unidade_medida_primaria: ficha.unidade_medida_primaria?.uuid,
    peso_liquido_embalagem_secundaria: numberToStringDecimal(
      ficha.peso_liquido_embalagem_secundaria
    ),
    unidade_medida_secundaria: ficha.unidade_medida_secundaria?.uuid,
    peso_embalagem_primaria_vazia: numberToStringDecimal(
      ficha.peso_embalagem_primaria_vazia
    ),
    unidade_medida_primaria_vazia: ficha.unidade_medida_primaria_vazia?.uuid,
    peso_embalagem_secundaria_vazia: numberToStringDecimal(
      ficha.peso_embalagem_secundaria_vazia
    ),
    unidade_medida_secundaria_vazia:
      ficha.unidade_medida_secundaria_vazia?.uuid,
    sistema_vedacao_embalagem_secundaria:
      ficha.sistema_vedacao_embalagem_secundaria,
    rotulo_legivel: ficha.rotulo_legivel,
    variacao_percentual: numberToStringDecimal(ficha.variacao_percentual),
    nome_responsavel_tecnico: ficha.nome_responsavel_tecnico,
    habilitacao: ficha.habilitacao,
    numero_registro_orgao: ficha.numero_registro_orgao,
    modo_de_preparo: ficha.modo_de_preparo,
    informacoes_adicionais: ficha.informacoes_adicionais,
  };

  return initialValues as FichaTecnicaPayload;
};

export const carregarArquivo = async (urlArquivo: string) => {
  const arquivo = Array({
    nome: "ficha-assinada-rt.pdf",
    base64: await downloadAndConvertToBase64(urlArquivo),
  });

  return arquivo;
};

export const formataPayload = (
  values: Record<string, any>,
  proponente: TerceirizadaComEnderecoInterface,
  produtosOptions: OptionsGenerico[],
  fabricantesOptions: OptionsGenerico[],
  arquivo: ArquivoForm[],
  password: string = ""
): FichaTecnicaPayload => {
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
    porcao: stringDecimalToNumber(values.porcao),
    unidade_medida_porcao: values.unidade_medida_porcao || null,
    valor_unidade_caseira: stringDecimalToNumber(values.valor_unidade_caseira),
    unidade_medida_caseira: values.unidade_medida_caseira || "",
    informacoes_nutricionais: formataInformacoesNutricionais(values),
    condicoes_de_conservacao: values.condicoes_de_conservacao || "",
    embalagem_primaria: values.embalagem_primaria || "",
    embalagem_secundaria: values.embalagem_secundaria || "",
    embalagens_de_acordo_com_anexo:
      values.embalagens_de_acordo_com_anexo || false,
    material_embalagem_primaria: values.material_embalagem_primaria || "",
    peso_liquido_embalagem_primaria: stringDecimalToNumber(
      values.peso_liquido_embalagem_primaria
    ),
    unidade_medida_primaria: values.unidade_medida_primaria || "",
    peso_liquido_embalagem_secundaria: stringDecimalToNumber(
      values.peso_liquido_embalagem_secundaria
    ),
    unidade_medida_secundaria: values.unidade_medida_secundaria || "",
    peso_embalagem_primaria_vazia: stringDecimalToNumber(
      values.peso_embalagem_primaria_vazia
    ),
    unidade_medida_primaria_vazia: values.unidade_medida_primaria_vazia || "",
    peso_embalagem_secundaria_vazia: stringDecimalToNumber(
      values.peso_embalagem_secundaria_vazia
    ),
    unidade_medida_secundaria_vazia:
      values.unidade_medida_secundaria_vazia || "",
    sistema_vedacao_embalagem_secundaria:
      values.sistema_vedacao_embalagem_secundaria || "",
    rotulo_legivel: values.rotulo_legivel || false,
    nome_responsavel_tecnico: values.nome_responsavel_tecnico || "",
    habilitacao: values.habilitacao || "",
    numero_registro_orgao: values.numero_registro_orgao || "",
    arquivo: arquivo[0]?.base64 || "",
    modo_de_preparo: values.modo_de_preparo || "",
    informacoes_adicionais: values.informacoes_adicionais || "",
  };

  if (payload.alergenicos) {
    payload.ingredientes_alergenicos = values.ingredientes_alergenicos || "";
  }

  if (payload.lactose) {
    payload.lactose_detalhe = values.lactose_detalhe || "";
  }

  if (payload.categoria === "PERECIVEIS") {
    payload.numero_registro = values.numero_registro;
    payload.agroecologico = stringToBoolean(values.agroecologico as string);
    payload.organico = stringToBoolean(values.organico as string);
    payload.prazo_validade_descongelamento =
      values.prazo_validade_descongelamento;
    payload.temperatura_congelamento = stringDecimalToNumber(
      values.temperatura_congelamento
    );
    payload.temperatura_veiculo = stringDecimalToNumber(
      values.temperatura_veiculo
    );
    payload.condicoes_de_transporte = values.condicoes_de_transporte;
    payload.variacao_percentual = stringDecimalToNumber(
      values.variacao_percentual
    );

    if (payload.organico) {
      payload.mecanismo_controle = values.mecanismo_controle;
    }
  }

  if (payload.categoria === "NAO_PERECIVEIS") {
    payload.produto_eh_liquido = stringToBoolean(
      values.produto_eh_liquido as string
    );

    if (payload.produto_eh_liquido) {
      payload.volume_embalagem_primaria = stringDecimalToNumber(
        values.volume_embalagem_primaria
      );
      payload.unidade_medida_volume_primaria =
        values.unidade_medida_volume_primaria || "";
    }
  }

  payload.password = password;

  return payload;
};

export const inserirArquivoFichaAssinadaRT = (
  files: ArquivoForm[],
  setArquivo: Dispatch<SetStateAction<ArquivoForm[]>>
) => {
  setArquivo(files);
};

export const removerArquivoFichaAssinadaRT = (
  setArquivo: Dispatch<SetStateAction<ArquivoForm[]>>
) => {
  setArquivo([]);
};

export const salvarRascunho = async (
  payload: FichaTecnicaPayload,
  ficha: FichaTecnicaDetalhada,
  setFicha: Dispatch<SetStateAction<FichaTecnicaDetalhada>>,
  setCarregando: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setCarregando(true);

    const response = ficha.uuid
      ? await editaRascunhoFichaTecnica(payload, ficha.uuid)
      : await cadastraRascunhoFichaTecnica(payload);

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

export const assinarEnviarFichaTecnica = async (
  payload: FichaTecnicaPayload,
  ficha: FichaTecnicaDetalhada,
  setCarregando: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  try {
    setCarregando(true);

    const response = ficha.uuid
      ? await cadastrarFichaTecnicaDoRascunho(payload, ficha.uuid)
      : await cadastrarFichaTecnica(payload);

    if (response.status === 201 || response.status === 200) {
      toastSuccess("Ficha Técnica Assinada e Enviada com sucesso!");
      navigate(`/${PRE_RECEBIMENTO}/${FICHA_TECNICA}`);
    } else {
      toastError("Ocorreu um erro ao assinar e enviar a Ficha Técnica");
    }
  } catch (error) {
    exibeError(error, "Ocorreu um erro ao assinar e enviar a Ficha Técnica");
  } finally {
    setCarregando(false);
  }
};

export const gerenciaModalCadastroExterno = (
  tipo: string,
  setTipoCadastro: Dispatch<SetStateAction<string>>,
  setShowModalCadastro: Dispatch<SetStateAction<boolean>>
) => {
  setTipoCadastro(tipo);
  setShowModalCadastro(true);
};
