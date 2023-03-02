import { deepCopy } from "helpers/utilities";

export const repeticaoSobremesaDoceComValorESemObservacao = (
  values,
  dia,
  categoria,
  diasSobremesaDoce,
  location
) => {
  return (
    values[`repeticao_sobremesa__dia_${dia}__categoria_${categoria.id}`] &&
    !values[`observacoes__dia_${dia}__categoria_${categoria.id}`] &&
    diasSobremesaDoce.includes(
      `${new Date(location.state.mesAnoSelecionado).getFullYear()}-${(
        new Date(location.state.mesAnoSelecionado).getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${dia}`
    )
  );
};

export const botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada = (
  values,
  dia,
  categoria,
  dadosValoresInclusoesAutorizadasState,
  validacaoDiaLetivo
) => {
  if (
    Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
      String(key).includes(`__dia_${dia}__categoria_${categoria.id}`)
    )
  ) {
    if (
      Number(values[`frequencia__dia_${dia}__categoria_${categoria.id}`]) ===
        0 &&
      !validacaoDiaLetivo(dia)
    ) {
      return true;
    }
  }
};

export const campoComInclusaoContinuaValor0ESemObservacao = (
  dia,
  categoria,
  dadosValoresInclusoesAutorizadasState,
  values
) => {
  const alimentacoes = ["lanche_4h", "lanche", "refeicao", "sobremesa"];
  let erro = false;
  alimentacoes.forEach(alimentacao => {
    if (
      `${alimentacao}__dia_${dia}__categoria_${categoria.id}` in
        dadosValoresInclusoesAutorizadasState &&
      Number(
        values[`${alimentacao}__dia_${dia}__categoria_${categoria.id}`]
      ) === 0 &&
      !values[`observacoes__dia_${dia}__categoria_${categoria.id}`]
    ) {
      erro = true;
    }
  });
  return erro;
};

export const campoComInclusaoContinuaValorMaiorQueAutorizadoESemObservacao = (
  dia,
  categoria,
  dadosValoresInclusoesAutorizadasState,
  values
) => {
  const alimentacoes = ["lanche_4h", "lanche", "refeicao", "sobremesa"];
  let erro = false;
  alimentacoes.forEach(alimentacao => {
    if (
      `${alimentacao}__dia_${dia}__categoria_${categoria.id}` in
        dadosValoresInclusoesAutorizadasState &&
      Number(values[`${alimentacao}__dia_${dia}__categoria_${categoria.id}`]) >
        Number(
          dadosValoresInclusoesAutorizadasState[
            `${alimentacao}__dia_${dia}__categoria_${categoria.id}`
          ]
        ) &&
      !values[`observacoes__dia_${dia}__categoria_${categoria.id}`]
    ) {
      erro = true;
    }
  });
  return erro;
};

export const campoFrequenciaValor0ESemObservacao = (dia, categoria, values) => {
  let erro = false;
  if (
    values[`frequencia__dia_${dia}__categoria_${categoria.id}`] &&
    Number(values[`frequencia__dia_${dia}__categoria_${categoria.id}`]) === 0 &&
    !values[`observacoes__dia_${dia}__categoria_${categoria.id}`]
  ) {
    erro = true;
  }
  return erro;
};

export const campoComSuspensaoAutorizadaESemObservacao = (
  formValuesAtualizados,
  column,
  categoria,
  suspensoesAutorizadas
) => {
  let erro = false;
  let alimentacoes = [];
  suspensoesAutorizadas &&
    suspensoesAutorizadas
      .filter(suspensao => suspensao.dia === column.dia)
      .forEach(suspensao => {
        alimentacoes = alimentacoes.concat(suspensao.alimentacoes);
      });
  alimentacoes.forEach(alimentacao => {
    if (
      formValuesAtualizados[
        `${alimentacao}__dia_${column.dia}__categoria_${categoria.id}`
      ]
    ) {
      erro = true;
    }
  });
  return erro;
};

export const campoRefeicaoComRPLAutorizadaESemObservacao = (
  formValuesAtualizados,
  column,
  categoria,
  alteracoesAlimentacaoAutorizadas
) => {
  let erro = false;
  if (
    alteracoesAlimentacaoAutorizadas &&
    alteracoesAlimentacaoAutorizadas.filter(
      alteracao =>
        alteracao.dia === column.dia && alteracao.motivo.includes("RPL")
    ).length > 0 &&
    formValuesAtualizados[
      `refeicao__dia_${column.dia}__categoria_${categoria.id}`
    ]
  ) {
    erro = true;
  }
  return erro;
};

export const campoLancheComLPRAutorizadaESemObservacao = (
  formValuesAtualizados,
  column,
  categoria,
  alteracoesAlimentacaoAutorizadas
) => {
  let erro = false;
  if (
    alteracoesAlimentacaoAutorizadas &&
    alteracoesAlimentacaoAutorizadas.filter(
      alteracao =>
        alteracao.dia === column.dia && alteracao.motivo.includes("LPR")
    ).length > 0 &&
    (formValuesAtualizados[
      `lanche__dia_${column.dia}__categoria_${categoria.id}`
    ] ||
      formValuesAtualizados[
        `lanche_4h__dia_${column.dia}__categoria_${categoria.id}`
      ])
  ) {
    erro = true;
  }
  return erro;
};

export const botaoAdicionarObrigatorioTabelaAlimentacao = (
  formValuesAtualizados,
  dia,
  categoria,
  diasSobremesaDoce,
  location,
  row,
  dadosValoresInclusoesAutorizadasState,
  validacaoDiaLetivo,
  column,
  suspensoesAutorizadas,
  alteracoesAlimentacaoAutorizadas
) => {
  return (
    botaoAddObrigatorioDiaNaoLetivoComInclusaoAutorizada(
      formValuesAtualizados,
      dia,
      categoria,
      dadosValoresInclusoesAutorizadasState,
      validacaoDiaLetivo
    ) ||
    repeticaoSobremesaDoceComValorESemObservacao(
      formValuesAtualizados,
      dia,
      categoria,
      diasSobremesaDoce,
      location
    ) ||
    campoComInclusaoContinuaValor0ESemObservacao(
      dia,
      categoria,
      dadosValoresInclusoesAutorizadasState,
      formValuesAtualizados
    ) ||
    campoComInclusaoContinuaValorMaiorQueAutorizadoESemObservacao(
      dia,
      categoria,
      dadosValoresInclusoesAutorizadasState,
      formValuesAtualizados
    ) ||
    campoFrequenciaValor0ESemObservacao(
      dia,
      categoria,
      formValuesAtualizados
    ) ||
    campoComSuspensaoAutorizadaESemObservacao(
      formValuesAtualizados,
      column,
      categoria,
      suspensoesAutorizadas
    ) ||
    campoRefeicaoComRPLAutorizadaESemObservacao(
      formValuesAtualizados,
      column,
      categoria,
      alteracoesAlimentacaoAutorizadas
    ) ||
    campoLancheComLPRAutorizadaESemObservacao(
      formValuesAtualizados,
      column,
      categoria,
      alteracoesAlimentacaoAutorizadas
    )
  );
};

export const botaoAdicionarObrigatorio = (
  values,
  dia,
  categoria,
  diasSobremesaDoce,
  location
) => {
  return (
    repeticaoSobremesaDoceComValorESemObservacao(
      values,
      dia,
      categoria,
      diasSobremesaDoce,
      location
    ) || campoFrequenciaValor0ESemObservacao(dia, categoria, values)
  );
};

export const validarFormulario = (
  values,
  diasSobremesaDoce,
  location,
  categoriasDeMedicao,
  dadosValoresInclusoesAutorizadasState,
  weekColumns
) => {
  let erro = false;

  const values_ = deepCopy(values);
  Object.keys(values_).forEach(value => {
    if (
      !weekColumns
        .map(wc => wc.dia)
        .includes(
          value.includes("__dia_") &&
            value.split("__dia_")[1].split("__categoria")[0]
        )
    ) {
      delete values_[value];
    }
  });

  categoriasDeMedicao.forEach(categoria => {
    diasSobremesaDoce.forEach(dia => {
      if (
        repeticaoSobremesaDoceComValorESemObservacao(
          values_,
          dia.split("-")[2],
          categoria,
          diasSobremesaDoce,
          location
        )
      ) {
        erro = `Dia ${
          dia.split("-")[2]
        } é de sobremesa doce. Justifique o lançamento de repetição nas observações`;
      }
    });

    Object.keys(dadosValoresInclusoesAutorizadasState).forEach(inclusao => {
      if (
        campoComInclusaoContinuaValor0ESemObservacao(
          inclusao.split("__dia_")[1].split("__categoria")[0],
          categoria,
          dadosValoresInclusoesAutorizadasState,
          values_
        )
      ) {
        erro = `Dia ${
          inclusao.split("__dia_")[1].split("__categoria")[0]
        } está com valor 0 em uma alimentação. Justifique nas observações`;
      }
      if (
        campoComInclusaoContinuaValorMaiorQueAutorizadoESemObservacao(
          inclusao.split("__dia_")[1].split("__categoria")[0],
          categoria,
          dadosValoresInclusoesAutorizadasState,
          values_
        )
      ) {
        erro = `Dia ${
          inclusao.split("__dia_")[1].split("__categoria")[0]
        } está com valor maior que o autorizado. Justifique nas observações`;
      }
    });
  });

  let arrayDiasInclusoesAutorizadasEmValues = [];
  let keysFromValues = Object.keys(values_);

  for (const key in Object.fromEntries(
    Object.entries(dadosValoresInclusoesAutorizadasState)
  )) {
    if (keysFromValues.includes(key)) {
      const keySplitted = key.split("__");
      const dia = keySplitted[1].match(/\d/g).join("");
      arrayDiasInclusoesAutorizadasEmValues.push(dia);
    }
  }

  arrayDiasInclusoesAutorizadasEmValues = [
    ...new Set(arrayDiasInclusoesAutorizadasEmValues)
  ];

  const categoriaAlimentacao = categoriasDeMedicao.find(categoria =>
    categoria.nome.includes("ALIMENTAÇÃO")
  );

  let diasComFrequenciaVaziasEInclusoesAutorizadas = [];
  arrayDiasInclusoesAutorizadasEmValues.forEach(dia => {
    if (
      !values_[`frequencia__dia_${dia}__categoria_${categoriaAlimentacao.id}`]
    ) {
      diasComFrequenciaVaziasEInclusoesAutorizadas.push(dia);
    }
  });

  if (diasComFrequenciaVaziasEInclusoesAutorizadas.length) {
    erro = `Realizar preenchimento da(s) frequência(s) para o(s) dia(s): ${diasComFrequenciaVaziasEInclusoesAutorizadas.join(
      ", "
    )}.`;
  }
  return erro;
};

export const validacoesTabelaAlimentacao = (
  rowName,
  dia,
  categoria,
  value,
  allValues,
  dadosValoresInclusoesAutorizadasState,
  suspensoesAutorizadas,
  alteracoesAlimentacaoAutorizadas,
  validacaoDiaLetivo,
  location
) => {
  const maxFrequencia = Number(
    allValues[`frequencia__dia_${dia}__categoria_${categoria}`]
  );
  const inputName = `${rowName}__dia_${dia}__categoria_${categoria}`;

  if (location.state && location.state.grupo === "Programas e Projetos") {
    if (
      !inputName.includes("matriculados") &&
      Number(allValues[inputName]) > Number(maxFrequencia)
    ) {
      return `Número apontado de alimentação é maior que número de alunos frequentes. Ajuste o apontamento. `;
    }
    if (
      `${rowName}__dia_${dia}__categoria_${categoria}` ===
        `frequencia__dia_${dia}__categoria_${categoria}` &&
      Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
        String(key).includes(`__dia_${dia}__categoria_${categoria}`)
      ) &&
      !(["Mês anterior", "Mês posterior"].includes(value) || Number(value) > 0)
    ) {
      if (!(Number(value) === 0)) {
        return `Há solicitação de alimentação contínua autorizada para esta data. Insira o número de frequentes e alimentações`;
      }
    }
  }

  const existeAlteracaoAlimentacaoRPL =
    alteracoesAlimentacaoAutorizadas &&
    alteracoesAlimentacaoAutorizadas.filter(
      alteracao => alteracao.dia === dia && alteracao.motivo.includes("RPL")
    ).length > 0;
  const existeAlteracaoAlimentacaoLPR =
    alteracoesAlimentacaoAutorizadas &&
    alteracoesAlimentacaoAutorizadas.filter(
      alteracao => alteracao.dia === dia && alteracao.motivo.includes("LPR")
    ).length > 0;

  const maxMatriculados = Number(
    allValues[`matriculados__dia_${dia}__categoria_${categoria}`]
  );

  if (
    `${rowName}__dia_${dia}__categoria_${categoria}` ===
      `frequencia__dia_${dia}__categoria_${categoria}` &&
    Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
      String(key).includes(`__dia_${dia}__categoria_${categoria}`)
    ) &&
    !(["Mês anterior", "Mês posterior"].includes(value) || Number(value) > 0)
  ) {
    if (!value || (value && Number(value) !== 0 && validacaoDiaLetivo(dia))) {
      return `Foi autorizada inclusão de alimentação ${
        location.state && location.state.grupo ? "contínua" : ""
      } nesta data. Informe a frequência de alunos.`;
    }
  } else if (
    value &&
    !["Mês anterior", "Mês posterior"].includes(value) &&
    [NaN].includes(maxFrequencia) &&
    (inputName.includes("refeicao") ||
      inputName.includes("sobremesa") ||
      inputName.includes("lanche")) &&
    !inputName.includes("repeticao") &&
    !inputName.includes("emergencial") &&
    !(inputName in dadosValoresInclusoesAutorizadasState)
  ) {
    return "Frequência acima inválida ou não preenchida.";
  } else if (inputName in dadosValoresInclusoesAutorizadasState) {
    if (
      validacaoDiaLetivo(dia) &&
      allValues[inputName] >
        maxFrequencia + Number(dadosValoresInclusoesAutorizadasState[inputName])
    ) {
      let msg = `Número máximo de alimentações foi excedido. Foi autorizada a inclusão de `;
      msg += `${
        dadosValoresInclusoesAutorizadasState[inputName]
      } alimentações neste dia. `;
      msg += `O lançamento deve considerar as alimentações do dia (até o limite dos frequentes) + as alimentações autorizadas.`;
      return msg;
    }
    if (!validacaoDiaLetivo(dia) && allValues[inputName] > maxFrequencia) {
      return `Número apontado de alimentação é maior que número de alunos frequentes. Ajuste o apontamento. `;
    }
    return undefined;
  } else if (
    value &&
    existeAlteracaoAlimentacaoRPL &&
    inputName.includes("lanche") &&
    !inputName.includes("emergencial") &&
    !allValues[`refeicao__dia_${dia}__categoria_${categoria}`]
  ) {
    if (Number(value) > 2 * maxFrequencia) {
      return "Lançamento maior que 2x a frequência de alunos no dia.";
    } else {
      return undefined;
    }
  } else if (
    value &&
    existeAlteracaoAlimentacaoLPR &&
    inputName.includes("refeicao") &&
    !inputName.includes("repeticao") &&
    (!allValues[`lanche__dia_${dia}__categoria_${categoria}`] &&
      !allValues[`lanche_4h__dia_${dia}__categoria_${categoria}`])
  ) {
    if (Number(value) > 2 * maxFrequencia) {
      return "Lançamento maior que 2x a frequência de alunos no dia.";
    } else {
      return undefined;
    }
  } else if (
    value &&
    Number(value) > maxFrequencia &&
    (inputName.includes("refeicao") ||
      inputName.includes("sobremesa") ||
      inputName.includes("lanche")) &&
    !inputName.includes("repeticao") &&
    !inputName.includes("emergencial")
  ) {
    return "Lançamento maior que a frequência de alunos no dia.";
  } else if (
    value &&
    Number(value) > maxMatriculados &&
    inputName.includes("frequencia")
  ) {
    return "A quantidade de alunos frequentes não pode ser maior do que a quantidade de alunos matriculados.";
  }
  return undefined;
};

export const validacoesTabelasDietas = (
  categoriasDeMedicao,
  rowName,
  dia,
  categoria,
  value,
  allValues
) => {
  const idCategoriaAlimentacao = categoriasDeMedicao.find(categoria =>
    categoria.nome.includes("ALIMENTAÇÃO")
  ).id;
  const maxDietasAutorizadas = Number(
    allValues[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`]
  );
  const maxMatriculados = Number(
    allValues[`matriculados__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
  );
  const maxFrequencia = Number(
    allValues[`frequencia__dia_${dia}__categoria_${categoria}`]
  );
  const maxFrequenciaAlimentacao = Number(
    allValues[`frequencia__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
  );
  const inputName = `${rowName}__dia_${dia}__categoria_${categoria}`;
  if (
    value &&
    Number(value) > maxDietasAutorizadas &&
    inputName.includes("frequencia")
  ) {
    return "A quantidade de alunos frequentes não pode ser maior do que a quantidade de alunos com dietas autorizadas.";
  } else if (
    value &&
    Number(value) +
      Number(
        allValues[`frequencia__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
      ) >
      maxMatriculados &&
    inputName.includes("frequencia")
  ) {
    return "O apontamento informado ultrapassou o número de frequentes informados no dia. É preciso subtrair o aluno com Dieta Especial Autorizada do lançamento na planilha de Alimentação.";
  } else if (
    value &&
    Number(value) > maxFrequencia &&
    (inputName.includes("lanche_4h") ||
      inputName.includes("lanche") ||
      inputName.includes("refeicao"))
  ) {
    return "A quantidade não pode ser maior do que a quantidade inserida em Frequência.";
  } else if (
    value &&
    Number(value) +
      Number(
        allValues[`refeicao__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
      ) >
      maxFrequenciaAlimentacao &&
    inputName.includes("refeicao")
  ) {
    return "O número máximo de alimentações foi excedido. É preciso subtrair o aluno com Dieta Especial Autorizada do apontamento de Refeição na planilha de Alimentação.";
  } else if (
    value &&
    Number(value) +
      Number(
        allValues[`lanche__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
      ) >
      maxFrequenciaAlimentacao &&
    (inputName.includes("lanche_4h") || inputName.includes("lanche"))
  ) {
    return "O número máximo de alimentações foi excedido. É preciso subtrair o aluno com Dieta Especial Autorizada do apontamento de Lanche na planilha de Alimentação.";
  } else if (
    value &&
    !["Mês anterior", "Mês posterior"].includes(value) &&
    [NaN].includes(maxFrequencia) &&
    (inputName.includes("lanche_4h") ||
      inputName.includes("lanche") ||
      inputName.includes("refeicao"))
  ) {
    return "Frequência acima inválida ou não preenchida.";
  }
  return undefined;
};

export const exibirTooltipSemAlimentacaoPreAutorizadaInformada = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  dadosValoresInclusoesAutorizadasState
) => {
  return (
    `${row.name}__dia_${column.dia}__categoria_${categoria.id}` in
      dadosValoresInclusoesAutorizadasState &&
    Number(
      formValuesAtualizados[
        `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
      ]
    ) === 0 &&
    !formValuesAtualizados[
      `observacoes__dia_${column.dia}__categoria_${categoria.id}`
    ]
  );
};

export const exibirTooltipFrequenciaDiaNaoLetivo = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  dadosValoresInclusoesAutorizadasState,
  validacaoDiaLetivo
) => {
  return (
    !validacaoDiaLetivo(column.dia) &&
    row.name === "frequencia" &&
    Object.keys(dadosValoresInclusoesAutorizadasState).some(key =>
      String(key).includes(`__dia_${column.dia}__categoria_${categoria.id}`)
    ) &&
    Number(
      formValuesAtualizados[
        `frequencia__dia_${column.dia}__categoria_${categoria.id}`
      ]
    ) === 0
  );
};

export const exibirTooltipErroQtdMaiorQueAutorizado = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  dadosValoresInclusoesAutorizadasState
) => {
  return (
    `${row.name}__dia_${column.dia}__categoria_${categoria.id}` in
      dadosValoresInclusoesAutorizadasState &&
    Number(
      formValuesAtualizados[
        `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
      ]
    ) >
      Number(
        dadosValoresInclusoesAutorizadasState[
          `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
        ]
      ) &&
    !formValuesAtualizados[
      `observacoes__dia_${column.dia}__categoria_${categoria.id}`
    ]
  );
};

export const exibirTooltipSuspensoesAutorizadas = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  suspensoesAutorizadas
) => {
  const value =
    formValuesAtualizados[
      `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
    ];

  return (
    value &&
    (!["Mês anterior", "Mês posterior"].includes(value) || Number(value) > 0) &&
    suspensoesAutorizadas &&
    suspensoesAutorizadas.filter(
      suspensao =>
        suspensao.dia === column.dia &&
        suspensao.alimentacoes.includes(row.name)
    ).length > 0
  );
};

export const exibirTooltipRPLAutorizadas = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  alteracoesAlimentacaoAutorizadas
) => {
  const value =
    formValuesAtualizados[
      `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
    ];

  return (
    value &&
    (!["Mês anterior", "Mês posterior"].includes(value) || Number(value) > 0) &&
    alteracoesAlimentacaoAutorizadas &&
    alteracoesAlimentacaoAutorizadas.filter(
      alteracao =>
        alteracao.dia === column.dia && alteracao.motivo.includes("RPL")
    ).length > 0 &&
    (row.name.includes("refeicao") && !row.name.includes("repeticao"))
  );
};

export const exibirTooltipLPRAutorizadas = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  alteracoesAlimentacaoAutorizadas
) => {
  const value =
    formValuesAtualizados[
      `${row.name}__dia_${column.dia}__categoria_${categoria.id}`
    ];

  return (
    value &&
    (!["Mês anterior", "Mês posterior"].includes(value) || Number(value) > 0) &&
    alteracoesAlimentacaoAutorizadas &&
    alteracoesAlimentacaoAutorizadas.filter(
      alteracao =>
        alteracao.dia === column.dia && alteracao.motivo.includes("LPR")
    ).length > 0 &&
    (row.name.includes("lanche") && !row.name.includes("emergencial"))
  );
};
