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

        const res = !searchParams?.nombre && !searchParams?.correo ?
            await query('SELECT * FROM vw_estudiantes_preocupantes LIMIT $1 OFFSET $2;', [limite,offset])
            : searchParams?.nombre ?
                await query("SELECT * FROM vw_estudiantes_preocupantes WHERE nombre ILIKE $3 LIMIT $1 OFFSET $2;", [limite,offset, `%${searchParams.nombre}%`])
                : await query("SELECT * FROM vw_estudiantes_preocupantes WHERE correo ILIKE $3 LIMIT $1 OFFSET $2;", [limite,offset, `%${searchParams.correo}%`])
        
        const rows:reporte3Type[] = res.rows

        const totalFilas = await query('SELECT COUNT(*) FROM vw_estudiantes_preocupantes;')
        const totalFilasBien = parseInt(totalFilas.rows[0].count)
        const totalPaginas = Math.ceil(totalFilasBien/limite)

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