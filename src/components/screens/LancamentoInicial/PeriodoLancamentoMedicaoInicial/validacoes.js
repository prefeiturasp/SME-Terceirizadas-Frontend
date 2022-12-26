import { format, getYear } from "date-fns";
import { ALT_CARDAPIO } from "components/screens/helper";

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
  diasSobremesaDoce,
  location,
  categoriasDeMedicao
) => {
  let erro = false;

  categoriasDeMedicao.forEach(categoria => {
    diasSobremesaDoce.forEach(dia => {
      if (
        repeticaoSobremesaDoceComValorESemObservacao(
          values,
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
  });

  return erro;
};

export const validacoesTabelaAlimentacao = (
  mesAnoConsiderado,
  solicitacoesAutorizadas,
  rowName,
  dia,
  categoria,
  value,
  allValues
) => {
  const data = `${dia}/${format(mesAnoConsiderado, "MM")}/${getYear(
    mesAnoConsiderado
  )}`;
  const existeAlteracaoCardapioRPL =
    solicitacoesAutorizadas.filter(
      solicitacao =>
        solicitacao.tipo_doc === ALT_CARDAPIO &&
        solicitacao.data_evento === data &&
        solicitacao.motivo === "RPL - Refeição por Lanche"
    ).length > 0;
  const existeAlteracaoCardapioLPR =
    solicitacoesAutorizadas.filter(
      solicitacao =>
        solicitacao.tipo_doc === ALT_CARDAPIO &&
        solicitacao.data_evento === data &&
        solicitacao.motivo === "LPR - Lanche por Refeição"
    ).length > 0;

  const maxFrequencia = Number(
    allValues[`frequencia__dia_${dia}__categoria_${categoria}`]
  );
  const maxMatriculados = Number(
    allValues[`matriculados__dia_${dia}__categoria_${categoria}`]
  );
  const inputName = `${rowName}__dia_${dia}__categoria_${categoria}`;

  if (value && Number(value) === 0) {
    return "Campo não pode ser 0";
  } else if (
    value &&
    !["Mês anterior", "Mês posterior"].includes(value) &&
    [NaN, 0].includes(maxFrequencia) &&
    (inputName.includes("refeicao") ||
      inputName.includes("sobremesa") ||
      inputName.includes("lanche")) &&
    !inputName.includes("repeticao") &&
    !inputName.includes("emergencial")
  ) {
    return "Frequência acima inválida ou não preenchida.";
  } else if (
    value &&
    existeAlteracaoCardapioRPL &&
    inputName.includes("lanche") &&
    !inputName.includes("emergencial")
  ) {
    if (Number(value) > 2 * maxFrequencia) {
      return "Lançamento maior que 2x a frequência de alunos no dia.";
    } else {
      return undefined;
    }
  } else if (
    value &&
    existeAlteracaoCardapioLPR &&
    inputName.includes("refeicao") &&
    !inputName.includes("repeticao")
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
  if (value && Number(value) === 0) {
    return "Campo não pode ser 0";
  } else if (
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
      inputName.includes("lanche_5h") ||
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
    (inputName.includes("lanche_4h") || inputName.includes("lanche_5h"))
  ) {
    return "O número máximo de alimentações foi excedido. É preciso subtrair o aluno com Dieta Especial Autorizada do apontamento de Lanche na planilha de Alimentação.";
  } else if (
    value &&
    !["Mês anterior", "Mês posterior"].includes(value) &&
    [NaN, 0].includes(maxFrequencia) &&
    (inputName.includes("lanche_4h") ||
      inputName.includes("lanche_5h") ||
      inputName.includes("refeicao"))
  ) {
    return "Frequência acima inválida ou não preenchida.";
  }
  return undefined;
};
