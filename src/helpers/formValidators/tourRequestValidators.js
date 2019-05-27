import { SubmissionError } from "redux-form";

//TODO: colocar validadores asyncronos com request no backend?

export const validateTourRequestForm = values => {
  switch (values.tempo_passeio) {
    case "4h":
      if (values.kit_lanche.length !== 1) {
        throw new SubmissionError({
          kit_lanche: "Deve selecionar somente 1 para passeio de 4hs",
          _error: "Submission failed!"
        });
      }
      break;
    case "5_7h":
      if (values.kit_lanche.length !== 2) {
        throw new SubmissionError({
          kit_lanche: "Deve selecionar 2 para passeio de 5 a 7hs",
          _error: "Submission failed!"
        });
      }
      break;
    case "8h":
      if (values.kit_lanche.length !== 3) {
        throw new SubmissionError({
          kit_lanche: "Deve selecionar 3 para passeio de 8hs",
          _error: "Submission failed!"
        });
      }
      break;
    default:
      break;
  }
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};
