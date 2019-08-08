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

export const checaSeDataEstaEntre2e5DiasUteis = (
  value,
  two_working_days,
  five_working_days
) => {
  const _date = value.split("/");
  if (
    two_working_days <= new Date(_date[2], _date[1] - 1, _date[0]) &&
    new Date(_date[2], _date[1] - 1, _date[0]) < five_working_days
  ) {
    return true;
  }
  return false;
};

export const dataPrioritaria = (
  data,
  proximos_dois_dias_uteis,
  proximos_cinco_dias_uteis
) => {
  const data_objeto = new Date(moment(data).format("DD/MM/YYYY"));
  console.log(data_objeto);
  console.log(proximos_dois_dias_uteis);
  console.log(proximos_cinco_dias_uteis);
  return (
    proximos_dois_dias_uteis <= data_objeto &&
    data_objeto < proximos_cinco_dias_uteis
  );
};

export const agregarDefault = lista => {
  return [{ nome: "Selecione", uuid: null }].concat(lista);
};

export const formatarParaMultiselect = lista => {
  return lista.map(element => {
    return { value: element.uuid, label: element.nome };
  });
};

export const extrairUUIDs = lista => {
  let uuids = [];
  lista.forEach(element => {
    uuids.push(element.uuid);
  });
  return uuids;
};

export const dataParaUTC = data => {
  return new Date(
    data.getUTCFullYear(),
    data.getUTCMonth(),
    data.getUTCDate(),
    data.getUTCHours(),
    data.getUTCMinutes(),
    data.getUTCSeconds()
  );
};
