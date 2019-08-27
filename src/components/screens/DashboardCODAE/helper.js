export const ajustarFormatoLog = logs => {
  return logs.map(log => {
    return { text: log.descricao, date: log.data };
  });
};
