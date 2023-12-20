import { UsuarioSimples } from "./perfil.interface";

export interface LogSolicitacoesUsuarioSimples {
  status_evento_explicacao: string;
  usuario: UsuarioSimples;
  criado_em: string;
  justificativa: string;
}
