import db from "./db.json";
import { DBData, ResponseAPI } from "./types";
import tiposUnidadeAPI from "./filtros/tipos_unidade.json";

const database = db as DBData;

type Filtros = {
  tipo_gestao?: string;
  tipo_unidade?: string[];
  dre?: string;
  unidade_educacional?: string;
};

export async function api(params: Filtros): Promise<ResponseAPI> {
  const { dre, tipo_gestao, tipo_unidade, unidade_educacional } = params;

  const tiposUnidade = tiposUnidadeAPI.results;

  const dres = database
    .filter((data) => (dre ? data.id === Number(dre) : true))
    .map((dre) => {
      const escolas = dre.escolas
        .filter((escola) =>
          unidade_educacional ? escola.id === Number(unidade_educacional) : true
        )
        .filter((escola) =>
          tipo_gestao ? escola.tipo_gestao.id === Number(tipo_gestao) : true
        );

      return {
        ...dre,
        escolas,
      };
    });

  const resultDres = [
    {
      titulo: "Total de Dietas Especiais da Rede por DRE",
      datasets: dres.map((dre) => ({
        id: dre.id,
        dre: dre.nome,
        total_dietas: dre.escolas.reduce(
          (acc, item) => acc + item.total_dietas,
          0
        ),
      })),
    },
  ];

  const result = tipo_unidade?.map((unidade) => {
    const filteredDres = dres.filter(
      (dre) =>
        !!dre.escolas.find((e) => e.tipo_unidade.id === Number(unidade))?.id
    );

    const datasets = filteredDres.map((dre) => ({
      id: dre.id,
      dre: dre.nome,
      total_dietas: dre.escolas
        .filter((escola) => escola.tipo_unidade.id === Number(unidade))
        .reduce((acc, item) => acc + item.total_dietas, 0),
    }));

    const nome_unidade = tiposUnidade
      .filter((item) => item.id === unidade)
      .map((data) => data.tipo_unidade);

    return {
      titulo: `Total de Dietas Especiais - Unidade ${nome_unidade}`,
      datasets,
    };
  });

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: result?.length ? result : resultDres,
        }),
      500
    )
  );
}
