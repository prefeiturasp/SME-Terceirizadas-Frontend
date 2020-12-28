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

export const validateFormLancamento = (
  formValues,
  panorama,
  dadosMatriculados
) => {
  let erros = {};
  if (
    get(formValues, "convencional.eh_dia_de_sobremesa_doce") === true &&
    get(formValues, "convencional.tem_sobremesa_doce_na_semana") === true &&
    get(formValues, "convencional.observacoes") === undefined
  ) {
    set(
      erros,
      `convencional.observacoes`,
      "Deve preencher observações diárias"
    );
  }
  for (let grupo of Object.keys(grupos)) {
    if (formValues[grupo] === undefined) continue;
    if (grupo === "convencional" && panorama.horas_atendimento === 4) {
      if (
        (get(formValues, "convencional.lanche_4h") !== undefined &&
          get(formValues, "convencional.refeicoes.0.ref_oferta") !==
            undefined) ||
        (get(formValues, "convencional.lanche_4h") === undefined &&
          get(formValues, "convencional.refeicoes.0.ref_oferta") === undefined)
      ) {
        const msgErro =
          'O atendimento dessa escola nesse período é de apenas 4 horas. Preencha OU "Lanche 4h" OU "Refeição 1ª oferta"';
        set(erros, `convencional.lanche_4h`, msgErro);
        set(erros, `convencional.refeicoes.0.ref_oferta`, msgErro);
      }
    }
    if (formValues[grupo].frequencia === undefined) {
      set(erros, `${grupo}.frequencia`, "Deve preencher a frequência");
      continue;
    }
    const frequencia = formValues[grupo]
      ? parseInt(formValues[grupo].frequencia)
      : 0;
    if (frequencia > dadosMatriculados[grupo]) {
      set(
        erros,
        `${grupo}.frequencia`,
        `Não é possível informar quantidade superior ao número de Dietas Ativas (${
          dadosMatriculados[grupo]
        }).`
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
            `O valor de ${nomeAmigavelCampo} não pode ser maior que a frequência`
          );
        }
      }
    }
  }

  return erros;
};
