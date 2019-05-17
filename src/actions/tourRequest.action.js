import {GET_KITS} from '../constants/tourRequest.constants'
import {getKitsByApi} from '../services/tourRequest.service'

export const getKits = ()=> ({
    type: GET_KITS,
    payload : getKitsByApi()
    // payload :{
    //     KIT1: {
    //         value: "kit_1",
    //         label: "Modelo de Kit nº 1",
    //         foodList: [
    //             "- Bebida Láctea UHT Sabor Chocolate (200 ml)",
    //             "- Pão tipo hot dog (50g) com queijo (40g, duas fatias)",
    //             "- Fruta"
    //         ]
    //     },
    //     KIT2: {
    //         value: "kit_2",
    //         label: "Modelo de Kit nº 2",
    //         foodList: [
    //             "- Bebida Láctea UHT Sabor Chocolate (200 ml)",
    //             "- Biscoito Integral Salgado (mín. de 25g embalagem individual)",
    //             "- Fruta"
    //         ]
    //     },
    //     KIT3: {
    //         value: "kit_3",
    //         label: "Modelo de Kit nº 3",
    //         foodList: [
    //             "- Néctar UHT ou Suco Tropical UHT (200 ml)",
    //             "- Pão tipo Bisnaguinha (2 unidades - 40 g )",
    //             "- Barra de Cereal (20 a 25 g embalagem individual)"
    //         ]
    //     }
    // }

})