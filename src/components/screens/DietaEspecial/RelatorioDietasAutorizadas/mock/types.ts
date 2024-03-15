export type DBData = {
  id: number;
  nome: string;
  escolas: {
    id: number;
    nome: string;
    tipo_unidade: {
      id: number;
      iniciais: string;
    };
    tipo_gestao: {
      id: number;
      nome: string;
    };
    total_dietas: number;
  }[];
}[];

export type ResponseAPI = {
  data: {
    titulo: string;
    datasets: {
      id: number;
      dre: string;
      total_dietas: number;
    }[];
  }[];
};
