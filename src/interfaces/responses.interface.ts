import {
  QuantidadeAlunosEscolaInterface,
  VinculoTipoAlimentacaoPorEscolaInterface,
} from "interfaces/escola.interface";

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
