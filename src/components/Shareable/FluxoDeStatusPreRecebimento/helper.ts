import { LogSolicitacoesUsuarioSimples } from "interfaces/dados_comuns.interface";

export const tipoDeStatusClasse = (status: LogSolicitacoesUsuarioSimples) => {
  /* caso especial para adicionar item ao final da linha do tempo de
  Solicitação Alteração de Cronograma (história 104395) */
  if (status.criado_em === "") return "pending";

  switch (status.status_evento_explicacao) {
    case "Cronograma Criado":
    case "Assinado e Enviado ao Fornecedor":
    case "Assinado Fornecedor":
    case "Assinado DINUTRE":
    case "Assinado CODAE":
    case "Em Análise":
    case "Cronograma Ciente":
    case "Aprovado DINUTRE":
    case "Aprovado DILOG":
    case "Aprovado CODAE":
    case "Alteração enviada ao fornecedor":
    case "Fornecedor Ciente":
    case "Documento enviado para análise":
    case "Documento aprovado":
    case "Documento correção realizada":
    case "Layout enviado para análise":
    case "Layout aprovado":
    case "Layout correção realizada":
      return "active";

    case "Solicitada Alteração":
    case "Alteração CODAE":
    case "Documento enviado para correção":
    case "Layout solicitado correção":
      return "questioned";

    case "Reprovado DILOG":
    case "Reprovado DINUTRE":
    case "Reprovado CODAE":
      return "disapproved";

    default:
      return "pending";
  }
};

export const tituloItem = (statusEventoExplicacao: string): string => {
  const statusMap = {
    "Documento enviado para análise": "Enviado para Análise",
    "Documento correção realizada": "Enviado para Análise",
    "Documento enviado para correção": "Enviado para Correção",
    "Documento aprovado": "Aprovado",
    "Layout enviado para análise": "Enviado para Análise",
    "Layout solicitado correção": "Solicitado Correção",
    "Layout correção realizada": "Enviado para Análise",
    "Layout aprovado": "Aprovado",
  };

  return statusMap[statusEventoExplicacao] || statusEventoExplicacao;
};
