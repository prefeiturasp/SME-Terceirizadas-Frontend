import { ResponseInterface } from "./responses.interface";

export interface QuestaoConferencia {
  uuid: string;
  questao: string;
  tipo_questao: string[];
  pergunta_obrigatoria: boolean;
  posicao?: number;
}

export interface ResponseListarQuestoesConferencia extends ResponseInterface {
  data: {
    results: {
      primarias: QuestaoConferencia[];
      secundarias: QuestaoConferencia[];
    };
  };
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
