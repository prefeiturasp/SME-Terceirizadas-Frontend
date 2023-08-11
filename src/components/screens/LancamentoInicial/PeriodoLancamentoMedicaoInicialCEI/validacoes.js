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

export const botaoAdicionarObrigatorioTabelaAlimentacao = () => {
  return false;
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
  const categoriaAlimentacao = categoriasDeMedicao.find(categoria =>
    categoria.nome.includes("ALIMENTAÇÃO")
  );
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

  let dias = [];
  weekColumns.forEach(c => dias.push(c.dia));

  categoriasDeMedicao.forEach(categoria => {
    categoria.id === categoriaAlimentacao.id &&
      Object.keys(dadosValoresInclusoesAutorizadasState).forEach(inclusao => {
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
  value,
  allValues,
  dadosValoresInclusoesAutorizadasState,
  validacaoDiaLetivo,
  location,
  feriadosNoMes,
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
