import { TIPO_PERFIL } from "constants/shared";

export const getOpecoesStatus = () => {
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  if (
    tipoPerfil === TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA ||
    tipoPerfil === TIPO_PERFIL.TERCEIRIZADA
  ) {
    return [
      "Todos",
      "Reclamações de produtos",
      "Produtos Suspensos",
      "Correções de Produtos",
      "Aguardando análise das reclamações",
      "Aguardando análise sensoriais",
      "Pendente de homologação",
      "Homologado",
      "Não homologado"
    ];
  } else if (tipoPerfil === TIPO_PERFIL.GESTAO_PRODUTO) {
    return [
      "Todos",
      "Reclamações de produtos",
      "Produtos Suspensos",
      "Aguardando análise das reclamações",
      "Aguardando análise sensoriais",
      "Pendente de homologação",
      "Homologado",
      "Não homologado"
    ];
  } else {
    return [
      "Todos",
      "Homologado",
      "Não homologado",
      "Produtos Suspensos",
      "Reclamações de produtos"
    ];
  }
};

export const getTodasOpcoesStatusPorPerfil = () => {
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  if (
    tipoPerfil === TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA ||
    tipoPerfil === TIPO_PERFIL.TERCEIRIZADA
  ) {
    return [
      "CODAE_AUTORIZOU_RECLAMACAO",
      "CODAE_SUSPENDEU",
      "CODAE_QUESTIONADO",
      "CODAE_PEDIU_ANALISE_RECLAMACAO",
      "CODAE_PEDIU_ANALISE_SENSORIAL",
      "CODAE_PENDENTE_HOMOLOGACAO",
      "CODAE_HOMOLOGADO",
      "CODAE_NAO_HOMOLOGADO"
    ];
  } else if (tipoPerfil === TIPO_PERFIL.GESTAO_PRODUTO) {
    return [
      "CODAE_AUTORIZOU_RECLAMACAO",
      "CODAE_SUSPENDEU",
      "CODAE_PEDIU_ANALISE_RECLAMACAO",
      "CODAE_PEDIU_ANALISE_SENSORIAL",
      "CODAE_PENDENTE_HOMOLOGACAO",
      "CODAE_HOMOLOGADO",
      "CODAE_NAO_HOMOLOGADO"
    ];
  } else {
    return [
      "CODAE_HOMOLOGADO",
      "CODAE_NAO_HOMOLOGADO",
      "CODAE_SUSPENDEU",
      "CODAE_AUTORIZOU_RECLAMACAO"
    ];
  }
};

export const retornaStatusBackend = status => {
  switch (status) {
    case "Reclamações de produtos":
      return "CODAE_AUTORIZOU_RECLAMACAO";
    case "Produtos Suspensos":
      return "CODAE_SUSPENDEU";
    case "Correções de Produtos":
      return "CODAE_QUESTIONADO";
    case "Aguardando análise das reclamações":
      return "CODAE_PEDIU_ANALISE_RECLAMACAO";
    case "Aguardando análise sensoriais":
      return "CODAE_PEDIU_ANALISE_SENSORIAL";
    case "Pendente de homologação":
      return "CODAE_PENDENTE_HOMOLOGACAO";
    case "Homologado":
      return "CODAE_HOMOLOGADO";
    case "Não homologado":
      return "CODAE_NAO_HOMOLOGADO";
  }
};
