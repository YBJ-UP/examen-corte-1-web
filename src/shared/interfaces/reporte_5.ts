import z from "zod";

const reporte5Schema = z.object({
    estudiante: z.string().min(1).max(100),
    programa: z.string().min(1).max(100),
    promedio: z.coerce.number().positive().min(0).max(100),
    periodo: z.coerce.number().positive().min(1).max(15),
    lugar: z.coerce.number().positive().min(1),
})

export type reporte5Type = z.infer<typeof reporte5Schema>