import { parseFormValues } from "../helper";

test("test parseFormValues", () => {
  const parseFormValuesInput = {
    substituicoes_INTEGRAL: {
      periodo: "74a49ddf-b2f5-494a-b130-73d266d28dec",
      check: true,
      tipo_alimentacao_de: "5f55272c-663a-4c93-8fba-f8d0d01e6bf1",
      tipo_alimentacao_para: "11a2766f-4b3f-46ed-a49a-111a923d6131",
      "qtde-faixa-e37d05fa-b4a1-4a5c-a3f6-acc527bc3b45": "23",
      "qtde-faixa-7880d70b-f55d-4e2d-8278-0c63642aa939": "34"
    },
    observacao: "<p>Que dia feio...</p>↵",
    motivo: "509cb115-bcc1-46ad-aee2-5b84c0b3c302",
    data_alteracao: "02/04/2020",
    status: "DRE_A_VALIDAR"
  };
  const parseFormValuesOutput = {
    observacao: "<p>Que dia feio...</p>↵",
    motivo: "509cb115-bcc1-46ad-aee2-5b84c0b3c302",
    data: "2020-04-02",
    substituicoes: [
      {
        periodo_escolar: "74a49ddf-b2f5-494a-b130-73d266d28dec",
        tipo_alimentacao_de: "5f55272c-663a-4c93-8fba-f8d0d01e6bf1",
        tipo_alimentacao_para: "11a2766f-4b3f-46ed-a49a-111a923d6131",
        faixas_etarias: [
          {
            faixa_etaria: "e37d05fa-b4a1-4a5c-a3f6-acc527bc3b45",
            quantidade: 23
          },
          {
            faixa_etaria: "7880d70b-f55d-4e2d-8278-0c63642aa939",
            quantidade: 34
          }
        ]
      }
    ]
  };
  expect(parseFormValues(parseFormValuesInput)).toEqual(parseFormValuesOutput);
});
