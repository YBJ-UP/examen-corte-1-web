import { query } from "@/lib/db"
import z from "zod"
import { pagina } from "./pagina"

const reporte2Schema = z.object({
    nombre: z.string().min(1).max(100),
    periodo: z.number().positive().min(1).max(15),
    grupos: z.number().positive().min(1),
    alumnos: z.number().positive().min(0),
    promedio: z.number().min(0).max(100)
})

type reporte2 = z.infer<typeof reporte2Schema>

export async function paginarRep2 ({page}:pagina): Promise<{ok: true, data:any, pagination:{ pagina:number, limite:number, totalFilasBien:number, totalPaginas:number } }  | {ok:false, mensaje:string}> {
    const limite = 5
    const offset = (page-1)*limite

    try {
        const res = await query('SELECT * FROM vw_carga_maestro LIMIT $1 OFFSET $2', [limite, offset])
        const rows:reporte2[] = res.rows
        const totalFilas = await query('SELECT COUNT(*) FROM vw_carga_maestro')
        const totalFilasBien = parseInt(totalFilas.rows[0].count)
        const totalPaginas = Math.ceil(totalFilasBien/limite)

        return {
            ok:true,
            data: rows,
            pagination: {
                pagina: page,
                limite,
                totalFilasBien,
                totalPaginas
            }
        }
    } catch (error:any) {
        return { ok:false, mensaje:error.message }
    }
    
}