import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { DOCUMENTOS_RECEBIMENTO, PRE_RECEBIMENTO } from "configs/constants";
import { useHistory } from "react-router-dom";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";
import { detalharDocumentoRecebimento } from "services/documentosRecebimento.service";
import InputText from "components/Shareable/Input/InputText";
import { DocumentosRecebimentoDetalhado } from "interfaces/pre_recebimento.interface";

export default () => {
  const history = useHistory();

  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState<DocumentosRecebimentoDetalhado>(
    {} as DocumentosRecebimentoDetalhado
  );

  const voltarPaginaGrid = () =>
    history.push(`/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`);

  const carregarDados = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharDocumentoRecebimento(uuid);

    const objeto = response.data;

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
      <div className="card mt-3 card-detalhar-layout-embalagem">
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
                component={InputText}
                label="Nº do Cronograma"
                valorInicial={objeto.numero_cronograma}
                required
                disabled={true}
              />
            </div>
            <div className="col-6">
              <InputText
                component={InputText}
                label="Nº do Pregão/Chamada Pública"
                valorInicial={objeto.pregao_chamada_publica}
                required
                disabled={true}
              />
            </div>
            <div className="col-6">
              <InputText
                component={InputText}
                label="Nome do Produto"
                valorInicial={objeto.nome_produto}
                required
                disabled={true}
              />
            </div>
            <div className="col-6">
              <InputText
                component={InputText}
                label="Nº do Laudo"
                valorInicial={objeto.numero_laudo}
                required
                disabled={true}
              />
            </div>
          </div>

          <hr />

          <BotaoVoltar onClick={voltarPaginaGrid} />
        </div>
      </div>
    </Spin>
  );
};
