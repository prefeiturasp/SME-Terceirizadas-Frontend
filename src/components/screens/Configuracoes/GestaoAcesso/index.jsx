import React, { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import "./styles.scss";
import {
  alterarVinculo,
  cadastrarVinculo,
  finalizarVinculo,
  getVinculosAtivos
} from "services/vinculos.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import ListagemVinculos from "./components/ListagemVinculos";
import Filtros from "./components/Filtros";
import {
  getPerfilListagem,
  getPerfisSubordinados,
  getVisoesListagem
} from "services/perfil.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import ModalCadastroVinculo from "./components/ModalCadastroVinculo";
import ModalExclusaoVinculo from "./components/ModalExclusaoVinculo";

export default ({ diretor_escola, empresa, geral, cogestor, codae }) => {
  const [carregando, setCarregando] = useState(false);
  const [vinculos, setVinculos] = useState([]);
  const [filtros, setFiltros] = useState();
  const [totalVinculos, setTotalVinculos] = useState(0);
  const [perfis, setPerfis] = useState([]);
  const [listaPerfis, setListaPerfis] = useState([]);
  const [visoes, setVisoes] = useState([]);
  const [visaoUnica, setVisaoUnica] = useState();
  const [showCadastro, setShowCadastro] = useState(false);
  const [showEdicao, setShowEdicao] = useState(false);
  const [showExclusao, setShowExclusao] = useState(false);
  const [page, setPage] = useState(1);
  const [vinculoModal, setVinculoModal] = useState();
  const [perfisSubordinados, setPerfisSubordinados] = useState();

  const buscaFiltros = async () => {
    setCarregando(true);
    const perfis = await getPerfilListagem();
    const visoes = await getVisoesListagem();
    const lista_perfis = perfis.data.results;

    let options_perfis = lista_perfis.map(perfil => ({
      uuid: perfil.nome,
      nome: perfil.nome
    }));

    let options_visoes = visoes.data.map(visao => ({
      uuid: visao.id,
      nome: visao.nome
    }));

    if (codae) {
      setVisoes(options_visoes.filter(visao => visao.uuid !== "EMPRESA"));
      setPerfis(
        lista_perfis
          .filter(perfil => perfil.visao && perfil.visao !== "EMPRESA")
          .map(visao => ({
            uuid: visao.id,
            nome: visao.nome
          }))
      );
      setListaPerfis(lista_perfis);
      setFiltros({});
      return;
    }

    if (diretor_escola) {
      setPerfisVisao(lista_perfis, "ESCOLA");
    } else if (empresa) {
      setPerfisVisao(lista_perfis, "EMPRESA");
    } else if (cogestor) {
      setPerfisVisao(lista_perfis, "DRE");
    } else if (geral) {
      const perfis_subordinados = await getPerfisSubordinados();
      const visao = localStorage.getItem("visao_perfil").replace(/['"]+/g, "");
      setPerfis(
        perfis_subordinados.data.map(perfil => ({
          uuid: perfil,
          nome: perfil
        }))
      );
      setVisaoUnica(visao);
      setFiltros({ perfil: perfis_subordinados.data });
      setPerfisSubordinados(perfis_subordinados.data);
    } else {
      setPerfis(options_perfis);
      setFiltros({});
    }

    setVisoes(options_visoes);
    setListaPerfis(lista_perfis);
  };

  const setPerfisVisao = (lista_perfis, visao) => {
    const perfis = lista_perfis
      .filter(perfil => perfil.visao === visao)
      .map(perfil => ({
        uuid: perfil.nome,
        nome: perfil.nome
      }));
    setVisaoUnica(visao);
    setPerfis(perfis);
    setFiltros({});
  };

  const buscarVinculos = async page => {
    setCarregando(true);
    if (geral && !filtros.perfil) {
      filtros.perfil = perfisSubordinados;
    }

    if (cogestor) {
      filtros.perfil = "COGESTOR_DRE";
    }

    let payload = gerarParametrosConsulta({ page, ...filtros });
    let data = await getVinculosAtivos(payload);

    setVinculos(data.results);
    setTotalVinculos(data.count);
    setCarregando(false);
  };

  const nextPage = page => {
    buscarVinculos(page);
    setPage(page);
  };

  const salvarAcesso = async (values, tipoUsuario) => {
    let payload = {};
    if (tipoUsuario === "NAO_SERVIDOR") {
      payload.instituicao = values.cnpj.replace(/[^\w\s]/gi, "");
      payload.cpf = values.cpf.replace(/[^\w\s]/gi, "");
      payload.email = values.email;
      payload.username = payload.cpf;
      payload.perfil = values.perfil;
      payload.nome = values.nome;
      payload.eh_servidor = "N";
      payload.visao = "EMPRESA";
    } else {
      payload.instituicao = values.codigo_eol_unidade;
      payload.username = values.registro_funcional;
      payload.cpf = values.cpf.replace(/[^\w\s]/gi, "");
      payload.email = values.email_servidor;
      payload.nome = values.nome_servidor;
      payload.perfil = values.perfil_servidor;
      payload.visao = values.visao_servidor;
      payload.subdivisao = values.subdivisao_servidor;
      payload.cargo = values.cargo_servidor;
      payload.eh_servidor = "S";
    }

    let response = await cadastrarVinculo(payload);
    if (response.status === 201) {
      toastSuccess("Acesso adicionado com sucesso!");
      setShowCadastro(false);
      buscarVinculos(page);
    } else {
      toastError(
        "Erro ao adicionar acesso ao usuário, procure o administrador do SIGPAE na sua Unidade!"
      );
    }
  };

  const editarAcesso = async values => {
    let payload = {};
    payload.email = values.email;
    payload.username = values.cpf.replace(/[^\w\s]/gi, "");
    payload.perfil = values.perfil;
    const response = await alterarVinculo(payload);

    if (response.status === 200) {
      toastSuccess("Acesso editado com sucesso!");
      toggleEdicao(false, null);
      buscarVinculos(page);
    } else {
      toastError("Erro ao editar acesso!");
    }
  };

  const toggleEdicao = (aberto, vinculo) => {
    setVinculoModal(vinculo);
    setShowEdicao(aberto);
  };

  const toggleExclusao = (aberto, vinculo) => {
    setVinculoModal(vinculo);
    setShowExclusao(aberto);
  };

  const deletarVinculo = async vinculo => {
    let response = await finalizarVinculo(vinculo.username);
    if (response.status === 200) {
      toastSuccess("Acesso removido com sucesso!");
      toggleExclusao(false, null);
      buscarVinculos(page);
    } else {
      toastError("Erro ao remover acesso!");
    }
  };

  useEffect(() => {
    buscaFiltros();
  }, []);

  useEffect(() => {
    if (filtros) {
      buscarVinculos(1);
      setPage(1);
    }
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <ModalCadastroVinculo
        show={showCadastro}
        toggleShow={setShowCadastro}
        listaPerfis={visaoUnica ? perfis : listaPerfis}
        listaVisao={visoes}
        diretor_escola={diretor_escola}
        cogestor={cogestor}
        empresa={empresa}
        onSubmit={salvarAcesso}
        visaoUnica={visaoUnica}
        codae={codae}
      />
      <ModalCadastroVinculo
        show={showEdicao}
        toggleShow={toggleEdicao}
        toggleExclusao={toggleExclusao}
        listaVisao={visoes}
        vinculo={vinculoModal}
        listaPerfis={perfis}
        onSubmit={editarAcesso}
      />
      <ModalExclusaoVinculo
        show={showExclusao}
        toggleShow={toggleExclusao}
        vinculo={vinculoModal}
        deletarVinculo={deletarVinculo}
      />
      <div className="card mt-3 card-gestao-acesso">
        <div className="card-body gestao-acesso">
          <Filtros
            setFiltros={setFiltros}
            perfis={perfis}
            visoes={visoes}
            setShowCadastro={setShowCadastro}
            visaoUnica={visaoUnica}
          />
          {vinculos && (
            <>
              <hr className="mt-4" />
              <ListagemVinculos
                vinculos={vinculos}
                toggleEdicao={toggleEdicao}
                toggleExclusao={toggleExclusao}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={totalVinculos}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {totalVinculos === 0 && (
            <div className="text-center mt-5">
              Não existem acessos para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
