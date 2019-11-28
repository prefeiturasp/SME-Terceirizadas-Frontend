const obtemDadosEscolares = vinculo => {
  let escola = [
    {
      nome: `${vinculo.codigo_eol} ${vinculo.nome}`,
      uuid: vinculo.uuid
    }
  ];
  let dadosEscola = {
    instituicao: escola,
    diretoria_regional: [vinculo.diretoria_regional]
  };
  return dadosEscola;
};

export const estruturaDadosDeUsuario = dadosUsuario => {
  const vinculo = dadosUsuario.vinculo_atual.instituicao;
  if (dadosUsuario.tipo_usuario === "escola") {
    return obtemDadosEscolares(vinculo);
  }
};
