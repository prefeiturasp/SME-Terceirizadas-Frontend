export const convertToFormat = (data)=>{
    const list = []
        data.map((value) => {
            const obj = {}
            obj['evento_data'] = value.order_date
            obj['id'] = value.id
            obj['kit_lanche'] = extractKits(value.meal_kits)
            obj['local_passeio'] = value.location
            obj['nro_alunos'] = value.students_quantity
            obj['obs'] = value.observation
            obj['salvo_em'] = value.register
            obj['status'] = value.status
            obj['tempo_passeio'] = value.scheduled_time
            list.push(obj)
        })
    return list
}

const extractKits = (data)=>{
    const list = []
    data.map((value)=>{
        const uuid = value.uuid
        list.push(uuid)
    })

    return list
}

export const adapterEnumKits = (data)=>{
    const objRoot = {}
    data.map((value,key)=>{
        const objChild = {}
        objChild['value'] = value.uuid
        objChild['label'] = value.name
        objChild['foodList'] = value.meals[0].foods
        objRoot['KIT'+(key+1)] = objChild
    })
    console.log(objRoot)
    return objRoot
}