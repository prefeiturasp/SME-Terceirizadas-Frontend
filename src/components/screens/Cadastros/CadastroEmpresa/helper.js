import { createTextMask } from "redux-form-input-masks";

export function transformaObjetos(objetos, lista = [], obj = {}) {
  try {
    // eslint-disable-next-line array-callback-return
    objetos.results.map(objeto => {
      obj.uuid = objeto["uuid"];
      obj.label = objeto["nome"];
      obj.value = objeto["nome"];
      lista.push(obj);
      obj = {};
    });
  } catch (err) {
    return lista;
  }

  return lista;
}

export const fieldCnpj = createTextMask({
  pattern: "99.999.999/9999-99",
  allowEmpty: false,
  guide: false
});

export const fieldCep = createTextMask({
  pattern: "99999-999",
  allowEmpty: false,
  guide: false
});

export const fieldTel = createTextMask({
  pattern: "99 9999-9999",
  guide: false
});

const retornaNutricionistas = nutricionistas => {
  const listaNutricionistas = nutricionistas.map(nutri => {
    return {
      nome: nutri.nome,
      crn: nutri.crn_numero,
      telefone: nutri.contatos[0].telefone,
      email: nutri.contatos[0].email
    };
  });
  return listaNutricionistas;
};

const retornaLotes = lotes => {
  const listaLotes = lotes.map(lote => {
    return {
      nome: lote.nome,
      uuid: lote.uuid
    };
  });
  return listaLotes;
};

const retornaEditalDeContrato = contrato => {
  return {
    edital: contrato.edital.numero,
    contrato: contrato.numero
  };
};

const retornaEditais = contratos => {
  const listaEditais = contratos.map(contrato => {
    return retornaEditalDeContrato(contrato);
  });
  return listaEditais;
};

export const retornArrayTerceirizadas = response => {
  const listaTerceirizadas = response.map(resp => {
    return {
      codigo_empresa: resp.id_externo,
      nome: resp.razao_social,
      cnpj: resp.cnpj,
      status: resp.ativo ? "Ativa" : "Inativa",
      ativo: false,
      endereco: `${resp.endereco.rua}, n°${resp.endereco.numero} - ${
        resp.endereco.bairro
      }`,
      cep: resp.endereco.cep,

      telefone: resp.contatos[0].telefone,
      email: resp.contatos[0].email,

      representante: resp.representante_legal,
      telefonefax: resp.representante_telefone,
      email_representante: resp.representante_email,
      nutricionistas: retornaNutricionistas(resp.nutricionistas),
      editais: retornaEditais(resp.contratos),
      lotes: retornaLotes(resp.lotes)
    };
  });
  return listaTerceirizadas;
};
