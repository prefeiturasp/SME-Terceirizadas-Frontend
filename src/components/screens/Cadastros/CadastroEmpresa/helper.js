import { createTextMask } from "redux-form-input-masks";

export function transformaObjetos(objetos, lista = [], obj = {}) {
  try {
    objetos.results.forEach(objeto => {
      obj.uuid = objeto["uuid"];
      obj.label = objeto["nome"];
      obj.value = objeto["uuid"];
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

export const fieldCpf = createTextMask({
  pattern: "999.999.999-99",
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
      super_admin_terceirizadas: nutri.super_admin_terceirizadas,
      telefone: nutri.contatos.length === 0 ? null : nutri.contatos[0].telefone,
      email: nutri.contatos.length === 0 ? null : nutri.contatos[0].email
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
      uuid: resp.uuid,
      codigo_empresa: resp.id_externo,
      nome: resp.razao_social,
      cnpj: resp.cnpj,
      status: resp.ativo ? "Ativa" : "Inativa",
      ativo: false,
      endereco: resp.endereco,
      cep: resp.cep,
      contatos: resp.contatos.map(contato => {
        return {
          telefone: contato.telefone,
          email: contato.email
        };
      }),
      eh_distribuidor: resp.eh_distribuidor,
      telefone: resp.contatos.length === 0 ? null : resp.contatos[0].telefone,
      email: resp.contatos.length === 0 ? null : resp.contatos[0].email,
      representante: resp.representante_legal,
      telefonefax: resp.representante_telefone,
      email_representante: resp.representante_email,
      nutricionistas: retornaNutricionistas(resp.nutricionistas),
      editais: retornaEditais(resp.contratos),
      lotes: retornaLotes(resp.lotes),
      bairro: resp.bairro,
      cidade: resp.cidade,
      estado: resp.estado,
      numero: resp.numero,
      tipo: resp.eh_distribuidor ? "Distribuidor" : "Terceirizada",
      complemento: resp.complemento,
      responsavel_nome: resp.responsavel_nome,
      responsavel_email: resp.responsavel_email,
      responsavel_cpf: resp.responsavel_cpf,
      responsavel_telefone: resp.responsavel_telefone,
      responsavel_cargo: resp.responsavel_cargo
    };
  });
  return listaTerceirizadas;
};

export const formataJsonParaEnvio = (valoresForm, valoresState) => {
  const { ehDistribuidor } = valoresState;

  if (valoresState.ehDistribuidor) {
    const contatosNutri = [
      {
        nome: "nome",
        crn_numero: "numero",
        super_admin_terceirizadas: false,
        contatos: [
          {
            telefone: "0000000000000",
            email: "email@email.com"
          }
        ]
      }
    ];
    const contatosEmpresa = [
      ...valoresState.contatosEmpresa,
      ...valoresState.contatosPessoaEmpresa
    ].map(item => {
      return {
        nome: item.nome,
        telefone: item.telefone,
        email: item.email
      };
    });
    return {
      nome_fantasia: valoresForm.nome_fantasia,
      tipo_alimento: valoresForm.tipo_alimento,
      tipo_empresa: valoresForm.tipo_empresa,
      numero_contrato: valoresForm.numero_contrato,
      razao_social: valoresForm.razao_social,
      cnpj: valoresForm.cnpj,
      endereco: valoresForm.endereco,
      cep: valoresForm.cep.replace(/[^a-z0-9]/gi, ""),
      contatos: contatosEmpresa,
      nutricionistas: contatosNutri,
      bairro: valoresForm.bairro,
      cidade: valoresForm.cidade,
      complemento: valoresForm.complemento,
      eh_distribuidor: valoresForm.eh_distribuidor || ehDistribuidor,
      estado: valoresForm.estado,
      numero: valoresForm.numero,
      responsavel_cargo: valoresForm.responsavel_cargo,
      responsavel_cpf: valoresForm.responsavel_cpf,
      responsavel_nome: valoresForm.responsavel_nome,
      responsavel_telefone: valoresForm.responsavel_telefone,
      responsavel_email: valoresForm.responsavel_email,
      lotes: [],
      ativo: valoresForm.situacao,
      super_admin: {
        nome: "xxx",
        cpf: "00000000000",
        email: "xxx@xxx.com",
        contatos: [
          {
            email: "xxx@xxx.com",
            telefone: "000000000"
          }
        ]
      }
    };
  } else {
    let contatosNutri = [];
    valoresState.contatosNutricionista.forEach(nutri => {
      contatosNutri.push({
        nome: nutri.responsavel,
        crn_numero: nutri.crn,
        super_admin_terceirizadas:
          valoresState.contatosNutricionista.length === 1
            ? true
            : nutri.super_admin_terceirizadas,
        contatos: [
          {
            telefone: nutri.telefone,
            email: nutri.email
          }
        ]
      });
    });
    const super_admin = { ...valoresForm.super_admin };
    super_admin.contatos = [
      { email: super_admin.email, telefone: super_admin.telefone }
    ];
    return {
      nome_fantasia: valoresForm.nome_fantasia,
      razao_social: valoresForm.razao_social,
      cnpj: valoresForm.cnpj,
      representante_legal: valoresForm.representante_legal,
      representante_telefone: valoresForm.telefone_representante,
      representante_email: valoresForm.email_representante_legal,
      endereco: valoresForm.endereco,
      cep: valoresForm.cep.replace(/[^a-z0-9]/gi, ""),
      contatos: valoresState.contatosEmpresa,
      nutricionistas: contatosNutri,
      bairro: valoresForm.bairro,
      cidade: valoresForm.cidade,
      complemento: valoresForm.complemento,
      eh_distribuidor: valoresForm.eh_distribuidor || ehDistribuidor,
      estado: valoresForm.estado,
      numero: valoresForm.numero,
      responsavel_cargo: valoresForm.responsavel_cargo,
      responsavel_cpf: valoresForm.responsavel_cpf,
      responsavel_nome: valoresForm.responsavel_nome,
      responsavel_telefone: valoresForm.responsavel_telefone,
      responsavel_email: valoresForm.responsavel_email,
      lotes: valoresState.lotesSelecionados,
      super_admin: super_admin
    };
  }
};
