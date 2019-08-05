import moment from "moment";

export const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve();
    }, 1500);
  });

export const dateDelta = daysDelta => {
  let today = new Date();
  today.setDate(today.getDate() + daysDelta);
  return today;
};

export const checaSeDataEstaEntre2e5DiasUteis = (value, two_working_days, five_working_days)=> {
  const _date = value.split("/");
  if (two_working_days <=
    new Date(_date[2], _date[1] - 1, _date[0]) &&
    new Date(_date[2], _date[1] - 1, _date[0]) <
    five_working_days) {
    return true;
  }
  return false;
}

export const dataPrioritaria = (
  data,
  proximos_dois_dias_uteis,
  proximos_cinco_dias_uteis
) => {
  const data_objeto = new Date(moment(data).format("DD/MM/YYYY"));
  return (
    proximos_dois_dias_uteis <= data_objeto &&
    data_objeto < proximos_cinco_dias_uteis
  );
};
