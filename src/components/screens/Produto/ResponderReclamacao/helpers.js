import moment from "moment";
import * as R from "ramda";

export const ordenaLogs = logs => {
  const sortedLogs = logs
    .concat()
    .sort((a, b) => moment(a.criado_em) - moment(b.criado_em));
  return sortedLogs;
};

export const getReclamacao = logs => {
  const arr = R.filter(
    R.propEq(
      "status_evento_explicacao",
      "Escola/Nutricionista reclamou do produto"
    ),
    logs
  );
  return arr[0];
};

export const getQuestionamentoCodae = logs => {
  const arr = R.filter(
    R.propEq("status_evento_explicacao", "CODAE pediu análise da reclamação"),
    logs
  );
  return arr[0];
};
