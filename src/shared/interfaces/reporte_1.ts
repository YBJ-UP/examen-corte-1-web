import z from "zod"

export const reporte1Schema = z.object({
    codigo: z.string().min(1).max(5),
    curso: z.string().min(1).max(100),
    periodo: z.number().min(1).max(15),
    programa: z.string().min(1).max(100),
    promedio: z.number().min(0.0).max(100.0),
    reprobados: z.number().min(0)
})

export type reporte1 = z.infer<typeof reporte1Schema>

export interface reporte {
    titulo: string,
    descripcion: string,
    numero: number
}