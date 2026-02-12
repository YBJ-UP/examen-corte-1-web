import { query } from "@/lib/db";
import z from "zod";

const reporte4Schema = z.object({
    grupo: z.number().positive().min(1),
    periodo: z.number().positive().min(1).max(15),
    promedio_asistencias: z.number().positive().min(0).max(100)
})

export type reporte4Type = z.infer<typeof reporte4Schema>

export async function getReporte4():Promise<reporte4Type[]> {
    try {
        const res = await query('SELECT * FROM vw_asistencia_por_grupo;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos');
        }
        const reporte4:reporte4Type[] = res.rows
        return reporte4
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function getKPI() {
    try {
        const res = await query('SELECT grupo, periodo, promedio_asistencias FROM vw_asistencia_por_grupo ORDER BY promedio_asistencias ASC LIMIT 1;')
        if (!res.rows) {
            throw new Error('Error al obtener la KPI')
        }
        const kpi = res.rows[0]
        return kpi
    } catch (error:any) {
        throw new Error(error.message)
    }
}