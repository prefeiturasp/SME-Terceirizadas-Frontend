import React, { useEffect, useState, useContext } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { LAYOUT_EMBALAGEM, PRE_RECEBIMENTO } from "configs/constants";
import { useHistory } from "react-router-dom";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";
import { detalharLayoutEmabalagem } from "services/layoutEmbalagem.service";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import BotaoAnexo from "components/PreRecebimento/BotaoAnexo";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { Field, Form } from "react-final-form";
import MeusDadosContext from "context/MeusDadosContext";
import moment from "moment";
import { textAreaRequired } from "helpers/fieldValidators";
import ModalCancelarCorrecao from "./components/ModalCancelarCorrecao";
import { PAINEL_LAYOUT_EMBALAGEM } from "../../../../../../configs/constants";
import ModalCancelarAnalise from "./components/ModalCancelarAnalise";
import ModalEnviarAnalise from "./components/ModalEnviarAnalise";
import { analiseCodaeLayoutEmbalagem } from "../../../../../../services/layoutEmbalagem.service";
import {
  toastError,
  toastSuccess,
} from "../../../../../Shareable/Toast/dialogs";
import { usuarioComAcessoAoPainelEmbalagens } from "../../../../../../helpers/utilities";
import { FluxoDeStatusPreRecebimento } from "components/Shareable/FluxoDeStatusPreRecebimento";

export default ({ analise }) => {
  const history = useHistory();

  const { meusDados } = useContext(MeusDadosContext);

  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState({});
  const [embalagemPrimaria, setEmbalagemPrimaria] = useState([]);
  const [embalagemSecundaria, setEmbalagemSecundaria] = useState([]);
  const [embalagemTerciaria, setEmbalagemTerciaria] = useState([]);
  const [aprovacoes, setAprovacoes] = useState([]);
  const [modais, setModais] = useState([]);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalEnviar, setModalEnviar] = useState(false);

  const [visaoCODAE, setVisaoCODAE] = useState(null);

  const voltarPaginaGrid = () =>
    history.push(`/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`);

  const voltarPaginaPainel = () =>
    history.push(`/${PRE_RECEBIMENTO}/${PAINEL_LAYOUT_EMBALAGEM}`);

  const carregarDados = async () => {
    setCarregando(true);
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharLayoutEmabalagem(uuid);

    const objeto = response.data;
    objeto.tipos_de_embalagens = objeto.tipos_de_embalagens.sort((a, b) => {
      const embalagemA = a.tipo_embalagem.toUpperCase();
      const embalagemB = b.tipo_embalagem.toUpperCase();
      if (embalagemA < embalagemB) {
        return -1;
      }
      if (embalagemA > embalagemB) {
        return 1;
      }
      return 0;
    });

    setObjeto(objeto);
    setVisaoCODAE(usuarioComAcessoAoPainelEmbalagens());
    setEmbalagemPrimaria(obterImagensEmbalagem(response, "PRIMARIA"));
    setEmbalagemSecundaria(obterImagensEmbalagem(response, "SECUNDARIA"));
    setEmbalagemTerciaria(obterImagensEmbalagem(response, "TERCIARIA"));
    setCarregando(false);
  };

  const obterImagensEmbalagem = (response, tipo_embalagem) => {
    return response.data.tipos_de_embalagens
      .filter((e) => e.tipo_embalagem === tipo_embalagem)
      .map((e) => e.imagens)
      .flat();
  };

  const changeModal = (index, value) => {
    let newModais = [...modais];
    newModais[index] = value;
    setModais(newModais);
  };

  const changeAprovacoes = (index, value) => {
    let newAprovacoes = [...aprovacoes];
    newAprovacoes[index] = value;
    setAprovacoes(newAprovacoes);
  };

  const retornaTextoAprovacao = (index, values) => {
    if (aprovacoes[index] === true) {
      let texto = values[`justificativa_${index}`].split("|");
      return (
        <div className="col-7">
          <div className="subtitulo row ms-5">
            <div className="w-5">
              <i className="fas fa-check mr-2" />
            </div>
            <div className="w-95">
              <div>{texto[0]}</div>
              <div>{texto[1]}</div>
            </div>
          </div>
        </div>
      );
    } else if (aprovacoes[index] === false) {
      return (
        <div className="col-7">
          <Field
            component={TextArea}
            label="Correções Necessárias"
            name={`justificativa_${index}`}
            placeholder="Qual a sua observação para essa decisão?"
            required
            validate={textAreaRequired}
            disabled={objeto.status === "Solicitado Correção"}
          />

          {objeto.status !== "Solicitado Correção" && (
            <Botao
              texto="Cancelar"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="float-end ms-3"
              onClick={() => {
                changeModal(index, true);
              }}
            />
          )}

          <ModalCancelarCorrecao
            show={modais[index]}
            handleClose={() => {
              changeModal(index, false);
            }}
            cancelar={() => {
              aprovacoes[index] = undefined;
              values[`justificativa_${index}`] = "";
            }}
          />
        </div>
      );
    }
  };

  const retornaBotoesAprovacao = (index, values) => {
    return (
      <div className="mt-4">
        <Botao
          texto="Aprovar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          icon="fas fa-check"
          onClick={() => {
            changeAprovacoes(index, true);
            values[
              `justificativa_${index}`
            ] = `Embalagem Aprovada em ${moment().format(
              "DD/MM/YYYY - HH:mm"
            )}\n|Por: ${meusDados.nome}`;
          }}
          disabled={aprovacoes[index] !== undefined}
        />

        <Botao
          texto="Reprovar"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          icon="fas fa-times"
          className="ms-4"
          onClick={() => {
            changeAprovacoes(index, false);
            values[`justificativa_${index}`] = "";
          }}
          disabled={aprovacoes[index] === false}
        />
      </div>
    );
  };

  const onSubmit = () => {
    setModalEnviar(true);
  };

  const getAprovacao = (index) => {
    if (aprovacoes[index] === true) {
      return "APROVADO";
    } else if (aprovacoes[index] === false) {
      return "REPROVADO";
    }
  };

  const formataPayload = (values) => {
    let payload = {};

    payload.tipos_de_embalagens = [];

    payload.tipos_de_embalagens.push({
      tipo_embalagem: "PRIMARIA",
      status: getAprovacao(0),
      complemento_do_status: values[`justificativa_${0}`],
    });
    payload.tipos_de_embalagens.push({
      tipo_embalagem: "SECUNDARIA",
      status: getAprovacao(1),
      complemento_do_status: values[`justificativa_${1}`],
    });
    if (embalagemTerciaria.length > 0) {
      payload.tipos_de_embalagens.push({
        tipo_embalagem: "TERCIARIA",
        status: getAprovacao(2),
        complemento_do_status: values[`justificativa_${2}`],
      });
    }

    return payload;
  };

  const enviarAnalise = async (values) => {
    setCarregando(true);
    let payload = formataPayload(values);
    try {
      let response = await analiseCodaeLayoutEmbalagem(objeto.uuid, payload);
      if (response.status === 201 || response.status === 200) {
        setCarregando(false);
        toastSuccess("Sua avaliação foi enviada com sucesso!");
        voltarPaginaPainel();
      } else {
        toastError("Ocorreu um erro ao analisar o Layout da Embalagem");
        setCarregando(false);
      }
    } catch (error) {
      toastError(error, "Ocorreu um erro ao analisar o Layout da Embalagem");
    }
  };

  const validaAprovacoes =
    aprovacoes[0] !== undefined &&
    aprovacoes[1] !== undefined &&
    (embalagemTerciaria.length === 0 || aprovacoes[2] !== undefined);

  useEffect(() => {
    setCarregando(true);

    carregarDados();

    setCarregando(false);
  }, []);

  useEffect(() => {
    definirAprovacoes();
    definirInitialValues();
  }, [visaoCODAE, objeto, aprovacoes]);

  const definirAprovacoes = () => {
    if (objeto && ["Aprovado", "Solicitado Correção"].includes(objeto.status)) {
      const aprovacoesAtualizadas = objeto.tipos_de_embalagens.map(
        (tipoEmbalagem) => (tipoEmbalagem.status === "APROVADO" ? true : false)
      );
      setAprovacoes(aprovacoesAtualizadas);
    }
  };

  const definirInitialValues = () => {
    return aprovacoes.length > 0 && !analise
      ? {
          justificativa_0: objeto.tipos_de_embalagens[0].complemento_do_status,
          justificativa_1: objeto.tipos_de_embalagens[1].complemento_do_status,
          justificativa_2:
            objeto.tipos_de_embalagens.length === 3
              ? objeto.tipos_de_embalagens[2].complemento_do_status
              : "",
        }
      : {
          justificativa_0: "",
          justificativa_1: "",
          justificativa_2: "",
        };
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-detalhar-layout-embalagem">
        <div className="card-body">
          {objeto.logs && (
            <div className="row my-4">
              <FluxoDeStatusPreRecebimento listaDeStatus={objeto.logs} />
            </div>
          )}
          <div className="subtitulo mb-3">Dados do Produto</div>
          <div className="row mt-3">
            <div className="col-4">
              <label className="label-dados-produto">Nº do Cronograma</label>
            </div>
            <div className="col-4">
              <label className="label-dados-produto">
                Nº do Pregão/Chamada Pública
              </label>
            </div>
            <div className="col-4">
              <label className="label-dados-produto">
                {visaoCODAE !== null ? (
                  visaoCODAE ? (
                    "Data do Cadastro"
                  ) : (
                    "Nome do Produto"
                  )
                ) : (
                  <></>
                )}
              </label>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-4">
              <span className="valor-dados-produto">
                {objeto.numero_cronograma}
              </span>
            </div>
            <div className="col-4">
              <span className="valor-dados-produto">
                {objeto.pregao_chamada_publica}
              </span>
            </div>
            <div className="col-4">
              <span className="valor-dados-produto">
                {visaoCODAE !== null ? (
                  visaoCODAE && objeto.criado_em ? (
                    objeto.criado_em.split(" ")[0]
                  ) : (
                    objeto.nome_produto
                  )
                ) : (
                  <></>
                )}
              </span>
            </div>
          </div>

          {(analise || visaoCODAE) && (
            <>
              <hr />
              <p>Empresa:</p>
              <p className="font-weight-bold">{objeto.nome_empresa}</p>
              <p>Produto:</p>
              <p className="font-weight-bold">{objeto.nome_produto}</p>

              {objeto.observacoes && (
                <>
                  <hr />
                  <div className="row mb-3">
                    <div className="col-12">
                      <TextArea
                        label="Observações do Fornecedor"
                        input={{ value: objeto.observacoes }}
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <hr />

          <Form
            onSubmit={onSubmit}
            initialValues={definirInitialValues()}
            render={({ handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <ModalCancelarAnalise
                  show={modalCancelar}
                  handleClose={() => setModalCancelar(false)}
                  cancelar={voltarPaginaPainel}
                />
                <ModalEnviarAnalise
                  show={modalEnviar}
                  handleClose={() => setModalEnviar(false)}
                  enviar={() => enviarAnalise(values)}
                />
                <div
                  className={`${
                    Object.keys(objeto).length !== 0 &&
                    objeto.tipos_de_embalagens[0].status === "REPROVADO"
                      ? "subtitulo-laranja"
                      : "subtitulo"
                  }  mb-3`}
                >
                  Embalagem Primária
                </div>
                <div className="row">
                  <div className="col-5">
                    {embalagemPrimaria.map((e) => (
                      <div className="w-75" key={e.arquivo}>
                        <BotaoAnexo urlAnexo={e.arquivo} />
                      </div>
                    ))}
                    {analise && retornaBotoesAprovacao(0, values)}
                  </div>
                  {(analise || visaoCODAE) && retornaTextoAprovacao(0, values)}
                </div>

                <hr />

                <div
                  className={`${
                    Object.keys(objeto).length !== 0 &&
                    objeto.tipos_de_embalagens[1].status === "REPROVADO"
                      ? "subtitulo-laranja"
                      : "subtitulo"
                  }  mb-3`}
                >
                  Embalagem Secundária
                </div>
                <div className="row">
                  <div className="col-5">
                    {embalagemSecundaria.map((e) => (
                      <div className="w-75" key={e.arquivo}>
                        <BotaoAnexo urlAnexo={e.arquivo} />
                      </div>
                    ))}
                    {analise && retornaBotoesAprovacao(1, values)}
                  </div>
                  {(analise || visaoCODAE) && retornaTextoAprovacao(1, values)}
                </div>

                {embalagemTerciaria.length > 0 && (
                  <>
                    <hr />

                    <div
                      className={`${
                        Object.keys(objeto).length !== 0 &&
                        objeto.tipos_de_embalagens[2].status === "REPROVADO"
                          ? "subtitulo-laranja"
                          : "subtitulo"
                      }  mb-3`}
                    >
                      Embalagem Terciária
                    </div>
                    <div className="row">
                      <div className="col-5">
                        {embalagemTerciaria.map((e) => (
                          <div className="w-75" key={e.arquivo}>
                            <BotaoAnexo urlAnexo={e.arquivo} />
                          </div>
                        ))}
                        {analise && retornaBotoesAprovacao(2, values)}
                      </div>
                      {(analise || visaoCODAE) &&
                        retornaTextoAprovacao(2, values)}
                    </div>
                  </>
                )}

                {!visaoCODAE && objeto.observacoes && (
                  <>
                    <hr />
                    <div className="row mb-3">
                      <div className="col-12">
                        <TextArea
                          label="Observações"
                          input={{ value: objeto.observacoes }}
                          disabled
                        />
                      </div>
                    </div>
                  </>
                )}

                <hr />

                {analise ? (
                  <>
                    <Botao
                      texto="Enviar para o Fornecedor"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="float-end ms-3"
                      disabled={
                        !validaAprovacoes || Object.keys(errors).length > 0
                      }
                      tooltipExterno={
                        (!validaAprovacoes || Object.keys(errors).length > 0) &&
                        "É necessário avaliar todas as embalagens antes de prosseguir."
                      }
                    />

                    <Botao
                      texto="Cancelar"
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="float-end ms-3"
                      onClick={() => setModalCancelar(true)}
                    />
                  </>
                ) : (
                  <BotaoVoltar
                    onClick={visaoCODAE ? voltarPaginaPainel : voltarPaginaGrid}
                  />
                )}
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
