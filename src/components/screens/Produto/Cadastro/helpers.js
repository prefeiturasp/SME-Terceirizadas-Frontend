export const validaFormularioStep1 = ({
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
  let arrayValidacao = [];
  if (eh_para_alunos_com_dieta === null) {
    arrayValidacao.push(
      "Informe se produto se destina a alunos com dieta especial."
    );
  } else if (eh_para_alunos_com_dieta !== null) {
    if (eh_para_alunos_com_dieta && protocolos.length === 0) {
      arrayValidacao.push("Precisa informar ao menos uma patologia");
    } else if (eh_para_alunos_com_dieta && detalhes_da_dieta === null) {
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
  if (tem_aditivos_alergenicos === null) {
    arrayValidacao.push("Informe se produto possui aditivos alergenicos.");
  } else if (tem_aditivos_alergenicos !== null) {
    if (tem_aditivos_alergenicos && aditivos === null) {
      arrayValidacao.push("Informe os aditivos alergenicos.");
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
