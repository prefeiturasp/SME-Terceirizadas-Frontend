import { VISAO } from "../constants/shared";
import { API_URL } from "../constants/config";
import { converterDDMMYYYYparaYYYYMMDD } from "../helpers/utilities";
import authService from "./auth";
import { getPath as getInclusaoPath } from "services/inclusaoDeAlimentacao/helper";
import { getPath as getAlteracaoPath } from "services/alteracaoDeCardapio/helper";
import { getPath as getKitLanchePath } from "services/kitLanche/helper";

const authToken = {
  Authorization: `JWT ${authService.getToken()}`,
  "Content-Type": "application/json"
};

export const getRelatorioKitLancheUnificado = uuid => {
  const url = `${API_URL}/solicitacoes-kit-lanche-unificada/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `solicitacao_unificada.pdf`;
      a.click();
    });
};

export const getRelatorioAlteracaoCardapio = (uuid, tipoSolicitacao) => {
  const url = `${API_URL}/${getAlteracaoPath(
    tipoSolicitacao
  )}/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `alteracao_cardapio.pdf`;
      a.click();
    });
};

export const getRelatorioDietaEspecial = uuid => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/relatorio/`;
  return url;
};

export const getProtocoloDietaEspecial = uuid => {
  const url = `${API_URL}/solicitacoes-dieta-especial/${uuid}/protocolo/`;
  return url;
};

export const getRelatorioInclusaoAlimentacao = (uuid, tipoSolicitacao) => {
  let url = `${getInclusaoPath(tipoSolicitacao)}/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `inclusao_alimentacao.pdf`;
      a.click();
    });
};

export const getDetalheKitLancheAvulso = (uuid, tipoSolicitacao) => {
  const url = `${getKitLanchePath(tipoSolicitacao)}/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `solicitacao_kit_lanche.pdf`;
      a.click();
    });
};

export const getRelatorioProduto = ({ uuid, id_externo }) => {
  const url = `${API_URL}/produtos/${uuid}/relatorio/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `relatorio_produto_${id_externo}.pdf`;
      a.click();
    });
};

export const getDetalheInversaoCardapio = uuid => {
  const url = `${API_URL}/inversoes-dia-cardapio/${uuid}/relatorio/`;
  return url;
};

export const getDetalheSuspensaoAlimentacao = uuid => {
  const url = `${API_URL}/grupos-suspensoes-alimentacao/${uuid}/relatorio/`;
  return url;
};

export const getRelatorioFiltroPorPeriodo = (filtro, visao) => {
  let endpoint = "";
  let filtroExtra = "";
  let escolaUUID = "";
  let diretoriaRegionalUUID = "";
  switch (visao) {
    case VISAO.ESCOLA:
      endpoint = "escola-solicitacoes";
      break;
    case VISAO.DIRETORIA_REGIONAL:
      endpoint = "diretoria-regional-solicitacoes";
      escolaUUID = filtro.unidade_escolar;
      filtroExtra = escolaUUID;
      break;
    case VISAO.CODAE:
      endpoint = "codae-solicitacoes";
      escolaUUID = filtro.unidade_escolar;
      diretoriaRegionalUUID = filtro.diretoria_regional;
      filtroExtra = `${diretoriaRegionalUUID}/${escolaUUID}/`;
      break;
    default:
      endpoint = "escola-solicitacoes";
      break;
  }
  const url = `${API_URL}/${endpoint}/relatorio-periodo/${filtroExtra}?tipo_solicitacao=${
    filtro.tipo_de_solicitacao
  }&data_inicial=${converterDDMMYYYYparaYYYYMMDD(
    filtro.data_de
  )}&data_final=${converterDDMMYYYYparaYYYYMMDD(
    filtro.data_ate
  )}&status_solicitacao=${filtro.status_solicitacao}/`;

  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `filtro-por-periodo-${visao}.pdf`;
      a.click();
    });
};

export const getRelatorioResumoMesAno = visao => {
  let endpoint = "";
  switch (visao) {
    case VISAO.ESCOLA:
      endpoint = "escola-solicitacoes";
      break;
    case VISAO.DIRETORIA_REGIONAL:
      endpoint = "diretoria-regional-solicitacoes";
      break;
    case VISAO.CODAE:
      endpoint = "codae-solicitacoes";
      break;
    default:
      endpoint = "escola-solicitacoes";
      break;
  }
  const url = `${API_URL}/${endpoint}/relatorio-resumo-mes-ano/`;

  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `resumo-mes-ano-${visao}.pdf`;
      a.click();
    });
};

export const getRelatorioProdutoAnaliseSensorial = ({ uuid, id_externo }) => {
  const url = `${API_URL}/produtos/${uuid}/relatorio-analise-sensorial/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `relatorio_produto_${id_externo}.pdf`;
      a.click();
    });
};

export const getRelatorioProdutoAnaliseSensorialRecebimento = ({
  uuid,
  id_externo
}) => {
  const url = `${API_URL}/produtos/${uuid}/relatorio-analise-sensorial-recebimento/`;
  fetch(url, {
    method: "GET",
    headers: authToken,
    responseType: "blob"
  })
    .then(response => response.blob())
    .then(data => {
      let a = document.createElement("a");
      const fileURL = URL.createObjectURL(data);
      a.href = fileURL;
      a.download = `relatorio_produto_${id_externo}.pdf`;
      a.click();
    });
};
