import moment from "moment";

import { stringDecimalToNumber } from "helpers/parsers";

export const getOpcoesContrato = (empresaSelecionada) => {
  if (!empresaSelecionada) return [];
  return empresaSelecionada.contratos.map((contrato) => ({
    nome: contrato.numero,
    uuid: contrato.uuid,
  }));
};

export const geraOptionsFichasTecnicas = (
  fichasTecnicas,
  empresaSelecionada,
  fichaTecnicaSelecionada
) => {
  const options = fichasTecnicas
    .filter((ficha) => ficha.uuid_empresa === empresaSelecionada?.uuid)
    .map((ficha) => {
      return {
        nome: ficha.numero_e_produto,
        uuid: ficha.uuid,
      };
    });

  fichaTecnicaSelecionada &&
    options.unshift({
      nome: fichaTecnicaSelecionada.numero_e_produto,
      uuid: fichaTecnicaSelecionada.uuid,
    });

  return options;
};

export const getEmpresaFiltrado = (fornecedores, empresa) => {
  if (empresa) {
    const reg = new RegExp(empresa, "iu");
    return fornecedores.filter((a) => reg.test(a.value));
  }
  return fornecedores;
};

export const validaRascunho = (values) => {
  return !values.contrato;
};

export const formataPayload = (
  values,
  rascunho,
  empresaSelecionada,
  etapas,
  recebimentos
) => {
  let payload = {};
  payload.cadastro_finalizado = !rascunho;
  payload.contrato = values.contrato;
  payload.empresa = empresaSelecionada.uuid;
  payload.ficha_tecnica = values.ficha_tecnica;
  payload.armazem = values.armazem;
  payload.qtd_total_programada = values.quantidade_total?.replaceAll(".", "");
  payload.unidade_medida = values.unidade_medida;
  payload.custo_unitario_produto =
    stringDecimalToNumber(values.custo_unitario_produto) || undefined;

  payload.etapas = etapas.map((etapa, index) => ({
    numero_empenho: values[`empenho_${index}`],
    qtd_total_empenho:
      stringDecimalToNumber(values[`qtd_total_empenho_${index}`]) || undefined,
    etapa: values[`etapa_${index}`],
    parte: values[`parte_${index}`],
    data_programada: values[`data_programada_${index}`]
      ? moment(values[`data_programada_${index}`], "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        )
      : undefined,
    quantidade: values[`quantidade_${index}`]?.replaceAll(".", ""),
    total_embalagens: values[`total_embalagens_${index}`]?.replaceAll(".", ""),
  }));

  payload.programacoes_de_recebimento = recebimentos.map((etapa, index) => ({
    data_programada: values[`data_recebimento_${index}`],
    tipo_carga: values[`tipo_recebimento_${index}`],
  }));

  return payload;
};
