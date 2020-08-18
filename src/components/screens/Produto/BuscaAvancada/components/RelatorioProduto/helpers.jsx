export const retornaTodosOsLogs = homologacoes => {
  let logs = [];
  homologacoes.forEach(hom => {
    const todosLogs = hom.logs.reverse();
    todosLogs.forEach(log => {
      log["ativo"] = false;
      log["empresa"] = hom.rastro_terceirizada.nome_fantasia;
      logs.push(log);
    });
  });

  return logs.reverse();
};
