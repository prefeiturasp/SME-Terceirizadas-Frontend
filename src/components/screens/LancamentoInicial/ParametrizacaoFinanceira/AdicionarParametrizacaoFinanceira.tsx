import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";

import { Skeleton } from "antd";

import { required } from "helpers/fieldValidators";

import { getNumerosEditais } from "services/edital.service";
import { getLotesSimples } from "services/lote.service";
import { getTiposUnidadeEscolar } from "services/cadastroTipoAlimentacao.service";

import { Select } from "components/Shareable/Select";
import { Botao } from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";

type SelectOption = {
  uuid: string | Array<string>;
  nome: string;
};

export default () => {
  const [editais, setEditais] = useState<SelectOption[]>([]);
  const [lotes, setLotes] = useState<SelectOption[]>([]);
  const [tiposUnidades, setTiposUnidades] = useState<SelectOption[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroAPI, setErroAPI] = useState("");

  const navigate = useNavigate();

  const getEditaisAsync = async () => {
    try {
      const { data } = await getNumerosEditais();
      setEditais(
        data.results.map((edital) => ({
          uuid: edital.uuid,
          nome: edital.numero,
        }))
      );
    } catch (error) {
      setErroAPI("Erro ao carregar editais. Tente novamente mais tarde.");
    }
  };

  const getLotesAsync = async () => {
    try {
      const { data } = await getLotesSimples();
      const lotes = data.results;
      const lotesOrdenados = lotes.sort((loteA, loteB) => {
        return loteA.diretoria_regional.nome < loteB.diretoria_regional.nome;
      });
      setLotes(
        [
          {
            uuid: null,
            nome: "Selecione um lote e uma DRE",
          },
        ].concat(
          lotesOrdenados.map((lote) => ({
            uuid: lote.uuid,
            nome: `${lote.nome} - ${lote.diretoria_regional.nome}`,
          }))
        )
      );
    } catch (error) {
      setErroAPI("Erro ao carregar lotes. Tente novamente mais tarde.");
    }
  };

  const getGruposTiposUnidades = (tiposUnidades) => {
    const grupos = [
      ["CEI", "CEI CEU", "CCI"],
      ["CEMEI", "CEU CEMEI"],
      ["EMEF", "CEU EMEF", "EMEFM", "EMEBS", "CIEJA", "CEU GESTAO"],
      ["EMEI", "CEU EMEI"],
    ];

    const getTipoUnidadeUUID = (tipoUnidade) =>
      tiposUnidades.find((t) => t.iniciais.toUpperCase() === tipoUnidade).uuid;

    return grupos.map((grupo) => {
      const uuid = grupo.map(getTipoUnidadeUUID).join(",");
      const nome = grupo.join(", ");
      return {
        uuid,
        nome,
      };
    });
  };

  const getTiposUnidadeEscolarAsync = async () => {
    const response = await getTiposUnidadeEscolar();
    if (response.status === 200) {
      setTiposUnidades(
        [
          {
            uuid: null,
            nome: "Selecione o tipo de unidade",
          },
        ].concat(getGruposTiposUnidades(response.data.results))
      );
    } else {
      setErroAPI(
        "Erro ao carregar tipos de unidades. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    setCarregando(true);
    Promise.all([
      getEditaisAsync(),
      getLotesAsync(),
      getTiposUnidadeEscolarAsync(),
    ]).then(() => {
      setCarregando(false);
    });
  }, []);

  const onSubmit = (values) => {
    // eslint-disable-next-line
    console.log(values);
  };

  return (
    <>
      {erroAPI && <div>{erroAPI}</div>}
      <div className="card">
        <div className="card-body">
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-4">
                    {carregando ? (
                      <Skeleton paragraph={false} active />
                    ) : (
                      <Field
                        component={Select}
                        name="edital"
                        label="Nº do Edital"
                        naoDesabilitarPrimeiraOpcao
                        options={[
                          { uuid: null, nome: "Selecione um edital" },
                        ].concat(editais)}
                        validate={required}
                        required
                      />
                    )}
                  </div>

                  <div className="col-8">
                    {carregando ? (
                      <Skeleton paragraph={false} active />
                    ) : (
                      <Field
                        component={Select}
                        name="lote"
                        label="Lote e DRE"
                        naoDesabilitarPrimeiraOpcao
                        options={lotes}
                        validate={required}
                        required
                      />
                    )}
                  </div>

                  <div className="col-4">
                    {carregando ? (
                      <Skeleton paragraph={false} active />
                    ) : (
                      <Field
                        component={Select}
                        name="tipos_unidades"
                        label="Tipo de Unidade"
                        naoDesabilitarPrimeiraOpcao
                        options={tiposUnidades}
                        validate={required}
                        required
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <Botao
                    texto="Cancelar"
                    onClick={() => {
                      navigate(-1);
                    }}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                  />
                  <Botao
                    texto="Salvar"
                    style={BUTTON_STYLE.GREEN}
                    type={BUTTON_TYPE.SUBMIT}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </>
  );
};
