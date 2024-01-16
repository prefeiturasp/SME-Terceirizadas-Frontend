import {
  CardItem,
  FichaTecnicaDashboard,
  VerMaisItem,
} from "interfaces/pre_recebimento.interface";
import { ordenarPorLogMaisRecente, truncarString } from "helpers/utilities";

export const formatarCards = (items: FichaTecnicaDashboard[]): CardItem[] => {
  return items.sort(ordenarPorLogMaisRecente).map((item) => ({
    text: gerarTextoTruncado(item, 20),
    date: item.log_mais_recente.slice(0, 10),
    link: "#",
    status: item.status,
    fullText: gerarTextoCompleto(item),
  }));
};

export const formataItensVerMais = (
  itens: FichaTecnicaDashboard[],
  urlBaseItem: string
): VerMaisItem[] => {
  return itens.sort(ordenarPorLogMaisRecente).map((item) => ({
    texto: gerarTextoTruncado(item, 50),
    textoCompleto: gerarTextoCompleto(item),
    data: item.log_mais_recente.slice(0, 10),
    link: `${urlBaseItem}?uuid=${item.uuid}`,
  }));
};

export const gerarTextoTruncado = (
  item: FichaTecnicaDashboard,
  tamanhoMaximo: number
) => {
  return `${item.numero_ficha} - ${truncarString(
    item.nome_produto,
    tamanhoMaximo
  )} - ${truncarString(item.nome_empresa, tamanhoMaximo)}`;
};

export const gerarTextoCompleto = (item: FichaTecnicaDashboard) => {
  return `${item.numero_ficha} - ${item.nome_produto} - ${item.nome_empresa}`;
};
