import z from "zod";

const reporte4Schema = z.object({
    grupo: z.number().positive().min(1),
    periodo: z.number().positive().min(1).max(15),
    promedio_asistencias: z.number().positive().min(0).max(100)
})

export type reporte4Type = z.infer<typeof reporte4Schema>