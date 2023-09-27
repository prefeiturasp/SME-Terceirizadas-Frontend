import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "./styles.scss";
import { LAYOUT_EMBALAGEM, PRE_RECEBIMENTO } from "configs/constants";
import { useHistory } from "react-router-dom";
import BotaoVoltar from "components/Shareable/Page/BotaoVoltar";
import { detalharLayoutEmabalagem } from "services/layoutEmbalagem.service";
import { TextArea } from "components/Shareable/TextArea/TextArea";

export default () => {
  const history = useHistory();
  const [carregando, setCarregando] = useState(true);
  const [objeto, setObjeto] = useState({});
  // const [primaria, setPrimaria] = useState([]);
  // const [secundaria, setSecundaria] = useState([]);
  // const [terciaria, setTerciaria] = useState([]);

  const voltarPagina = () =>
    history.push(`/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`);

  const buscarObjeto = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const response = await detalharLayoutEmabalagem(uuid);

    console.log("RESPONSE", response);

    setObjeto(response.data);

    console.log("OBJETO", objeto);
  };

  useEffect(() => {
    setCarregando(true);

    buscarObjeto();

    setCarregando(false);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-layout-embalagem">
        <div className="card-body">
          <div className="subtitulo">Dados do Produto</div>
          <div className="row">
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

          <div className="subtitulo">Embalagem Primária</div>
          <div className="row">
            <div className="col-12">
              <article>Visualizar Anexo</article>
            </div>
          </div>

          <hr />

          <div className="subtitulo">Embalagem Secundária</div>
          <div className="row">
            <div className="col-12">
              <article>Visualizar Anexo</article>
            </div>
          </div>

          <hr />

          <div className="subtitulo">Embalagem Terciária</div>
          <div className="row">
            <div className="col-12">
              <article>Visualizar Anexo</article>
            </div>
          </div>

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
