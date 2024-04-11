import {
  ListagemNaoPaginada,
  ListagemPaginada,
  ResponseInterface,
} from "./responses.interface";

export interface QuestaoConferencia {
  uuid: string;
  questao: string;
  tipo_questao: string[];
  pergunta_obrigatoria: boolean;
  posicao?: number;
}

export interface QuestoesPorProduto {
  numero_ficha: string;
  nome_produto: string;
  questoes_primarias: string[];
  questoes_secundarias: string[];
}

export interface ResponseListarQuestoesConferencia extends ResponseInterface {
  data: {
    results: {
      primarias: QuestaoConferencia[];
      secundarias: QuestaoConferencia[];
    };
  };
}

export interface ResponseListarQuestoesConferenciaSimples
  extends ResponseInterface {
  data: ListagemNaoPaginada<QuestaoConferencia>;
}

export interface ResponseListarQuestoesPorProduto extends ResponseInterface {
  data: ListagemPaginada<QuestoesPorProduto>;
}

export interface PayloadAtribuirQuestoesPorProduto {
  ficha_tecnica: string;
  questoes_primarias: string[];
  questoes_secundarias: string[];
}

export interface ResponseAtribuirQuestoesPorProduto extends ResponseInterface {
  data: {
    results: {
      ficha_tecnica: string;
      questoes_primarias: string[];
      questoes_secundarias: string[];
    };
  };
}

export interface FiltrosQuestoesPorProduto {
  ficha_tecnica: string;
  questao: string;
}
