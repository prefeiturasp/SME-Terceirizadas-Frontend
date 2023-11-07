import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { DOCUMENTOS_RECEBIMENTO, PRE_RECEBIMENTO } from "configs/constants";
import { useHistory } from "react-router-dom";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";
import { detalharDocumentoRecebimento } from "services/documentosRecebimento.service";
import InputText from "components/Shareable/Input/InputText";
import {
  DocumentosRecebimentoDetalhado,
  TiposDocumentoChoices,
  TiposDocumentos,
} from "interfaces/pre_recebimento.interface";
import BotaoAnexo from "components/PreRecebimento/BotaoAnexo";
import { OUTROS_DOCUMENTOS_OPTIONS } from "../../constants";

export default () => {
  const history = useHistory();

  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState<DocumentosRecebimentoDetalhado>(
    {} as DocumentosRecebimentoDetalhado
  );
  const [laudo, setLaudo] = useState<TiposDocumentos>();

  const voltarPaginaGrid = () =>
    history.push(`/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`);

  const carregarDados = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharDocumentoRecebimento(uuid);

    const objeto = response.data;

    const laudoIndex = objeto.tipos_de_documentos.findIndex(
      (tipo) => tipo.tipo_documento === "LAUDO"
    );
    const laudo = objeto.tipos_de_documentos.splice(laudoIndex, 1)[0];

    setLaudo(laudo);
    setObjeto(objeto);
  };

  const retornaTextoTipoDocumento = (
    tipoDocumento: TiposDocumentoChoices
  ): string => {
    return OUTROS_DOCUMENTOS_OPTIONS.find((x) => x.value === tipoDocumento)
      .label;
  };

  const renderizaArquivos = (lista: TiposDocumentos) => {
    return lista?.arquivos.map((arquivo, index) => {
      return (
        <div className="row mt-2" key={index}>
          <div className="col-4">
            <BotaoAnexo urlAnexo={arquivo.arquivo} />
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    (async () => {
      setCarregando(true);
      await carregarDados();
      setCarregando(false);
    })();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-detalhar-documentos-recebimento">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              Data da Criação:
              <span className="green-bold"> {objeto.criado_em}</span>
            </div>

            <div className="col-6">
              Status:
              <span className="green-bold"> {objeto.status}</span>
            </div>
          </div>

          <hr />

          <div className="subtitulo">Dados do Laudo</div>
          <div className="row">
            <div className="col-6">
              <InputText
                label="Nº do Cronograma"
                valorInicial={objeto.numero_cronograma}
                required
                disabled={true}
              />
            </div>
            <div className="col-6">
              <InputText
                label="Nº do Pregão/Chamada Pública"
                valorInicial={objeto.pregao_chamada_publica}
                required
                disabled={true}
              />
            </div>
            <div className="col-6">
              <InputText
                label="Nome do Produto"
                valorInicial={objeto.nome_produto}
                required
                disabled={true}
              />
            </div>
            <div className="col-6">
              <InputText
                label="Nº do Laudo"
                valorInicial={objeto.numero_laudo}
                required
                disabled={true}
              />
            </div>
          </div>
          {renderizaArquivos(laudo)}

          <hr />

          <div className="subtitulo">Outros Documentos</div>

          <ul className="secao-tipo-documento">
            {objeto.tipos_de_documentos?.map((tipo, index) => (
              <li key={index}>
                <div className="subtitulo-documento">
                  {retornaTextoTipoDocumento(tipo.tipo_documento)}
                </div>
                {tipo.tipo_documento === "OUTROS" && (
                  <InputText
                    label="Descrição do documento"
                    valorInicial={tipo.descricao_documento}
                    required
                    disabled={true}
                  />
                )}
                {renderizaArquivos(tipo)}
              </li>
            ))}
          </ul>

          <hr />

          <BotaoVoltar onClick={voltarPaginaGrid} />
        </div>
      </div>
    </Spin>
  );
};
