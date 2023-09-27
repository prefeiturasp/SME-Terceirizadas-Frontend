import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { LAYOUT_EMBALAGEM, PRE_RECEBIMENTO } from "configs/constants";
import { useHistory } from "react-router-dom";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";
import { detalharLayoutEmabalagem } from "services/layoutEmbalagem.service";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import BotaoAnexo from "./components/BotaoAnexo";

export default () => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState({});
  const [embalagemPrimaria, setEmbalagemPrimaria] = useState([]);
  const [embalagemSecundaria, setEmbalagemSecundaria] = useState([]);
  const [embalagemTerciaria, setEmbalagemTerciaria] = useState([]);

  const voltarPagina = () =>
    history.push(`/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`);

  const carregarDados = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharLayoutEmabalagem(uuid);

    setObjeto(response.data);
    setEmbalagemPrimaria(obterImagensEmbalagem(response, "PRIMARIA"));
    setEmbalagemSecundaria(obterImagensEmbalagem(response, "SECUNDARIA"));
    setEmbalagemTerciaria(obterImagensEmbalagem(response, "TERCIARIA"));
  };

  const obterImagensEmbalagem = (response, tipo_embalagem) => {
    return response.data.tipos_de_embalagens
      .filter((e) => e.tipo_embalagem === tipo_embalagem)
      .map((e) => e.imagens)
      .flat();
  };

  useEffect(() => {
    setCarregando(true);

    carregarDados();

    setCarregando(false);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-detalhar-layout-embalagem">
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

          <div className="subtitulo mb-3">Embalagem Primária</div>
          <div className="row">
            <div className="col-4">
              {embalagemPrimaria.map((e) => (
                <BotaoAnexo key={e.arquivo} urlAnexo={e.arquivo} />
              ))}
            </div>
          </div>

          <hr />

          <div className="subtitulo mb-3">Embalagem Secundária</div>
          <div className="row">
            <div className="col-4">
              {embalagemSecundaria.map((e) => (
                <BotaoAnexo key={e.arquivo} urlAnexo={e.arquivo} />
              ))}
            </div>
          </div>

          {embalagemTerciaria.length > 0 && (
            <>
              <hr />

              <div className="subtitulo mb-3">Embalagem Terciária</div>
              <div className="row">
                <div className="col-4">
                  {embalagemTerciaria.map((e) => (
                    <BotaoAnexo key={e.arquivo} urlAnexo={e.arquivo} />
                  ))}
                </div>
              </div>
            </>
          )}

          {objeto.observacoes && (
            <>
              <hr />
              <div className="row mb-3">
                <div className="col-12">
                  <label className="label-dados-produto mb-2">
                    Observações
                  </label>
                  <TextArea input={{ value: objeto.observacoes }} disabled />
                </div>
              </div>
            </>
          )}

          <BotaoVoltar onClick={voltarPagina} />
        </div>
      </div>
    </Spin>
  );
};
