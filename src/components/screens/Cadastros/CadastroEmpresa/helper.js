import { createTextMask } from 'redux-form-input-masks';

export function transformaObjetos(objetos, lista = [], obj = {}){
    try{
        // eslint-disable-next-line array-callback-return
        objetos.results.map(objeto => {
            obj.uuid = objeto['uuid'];
            obj.label = objeto['nome']
            obj.value = objeto['nome']
            lista.push(obj);
            obj = {}
        })
    }catch(err){
        return lista
    }

    return lista
};


export const fieldCnpj = createTextMask({
    pattern: '99.999.999/9999-99',
    allowEmpty: false,
    guide: false,
});

export const fieldCep = createTextMask({
    pattern: '99999-999',
    allowEmpty: false,
    guide: false,
});

export const fieldTel = createTextMask({
    pattern: '99 9999-9999',
    guide: false,
});


export const retornArrayTerceirizadas = (response) => {
  return [
    response.map(resp => {
      return {
        codigo_empresa: resp.id_externo,
        nome: resp.razao_social,
        cnpj: resp.cnpj,
        status: resp.ativo ? "Ativa" : "Inativa",
        ativo: false,
        endereco: `${resp.endereco.rua}, n°${resp.endereco.numero} - ${resp.endereco.bairro}`,
        cep: resp.endereco.cep,
        
      }
    })
  ]
}
