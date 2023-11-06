import {
  QuantidadeAlunosEscolaInterface,
  VinculoTipoAlimentacaoPorEscolaInterface,
} from "interfaces/escola.interface";
import {
  EscolasComPermissoesLancamentosEspeciaisInterface,
  PermissaoLancamentosEspeciaisInterface,
} from "interfaces/medicao_inicial.interface";
import {
  DocumentosRecebimento,
  DocumentosRecebimentoDetalhado,
} from "./pre_recebimento.interface";

export interface ResponseInterface {
  data: Object;
  status: number;
}

export interface ResponseVinculosTipoAlimentacaoPorEscolaInterface
  extends ResponseInterface {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<VinculoTipoAlimentacaoPorEscolaInterface>;
  };
}

export interface ResponseQuantidadeAlunosEscolaInterface
  extends ResponseInterface {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<QuantidadeAlunosEscolaInterface>;
  };
}

export interface ResponsePermissoesLancamentosEspeciaisInterface
  extends ResponseInterface {
  data: {
    count: number;
    next: string | null;
    page_size: string | null;
    previous: string | null;
    results: PermissaoLancamentosEspeciaisInterface[];
  };
}

export interface ResponseEscolasComPermissoesLancamentosEspeciaisInterface
  extends ResponseInterface {
  data: {
    results: EscolasComPermissoesLancamentosEspeciaisInterface[];
  };
}

export interface ResponseDocumentosRecebimento extends ResponseInterface {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: DocumentosRecebimento[];
  };
}

export interface ResponseDocumentosRecebimentoDetalhado
  extends ResponseInterface {
  data: DocumentosRecebimentoDetalhado;
}
