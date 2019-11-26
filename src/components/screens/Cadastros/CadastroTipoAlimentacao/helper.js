export const getDadosUnidadeEscolar = () => {
  const url = `http://localhost:5555/api/v1/data`;

  const OBJ_REQUEST = {
    method: "GET"
  };
  return fetch(url, OBJ_REQUEST)
    .then(result => {
      return result.json();
    })
    .catch(error => {
      return error.json();
    });
};

const checkPossibilidades = periodos => {
  periodos.forEach(periodo => {
    periodo.tipos_alimentos.forEach(alimento => {
      alimento.possibilidades.forEach(possibilidade => {
        possibilidade["check"] = false;
      });
    });
  });
};

export const adicionaCheckPossibilidades = data => {
  data.forEach(tipo_unidade => {
    checkPossibilidades(tipo_unidade.periodos);
  });
  return data;
};
