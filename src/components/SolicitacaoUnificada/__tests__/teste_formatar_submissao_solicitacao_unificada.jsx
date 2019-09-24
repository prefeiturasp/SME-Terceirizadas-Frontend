import { formatarSubmissao } from "../helper";

describe("Teste formatarSubmissão Solicitação Unificada", () => {
  const solicitacaoKitLanche = {
    data: "02/08/2019",
    diretoria_regional: "dae78a0b-b16d-4bbe-aa96-b91d906199bc",
    descricao: "<p></p>\n",
    quantidade_max_alunos_por_escola: null,
    kit_lanche: ["9f86ecb8-bdba-4d70-9fb7-13844f563636"],
    lista_kit_lanche_igual: true,
    local: "Ibirapuera",
    tempo_passeio: "0",
    escolas: [
      {
        checked: true,
        tempo_passeio: "0",
        quantidade_alunos: "22",
        nro_alunos: "33",
        kit_lanche: ["9f86ecb8-bdba-4d70-9fb7-13844f563636"],
        uuid: "73605a3b-7767-4ea6-845e-fef62f84dc1c",
        kitsChecked: ["9f86ecb8-bdba-4d70-9fb7-13844f563636"]
      }
    ]
  };

  it("formata submissao com kit lanches iguais", () => {
    const resposta = {
      local: "Ibirapuera",
      diretoria_regional: "dae78a0b-b16d-4bbe-aa96-b91d906199bc",
      lista_kit_lanche_igual: true,
      quantidade_max_alunos_por_escola: null,
      solicitacao_kit_lanche: {
        kits: ["9f86ecb8-bdba-4d70-9fb7-13844f563636"],
        data: "02/08/2019",
        descricao: "<p></p>\n",
        tempo_passeio: "0"
      },
      escolas_quantidades: [
        {
          tempo_passeio: null,
          quantidade_alunos: "22",
          kits: [],
          escola: "73605a3b-7767-4ea6-845e-fef62f84dc1c"
        }
      ]
    };
    expect(formatarSubmissao(solicitacaoKitLanche)).toEqual(resposta);
  });

  it("formata submissao com kit lanches diferentes", () => {
    let solicitacaoKitLancheDiferente = solicitacaoKitLanche;
    solicitacaoKitLancheDiferente.lista_kit_lanche_igual = false;
    const resposta = {
      local: "Ibirapuera",
      diretoria_regional: "dae78a0b-b16d-4bbe-aa96-b91d906199bc",
      lista_kit_lanche_igual: false,
      quantidade_max_alunos_por_escola: null,
      solicitacao_kit_lanche: {
        kits: [],
        data: "02/08/2019",
        descricao: "<p></p>\n",
        tempo_passeio: null
      },
      escolas_quantidades: [
        {
          tempo_passeio: "0",
          quantidade_alunos: "33",
          kits: ["9f86ecb8-bdba-4d70-9fb7-13844f563636"],
          escola: "73605a3b-7767-4ea6-845e-fef62f84dc1c"
        }
      ]
    };
    expect(formatarSubmissao(solicitacaoKitLancheDiferente)).toEqual(resposta);
  });
});
