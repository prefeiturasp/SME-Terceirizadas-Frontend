import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import {
  getInitalState,
  formataResultado
} from "components/Shareable/FormBuscaProduto/helper";
import {
  gerarExcelRelatorioProdutosHomologados,
  getNomesUnicosEditais
} from "services/produto.service";

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
  getRelatorioProdutosAgrupadosMarcasHomologados
} from "services/produto.service";

import "./style.scss";
import { meusDados } from "services/perfil.service";
import { toastError } from "components/Shareable/Toast/dialogs";

const RelatorioProdutosHomologados = () => {
  const [dadosProdutos, setDadosProdutos] = useState(null);
  const [quantidadeHomologados, setQuantidadeHomologados] = useState(null);
  const [quantidadeMarcas, setQuantidadeMarcas] = useState(null);
  const [filtros, setFiltros] = useState(null);
  const [valoresIniciais, setValoresIniciais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [exportandoXLS, setExportandoXLS] = useState(false);
  const [setExibirModalCentralDownloads] = useState(false);

  useEffect(() => {
    setCarregando(true);

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
      const produtos = response.data;
      setQuantidadeHomologados(produtos.length);
      const contagemMarcas = produtos.reduce((acc, produtos) => {
        acc[produtos.marca] = (acc[produtos.marca] || 0) + 1;
        return acc;
      }, {});
      setQuantidadeMarcas(Object.keys(contagemMarcas).length);
      setCarregando(false);
    }
    fetchData();
  }, [filtros, setDadosProdutos, valoresIniciais, quantidadeHomologados]);

  const onSubmitForm = formValues => {
    setFiltros(formValues);
  };

  const exportarXLSX = async () => {
    setExportandoXLS(true);
    const response = await gerarExcelRelatorioProdutosHomologados(filtros);
    if (response.status === HTTP_STATUS.OK) {
      setExibirModalCentralDownloads(true);
    } else {
      toastError("Erro ao exportar xlsx. Tente novamente mais tarde.");
    }
    setExportandoXLS(false);
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
                  QUANTITATIVO DE PRODUTOS HOMOLOGADOS DO EDITAL
                </p>
              </div>
              <div className="col-12 mt-1">
                <p className="totalHomologadosValor">
                  Total de produtos homologados: <b>{quantidadeHomologados}</b>
                  <span className="ml-5">
                    Total de marcas homologadas: <b>{quantidadeMarcas}</b>{" "}
                  </span>
                </p>
              </div>
            </div>
          )}

          {filtros && totalResultados > 0 && dadosProdutos && (
            <div className="mt-3">
              <p className="resultadoTitle">Resultado detalhado</p>
              {filtros.agrupado_por_nome_e_marca && (
                <TabelaAgrupadaProdutosMarcas dadosProdutos={dadosProdutos} />
              )}
              {!filtros.agrupado_por_nome_e_marca && (
                <TabelaAgrupadaProdutosTerceirizadas
                  dadosProdutos={dadosProdutos}
                />
              )}
              <hr />
              <div className="row">
                <div className="col-12 text-right">
                  <Botao
                    texto="Exportar Excel"
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    icon={BUTTON_ICON.FILE_EXCEL}
                    type={BUTTON_TYPE.BUTTON}
                    disabled={exportandoXLS}
                    onClick={() => exportarXLSX()}
                    className="mr-3"
                  />
                  <Botao
                    type={BUTTON_TYPE.BUTTON}
                    titulo="imprimir"
                    texto="imprimir"
                    style={BUTTON_STYLE.GREEN}
                    icon={BUTTON_ICON.PRINT}
                    onClick={async () => {
                      const params = gerarParametrosConsulta(filtros);
                      setCarregando(true);
                      if (filtros.agrupado_por_nome_e_marca) {
                        await getRelatorioProdutosAgrupadosMarcasHomologados(
                          params
                        );
                      } else {
                        await getRelatorioProdutosHomologados(params);
                      }
                      setCarregando(false);
                    }}
                  />
                </div>
              </div>
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
