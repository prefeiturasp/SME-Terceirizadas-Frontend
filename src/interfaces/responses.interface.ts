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
  DocumentosRecebimentoDashboard,
  DocumentosRecebimentoDetalhado,
  DocumentosRecebimentoParaAnalise,
  FichaTecnicaDetalhada,
  FichaTecnica,
  EtapaCalendario,
} from "./pre_recebimento.interface";
import { InformacaoNutricional } from "./produto.interface";

export interface ResponseInterface {
  data: Object;
  status: number;
}

export interface ListagemPaginada<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ListagemNaoPaginada<T> {
  results: T[];
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
  data: ListagemPaginada<DocumentosRecebimento>;
}

export interface ResponseDocumentosRecebimentoDetalhado
  extends ResponseInterface {
  data: DocumentosRecebimentoDetalhado;
}

export interface ResponseDocumentosRecebimentoDashboard
  extends ResponseInterface {
  data: {
    results: Array<{
      status: string;
      dados: Array<DocumentosRecebimentoDashboard>;
    }>;
  };
}

export interface ResponseDocumentosPorStatusDashboard
  extends ResponseInterface {
  data: {
    results: {
      status: string;
      dados: Array<DocumentosRecebimentoDashboard>;
      total: number;
    };
  };
}

export interface ResponseDocumentosRecebimentoParaAnalise
  extends ResponseInterface {
  data: DocumentosRecebimentoParaAnalise;
}

export interface ResponseDownloadArquivoLaudoAssinado
  extends ResponseInterface {
  data: Blob;
}

export interface ResponseFichasTecnicas extends ResponseInterface {
  data: ListagemPaginada<FichaTecnica>;
}

export interface ResponseFichaTecnicaDetalhada extends ResponseInterface {
  data: FichaTecnicaDetalhada;
}

export interface ResponseInformacoesNutricionais extends ResponseInterface {
  data: ListagemNaoPaginada<InformacaoNutricional>;
}

export interface ResponseCalendarioCronograma extends ResponseInterface {
  data: ListagemPaginada<EtapaCalendario>;
}
