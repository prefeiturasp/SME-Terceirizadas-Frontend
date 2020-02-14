# Gerando requisições a API

Este documento propõe uma nova estrutura para as requisições feitas a API. As principais vantagens são:

* Cabeçalhos preenchidos automaticamente
* Não precisa digitar a URL base, apenas o endpoint desejado
* Verificação se a URL termina em '/', necessário para que as requisições funcionem em produção

Foi escolhida a biblioteca [axios](https://github.com/axios/axios) para a manipulação das requisições.

## Gerando uma requisição

A maneira mais simples é um GET autenticado com o usuário atual:

```
import axios from "./_base";

const response = await axios.get(
  "/usuarios/meus-dados/"
);
```

O arquivo _base.js está dentro da pasta src/services do repositório.

Caso seja necessário enviar parâmetros na URL GET (?param=valor&foo=bar), basta passar um objeto com os parâmetros como segundo argumento:

```
import axios from "./_base";

const params = {
  nome: "joao",
  dre: 13
}
const response = await axios.get(
  "solicitacoes-dieta-especial-ativas-inativas/",
  { params }
);
```

O axios tem métodos para enviar outros tipos de requisições, como .post, .patch e .delete.

O segundo parâmetro é um objeto de configuração que pode ser usado para sobrescrever as configurações padrão, bem como enviar dados pela requisição usando o atributo params. Ele é usado tanto para requisições GET, enviando parâmetros na URL, como POST e PATCH, enviando parâmetros no corpo da requisição codificando automaticamente em JSON.

## Testando

Foi escolhida a biblioteca [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) para realizar testes unitários dos serviços. Ela simula respostas feitas a uma URL num determinado método, como no exemplo abaixo:

```
import mock from "../_mock";

const url = `test/`;
const STATUS_HTTP_SUCCESS = 200;
const dados = ["lista", "de", "substitutos"];

mock.onGet(url).reply(STATUS_HTTP_SUCCESS, dados);

const response = await axios.get(url);
expect(response.data).toEqual(dados);
expect(response.status).toEqual(STATUS_HTTP_SUCCESS);
```

O arquivo _mock.js está dentro da pasta src/services do repositório.

O objeto mock tem métodos para responder a outros métodos de requisição, como onPost, onPatch e onDelete.