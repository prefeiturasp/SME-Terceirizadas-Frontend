import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { DOCUMENTOS_RECEBIMENTO, PRE_RECEBIMENTO } from "configs/constants";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";
import { FluxoDeStatusPreRecebimento } from "components/Shareable/FluxoDeStatusPreRecebimento";
import { detalharDocumentoRecebimento } from "services/documentosRecebimento.service";
import InputText from "components/Shareable/Input/InputText";
import {
  DocumentosRecebimentoDetalhado,
  TiposDocumentos,
} from "interfaces/pre_recebimento.interface";
import ArquivosTipoRecebimento from "../ArquivosTipoDocumento";
import OutrosDocumentos from "../OutrosDocumentos";

export default () => {
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState<DocumentosRecebimentoDetalhado>(
    {} as DocumentosRecebimentoDetalhado
  );
  const [laudo, setLaudo] = useState<TiposDocumentos>();

  const voltarPaginaGrid = () =>
    navigate(`/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`);

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
          {objeto.logs && (
            <div className="row my-4">
              <FluxoDeStatusPreRecebimento listaDeStatus={objeto.logs} />
            </div>
          )}

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
          <ArquivosTipoRecebimento lista={laudo} />

          <hr />

          <OutrosDocumentos documento={objeto} />

          <hr />

          <BotaoVoltar onClick={voltarPaginaGrid} />
        </div>
      </div>
    </Spin>
  );
};
