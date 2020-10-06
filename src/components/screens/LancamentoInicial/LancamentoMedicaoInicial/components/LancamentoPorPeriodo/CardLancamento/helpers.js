import { get, set } from "lodash"

const grupos = {
  convencional: 'Convencional',
  grupoA: 'Dieta especial Grupo A',
  grupoB: 'Dieta especial Grupo B',
}

const camposMetadeFrequencia = {
  lanche_4h: "Lanche 4h",
  lanche_5h: "Lanche 5h",
  "refeicoes.0.ref_oferta": "Refeição 1ª oferta",
  "refeicoes.1.ref_oferta": "Refeição 2ª oferta",
  "refeicoes.0.sob_oferta": "Sobremesa 1ª oferta",
  "refeicoes.1.sob_oferta": "Sobremesa 2ª oferta"
};

export const validateFormLancamento = formValues => {
  console.log("validate.formValues", formValues);
  let erros = {};
  const mensagensDeErro = [];

  for (let grupo of Object.keys(grupos)) {
    const frequencia = formValues[grupo] ? parseInt(formValues[grupo].frequencia) : 0;
    for (let [nomeCampo, nomeAmigavelCampo] of Object.entries(
      camposMetadeFrequencia
    )) {
      const valorCampo = get(formValues[grupo], nomeCampo)
      if (valorCampo) {
        const valorChave = parseInt(valorCampo);
        if (
          grupo === "convencional" && valorChave < frequencia / 2 &&
          get(formValues[grupo], 'observacoes') === undefined
        ) {
          const msgErro = "Deve preencher observações diárias";
          mensagensDeErro.push(msgErro)
          set(erros, `${grupo}.observacoes`, msgErro)
        }
        if (valorChave > frequencia) {
          const msgErro = `O valor de ${nomeAmigavelCampo} não pode ser maior que a frequencia`;
          mensagensDeErro.push(msgErro)
          set(erros, `${grupo}.${nomeCampo}`, msgErro)
        }
        if (frequencia <= 0) {
          const msgErro = `Deve preencher a frequencia`;
          mensagensDeErro.push(msgErro)
          set(erros, `${grupo}.frequencia`, msgErro)
        }
      }
    }
  }

  console.log("erros", erros);
  if (Object.values(erros).length > 0) {
    return {
      ...erros,
      FORM_ERROR: [...new Set(mensagensDeErro)]
    };
  }
};
