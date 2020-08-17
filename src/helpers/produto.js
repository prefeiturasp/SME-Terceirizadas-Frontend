import moment from "moment";
import { listarCardsPermitidos } from "./gestaoDeProdutos";

export const gerarLabelPorFiltro = filtros => {
  if (filtros.nome_produto) {
    return `Veja os resultados para *${filtros.nome_produto}*`;
  }
  if (filtros.nome_marca) {
    return `Veja os resultados para *${filtros.nome_marca}*`;
  }
  if (filtros.nome_fabricante) {
    return `Veja os resultados para *${filtros.nome_fabricante}*`;
  }
  if (filtros.situacao) {
    const card = listarCardsPermitidos().find(
      c => c.style === filtros.situacao
    );
    return `Veja os resultados para ${card.titulo}`;
  }
  if (filtros.data_inicial && filtros.data_final) {
    return `Veja os resultados para o período "${moment(
      filtros.data_inicial,
      "DD/MM/YYYY"
    ).format("DD/MM/YYYY")} à ${moment(filtros.data_final, "DD/MM/YYYY").format(
      "DD/MM/YYYY"
    )}":`;
  } else if (filtros.data_inicial) {
    return `Veja os resultados a partir de "${moment(
      filtros.data_inicial,
      "DD/MM/YYYY"
    ).format("DD/MM/YYYY")}":`;
  } else if (filtros.data_final) {
    return `Veja os resultados até "${moment(
      filtros.data_final,
      "DD/MM/YYYY"
    ).format("DD/MM/YYYY")}":`;
  } else {
    return "Veja os resultados da busca:";
  }
};
