import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import {
  detalharLayoutEmabalagem,
  corrigirLayoutEmbalagem,
} from "services/layoutEmbalagem.service";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { Field, Form } from "react-final-form";
import BotaoAnexo from "../Detalhar/components/BotaoAnexo";
import InputFile from "components/Shareable/Input/InputFile";
import { DEZ_MB } from "../../../../../../constants/shared";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "../../../../../Shareable/Botao/constants";
import {
  LAYOUT_EMBALAGEM,
  PRE_RECEBIMENTO,
} from "../../../../../../configs/constants";
import { useHistory } from "react-router-dom";
import ModalConfirmar from "./components/ModalConfirmar";
import {
  toastError,
  toastSuccess,
} from "../../../../../Shareable/Toast/dialogs";
import { exibeError } from "../../../../../../helpers/utilities";
import { downloadAndConvertToBase64 } from "../../../../../Shareable/Input/InputFile/helper";

const TITULOS_SECOES_TIPOS_EMBALAGENS = {
  PRIMARIA: "Embalagem Primária",
  SECUNDARIA: "Embalagem Secundária",
  TERCIARIA: "Embalagem Terciária",
};

const FORMATOS_IMAGEM = "PDF, PNG, JPG ou JPEG";

export default () => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(true);
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);

  const [objeto, setObjeto] = useState({});

  const [layoutEmbalagensPrimarias, setLayoutEmbalagensPrimarias] = useState(
    {}
  );
  const [layoutEmbalagensSecundarias, setLayoutEmbalagensSecundarias] =
    useState({});
  const [layoutEmbalagensTerciarias, setLayoutEmbalagensTerciarias] = useState(
    {}
  );

  const [arquivosLayoutsPrimarios, setArquivosLayoutsPrimarios] = useState();
  const [arquivosLayoutsSecundarios, setArquivosLayoutsSecundarios] =
    useState();
  const [arquivosLayoutsTerciarios, setArquivosLayoutsTerciarios] = useState();

  useEffect(() => {
    setCarregando(true);

    carregarDados();

    setCarregando(false);
  }, []);

  const carregarDados = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharLayoutEmabalagem(uuid);

    setObjeto(response.data);

    const tiposDeEmbalagens = response.data.tipos_de_embalagens;

    const layoutEmbalagensPrimarias = tiposDeEmbalagens
      .filter(
        (tipoDeEmbalagem) => tipoDeEmbalagem.tipo_embalagem === "PRIMARIA"
      )
      .pop();

    const layoutEmbalagensSecundarias = tiposDeEmbalagens
      .filter(
        (tipoDeEmbalagem) => tipoDeEmbalagem.tipo_embalagem === "SECUNDARIA"
      )
      .pop();

    const layoutEmbalagensTerciarias = tiposDeEmbalagens
      .filter(
        (tipoDeEmbalagem) => tipoDeEmbalagem.tipo_embalagem === "TERCIARIA"
      )
      .pop();

    setLayoutEmbalagensSecundarias(layoutEmbalagensSecundarias);
    setLayoutEmbalagensPrimarias(layoutEmbalagensPrimarias);
    setLayoutEmbalagensTerciarias(layoutEmbalagensTerciarias);

    setArquivosLayoutsPrimarios(
      obterArquivosTipoDeEmbalagem(layoutEmbalagensPrimarias)
    );

    setArquivosLayoutsSecundarios(
      obterArquivosTipoDeEmbalagem(layoutEmbalagensSecundarias)
    );

    setArquivosLayoutsTerciarios(
      obterArquivosTipoDeEmbalagem(layoutEmbalagensTerciarias)
    );
  };

  const obterArquivosTipoDeEmbalagem = (tipoDeEmbalagem) => {
    const arquivosTipoImagem = [];

    tipoDeEmbalagem.imagens.forEach((imagem) => {
      downloadAndConvertToBase64(imagem.arquivo).then((base64) => {
        arquivosTipoImagem.push({
          nome: imagem.nome,
          base64,
        });
      });
    });

    return arquivosTipoImagem;
  };

  const renderizarSecaoTipoDeEmbalagem = (
    tipoDeEmbalagem,
    arquivosTipoDeLayoutEmbalagem,
    setArquivosLayoutsPrimarios
  ) => {
    return tipoDeEmbalagem.status === "APROVADO"
      ? renderizarSecaoAprovada(tipoDeEmbalagem)
      : arquivosTipoDeLayoutEmbalagem &&
          renderizarSecaoReprovada(
            tipoDeEmbalagem,
            arquivosTipoDeLayoutEmbalagem,
            setArquivosLayoutsPrimarios
          );
  };

  const renderizarSecaoAprovada = (tipoDeEmbalagem) => {
    const [dataEHoraAprovacao, usuarioAprovador] =
      tipoDeEmbalagem.complemento_do_status.split("|");

    return (
      <>
        <div className="subtitulo mb-3">
          {TITULOS_SECOES_TIPOS_EMBALAGENS[tipoDeEmbalagem.tipo_embalagem]}
        </div>

        <div className="row">
          <div className="col-5">
            {tipoDeEmbalagem.imagens.map((e) => (
              <div className="w-75" key={e.arquivo}>
                <BotaoAnexo urlAnexo={e.arquivo} />
              </div>
            ))}
          </div>

          <div className="col-7">
            <div className="subtitulo row ml-5">
              <div className="w-5">
                <i className="fas fa-check mr-2" />
              </div>
              <div className="w-95">
                <div>{dataEHoraAprovacao}</div>
                <div>{usuarioAprovador}</div>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </>
    );
  };

  const renderizarSecaoReprovada = (
    tipoDeEmbalagem,
    arquivosTipoDeLayoutEmbalagem,
    setArquivosTipoDeLayoutEmbalagem
  ) => {
    const dadosCorrecao = tipoDeEmbalagem.complemento_do_status;
    const nomeTipoLayout = tipoDeEmbalagem.tipo_embalagem;

    const setFiles = (arquivos) => {
      setFilesGeral(arquivos, setArquivosTipoDeLayoutEmbalagem);
    };

    const removeFile = (index) => {
      removeFileGeral(
        index,
        arquivosTipoDeLayoutEmbalagem,
        setArquivosTipoDeLayoutEmbalagem
      );
    };

    return (
      <>
        <div className="row">
          <div className="col">
            <div className="subtitulo-laranja mb-3">
              <span className="asterisco">* </span>
              {TITULOS_SECOES_TIPOS_EMBALAGENS[tipoDeEmbalagem.tipo_embalagem]}
            </div>
          </div>
          <div className="col data-hora-correcao">
            Correção Solicitada em:
            <span className="ml-1">
              {objeto.criado_em.replace(" ", " - ").slice(0, 18)}
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <TextArea
              label="Correções Necessárias"
              input={{ value: dadosCorrecao }}
              disabled
            />
          </div>
        </div>

        <div className="row">
          <Field
            component={InputFile}
            arquivosPreCarregados={arquivosTipoDeLayoutEmbalagem}
            className="inputfile"
            texto="Inserir Layout"
            name={`files_${nomeTipoLayout.toLowerCase()}`}
            accept={FORMATOS_IMAGEM}
            setFiles={setFiles}
            removeFile={removeFile}
            toastSuccess={"Imagem incluída com sucesso!"}
            alignLeft
            multiple={true}
            limiteTamanho={DEZ_MB}
          />
          <label className="col-12 label-imagem">
            <span className="red">Campo Obrigatório:&nbsp;</span>
            {"Envie um arquivo nos formatos: " +
              FORMATOS_IMAGEM +
              ", com até 10MB"}
          </label>
        </div>

        <hr />
      </>
    );
  };

  const setFilesGeral = (arquivos, setArquivos) => {
    const arquivosAtualizados = arquivos.map((arquivo) => {
      return {
        nome: arquivo.nome,
        base64: arquivo.arquivo,
      };
    });

    setArquivos(arquivosAtualizados);
  };

  const removeFileGeral = (index, arquivos, setArquivos) => {
    const arquivosAtualizados = [...arquivos];
    arquivosAtualizados.splice(index, 1);

    console.log("ARQUIVOS APOS REMOCAO", arquivosAtualizados);
    setArquivos(arquivosAtualizados);
  };

  const voltarPagina = () =>
    history.push(`/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`);

  const onSubmit = () => {
    setShowModalConfirmar(true);
  };

  const enviarCorrecaoLayoutEmbalagem = async (values) => {
    setCarregando(true);

    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    let payload = formataPayload(values);

    try {
      let response = await corrigirLayoutEmbalagem(uuid, payload);

      if (response.status === 200) {
        setCarregando(false);
        toastSuccess("Correção enviada com sucesso!");
        setShowModalConfirmar(false);
        voltarPagina();
      } else {
        toastError("Ocorreu um erro ao salvar o Layout da Embalagem");
        setCarregando(false);
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar o Layout da Embalagem");
    }
  };

  const formataPayload = (values) => {
    const payload = {};
    payload.observacoes = values.observacoes;

    payload.tipos_de_embalagens = [];

    if (layoutEmbalagensPrimarias.status === "REPROVADO") {
      payload.tipos_de_embalagens.push({
        uuid: layoutEmbalagensPrimarias.uuid,
        tipo_embalagem: layoutEmbalagensPrimarias.tipo_embalagem,
        imagens_do_tipo_de_embalagem: formatarImagensPayload(
          arquivosLayoutsPrimarios
        ),
      });
    }

    if (layoutEmbalagensSecundarias.status === "REPROVADO") {
      payload.tipos_de_embalagens.push({
        uuid: layoutEmbalagensSecundarias.uuid,
        tipo_embalagem: layoutEmbalagensSecundarias.tipo_embalagem,
        imagens_do_tipo_de_embalagem: formatarImagensPayload(
          arquivosLayoutsSecundarios
        ),
      });
    }

    if (layoutEmbalagensTerciarias.status === "REPROVADO") {
      payload.tipos_de_embalagens.push({
        uuid: layoutEmbalagensTerciarias.uuid,
        tipo_embalagem: layoutEmbalagensTerciarias.tipo_embalagem,
        imagens_do_tipo_de_embalagem: formatarImagensPayload(
          arquivosLayoutsTerciarios
        ),
      });
    }

    return payload;
  };

  const formatarImagensPayload = (imagens) => {
    return imagens.map((imagem) => ({
      arquivo: imagem.base64,
      nome: imagem.nome,
    }));
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-corrigir-layout-embalagem">
        <div className="card-body">
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
              <label className="label-dados-produto">Nome do Produto</label>
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
              <span className="valor-dados-produto">{objeto.nome_produto}</span>
            </div>
          </div>

          <hr />

          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <ModalConfirmar
                  show={showModalConfirmar}
                  handleClose={() => setShowModalConfirmar(false)}
                  loading={carregando}
                  handleSim={() => enviarCorrecaoLayoutEmbalagem(values)}
                />

                {renderizarSecaoTipoDeEmbalagem(
                  layoutEmbalagensPrimarias,
                  arquivosLayoutsPrimarios,
                  setArquivosLayoutsPrimarios
                )}

                {renderizarSecaoTipoDeEmbalagem(
                  layoutEmbalagensSecundarias,
                  arquivosLayoutsSecundarios,
                  setArquivosLayoutsSecundarios
                )}

                {renderizarSecaoTipoDeEmbalagem(
                  layoutEmbalagensTerciarias,
                  arquivosLayoutsTerciarios,
                  setArquivosLayoutsTerciarios
                )}

                <div className="row mb-3">
                  <div className="col-12">
                    <Field
                      component={TextArea}
                      label="Observações"
                      name="observacoes"
                    />
                  </div>
                </div>

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Enviar Correção"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="float-right ml-3"
                    disabled={Object.keys(errors).length > 0}
                  />
                  <Botao
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={voltarPagina}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Spin>
  );
};
