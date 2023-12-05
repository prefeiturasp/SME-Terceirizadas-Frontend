import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { Field, Form } from "react-final-form";
import SelectSelecione from "components/Shareable/SelectSelecione";
import {
  getListaCompletaProdutosLogistica,
  getNomesMarcas,
  getNomesFabricantes,
} from "services/produto.service";
import { getEnderecoPorCEP } from "services/cep.service";
import { getTerceirizadaUUID } from "services/terceirizada.service";
import { required, email } from "helpers/fieldValidators";
import { Spin, Steps } from "antd";
import {
  FichaTecnicaDetalhada,
  OptionsGenerico,
} from "interfaces/pre_recebimento.interface";
import { CATEGORIA_OPTIONS } from "../../constants";
import InputText from "components/Shareable/Input/InputText";
import MaskedInputText from "components/Shareable/Input/MaskedInputText";
import Collapse from "components/Shareable/Collapse";
import MeusDadosContext from "context/MeusDadosContext";
import { MeusDadosInterfaceOuter } from "context/MeusDadosContext/interfaces";
import { TerceirizadaComEnderecoInterface } from "interfaces/terceirizada.interface";
import createDecorator from "final-form-calculate";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../../Shareable/Botao/constants";
import Botao from "../../../../../Shareable/Botao";
import { cepMask, cnpjMask, telefoneMask } from "constants/shared";
import { FichaTecnicaPayload } from "../../interfaces";
import {
  cadastraRascunhoFichaTecnica,
  editaRascunhoFichaTecnica,
  getFichaTecnica,
} from "services/fichaTecnica.service";
import { exibeError, removeCaracteresEspeciais } from "helpers/utilities";
import {
  toastError,
  toastSuccess,
} from "../../../../../Shareable/Toast/dialogs";
import { getListaFiltradaAutoCompleteSelect } from "../../../../../../helpers/autoCompleteSelect";
import AutoCompleteSelectField from "components/Shareable/AutoCompleteSelectField";
import { ResponseFichaTecnicaDetalhada } from "interfaces/responses.interface";

export default () => {
  const { meusDados } = useContext<MeusDadosInterfaceOuter>(MeusDadosContext);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [produtosOptions, setProdutosOptions] = useState<OptionsGenerico[]>([]);
  const [marcasOptions, setMarcasOptions] = useState<OptionsGenerico[]>([]);
  const [fabricantesOptions, setFabricantesOptions] = useState<
    OptionsGenerico[]
  >([]);
  const [proponente, setProponente] =
    useState<TerceirizadaComEnderecoInterface>(
      {} as TerceirizadaComEnderecoInterface
    );
  const [desabilitaEndereco, setDesabilitaEndereco] = useState(true);
  const [collapse, setCollapse] = useState([]);
  const [ficha, setFicha] = useState<FichaTecnicaDetalhada>({} as FichaTecnicaDetalhada);
  const [initialValues, setInitialValues] = useState<FichaTecnicaPayload>({});

  const onSubmit = (): void => {};

  const carregarProdutos = async () => {
    const response = await getListaCompletaProdutosLogistica();
    setProdutosOptions(response.data.results);
  };

  const carregarMarcas = async () => {
    const response = await getNomesMarcas();
    setMarcasOptions(response.data.results);
  };

  const carregarFabricantes = async () => {
    const response = await getNomesFabricantes();
    setFabricantesOptions(response.data.results);
  };

  const carregarTerceirizada = async () => {
    if (ficha.empresa?.uuid) {
      const response = await getTerceirizadaUUID(ficha.empresa.uuid);
      setProponente(response.data);
    } else if (meusDados) {
      const response = await getTerceirizadaUUID(
        meusDados.vinculo_atual.instituicao.uuid
      );
      setProponente(response.data);
    }
  };

  const cepCalculator = createDecorator({
    field: "cep_fabricante",
    updates: {
      dummy: (minimumValue, allValues) => buscaCEP(minimumValue, allValues),
    },
  });

  const buscaCEP = async (cep: string, values: FichaTecnicaPayload) => {
    if (cep.length === 9) {
      const response = await getEnderecoPorCEP(cep);
      if (response.status === 200 && !response.data.erro) {
        const { data } = response;
        values.bairro_fabricante = data.bairro;
        values.cidade_fabricante = data.localidade;
        values.endereco_fabricante = data.logradouro;
        values.estado_fabricante = data.uf;
        setDesabilitaEndereco(true);
      } else {
        setDesabilitaEndereco(false);
      }
    }
  };

  const geraInitialValues = (ficha: FichaTecnicaDetalhada): void => {
    let iniciais: FichaTecnicaPayload = {
      produto: ficha.produto.nome,
      marca: ficha.marca.uuid,
      categoria: ficha.categoria,
      pregao_chamada_publica: ficha.pregao_chamada_publica,
      fabricante: ficha.fabricante.nome,
      cnpj_fabricante: ficha.cnpj_fabricante,
      cep_fabricante: ficha.cep_fabricante,
      endereco_fabricante: ficha.endereco_fabricante,
      numero_fabricante: ficha.numero_fabricante,
      complemento_fabricante: ficha.complemento_fabricante,
      bairro_fabricante: ficha.bairro_fabricante,
      cidade_fabricante: ficha.cidade_fabricante,
      estado_fabricante: ficha.estado_fabricante,
      email_fabricante: ficha.email_fabricante,
      telefone_fabricante: ficha.telefone_fabricante,
    };
    setInitialValues(iniciais as FichaTecnicaPayload);
  };

  const formataPayload = (values: FichaTecnicaPayload): FichaTecnicaPayload => {
    let payload: FichaTecnicaPayload = {
      produto: produtosOptions.find((p) => p.nome === values.produto)?.uuid,
      marca: values.marca,
      categoria: values.categoria,
      pregao_chamada_publica: values.pregao_chamada_publica,
      empresa: proponente.uuid,
      fabricante:
        fabricantesOptions.find((p) => p.nome === values.fabricante)?.uuid ||
        null,
      cnpj_fabricante: removeCaracteresEspeciais(values.cnpj_fabricante) || "",
      cep_fabricante: removeCaracteresEspeciais(values.cep_fabricante) || "",
      endereco_fabricante: values.endereco_fabricante || "",
      numero_fabricante: values.numero_fabricante || "",
      complemento_fabricante: values.complemento_fabricante || "",
      bairro_fabricante: values.bairro_fabricante || "",
      cidade_fabricante: values.cidade_fabricante || "",
      estado_fabricante: values.estado_fabricante || "",
      email_fabricante: values.email_fabricante || "",
      telefone_fabricante:
        removeCaracteresEspeciais(values.telefone_fabricante) || "",
    };

    return payload;
  };

  const salvarRascunho = async (values: FichaTecnicaPayload) => {
    const payload = formataPayload(values);

    try {
      setCarregando(true);
      let response: ResponseFichaTecnicaDetalhada;
      if (ficha.uuid) {
        response = await editaRascunhoFichaTecnica(payload, ficha.uuid);
      } else {
        response = await cadastraRascunhoFichaTecnica(payload);
      }

      if (response.status === 201 || response.status === 200) {
        toastSuccess("Rascunho salvo com sucesso!");
        setFicha(response.data);
      } else {
        toastError("Ocorreu um erro ao salvar a Ficha Técnica");
      }
    } catch (error) {
      exibeError(error, "Ocorreu um erro ao salvar a Ficha Técnica");
    } finally {
      setCarregando(false);
    }
  };

  const carregarDados = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const response = await getFichaTecnica(uuid);

      const objeto = response.data;
      setFicha(objeto);
      geraInitialValues(objeto);
    }
  };

  useEffect(() => {
    (async () => {
      setCarregando(true);
      await carregarProdutos();
      await carregarMarcas();
      await carregarFabricantes();
      await carregarDados();
      setCarregando(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!proponente.uuid) {
        setCarregando(true);
        await carregarTerceirizada();
        setCarregando(false);
      }
    })();
  }, [meusDados, ficha]);

  const validaRascunho = (values: FichaTecnicaPayload): boolean => {
    return (
      !values.produto ||
      !values.marca ||
      !values.categoria ||
      !values.pregao_chamada_publica
    );
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-cadastro-ficha-tecnica">
        <div className="card-body cadastro-ficha-tecnica">
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            decorators={[cepCalculator]}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="steps">
                  <Steps
                    size="small"
                    current={0}
                    items={[
                      {
                        title: "Identificação do Produto",
                      },
                      {
                        title: "Informações Nutricionais",
                      },
                      {
                        title: "Informações de Acondicionamento",
                      },
                    ]}
                  />
                </div>
                <hr />

                <div className="subtitulo">Identificação do Produto</div>

                <div className="row">
                  <div className="col-6">
                    <Field
                      component={AutoCompleteSelectField}
                      options={getListaFiltradaAutoCompleteSelect(
                        produtosOptions.map((e) => e.nome),
                        values["produto"],
                        true
                      )}
                      label="Produto"
                      name={`produto`}
                      placeholder="Selecione um Produto"
                      className="input-ficha-tecnica"
                      required
                      validate={required}
                      tooltipText={
                        "Caso não localize o produto no seletor, faça o cadastro no botão Cadastrar Produto."
                      }
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={SelectSelecione}
                      naoDesabilitarPrimeiraOpcao
                      options={CATEGORIA_OPTIONS}
                      label="Categoria"
                      name={`categoria`}
                      placeholder="Selecione uma Categoria"
                      className="input-ficha-tecnica"
                      required
                      validate={required}
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={SelectSelecione}
                      naoDesabilitarPrimeiraOpcao
                      options={marcasOptions}
                      label="Marca"
                      name={`marca`}
                      placeholder="Selecione uma Marca"
                      className="input-ficha-tecnica"
                      required
                      validate={required}
                      tooltipText={
                        "Caso não localize a marca no seletor, faça o cadastro no botão Cadastrar Marca."
                      }
                    />
                  </div>
                  <div className="col-6">
                    <Field
                      component={InputText}
                      label="Nº do Pregão/Chamada Pública"
                      name={`pregao_chamada_publica`}
                      placeholder="Nº do Pregão/Chamada Pública"
                      className="input-ficha-tecnica"
                      required
                      validate={required}
                      tooltipText={
                        "Pode ser informado o número do Edital do Pregão Eletrônico ou Chamada Pública referente ao Produto."
                      }
                    />
                  </div>
                </div>
                <hr />

                <Collapse
                  collapse={collapse}
                  setCollapse={setCollapse}
                  titulos={[
                    <span key={0}>
                      Empresa ou Organização{" "}
                      <span className="verde-escuro">Proponente</span>
                    </span>,
                    <span className="font-weight-bold" key={1}>
                      Empresa ou Organização{" "}
                      <span className="verde-escuro">Fabricante</span>
                    </span>,
                  ]}
                  id="collapseFichaTecnica"
                >
                  <section id="formProponente">
                    <div className="row">
                      <div className="col-6">
                        <InputText
                          label="CNPJ"
                          valorInicial={proponente.cnpj}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <InputText
                          label="Nome da Empresa/Organização"
                          valorInicial={proponente.nome_fantasia}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <InputText
                          label="Endereço"
                          valorInicial={proponente.endereco}
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputText
                          label="Nº"
                          valorInicial={proponente.numero}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <InputText
                          label="Complemento"
                          valorInicial={proponente.complemento}
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputText
                          label="Bairro"
                          valorInicial={proponente.bairro}
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputText
                          label="CEP"
                          valorInicial={proponente.cep}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <InputText
                          label="Cidade"
                          valorInicial={proponente.cidade}
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputText
                          label="Estado"
                          valorInicial={proponente.estado}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <InputText
                          label="E-mail"
                          valorInicial={proponente.responsavel_email}
                          required
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputText
                          label="Telefone"
                          valorInicial={proponente.responsavel_telefone}
                          required
                          disabled={true}
                        />
                      </div>
                    </div>
                  </section>

                  <section id="formFabricante">
                    <div className="row">
                      <div className="col-6">
                        <Field
                          component={AutoCompleteSelectField}
                          options={getListaFiltradaAutoCompleteSelect(
                            fabricantesOptions.map((e) => e.nome),
                            values["fabricante"],
                            true
                          )}
                          label="Fabricantes"
                          name={`fabricante`}
                          placeholder="Selecione um Fabricante"
                          className="input-ficha-tecnica"
                          required
                          validate={required}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Field
                          component={MaskedInputText}
                          mask={cnpjMask}
                          label="CNPJ"
                          name={`cnpj_fabricante`}
                          placeholder="Digite o CNPJ"
                          className="input-ficha-tecnica"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <Field
                          component={MaskedInputText}
                          mask={cepMask}
                          label="CEP"
                          name={`cep_fabricante`}
                          placeholder="Digite o CEP"
                          className="input-ficha-tecnica"
                        />
                      </div>
                      <div className="col-8">
                        <Field
                          component={InputText}
                          label="Endereço"
                          name={`endereco_fabricante`}
                          placeholder="Digite o Endereço"
                          className="input-ficha-tecnica"
                          disabled={desabilitaEndereco}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Número"
                          name={`numero_fabricante`}
                          placeholder="Digite o Número"
                          className="input-ficha-tecnica"
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Complemento"
                          name={`complemento_fabricante`}
                          placeholder="Digite o Complemento"
                          className="input-ficha-tecnica"
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Bairro"
                          name={`bairro_fabricante`}
                          placeholder="Digite o Bairro"
                          className="input-ficha-tecnica"
                          disabled={desabilitaEndereco}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <Field
                          component={InputText}
                          label="Cidade"
                          name={`cidade_fabricante`}
                          placeholder="Digite o Cidade"
                          className="input-ficha-tecnica"
                          disabled={desabilitaEndereco}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Estado"
                          name={`estado_fabricante`}
                          placeholder="Digite o Estado"
                          className="input-ficha-tecnica"
                          disabled={desabilitaEndereco}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <Field
                          component={InputText}
                          label="E-mail"
                          name={`email_fabricante`}
                          placeholder="Digite o E-mail"
                          className="input-ficha-tecnica"
                          validate={email}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={MaskedInputText}
                          mask={telefoneMask}
                          label="Telefone"
                          name={`telefone_fabricante`}
                          placeholder="Digite o Telefone"
                          className="input-ficha-tecnica"
                        />
                      </div>
                    </div>
                  </section>
                </Collapse>

                <div className="mt-4 mb-4">
                  <Botao
                    texto="Salvar Rascunho"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="float-right ml-3"
                    onClick={() => salvarRascunho(values)}
                    disabled={validaRascunho(values)}
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
