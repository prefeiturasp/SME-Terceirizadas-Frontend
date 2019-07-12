import { GET_PERMS } from '../constants/permission.constants'

const permissoes = [
    {
        "institutions": "CODAE",
        "profiles": [
            {
                "role": "Nutricionista"
            },
            {
                "role": "Supervisor"
            },
            {
                "role": "Gestor Financeiro"
            },
            {
                "role": "Fiscal"
            }
        ],
        "id": 1
    },
    {
        "institutions": "DRE",
        "profiles": [
            {
                "role": "Cogestor"
            },
            {
                "role": "Suplente"
            }
        ],
        "id": 2
    },
    {
        "institutions": "ESCOLA",
        "profiles": [
            {
                "role": "Diretora"
            },
            {
                "role": "Professora"
            },
            {
                "role": "Subdiretora"
            }
        ],
        "id": 3
    },
    {
        "institutions": "TERCEIRIZADAS",
        "profiles": [
            {
                "role": "Gestor"
            },
            {
                "role": "Auxiliar"
            },
            {
                "role": "Assistente"
            }
        ],
        "id": 4
    }
]

export const getPermissions = () => ({
    type: GET_PERMS,
    payload: permissoes
})
