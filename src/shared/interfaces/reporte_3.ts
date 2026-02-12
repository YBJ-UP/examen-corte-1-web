import z from "zod";
import { paginado, paginaSchema } from "./pagina";
import { query } from "@/lib/db";

const reporte3Schema = z.object({
    nombre: z.string().min(1).max(100),
    correo: z.email(),
    promedio_calificaciones: z.coerce.number().positive().min(1).max(100),
    promedio_asistencias: z.coerce.number().positive().min(1).max(100)
})

export type reporte3Type = z.infer<typeof reporte3Schema>

export async function paginarRep3 (props: { searchParams?:Promise<{[key:string]: string}> }):Promise<paginado> {
    const searchParams = await props.searchParams

    const paginaUnparsed:{page:string} = {page: searchParams?.page || '1'}
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const {page} = paginaParsed
    const limite = 2
    const offset = (page-1)*limite

    try {
        let totalFilas
        let totalFilasBien
        let totalPaginas
        let res

        if (searchParams?.nombre) {
            res = await query("SELECT * FROM vw_estudiantes_preocupantes WHERE nombre ILIKE $3 LIMIT $1 OFFSET $2;", [limite,offset, `%${searchParams.nombre}%`])
            totalFilas = await query('SELECT COUNT(*) FROM vw_estudiantes_preocupantes WHERE nombre ILIKE $1;', [`%${searchParams.nombre}%`])
        } else if (searchParams?.correo) {
            res = await query("SELECT * FROM vw_estudiantes_preocupantes WHERE correo ILIKE $3 LIMIT $1 OFFSET $2;", [limite,offset, `%${searchParams.correo}%`])
            totalFilas = await query('SELECT COUNT(*) FROM vw_estudiantes_preocupantes WHERE correo ILIKE $1;', [`%${searchParams.correo}%`])
        } else {
            res = await query('SELECT * FROM vw_estudiantes_preocupantes LIMIT $1 OFFSET $2;', [limite,offset])
            totalFilas = await query('SELECT COUNT(*) FROM vw_estudiantes_preocupantes;')
        }

        const rows:reporte3Type[] = res.rows

        totalFilasBien = parseInt(totalFilas.rows[0].count)
        totalPaginas = Math.ceil(totalFilasBien/limite)

        return {
            ok:true,
            data:rows,
            pagination: {
                pagina: page,
                limite,
                totalFilasBien,
                totalPaginas
            }
        }
    } catch (error:any) {
        return {
            ok:false,
            mensaje: error.message
        }
    }
}

export async function getKPI() {
    try {
        const res = await query('SELECT nombre, correo, promedio_calificaciones FROM vw_estudiantes_preocupantes ORDER BY promedio_calificaciones ASC LIMIT 1;')
        if (!res.rows) {
            throw new Error('Error al obtener la KPI')
        }
        const kpi = res.rows[0]
        return kpi
    } catch (error:any) {
        throw new Error(error.message)
    }
}