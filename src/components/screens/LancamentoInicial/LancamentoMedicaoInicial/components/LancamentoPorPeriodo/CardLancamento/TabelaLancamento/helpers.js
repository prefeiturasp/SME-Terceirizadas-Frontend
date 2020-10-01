export const validateFormLancamento = formValues => {
  console.log("validate.formValues", formValues);
  let errors = {};
  const camposMetadeFrequencia = {
    lanche_4h: "Lanche 4h",
    lanche_5h: "Lanche 5h",
    refeicao_1a_oferta: "Refeição 1ª oferta",
    sobremesa_1a_oferta: "Sobremesa 1ª oferta"
  };
  const frequencia = parseInt(formValues.frequencia);
  for (let [nomeCampo, nomeAmigavelCampo] of Object.entries(
    camposMetadeFrequencia
  )) {
    if (formValues[nomeCampo]) {
      const valorChave = parseInt(formValues[nomeCampo]);
      if (
        valorChave < frequencia / 2 &&
        formValues.obs_diarias_1 === undefined
      ) {
        errors = {
          ...errors,
          obs_diarias_1: "Deve preencher observações diárias"
        };
      }
      if (valorChave > frequencia) {
        errors = {
          ...errors,
          [nomeCampo]: `O valor de ${nomeAmigavelCampo} não pode ser maior que a frequencia`
        };
      }
    }
  }
  const camposMenorCampoPai = [
    {
      nomeCampo: "refeicao_repeticao",
      campoPai: "refeicao_1a_oferta",
      nomeAmigavel: "Repet. refeição",
      nomeAmigavelCampoPai: "Refeição 1ª oferta"
    },
    {
      nomeCampo: "sobremesa_repeticao",
      campoPai: "sobremesa_1a_oferta",
      nomeAmigavel: "Repet. sobremesa",
      nomeAmigavelCampoPai: "Sobremesa 1ª oferta"
    },
    {
      nomeCampo: "grupoA_lanche_4h",
      campoPai: "grupoA_frequencia",
      nomeAmigavel: "Grupo A - Lanche 4h",
      nomeAmigavelCampoPai: "Grupo A - Frequencia"
    },
    {
      nomeCampo: "grupoA_lanche_5h",
      campoPai: "grupoA_frequencia",
      nomeAmigavel: "Grupo A - Lanche 5h",
      nomeAmigavelCampoPai: "Grupo A - Frequencia"
    }
  ];
  for (let campo of camposMenorCampoPai) {
    if (formValues[campo.nomeCampo]) {
      const valorChave = parseInt(formValues[campo.nomeCampo]);
      const valorCampoPai = formValues[campo.campoPai]
        ? parseInt(formValues[campo.campoPai])
        : 0;
      if (valorChave > valorCampoPai) {
        const msgErro = `O valor de ${
          campo.nomeAmigavel
        } não pode ser maior que o valor de ${campo.nomeAmigavelCampoPai}`;
        errors = {
          ...errors,
          [campo.nomeCampo]: msgErro,
          [campo.campoPai]: msgErro
        };
      }
    }
  }
  console.log("errors", errors);
  if (Object.values(errors).length > 0) {
    return {
      ...errors,
      FORM_ERROR: [...new Set(Object.values(errors))]
    };
  }
};
