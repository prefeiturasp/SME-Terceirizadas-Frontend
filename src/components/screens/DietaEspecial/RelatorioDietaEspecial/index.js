import { Spin } from "antd";
import { toastError } from "components/Shareable/Toast/dialogs";
import MeusDadosContext from "context/MeusDadosContext";
import { usuarioEhEmpresaTerceirizada } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import React, { useContext, useState } from "react";
import { Form } from "react-final-form";
import { getSolicitacoesRelatorioDietasEspeciais } from "services/dietaEspecial.service";
import { Filtros } from "./components/Filtros";
import { ListagemDietas } from "./components/ListagemDietas";
import "./styles.scss";

const PAGE_SIZE = 10;

export const RelatorioDietaEspecial = () => {
  const { meusDados } = useContext(MeusDadosContext);

  const [dietasEspeciais, setDietasEspeciais] = useState(null);

  const [erroAPI, setErroAPI] = useState("");
  const [loadingDietas, setLoadingDietas] = useState(false);

  const PARAMS = { limit: PAGE_SIZE, offset: 0 };

  const onSubmit = async values => {
    setLoadingDietas(true);
    let params = {
      ...PARAMS,
      ...values
    };
    if (usuarioEhEmpresaTerceirizada()) {
      params["terceirizada_uuid"] = meusDados.vinculo_atual.instituicao.uuid;
    }
    const response = await getSolicitacoesRelatorioDietasEspeciais(params);
    if (response.status === HTTP_STATUS.OK) {
      setDietasEspeciais(response.data);
    } else {
      toastError(
        "Erro ao carregar dados das dietas especiais. Tente novamente mais tarde."
      );
    }
    setLoadingDietas(false);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        {erroAPI && <div>{erroAPI}</div>}
        {!erroAPI && meusDados && (
          <>
            <Form onSubmit={onSubmit}>
              {({ handleSubmit, values, form }) => (
                <form onSubmit={handleSubmit}>
                  <Spin
                    spinning={loadingDietas}
                    tip="Carregando dietas especiais..."
                  >
                    <Filtros
                      erroAPI={erroAPI}
                      form={form}
                      meusDados={meusDados}
                      values={values}
                      setErroAPI={setErroAPI}
                    />
                    {dietasEspeciais && (
                      <>
                        <div className="row">
                          <div className="total-dietas col-12 text-right">
                            Total de dietas:
                            <div className="numero-total-dietas">
                              {dietasEspeciais.count}
                            </div>
                          </div>
                        </div>

                        <ListagemDietas
                          dietasEspeciais={dietasEspeciais}
                          meusDados={meusDados}
                          setDietasEspeciais={setDietasEspeciais}
                          setLoadingDietas={setLoadingDietas}
                          values={values}
                        />
                      </>
                    )}
                  </Spin>
                </form>
              )}
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
