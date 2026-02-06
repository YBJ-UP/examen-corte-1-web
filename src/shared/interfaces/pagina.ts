import z from "zod";

export const paginaSchema = z.object({
    pagina: z.coerce.number().positive().min(1).default(1)
})

export type pagina = z.infer<typeof paginaSchema>