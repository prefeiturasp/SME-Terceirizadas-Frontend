export const repeticaoSobremesaDoceComValor = (
  values,
  dia,
  categoria,
  diasSobremesaDoce,
  location
) => {
  return (
    values[`repeticao_refeicao__dia_${dia}__categoria_${categoria.id}`] &&
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
  return repeticaoSobremesaDoceComValor(
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
        repeticaoSobremesaDoceComValor(
          values,
          dia.split("-")[2],
          categoria,
          diasSobremesaDoce,
          location
        ) &&
        !values[
          `observacoes__dia_${dia.split("-")[2]}__categoria_${categoria.id}`
        ]
      ) {
        erro = `Dia ${
          dia.split("-")[2]
        } é de sobremesa doce. Justifique o lançamento de repetição nas observações`;
      }
    });
  });

  return erro;
};
