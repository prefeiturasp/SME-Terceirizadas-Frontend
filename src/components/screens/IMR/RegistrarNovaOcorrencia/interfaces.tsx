export interface OcorrenciaFormInterface {
  tipoOcorrencia: string;
  parametrizacao: string;
  resposta: string | number | boolean;
  grupo: number;
}

export interface RegistrarNovaOcorrenciaFormInterface {
  categoria: string;
  tipo_ocorrencia: string;
  datas: Array<string>;
  ocorrencias: Array<OcorrenciaFormInterface>;
  solicitacao_medicao_inicial: string;
}
