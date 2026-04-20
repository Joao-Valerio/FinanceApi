import { z } from "zod";

export const atualizarPerfilSchema = z.object({
  nome: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const alterarSenhaSchema = z.object({
  senhaAtual: z.string().min(1),
  novaSenha: z.string().min(6),
});

export type AtualizarPerfilInput = z.infer<typeof atualizarPerfilSchema>;
export type AlterarSenhaInput = z.infer<typeof alterarSenhaSchema>;
