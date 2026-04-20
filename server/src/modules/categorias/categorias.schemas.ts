import { z } from "zod";

export const criarCategoriaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Cor deve ser um hex #RRGGBB")
    .optional(),
});

export const atualizarCategoriaSchema = criarCategoriaSchema.partial();

export type CriarCategoriaInput = z.infer<typeof criarCategoriaSchema>;
export type AtualizarCategoriaInput = z.infer<typeof atualizarCategoriaSchema>;
