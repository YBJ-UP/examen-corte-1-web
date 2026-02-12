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

export async function getReporte5(props: { searchParams?:Promise<{[key:string]: string}> }):Promise<reporte5Type[]> {
    const searchParams = await props.searchParams
        try {
            let res
            if (searchParams?.programa && searchParams?.periodo) {
                res = await query('SELECT * FROM vw_tablero_estudiantes WHERE programa=$1 AND periodo=$2;', [searchParams.programa, searchParams.periodo]);
            } else if (searchParams?.programa) {
                res = await query('SELECT * FROM vw_tablero_estudiantes WHERE programa=$1;', [searchParams.programa]);
            } else if (searchParams?.periodo) {
                res = await query('SELECT * FROM vw_tablero_estudiantes WHERE periodo=$1;', [searchParams.periodo]);
            } else {
                res = await query('SELECT * FROM vw_tablero_estudiantes;');
            }
            if (!res.rows) {
                throw new Error('Error al conseguir los datos');
            }
            const reporte: reporte5Type[] = res.rows
            return reporte
        } catch (error:any) {
            throw new Error(error.message)
        }
}

export async function getProgramas() {
    try {
        const res = await query('SELECT DISTINCT programa FROM vw_tablero_estudiantes;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos')
        }
        const programas:{programa:string}[] = res.rows
        return programas
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function getKPI() {
    try {
        const res = await query('SELECT estudiante, programa, periodo, promedio FROM vw_tablero_estudiantes ORDER BY promedio DESC LIMIT 1;')
        if (!res.rows) {
            throw new Error('Error al obtener la KPI')
        }
        const kpi = res.rows[0]
        return kpi
    } catch (error:any) {
        throw new Error(error.message)
    }
}