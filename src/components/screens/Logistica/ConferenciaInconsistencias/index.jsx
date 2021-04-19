import React, { useEffect, useState } from "react";
import {
  getGuiasInconsistencias,
  vinculaGuiasComEscolas
} from "../../../../services/logistica.service.js";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import "./styles.scss";

export default () => {
  const [carregando, setCarregando] = useState(false);
  const [guias, setGuias] = useState([]);

  const buscarGuias = async () => {
    setCarregando(true);
    const response = await getGuiasInconsistencias();
    if (response.data.results) {
      setGuias(response.data.results);
    } else {
      setGuias([]);
    }
    setCarregando(false);
  };

  const vincularGuias = async () => {
    const res = await vinculaGuiasComEscolas();
    try {
      if (res.status === 200) {
        toastSuccess(res.data.message);
        buscarGuias();
      } else {
        toastError("Houve um erro ao vincular as guias.");
      }
    } catch (e) {
      toastError("Houve um erro ao vincular as guias.");
    }
  };

  useEffect(() => {
    buscarGuias(1);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-gestao-solicitacao-alteracao">
        <div className="card-body gestao-solicitacao-alteracao">
          <section className="guias-inconsistencias">
            <header>Guias de Remessas com Inconsistências</header>
            <article>
              <div className="grid-table header-table">
                <div>Nº da Guia de Remessa</div>
                <div>Código CODAE</div>
                <div>Nome da Unidade Educacional</div>
              </div>
              {guias.map(guia => {
                const bordas = "desativar-borda";
                return (
                  <>
                    <div className="grid-table body-table">
                      <div className={`${bordas}`}>{guia.numero_guia}</div>
                      <div className={`${bordas}`}>{guia.codigo_unidade}</div>
                      <div className={`${bordas}`}>{guia.nome_unidade}</div>
                    </div>
                  </>
                );
              })}
            </article>
          </section>
        </div>
        <div className="button-container">
          <Botao
            texto="Vincular"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="float-right ml-3"
            onClick={() => {
              vincularGuias();
            }}
          />
        </div>
      </div>
    </Spin>
  );
};
