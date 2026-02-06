import z from "zod"

export const reporte2Schema = z.object({
    nombre: z.string().min(1).max(100),
    periodo: z.number().min(1).max(15),
    grupos: z.number().min(1),
    alumnos: z.number().min(0),
    promedio: z.number().min(0).max(100)
})

export type reporte2 = z.infer<typeof reporte2Schema>