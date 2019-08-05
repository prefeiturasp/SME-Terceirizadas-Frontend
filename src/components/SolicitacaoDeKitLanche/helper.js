export const convertTempoPasseio = tempo_passeio => {
  switch (tempo_passeio) {
    case 0:
      return "4 horas";
    case 1:
      return "5 a 7 horas";
    case 2:
      return "8 horas";
    default:
      return null;
  }
};

export const retornaTempoPasseio = tempo_passeio => {
  if (tempo_passeio === 0 || tempo_passeio === "4h") {
    return "0";
  }
  if (tempo_passeio === 1 || tempo_passeio === "5_7h") {
    return "1";
  }
  if (tempo_passeio === 2 || tempo_passeio === "8h") {
    return "2"
  }
  else {
    return "";
  }
};


export const retornaInputPasseio = tempo_passeio => {
  if (tempo_passeio === 0 || tempo_passeio === "4h") {
      return "4h";
  }
  if (tempo_passeio === 1 || tempo_passeio === "5_7h") {
      return "5_7h";
  }
  if (tempo_passeio === 2 || tempo_passeio === "8h") {
    return "8h";
  }
  else {
    return "";
  }
};

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

export const montaObjetoRequisicao = values => {
  let kit_lanche_avulso = {
    solicitacao_kit_lanche: {
      kits: values.kit_lanche,
      descricao: values.observacao,
      data: values.evento_data,
      tempo_passeio: retornaTempoPasseio(values.tempo_passeio)
    },
    escola: values.escola,
    local: values.local,
    quantidade_alunos: values.quantidade_alunos
  }
  return kit_lanche_avulso
}
