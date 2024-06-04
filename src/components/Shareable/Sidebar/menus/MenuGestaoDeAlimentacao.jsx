import React from "react";
import { Menu, SubMenu, LeafItem } from "./shared";
import {
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS,
  SOLICITACOES_COM_QUESTIONAMENTO,
  ESCOLA,
  INCLUSAO_ALIMENTACAO,
  ALTERACAO_TIPO_ALIMENTACAO,
  SOLICITACAO_KIT_LANCHE,
  INVERSAO_CARDAPIO,
  SUSPENSAO_ALIMENTACAO,
  NUTRIMANIFESTACAO,
  NUTRISUPERVISAO,
  TERCEIRIZADA,
  DRE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  CODAE,
  CADASTROS,
  CONSULTA_KITS,
  RELATORIO_SOLICITACOES_ALIMENTACAO,
  USUARIO_RELATORIOS,
} from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAENutriManifestacao,
  usuarioEhDRE,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaTerceirizada,
  usuarioEscolaEhGestaoDireta,
  usuarioEhNutricionistaSupervisao,
  usuarioEhMedicao,
  usuarioEhEscolaTerceirizadaQualquerPerfil,
  usuarioEhCODAEGabinete,
  ehUsuarioRelatorios,
} from "helpers/utilities";

const MenuGestaoDeAlimentacao = ({ activeMenu, onSubmenuClick }) => {
  const exibeMenuNovasSolicitacoes =
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhDRE();
  const exibeMenuConsultaDeSolicitacoes =
    !usuarioEscolaEhGestaoDireta() && !ehUsuarioRelatorios();
  const PERFIL =
    usuarioEhEscolaTerceirizada() || usuarioEhEscolaTerceirizadaDiretor()
      ? ESCOLA
      : usuarioEhDRE()
      ? DRE
      : usuarioEhCODAEGestaoAlimentacao()
      ? CODAE
      : usuarioEhCODAENutriManifestacao() ||
        usuarioEhMedicao() ||
        usuarioEhCODAEGabinete()
      ? NUTRIMANIFESTACAO
      : usuarioEhNutricionistaSupervisao()
      ? NUTRISUPERVISAO
      : ehUsuarioRelatorios()
      ? USUARIO_RELATORIOS
      : TERCEIRIZADA;

  return (
    <Menu
      id="GestaoAlimentacao"
      icon="fa-utensils"
      title={"Gestão de Alimentação"}
    >
      {!ehUsuarioRelatorios() && (
        <LeafItem to="/painel-gestao-alimentacao">
          Painel de Solicitações
        </LeafItem>
      )}
      {exibeMenuNovasSolicitacoes && (
        <SubMenu
          icon="fa-chevron-down"
          path="novas-solicitacoes"
          onClick={onSubmenuClick}
          title="Novas Solicitações"
          activeMenu={activeMenu}
        >
          {!usuarioEhDRE() && (
            <>
              <LeafItem to={`/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`}>
                Inclusão de Alimentação
              </LeafItem>
              <LeafItem to={`/${ESCOLA}/${ALTERACAO_TIPO_ALIMENTACAO}`}>
                Alteração do Tipo de Alimentação
              </LeafItem>
              <LeafItem to={`/${ESCOLA}/${SOLICITACAO_KIT_LANCHE}`}>
                Kit Lanche Passeio
              </LeafItem>
              <LeafItem to={`/${ESCOLA}/${INVERSAO_CARDAPIO}`}>
                Inversão de Dia de Cardápio
              </LeafItem>
              <LeafItem to={`/${ESCOLA}/${SUSPENSAO_ALIMENTACAO}`}>
                Suspensão de Alimentação
              </LeafItem>
            </>
          )}
          {usuarioEhDRE() && (
            <LeafItem to={`/${DRE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`}>
              Solicitação Unificada
            </LeafItem>
          )}
        </SubMenu>
      )}
      {exibeMenuConsultaDeSolicitacoes && (
        <SubMenu
          icon="fa-chevron-down"
          path="consulta-solicitacoes"
          onClick={onSubmenuClick}
          title="Consulta de Solicitações"
          activeMenu={activeMenu}
        >
          {PERFIL === "nutrisupervisao" && (
            <LeafItem to={`/${PERFIL}/${SOLICITACOES_COM_QUESTIONAMENTO}`}>
              Aguardando resposta da empresa
            </LeafItem>
          )}
          {PERFIL === "terceirizada" ? (
            <LeafItem to={`/${PERFIL}/${SOLICITACOES_COM_QUESTIONAMENTO}`}>
              Questionamentos da CODAE
            </LeafItem>
          ) : (
            !usuarioEhCODAENutriManifestacao() &&
            !usuarioEscolaEhGestaoDireta() &&
            !usuarioEhMedicao() &&
            !usuarioEhCODAEGabinete() && (
              <LeafItem to={`/${PERFIL}/${SOLICITACOES_PENDENTES}`}>
                Aguardando autorização
              </LeafItem>
            )
          )}

          <LeafItem to={`/${PERFIL}/${SOLICITACOES_AUTORIZADAS}`}>
            Autorizadas
          </LeafItem>
          <LeafItem to={`/${PERFIL}/${SOLICITACOES_NEGADAS}`}>Negadas</LeafItem>
          <LeafItem to={`/${PERFIL}/${SOLICITACOES_CANCELADAS}`}>
            Canceladas
          </LeafItem>
        </SubMenu>
      )}
      {PERFIL === "terceirizada" && (
        <SubMenu
          icon="fa-chevron-down"
          path="relatorios"
          onClick={onSubmenuClick}
          title="Relatórios"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${RELATORIO_SOLICITACOES_ALIMENTACAO}`}>
            Solicitações de Alimentação
          </LeafItem>
          <LeafItem to={`/relatorio/alunos-matriculados`}>
            Alunos Matriculados
          </LeafItem>
        </SubMenu>
      )}
      {usuarioEhCODAEGestaoAlimentacao() && (
        <SubMenu
          icon="fa-chevron-down"
          path="cadastros"
          onClick={onSubmenuClick}
          title="Cadastros"
          activeMenu={activeMenu}
        >
          <LeafItem to={`/${CODAE}/${CADASTROS}/${CONSULTA_KITS}`}>
            Consulta de Kits
          </LeafItem>
        </SubMenu>
      )}
      {(usuarioEhDRE() ||
        usuarioEhCODAEGestaoAlimentacao() ||
        usuarioEhMedicao() ||
        usuarioEhCODAENutriManifestacao() ||
        usuarioEhNutricionistaSupervisao() ||
        usuarioEhEscolaTerceirizada() ||
        usuarioEhEscolaTerceirizadaDiretor() ||
        usuarioEhCODAEGabinete() ||
        ehUsuarioRelatorios()) && (
        <SubMenu
          icon="fa-chevron-down"
          path="relatorios"
          onClick={onSubmenuClick}
          title="Relatórios"
          activeMenu={activeMenu}
        >
          {!usuarioEhNutricionistaSupervisao() && (
            <LeafItem to={`/${RELATORIO_SOLICITACOES_ALIMENTACAO}`}>
              Solicitações de Alimentação
            </LeafItem>
          )}

          {!usuarioEhEscolaTerceirizadaQualquerPerfil() && (
            <LeafItem to={`/relatorio/alunos-matriculados`}>
              Alunos Matriculados
            </LeafItem>
          )}
        </SubMenu>
      )}
    </Menu>
  );
};

export default MenuGestaoDeAlimentacao;
