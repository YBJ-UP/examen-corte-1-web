import { query } from "@/lib/db"
import z from "zod"

const reporte2Schema = z.object({
    nombre: z.string().min(1).max(100),
    periodo: z.number().min(1).max(15),
    grupos: z.number().min(1),
    alumnos: z.number().min(0),
    promedio: z.number().min(0).max(100)
})

type reporte2 = z.infer<typeof reporte2Schema>

export async function paginarRep2 () {
    const pagina = 1
    const limite = 5
    const offset = (pagina-1)*limite

    try {
        const res = await query('SELECT * FROM vw_carga_maestro LIMIT $1 OFFSET $2', [limite, offset])
        const rows:reporte2[] = res.rows
        const totalFilas = await query('SELECT COUNT(*) FROM vw_carga_maestro')
        const totalFilasBien = parseInt(totalFilas.rows[0].count)
        const totalPaginas = Math.ceil(totalFilasBien/limite)

        return Response.json({
            data: rows,
            pagination: {
                pagina,
                limite,
                totalFilasBien,
                totalPaginas
            }
        })
    } catch (error:any) {
        return Response.json({ error: error.message }, { status:500 })
    }
    
}