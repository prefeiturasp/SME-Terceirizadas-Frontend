import { get, set } from "lodash";

const grupos = {
  convencional: "Convencional",
  grupoA: "Dieta especial Grupo A",
  grupoB: "Dieta especial Grupo B"
};

const camposMetadeFrequencia = {
  lanche_4h: "Lanche 4h",
  lanche_5h: "Lanche 5h",
  ref_enteral: "Refeição enteral",
  "refeicoes.0.ref_oferta": "Refeição 1ª oferta",
  "refeicoes.1.ref_oferta": "Refeição 2ª oferta",
  "refeicoes.0.sob_oferta": "Sobremesa 1ª oferta",
  "refeicoes.1.sob_oferta": "Sobremesa 2ª oferta"
};

export const objectFlattener = object => {
  return Reflect.apply(
    Array.prototype.concat,
    [],
    Object.keys(object).map(key => {
      if (object[key] instanceof Object) {
        return objectFlattener(object[key]);
      }
      return object[key];
    })
  );
};

export const validateFormLancamento = (formValues, totalMatriculados) => {
  let erros = {};

  for (let grupo of Object.keys(grupos)) {
    const frequencia = formValues[grupo]
      ? parseInt(formValues[grupo].frequencia)
      : 0;
    if (frequencia <= 0) {
      set(erros, `${grupo}.frequencia`, "Deve preencher a frequencia");
    } else if (frequencia > totalMatriculados) {
      set(
        erros,
        `${grupo}.frequencia`,
        `Frequencia não pode ser maior que alunos matriculados nesse período (${totalMatriculados})`
      );
    }
    for (let [nomeCampo, nomeAmigavelCampo] of Object.entries(
      camposMetadeFrequencia
    )) {
      const valorCampo = get(formValues[grupo], nomeCampo);
      if (valorCampo) {
        const valorChave = parseInt(valorCampo);
        if (
          valorChave < frequencia / 2 &&
          get(formValues[grupo], "observacoes") === undefined
        ) {
          set(
            erros,
            `${grupo}.${nomeCampo}`,
            "Deve preencher observações diárias"
          );
          set(
            erros,
            `${grupo}.observacoes`,
            "Deve preencher observações diárias"
          );
        }
        if (valorChave > frequencia) {
          set(
            erros,
            `${grupo}.${nomeCampo}`,
            `O valor de ${nomeAmigavelCampo} não pode ser maior que a frequencia`
          );
        }
      }
    }
  }

  return erros;
};
