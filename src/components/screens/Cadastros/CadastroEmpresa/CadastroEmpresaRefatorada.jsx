import React, { useEffect } from "react";
import moment from "moment";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import Select from "components/Shareable/Select";
import { Link, useHistory } from "react-router-dom";
import { Botao } from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import { DadosEmpresa } from "./components/Form/DadosEmpresa";
import { EnderecoEmpresa } from "./components/Form/EnderecoEmpresa";
import { UsuarioResponsavel } from "./components/Form/UsuarioResponsavel";
import { ContratosFormSet } from "./components/Form/ContratosFormSet";
import { ContatoFormSet } from "./components/Form/ContatoFormSet";
import { PERFIL } from "constants/shared";
import { formataJsonParaEnvio } from "./helper";
import { createTerceirizada } from "services/terceirizada.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { getError } from "helpers/utilities";
import { AdministradorSistemaFormSet } from "./components/Form/AdministradorSistemaFormSet";
import { NutricionistaFormSet } from "./components/Form/NutricionistaFormSet";
import { LotesFormSet } from "./components/Form/LotesFormSet";

const verificarUsuarioEhDistribuidor = () => {
  const tipoPerfil = localStorage.getItem("perfil");
  if (
    tipoPerfil === PERFIL.COORDENADOR_LOGISTICA ||
    tipoPerfil === PERFIL.COORDENADOR_CODAE_DILOG_LOGISTICA ||
    tipoPerfil === PERFIL.DILOG_CRONOGRAMA
  ) {
    return true;
  }
  return false;
};

export const CadastroEmpresaRefatorada = () => {
  const history = useHistory();
  const [lotesSelecionados, setLotesSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [ehDistribuidor, setEhDistribuidor] = useState(true);
  const [contatosPessoaEmpresaForm, setContatosPessoaEmpresaForm] = useState([
    "contatoPessoaEmpresa_0"
  ]);
  const [contatosEmpresaForm, setContatosEmpresaForm] = useState([
    "contatoEmpresa_0"
  ]);
  const [contatosTerceirizadaForm, setContatosTerceirizadaForm] = useState([
    "contatoTerceirizada_0"
  ]);
  const [contatosEmpresa, setContatosEmpresa] = useState([
    {
      telefone: null,
      email: ""
    }
  ]);
  const [contatosNutricionista, setContatosNutricionista] = useState([
    {
      vinculo_atual: null,
      telefone: null,
      responsavel: null,
      crn: null,
      email: null,
      super_admin_terceirizadas: false
    }
  ]);
  const [contratos, setContratos] = useState([
    {
      numero_processo: null,
      numero_contrato: null,
      vigencia_de: null,
      vigencia_ate: null
    }
  ]);
  const [terceirizada, setTerceirizada] = useState(undefined);
  const [uuid, setUuid] = useState(null);
  const [contatosPessoaEmpresa, setContatosPessoaEmpresa] = useState([
    {
      nome: "",
      telefone: null,
      email: ""
    }
  ]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) setCarregando(true);
    setEhDistribuidor(verificarUsuarioEhDistribuidor());
  }, []);
  const onSubmit = async values => {
    const dados = {
      ehDistribuidor: ehDistribuidor,
      contatosPessoaEmpresa: contatosPessoaEmpresa,
      contratos: contratos,
      contatosEmpresa: null,
      contatosNutri: null
    };
    const data = formataJsonParaEnvio(values, dados);
    if (uuid !== null) {
      setTerceirizada(uuid);
      setUuid(uuid);
    } else {
      createTerceirizada(data).then(response => {
        if (response.status === HTTP_STATUS.CREATED) {
          toastSuccess("Empresa cadastrada com sucesso!");
          history.push("/configuracoes/cadastros/empresas-cadastradas");
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(`Erro ao cadastrar empresa: ${getError(response.data)}.`);
        } else {
          toastError(`Erro ao cadastrar empresa`);
        }
      });
    }
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="cadastro cadastro-empresa pt-3">
        <div className="card">
          <div>
            <div className="card-body">
              <div className="card-title green">Dados da Empresa</div>
              <div className="row pt-3">
                <div className="col-12 text-right">
                  <Link to="/configuracoes/cadastros/empresas-cadastradas">
                    <Botao
                      texto="Empresas Cadastradas"
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                  </Link>
                </div>
              </div>
              <Form
                initialValues={{
                  data_cadastro: moment().format("DD/MM/YYYY")
                }}
                onSubmit={onSubmit}
                render={({ handleSubmit, form, values }) => (
                  <form onSubmit={handleSubmit}>
                    <DadosEmpresa ehDistribuidor={ehDistribuidor} />
                    <EnderecoEmpresa
                      values={values}
                      contatosEmpresaForm={contatosEmpresaForm}
                      setContatosEmpresaForm={setContatosEmpresaForm}
                      contatosEmpresa={contatosEmpresa}
                      setContatosEmpresa={setContatosEmpresa}
                    />
                    <AdministradorSistemaFormSet
                      ehDistribuidor={ehDistribuidor}
                    />
                    <UsuarioResponsavel ehDistribuidor={ehDistribuidor} />
                    <ContatoFormSet
                      ehDistribuidor={ehDistribuidor}
                      contatosPessoaEmpresaForm={contatosPessoaEmpresaForm}
                      setContatosPessoaEmpresaForm={
                        setContatosPessoaEmpresaForm
                      }
                      contatosPessoaEmpresa={contatosPessoaEmpresa}
                      setContatosPessoaEmpresa={setContatosPessoaEmpresa}
                    />
                    <NutricionistaFormSet
                      ehDistribuidor={ehDistribuidor}
                      contatosTerceirizadaForm={contatosTerceirizadaForm}
                      setContatosTerceirizadaForm={setContatosTerceirizadaForm}
                      contatosNutricionista={contatosNutricionista}
                      setContatosNutricionista={setContatosNutricionista}
                    />
                    <ContratosFormSet
                      ehDistribuidor={ehDistribuidor}
                      contratos={contratos}
                      setContratos={setContratos}
                      terceirizada={terceirizada}
                    />
                    <LotesFormSet
                      ehDistribuidor={ehDistribuidor}
                      lotesSelecionados={lotesSelecionados}
                      setLotesSelecionados={setLotesSelecionados}
                      terceirizada={terceirizada}
                    />
                    {/* Situação */}
                    {ehDistribuidor && (
                      <div className="card-body">
                        <div className="w-25">
                          <Field
                            component={Select}
                            label="Situação"
                            name="situacao"
                            required
                            options={[
                              {
                                nome: "Selecione...",
                                uuid: ""
                              },
                              {
                                nome: "Ativo",
                                uuid: true
                              },
                              {
                                nome: "Inativo",
                                uuid: false
                              }
                            ]}
                          />
                        </div>
                      </div>
                    )}
                    {/* /Situação */}
                    <div className="card-body">
                      <div className="row mt-5">
                        {uuid === null ? (
                          <div className="col-12 text-right">
                            <Botao
                              texto="Cancelar"
                              onClick={event => this.resetForm(event)}
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN_OUTLINE}
                            />
                            <Botao
                              texto={"Salvar"}
                              className="ml-3"
                              type={BUTTON_TYPE.SUBMIT}
                              style={BUTTON_STYLE.GREEN}
                            />
                          </div>
                        ) : (
                          <div className="col-12 text-right">
                            <Link to="/configuracoes/cadastros/empresas-cadastradas">
                              <Botao
                                texto="Cancelar"
                                style={BUTTON_STYLE.GREEN_OUTLINE}
                              />
                            </Link>
                            <Botao
                              texto={"Atualizar"}
                              onClick={handleSubmit(values =>
                                this.exibirModal({
                                  ...values
                                })
                              )}
                              className="ml-3"
                              type={BUTTON_TYPE.SUBMIT}
                              style={BUTTON_STYLE.GREEN}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};
