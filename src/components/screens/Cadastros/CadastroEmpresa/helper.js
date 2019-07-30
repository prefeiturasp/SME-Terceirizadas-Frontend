import { createTextMask } from 'redux-form-input-masks';

export function transformaObjetos(objetos, lista = [], obj = {}){
    try{
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

    