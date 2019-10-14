#!/usr/bin/env bash
echo "Verificando testes unitários e de integração..."
npm run-script coverage

echo "Verificando qualidade de código..."
npm run-script eslint

echo "Verificando estilo..."
npm run-script prettier

echo "Rodando code climate..."
docker run \
  --interactive --tty --rm \
  --env CODECLIMATE_CODE="$PWD" \
  --volume "$PWD":/code \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume /tmp/cc:/tmp/cc \
  codeclimate/codeclimate analyze
