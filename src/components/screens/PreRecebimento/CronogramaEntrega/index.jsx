import React, { useContext, useEffect, useState, useRef } from "react";
import { Spin, Pagination } from "antd";
import Botao from "components/Shareable/Botao/index.jsx";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants.js";
import { NavLink } from "react-router-dom";
import { CADASTRO_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants.js";
import Filtros from "./components/Filtros";
import { gerarParametrosConsulta } from "helpers/utilities";
import { getListagemCronogramas } from "../../../../services/cronograma.service.js";
import ListagemCronogramas from "./components/ListagemCronogramas";
import MeusDadosContext from "context/MeusDadosContext";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [cronogramas, setCronogramas] = useState();
  const [filtros, setFiltros] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [ativos, setAtivos] = useState([]);
  const [buscaPorParametro, setBuscaPorParametro] = useState(false);

  const { meusDados } = useContext(MeusDadosContext);
  const inicioResultado = useRef();

  const buscarCronogramas = async page => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getListagemCronogramas(params);
    setAtivos([]);
    if (response.data.count) {
      setCronogramas(response.data.results);
      setTotal(response.data.count);
      inicioResultado.current.scrollIntoView();
    } else {
      setTotal(response.data.count);
      setCronogramas();
    }
    setCarregando(false);
    if (response.data.count === 1 && buscaPorParametro) {
      setBuscaPorParametro(false);
      setAtivos([response.data.results[0].uuid]);
    }
  };

  useEffect(() => {
    if (filtros) {
      buscarCronogramas(1);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const podeCadastrar = item => {
    /*
    TODO: Conforme solicitado pelos P.Os, usuários Logistica tem acesso
    temporariamente ao Cadastro de Cronograma. Após finalização da definição de
    permissionamento deve se remover os perfis de logistica desta função.
    */
    const perfis = [
      "DILOG_CRONOGRAMA",
      "COORDENADOR_LOGISTICA",
      "COORDENADOR_CODAE_DILOG_LOGISTICA"
    ];
    return perfis.includes(item);
  };

  const nextPage = page => {
    buscarCronogramas(page);
    setPage(page);
  };

  const updatePage = () => {
    buscarCronogramas(page);
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cronograma-entrega">
        <div className="card-body cronograma-entrega">
          <Filtros
            setFiltros={setFiltros}
            setCronogramas={setCronogramas}
            setTotal={setTotal}
            cronogramas={cronogramas}
            page={page}
            inicioResultado={inicioResultado}
          />
          {meusDados && podeCadastrar(meusDados.vinculo_atual.perfil.nome) && (
            <NavLink to={`/${PRE_RECEBIMENTO}/${CADASTRO_CRONOGRAMA}`}>
              <Botao
                texto="Cadastrar Cronograma"
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.GREEN}
                onClick={() => {}}
              />
            </NavLink>
          )}
          {cronogramas && (
            <>
              <br /> <br /> <br />
              <ListagemCronogramas
                cronogramas={cronogramas}
                ativos={ativos}
                setAtivos={setAtivos}
                updatePage={updatePage}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={total}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {total === 0 && (
            <div className="text-center mt-5">
              Não existe informação para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
