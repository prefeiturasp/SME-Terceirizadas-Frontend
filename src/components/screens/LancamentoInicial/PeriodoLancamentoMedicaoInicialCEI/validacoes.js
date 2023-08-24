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
