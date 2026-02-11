import z from "zod";
import { pagina, paginado } from "./pagina";
import { query } from "@/lib/db";

const reporte3Schema = z.object({
    nombre: z.string().min(1).max(100),
    correo: z.email(),
    promedio_calificaciones: z.coerce.number().positive().min(1).max(100),
    promedio_asistencias: z.coerce.number().positive().min(1).max(100)
})

export type reporte3Type = z.infer<typeof reporte3Schema>

export async function paginarRep3 ({page}: pagina):Promise<paginado> {
    const limite = 2
    const offset = (page-1)*limite

    try {
        const res = await query('SELECT * FROM vw_estudiantes_preocupantes LIMIT $1 OFFSET $2;', [limite,offset])
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