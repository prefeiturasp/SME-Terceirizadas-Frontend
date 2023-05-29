import {
  usuarioEhAdministradorNutriCODAE,
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEGestaoProduto,
  usuarioEhCODAENutriManifestacao,
  usuarioEhCogestorDRE,
  usuarioEhCoordenadorNutriCODAE,
  usuarioEhEmpresaTerceirizada,
  usuarioEhEscolaTerceirizadaQualquerPerfil,
  usuarioEhNutricionistaSupervisao
} from "helpers/utilities";

export const labelSidebar = nomeEscolaOuTerceirizada => {
  if (usuarioEhCODAEGestaoProduto()) {
    return "Núcleo de Pesquisa e Desenvolvimento";
  } else if (
    usuarioEhCoordenadorNutriCODAE() ||
    usuarioEhAdministradorNutriCODAE()
  ) {
    return "Núcleo Dietas Especiais";
  } else if (usuarioEhCODAEGestaoAlimentacao()) {
    return "Núcleo de Gestão de Terceirizadas";
  } else if (usuarioEhCODAENutriManifestacao()) {
    return "Núcleo de Assessoria";
  } else if (usuarioEhNutricionistaSupervisao()) {
    return "Núcleo de Supervisão da Alimentação Escolar";
  } else if (usuarioEhCogestorDRE()) {
    return "Cogestor de Alimentação Escolar";
  } else if (
    usuarioEhEscolaTerceirizadaQualquerPerfil() ||
    usuarioEhEmpresaTerceirizada()
  ) {
    return nomeEscolaOuTerceirizada;
  }
};
