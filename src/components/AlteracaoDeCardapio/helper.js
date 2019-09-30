export const montaPeriodoDeAlteracao = periodo => {
  const periodoAlteracao = {
    nome: periodo.nome,
    uuid: periodo.uuid,
    tipos_alimentacao: periodo.tipos_alimentacao,
    checado: false,
    style: backgroundLabelPeriodo(periodo.nome)
  };
  return periodoAlteracao;
};

const backgroundLabelPeriodo = nomePeriodo => {
  switch (nomePeriodo) {
    case "MANHA":
      return {
        background: "#fff7cb",
        borderColor: "#ffd79b"
      };
    case "TARDE":
      return {
        background: "#ffeed6",
        borderColor: "#ffbb8a"
      };
    case "NOITE":
      return {
        background: "#e4f1ff",
        borderColor: "#82b7e8"
      };
    case "INTEGRAL":
      return {
        background: "#ebedff",
        borderColor: "#b2baff"
      };
    default:
      return {
        background: "#eaffe3",
        borderColor: "#79cf91"
      };
  }
};
