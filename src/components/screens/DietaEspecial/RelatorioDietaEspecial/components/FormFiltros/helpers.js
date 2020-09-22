export const getStatus = () => {
  return [
    { label: "Aprovada", value: "CODAE_AUTORIZADO" },
    { label: "Negada", value: "CODAE_NEGOU_PEDIDO" },
    { label: "Pendente", value: "CODAE_A_AUTORIZAR" }
  ];
};
