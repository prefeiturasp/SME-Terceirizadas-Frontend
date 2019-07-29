export const convertToFormat = data => {
  const list = [];
  data.results.forEach(value => {
    const obj = {};
    obj["evento_data"] = value.solicitacao_kit_lanche.data;
    obj["id"] = value.uuid;
    obj["kit_lanche"] = extractKits(value.solicitacao_kit_lanche.kits);
    obj["local_passeio"] = value.local;
    obj["nro_alunos"] = value.quantidade_alunos;
    obj["obs"] = value.solicitacao_kit_lanche.observacao;
    obj["salvo_em"] = value.solicitacao_kit_lanche.criado_em;
    obj["status"] = value.status;
    obj["tempo_passeio"] = value.solicitacao_kit_lanche.tempo_passeio;
    list.push(obj);
  });
  return list;
};

const extractKits = data => {
  const list = [];
  data.forEach(value => {
    const uuid = value.uuid;
    list.push(uuid);
  });

  return list;
};

export const adapterEnumKits = data => {
  const objRoot = {};
  data.results.forEach((value, key) => {
    const objChild = {};
    objChild["value"] = value.uuid;
    objChild["label"] = value.nome;
    objChild["foodList"] = value.itens.map(objeto => {
      return objeto.nome
    });
    objRoot["KIT" + (key + 1)] = objChild;
  });
  return objRoot;
};

export const convertStringToDate = value => {
  if (value) {
    const dia = parseInt(value.split("/")[0]);
    const mes = parseInt(value.split("/")[1]) - 1;
    const ano = parseInt(value.split("/")[2]);
    return new Date(ano, mes, dia);
  }
  return value;
};


