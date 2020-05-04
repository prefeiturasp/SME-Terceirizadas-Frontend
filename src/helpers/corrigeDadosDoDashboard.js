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
    if (results["Inclusão de Alimentacao de Cei"]) {
      results["Inclusão de Alimentação"] = sumObjectsByKey(
        results["Inclusão de Alimentação"],
        results["Inclusão de Alimentacao de Cei"]
      );
    }
    if (results["Kit Lanche Passeio de Cei"]) {
      results["Kit Lanche Passeio"] = sumObjectsByKey(
        results["Kit Lanche Passeio"],
        results["Kit Lanche Passeio de Cei"]
      );
    }
    if (results["Alteração de Cardápio de Cei"]) {
      results["Alteração de Cardápio"] = sumObjectsByKey(
        results["Alteração de Cardápio"],
        results["Alteração de Cardápio de Cei"]
      );
    }
  } catch (error) {
    return false;
  }
  return true;
};
