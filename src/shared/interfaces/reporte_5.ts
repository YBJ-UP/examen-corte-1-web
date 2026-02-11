import { query } from "@/lib/db";
import z from "zod";

const reporte5Schema = z.object({
    estudiante: z.string().min(1).max(100),
    programa: z.string().min(1).max(100),
    promedio: z.coerce.number().positive().min(0).max(100),
    periodo: z.coerce.number().positive().min(1).max(15),
    lugar: z.coerce.number().positive().min(1),
})

export type reporte5Type = z.infer<typeof reporte5Schema>

export async function getReporte5():Promise<reporte5Type[]> {
    try {
        const res = await query('SELECT * FROM vw_tablero_estudiantes;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos');
        }
        const reporte4:reporte5Type[] = res.rows
        return reporte4
    } catch (error:any) {
        throw new Error(error.message)
    }
}