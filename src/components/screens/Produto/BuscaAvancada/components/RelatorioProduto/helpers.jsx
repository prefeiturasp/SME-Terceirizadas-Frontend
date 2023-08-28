export const retornaTodosOsLogs = (homologacao) => {
  let logs = [];
  const todosLogs = homologacao.logs.reverse();
  todosLogs.forEach((log) => {
    log["ativo"] = false;
    log["empresa"] = homologacao.rastro_terceirizada.nome_fantasia;
    logs.push(log);
  });

  return logs.reverse();
};
