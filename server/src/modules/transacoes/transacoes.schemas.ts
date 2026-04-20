import { z } from "zod";

export const criarTransacaoSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.coerce.number().positive("Valor deve ser positivo"),
  tipo: z.enum(["ENTRADA", "SAIDA"]),
  data: z.coerce.date(),
  categoriaId: z.string().uuid().optional().nullable(),
});

export const atualizarTransacaoSchema = criarTransacaoSchema.partial();

export const listarTransacoesSchema = z.object({
  tipo: z.enum(["ENTRADA", "SAIDA"]).optional(),
  de: z.coerce.date().optional(),
  ate: z.coerce.date().optional(),
  categoriaId: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().max(200).optional(),
});

export type CriarTransacaoInput = z.infer<typeof criarTransacaoSchema>;
export type AtualizarTransacaoInput = z.infer<typeof atualizarTransacaoSchema>;
export type ListarTransacoesInput = z.infer<typeof listarTransacoesSchema>;
