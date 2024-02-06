import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import Label from "components/Shareable/Label";
import { Spin } from "antd";
import InputText from "components/Shareable/Input/InputText";
import Collapse, { CollapseControl } from "components/Shareable/Collapse";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { FichaTecnicaDetalhada } from "interfaces/pre_recebimento.interface";

import { carregarDadosAnalise } from "../../helpers";
import "./styles.scss";
import FormPereciveis from "../Cadastrar/components/FormPereciveis";
import FormNaoPereciveis from "../Cadastrar/components/FormNaoPereciveis";
import { InformacaoNutricional } from "interfaces/produto.interface";
import { TerceirizadaComEnderecoInterface } from "interfaces/terceirizada.interface";
import FormProponente from "../Cadastrar/components/FormProponente";
import TabelaNutricional from "components/Shareable/TabelaNutricional";
import CheckboxComBorda from "components/Shareable/CheckboxComBorda";
import BotaoAnexo from "components/PreRecebimento/BotaoAnexo";

export default () => {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [collapse, setCollapse] = useState<CollapseControl>({});
  const [ficha, setFicha] = useState<FichaTecnicaDetalhada>(
    {} as FichaTecnicaDetalhada
  );
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const listaCompletaInformacoesNutricionais = useRef<InformacaoNutricional[]>(
    []
  );
  const listaInformacoesNutricionaisFichaTecnica = useRef<
    InformacaoNutricional[]
  >([]);
  const [proponente, setProponente] =
    useState<TerceirizadaComEnderecoInterface>(
      {} as TerceirizadaComEnderecoInterface
    );

  useEffect(() => {
    (async () => {
      await carregarDadosAnalise(
        listaCompletaInformacoesNutricionais,
        listaInformacoesNutricionaisFichaTecnica,
        setFicha,
        setInitialValues,
        setProponente,
        setCarregando
      );
    })();
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      {/* TODO: renomear css e deletar classes inuteis */}
      <div className="card mt-3 card-cadastro-ficha-tecnica">
        <div className="card-body cadastro-ficha-tecnica">
          <Form
            onSubmit={() => {}}
            initialValues={initialValues}
            render={({ handleSubmit, values }) => {
              const ehPerecivel = values["categoria"] === "PERECIVEIS";
              const ehNaoPerecivel = values["categoria"] === "NAO_PERECIVEIS";
              return (
                <form onSubmit={handleSubmit}>
                  <div className="subtitulo">Identificação do Produto</div>

                  <div className="row mt-4">
                    <div className="col-8">
                      <Field
                        component={InputText}
                        label="Produto"
                        name={`produto`}
                        className="input-ficha-tecnica"
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        label="Categoria"
                        name={`categoria`}
                        className="input-ficha-tecnica"
                        disabled
                      />
                    </div>
                    <div className="col-8">
                      <Field
                        component={InputText}
                        naoDesabilitarPrimeiraOpcao
                        label="Marca"
                        name={`marca`}
                        className="input-ficha-tecnica"
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        component={InputText}
                        label="Nº do Pregão/Chamada Pública"
                        name={`pregao_chamada_publica`}
                        className="input-ficha-tecnica"
                        disabled
                      />
                    </div>
                  </div>

                  <hr />

                  <Collapse
                    collapse={collapse}
                    setCollapse={setCollapse}
                    // titulos={[
                    //   <span className="verde-escuro" key={0}>
                    //     Proponente e Fabricante
                    //   </span>,
                    //   <span className="verde-escuro" key={1}>
                    //     Detalhes do Produto
                    //   </span>,
                    //   <span className="verde-escuro" key={2}>
                    //     Informações Nutricionais
                    //   </span>,
                    //   <span className="verde-escuro" key={3}>
                    //     Conservação
                    //   </span>,
                    //   <span className="verde-escuro" key={4}>
                    //     Temperatura e Transporte
                    //   </span>,
                    //   <span className="verde-escuro" key={5}>
                    //     Armazenamento
                    //   </span>,
                    //   <span className="verde-escuro" key={6}>
                    //     Embalagem e Rotulagem
                    //   </span>,
                    //   <span className="verde-escuro" key={7}>
                    //     Responsável Técnico e Anexos
                    //   </span>,
                    //   <span className="verde-escuro" key={8}>
                    //     Modo de Preparo
                    //   </span>,
                    //   <span className="verde-escuro" key={9}>
                    //     Outras Informações
                    //   </span>,
                    // ]}
                    collapseConfigs={[
                      {
                        titulo: (
                          <span className="verde-escuro">
                            Proponente e Fabricante
                          </span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">
                            Detalhes do Produto
                          </span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">
                            Informações Nutricionais
                          </span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">Conservação</span>
                        ),
                        camposObrigatorios: false,
                      },
                      ...(ehPerecivel
                        ? [
                            {
                              titulo: (
                                <span className="verde-escuro">
                                  Temperatura e Transporte
                                </span>
                              ),
                              camposObrigatorios: false,
                            },
                          ]
                        : []),
                      {
                        titulo: (
                          <span className="verde-escuro">Armazenamento</span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">
                            Embalagem e Rotulagem
                          </span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">
                            Responsável Técnico e Anexos
                          </span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">Modo de Preparo</span>
                        ),
                        camposObrigatorios: false,
                      },
                      {
                        titulo: (
                          <span className="verde-escuro">
                            Outras Informações
                          </span>
                        ),
                        camposObrigatorios: false,
                      },
                    ]}
                    id="collapseAnalisarFichaTecnica"
                  >
                    <section id="proponenteFabricante">
                      <FormProponente proponente={proponente} />
                      <hr />
                      <div className="row">
                        <div className="col-8">
                          <Field
                            component={InputText}
                            label="Fabricantes"
                            name={`fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            component={InputText}
                            label="CNPJ"
                            name={`cnpj_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="CEP"
                            name={`cep_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-8">
                          <Field
                            component={InputText}
                            label="Endereço"
                            name={`endereco_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Número"
                            name={`numero_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Complemento"
                            name={`complemento_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Bairro"
                            name={`bairro_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <Field
                            component={InputText}
                            label="Cidade"
                            name={`cidade_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Estado"
                            name={`estado_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <Field
                            component={InputText}
                            label="E-mail"
                            name={`email_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Telefone"
                            name={`telefone_fabricante`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                    </section>

                    <section id="detalhesProduto">
                      {ehPerecivel && (
                        <FormPereciveis values={values} desabilitar={true} />
                      )}
                      {ehNaoPerecivel && (
                        <FormNaoPereciveis values={values} desabilitar={true} />
                      )}
                    </section>

                    <section id="informacoesNutricionais">
                      <div className="row">
                        <div className="col-6">
                          <Label content="Porção" required />
                        </div>
                        <div className="col-6">
                          <Label content="Unidade Caseira" required />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-3">
                          <Field
                            component={InputText}
                            name={`porcao`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-3">
                          <Field
                            component={InputText}
                            name={`unidade_medida_porcao`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-3">
                          <Field
                            component={InputText}
                            name={`valor_unidade_caseira`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-3">
                          <Field
                            component={InputText}
                            name={`unidade_medida_caseira`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <TabelaNutricional
                        values={values}
                        listaCompletaInformacoesNutricionais={
                          listaCompletaInformacoesNutricionais.current
                        }
                        informacoesNutricionaisCarregadas={
                          listaInformacoesNutricionaisFichaTecnica.current
                        }
                        desabilitar={true}
                      />
                    </section>

                    <section id="conservacao">
                      {ehPerecivel && (
                        <div className="row">
                          <div className="col">
                            <Field
                              component={InputText}
                              label="Prazo de Validade após o descongelamento e mantido sob refrigeração:"
                              name={`prazo_validade_descongelamento`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>
                        </div>
                      )}
                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Condições de conservação e Prazo máximo para consumo após a abertura da embalagem primária:"
                            name={`condicoes_de_conservacao`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                    </section>

                    {ehPerecivel && (
                      <section id="temperaturaTransporte">
                        <div className="row">
                          <div className="col-5">
                            <Field
                              component={InputText}
                              label="Temperatura de Congelamento do Produto:"
                              name={`temperatura_congelamento`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>
                          <div className="col-1 label-unidade-medida label-unidade-medida-bottom">
                            <span>ºC</span>
                          </div>
                          <div className="col-5">
                            <Field
                              component={InputText}
                              label="Temperatura Interna do Veículo para Transporte:"
                              name={`temperatura_veiculo`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>
                          <div className="col-1 label-unidade-medida label-unidade-medida-bottom">
                            <span>ºC</span>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col">
                            <Field
                              component={TextArea}
                              label="Condições de Transporte:"
                              name={`condicoes_de_transporte`}
                              className="textarea-ficha-tecnica"
                              disabled
                            />
                          </div>
                        </div>
                      </section>
                    )}

                    <section id="armazenamento">
                      <div className="row">
                        <div className="col">
                          Informações que constarão da rotulagem das embalagens
                          primária e secundária, fechadas.
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Embalagem Primária:"
                            name={`embalagem_primaria`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Embalagem Secundária:"
                            name={`embalagem_secundaria`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                    </section>

                    <section id="embalagemRotulagem">
                      <div className="subtitulo">Embalagem</div>

                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            name={`embalagens_de_acordo_com_anexo`}
                            component={CheckboxComBorda}
                            label="Declaro que as embalagens primária e secundária em que
                            serão entregues o produto estarão de acordo com as
                            especificações do Anexo I do Edital."
                            disabled
                          />
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Descreva o material de embalagem primária:"
                            name={`material_embalagem_primaria`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>

                      {ehNaoPerecivel && (
                        <div className="row mt-3">
                          <div className="col-6 px-0">
                            <div className="row">
                              <Label content="O produto é líquido?" disabled />
                            </div>

                            <div className="row">
                              <div className="col-2">
                                <label className="container-radio">
                                  Não
                                  <Field
                                    component="input"
                                    type="radio"
                                    value="0"
                                    name={`produto_eh_liquido`}
                                    disabled
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="col-2">
                                <label className="container-radio">
                                  Sim
                                  <Field
                                    component="input"
                                    type="radio"
                                    value="1"
                                    name={`produto_eh_liquido`}
                                    disabled
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>

                          {values.produto_eh_liquido === "1" && (
                            <div className="col-6 px-0">
                              <div className="row">
                                <Label content="Volume do Produto na Embalagem Primária:" />
                              </div>
                              <div className="row">
                                <div className="col">
                                  <Field
                                    component={InputText}
                                    name={`volume_embalagem_primaria`}
                                    className="input-ficha-tecnica"
                                    disabled
                                  />
                                </div>

                                <div className="col">
                                  <Field
                                    component={InputText}
                                    naoDesabilitarPrimeiraOpcao
                                    name={`unidade_medida_volume_primaria`}
                                    className="input-ficha-tecnica"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="row mt-3">
                        <div className="row">
                          <div className="col-6">
                            <Label content="Peso Líquido do Produto na Embalagem Primária:" />
                          </div>

                          <div className="col-6">
                            <Label content="Peso Líquido do Produto na Embalagem Secundária:" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`peso_liquido_embalagem_primaria`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>

                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`unidade_medida_primaria`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>

                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`peso_liquido_embalagem_secundaria`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>

                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`unidade_medida_secundaria`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="row">
                          <div className="col-6">
                            <Label content="Peso da Embalagem Primária Vazia:" />
                          </div>

                          <div className="col-6">
                            <Label content="Peso da Embalagem Secundária Vazia:" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`peso_embalagem_primaria_vazia`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>

                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`unidade_medida_primaria_vazia`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>

                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`peso_embalagem_secundaria_vazia`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>

                          <div className="col-3">
                            <Field
                              component={InputText}
                              name={`unidade_medida_secundaria_vazia`}
                              className="input-ficha-tecnica"
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      {ehPerecivel && (
                        <div className="row mt-3">
                          <div className="row">
                            <div className="col-6">
                              <Label
                                content="Variação Porcentual do Peso do Produto ao Descongelar:"
                                disabled
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-2">
                              <Field
                                component={InputText}
                                name={`variacao_percentual`}
                                className="input-ficha-tecnica"
                                disabled
                              />
                            </div>

                            <div className="col-1 label-unidade-medida label-unidade-medida-top">
                              <span>%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Descrever o Sistema de Vedação da Embalagem Secundária:"
                            name={`sistema_vedacao_embalagem_secundaria`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>

                      <hr />

                      <div className="subtitulo">Rotulagem</div>

                      <div className="row mt-3">
                        <div className="col">
                          <Field
                            name={`rotulo_legivel`}
                            component={CheckboxComBorda}
                            label="Declaro que no rótulo da embalagem primária e, se for o
                            caso, da secundária, constarão, de forma legível e indelével,
                            todas as informações solicitadas do Anexo I do Edital."
                            disabled
                          />
                        </div>
                      </div>
                    </section>

                    <section id="responsavelTecnico">
                      <div className="row">
                        <div className="col">
                          <Field
                            component={InputText}
                            label="Nome completo do Responsável Técnico:"
                            name={`nome_responsavel_tecnico`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <Field
                            component={InputText}
                            label="Habilitação:"
                            name={`habilitacao`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            component={InputText}
                            label="Nº do Registro em Órgão Competente:"
                            name={`numero_registro_orgao`}
                            className="input-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-4">
                          <BotaoAnexo urlAnexo={ficha.arquivo} />
                        </div>
                      </div>
                    </section>

                    <section id="modoPreparo">
                      <div className="row">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Descreva o modo de preparo do produto:"
                            name={`modo_de_preparo`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                    </section>

                    <section id="outrasInformacoes">
                      <div className="row">
                        <div className="col">
                          <Field
                            component={TextArea}
                            label="Informações Adicionais:"
                            name={`informacoes_adicionais`}
                            className="textarea-ficha-tecnica"
                            disabled
                          />
                        </div>
                      </div>
                    </section>
                  </Collapse>
                </form>
              );
            }}
          />
        </div>
      </div>
    </Spin>
  );
};
