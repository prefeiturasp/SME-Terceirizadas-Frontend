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
    Object.keys(dadosValoresInclusoesAutorizadasState).some((key) =>
      String(key).includes(`__dia_${dia}__categoria_${categoria.id}`)
    )
  ) {
    if (
      Number(values[`frequencia__dia_${dia}__categoria_${categoria.id}`]) ===
        0 ||
      !validacaoDiaLetivo(dia)
    ) {
      return true;
    }
  }
};

export const campoComInclusaoContinuaValorMaiorQueAutorizadoESemObservacao = (
  dia,
  categoria,
  dadosValoresInclusoesAutorizadasState,
  values
) => {
  const alimentacoes = ["lanche_4h", "lanche", "refeicao", "sobremesa"];
  let erro = false;
  alimentacoes.forEach((alimentacao) => {
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

const campoComInclusaoSemObservacaoCEI = (
  column,
  categoria,
  inclusoesAutorizadas,
  value
) => {
  const diasSoliciacoes = inclusoesAutorizadas.filter(
    (inclusao) =>
      String(inclusao.dia) === column.dia && categoria.nome === "ALIMENTAÇÃO"
  );
  if (diasSoliciacoes.length > 0 && !value) return true;
  return false;
};

export const botaoAdicionarObrigatorioTabelaAlimentacao = (
  column,
  categoria,
  inclusoesAutorizadas,
  value
) => {
  return campoComInclusaoSemObservacaoCEI(
    column,
    categoria,
    inclusoesAutorizadas,
    value
  );
};

export const botaoAdicionarObrigatorio = (
  values,
  dia,
  categoria,
  diasSobremesaDoce,
  location
) => {
  return repeticaoSobremesaDoceComValorESemObservacao(
    values,
    dia,
    categoria,
    diasSobremesaDoce,
    location
  );
};

export const validarFormulario = (
  values,
  location,
  categoriasDeMedicao,
  dadosValoresInclusoesAutorizadasState,
  weekColumns
) => {
  const categoriaAlimentacao = categoriasDeMedicao.find((categoria) =>
    categoria.nome.includes("ALIMENTAÇÃO")
  );
  let erro = false;

  const values_ = deepCopy(values);
  Object.keys(values_).forEach((value) => {
    if (
      !weekColumns
        .map((wc) => wc.dia)
        .includes(
          value.includes("__dia_") &&
            value.split("__dia_")[1].split("__categoria")[0]
        )
    ) {
      delete values_[value];
    }
  });

  let dias = [];
  weekColumns.forEach((c) => dias.push(c.dia));

  categoriasDeMedicao.forEach((categoria) => {
    categoria.id === categoriaAlimentacao.id &&
      Object.keys(dadosValoresInclusoesAutorizadasState).forEach((inclusao) => {
        const dia = inclusao.split("__dia_")[1].split("__categoria")[0];
        if (
          campoComInclusaoContinuaValorMaiorQueAutorizadoESemObservacao(
            dia,
            categoria,
            dadosValoresInclusoesAutorizadasState,
            values_
          )
        ) {
          erro = `Dia ${dia} está com valor maior que o autorizado. Justifique nas observações`;
        }
      });
  });

  return erro;
};

export const validacoesTabelaAlimentacaoCEI = (
  rowName,
  dia,
  categoria,
  allValues,
  uuidFaixaEtaria
) => {
  const maxMatriculados = Number(
    allValues[
      `matriculados__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
    ]
  );
  const inputName = `${rowName}__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`;

  if (
    rowName === "frequencia" &&
    Number(allValues[inputName]) > Number(maxMatriculados)
  ) {
    return "A quantidade de alunos frequentes não pode ser maior do que a quantidade de alunos matriculados no período.";
  }

  return undefined;
};

export const validacoesTabelaAlimentacaoEmeidaCemei = (
  rowName,
  dia,
  categoria,
  allValues
) => {
  const maxMatriculados = Number(
    allValues[`matriculados__dia_${dia}__categoria_${categoria}`]
  );
  const inputName = `${rowName}__dia_${dia}__categoria_${categoria}`;

  if (
    rowName === "frequencia" &&
    Number(allValues[inputName]) > Number(maxMatriculados)
  ) {
    return "A quantidade de alunos frequentes não pode ser maior do que a quantidade de alunos matriculados no período.";
  }

  return undefined;
};

export const validacoesTabelasDietasCEI = (
  rowName,
  dia,
  categoria,
  allValues,
  uuidFaixaEtaria
) => {
  const maxDietasAutorizadas = Number(
    allValues[
      `dietas_autorizadas__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`
    ]
  );
  const inputName = `${rowName}__faixa_${uuidFaixaEtaria}__dia_${dia}__categoria_${categoria}`;

  if (
    rowName === "frequencia" &&
    Number(allValues[inputName]) > Number(maxDietasAutorizadas)
  ) {
    return "A quantidade de alunos frequentes não pode ser maior do que a quantidade de alunos com dietas autorizadas.";
  }

  return undefined;
};

export const validacoesTabelasDietasEmeidaCemei = (
  rowName,
  dia,
  categoria,
  nomeCategoria,
  allValues,
  value,
  categoriasDeMedicao
) => {
  const idCategoriaAlimentacao = categoriasDeMedicao.find((categoria) =>
    categoria.nome.includes("ALIMENTAÇÃO")
  ).id;
  const maxFrequenciaAlimentacao = Number(
    allValues[`frequencia__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
  );
  const maxDietasAutorizadas = Number(
    allValues[`dietas_autorizadas__dia_${dia}__categoria_${categoria}`]
  );
  const maxFrequencia = Number(
    allValues[`frequencia__dia_${dia}__categoria_${categoria}`]
  );
  const inputName = `${rowName}__dia_${dia}__categoria_${categoria}`;

  if (
    value &&
    Number(value) > maxFrequencia &&
    (inputName.includes("lanche_4h") ||
      inputName.includes("lanche") ||
      inputName.includes("refeicao"))
  ) {
    return "A quantidade não pode ser maior do que a quantidade inserida em Frequência.";
  } else if (
    rowName === "frequencia" &&
    Number(allValues[inputName]) > Number(maxDietasAutorizadas)
  ) {
    return "A quantidade de alunos frequentes não pode ser maior do que a quantidade de alunos com dietas autorizadas.";
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
    Number(value) !== 0 &&
    ((Number(value) +
      Number(
        allValues[`lanche__dia_${dia}__categoria_${idCategoriaAlimentacao}`]
      ) >
      maxFrequenciaAlimentacao &&
      rowName === "lanche") ||
      (Number(value) +
        Number(
          allValues[
            `lanche_4h__dia_${dia}__categoria_${idCategoriaAlimentacao}`
          ]
        ) >
        maxFrequenciaAlimentacao &&
        rowName === "lanche_4h"))
  ) {
    return "O número máximo de alimentações foi excedido. É preciso subtrair o aluno com Dieta Especial Autorizada do apontamento de Lanche na planilha de Alimentação.";
  }

  return undefined;
};

export const validarCamposComInclusoesDeAlimentacaoSemObservacao = (
  values,
  categoriasDeMedicao,
  inclusoesAutorizadas,
  setInputsInclusaoComErro,
  setExibirTooltipAoSalvar
) => {
  const categoria = categoriasDeMedicao.find(
    (categoria) => categoria.nome === "ALIMENTAÇÃO"
  );
  let listaInputsComInclusoes = [];
  let diasFaixasComErro = [];
  ["frequencia", "observacoes"].forEach((nomeRow) => {
    for (
      let idxInclusao = 0;
      idxInclusao < inclusoesAutorizadas.length;
      idxInclusao++
    ) {
      const inclusao = inclusoesAutorizadas[idxInclusao];
      for (
        let idxFaixaEtaria = 0;
        idxFaixaEtaria < inclusao.faixas_etarias.length;
        idxFaixaEtaria++
      ) {
        const faixa_etaria = inclusao.faixas_etarias[idxFaixaEtaria];
        let nomeInput = "";
        if (nomeRow === "frequencia") {
          nomeInput = `${nomeRow}__faixa_${faixa_etaria}__dia_${inclusao.dia}__categoria_${categoria.id}`;
        } else {
          nomeInput = `${nomeRow}__dia_${inclusao.dia}__categoria_${categoria.id}`;
        }
        listaInputsComInclusoes.push({
          nome: nomeInput,
          valor: values[nomeInput],
        });
      }
    }
  });
  for (
    let idxInclusao = 0;
    idxInclusao < inclusoesAutorizadas.length;
    idxInclusao++
  ) {
    const inclusao = inclusoesAutorizadas[idxInclusao];
    const inputFrequencias = listaInputsComInclusoes.filter(
      (inputComInclusao) =>
        inputComInclusao.nome.includes("frequencia") &&
        inputComInclusao.nome.includes(`dia_${inclusao.dia}`)
    );
    const observacaoDaColuna = listaInputsComInclusoes.find(
      (inputComInclusao) =>
        inputComInclusao.nome.includes("observacoes") &&
        inputComInclusao.nome.includes(`dia_${inclusao.dia}`)
    );
    const frequenciasNaoPreenchidas = inputFrequencias.filter(
      (inputFrequencia) => !inputFrequencia.valor
    );
    if (frequenciasNaoPreenchidas.length > 0 && !observacaoDaColuna.valor) {
      frequenciasNaoPreenchidas.forEach((inputFrequencia) =>
        diasFaixasComErro.push(inputFrequencia)
      );
      diasFaixasComErro.push(observacaoDaColuna);
    }
  }

  const frequenciasDessaSemana = diasFaixasComErro.filter(
    (element) => document.getElementsByName(element.nome).length
  );

  if (frequenciasDessaSemana.length > 0) {
    setInputsInclusaoComErro(diasFaixasComErro);
    setExibirTooltipAoSalvar(true);
    return true;
  } else {
    setInputsInclusaoComErro([]);
    setExibirTooltipAoSalvar(false);
    return false;
  }
};

export const exibirTooltipAlimentacoesAutorizadasDiaNaoLetivoCEI = (
  inclusoesAutorizadas,
  row,
  column,
  categoria,
  inputsInclusaoComErro,
  exibirTooltipAoSalvar
) => {
  return (
    inclusoesAutorizadas.some(
      (inclusao) =>
        String(inclusao.dia) === String(column.dia) &&
        inclusao.faixas_etarias.includes(row.uuid) &&
        row.name === "frequencia" &&
        categoria.nome === "ALIMENTAÇÃO"
    ) &&
    inputsInclusaoComErro.some(
      (inputComErro) =>
        inputComErro.nome ===
        `${row.name}__faixa_${row.uuid}__dia_${column.dia}__categoria_${categoria.id}`
    ) &&
    exibirTooltipAoSalvar
  );
};

export const exibirTooltipSuspensoesAutorizadasCEI = (
  formValuesAtualizados,
  row,
  column,
  categoria,
  suspensoesAutorizadas
) => {
  const maxMatriculados = Number(
    formValuesAtualizados[
      `matriculados__faixa_${row.uuid}__dia_${column.dia}__categoria_${categoria.id}`
    ]
  );
  const value =
    formValuesAtualizados[
      `${row.name}__faixa_${row.uuid}__dia_${column.dia}__categoria_${categoria.id}`
    ];

  return (
    value &&
    Number(value) > 0 &&
    !["Mês anterior", "Mês posterior"].includes(value) &&
    Number(value) <= maxMatriculados &&
    row.name === "frequencia" &&
    categoria.nome === "ALIMENTAÇÃO" &&
    suspensoesAutorizadas &&
    suspensoesAutorizadas.filter((suspensao) => suspensao.dia === column.dia)
      .length > 0
  );
};

export const frequenciaComSuspensaoAutorizadaPreenchida = (
  formValuesAtualizados,
  column,
  categoria,
  suspensoesAutorizadas,
  errors
) => {
  const frequenciasMesmoDia = Object.fromEntries(
    Object.entries(formValuesAtualizados).filter(
      ([key, value]) =>
        key.includes("frequencia") &&
        key.includes(`__dia_${column.dia}__`) &&
        !["Mês anterior", "Mês posterior", null].includes(value)
    )
  );
  const errosMesmoDia = Object.fromEntries(
    Object.entries(errors).filter(([key]) =>
      key.includes(`__dia_${column.dia}__categoria_${categoria.id}`)
    )
  );

  return (
    Object.keys(frequenciasMesmoDia).length > 0 &&
    categoria.nome === "ALIMENTAÇÃO" &&
    suspensoesAutorizadas &&
    suspensoesAutorizadas.filter((suspensao) => suspensao.dia === column.dia)
      .length > 0 &&
    Object.keys(errosMesmoDia).length === 0
  );
};
