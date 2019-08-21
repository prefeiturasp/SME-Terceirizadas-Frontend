export const normalizaLabelValueDRE = response => {
  let dres = response.results.map(elemento => {
    return {
      label: elemento.nome,
      value: elemento.uuid,
      uuid: elemento.uuid
    };
  });
  return dres;
};

export const normalizaLabelValueLote = response => {
  let lotes = response.map(elemento => {
    return {
      label: elemento.nome,
      value: elemento.uuid,
      uuid: elemento.uuid
    };
  });
  return lotes;
};

export const normalizaLabelValueEmpresa = response => {
  let empresas = response.map(empresa => {
    return {
      label: empresa.nome_fantasia,
      value: empresa.uuid,
      uuid: empresa.uuid
    };
  });
  return empresas;
};

export const renderizarLabelLote = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione um ou mais lotes...";
  }
  if (selected.length === options.length) {
    return "Todos os lotes foram selecionados";
  }
  if (selected.length === 1) {
    return `${selected.length} lote selecionado`;
  }
  return `${selected.length} lotes selecionados`;
};

export const renderizarLabelDiretoria = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione uma ou mais diretorias ...";
  }
  if (selected.length === options.length) {
    return "Todas as diretorias foram selecionadas";
  }
  if (selected.length === 1) {
    return `${selected.length} diretoria selecionada`;
  }
  return `${selected.length} diretorias selecionadas`;
};

export const renderizarLabelEmpresa = (selected, options) => {
  if (selected.length === 0) {
    return "Selecione uma ou mais empresas ...";
  }
  if (selected.length === options.length) {
    return "Todas as empresas foram selecionadas";
  }
  if (selected.length === 1) {
    return `${selected.length} empresa selecionada`;
  }
  return `${selected.length} empresas selecionadas`;
};

export const montaEstadoEditalEContrato = (edital, contratos) => {
  const editalContrato = edital;
  editalContrato["contratos_relacionados"] = contratos;
  return editalContrato;
};

export const montaEstadoEditais = response => {
  let editais = response.data.results.map(edital => {
    return {
      ativo: false,
      uuid: edital.uuid,
      tipo_contratacao: edital.tipo_contratacao,
      edital_numero: edital.numero,
      processo_administrativo: edital.processo,
      resumo: edital.objeto,
      contratos: edital.contratos
    };
  });
  return editais;
};

export const montaContratoRelacionado = (
  contratos_relacionados,
  contrato,
  indice_contrato
) => {
  contratos_relacionados[indice_contrato].lotes = contrato.lotes.map(lote => {
    return lote.uuid;
  });
  contratos_relacionados[indice_contrato].lotes_nomes = contrato.lotes.map(
    lote => {
      return lote.nome;
    }
  );

  contratos_relacionados[
    indice_contrato
  ].dres = contrato.diretorias_regionais.map(dre => {
    return dre.uuid;
  });
  contratos_relacionados[
    indice_contrato
  ].dres_nomes = contrato.diretorias_regionais.map(dre => {
    return dre.nome;
  });

  contratos_relacionados[indice_contrato].empresas = contrato.terceirizadas.map(
    terceirizada => {
      return terceirizada.uuid;
    }
  );

  contratos_relacionados[
    indice_contrato
  ].empresas_nomes = contrato.terceirizadas.map(terceirizada => {
    return terceirizada.nome_fantasia;
  });
  contratos_relacionados[indice_contrato].processo_administrativo =
    contrato.processo;
  contratos_relacionados[indice_contrato].numero_contrato = contrato.numero;
  contratos_relacionados[indice_contrato].data_proposta =
    contrato.data_proposta;
  contrato.vigencias.forEach((vigencia, indice_vigencia) => {
    if (indice_vigencia === 0) {
      contratos_relacionados[indice_contrato].vigencias[
        indice_vigencia
      ].data_inicial = vigencia["data_inicial"];
      contratos_relacionados[indice_contrato].vigencias[
        indice_vigencia
      ].data_final = vigencia["data_final"];
    } else {
      let vigencia_temp = {
        data_inicial: vigencia["data_inicial"],
        data_final: vigencia["data_final"]
      };
      contratos_relacionados[indice_contrato].vigencias.push(vigencia_temp);
    }
  });

  return contratos_relacionados
};
