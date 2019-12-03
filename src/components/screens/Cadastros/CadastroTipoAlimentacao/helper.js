const setaCheckEmPossibilidades = possibilidades => {
  possibilidades.forEach(possibilidade => {
    possibilidade["check"] = false;
  });
};

const setaCheckEmSubstituicoes = substituicoes => {
  substituicoes.forEach(substituicao => {
    substituicao["check"] = false;
  });
};

const buscaPorPossibilidades = substituicoes => {
  substituicoes.forEach(substituicao => {
    setaCheckEmPossibilidades(substituicao.possibilidades);
    setaCheckEmSubstituicoes(substituicao.substituicoes);
  });
};

export const pegaDadosdeUnidadeEscolarOriginal = (uuid, dadosDaRequisicao) => {
  let dadoDeUnidadeEscolar = [];

  dadosDaRequisicao.forEach(dadoReq => {
    uuid === dadoReq.tipo_unidade_escolar.uuid &&
      dadoDeUnidadeEscolar.push(dadoReq);
  });

  return dadoDeUnidadeEscolar;
};

export const pegaDadosdeUnidadeEscolar = (uuid, dadosDaRequisicao) => {
  let dadoDeUnidadeEscolar = [];

  dadosDaRequisicao.forEach(dadoReq => {
    uuid === dadoReq.tipo_unidade_escolar.uuid &&
      dadoDeUnidadeEscolar.push(dadoReq);
  });

  return dadoDeUnidadeEscolar;
};

export const criaArraydePeriodosEscolares = dadosDeUnidadeEscolar => {
  let periodosEscolares = [];
  dadosDeUnidadeEscolar.forEach(dadosUnidade => {
    periodosEscolares.push(dadosUnidade.periodo_escolar);
  });
  return periodosEscolares;
};

export const criaArrayDeTiposAlimentacao = dadosDeUnidadeEscolar => {
  let tiposAlimentcao = [];
  dadosDeUnidadeEscolar.forEach(dadosUnidade => {
    tiposAlimentcao.push({
      turno: "manha",
      tipo_alimentacao: dadosUnidade.substituicoes
    });
  });
  return tiposAlimentcao;
};

export const adicionaCheckAObjetos = dadosTipoAlimentacaoPorUe => {
  dadosTipoAlimentacaoPorUe.forEach(dadoEscolar => {
    buscaPorPossibilidades(dadoEscolar.substituicoes);
  });

  return dadosTipoAlimentacaoPorUe;
};
