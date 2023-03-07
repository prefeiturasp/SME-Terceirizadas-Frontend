export const formataOpcoes = lista => {
  return lista.map(opcao => ({
    label: opcao.nome || opcao.iniciais,
    value: opcao.uuid
  }));
};
