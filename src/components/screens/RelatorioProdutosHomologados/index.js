import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  getInitalState,
  formataResultado
} from "components/Shareable/FormBuscaProduto/helper";
import { getNomesUnicosEditais } from "services/produto.service";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import FormBuscaProduto from "components/Shareable/FormBuscaProduto";
import { gerarParametrosConsulta } from "helpers/utilities";

import TabelaAgrupadaProdutosMarcas from "./TabelaAgrupadaProdutosMarcas";
import TabelaAgrupadaProdutosTerceirizadas from "./TabelaAgrupadaProdutosTerceirizadas";
import {
  getProdutosPorTerceirizada,
  getProdutosAgrupadosNomeMarcas,
  getRelatorioProdutosHomologados,
  getRelatorioProdutosAgrupadosMarcasHomologados,
  getNomeProdutosHomologados
} from "services/produto.service";

import "./style.scss";
import { meusDados } from "services/perfil.service";

const RelatorioProdutosHomologados = () => {
  const [dadosProdutos, setDadosProdutos] = useState(null);
  const [quantidadeHomologados, setQuantidadeHomologados] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [valoresIniciais, setValoresIniciais] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    setCarregando(true);
    async function getTotalProdutos() {
      let responseTotalProdutos = await getNomeProdutosHomologados();
      setQuantidadeHomologados(responseTotalProdutos.data.results.length);
    }
    if (!quantidadeHomologados) {
      getTotalProdutos();
    }

    async function defineFiltrosPadroes() {
      let responseEditais = await getNomesUnicosEditais();
      let responseMeusDados = await meusDados();
      let instituicaoNome = responseMeusDados.vinculo_atual.instituicao.nome;
      let valores = getInitalState(
        responseEditais.data.results,
        instituicaoNome
      );
      setValoresIniciais(valores);
      setCarregando(false);
    }
    if (!valoresIniciais) {
      defineFiltrosPadroes();
    }

    if (!filtros) return;
    async function fetchData() {
      setCarregando(true);
      setDadosProdutos(null);
      let response;
      if (filtros.agrupado_por_nome_e_marca) {
        response = await getProdutosAgrupadosNomeMarcas(filtros);
        setDadosProdutos(formataResultado(response.data));
      } else {
        response = await getProdutosPorTerceirizada(filtros);
        setDadosProdutos(response.data);
      }
      setCarregando(false);
    }
    fetchData();
  }, [filtros, setDadosProdutos, valoresIniciais, quantidadeHomologados]);

  const onSubmitForm = formValues => {
    setFiltros(formValues);
  };

  const totalResultados = dadosProdutos && dadosProdutos.length;

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 page-relatorio-produtos-homologados">
        <div className="card-body">
          {valoresIniciais && (
            <FormBuscaProduto
              onSubmit={onSubmitForm}
              onAtualizaProdutos={() => {}}
              onLimparDados={() => {
                setDadosProdutos(null);
              }}
              valoresIniciais={valoresIniciais}
            />
          )}

          {quantidadeHomologados && !carregando && (
            <div className="row">
              <div className="col-12 mt-3 ">
                <p className="quantitativo">
                  QUANTITATIVO GERAL DE PRODUTOS HOMOLOGADOS
                </p>
              </div>
              <div className="col-12 mt-1">
                <p className="totalHomologadosValor">
                  Total de itens homologados: <b>{quantidadeHomologados}</b>
                </p>
              </div>
            </div>
          )}

          {filtros &&
            filtros.agrupado_por_nome_e_marca &&
            totalResultados > 0 &&
            dadosProdutos && (
              <div className="mt-3">
                <p className="resultadoTitle">Resultado detalhado</p>
                <TabelaAgrupadaProdutosMarcas dadosProdutos={dadosProdutos} />
                <hr />
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  titulo="imprimir"
                  texto="imprimir"
                  style={BUTTON_STYLE.GREEN}
                  icon={BUTTON_ICON.PRINT}
                  className="float-right ml-3"
                  onClick={() => {
                    const params = gerarParametrosConsulta(filtros);
                    getRelatorioProdutosAgrupadosMarcasHomologados(params);
                  }}
                />
              </div>
            )}

          {filtros &&
            !filtros.agrupado_por_nome_e_marca &&
            totalResultados > 0 &&
            dadosProdutos && (
              <div className="mt-3">
                <p className="resultadoTitle">Resultado detalhado</p>
                <TabelaAgrupadaProdutosTerceirizadas
                  dadosProdutos={dadosProdutos}
                />
                <hr />
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  titulo="imprimir"
                  texto="imprimir"
                  style={BUTTON_STYLE.GREEN}
                  icon={BUTTON_ICON.PRINT}
                  className="float-right ml-3"
                  onClick={() => {
                    const params = gerarParametrosConsulta(filtros);
                    getRelatorioProdutosHomologados(params);
                  }}
                />
              </div>
            )}

          {totalResultados === 0 && (
            <div className="text-center mt-5">
              Não existem dados para filtragem informada.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default RelatorioProdutosHomologados;
