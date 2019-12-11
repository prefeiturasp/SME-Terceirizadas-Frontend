export const montaTipoUnidadeEscolar = tiposUnidades => {
  let unidadesEscolares = [{ nome: "Selecione a unidade", uuid: "" }];

  tiposUnidades &&
    tiposUnidades.forEach(tipoUnidade => {
      unidadesEscolares.push({
        nome: tipoUnidade.iniciais,
        uuid: tipoUnidade.uuid
      });
    });

  return unidadesEscolares;
};

export const adicionarComboVazio = (combosAtuaisTemp, uuidVinculo) => {
  if (combosAtuaisTemp.length === 0) {
    let combo = [];
    combo.push({
      label: "",
      tipos_alimentacao: [],
      vinculo: uuidVinculo,
      adicionar: true
    });
    return combo;
  }
  if (!combosAtuaisTemp[combosAtuaisTemp.length - 1].adicionar) {
    combosAtuaisTemp.forEach(combo => {
      combo.adicionar = false;
    });
    combosAtuaisTemp.push({
      label: "",
      tipos_alimentacao: [],
      vinculo: uuidVinculo,
      adicionar: true
    });
    return combosAtuaisTemp;
  }
  combosAtuaisTemp.forEach(combo => {
    combo.adicionar = false;
  });
  return combosAtuaisTemp;
};

export const podeAdicionarElemento = (combo, alimentacao) => {
  let condicao = true;
  combo.tipos_alimentacao.forEach(tipo_alimentacao => {
    if (tipo_alimentacao === alimentacao.uuid) {
      condicao = false;
    }
  });
  return condicao;
};

export const montaLabelCombo = (combo, nome) => {
  if (combo.label === "") {
    combo.label = combo.label.concat(nome);
  } else {
    combo.label = combo.label.concat(` e ${nome}`);
  }
};
