import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import CardLogo from "components/Shareable/CardLogo/CardLogo";
import IconeGestaoDeAlimentacao from "components/Shareable/Icones/IconeGestaoDeAlimentacao";
import IconeGestaoDeProduto from "components/Shareable/Icones/IconeGestaoDeProduto";
import IconeDietaEspecial from "components/Shareable/Icones/IconeDietaEspecial";
import IconeAbastecimento from "components/Shareable/Icones/IconeAbastecimento";
import IconeMedicaoInicial from "components/Shareable/Icones/IconeMedicaoInicial";
import {
  usuarioEhEmpresaTerceirizada,
  usuarioEhQualquerCODAE,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhDRE,
  usuarioEhMedicao,
  usuarioEhNutricionistaSupervisao,
  usuarioEhEscolaAbastecimento,
  exibirGA,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaAbastecimentoDiretor,
  exibirModuloMedicaoInicial,
  usuarioEhOrgaoFiscalizador,
  usuarioEscolaEhGestaoDireta,
  usuarioEscolaEhGestaoParceira,
  usuarioEhCODAEGabinete,
} from "helpers/utilities";
import { ACOMPANHAMENTO_DE_LANCAMENTOS } from "configs/constants";
import { ENVIRONMENT } from "constants/config";

const PainelInicial = () => {
  const navigate = useNavigate();

  const exibeMenuValidandoAmbiente = exibirGA();

  const usuarioEscolaEhGestaoDiretaParceira =
    (usuarioEscolaEhGestaoDireta() || usuarioEscolaEhGestaoParceira()) &&
    !["production"].includes(ENVIRONMENT);

  return (
    <Row className="mt-3" gutter={[16, 16]}>
      {exibeMenuValidandoAmbiente &&
        (usuarioEhCODAEGestaoAlimentacao() ||
          usuarioEhCODAENutriManifestacao() ||
          usuarioEhEmpresaTerceirizada() ||
          usuarioEhDRE() ||
          usuarioEhMedicao() ||
          usuarioEhNutricionistaSupervisao() ||
          usuarioEhEscolaTerceirizadaDiretor() ||
          usuarioEhEscolaTerceirizada() ||
          usuarioEhCODAEGabinete()) && (
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <CardLogo
              titulo={"Gestão de Alimentação"}
              onClick={() => navigate("/painel-gestao-alimentacao")}
            >
              <IconeGestaoDeAlimentacao />
            </CardLogo>
          </Col>
        )}
      {(usuarioEhCODAEGestaoAlimentacao() ||
        usuarioEhCODAENutriManifestacao() ||
        usuarioEhCODAEDietaEspecial() ||
        usuarioEhMedicao() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhEmpresaTerceirizada() ||
        usuarioEhDRE() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhEscolaTerceirizada() ||
        usuarioEhCODAEGabinete() ||
        usuarioEscolaEhGestaoDiretaParceira) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Dieta Especial"}
            onClick={() => navigate("/painel-dieta-especial")}
          >
            <IconeDietaEspecial />
          </CardLogo>
        </Col>
      )}
      {(usuarioEhQualquerCODAE() ||
        usuarioEhCODAENutriManifestacao() ||
        usuarioEhEmpresaTerceirizada() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhDRE() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhEscolaTerceirizada() ||
        usuarioEhOrgaoFiscalizador() ||
        usuarioEhCODAEGabinete()) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Gestão de Produto"}
            onClick={() => navigate("/painel-gestao-produto")}
          >
            <IconeGestaoDeProduto />
          </CardLogo>
        </Col>
      )}
      {exibirModuloMedicaoInicial() && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Medição Inicial"}
            onClick={() => {
              (usuarioEhEscolaTerceirizada() ||
                usuarioEhEscolaTerceirizadaDiretor()) &&
                navigate("/lancamento-inicial/lancamento-medicao-inicial");
              (usuarioEhDRE() ||
                usuarioEhMedicao() ||
                usuarioEhCODAEGestaoAlimentacao() ||
                usuarioEhCODAENutriManifestacao() ||
                usuarioEhCODAEGabinete()) &&
                navigate(`/medicao-inicial/${ACOMPANHAMENTO_DE_LANCAMENTOS}`);
            }}
          >
            <IconeMedicaoInicial />
          </CardLogo>
        </Col>
      )}
      {usuarioEhDRE() && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Abastecimento"}
            onClick={() => navigate("/logistica/entregas-dre")}
          >
            <IconeAbastecimento />
          </CardLogo>
        </Col>
      )}
      {(usuarioEhEscolaAbastecimento() ||
        usuarioEhEscolaAbastecimentoDiretor()) && (
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <CardLogo
            titulo={"Abastecimento"}
            onClick={() => navigate("/logistica/conferir-entrega")}
          >
            <IconeAbastecimento />
          </CardLogo>
        </Col>
      )}
    </Row>
  );
};

export default PainelInicial;
