export const dataAtual = ()=>{
    const hoje = new Date()
    let dd = hoje.getDate()
    let mm = hoje.getMonth() + 1

    const yyyy = hoje.getFullYear()
    if (dd < 10){
        dd = '0' + dd
    }
    if (mm < 10){
        mm = '0' + mm
    }

    return dd+' de '+convertMes(mm)+' de '+yyyy
}

const convertMes = (mes)=>{
    const meses = {
        '01' : 'Janeiro',
        '02' : 'Fevereiro',
        '03' : 'Março',
        '04' : 'Abril',
        '05' : 'Maio',
        '06' : 'Junho',
        '07' : 'Julho',
        '08' : 'Agosto',
        '09' : 'Setembro',
        '10' : 'Outubro',
        '11' : 'Novembro',
        '12' : 'Dezembro',
    }

    return meses[mes]
}