export const formataInformacoesNutricionais = produto => {
  let informacoesFormatadas = [];
  produto.informacoes_nutricionais.map(informacao => {
    if (
      informacoesFormatadas.length === 0 ||
      !informacoesFormatadas.find(
        informacao_ =>
          informacao_.nome ===
          informacao.informacao_nutricional.tipo_nutricional.nome
      )
    ) {
      informacoesFormatadas.push({
        nome: informacao.informacao_nutricional.tipo_nutricional.nome,
        valores: [
          {
            nome: informacao.informacao_nutricional.nome,
            quantidade_porcao: informacao.quantidade_porcao,
            valor_diario: informacao.valor_diario,
            medida: informacao.informacao_nutricional.medida
          }
        ],
        active: false
      });
    } else {
      let index = informacoesFormatadas.findIndex(
        informacao_ =>
          informacao_.nome ===
          informacao.informacao_nutricional.tipo_nutricional.nome
      );
      informacoesFormatadas[index].valores.push({
        nome: informacao.informacao_nutricional.nome,
        quantidade_porcao: informacao.quantidade_porcao,
        valor_diario: informacao.valor_diario,
        medida: informacao.informacao_nutricional.medida
      });
    }
  });
  return informacoesFormatadas;
};

export const produtoEhReclamacao = produto => {
  const { logs } = produto.ultima_homologacao;
  const statusDoUltimoLog = logs[logs.length - 1].status_evento_explicacao;
  const statusReclamacao = "CODAE autorizou reclamação";
  return statusReclamacao === statusDoUltimoLog;
};

export const retornaData = ({ criado_em }) => {
  return criado_em.split(" ")[0];
};
