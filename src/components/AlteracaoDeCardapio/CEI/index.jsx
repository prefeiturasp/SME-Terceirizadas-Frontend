import CardMatriculados from "components/Shareable/CardMatriculados";
import HTTP_STATUS from "http-status-codes";
import React, { useState } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { getRascunhosAlteracaoTipoAlimentacao } from "services/alteracaoDeCardapio";
import { TIPO_SOLICITACAO } from "constants/shared";
import { Rascunhos } from "../Rascunhos";

export const AlteracaoDoTipoDeAlimentacaoCEI = ({ ...props }) => {
  const { meusDados } = props;

  const [rascunhos, setRascunhos] = useState([]);
  const [erroAPI, setErroAPI] = useState("");

  const getRascunhos = async () => {
    const response = await getRascunhosAlteracaoTipoAlimentacao(
      TIPO_SOLICITACAO.SOLICITACAO_CEI
    );
    if (response.status === HTTP_STATUS.OK) {
      setRascunhos(response.data.results);
    } else {
      setErroAPI("Erro ao carregar rascunhos");
    }
  };

  useEffect(() => {
    getRascunhos();
  }, []);

  const onSubmit = () => {};

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      {!erroAPI && (
        <div className="mt-3">
          <CardMatriculados
            meusDados={meusDados}
            numeroAlunos={meusDados.vinculo_atual.instituicao.quantidade_alunos}
          />
          {rascunhos.length > 0 && (
            <section className="mt-3">
              <span className="page-title">Rascunhos</span>
              <Rascunhos
                alteracaoCardapioList={rascunhos}
                OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                resetForm={event => this.resetForm(event)}
                OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
              />
            </section>
          )}
          <div className="card mt-3">
            <div className="card-body">
              <Form onSubmit={onSubmit}>
                {({ handleSubmit, form }) => (
                  <form onSubmit={handleSubmit}>
                    <Field component={"input"} type="hidden" name="uuid" />
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
