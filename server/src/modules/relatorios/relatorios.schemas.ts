import { z } from "zod";

export const rangeSchema = z.object({
  range: z.enum(["7d", "30d", "90d"]).default("90d"),
});

export type RangeInput = z.infer<typeof rangeSchema>;
