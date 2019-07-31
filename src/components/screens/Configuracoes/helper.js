export const getOptions = templates => {
  return templates.map(template => {
    return { nome: template.assunto, uuid: template.uuid };
  });
};
