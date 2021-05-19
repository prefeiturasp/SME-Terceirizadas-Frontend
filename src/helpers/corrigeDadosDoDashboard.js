const sumObjectsByKey = (...objs) => {
  return objs.reduce((a, b) => {
    for (let k in b) {
      // eslint-disable-next-line no-prototype-builtins
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
};

export default results => {
  try {
    if (results["Inclusão de Alimentacao de CEI"]) {
      results["Inclusão de Alimentação"] = sumObjectsByKey(
        results["Inclusão de Alimentação"],
        results["Inclusão de Alimentacao de CEI"]
      );
    }
    if (results["Kit Lanche Passeio de CEI"]) {
      results["Kit Lanche Passeio"] = sumObjectsByKey(
        results["Kit Lanche Passeio"],
        results["Kit Lanche Passeio de CEI"]
      );
    }
    if (results["Alteração do Tipo de Alimentação de CEI"]) {
      results["Alteração do Tipo de Alimentação"] = sumObjectsByKey(
        results["Alteração do Tipo de Alimentação"],
        results["Alteração do Tipo de Alimentação de CEI"]
      );
    }
  } catch (error) {
    return false;
  }
  return true;
};
