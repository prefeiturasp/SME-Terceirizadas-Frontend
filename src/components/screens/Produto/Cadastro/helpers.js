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
