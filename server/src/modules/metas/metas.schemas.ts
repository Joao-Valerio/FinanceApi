import { z } from "zod";

export const criarMetaSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  objetivo: z.coerce.number().positive("Objetivo deve ser positivo"),
  atual: z.coerce.number().nonnegative().optional(),
  prazo: z.coerce.date(),
});

export const atualizarMetaSchema = criarMetaSchema.partial();

export const depositarMetaSchema = z.object({
  valor: z.coerce.number().positive("Valor deve ser positivo"),
});

export type CriarMetaInput = z.infer<typeof criarMetaSchema>;
export type AtualizarMetaInput = z.infer<typeof atualizarMetaSchema>;
export type DepositarMetaInput = z.infer<typeof depositarMetaSchema>;
