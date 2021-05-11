import HTTP_STATUS from "http-status-codes";

import { produtoJaExiste } from "services/produto.service";

export const validaFormularioStep1 = async ({
  eh_para_alunos_com_dieta,
  protocolos,
  nome,
  marca,
  fabricante,
  componentes,
  tem_aditivos_alergenicos,
  aditivos
}) => {
  let arrayValidacao = [];
  if (eh_para_alunos_com_dieta === null) {
    arrayValidacao.push(
      "Informe se produto se destina a alunos com dieta especial."
    );
  } else if (eh_para_alunos_com_dieta !== null) {
    if (eh_para_alunos_com_dieta && protocolos.length === 0) {
      arrayValidacao.push("Precisa informar ao menos uma patologia");
    }
  }
  if (nome === null) {
    arrayValidacao.push("Informe o nome do produto.");
  }
  if (marca === null) {
    arrayValidacao.push("Informe uma marca do produto.");
  }
  if (fabricante === null) {
    arrayValidacao.push("Informe um fabricante do produto.");
  }
  if (componentes === null) {
    arrayValidacao.push("Informe os componentes do produto.");
  }
  if (componentes && componentes.length > 5000) {
    arrayValidacao.push(
      'Sistema não permite campo "Nome dos componentes do produto" com mais de 5000 caracteres.'
    );
  }
  if (tem_aditivos_alergenicos === null) {
    arrayValidacao.push("Informe se produto possui aditivos alergênicos.");
  } else if (tem_aditivos_alergenicos !== null) {
    if (tem_aditivos_alergenicos && aditivos === null) {
      arrayValidacao.push("Informe os aditivos alergênicos.");
    }
  }
  if (arrayValidacao.length === 0) {
    const resposta = await produtoJaExiste({
      nome,
      marca,
      fabricante
    });
    if (resposta.status !== HTTP_STATUS.OK) {
      arrayValidacao.push("Erro ao consultar se produto já existe.");
    } else if (resposta.data.produto_existe) {
      arrayValidacao.push(
        "Produto já existente, não é permitido cadastro em duplicidade."
      );
    }
  }
  return arrayValidacao;
};

export const Step1EstaValido = ({ nome, marca, fabricante, componentes }) => {
  if (
    nome !== null &&
    marca !== null &&
    fabricante !== null &&
    componentes !== null
  ) {
    return true;
  } else {
    return false;
  }
};

export const retornaObjetoRequest = ({
  eh_para_alunos_com_dieta,
  protocolos,
  detalhes_da_dieta,
  nome,
  marca,
  fabricante,
  componentes,
  tem_aditivos_alergenicos,
  aditivos
}) => {
  return {
    eh_para_alunos_com_dieta: eh_para_alunos_com_dieta,
    protocolos: protocolos,
    detalhes_da_dieta: detalhes_da_dieta,
    nome: nome,
    marca: marca,
    fabricante: fabricante,
    componentes: componentes,
    tem_aditivos_alergenicos: tem_aditivos_alergenicos,
    aditivos: aditivos
  };
};

export const retornaPayloadDefault = () => {
  return {
    protocolos: [],
    marca: null,
    fabricante: null,
    imagens: [],
    informacoes_nutricionais: [],
    nome: null,
    eh_para_alunos_com_dieta: null,
    detalhes_da_dieta: null,
    componentes: null,
    tem_aditivos_alergenicos: null,
    aditivos: null,
    tipo: null,
    embalagem: null,
    prazo_validade: null,
    info_armazenamento: null,
    outras_informacoes: null,
    numero_registro: null,
    porcao: null,
    unidade_caseira: null
  };
};
