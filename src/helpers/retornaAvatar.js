import { AvatarCODAE } from "components/Shareable/Avatar/AvatarCODAE";
import { AvatarDistribuidor } from "components/Shareable/Avatar/AvatarDistribuidor";
import { AvatarDRE } from "components/Shareable/Avatar/AvatarDRE";
import { AvatarEscola } from "components/Shareable/Avatar/AvatarEscola";
import { AvatarTerceirizada } from "components/Shareable/Avatar/AvatarTerceirizada";
import React from "react";
import {
  usuarioEhDistribuidora,
  usuarioEhDRE,
  usuarioEhEscolaTerceirizada,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhEscolaAbastecimento,
  usuarioEhEscolaAbastecimentoDiretor,
  usuarioEhTerceirizada
} from "./utilities";

export default () => {
  if (usuarioEhDistribuidora()) {
    return <AvatarDistribuidor />;
  } else if (usuarioEhTerceirizada()) {
    return <AvatarTerceirizada />;
  } else if (usuarioEhDRE()) {
    return <AvatarDRE />;
  } else if (
    usuarioEhEscolaTerceirizada() ||
    usuarioEhEscolaTerceirizadaDiretor() ||
    usuarioEhEscolaAbastecimento() ||
    usuarioEhEscolaAbastecimentoDiretor()
  ) {
    return <AvatarEscola />;
  } else {
    return <AvatarCODAE />;
  }
};
