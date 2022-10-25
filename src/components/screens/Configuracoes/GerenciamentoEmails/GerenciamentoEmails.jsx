import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import CardLogo from "components/Shareable/CardLogo/CardLogo";
import IconeDietaEspecial from "components/Shareable/Icones/IconeDietaEspecial";
import IconeGestaoDeAlimentacao from "components/Shareable/Icones/IconeGestaoDeAlimentacao";
import IconeGestaoDeProduto from "components/Shareable/Icones/IconeGestaoDeProduto";
import FiltrosEmails from "./FiltrosEmails";
import ListagemEmails from "./ListagemSolicitacoes";
import "./style.scss";
import {
  getEmailsTerceirizadasPorModulo,
  getTerceirizada_razoes
} from "services/terceirizada.service";
import { normalizaLabelValueEmpresaSocial } from "components/screens/Cadastros/EditaisContratos/helper";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [terceirizadas, setTerceirizadas] = useState();
  const [ativos, setAtivos] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [modulo, setModulo] = useState("");
  const [resultados, setResultados] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    getTerceirizadas();
  }, []);

  const getTerceirizadas = async () => {
    const responseEmpresa = await getTerceirizada_razoes();
    if (responseEmpresa.data) {
      setEmpresas(
        normalizaLabelValueEmpresaSocial(responseEmpresa.data.results)
      );
    }
  };

  const buscarTerceirizadas = async (page, mod, busca) => {
    setCarregando(true);
    const response = await getEmailsTerceirizadasPorModulo({
      page: page,
      modulo: mod,
      busca: busca
    });
    if (response.data.results.length) {
      setTerceirizadas(response.data.results);
      setTotal(response.data.count);
    } else {
      setTotal(response.data.count);
      setTerceirizadas([])
    }
    setModulo(mod);
    setResultados(true);
    setAtivos([]);
    setCarregando(false);
  };

  const nextPage = page => {
    setPage(page);
    buscarTerceirizadas(page, modulo);
  };

  const onPesquisaChanged = values => {
    if (values.buscar) {
      if (values.buscar.length > 2) {
        buscarTerceirizadas(1, modulo, values.buscar);
      }
    } else {
      buscarTerceirizadas(1, modulo);
    }
  };

  const atualizaTabela = () => {
    buscarTerceirizadas(page ? page : 1, modulo);
  };

  return (
    <div>
      <div className="row mt-3">
        <div
          className={`${
            modulo === "Gestão de Alimentação" ? "card-verde" : "card-cinza"
          } col-3`}
        >
          <CardLogo
            titulo={"Gestão de Alimentação"}
            onClick={() => {
              buscarTerceirizadas(1, "Gestão de Alimentação");
            }}
          >
            <IconeGestaoDeAlimentacao />
          </CardLogo>
        </div>
        <div
          className={`${
            modulo === "Dieta Especial" ? "card-verde" : "card-cinza"
          } col-3`}
        >
          <CardLogo
            titulo={"Dieta Especial"}
            onClick={() => {
              buscarTerceirizadas(1, "Dieta Especial");
            }}
          >
            <IconeDietaEspecial />
          </CardLogo>
        </div>
        <div
          className={`${
            modulo === "Gestão de Produto" ? "card-verde" : "card-cinza"
          } col-3`}
        >
          <CardLogo
            titulo={"Gestão de Produto"}
            onClick={() => {
              buscarTerceirizadas(1, "Gestão de Produto");
            }}
          >
            <IconeGestaoDeProduto />
          </CardLogo>
        </div>
      </div>
      <div className="mt-3">
        <span>
          <center>
            Selecione um dos módulos acima para{" "}
            <b>Gerenciar os e-mails Cadastrados</b>
          </center>
        </span>
      </div>
      {resultados && (
        <>
          <Spin tip="Carregando..." spinning={carregando}>
            <div className="card mt-3">
              <div className="card-body gestao-requisicao-entrega">
                <FiltrosEmails
                  modulo={modulo}
                  empresas={empresas}
                  onChange={onPesquisaChanged}
                  atualizaTabela={atualizaTabela}
                />
                <ListagemEmails
                  terceirizadas={terceirizadas}
                  ativos={ativos}
                  setAtivos={setAtivos}
                  modulo={modulo}
                />
                <div className="pagination-center">
                  <Pagination
                    current={page || 1}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left"
                  />
                </div>
              </div>
            </div>
          </Spin>
        </>
      )}
    </div>
  );
};
