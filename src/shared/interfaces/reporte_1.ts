import { query } from "@/lib/db";
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

export async function getReporte1(props: { searchParams?:Promise<{[key:string]: string}> }):Promise<reporte1[]> {
    const searchParams = await props.searchParams
    try {
        let res
        if (searchParams?.programa && searchParams?.periodo) {
            res = await query('SELECT * FROM vw_rendimiento_curso WHERE programa=$1 AND periodo=$2;', [searchParams.programa, searchParams.periodo]);
        } else if (searchParams?.programa) {
            res = await query('SELECT * FROM vw_rendimiento_curso WHERE programa=$1;', [searchParams.programa]);
        } else if (searchParams?.periodo) {
            res = await query('SELECT * FROM vw_rendimiento_curso WHERE periodo=$1;', [searchParams.periodo]);
        } else {
            res = await query('SELECT * FROM vw_rendimiento_curso;');
        }
        if (!res.rows) {
            throw new Error('Error al conseguir los datos');
        }
        const reporte: reporte1[] = res.rows
        return reporte
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function getProgramas() {
    try {
        const res = await query('SELECT DISTINCT programa FROM vw_rendimiento_curso;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos')
        }
        const programas:{programa:string}[] = res.rows
        return programas
    } catch (error:any) {
        throw new Error(error.message)
    }
}